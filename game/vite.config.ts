import { defineConfig } from "vite";

// COREBREAKER build config.
// base: "./" keeps asset paths relative so the build works both when hosted
// on a static server and when wrapped by Capacitor for native iOS/Android.
export default defineConfig({
  base: "./",
  build: {
    target: "es2020",
    outDir: "dist",
    assetsInlineLimit: 4096,
  },
  server: {
    host: true, // expose on LAN so the dev build is testable directly on a phone
    port: 5173,
  },
});
