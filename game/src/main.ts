/**
 * Native bootstrap (Capacitor).
 *
 * Order matters: the cloud save is restored into localStorage *before* the
 * engine is imported, because the engine reads its save exactly once at load.
 *
 * On the web (no native layer) every call below degrades to a harmless no-op,
 * so the standalone prototype and the wrapped app behave identically.
 */
import { Haptics } from "@capacitor/haptics";
import { App } from "@capacitor/app";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { initCloud, pushSave } from "./cloud";
import { initPWA } from "./pwa";

async function start(): Promise<void> {
  // Offline support + ask the browser not to evict the save (web/home-screen).
  initPWA();

  // Light text on the dark neon UI; the canvas draws under the bar.
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});

  // Restore progress first — see cloud.ts for the merge rule.
  await initCloud();

  // Keep the app alive on Android back; in-game menus own navigation.
  App.addListener("backButton", () => {
    /* no-op */
  }).catch(() => {});

  // Flush the save when the app is backgrounded — the moment iOS/Android are
  // most likely to kill the process.
  App.addListener("appStateChange", ({ isActive }) => {
    if (!isActive) void pushSave();
  }).catch(() => {});

  // Referencing Haptics guarantees the plugin is bundled, so the engine's
  // window.Capacitor.Plugins.Haptics bridge resolves on device.
  void Haptics;

  // Load the engine only once the save is in place.
  // @ts-ignore - game.js is the plain-JS engine bundle (generated from the prototype)
  await import("./game.js");

  // The engine is live and has painted its first frame — drop the launch image.
  // Waiting for a frame (not a timer) is what keeps the handover seamless.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => void SplashScreen.hide().catch(() => {}));
  });
}

void start();
