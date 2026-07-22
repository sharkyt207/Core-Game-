import type { CapacitorConfig } from "@capacitor/cli";

// Native wrapper config for iOS & Android store builds.
// Web build (Vite -> dist/) is copied into the native shells via `cap sync`.
const config: CapacitorConfig = {
  appId: "com.corebreaker.game",
  appName: "COREBREAKER",
  webDir: "dist",
  backgroundColor: "#0a0713",
};

export default config;
