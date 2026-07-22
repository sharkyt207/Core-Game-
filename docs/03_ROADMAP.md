# Entwicklungs-Roadmap — COREBREAKER

*Version 0.1 · Phase 1*

Phasenbasierter Plan. Jede Phase endet mit einem **testbaren Meilenstein** (Web-Build fürs
Handy). Nach jeder Phase: kurze Freigabe/Feedback-Runde, bevor es weitergeht.

---

## Phase 1 — Konzept & Architektur ✅ (aktuell)
**Ziel:** solides Fundament, bevor Code entsteht.
- [x] Game Design Document
- [x] Technische Architektur
- [x] Projektstruktur & Daten-Schemas
- [x] Roadmap
- [ ] Art-Direction & visuelle Identität (3 Konzept-Varianten zur Auswahl)
- **Meilenstein:** Freigegebenes Konzept + gewählte Art-Richtung.

## Phase 2 — Spielbarer Kern
**Ziel:** der Core-Loop bewegt sich und macht Spaß.
- [ ] Projekt-Setup (Vite + TypeScript + Phaser, Portrait-Canvas)
- [ ] Core Layer: EventBus, GameState/RunState, Registry, RNG
- [ ] Anker-Wisch-Steuerung + Bewegung (Bohrer zentriert, Welt bewegt sich)
- [ ] Smooth-Follow-Kamera + Screen Shake
- [ ] WorldGen (Chunks) + Mining-System + erste Testwelt (Terra Prime)
- [ ] Basis-VFX/Juice bei Blockzerstörung
- **Meilenstein:** man kann sich durch einen Planeten bohren — testbar am Handy.

## Phase 3 — Ressourcen, Upgrades, Progression
**Ziel:** der „nur noch ein Upgrade"-Sog.
- [ ] Ressourcen-System + Inventar + seltene Funde (Fanfare)
- [ ] Energie/Hitze-System (Spannungsbogen, Extraktion)
- [ ] Verkauf + Upgrade-Shop (datengetrieben)
- [ ] Erste Fähigkeiten (Schockwelle, Magnet) + Module (sichtbare Maschinen-Evolution)
- [ ] Zweiter Planet zum Test der Datengetriebenheit
- **Meilenstein:** vollständiger Core-Loop (Run → Verkauf → Upgrade → tiefer).

## Phase 4 — UI, Menü, Audio, Haptik
**Ziel:** aus Prototyp wird Produkt.
- [ ] Hauptmenü + Hub (Planetenwahl) + Ergebnis-Screen
- [ ] Einstellungen (Audio, Vibration, Screen Shake, Qualität, Sprache)
- [ ] Audio-System (Musik-Layering, SFX)
- [ ] Haptik-Integration (Web + Capacitor)
- [ ] i18n (DE/EN)
- **Meilenstein:** rundes, navigierbares Spiel mit Ton & Vibration.

## Phase 5 — Endgame, Polish, Performance & Store
**Ziel:** Power-Fantasy, Feinschliff, Veröffentlichungsreife.
- [ ] Höhere Maschinen-Tiers, Drohnen, Kettenreaktionen, Automatisierung
- [ ] Prestige/„Core Reactor"-Loop
- [ ] Weitere Planeten & Fähigkeiten (Content-Ausbau über Daten)
- [ ] Balancing-Pass (Playtesting)
- [ ] Performance-Optimierung (Pooling, Partikel-Caps, 60 FPS)
- [ ] Capacitor-Integration → iOS/Android-Builds
- **Meilenstein:** veröffentlichbarer Build.

---

## Arbeitsweise pro Schritt
1. Kleine, in sich testbare Inkremente.
2. Nach jedem Kern-Feature ein Handy-Web-Build zum Antesten.
3. Wichtige Design-/Grafik-Entscheidungen: vorher fragen, bei Grafik immer **3 Varianten**.
4. GDD/Docs bleiben lebende Dokumente und werden mitgepflegt.
