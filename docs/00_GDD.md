# Game Design Document — COREBREAKER

*Version 0.1 · Living Document · Stand: Phase 1 (Konzept)*

> Dieses GDD ist ein **lebendes Dokument**. Es wird während der Entwicklung fortlaufend
> präzisiert. Balancing-Zahlen sind Startwerte und werden im Playtesting justiert.

---

## 1. Vision & Pillars

### 1.1 High Concept
Ein vertikales Mining-Action-Game im Hochformat. Der Spieler steuert eine Bohrmaschine,
die sich durch die Materialschichten fremder Planeten arbeitet. Über eine tiefe
Progression entwickelt sich der Spieler von einem vorsichtigen Anfänger zu einer
übermächtigen Maschine, die ganze Planeten in Sekunden zerlegt.

### 1.2 Design Pillars
Jede Design-Entscheidung wird an diesen vier Säulen gemessen:

1. **Spürbare Macht** — Jedes Upgrade ist sichtbar, hörbar und fühlbar (Haptik). Der
   Fortschritt vom kleinen Bohrer zur Welten-Maschine muss *körperlich* erlebbar sein.
2. **„Nur noch ein Run"** — Der Core-Loop muss einen sofortigen Wiederholungssog erzeugen.
   Jeder Run endet mit einem greifbaren nächsten Ziel.
3. **Einhändig & sofort** — Touch-first, latenzarm, im unteren Bildschirmdrittel bedienbar.
   Reinsetzen und spielen ohne Tutorial-Wall.
4. **Eigene Identität** — Kein Klon. Eigener Pixel-Art-Neon-Sci-Fi-Look, eigene Farbwelt,
   eigenes Maschinen-Design.

### 1.3 Zielgruppe
- Casual-bis-Midcore Mobile-Spieler, die Progressions- & Idle/Active-Hybrid-Games mögen
  (Fans von Mining-, Roguelite- und Prestige-Loops).
- Sessions von 2–10 Minuten, mehrfach täglich.

---

## 2. Core Gameplay Loop

```
   ┌─────────────────────────────────────────────────────────────┐
   │                                                             │
   ▼                                                             │
[Planet wählen] → [Abstieg] → [Mining & Vordringen] → [Energie   │
   managen] → [seltene Funde] → [Rückkehr/Extraktion] → [Verkauf]│
   → [Upgrades kaufen] → [Neues freischalten] ───────────────────┘
```

**Der Loop im Detail:**

1. **Planet wählen** — aus freigeschalteten Planeten (Hub/Menü).
2. **Abstieg starten** — Maschine wird an der Oberfläche abgesetzt, Run beginnt.
3. **Mining** — Bohrer (Bildschirmmitte) frisst sich durch Blöcke; Welt bewegt sich.
4. **Vordringen** — je tiefer, desto härtere Materialien, seltenere Ressourcen, mehr Gefahr.
5. **Energie/Hitze managen** — zentrale Spannungsressource (siehe §5).
6. **Seltene Funde** — lösen Sonder-Animation, Sound & starke Haptik aus.
7. **Rückkehr / Extraktion** — zurück zur Oberfläche ODER Notfall-Extraktion (Teleport).
8. **Verkauf** — Ressourcen → Credits.
9. **Upgrades** — Maschine verbessern (neue Zahlen *und* neue Fähigkeiten).
10. **Freischalten** — neue Zonen, Planeten, Module.

Jeder Run soll mit mindestens einem der drei Sätze enden:
*„Nur noch ein Upgrade." / „Nur noch ein Versuch." / „Nur noch tiefer."*

---

## 3. Steuerung (Touch-first)

### 3.1 Grundprinzip: Bohrer = Mittelpunkt
- Der Bohrer steht **immer exakt in der Bildschirmmitte**.
- Der Spieler bewegt **nicht** den Bohrer, sondern **die Welt bewegt sich um ihn herum**.
- Die Kamera ist fest am Bohrer, mit weichem Follow-Lag für hochwertiges Gefühl.

### 3.2 Eingabe: Anker-Wisch-Steuerung (kein sichtbarer Joystick)
Verbesserte Variante der ursprünglichen „Wischen = Richtung" Idee:

- **Finger aufsetzen** (bevorzugt unteres Drittel) → definiert einen **Ankerpunkt**.
- **Auslenkung** vom Anker → bestimmt **Richtung**.
- **Distanz** der Auslenkung → bestimmt **Geschwindigkeit** (0 → max, mit Deadzone).
- **Loslassen** → Geschwindigkeit fällt sanft ab (Trägheit/Ease-out).

