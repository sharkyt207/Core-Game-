# Native Build — iOS & Android (COREBREAKER)

Alles, was **ohne** Mac/Xcode vorbereitet werden konnte, ist fertig und eingecheckt.
Was hier bleibt, sind die Schritte, die zwingend lokal laufen müssen (Apple verlangt
Xcode auf macOS zum Bauen und Signieren; Google verlangt Android Studio bzw. das SDK).

> **Diese Schritte kann eine Cloud-Session nicht ausführen** — es gibt kein Xcode und
> keine Signing-Zertifikate. Der Rest ist vollständig vorbereitet, damit unten nur noch
> „ausführen und signieren" übrig bleibt.

---

## Was bereits fertig ist

| Punkt | Status |
|---|---|
| Capacitor-Konfiguration (App-ID, Name, Farben, Portrait) | ✅ `capacitor.config.ts` |
| Splash-Screen-Konfiguration (kein Blank-Frame beim Start) | ✅ Config + `main.ts` |
| Status-Bar (heller Text auf dunklem UI) | ✅ `main.ts` |
| Plugins (App, Haptics, Preferences, SplashScreen, StatusBar) | ✅ installiert |
| Cloud-Save inkl. Merge-Regel | ✅ `src/cloud.ts` |
| Icon-Quellbild 1024×1024 (opak, ohne Alpha) | ✅ `resources/icon.png` |
| Splash-Quellbild 2732×2732 (hell + dunkel) | ✅ `resources/splash*.png` |
| Web-Build → `dist/` | ✅ `npm run build` (grün) |
| Store-Texte, Icons, Screenshots | ✅ `store/` |

---

## Voraussetzungen

- **Node 18+**
- **iOS:** macOS + Xcode 15+, ein Apple-Developer-Account (99 $/Jahr)
- **Android:** Android Studio (Giraffe+) bzw. Android SDK 34, ein Play-Console-Account (25 $ einmalig)

---

## 1) Abhängigkeiten & Web-Build

```bash
cd game
npm install
npm run build          # tsc --noEmit + vite build -> dist/
```

## 2) App-Icons & Splash-Screens erzeugen

Die Quellbilder liegen schon in `resources/`. Der offizielle Generator erzeugt daraus
**alle** iOS- und Android-Größen:

```bash
npm run assets:generate
```

Das schreibt in `ios/App/App/Assets.xcassets/` bzw. `android/app/src/main/res/`
(existiert erst nach Schritt 3 — dann einfach erneut ausführen).

**Icon-Konzept wechseln** (A/B/C liegen in `tools/icons/`):

```bash
cd tools && ICON=B node native-assets.cjs && cd ..
npm run assets:generate
```
> Aktuell aktiv: **Konzept A („Core Drill")**. Falls du B oder C willst, obiger Befehl
> genügt — es muss nichts von Hand ersetzt werden.
>
> Der Generator braucht Chromium; entweder `npx playwright install chromium` oder
> `CHROMIUM=/pfad/zu/chrome node native-assets.cjs`.

## 3) Native Projekte anlegen (einmalig)

```bash
npx cap add ios
npx cap add android
```

## 4) Bauen & öffnen

```bash
npm run ios:open        # build + sync + Xcode öffnen
npm run android:open    # build + sync + Android Studio öffnen
```

Nach **jeder** Code-Änderung reicht danach `npm run cap:sync`.

---

## 5) Letzte Einstellungen in der IDE

### iOS (Xcode)
1. **Signing & Capabilities** → Team wählen, Bundle-ID `com.corebreaker.game` bestätigen.
2. **Deployment Info** → Device Orientation: nur **Portrait** aktiv lassen.
3. **General** → Version `1.0.0`, Build `1`.
4. `Info.plist` prüfen: `UIViewControllerBasedStatusBarAppearance = NO`.
5. Gerät wählen → **Product ▸ Archive** → **Distribute App** → App Store Connect.

### Android (Android Studio)
1. `android/app/src/main/AndroidManifest.xml` → in der Activity
   `android:screenOrientation="portrait"` setzen.
2. `android/app/build.gradle` → `versionCode 1`, `versionName "1.0.0"`.
3. Keystore anlegen (**gut sichern — ohne ihn sind keine Updates möglich**):
   ```bash
   keytool -genkey -v -keystore corebreaker.keystore \
     -alias corebreaker -keyalg RSA -keysize 2048 -validity 10000
   ```
4. **Build ▸ Generate Signed Bundle / APK ▸ Android App Bundle (.aab)**.

---

## 6) Store-Einreichung

Alle Texte, Icons und Screenshots liegen fertig in **`store/`**:

- `store/STORE_LISTING.md` — Name, Untertitel, Beschreibung, Keywords, Neuheiten (DE + EN)
- `store/icons/` — Icon-Konzepte als SVG + 1024/512 PNG
- `store/screenshots/` — 12 echte Aufnahmen in 1290×2796 (App Store 6.7")

**Preis:** 0,99 € / $0.99 · **Kategorie:** Spiele → Arcade · **Freigabe:** 4+ / PEGI 3
· keine Werbung, keine In-App-Käufe, voll offline spielbar.

---

## Cloud-Save

`src/cloud.ts` spiegelt den Spielstand in den nativen Speicher (Capacitor Preferences),
der von den OS-Backups erfasst wird — **iCloud** auf iOS, **Auto Backup** auf Android.
Eine Neuinstallation stellt den Fortschritt damit automatisch wieder her.

Die Zusammenführung entscheidet **nicht** über Zeitstempel (Geräteuhren lügen), sondern
über den Fortschritt: Lifetime-Einnahmen, beste Tiefe, Runs, Skills, Kerne und Splitter.
Bei Gleichstand gewinnt der lokale Stand — eine Offline-Sitzung wird nie überschrieben.

**Echtes Account-Backend anbinden:** einen zweiten `CloudAdapter` schreiben (zwei
Methoden, `get`/`set`) und an `initCloud({ adapter })` übergeben. Sonst ändert sich nichts.

---

## Bekannte Plattform-Eigenheiten

- **iOS-Safari kann per Web nicht vibrieren.** Im nativen Build läuft die Haptik über
  `@capacitor/haptics` — dort funktioniert sie. Android-Web nutzt die Vibration-API.
- **Audio startet erst nach der ersten Berührung** (Autoplay-Regel aller Browser). Das
  Spiel entsperrt den Ton beim ersten `pointerdown`.
