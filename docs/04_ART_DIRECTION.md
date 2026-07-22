# Art Direction — COREBREAKER

*Version 0.1 · Phase 1*

Eigene visuelle Identität — **kein Klon** bestehender Spiele. Hochwertige Pixel-Art,
futuristisch, Sci-Fi, Neon, mit dynamischer Beleuchtung und vielen Animationen.

---

## 1. Visuelle Leitidee
Eine dunkle Weltraum-/Untergrund-Welt, durchzogen von leuchtenden Neon-Adern und
Energie-Elementen. Die Maschine ist die hellste, „lebendigste" Sache im Bild — ihr
Leuchten wächst mit ihrer Macht. Kontrast zwischen kaltem Dunkel und heißen Neon-Akzenten
erzeugt das Sci-Fi-Gefühl.

## 2. Farbpalette (Startvorschlag)
| Rolle | Farbe | Hex |
|-------|-------|-----|
| Hintergrund/Weltraum | Tiefdunkelblau | `#0b0e1a` |
| Primär-Neon | Cyan | `#2de2e6` |
| Sekundär-Neon | Türkis | `#12d9b0` |
| Akzent kalt | Violett | `#8a5cff` |
| Akzent heiß | Orange | `#ff8a3d` |
| Warnung/Hitze | Rot-Orange | `#ff4d4d` |

Jeder Planet variiert diese Palette (eigene Stimmung), behält aber die Neon-Grundsprache
für Wiedererkennung.

## 3. Stil-Regeln (Konsistenz)
- **Pixel-Grid:** einheitliche Auflösung pro Sprite-Klasse (z. B. Blöcke 32×32).
- **Beleuchtung:** Neon-Emission über additive Glow-Layer; dunkle Basis, helle Kanten.
- **Lesbarkeit zuerst:** Gameplay-relevante Objekte (seltene Ressourcen, Gefahren) heben
  sich klar ab — Farbe + Form + leichte Animation.
- **Animation überall:** Bohrer-Rotation, pulsierende Kerne, flackernde Neon-Adern,
  Partikel — die Welt „lebt".
- **Portrait-first:** Komposition auf Hochformat optimiert; vertikale Führung.

## 4. Kern-Assets (Umfang Phase 2–5)
- **Maschine:** 6 Bohrer-Tiers (sichtbare Evolution) + Modul-Overlays + Aura-VFX.
- **Blöcke:** pro Planet ein Material-Set (Dirt/Stone/Erz/Kristall/…) mit Zerstör-Frames.
- **Ressourcen-Drops:** pro Ressource ein leuchtendes Icon + Sammel-VFX.
- **Fähigkeiten-VFX:** Laser, Schockwelle-Ring, Explosion, Plasma-Aura, Magnetfeld.
- **Drohnen:** 4 Typen, orbitierend, mit Trails.
- **UI-Kit:** HUD-Rahmen, Buttons, Cooldown-Ringe, Pixel-Font.

## 5. Asset-Pipeline
- **Design/Konzept & Mockups:** Canva (Key-Art, UI-Mockups, Farb-/Stil-Studien).
- **Pixel-Sprites/Animation:** dediziertes Pixel-Tool für produktionsreife Sprites
  (Canva eignet sich für Konzept & UI-Layouts, weniger für animierte Pixel-Sprites —
  hier wird ggf. ergänzt).
- **Integration:** Sprites → `public/assets/sprites/`, Referenzierung über Daten-Schemas
  (`sprite`-Feld), damit Optik und Daten gekoppelt bleiben.

## 6. Entscheidungs-Workflow für Grafik (mit dir)
Bei jeder wichtigen Grafik-Entscheidung (Maschinen-Look, Planeten-Stimmung, UI-Stil)
werden **3 Varianten** vorgelegt. Gefällt keine, beschreibst du Änderungen → neue 3
Varianten. So entsteht die Identität iterativ und nach deinem Geschmack.

**Nächster offener Punkt (Phase 1-Abschluss):** 3 Konzept-Varianten für den
**Starter-Bohrer + Grundstimmung**, erstellt in Canva, zur Auswahl.