Vorteile ggü. reinem Swipe: einhändig, kein Nachgreifen, konstante Kontrolle beim
Dauer-Mining, sehr niedrige Latenz. Es ist ein *unsichtbarer* Analog-Stick — erfüllt den
Wunsch „kein Steuerkreuz / kein Joystick" (nichts ist sichtbar), aber ohne Ermüdung.

**Optional/Settings:** kleiner, dezenter Anker-Indikator ein-/ausblendbar (Accessibility).

### 3.3 Fähigkeiten-Eingabe
- Fähigkeiten liegen auf **Buttons am unteren Rand** (Daumenreichweite), mit Cooldown-Ring.
- Manche Fähigkeiten sind passiv/automatisch (Endgame-Automatisierung).

---

## 4. Kamera & Game Feel

| Feature | Beschreibung |
|---------|--------------|
| Smooth Follow | Kamera folgt dem Bohrer mit leichter Verzögerung (Lerp). |
| Dynamischer Zoom | Zoom-Out bei großflächigen Fähigkeiten, Zoom-In bei Fokus-Momenten. |
| Screen Shake | Skaliert mit Ereignis-Stärke (Explosion > seltener Fund > normales Mining). |
| Hit-Stop | Minimaler Frame-Freeze bei starken Treffern (Impact-Gefühl). |
| Partikel & Trails | Bohr-Funken, Debris, Neon-Trails; Intensität steigt mit Maschinen-Tier. |
| Juice | Squash/Stretch, Flash-Frames bei Blockzerstörung, Number-Popups. |

**Grundsatz:** Game Feel steht über Realismus. Der Spieler soll die *Wucht* der Maschine
in jedem Frame spüren.

---

## 5. Energie & Hitze — die Spannungsressource

Statt eines harten Fuel-Cutoffs nutzen wir eine **Risk/Reward-Kurve**, die den
„nur-noch-10-Meter"-Sog erzeugt:

- **Energie** treibt Bohrer & Fähigkeiten an, regeneriert langsam / an Oberfläche.
- **Hitze** steigt beim Bohren harter Materialien und beim Fähigkeits-Einsatz; zu hohe
  Hitze drosselt/beschädigt die Maschine → zwingt zu Pausen oder Kühl-Modulen.
- **Rückweg-Kosten** steigen mit der Tiefe: je tiefer, desto teurer/gefährlicher die
  Extraktion. Der Spieler wägt ständig ab: *„Noch tiefer für den seltenen Fund — oder
  jetzt sicher raus?"*
- **Notfall-Extraktion (Teleport):** teuer, aber rettet den Run (verhindert Frust).

Dieser Spannungsbogen ist der **primäre Retention-Motor** innerhalb eines Runs.

---

## 6. Die Maschine (Der Bohrer)

Das zentrale, sich ständig verändernde Objekt. **Jedes Upgrade ist sichtbar.**

### 6.1 Visuelle Evolutionsstufen (Tiers)
| Tier | Look | Beispiel-Features |
|------|------|-------------------|
| 1 Starter | kleiner, simpler Bohrkopf, wenige Effekte | einzelner Bohrer |
| 2 Verstärkt | größerer Kopf, erste Neon-Akzente | verstärkte Panzerung |
| 3 Multi-Modul | mehrere rotierende Module | Doppelbohrer, Energiekern sichtbar |
| 4 Plasma | glühende Plasma-Elemente | Plasma-Bohrer, Wärme-Aura |
| 5 Laser/Drohnen | Laser-Komponenten, orbitierende Drohnen | Laserstrahl, Sammeldrohnen |
| 6 Apex (Endgame) | massive Maschine, leuchtende Kerne, Partikelsturm | Kettenreaktionen, Magnetfelder |

Zielgefühl bei Tier 6: *„Meine Maschine sieht komplett anders aus als am Anfang."*

### 6.2 Modul-Slots (datengetrieben)
Die Maschine hat Slots (Bohrkopf, Chassis, Reaktor, Utility×N). Module verändern Stats
**und** Aussehen **und** schalten Fähigkeiten frei. Siehe Daten-Schema in
[`02_PROJECT_STRUCTURE.md`](02_PROJECT_STRUCTURE.md).

---

## 7. Fähigkeitensystem

