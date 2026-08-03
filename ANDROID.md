# COREBREAKER bei Google Play veröffentlichen — Schritt für Schritt

Diese Anleitung führt dich von null bis zur veröffentlichten App. Die Befehle
sind in diesem Projekt durchgetestet — `npx cap add android` und die
Icon-Erzeugung laufen sauber durch.

**Was du brauchst:** einen Computer (Mac, Windows oder Linux — kein Mac nötig),
etwa 2 Stunden Zeit und **25 $ einmalig** für das Entwicklerkonto.

---

## Teil 1 — Vorbereitung (einmalig, ~45 Min)

### Schritt 1.1: Android Studio installieren
1. [developer.android.com/studio](https://developer.android.com/studio) öffnen
2. Herunterladen und installieren (ca. 1 GB)
3. Beim ersten Start den **Setup-Assistenten** durchlaufen lassen — er lädt
   automatisch das Android SDK nach. Einfach alles bestätigen.
4. Fertig, wenn du den Startbildschirm „Welcome to Android Studio" siehst.

### Schritt 1.2: Node.js installieren
Falls noch nicht vorhanden: [nodejs.org](https://nodejs.org) → **LTS-Version**.
Zum Prüfen im Terminal:
```bash
node --version     # sollte v18 oder höher zeigen
```

### Schritt 1.3: Play-Entwicklerkonto anlegen
1. [play.google.com/console](https://play.google.com/console)
2. Mit Google-Konto anmelden → **25 $** zahlen (einmalig, nicht jährlich)
3. Identität bestätigen (Ausweis-Upload) — **das dauert 1–2 Tage**, also am
   besten gleich jetzt starten, während du weitermachst.

### Schritt 1.4: Datenschutzerklärung online stellen
Google verlangt eine öffentlich erreichbare Adresse. Ohne die kannst du nicht
veröffentlichen.

1. `game/store/privacy.html` öffnen und **deine E-Mail eintragen**
   (zweimal ersetzen: `DEINE-EMAIL@example.com` und `YOUR-EMAIL@example.com`)
2. Kostenlos hosten, am einfachsten über **Netlify Drop**:
   - [app.netlify.com/drop](https://app.netlify.com/drop) öffnen
   - Die Datei `privacy.html` per Drag & Drop ins Fenster ziehen
   - Du bekommst sofort eine Adresse wie `https://xyz.netlify.app/privacy.html`
3. **Diese Adresse notieren** — du brauchst sie in Schritt 3.4.

---

## Teil 2 — Die App bauen (~20 Min)

Alles im Terminal, im Projektordner.

### Schritt 2.1: Abhängigkeiten holen und Spiel bauen
```bash
cd game
npm install
npm run build
```
Erwartete Ausgabe am Ende: `✓ built in …`

### Schritt 2.2: Android-Projekt erzeugen
```bash
npx cap add android
```
Erwartete Ausgabe: `[success] android platform added!`

> Das erzeugt den Ordner `game/android/`. Der ist bewusst nicht im Repo — er
> wird immer neu erzeugt und wäre nur unnötiger Ballast.

### Schritt 2.3: Icons und Startbildschirme erzeugen
```bash
npm run assets:generate
```
Erwartete Ausgabe: `android: 100 generated, 9.01 MB total`

Damit werden aus `game/resources/icon.png` und `splash.png` **alle** benötigten
Android-Größen erstellt.

### Schritt 2.4: Android Studio öffnen
```bash
npm run android:open
```
Android Studio startet und lädt das Projekt. **Beim ersten Mal dauert das
mehrere Minuten** („Gradle sync") — unten rechts läuft ein Fortschrittsbalken.
Warte, bis er durch ist.

---

## Teil 3 — In Android Studio (~30 Min)

### Schritt 3.1: Hochformat erzwingen
1. Links im Projektbaum: `app` ▸ `src` ▸ `main` ▸ **`AndroidManifest.xml`**
2. Die Zeile `<activity` suchen (steht ziemlich weit oben)
3. In diese Zeile ergänzen:
   ```xml
   android:screenOrientation="portrait"
   ```
   Sie sieht dann etwa so aus:
   ```xml
   <activity
       android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
       android:name=".MainActivity"
       android:label="@string/title_activity_main"
       android:theme="@style/AppTheme.NoActionBar"
       android:launchMode="singleTask"
       android:screenOrientation="portrait"
       android:exported="true">
   ```
4. Speichern mit `Strg`+`S` bzw. `Cmd`+`S`

### Schritt 3.2: Versionsnummer setzen
1. Im Projektbaum: `app` ▸ **`build.gradle`** (der *innere*, unter `app`)
2. Diese beiden Zeilen suchen und setzen:
   ```gradle
   versionCode 1
   versionName "1.0.0"
   ```
   > Merke dir das: Bei **jedem** Update muss `versionCode` um 1 hochgezählt
   > werden, sonst lehnt Google den Upload ab.
3. Speichern → oben erscheint ein Hinweis **„Sync Now"** → anklicken

### Schritt 3.3: Signaturschlüssel erzeugen ⚠️
> **Das Wichtigste der ganzen Anleitung.** Dieser Schlüssel beweist, dass Updates
> von dir stammen. **Verlierst du ihn, kannst du deine App nie wieder
> aktualisieren** — auch Google kann das nicht rückgängig machen.

1. Menü **Build ▸ Generate Signed App Bundle / APK…**
2. **Android App Bundle** wählen → **Next**
3. Unter „Key store path" auf **Create new…** klicken
4. Ausfüllen:
   - **Key store path:** einen Ort **außerhalb** des Projektordners wählen,
     z. B. `~/Dokumente/corebreaker.keystore`
   - **Password:** ein starkes Passwort (zweimal)
   - **Alias:** `corebreaker`
   - **Password** (für den Key): noch eins (zweimal)
   - **Validity:** `25` Jahre
   - **First and Last Name:** dein Name — der Rest darf leer bleiben
5. **OK**

**Jetzt sofort sichern:**
- Die Datei `corebreaker.keystore` in deinen Passwortmanager oder eine
  Cloud-Sicherung legen
- Beide Passwörter und den Alias dazu notieren

> Die `.gitignore` schließt Keystores bereits aus — leg ihn trotzdem nie in den
> Projektordner.

### Schritt 3.4: Signiertes Bundle bauen
1. Zurück im Dialog: **Next**
2. Bei „Build Variants" **release** wählen
3. **Create** klicken
4. Nach 1–3 Minuten erscheint unten rechts eine Meldung mit **„locate"** — darauf
   klicken. Der Ordner öffnet sich, darin liegt:
   ```
   app-release.aab
   ```
   **Das ist deine fertige App.**

---

## Teil 4 — Bei Google Play einreichen (~45 Min)

In der [Play Console](https://play.google.com/console).

### Schritt 4.1: App anlegen
**Alle Apps ▸ App erstellen**
- **App-Name:** `COREBREAKER`
- **Standardsprache:** Deutsch
- **App oder Spiel:** **Spiel**
- **Kostenlos oder kostenpflichtig:** **Kostenpflichtig**
- Die Erklärungen bestätigen → **App erstellen**

### Schritt 4.2: Store-Eintrag füllen
**Wachstum ▸ Store-Präsenz ▸ Haupt-Store-Eintrag**

Alle Texte stehen fertig in **`game/store/STORE_LISTING.md`** — von dort
kopieren:

| Feld | Was rein muss |
|---|---|
| Kurzbeschreibung (max. 80) | `Bohr tief, rüste auf, werde übermächtig — Neon-Mining-Arcade im Hochformat.` |
| Vollständige Beschreibung | Der lange Text aus der Datei |
| App-Symbol (512×512) | `game/store/icons/icon_A_512.png` |
| Feature-Grafik (1024×500) | `game/store/feature-graphic-1024x500.png` |
| Telefon-Screenshots (mind. 2) | aus `game/store/screenshots/` |

**Empfohlene Screenshot-Reihenfolge** (das Beste zuerst — die meisten sehen nur
die ersten zwei):
1. `04_gameplay.png`
2. `02_tree.png`
3. `03_planets.png`
4. `08_modules.png`
5. `01_title.png`

### Schritt 4.3: Die Pflicht-Fragebögen
**Monetarisierung & Richtlinien ▸ App-Inhalte** — hier musst du alles auf grün
bringen:

**Datenschutzerklärung**
→ Deine Adresse aus Schritt 1.4 eintragen.

**Datensicherheit** (Data safety)
→ Erste Frage: *„Erfasst oder teilt deine App Nutzerdaten?"* → **Nein**
→ Das ist geprüft korrekt: Das Spiel macht keine Netzwerkaufrufe und speichert
   alles nur auf dem Gerät.

**Werbung**
→ **Nein, meine App enthält keine Werbung**

**Inhaltseinstufung**
→ Fragebogen starten → Kategorie **Spiel** → alle Fragen nach Gewalt, Sexualität,
   Drogen, Glücksspiel mit **Nein** beantworten → ergibt **PEGI 3 / USK 0**

**Zielgruppe**
→ Altersgruppen ab **13** wählen. **Nicht** „Kinder unter 13" ankreuzen, sonst
   greifen deutlich strengere Regeln (Families-Programm).

**Regierungs-App / Finanz-App / Gesundheits-App**
→ überall **Nein**

### Schritt 4.4: Preis festlegen
**Monetarisierung ▸ Preise**
→ **0,99 €** setzen → Google rechnet die anderen Währungen automatisch um.

### Schritt 4.5: Veröffentlichen
1. **Produktion ▸ Neuen Release erstellen**
2. Bei „App-Bundles" deine **`app-release.aab`** hochladen
3. **Release-Name:** `1.0.0`
4. **Versionshinweise:** den Text „Neuheiten" aus `STORE_LISTING.md` einfügen
5. **Speichern** ▸ **Release überprüfen** ▸ **Rollout in Produktion starten**

Fertig. Google prüft jetzt — meist **einige Stunden bis 2 Tage**. Du bekommst
eine E-Mail, sobald die App live ist.

---

## Wenn etwas schiefgeht

| Meldung | Ursache und Lösung |
|---|---|
| `npx cap add android` bricht ab | `npm install` vergessen — nachholen |
| Gradle sync schlägt fehl | In Android Studio: **File ▸ Invalidate Caches ▸ Invalidate and Restart** |
| „Version code 1 has already been used" | `versionCode` in `app/build.gradle` erhöhen und neu bauen |
| „Upload konnte nicht signiert werden" | Beim Bauen **release** statt **debug** gewählt? |
| App startet und bleibt schwarz | `npm run build` vor `cap sync` vergessen — `npm run cap:sync` ausführen |

---

## Später: ein Update veröffentlichen

```bash
cd game
# Änderungen am Spiel machen …
npm run cap:sync          # baut und kopiert alles ins Android-Projekt
npm run android:open
```
Dann in Android Studio: `versionCode` **um 1 erhöhen**, `versionName` anpassen
(z. B. `1.0.1`), neues signiertes Bundle bauen (**mit demselben Keystore!**) und
in der Play Console als neuen Release hochladen.

---

## Vorher noch von mir erledigen lassen?

- **Studio-Name:** Im Startbildschirm steht noch der Platzhalter **„NEONFORGE"**
- **Icon:** Aktiv ist Konzept **A**; B und C liegen bereit
- **Texte:** Beschreibung kürzen, umformulieren oder anders betonen

Sag einfach Bescheid — das ist jeweils in Minuten erledigt.
