# COREBREAKER veröffentlichen — Schritt für Schritt

Ziel: das Spiel für **1,99 €** im App Store und/oder Google Play verkaufen.

> **Was du dafür zwingend brauchst:** Für iOS einen **Mac mit Xcode** — Apple lässt
> Builds nur dort signieren. Für Android reicht **Android Studio** auf Mac, Windows
> oder Linux. Eine Cloud-Session kann diesen Schritt nicht übernehmen; alles davor
> ist bereits erledigt und liegt im Repo.

---

## Was schon fertig ist

| Punkt | Wo |
|---|---|
| Spiel, getestet, Build grün | `game/` |
| App-Icon-Quellbild 1024×1024 (opak) | `game/resources/icon.png` |
| Splash-Screens 2732×2732 | `game/resources/splash*.png` |
| Icon-Konzepte A/B/C zum Wechseln | `game/tools/icons/` |
| 12 echte Screenshots 1290×2796 | `game/store/screenshots/` |
| Play-Grafik 1024×500 | `game/store/feature-graphic-1024x500.png` |
| Store-Texte DE + EN | `game/store/STORE_LISTING.md` |
| **Datenschutzerklärung** (Pflicht!) | `game/store/privacy.html` |
| Capacitor-Konfiguration, Splash, StatusBar | `game/capacitor.config.ts` |

---

## Kosten & Zeit (realistisch)

| | Apple App Store | Google Play |
|---|---|---|
| Konto | **99 $/Jahr** | **25 $ einmalig** |
| Voraussetzung | Mac + Xcode | Android Studio |
| Prüfdauer | meist 1–3 Tage | meist einige Stunden bis 2 Tage |
| Einnahmen | 85 % (unter 1 Mio $/Jahr im Small Business Program, sonst 70 %) | 85 % (unter 1 Mio $/Jahr, sonst 70 %) |

Bei 1,99 € bleiben dir also grob **1,40–1,70 €** pro Verkauf (nach Store-Anteil und MwSt.).

> **Empfehlung:** Fang mit **Google Play** an. 25 € statt 99 €/Jahr, kein Mac nötig,
> schnellere Prüfung. Wenn es dort läuft, lohnt sich iOS.

---

## Schritt 0 — Vorher erledigen (beide Stores)

### 0.1 Datenschutzerklärung online stellen
Beide Stores verlangen eine **öffentlich erreichbare URL**. Ohne die geht gar nichts.

1. In `game/store/privacy.html` deine **E-Mail-Adresse** eintragen
   (zweimal `DEINE-EMAIL@example.com` / `YOUR-EMAIL@example.com` ersetzen).
2. Irgendwo kostenlos hosten, z. B.:
   - **GitHub Pages** (Repo muss dafür öffentlich sein oder GitHub Pro)
   - **Cloudflare Pages** / **Netlify** (kostenlos, Repo darf privat bleiben)
3. Die entstehende Adresse notieren, z. B. `https://…/privacy.html`

> Inhaltlich ist die Erklärung bereits korrekt: Das Spiel macht **keine
> Netzwerkaufrufe**, hat keine Werbung, kein Tracking und speichert alles nur
> lokal. Das ist geprüft, nicht behauptet.

### 0.2 Entwicklername festlegen
Der erscheint im Store über dem App-Namen. Aktuell steht im Splash der Platzhalter
**„NEONFORGE"** — sag mir deinen Wunschnamen, dann tausche ich ihn im Spiel aus.

### 0.3 Icon final wählen
Aktiv ist **Konzept A**. Wechseln geht in einem Befehl:
```bash
cd game/tools
ICON=B node native-assets.cjs && ICON=B node pwa-icons.cjs && ICON=B node feature-graphic.cjs
```

---

## Weg A — Google Play (empfohlener Start)

