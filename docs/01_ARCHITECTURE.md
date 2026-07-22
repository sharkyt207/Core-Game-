# Technische Architektur — COREBREAKER

*Version 0.1 · Phase 1*

Ziel: eine **saubere, modulare, datengetriebene** Architektur, in der Gameplay,
Rendering, UI, Audio, Save-System und Daten klar getrennt sind — leicht erweiterbar für
neue Planeten, Ressourcen, Upgrades und Fähigkeiten, performant genug für 60 FPS.

---

## 1. Leitprinzipien

1. **Trennung der Belange (Separation of Concerns):** Gameplay-Logik kennt kein
   Rendering-Detail; UI kennt keine Simulations-Interna; alles kommuniziert über
   Events/Interfaces.
2. **Data-Driven Design:** Planeten, Ressourcen, Upgrades, Fähigkeiten, Module leben in
   JSON/TS-Datendateien, nicht in Code-Konstanten. Neue Inhalte = neue Daten, kein neuer
   Code.
3. **Composition over Inheritance:** Spielobjekte werden aus Komponenten/Systemen
   zusammengesetzt (leichtes ECS-Muster wo sinnvoll), statt tiefer Vererbungsbäume.
4. **Single Source of Truth:** zentraler `GameState` (Meta) + `RunState` (aktueller Run).
   UI und Systeme lesen daraus, schreiben über definierte Aktionen.
5. **Deterministische Kern-Simulation:** Gameplay-Update von Rendering entkoppelt →
   testbar, reproduzierbar (wichtig für spätere Leaderboards/Anti-Cheat).
6. **Performance by Design:** Pooling, Chunking, feste Update-Budgets.

---

## 2. Schichtenmodell

```
┌──────────────────────────────────────────────────────────────┐
│                        PLATFORM LAYER                         │
│   Capacitor (iOS/Android): Haptics, Storage, App-Lifecycle    │
│   Web: Vibration API, LocalStorage/IndexedDB                  │
├──────────────────────────────────────────────────────────────┤
│                        ENGINE LAYER                           │
│   Phaser 3: Scene-Management, Input, WebGL-Render, Loader     │
├──────────────────────────────────────────────────────────────┤
│                          UI LAYER                             │
│   HUD, Menüs, Shop, Settings  (reagiert auf EventBus)         │
├──────────────────────────────────────────────────────────────┤
│                       PRESENTATION LAYER                      │
│   Renderer, Kamera-Controller, Partikel, Animationen, Audio   │
├──────────────────────────────────────────────────────────────┤
│                        GAMEPLAY LAYER                         │
│   Systeme: Movement, Mining, Energie/Hitze, Fähigkeiten,      │
│   Drohnen, Ressourcen, Progression, WorldGen                  │
├──────────────────────────────────────────────────────────────┤
│                          CORE LAYER                           │
│   GameState, RunState, EventBus, ServiceLocator, ECS-Basis    │
├──────────────────────────────────────────────────────────────┤
│                          DATA LAYER                           │
│   planets.json · resources.json · upgrades.json ·            │
│   abilities.json · modules.json · balancing.json  + Schemas   │
└──────────────────────────────────────────────────────────────┘
```

**Kommunikation:** Systeme kommunizieren über einen **typisierten EventBus**
(z. B. `emit('block:destroyed', payload)`), nicht durch direkte Aufrufe kreuz und quer.
Das hält die Schichten entkoppelt und die UI reaktiv.

---

## 3. Kernmodule (Core Layer)

| Modul | Verantwortung |
|-------|---------------|
| `EventBus` | typisiertes Pub/Sub für Entkopplung der Systeme & UI |
| `GameState` | persistenter Meta-Zustand (Credits, Upgrades, Freischaltungen, Prestige) |
| `RunState` | flüchtiger Zustand des aktuellen Abstiegs (Tiefe, Energie, Hitze, Inventar) |
| `ServiceLocator` | Zugriff auf Dienste (Audio, Save, Haptics) ohne globale Singletons |
| `Registry` | lädt & validiert Daten (Planeten/Ressourcen/…) beim Boot |
| `RNG` | seedbarer Zufallsgenerator (deterministisch, testbar) |

---

## 4. Gameplay-Systeme (Gameplay Layer)

Jedes System ist eine eigenständige Einheit mit `update(dt)` und Event-Handlern:

| System | Aufgabe |
|--------|---------|
| `MovementSystem` | Anker-Wisch-Input → Geschwindigkeit/Richtung, Trägheit, Kollision |
| `WorldGenSystem` | chunk-basierte, prozedurale Schichtgenerierung pro Planet (seed) |
| `MiningSystem` | Blockzerstörung, Bohrkraft vs. Materialhärte, Drop-Erzeugung |
| `EnergyHeatSystem` | Energieverbrauch/-regen, Hitzeaufbau/-abbau, Drosselung |
| `AbilitySystem` | Cooldowns, Aktivierung, Effekte (Laser/Schockwelle/…), Automatisierung |
| `DroneSystem` | Orbit-Logik & Aufgaben der Drohnen |
| `ResourceSystem` | Inventar, Multiplikatoren, Seltenheits-Rolls, Auto-Pickup |
| `ProgressionSystem` | Verkauf, Upgrade-Käufe, Freischaltungen, Prestige |
| `HazardSystem` | Planeten-Gefahren (Lava, Kälte, mechanische Hindernisse) |

