# COREBREAKER — Produktions-Projekt (Vite + TypeScript + Phaser)

Der produktionsreife Zweig des Spiels. Der spielbare Slice unter `../prototype/`
diente dem schnellen Antesten der Steuerung/Feel; dieses Projekt ist die Grundlage
für den Weg in die App-Stores (iOS/Android via Capacitor).

## Befehle
```bash
npm install        # Abhängigkeiten (Phaser, Vite, TypeScript)
npm run dev        # Dev-Server (host:true → im Handy-Browser über LAN-URL testbar)
npm run build      # tsc --noEmit + vite build  → dist/
npm run preview    # gebautes Bundle lokal prüfen
npm run typecheck  # nur Typprüfung
```

## Struktur (wächst gemäß docs/02_PROJECT_STRUCTURE.md)
```
src/
├── main.ts            # Phaser-Bootstrap (Portrait, FIT-Scaling, pixelArt)
├── core/
│   ├── EventBus.ts    # typisiertes Pub/Sub – Entkopplung der Systeme
│   └── palette.ts     # zentrale Farb-Identität
└── scenes/
    ├── BootScene.ts   # Setup + Übergang
    └── MenuScene.ts   # Menü-Slice (Titel, pulsierender Kern) – Render-Pipeline verifiziert
```

## Status
Pipeline steht und baut (`npm run build` grün). Als Nächstes wandern die im
Prototyp erprobten Systeme hierher: Anker-Steuerung, WorldGen/Chunks, Mining,
Energie/Hitze, Ressourcen, Upgrades — jeweils als eigenes System hinter dem EventBus.
Der gewählte Grafik-Skin (clean Neon oder Trashy A/B/C) wird als Render-Theme eingehängt.
