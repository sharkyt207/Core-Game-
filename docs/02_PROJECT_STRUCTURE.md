# Projektstruktur & Daten-Schemas — COREBREAKER

*Version 0.1 · Phase 1*

Diese Struktur setzt die Architektur aus [`01_ARCHITECTURE.md`](01_ARCHITECTURE.md) in
konkrete Ordner, Module und Datenformate um. Sie ist der Bauplan für Phase 2.

---

## 1. Geplante Ordnerstruktur

```
core-game/
├── index.html                  # Einstiegspunkt (Portrait-Viewport-Meta)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── capacitor.config.ts         # (Phase 5) native Konfiguration
│
├── public/                     # statische Assets (Kopie 1:1 ins Build)
│   └── assets/
│       ├── sprites/            # Pixel-Art (Bohrer-Tiers, Blöcke, Ressourcen, VFX)
│       ├── audio/              # Musik & SFX
│       └── fonts/              # Pixel-Fonts
│
├── src/
│   ├── main.ts                 # Bootstrap: Phaser-Config, Scene-Registrierung
│   │
│   ├── core/                   # CORE LAYER
│   │   ├── EventBus.ts
│   │   ├── GameState.ts
│   │   ├── RunState.ts
│   │   ├── ServiceLocator.ts
│   │   ├── Registry.ts         # lädt & validiert Daten
│   │   └── RNG.ts
│   │
│   ├── data/                   # DATA LAYER (Inhalt = Daten, nicht Code)
│   │   ├── planets.json
│   │   ├── resources.json
│   │   ├── upgrades.json
│   │   ├── abilities.json
│   │   ├── modules.json
│   │   ├── balancing.json
│   │   └── schemas/            # TS-Typen + Laufzeit-Validierung
│   │       ├── Planet.ts
│   │       ├── Resource.ts
│   │       ├── Upgrade.ts
│   │       ├── Ability.ts
│   │       └── Module.ts
│   │
│   ├── systems/                # GAMEPLAY LAYER
│   │   ├── MovementSystem.ts
│   │   ├── WorldGenSystem.ts
│   │   ├── MiningSystem.ts
│   │   ├── EnergyHeatSystem.ts
│   │   ├── AbilitySystem.ts
│   │   ├── DroneSystem.ts
│   │   ├── ResourceSystem.ts
│   │   ├── ProgressionSystem.ts
│   │   └── HazardSystem.ts
│   │
│   ├── world/                  # Welt-Repräsentation
│   │   ├── Grid.ts
│   │   ├── Chunk.ts
│   │   └── Block.ts
│   │
│   ├── presentation/           # PRESENTATION LAYER
│   │   ├── Renderer.ts
│   │   ├── CameraController.ts
│   │   ├── VFXManager.ts
│   │   ├── AnimationManager.ts
│   │   └── AudioManager.ts
│   │
│   ├── ui/                      # UI LAYER
│   │   ├── hud/
│   │   ├── menus/
│   │   ├── shop/
│   │   └── LocaleManager.ts
│   │
│   ├── scenes/                  # Phaser Scenes
│   │   ├── BootScene.ts
│   │   ├── PreloadScene.ts
│   │   ├── MainMenuScene.ts
│   │   ├── HubScene.ts
│   │   ├── GameScene.ts
│   │   └── ResultScene.ts
│   │
│   ├── platform/                # PLATFORM LAYER (Abstraktionen)
│   │   ├── SaveAdapter.ts
│   │   ├── HapticsService.ts
│   │   └── StorageService.ts
│   │
│   └── utils/                   # math, pooling, helpers
│       ├── Pool.ts
│       ├── mathx.ts
│       └── easing.ts
│
├── locales/                    # i18n
│   ├── de.json
│   └── en.json
│
└── tests/                      # Vitest Unit-Tests
    ├── mining.test.ts
    ├── energy.test.ts
    └── progression.test.ts
```

---

## 2. Daten-Schemas (datengetriebenes Design)

Alle Inhalte werden über diese Schemas definiert. Ziel: neue Planeten/Ressourcen/Upgrades
**ohne Code-Änderung** hinzufügbar. Beispiele sind illustrativ (Startwerte, Balancing folgt).

### 2.1 Planet

```jsonc
{
  "id": "terra_prime",
  "name": "Terra Prime",
  "theme": "rock",
  "unlock": { "cost": 0, "requires": [] },
  "palette": ["#0b0e1a", "#2de2e6", "#ff8a3d", "#8a5cff"],
  "difficulty": 1,
  "layers": [
    { "fromDepth": 0,   "toDepth": 50,  "blocks": ["dirt", "ferrite"] },
    { "fromDepth": 50,  "toDepth": 150, "blocks": ["stone", "cuprite"] },
    { "fromDepth": 150, "toDepth": null, "blocks": ["hardstone", "energy_core"] }
  ],
  "hazards": [],
  "milestones": [ { "depth": 100, "reward": "module_unlock:double_drill" } ]
}
```