Systeme lesen Balancing aus dem `Registry`, schreiben in `RunState`/`GameState`, und
melden Ereignisse über den `EventBus` (die Presentation/UI reagieren darauf).

---

## 5. Welt-Repräsentation (Performance-Kern)

- **Grid + Chunks:** Die Welt ist ein vertikales Block-Grid, aufgeteilt in Chunks
  (z. B. 16×16). Nur Chunks im Kamera-Umfeld werden aktiv gehalten/gerendert.
- **Streaming:** Beim Abstieg werden neue Chunks prozedural erzeugt, weit entfernte
  entladen (Recycling in Pool).
- **Block-Daten:** kompakt (Typ-ID, Härte, Rest-HP) — nicht als schwere Objekte, sondern
  als typisierte Arrays, um GC-Druck zu minimieren.
- **Pooling:** Blöcke, Partikel, Number-Popups, Drops laufen über Objekt-Pools.

---

## 6. Presentation Layer

| Komponente | Aufgabe |
|------------|---------|
| `Renderer` | zeichnet nur sichtbare Chunks/Entities; Layer-Sortierung |
| `CameraController` | Smooth-Follow (Lerp), dynamischer Zoom, Screen Shake, Hit-Stop |
| `VFXManager` | Partikel-Systeme, Trails, Flash-Frames, Impact-Juice (pool-basiert) |
| `AnimationManager` | Sprite-Animationen (Bohrer-Tiers, Materialien, Fähigkeiten) |
| `AudioManager` | Musik-Layering, SFX mit Pitch-Randomisierung, Bus-Lautstärken |

**Wichtig:** Presentation *liest* Gameplay-Zustand & Events, verändert ihn aber nicht →
Simulation bleibt unabhängig und testbar.

---

## 7. UI Layer

- Szenenbasiert (Phaser Scenes) + reaktive HUD-Komponenten, die auf EventBus hören.
- **Szenen:** `BootScene` → `PreloadScene` → `MainMenuScene` → `HubScene`
  (Planetenwahl/Shop) → `GameScene` (Run) → `ResultScene`.
- HUD und Simulation sind getrennt: HUD spiegelt `RunState`, sendet Aktionen (z. B.
  „Fähigkeit X aktivieren", „Extraktion").
- i18n-Layer (`LocaleManager`) von Beginn an; alle Strings über Keys.

---

## 8. Persistenz (Save-System)

- **Interface `SaveAdapter`** mit Implementierungen:
  - Web: `LocalStorageAdapter` / `IndexedDBAdapter`
  - Nativ: Capacitor `Preferences`/Filesystem
  - Später: `CloudSaveAdapter` (Struktur bereits vorgesehen)
- **Versioniertes Save-Format** + Migrationsfunktionen (Schema-Version im Save).
- Auto-Save bei Schlüssel-Events (Run-Ende, Kauf, Prestige), debounced.
- Nur `GameState` (Meta) wird persistiert; `RunState` ist flüchtig (optionaler
  „Run fortsetzen"-Snapshot später).

---

## 9. Plattform-Abstraktion

Alles Plattformabhängige hinter Interfaces, damit Web-Dev & native App denselben Code
nutzen:

| Service | Web | Nativ (Capacitor) |
|---------|-----|-------------------|
| Haptics | Vibration API | `@capacitor/haptics` |
| Storage | LocalStorage/IndexedDB | `@capacitor/preferences` |
| Lifecycle | Page Visibility | `@capacitor/app` |
| Audio-Unlock | User-Gesture | nativ |

---

## 10. Build & Deployment

- **Dev:** Vite Dev-Server → sofort im Handy-Browser testbar (LAN-URL / gehosteter Build).
- **Web-Build:** `vite build` → statische Dateien (spielbar & teilbar).
- **Nativ:** `npx cap add ios/android` → `cap sync` → Store-Builds (Phase 5+).
- **CI (später):** Lint (ESLint) + Typecheck (tsc) + Unit-Tests (Vitest) auf Push.

---

## 11. Teststrategie

- **Unit-Tests (Vitest):** reine Logik-Systeme (Mining-Berechnung, Energie/Hitze,
  Drop-Rolls, Progression/Preise) — profitieren von der Simulations-Entkopplung.
- **Deterministische Runs:** über seedbaren RNG reproduzierbare Testszenarien.
- **Playtest-Builds:** kontinuierliche Web-Builds fürs Handy-Feedback.

---

## 12. Technologie-Abhängigkeiten (geplant, minimal)

| Zweck | Paket |
|-------|-------|
| Engine | `phaser` |
| Build/Dev | `vite`, `typescript` |
| Mobile | `@capacitor/core`, `@capacitor/haptics`, `@capacitor/preferences`, `@capacitor/app` |
| Tests | `vitest` |
| Lint/Format | `eslint`, `prettier` |

Grundsatz: **so wenige Abhängigkeiten wie möglich**, um Wartbarkeit & Ladezeit gering zu
halten.
