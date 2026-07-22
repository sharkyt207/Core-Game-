/**
 * Typed publish/subscribe bus that keeps the game's systems decoupled.
 * Systems emit events; presentation and UI react. No system calls another
 * system directly — this is the single channel between the layers.
 */
export type GameEvents = {
  "run:started": { planetId: string };
  "run:ended": { depth: number; earnings: number };
  "block:destroyed": { col: number; row: number; drop: string | null };
  "resource:collected": { resourceId: string; value: number };
  "energy:depleted": undefined;
  "upgrade:purchased": { upgradeId: string; level: number };
};

type Handler<T> = (payload: T) => void;

export class EventBus {
  private handlers: { [K in keyof GameEvents]?: Array<Handler<GameEvents[K]>> } = {};

  on<K extends keyof GameEvents>(event: K, handler: Handler<GameEvents[K]>): () => void {
    const list = (this.handlers[event] ??= []) as Array<Handler<GameEvents[K]>>;
    list.push(handler);
    return () => this.off(event, handler);
  }

  off<K extends keyof GameEvents>(event: K, handler: Handler<GameEvents[K]>): void {
    const list = this.handlers[event] as Array<Handler<GameEvents[K]>> | undefined;
    if (!list) return;
    const i = list.indexOf(handler);
    if (i >= 0) list.splice(i, 1);
  }

  emit<K extends keyof GameEvents>(event: K, payload: GameEvents[K]): void {
    const list = this.handlers[event] as Array<Handler<GameEvents[K]>> | undefined;
    if (!list) return;
    for (const h of list.slice()) h(payload);
  }
}

/** Shared bus instance for the running game. */
export const bus = new EventBus();
