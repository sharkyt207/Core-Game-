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
import { initCloud, pushSave, wipeSave } from "./cloud";
import { initPWA } from "./pwa";

async function start(): Promise<void> {
  // Offline support + ask the browser not to evict the save (web/home-screen).
  initPWA();

  // Light text on the dark neon UI; the canvas draws under the bar.
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});

  // Restore progress first — see cloud.ts for the merge rule.
  await initCloud();

  // Android hardware Back. The engine owns navigation, so it decides: it closes
  // whatever screen is open and reports back whether it handled the key. Only a
  // bare title screen returns false, and only then does the app actually exit —
  // the previous no-op meant Back was simply dead, which reads as a broken app.
  App.addListener("backButton", () => {
    const handled = (window as unknown as { __cbBack?: () => boolean }).__cbBack?.();
    if (!handled) void App.exitApp();
  }).catch(() => {});

  // Flush the save when the app is backgrounded — the moment iOS/Android are
  // most likely to kill the process — and hand the engine the pause, so the
  // drill hum and the score do not keep playing out of a pocket.
  App.addListener("appStateChange", ({ isActive }) => {
    const w = window as unknown as { __cbPause?: () => void; __cbResume?: () => void };
    if (isActive) w.__cbResume?.();
    else {
      w.__cbPause?.();
      void pushSave();
    }
  }).catch(() => {});

  // Referencing Haptics guarantees the plugin is bundled, so the engine's
  // window.Capacitor.Plugins.Haptics bridge resolves on device.
  void Haptics;

  // The engine's "delete save data" option calls this so the mirrored copy in
  // native storage goes too — otherwise the next launch would restore it.
  (window as unknown as { __cbWipeCloud?: () => Promise<void> }).__cbWipeCloud = wipeSave;

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