### 2.2 Resource

```jsonc
{
  "id": "energy_core",
  "name": "Energiekern",
  "rarity": "rare",            // common | uncommon | rare | legendary
  "baseValue": 250,
  "color": "#2de2e6",
  "foundOn": ["terra_prime", "magmar"],
  "minDepth": 120,
  "dropWeight": 0.04,
  "fanfare": { "vfx": "rare_burst", "sfx": "rare_find", "haptic": "strong" }
}
```

### 2.3 Upgrade

```jsonc
{
  "id": "drill_power",
  "category": "drill",          // drill | energy | resource | tech
  "name": "Bohrkraft",
  "unlocksMechanic": null,      // z. B. "ability:shockwave" statt nur +%
  "levels": [
    { "level": 1, "cost": 100,  "effect": { "drillPower": 2 } },
    { "level": 2, "cost": 250,  "effect": { "drillPower": 4 } },
    { "level": 3, "cost": 600,  "effect": { "drillPower": 7 } }
  ],
  "maxLevel": 3
}
```

### 2.4 Ability

```jsonc
{
  "id": "shockwave",
  "name": "Schockwelle",
  "type": "offensive",          // offensive | utility | drone
  "trigger": "active",          // active | passive | auto
  "cooldown": 6.0,
  "energyCost": 15,
  "effect": { "shape": "ring", "radius": 3, "damage": 999 },
  "vfx": "shockwave_ring",
  "sfx": "shockwave",
  "haptic": "strong",
  "unlockedBy": "module:seismic_core"
}
```

### 2.5 Module (Maschinen-Slot)

```jsonc
{
  "id": "plasma_head",
  "name": "Plasma-Bohrkopf",
  "slot": "drillHead",          // drillHead | chassis | reactor | utility
  "tier": 4,
  "cost": { "credits": 5000, "resources": { "energy_core": 5 } },
  "stats": { "drillPower": 12, "heatGen": 3 },
  "grantsAbility": "plasma_drill",
  "sprite": "drill_tier4",       // sichtbare Veränderung der Maschine
  "vfxAura": "plasma_aura"
}
```

### 2.6 Balancing (zentrale Kurven)

```jsonc
{
  "energy": { "baseCapacity": 100, "baseRegen": 5, "drillCost": 1 },
  "heat": { "max": 100, "coolRate": 8, "hardBlockGen": 2, "throttleAt": 80 },
  "extraction": { "baseCost": 10, "depthMultiplier": 0.5 },
  "economy": { "sellMultiplier": 1.0, "rarityBonus": { "rare": 1.5, "legendary": 3.0 } },
  "prestige": { "unlockDepth": 500, "multiplierPerCore": 0.1 }
}
```

---

## 3. Zentrale Typ-Contracts (Auszug)

```ts
// EventBus – typisierte Events (Auszug)
type GameEvents = {
  'block:destroyed': { blockId: string; depth: number; drop?: string };
  'resource:collected': { resourceId: string; amount: number; rarity: Rarity };
  'ability:activated': { abilityId: string };
  'energy:depleted': void;
  'run:ended': { depth: number; earnings: number };
  'upgrade:purchased': { upgradeId: string; level: number };
};

// RunState – flüchtiger Zustand eines Abstiegs
interface RunState {
  planetId: string;
  depth: number;
  energy: number;
  heat: number;
  inventory: Record<string, number>;
  activeCooldowns: Record<string, number>;
}

// GameState – persistenter Meta-Zustand
interface GameState {
  version: number;
  credits: number;
  upgrades: Record<string, number>;   // upgradeId -> level
  modules: string[];                   // installierte Module
  unlockedPlanets: string[];
  prestige: { cores: number; multiplier: number };
  settings: Settings;
}
```

---

## 4. Erweiterbarkeit — Beispiel-Workflow „neuer Planet"

1. Sprite-Set + Palette in `public/assets/sprites/` ablegen.
2. Eintrag in `planets.json` nach dem Planet-Schema hinzufügen.
3. Neue Materialien in `resources.json` ergänzen (falls nötig).
4. Fertig — `Registry` lädt & validiert beim Boot, der Planet erscheint im Hub.

Kein Code-Eingriff nötig → genau das Ziel „langfristig erweiterbar & veröffentlichbar".
