/**
 * Cloud save.
 *
 * The engine (game.js) only ever talks to localStorage. This module keeps that
 * local save mirrored into a durable store and restores it on launch, so a
 * reinstall — or a fresh device — comes back with the player's progress.
 *
 * It is deliberately adapter-shaped: `PreferencesAdapter` is what ships today
 * (native storage via Capacitor, which the OS includes in its device backup:
 * iCloud on iOS, Auto Backup on Android). Pointing this at a real account-based
 * backend later means writing one more `CloudAdapter` and passing it to
 * `initCloud` — nothing else in the app changes.
 */
import { Preferences } from "@capacitor/preferences";

export const SAVE_KEY = "corebreaker_tree_v1";

/** Shape of the fields we need to compare two saves. The engine owns the rest. */
interface SaveShape {
  v?: number;
  lifetime?: number;
  credits?: number;
  skills?: unknown[];
  stats?: { runs?: number; bestDepth?: number; totalEarned?: number };
  prestige?: { cores?: number };
  ascend?: { shards?: number };
}

export interface CloudAdapter {
  readonly name: string;
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

/** Ships today: native key/value storage, covered by the OS device backup. */
export const PreferencesAdapter: CloudAdapter = {
  name: "preferences",
  async get(key) {
    const { value } = await Preferences.get({ key });
    return value ?? null;
  },
  async set(key, value) {
    await Preferences.set({ key, value });
  },
};

function parse(raw: string | null): SaveShape | null {
  if (!raw) return null;
  try {
    const j = JSON.parse(raw) as SaveShape;
    return j && typeof j === "object" ? j : null;
  } catch {
    return null;
  }
}

/**
 * How far along a save is. Used to decide which of two saves wins — never a
 * timestamp, because device clocks lie and a stale-but-further save is still
 * the one the player would rather keep.
 */
export function progressScore(s: SaveShape | null): number {
  if (!s) return -1;
  const st = s.stats ?? {};
  return (
    (s.lifetime ?? 0) +
    (st.totalEarned ?? 0) +
    (st.bestDepth ?? 0) * 1000 +
    (st.runs ?? 0) * 100 +
    (s.skills?.length ?? 0) * 500 +
    (s.prestige?.cores ?? 0) * 5000 +
    (s.ascend?.shards ?? 0) * 50000
  );
}

/** Picks the further-along save. Ties go to local, so an offline session is never undone. */
export function pickSave(local: string | null, remote: string | null): string | null {
  const l = parse(local);
  const r = parse(remote);
  // Never trade one unreadable save for another — leave local alone.
  if (!l && !r) return local;
  if (!l) return remote;
  if (!r) return local;
  return progressScore(r) > progressScore(l) ? remote : local;
}

let adapter: CloudAdapter = PreferencesAdapter;
let lastPushed: string | null = null;

/** Mirrors the current local save outward. Safe to call often — it skips no-ops. */
export async function pushSave(): Promise<void> {
  try {
    const local = localStorage.getItem(SAVE_KEY);
    if (!local || local === lastPushed) return;
    await adapter.set(SAVE_KEY, local);
    lastPushed = local;
  } catch {
    /* offline / no native layer — the local save is still intact */
  }
}

/** Restores on launch, keeping whichever save is further along. */
export async function pullSave(): Promise<void> {
  try {
    const remote = await adapter.get(SAVE_KEY);
    const local = localStorage.getItem(SAVE_KEY);
    const winner = pickSave(local, remote);
    if (winner && winner !== local) localStorage.setItem(SAVE_KEY, winner);
    lastPushed = winner;
  } catch {
    /* first launch, or no native layer */
  }
}

/**
 * Wipes the save everywhere it is kept.
 *
 * Clearing localStorage alone is not enough: the next launch would pull the
 * mirrored copy straight back, because a restore prefers whichever save is
 * further along — and an empty local save always loses that comparison.
 */
export async function wipeSave(): Promise<void> {
  lastPushed = null;
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
  try {
    // Overwrite first, then remove: a remove that silently fails would otherwise
    // leave the old progress sitting in native storage.
    await adapter.set(SAVE_KEY, "");
    await Preferences.remove({ key: SAVE_KEY });
  } catch {
    /* no native layer, or already gone */
  }
}

export interface CloudOptions {
  /** Swap in a different backend (e.g. an account-based one) without touching callers. */
  adapter?: CloudAdapter;
  /** Periodic mirror interval in ms. 0 disables the timer (events still fire). */
  intervalMs?: number;
}

/**
 * Restores the save, then keeps mirroring it: on background/close (the moments
 * a mobile app actually gets killed) and on a slow timer as a backstop.
 */
export async function initCloud(opts: CloudOptions = {}): Promise<void> {
  if (opts.adapter) adapter = opts.adapter;
  await pullSave();

  const flush = (): void => void pushSave();
  window.addEventListener("pagehide", flush);
  window.addEventListener("beforeunload", flush);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) flush();
  });

  const every = opts.intervalMs ?? 30_000;
  if (every > 0) window.setInterval(flush, every);
}