### A1. Konto anlegen
[play.google.com/console](https://play.google.com/console) → 25 $ zahlen → Identität bestätigen
(dauert 1–2 Tage).

### A2. App bauen
```bash
cd game
npm install
npm run build
npx cap add android
npm run assets:generate      # Icons & Splashes in alle Größen
npm run android:open         # öffnet Android Studio
```

In Android Studio:
1. `android/app/src/main/AndroidManifest.xml` → in der `<activity>`
   `android:screenOrientation="portrait"` ergänzen.
2. `android/app/build.gradle` → `versionCode 1`, `versionName "1.0.0"`.
3. **Keystore erzeugen** und *sicher* aufbewahren — ohne ihn sind später **keine
   Updates mehr möglich**:
   ```bash
   keytool -genkey -v -keystore corebreaker.keystore \
     -alias corebreaker -keyalg RSA -keysize 2048 -validity 10000
   ```
   (Die `.gitignore` schließt Keystores bereits aus — nie ins Repo legen.)
4. **Build ▸ Generate Signed Bundle / APK ▸ Android App Bundle (.aab)**

### A3. Store-Eintrag ausfüllen
Alle Texte stehen fertig in `game/store/STORE_LISTING.md`.

- **App-Name:** COREBREAKER
- **Kurzbeschreibung** (80 Zeichen) und **Vollständige Beschreibung** → aus der Datei
- **App-Symbol:** `game/store/icons/icon_A_512.png`
- **Feature-Grafik:** `game/store/feature-graphic-1024x500.png`
- **Screenshots:** mindestens 2, nimm 4–8 aus `game/store/screenshots/`
  (empfohlene Reihenfolge: `04_gameplay`, `02_tree`, `03_planets`, `08_modules`, `01_title`)
- **Datenschutzerklärung:** deine URL aus Schritt 0.1

### A4. Die Fragebögen
- **Data safety:** überall **„Nein, es werden keine Daten erfasst"** — das stimmt.
- **Content rating:** Fragebogen ausfüllen → ergibt PEGI 3 / „Jeder".
- **Zielgruppe:** keine Kinder-Kategorie wählen (sonst gelten strengere Regeln).
- **Preis:** Land für Land oder global **1,99 €** setzen.

### A5. Einreichen
**Production ▸ Create new release** → `.aab` hochladen → Review starten.

---

## Weg B — Apple App Store

### B1. Konto anlegen
[developer.apple.com/programs](https://developer.apple.com/programs) → 99 $/Jahr.
Danach im **App Store Connect** eine neue App mit der Bundle-ID
`com.corebreaker.game` anlegen.

### B2. App bauen (nur auf einem Mac)
```bash
cd game
npm install
npm run build
npx cap add ios
npm run assets:generate
npm run ios:open             # öffnet Xcode
```

In Xcode:
1. **Signing & Capabilities** → dein Team wählen.
2. **Deployment Info** → nur **Portrait** aktiviert lassen.
3. **General** → Version `1.0.0`, Build `1`.
4. Gerät auf „Any iOS Device" stellen → **Product ▸ Archive**
   → **Distribute App** → **App Store Connect**.

### B3. Store-Eintrag ausfüllen
- **Name:** COREBREAKER · **Untertitel:** Bohr dich zum Kern
- **Beschreibung, Keywords, Promo-Text** → aus `game/store/STORE_LISTING.md`
- **Screenshots:** 6,7″ (1290×2796) — genau das Format liegt bereit
- **Datenschutz-URL:** deine URL aus Schritt 0.1
- **App Privacy:** **„Data Not Collected"** auswählen
- **Altersfreigabe:** Fragebogen → ergibt 4+
- **Preis:** Tier für 1,99 €

### B4. Einreichen
**Add for Review** → einreichen. Bei Rückfragen antwortet Apple im Review-Bereich.

---

## Häufige Ablehnungsgründe (und warum sie hier nicht greifen)

| Grund | Status |
|---|---|
| Fehlende Datenschutz-URL | ✅ vorbereitet, muss nur gehostet werden |
| Platzhalter-Inhalte / „Demo" | ✅ vollständiges Spiel |
| Absturz beim Start | ✅ Build getestet, 16 Test-Suiten grün |
| Nur eine Website im Rahmen | ✅ echtes Spiel, offline lauffähig |
| Falsche Screenshots | ✅ echte Aufnahmen aus dem Spiel |
| Rechte an Bildern/Ton | ✅ alles selbst erzeugt (Grafik im Code, Ton prozedural) |

---

## Nach der Veröffentlichung

- **Updates:** Code ändern → `npm run cap:sync` → Version hochzählen → neu einreichen.
- **Android-Keystore sichern.** Verloren = keine Updates mehr möglich, nie.
- **Preis ändern** geht jederzeit in der Console, ohne neues Review.

---

## Wobei ich weiterhelfen kann

Sag einfach Bescheid — ich kann:
- den Studio-Namen im Spiel austauschen
- ein anderes Icon-Konzept aktivieren
- die Store-Texte umschreiben oder kürzen
- weitere Screenshot-Größen erzeugen (z. B. iPad, 6,5″)
- die Datenschutzseite anpassen

Was ich **nicht** kann: den Build signieren und einreichen. Dafür braucht es deinen
Rechner und deine Entwickler-Konten.
