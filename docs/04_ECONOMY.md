# Ökonomie & Balancing — COREBREAKER

Lebendes Dokument zur Progressions- und Ökonomiekurve. Ziel: „nur-noch-ein-Upgrade"-Sog
ohne Runaway-Inflation, mit klaren Gates (Tiefe · Sprit · Hitze).

## Kern-Loop-Werte
- **Sprit-Verbrauch beim Bohren:** `(5 + Bohrkraft/22)` /s — höhere Bohrkraft drosselt sich
  selbst über den Tank. Kein Regen im Run.
- **Hitze:** Einweg-Budget (steigt beim Bohren, `Hitze ≥ 100 %` = Game Over). Cryo-Vent /
  Kühlung mildern, heben es aber nicht auf.
- **Extraktion:** nur bei erfolgreichem HOME werden Loot **und** Erz gutgeschrieben.

## Loot-Multiplikator (multiplikativ gebündelt in `lootMul()`)
```
Loot = Erzwert
     × valueMul(Skills + Refinerie + Module, additiv auf Basis 1)
     × Planet.valueMul
     × prestigeMult((1 + 0.12·Kerne) · (1 + 0.25·Splitter))
     × Combo(1 … 1.45, nur mit Kombo-Meister)
     × Event(Erzader ×1.6)
     × Challenge(z. B. Doppelter Loot ×2)
```
Die Faktoren sind bewusst multiplikativ (Power-Fantasy), aber jede Quelle ist einzeln
begrenzt oder an Aufwand/Gefahr gekoppelt.

## Balancing-Pass (dieser Stand)
- **Glück gedeckelt:** effektives `luck` in der Weltgenerierung auf **0.4** begrenzt
  (Basis-Fundchance 0.15 → max ~0.55), verhindert „Erz auf fast jedem Feld".
- **Refinerie „Wert-Politur":** +12 %→**+8 %** Loot/Stufe, Kosten Kern 5→**6**
  (war die günstigste Loot-Quelle).
- **Modul „Wert-Prisma":** +60 %→**+50 %** Loot, Preis 3600→**4200** (Preis an Wirkung
  angeglichen).
- **Tagesziele:** Belohnung leicht angehoben (250 / 350 / 300 $) als früher Anschub.

## Progressions-Gates (Planeten-Freischaltung, $)
| Planet | Kosten | Härte | Loot |
|---|--:|--:|--:|
| Terra | 0 | 1.0 | 1.0 |
| Magmar | 600 | 1.5 | 1.7 |
| Cryonis | 2 200 | 2.1 | 2.5 |
| Ferro | 3 200 | 1.9 | 2.3 |
| Mechon | 4 500 | 1.8 | 2.0 |
| Neon | 5 500 | 2.2 | 2.8 |
| Abyss | 9 000 | 2.6 | 3.6 |
| Verdant | 14 000 | 2.9 | 4.4 |
| Obscura | 22 000 | 3.4 | 5.5 |

## Meta-Sinks (wofür Cash ausgegeben wird)
Skill-Baum · Planeten-Freischaltung · 9 Bohrer-Module · Skins. Prestige/Aszension und
die Refinerie (Erz statt Cash) verlängern die Kurve ins Endlose.

## Offen fürs Playtesting
- Feintuning der Modulpreise gegen Skill-Kosten gleicher Wirkung.
- Kurve der Kontrakt-Belohnungen relativ zum Spielfortschritt.
- Challenge-Score-Skalierung (aktuell `Tiefe×10 + Loot`).
