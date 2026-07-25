# COREBREAKER — Produktions-Projekt (Vite + TypeScript, Capacitor)

Der produktionsreife Build des Spiels: die im `../prototype/trashy/` bestätigte
Spielversion, verpackbar für iOS und Android.

## Architektur-Entscheidung: kein Phaser
Das Spiel ist eine schlanke **Custom-Canvas-Engine** (eigenes Low-Res-Pixel-Rendering
mit Chromatic Aberration, polares Planeten-Weltmodell). Phaser brachte dafür keinen
Mehrwert und ~1,5 MB Overhead — daher bewusst entfernt. Ergebnis: **~29 KB gzip**,
sofortige Ladezeit, ideal für Mobile.

## Befehle
```bash
npm install               # Vite, TypeScript, Capacitor + Plugins
npm run dev               # Dev-Server (host:true -> im Handy-Browser über LAN testbar)
npm run build             # tsc --noEmit + vite build -> dist/   (verifiziert grün)
npm run preview           # gebautes Bundle prüfen
npm run assets:generate   # App-Icons & Splashes aus resources/ erzeugen
npm run ios:open          # build + sync + Xcode           (nur macOS)
npm run android:open      # build + sync + Android Studio
```

Der komplette Weg in die Stores steht in **[`NATIVE_BUILD.md`](./NATIVE_BUILD.md)**.

## Struktur
```
game/
├── index.html            # Portrait-Shell (lädt src/main.ts)
├── capacitor.config.ts   # iOS/Android-Wrapper (appId, Splash, StatusBar)
├── vite.config.ts        # base "./" für Capacitor, dev host:true
├── tsconfig.json         # strict
├── NATIVE_BUILD.md       # Schritt-für-Schritt zu iOS/Android + Store
├── resources/            # Quellbilder für den Icon-/Splash-Generator
│   ├── icon.png              1024×1024, opak
│   └── splash(-dark).png     2732×2732
├── store/                # alles für die Store-Seite
│   ├── STORE_LISTING.md      Texte & Metadaten (DE + EN)
│   ├── icons/                3 Icon-Konzepte (SVG + PNG)
│   └── screenshots/          12 echte Aufnahmen, 1290×2796
├── tools/                # Asset-Generatoren (reproduzierbar)
│   ├── icon-gen.cjs          erzeugt die 3 Icon-Konzepte als SVG
│   ├── native-assets.cjs     erzeugt resources/ (ICON=A|B|C)
│   └── icons/                die 3 Konzept-SVGs
└── src/
    ├── main.ts           # Native-Bootstrap: Cloud-Save -> StatusBar -> Engine -> Splash aus
    ├── cloud.ts          # Cloud-Save inkl. Merge-Regel (adapter-basiert)
    ├── game.js           # Spiel-Engine (aus dem bestätigten Prototyp generiert)
    └── core/
        ├── EventBus.ts   # typisiertes Pub/Sub (für schrittweise TS-Extraktion)
        └── palette.ts    # Farb-Identität
```

## Cloud-Save
`src/cloud.ts` spiegelt den Spielstand in den nativen Speicher, der von den
OS-Backups erfasst wird (iCloud / Android Auto Backup). Beim Start gewinnt der
**weiter fortgeschrittene** Stand, nicht der neuere — Geräteuhren sind unzuverlässig,
und ein frisch installiertes Gerät darf echten Fortschritt nie überschreiben.
Ein Account-Backend wird über einen zweiten `CloudAdapter` eingehängt.

## Performance
Drei Qualitätsstufen (Einstellungen ▸ Grafik: Auto/Hoch/Niedrig). **Auto** misst die
echte Framezeit und schaltet auf schwachen Geräten herunter — mit Hysterese, damit
nichts flackert. Die niedrige Stufe spart **~60 % der Canvas-Operationen** pro Bild
(Chromatic Aberration, Scanlines, Rauschen, Tile-Details, weniger Partikel).
Partikel sind gepoolt und werden per Swap-and-Pop entfernt (keine Allokation im
Hot Path).

## Weg nach vorn (Typisierung)
`game.js` ist die eine laufende Quelle der Wahrheit; der Prototyp bleibt die
Iterations-Kopie. Sobald das Design final ist, werden die Systeme (Movement,
WorldGen, Mining, Energy/Heat, Progression) schrittweise in typisierte Module unter
`src/systems/` extrahiert — hinter dem `EventBus`, gemäß `docs/01_ARCHITECTURE.md`.
