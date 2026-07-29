# Ökonomie & Balancing — COREBREAKER

Lebendes Dokument zur Progressions- und Ökonomiekurve. Ziel: „nur-noch-ein-Upgrade"-Sog
ohne Runaway-Inflation, mit klaren Gates (Tiefe · Sprit · Hitze).

Alle Zahlen hier sind aus `prototype/trashy/index.html` abgelesen, nicht geschätzt.
Die Messwerte stammen aus echten Runs in Chromium (390×844).

## Kern-Loop-Werte
- **Sprit-Verbrauch beim Bohren:** `(3.4 + Bohrkraft/22) × (1 + 0.5·Overdrive)` /s.
  Höhere Bohrkraft drosselt sich selbst über den Tank; heiß fahren kostet zusätzlich.
- **Basistank:** 260. **Erholung nur, während NICHT gebohrt wird.**
- **Feld-Recycler (`energyRegen`):** füllt bis maximal **70 %** des Tanks (`REGEN_CAP`).
  Nur an der Oberfläche wird voll getankt — sonst wäre Sprit kein Budget mehr.
- **Hitze:** `heatGen` 6/s beim Bohren. Beim Loslassen lüftet der Bohrer mit
  `HEAT_VENT` 9/s, **rampend bis ×2,6**, je länger man vom Gas geht
  (aus 8 s Stillstand werden ~2,5 s).
- **Overdrive:** ab **70 %** Hitze bis zur roten Linie bei 95 %.
  Bohrgeschwindigkeit ×(1 + 0.38·o), Loot ×(1 + 0.75·o), Spritdurst ×(1 + 0.5·o).
  Bei 100 % ist der Run vorbei. Das ist die zentrale Gier-Entscheidung.
- **Schrottstaub:** *jeder* zerstörte Block zahlt nach Härte (dirt 2 · stone 4 ·
  hard 7 · dark 11), weil nur ~10–15 % der Kacheln echtes Erz tragen.
- **Extraktion:** bei erfolgreichem HOME gibt es **100 %** von Loot und Erz.
- **Bergungsdrohne:** bei Game Over werden **40 %** (`SALVAGE`) gutgeschrieben,
  Erz anteilig abgerundet. Ein schlechter Run kostet spürbar, aber nie alles.

## Weltgenerierung — relativ statt absolut
Gestein und Erz skalieren mit `f = Tiefe / (Ringe−1)`, also mit dem Fortschritt im
*jeweiligen* Schacht, nicht mit absoluten Metern:

| f | Gestein | ab hier möglich |
|---|---|---|
| < 0.15 | dirt (16 hp) | Ferrite |
| 0.15 | stone (34 hp) | + Cuprite (f > 0.13) |
| 0.38 | hard (64 hp) | + Crystal (f > 0.32) |
| 0.62 | dark (96 hp) | + Core (f > 0.55) |
| 0.78 | — | + Artefakt |

Vorher waren das feste Meterwerte (dark ab 18 m, Artefakte ab 20 m), abgestimmt auf
26 Ringe. Bei 60–102 Ringen hätte das den gesamten Mittelteil in eine einzige Platte
härtesten Gesteins mit Relikten in jeder zweiten Kachel verwandelt.

## Loot-Multiplikator (multiplikativ gebündelt in `lootMul()`)
```
Loot = Erzwert
     × valueMul(Skills + Refinerie + Module + Relikte, additiv auf Basis 1)
     × Planet.valueMul
     × prestigeMult((1 + 0.55·√Kerne) · (1 + 1.2·√Splitter))
     × expLoot(Expedition: 1 + 0.62·(Schicht−1))
     × Overdrive(1 … 1.75)
     × Combo(1 … 1.45, nur mit Kombo-Meister)
     × Event(Erzader ×1.6)
     × Challenge(z. B. Doppelter Loot ×2)
```
Prestige war bis zum Balancing-Pass **linear und unbegrenzt**
(`(1 + 0.12·Kerne)·(1 + 0.25·Splitter)`). Gemessen bei 300 Kernen / 30 Splittern
ergab das ×314 — ein einzelnes Relikt auf Obscura im Overdrive war 2,9 Mio. $
wert, also das Sechsfache **aller** Inhalte des Spiels (481 120 $) in einem
Griff. Die Wurzelkurve lässt frühe Belohnungen fast unverändert (10 Kerne:
×2,2 → ×2,7) und flacht den Schwanz hart ab (300 Kerne: ×37 → ×10,5).
Die Faktoren sind bewusst multiplikativ (Power-Fantasy), aber jede Quelle ist einzeln
begrenzt oder an Aufwand/Gefahr gekoppelt.

## Gemessene Kurve (Terra, 60 Ringe)

| | Run 1, ohne Skills | Mit 10 Skills |
|---|--:|--:|
| Tiefe | 31 m | 58 m |
| Beute | 482 $ | 1 315 $ |
| Dauer | 47 s | 65 s |
| Kern (60 m) | unerreichbar | erreichbar |

