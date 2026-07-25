# COREBREAKER aufs Handy holen

Zwei Wege. **Weg 1 dauert eine Minute** und macht aus dem Spiel eine echte App
mit eigenem Icon, Vollbild und Offline-Betrieb. Weg 2 ist der Store-Weg und
braucht einen Mac bzw. Android Studio.

---

## Weg 1 — Als App installieren (empfohlen, kein Mac nötig)

Das Spiel ist eine **PWA**: Du öffnest eine Webseite und legst sie auf den
Startbildschirm. Danach startet sie wie jede andere App — ohne Browser-Leiste,
im Vollbild, und **auch ohne Internet**.

### Schritt 1: GitHub Pages einmalig aktivieren
1. Im Repo auf **Settings ▸ Pages** gehen.
2. Unter **Build and deployment ▸ Source** → **GitHub Actions** auswählen.
3. Fertig. Der Workflow (`.github/workflows/deploy.yml`) baut und veröffentlicht
   das Spiel bei jedem Push automatisch.

Danach läuft es unter:
```
https://sharkyt207.github.io/core-game-/
```
> Läuft der Workflow noch nicht? Unter **Actions ▸ Deploy to GitHub Pages ▸
> Run workflow** einmal von Hand starten.

### Schritt 2: Auf den Startbildschirm legen

**iPhone (Safari — muss Safari sein, nicht Chrome):**
1. Die Adresse in **Safari** öffnen.
2. Unten auf **Teilen** (Quadrat mit Pfeil nach oben).
3. **Zum Home-Bildschirm** → **Hinzufügen**.

**Android (Chrome):**
1. Die Adresse in **Chrome** öffnen.
2. Menü **⋮** → **App installieren** bzw. **Zum Startbildschirm zufügen**.

Ab jetzt liegt COREBREAKER mit eigenem Icon auf dem Startbildschirm.

---

## Wird mein Spielstand gespeichert?

**Ja.** Der Stand liegt im Speicher des Geräts und übersteht das Schließen der
App und Neustarts — das ist automatisiert getestet (Spielstand wird nach einem
Run bitgenau wiederhergestellt, auch offline).

Damit der Stand nicht irgendwann vom System aufgeräumt wird, fordert das Spiel
beim Start **dauerhaften Speicher** an. Diese Anfrage wird deutlich eher
gewährt, wenn du das Spiel wie oben **auf den Startbildschirm legst** — deshalb
ist das der empfohlene Weg.

### Sicherheitsnetz: Spielstand exportieren
Unter **Optionen ▸ Save exportieren** bekommst du einen Code, der in die
Zwischenablage kopiert wird. Den kannst du irgendwo sichern und mit
**Save importieren** jederzeit wiederherstellen — auch auf einem anderen Gerät.

> Ein paar ehrliche Hinweise:
> - Löschst du in den iOS-Einstellungen „Website-Daten", ist der Stand weg.
>   Der Export-Code ist dagegen das zuverlässige Backup.
> - In der **nativen** App (Weg 2) wird der Stand zusätzlich über iCloud bzw.
>   Android Auto Backup gesichert und überlebt sogar eine Neuinstallation.

---

## Weg 2 — Echte App aus dem App Store / Play Store

Alles dafür ist vorbereitet (Icons, Splash, Konfiguration, Store-Texte,
Screenshots). Was fehlt, geht nur lokal: Apple verlangt **Xcode auf einem Mac**
zum Bauen und Signieren, Google das **Android SDK**. Beides kann eine
Cloud-Session nicht bereitstellen.

Die vollständige Schritt-für-Schritt-Anleitung steht in
**[`game/NATIVE_BUILD.md`](./game/NATIVE_BUILD.md)** — kurz gefasst:

```bash
cd game
npm install
npm run build
npx cap add ios          # bzw. android
npm run assets:generate  # Icons & Splashes in alle Größen
npm run ios:open         # öffnet Xcode  (bzw. npm run android:open)
```
Dann in Xcode das Team wählen und **Product ▸ Archive**.

---

## Schnell mal antesten (ohne Installation)

Der jeweils aktuelle Stand liegt immer hier und lässt sich direkt im
Handy-Browser öffnen:

**https://claude.ai/code/artifact/6d70efe3-f63c-47d8-b687-95facd1be154**

Zum Testen ideal — für dauerhaftes Spielen ist Weg 1 besser, weil der
Spielstand dort geschützter liegt.
