/**
 * Native bootstrap (Capacitor).
 *
 * Runs BEFORE the game engine (game.js) so a saved game persisted in native
 * storage (Preferences) is restored into localStorage first — the engine reads
 * its save from localStorage unchanged. This is the seam a real cloud sync
 * (iCloud / a backend) plugs into: swap Preferences for a remote adapter.
 *
 * On the web (no Capacitor native layer) the Preferences plugin falls back to
 * web storage, so this is a harmless no-op there and the game runs exactly as
 * the standalone prototype does.
 */
import { Preferences } from "@capacitor/preferences";
import { Haptics } from "@capacitor/haptics";
import { App } from "@capacitor/app";

const SAVE_KEY = "corebreaker_tree_v1";

function setupPersistence(): void {
  const persist = async (): Promise<void> => {
    try {
      const v = localStorage.getItem(SAVE_KEY);
      if (v) await Preferences.set({ key: SAVE_KEY, value: v });
    } catch {
      /* ignore */
    }
  };
  // Mirror the save into native storage whenever the app is backgrounded/closed.
  window.addEventListener("pagehide", () => void persist());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) void persist();
  });
  // Keep the app open on Android back (in-game menus handle navigation).
  App.addListener("backButton", () => {
    /* no-op */
  }).catch(() => {});
  // Referencing Haptics guarantees the plugin is bundled so the engine's
  // window.Capacitor.Plugins.Haptics bridge works on device.
  void Haptics;
}

async function start(): Promise<void> {
  try {
    const { value } = await Preferences.get({ key: SAVE_KEY });
    if (value && !localStorage.getItem(SAVE_KEY)) localStorage.setItem(SAVE_KEY, value);
  } catch {
    /* web / no native layer */
  }
  setupPersistence();
  // Load the game engine only after the save has been restored.
  // @ts-ignore - game.js is the plain-JS engine bundle (generated from the prototype)
  await import("./game.js");
}

void start();