Der Kern von Terra fällt damit nach grob 6–8 Runs — nicht im ersten und nicht erst
im dreißigsten.

## Progressions-Gates (Planeten)
| Planet | Freischaltung $ | Ringe | Härte | Loot |
|---|--:|--:|--:|--:|
| Terra | 0 | 60 | 1.0 | 1.0 |
| Magmar | 900 | 68 | 1.5 | 1.7 |
| Cryonis | 4 200 | 76 | 2.1 | 2.5 |
| Ferro | 7 500 | 74 | 1.9 | 2.3 |
| Mechon | 13 000 | 72 | 1.8 | 2.0 |
| Neon | 21 000 | 76 | 2.2 | 2.8 |
| Abyss | 38 000 | 88 | 2.6 | 3.6 |
| Verdant | 70 000 | 96 | 2.9 | 4.4 |
| Obscura | 130 000 | 102 | 3.4 | 5.5 |

Die Ringzahl wurde ×2,3 angehoben. Vorher war der tiefste Planet 46 Ringe tief —
der Erfolg „Erreiche 100 m Tiefe" war damit **auf keinem Planeten erreichbar**,
ebenso die höchste Kontrakt-Stufe (160 m). Kontrakt-Stufen jetzt 30/55/85/120 m.

## Expedition — gemessener Bogen (Terra, 12 Skills)

| Schicht | Kern geknackt nach | Beute beim Kern |
|--:|--:|--:|
| 1 | 26 s | 232 $ |
| 2 | 74 s | 1 832 $ |
| 3 | 135 s | 4 652 $ |
| 4 | 183 s | 10 607 $ |
| 5 | 250 s | 22 256 $ |
| 6 | 330 s | 28 062 $ |

Ein Lauf trägt über **6 Minuten** und wird pro Schicht spürbar langsamer.
Der Beute-Zuwachs bremst sich ein (×7,9 → ×2,5 → ×2,3 → ×2,1 → ×1,3).

Vor dem Balancing-Pass sah derselbe Bogen so aus: Kern 1 nach 29 s, **alle 20
Relikte nach 64 s**, und die Beute sprang von 2 799 $ auf 24 962 $ in drei
Sektoren. Ohne Frachtraum-Grenze konnte man jeden Multiplikator gleichzeitig
besitzen — der Händler hörte auf, eine Entscheidung zu sein.

### Frachtraum
`RELIC_SLOTS = 6` von 20 Relikten. Ist er voll, wird jeder Kauf zum **Tausch**:
das Menü fragt, was dafür geht. Damit ist jeder Lauf ein anderer Build, und die
Entscheidung bleibt bis zur letzten Schicht bestehen.

### Schicht-Skalierung
| | pro Schicht | Schicht 10 |
|---|--:|--:|
| Härte (`expHard`) | +85 % | ×8,6 |
| Erzwert (`expLoot`) | +62 % | ×6,6 |
| Schaden (`expThreat`) | +40 % | ×4,6 |

Bedrohung wächst **schneller** als Belohnung: bei den alten Werten (Härte +55 %,
Wert +85 %) war Schicht 20 pro Einheit Gestein 1,5× lukrativer als Schicht 1 —
tiefer gehen war Gratisgeld statt Risiko. Jetzt liegt das Verhältnis bei 0,75.

`expThreat` skaliert Kreaturenbisse, den Sprit-Entzug der Wachdrohnen und den
Bosspuls. Vorher skalierte nur die Trefferpunkte-Zahl der Gegner, nicht ihr
Schaden — ein Krabbler biss auf Schicht 12 genauso hart wie auf Schicht 1.

## Meta-Sinks (wofür Cash ausgegeben wird)
Skill-Baum · Planeten-Freischaltung · 9 Bohrer-Module · Skins. Prestige/Aszension und
die Refinerie (Erz statt Cash) verlängern die Kurve ins Endlose.

## Frühere Balancing-Pässe
- **Glück gedeckelt:** effektives `luck` in der Weltgenerierung auf **0.4** begrenzt
  (Basis-Fundchance 0.15 → max ~0.55), verhindert „Erz auf fast jedem Feld".
- **Refinerie „Wert-Politur":** +12 % → **+8 %** Loot/Stufe, Kosten Kern 5 → **6**.
- **Modul „Wert-Prisma":** +60 % → **+50 %** Loot, Preis 3 600 → **4 200**.
- **Tagesziele:** 250 / 350 / 300 $ als früher Anschub.

## Offen fürs Playtesting
- Ob `SALVAGE` 0.4 zu großzügig ist, sobald Runs 1 500 $+ tragen.
- Feintuning der Modulpreise gegen Skill-Kosten gleicher Wirkung.
- Kurve der Kontrakt-Belohnungen relativ zum Spielfortschritt.
- Challenge-Score-Skalierung (aktuell `Tiefe×10 + Loot`).
