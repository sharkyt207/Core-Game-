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
├── index.html            # Portrait-Shell (Viewport, Styles, HUD/Controls-Markup)
├── capacitor.config.ts   # iOS/Android-Wrapper (appId, webDir=dist)
├── vite.config.ts        # base "./" für Capacitor, dev host:true
├── tsconfig.json         # strict
└── src/
    ├── game.js           # Spiel-Engine (aus dem bestätigten Prototyp)
    └── core/
        ├── EventBus.ts   # typisiertes Pub/Sub (für schrittweise TS-Extraktion)
        └── palette.ts    # Farb-Identität
```

## Weg nach vorn (Typisierung)
`game.js` ist die eine laufende Quelle der Wahrheit. Sobald das Design stabil ist,
werden die Systeme (Movement, WorldGen, Mining, Energy/Heat, Progression) schrittweise
in typisierte Module unter `src/systems/` extrahiert — hinter dem `EventBus`, gemäß
`docs/01_ARCHITECTURE.md`. Bis dahin bleibt der Prototyp die Iterations-Kopie.
