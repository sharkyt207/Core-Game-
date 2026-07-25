import type { CapacitorConfig } from "@capacitor/cli";

// Native wrapper config for the iOS & Android store builds.
// The web build (Vite -> dist/) is copied into the native shells by `cap sync`.
const config: CapacitorConfig = {
  appId: "com.corebreaker.game",
  appName: "COREBREAKER",
  webDir: "dist",
  backgroundColor: "#0a0713",
  ios: {
    // The game draws its own dark background edge to edge.
    backgroundColor: "#0a0713",
    contentInset: "never",
    // Portrait-only is enforced in Xcode (Deployment Info) / AndroidManifest.
    limitsNavigationsToAppBoundDomains: true,
  },
  android: {
    backgroundColor: "#0a0713",
    // Keep the webview opaque: the canvas is always full-bleed.
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    SplashScreen: {
      // Held until the engine has actually loaded (main.ts hides it), so there
      // is never a blank frame between the launch image and the first render.
      launchShowDuration: 3000,
      launchAutoHide: false,
      backgroundColor: "#0a0713",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK", // dark UI => light text, matching the neon-on-black look
      backgroundColor: "#0a0713",
      overlaysWebView: true,
    },
  },
};

export default config;