Fähigkeiten eröffnen **neue Gameplay-Möglichkeiten**, nicht nur höhere Zahlen.

### 7.1 Offensiv
| Fähigkeit | Effekt |
|-----------|--------|
| Plasma-Bohrer | temporär massiv erhöhte Bohrkraft + Flächenschaden |
| Laserstrahl | durchbohrt eine ganze Materialsäule sofort |
| Schockwelle | zerstört Blöcke ringförmig um die Maschine |
| Explosion | punktueller Flächen-Burst mit hohem Schaden |
| Energiewelle | vertikale Welle nach unten, räumt Weg frei |
| Kristallzerstörung | Spezialschaden gegen harte Kristallschichten |

### 7.2 Utility
| Fähigkeit | Effekt |
|-----------|--------|
| Magnet | zieht loses Material im Radius an |
| Auto-Sammlung | sammelt automatisch, Endgame-Automatisierung |
| Scanner | zeigt seltene Vorkommen in der Nähe |
| Teleport | Notfall-Extraktion / Kurzsprung |
| Reparatur | stellt Hüllenintegrität wieder her |
| Energieschild | absorbiert Hitze/Schaden temporär |

### 7.3 Drohnen (orbitierende Begleiter)
| Drohne | Aufgabe |
|--------|---------|
| Sammeldrohne | sammelt Ressourcen autonom |
| Reparaturdrohne | repariert die Maschine im Run |
| Angriffsdrohne | bohrt/zerstört zusätzliche Blöcke |
| Scan-Drohne | erweitert Scanner-Radius dauerhaft |

Drohnen sind sichtbar (orbitierend) → verstärken die visuelle Power-Fantasy.

---

## 8. Upgrade- & Progressionssystem

### 8.1 Kategorien
**Bohrer:** Stärke · Geschwindigkeit · Reichweite · Effizienz · Kritische Treffer
**Energie:** Tankgröße · Verbrauch · Regeneration · Hitze-Management
**Ressourcen:** Multiplikator · Seltenheitsbonus · Auto-Sammlung
**Technologie:** neue Module · Spezialfähigkeiten · Automatisierung

**Regel:** Mindestens jedes N-te Upgrade schaltet eine *neue Mechanik* frei (nicht nur +%).

### 8.2 Progressions-Achsen
1. **Run-intern:** temporäre Boosts/Fähigkeiten während eines Abstiegs.
2. **Meta (permanent):** Credits → dauerhafte Maschinen-Upgrades zwischen Runs.
3. **Prestige / „Core Reactor" (Endgame):** Reset gegen permanente Multiplikatoren →
   ermöglicht die übertriebene Endgame-Power-Fantasy und Langzeit-Retention.

### 8.3 Endgame-Power-Fantasy (bewusst „gamebreaking")
Im Endgame besitzt der Spieler eine Maschine mit:
riesiger Abbaufläche · automatischen Fähigkeiten · Kettenreaktionen · Explosionsketten ·
Lasern · Plasma · Drohnenschwarm · Magnetfeldern · Energieangriffen · Auto-Pickup ·
massiven Partikeleffekten · sehr hoher Geschwindigkeit. Ganze Planetenabschnitte fallen in
Sekunden. Gefühl: *„Ich bin kein Anfänger mehr. Ich bin eine Maschine."*

---

## 9. Planeten

Jeder Planet hat eigenes Design, Farbpalette, Materialien, Schwierigkeit, Herausforderung.
Datengetrieben (JSON) → beliebig erweiterbar.

| Planet | Thema | Besonderheit |
|--------|-------|--------------|
| Terra Prime | Gestein/Tutorial | sanfter Einstieg, Basismetalle |
| Cryonis | Eis | rutschige Physik, brüchige Schichten, Kälte-Hitze-Balance |
| Magmar | Vulkan | Lava-Hitzezonen, Hitze-Management kritisch |
| Crystallis | Kristall | harte Schichten, Kristallzerstörung nötig, hoher Wert |
| Mechon | Maschinenwelt | mechanische Hindernisse, Alt-Tech-Ressourcen |
| Xeno-9 | Alienwelt | organische Strukturen, Alien-Materialien |
| Abyss | dunkler Tiefenplanet | Sicht eingeschränkt, seltenste Artefakte, härtestes Endgame |

Jeder Planet: eigene Materialschichten-Kurve + „Boss-Schicht"/Meilenstein-Tiefen.

---

