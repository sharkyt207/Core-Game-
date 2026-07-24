# COREBREAKER — Produktions-Projekt (Vite + TypeScript, Capacitor-ready)

Der produktionsreife Build des Spiels. Er bündelt die im `../prototype/trashy/`
bestätigte Spielversion (runder Planet, Skin A, Boost, 3 Planeten) und ist über
Capacitor für iOS/Android verpackbar.

## Architektur-Entscheidung: kein Phaser
Das Spiel ist eine schlanke **Custom-Canvas-Engine** (eigenes Low-Res-Pixel-Rendering
mit Chromatic Aberration, polares Planeten-Weltmodell). Phaser brachte dafür keinen
Mehrwert und ~1,5 MB Overhead — daher bewusst entfernt. Ergebnis: **~22 KB Bundle**
(9 KB gzip), sofortige Ladezeit, ideal für Mobile.

## Befehle
```bash
npm install        # Vite, TypeScript, Capacitor
npm run dev        # Dev-Server (host:true -> im Handy-Browser über LAN testbar)
npm run build      # tsc --noEmit + vite build -> dist/  (verifiziert grün)
npm run preview    # gebautes Bundle prüfen
# Native (benötigt Xcode / Android Studio, nicht in der Cloud-Session):
npx cap add ios      &&  npm run cap:sync
npx cap add android  &&  npm run cap:sync
```

## Struktur
```
game/
├── index.html            # Portrait-Shell (lädt src/main.ts)
├── capacitor.config.ts   # iOS/Android-Wrapper (appId, webDir=dist)
├── vite.config.ts        # base "./" für Capacitor, dev host:true
├── tsconfig.json         # strict
└── src/
    ├── main.ts           # Native-Bootstrap: restauriert Save aus Capacitor
    │                     #   Preferences, registriert Haptics/App, lädt dann game.js
    ├── game.js           # Spiel-Engine (aus dem bestätigten Prototyp)
    └── core/
        ├── EventBus.ts   # typisiertes Pub/Sub (für schrittweise TS-Extraktion)
        └── palette.ts    # Farb-Identität
```

## Native Build (iOS / Android)
Benötigt lokal Xcode (iOS) bzw. Android Studio (Android) — nicht in der Cloud-Session.
```bash
npm install
npm run build            # -> dist/
npx cap add ios          # bzw. android   (einmalig)
npm run cap:sync         # kopiert dist/ + Plugins in die native App
npx cap open ios         # bzw. android   -> in Xcode/Android Studio bauen & signieren
```

## Haptik & Cloud-Save
- **Haptik:** `main.ts` bündelt `@capacitor/haptics`; die Engine ruft über die
  `window.Capacitor.Plugins.Haptics`-Bridge native Vibration auf (iOS + Android).
  Im Web-Browser Fallback auf die Vibration-API (Android-Web; iOS-Safari kann per
  Web nicht vibrieren).
- **Cloud-Save-Seam:** `main.ts` spiegelt den Speicherstand nach `@capacitor/preferences`
  (nativer Speicher) und stellt ihn beim Start wieder her. Genau hier wird ein echtes
  Cloud-Sync (iCloud/Backend) eingehängt: `Preferences` gegen einen Remote-Adapter
  tauschen. Portabler Save-Code-Export/Import ist bereits im Spiel (Einstellungen).

## Weg nach vorn (Typisierung)
`game.js` ist die eine laufende Quelle der Wahrheit. Sobald das Design stabil ist,
werden die Systeme (Movement, WorldGen, Mining, Energy/Heat, Progression) schrittweise
in typisierte Module unter `src/systems/` extrahiert — hinter dem `EventBus`, gemäß
`docs/01_ARCHITECTURE.md`. Bis dahin bleibt der Prototyp die Iterations-Kopie.
