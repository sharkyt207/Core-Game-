/**
 * Progressive Web App wiring — this is what turns the hosted build into
 * something you can add to a phone's home screen and play offline.
 *
 * The important part for players is `requestPersistentStorage`: browsers treat
 * ordinary site data as evictable, and iOS in particular clears it after a
 * stretch of not visiting. Persistent storage asks the browser to keep it,
 * which is what stops a save from quietly disappearing. Installing the game to
 * the home screen makes the grant far more likely to be given.
 */

/** Registers the offline service worker. No-op on http: dev or unsupported browsers. */
export function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator)) return;
  // Service workers need a secure context; file:// and plain http fail silently.
  if (location.protocol !== "https:" && location.hostname !== "localhost") return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      /* offline support is a bonus, never a hard requirement */
    });
  });
}

/**
 * Asks the browser to keep the save from being evicted.
 * Returns whether storage is persistent (already granted counts).
 */
export async function requestPersistentStorage(): Promise<boolean> {
  try {
    if (!navigator.storage?.persist) return false;
    if (await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}

export function initPWA(): void {
  registerServiceWorker();
  void requestPersistentStorage();
}