## 10. Ressourcen

| Klasse | Beispiele | Rolle |
|--------|-----------|-------|
| Normal | Ferrit, Cuprit, Basismineralien | Grundeinkommen, Basis-Upgrades |
| Selten | Energiekerne, Alien-Materialien, seltene Kristalle | mittlere/höhere Upgrades, Module |
| Sehr selten | einzigartige Artefakte, Spezialmaterialien | Endgame-Freischaltungen, Prestige |

Seltene Funde lösen **Sonder-Animation + eigener Sound + starke Haptik** aus (Belohnungs-
Moment). Rarität ist planeten- und tiefenabhängig.

---

## 11. Audio-Konzept

**Musik**
- Menü: atmosphärisch, futuristisch, ruhig.
- Gameplay: dynamisch, Intensität/Layer steigen mit Tiefe.

**Sounds (eigene Library)**
Bohren · Materialzerstörung (pro Material eigener Klang) · Explosionen · Upgrades · Käufe ·
seltene Funde · Level-Ups · Menü-Interaktionen.

Technik: Layering & leichte Pitch-Randomisierung gegen Wiederholungs-Ermüdung.

---

## 12. Haptik (Vibration)

| Stärke | Auslöser |
|--------|----------|
| Leicht | normales Mining, UI-Tap |
| Mittel | seltene Materialien, Fähigkeits-Einsatz |
| Stark | Explosionen, neuer Planet, großes Upgrade, Prestige |

Umschaltbar in den Einstellungen. Auf Web via Vibration API, nativ via Capacitor Haptics.

---

## 13. UI & Menüs

### 13.1 Hauptmenü
- **Spiel starten** · **Einstellungen** · **Spiel beenden**
- Vorbereitet (Platzhalter/Struktur) für: Bestenlisten · Erfolge · Multiplayer ·
  Cloud Save · Events.

### 13.2 In-Game-HUD (minimal, Portrait)
- Oben: Tiefe, Energie/Hitze, Credits, aktueller seltener Fund-Ticker.
- Unten: Fähigkeiten-Buttons (Daumenzone), Anker-Steuerzone.
- Extraktions-Button gut erreichbar.

### 13.3 Einstellungen
**Audio:** Musiklautstärke · Effektlautstärke
**Gameplay:** Vibration an/aus · Screen Shake an/aus
**Grafik:** Effekt-Intensität · Qualitätsstufe (Performance-Modus)
**Sonstiges:** Sprache (i18n von Anfang an vorgesehen; Start: DE/EN)

---

## 14. Retention & Meta (Product-Sicht)

- **Session-Ziel:** klarer nächster Meilenstein am Run-Ende (Upgrade fast leistbar).
- **Daily-Hooks:** tägliche Belohnung, tägliche Ziel-Tiefe/Auftrag (später).
- **Prestige-Loop:** Langzeit-Motivation über „Core Reactor"-Resets.
- **Kollektions-Drang:** Artefakte/Materialien-Sammlung als Completion-Anreiz.

---

## 15. Monetarisierung (fair, publishable) — später

Kein Pay-to-Win. Vorgesehen, aber erst nach dem spielbaren Kern:
- **Rewarded Ads** (freiwillig: Run-Boost, Verdopplung des Verkaufs).
- **Kosmetik** (Bohrer-Skins, Trails, Farbthemen).
- **Optionale Booster/Convenience** (kein Fortschritts-Gate).
- Einmal-Kauf „Werbung entfernen".

---

## 16. Performance-Ziele

- **60 FPS** auf modernen Smartphones.
- Objekt-Pooling für Blöcke, Partikel, Number-Popups.
- Chunk-basiertes Welt-Streaming (nur sichtbarer Bereich aktiv).
- Qualitätsstufen (Partikel-Cap) für schwächere Geräte.
- Kurze Ladezeiten, kleine Asset-Größen (Pixel-Art hilft).

---

## 17. Offene Design-Fragen (für spätere Runden)
- Exakte Balancing-Kurven (Preise, Drop-Raten, Tiefen-Skalierung) → Playtesting.
- Genaue Anzahl Fähigkeiten-Slots pro Tier.
- Prestige-Formel (Multiplikator-Kurve).
- Umfang Multiplayer (Async-Leaderboard zuerst, echtes MP später).

Diese Fragen blockieren den Start **nicht** — der spielbare Kern kann mit Startwerten
gebaut und dann justiert werden.
