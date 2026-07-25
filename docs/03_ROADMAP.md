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

## Phase 2 — Spielbarer Kern ✅ (Vertical Slice)
**Ziel:** der Core-Loop bewegt sich und macht Spaß.
- [x] Spielbarer Prototyp (`prototype/index.html`, selbst-enthalten, Handy-Browser-testbar)
- [x] Anker-Wisch-Steuerung + Bewegung (Bohrer zentriert, Welt bewegt sich)
- [x] Smooth-Follow-Kamera + Screen Shake + Hit-Stop
- [x] Prozedurale Welt (tiefenbasierte Materialien) + Mining-System
- [x] VFX/Juice: Partikel, Flash, Neon-Glow, pulsierender Kern
- [x] Energie/Hitze-Spannungsbogen + Extraktion
- [x] Ressourcen (common→legendary) mit Fanfare (VFX/SFX/Haptik)
- [x] Schockwellen-Fähigkeit (Cooldown, Energiekosten)
- [x] Upgrade-Shop-Loop (datengetrieben) + persistenter Save
- [x] Prozedurale Audio-SFX + Vibration
- **Meilenstein erreicht:** man kann sich durch den Planeten bohren, sammeln,
  extrahieren, aufrüsten — testbar am Handy.
- **Offen für Phase 2b:** Migration in die volle Vite+TypeScript+Phaser-Projektstruktur
  (der Slice ist bewusst ein Single-File-Rapid-Prototyp zum schnellen Antesten).

## Phase 3 — Ressourcen, Upgrades, Progression ✅
**Ziel:** der „nur noch ein Upgrade"-Sog.
- [x] Ressourcen-System (common→legendary) + seltene Funde (VFX/SFX/Haptik-Fanfare)
- [x] Energie(Fuel)/Hitze-System (Spannungsbogen, Extraktion, Drosselung)
- [x] Verkauf + Upgrade-Shop (datengetrieben, persistenter Save)
- [x] Fähigkeiten: Schockwelle (Blast) + Boost (Overdrive); sichtbare Maschinen-Evolution
      (Drohnen/Farbe ab höheren Tiers)
- [x] Runder Planet (polares Weltmodell), To-the-Core-Steuerung (rein/raus/orbit)
- [x] Datengetriebenes Planeten-System: 3 Planeten (Terra/Magmar/Cryonis) freischaltbar
- **Meilenstein erreicht:** vollständiger Core-Loop (Run → Extraktion → Upgrade/Planet → tiefer).

## Phase 3b — Produktions-Fundament ✅
- [x] `game/`: Vite + TypeScript, Phaser entfernt (schlanke Custom-Engine, 22 KB Bundle)
- [x] Capacitor-Konfiguration (iOS/Android-verpackbar), Build verifiziert grün
- **Offen:** schrittweise TS-Extraktion der Systeme (hinter EventBus), native Store-Builds.

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
- [x] Höhere Maschinen-Tiers, Drohnen, Kettenreaktionen, Automatisierung
- [x] Prestige/„Core Overload"-Loop (Kerne: +12% Loot & +4 Bohrkraft je Kern)
- [x] Zweite Prestige-Ebene „Singularität"/Aszension (Kerne → Splitter: +25% Loot & +8 Bohrkraft je Splitter, multiplikativ)
- [x] Boss-Schichten mit Wächter + Angriffsmustern (Puls/Hitze, Sog zum Kern, rotierender Laser-Sweep in Phase 2)
- [x] Gegner-Kreaturen in tiefen Schichten (jagen den Bohrer; beißen = Hitze, oder sterben & droppen beim Bohren/Boost)
- [x] Menü-/Overlay-Animationen (Fade + Slide-Einblendung)
- [x] Weitere Planeten & Fähigkeiten (9 Welten, Module, Refinerie, Kontrakte, Challenge)
- [x] Balancing-Pass (Glücks-Cap, Loot-Quellen entschärft; `docs/04_ECONOMY.md`)
- [x] Performance-Optimierung (Partikel-Pooling, Qualitätsstufen, ~60 % weniger
      Canvas-Ops auf der niedrigen Stufe, Auto-Erkennung mit Hysterese)
- [x] Cloud-Save (`src/cloud.ts`, fortschrittsbasierte Merge-Regel, adapter-basiert)
- [x] Capacitor-Integration vollständig vorbereitet (Splash, StatusBar, Plugins,
      Icon-/Splash-Quellbilder, Store-Assets, `game/NATIVE_BUILD.md`)
- [ ] **Nur noch lokal möglich:** `npx cap add ios|android`, Signieren & Hochladen
      (braucht Xcode auf macOS bzw. Android Studio — nicht in der Cloud-Session)
- **Meilenstein:** veröffentlichbarer Build — bis auf das Signieren erreicht.

---

## Arbeitsweise pro Schritt
1. Kleine, in sich testbare Inkremente.
2. Nach jedem Kern-Feature ein Handy-Web-Build zum Antesten.
3. Wichtige Design-/Grafik-Entscheidungen: vorher fragen, bei Grafik immer **3 Varianten**.
4. GDD/Docs bleiben lebende Dokumente und werden mitgepflegt.
