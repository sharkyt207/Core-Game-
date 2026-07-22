# COREBREAKER

> Arbeitstitel · futuristisches Pixel-Art Mining-Game für iOS & Android (Hochformat, Touch-first)

Ein Mobile-Game, in dem du eine futuristische Bohrmaschine steuerst, dich durch die
Schichten fremder Planeten frisst, seltene Ressourcen bergst und deine Maschine Schritt
für Schritt von einem winzigen Bohrer zu einer welten­zerlegenden High-Tech-Bestie
entwickelst.

**Kernfantasie:** *„Ich werde immer stärker. Meine Maschine wird immer verrückter.
Ich zerstöre, was vorher unmöglich war."*

---

## Technologie-Stack

| Bereich        | Entscheidung                                   |
|----------------|------------------------------------------------|
| Sprache        | TypeScript                                     |
| Engine         | Phaser 3 (2D, WebGL/Canvas)                     |
| Build/Dev      | Vite                                            |
| Mobile-Wrapper | Capacitor (iOS & Android App-Store-Export)      |
| Grafik         | Eigene Pixel-Art, Sci-Fi/Neon                   |
| Ziel-FPS       | 60 FPS auf modernen Smartphones                 |
| Format         | Portrait / Hochformat, Touch-first             |

**Warum dieser Stack:** kostenlos & Open Source, direkt im Handy-Browser testbar (kein PC
nötig), und derselbe Code lässt sich via Capacitor als native App in die Stores bringen.

---

## Dokumentation

| Dokument | Inhalt |
|----------|--------|
| [`docs/00_GDD.md`](docs/00_GDD.md) | Vollständiges Game Design Document |
| [`docs/01_ARCHITECTURE.md`](docs/01_ARCHITECTURE.md) | Technische Architektur & Systemschichten |
| [`docs/02_PROJECT_STRUCTURE.md`](docs/02_PROJECT_STRUCTURE.md) | Ordnerstruktur, Module & Daten-Schemas |
| [`docs/03_ROADMAP.md`](docs/03_ROADMAP.md) | Entwicklungsphasen & Meilensteine |
| [`docs/04_ART_DIRECTION.md`](docs/04_ART_DIRECTION.md) | Visuelle Identität, Farbpalette, Asset-Pipeline |

---

## Status

**Phase 1 – Konzept & Architektur:** ✅ in Arbeit (dieses Dokument-Set)
Nächster Schritt: Freigabe des GDD + Art-Direction (3 Konzept-Varianten zur Auswahl),
danach Implementierung des spielbaren Kerns.
