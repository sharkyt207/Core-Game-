# COREBREAKER auf den Homescreen — Schritt für Schritt

Ziel: Das Spiel liegt als **echte App** auf deinem Startbildschirm — eigenes Icon,
Vollbild ohne Browser-Leiste, läuft auch **ohne Internet**, Spielstand bleibt erhalten.

Das geht in zwei Etappen:
**Etappe A** — das Spiel einmalig ins Netz stellen (5 Minuten).
**Etappe B** — auf dem Handy zum Startbildschirm hinzufügen (30 Sekunden).

---

# Etappe A — Das Spiel online stellen

> **Wichtig vorab:** Dein Repo `Core-Game-` ist **privat**. GitHub Pages funktioniert
> bei privaten Repos **nur mit GitHub Pro** (kostenpflichtig). Deshalb unten drei Wege —
> such dir einen aus, danach ist alles gleich.

## Weg 1 — Repo öffentlich machen (kostenlos, am schnellsten)

<details open>
<summary><b>Schritte</b></summary>

1. Repo auf GitHub öffnen: `https://github.com/sharkyt207/Core-Game-`
2. **Settings** (oben rechts im Repo-Menü)
3. Ganz nach unten scrollen bis **Danger Zone**
4. **Change repository visibility** → **Change to public** → bestätigen
5. Weiter bei **„Pages einschalten"** (unten)

</details>

> Zur Einordnung: Bei einem Web-Spiel wird der Code beim Spielen ohnehin an jeden
> Browser ausgeliefert — „öffentlich" gibt also wenig preis, was nicht sowieso beim
> Spieler landet. Wenn du das trotzdem nicht willst, nimm Weg 2 oder 3.

## Weg 2 — GitHub Pro (Repo bleibt privat)

1. `https://github.com/settings/billing/plans` öffnen
2. **Upgrade to Pro** (ca. 4 $/Monat)
3. Weiter bei **„Pages einschalten"**

## Weg 3 — Cloudflare Pages (kostenlos, Repo bleibt privat)

Braucht keinen GitHub-Pro-Plan und ist genauso gut:

1. `https://dash.cloudflare.com` → Konto anlegen (kostenlos)
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. GitHub verbinden, Repo `Core-Game-` auswählen
4. Build-Einstellungen eintragen:
   - **Framework preset:** `None`
   - **Build command:** `npm ci && npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `game`
5. **Save and Deploy**
6. Du bekommst eine Adresse wie `https://core-game.pages.dev` → **weiter bei Etappe B**

---

## Pages einschalten (nur für Weg 1 und 2)

1. Repo → **Settings**
2. Links in der Seitenleiste auf **Pages**
3. Unter **Build and deployment** → **Source** auf **GitHub Actions** stellen
4. Repo → Reiter **Actions** → links **Deploy to GitHub Pages** → rechts
   **Run workflow** → **Run workflow**
5. Warten bis der Haken grün ist (ca. 1 Minute)

Deine Adresse lautet dann exakt:

```
https://sharkyt207.github.io/Core-Game-/
```

> Achte auf **Groß-/Kleinschreibung und den Bindestrich am Ende** — die Adresse ist
> genau so, wie das Repo heißt.

---

# Etappe B — Auf den Startbildschirm legen

## iPhone / iPad

> Muss **Safari** sein. Chrome auf dem iPhone kann keine Apps installieren.

1. **Safari** öffnen und die Adresse von oben eingeben
2. Warten, bis das Spiel geladen ist (Studio-Logo → Titelbild)
3. Unten in der Mitte auf **Teilen** — das Symbol mit dem **Pfeil nach oben aus einem Quadrat** ⬆️
4. In der Liste nach unten wischen zu **„Zum Home-Bildschirm"**
5. Oben rechts auf **Hinzufügen**

Fertig — COREBREAKER liegt mit eigenem Icon auf dem Startbildschirm und startet im Vollbild.

## Android

1. **Chrome** öffnen und die Adresse eingeben
2. Warten, bis das Spiel geladen ist
3. Oben rechts auf **⋮** (drei Punkte)
4. **App installieren** antippen (heißt je nach Version auch **Zum Startbildschirm zufügen**)
5. **Installieren** bestätigen

Oft erscheint auch von allein unten ein Banner **„COREBREAKER installieren"** — das
tut dasselbe.

---

# Wird mein Spielstand gespeichert?

**Ja.** Der Stand liegt auf dem Gerät und übersteht das Schließen der App und
Neustarts. Das ist automatisiert getestet: Der Test spielt einen echten Run,
extrahiert, lädt neu und prüft, dass der Spielstand **bitgenau** derselbe ist —
auch ohne Internet.

Damit das System den Stand nicht irgendwann aufräumt, fordert das Spiel beim Start
**dauerhaften Speicher** an. Diese Anfrage wird deutlich eher gewährt, wenn du das
Spiel wie oben **auf den Startbildschirm legst** — genau deshalb ist das der
empfohlene Weg statt nur ein Lesezeichen.

### Sicherheitsnetz: Spielstand sichern
**Optionen ▸ Save exportieren** gibt dir einen Code (landet direkt in der
Zwischenablage). Irgendwo sichern — mit **Save importieren** stellst du ihn jederzeit
wieder her, auch auf einem anderen Gerät oder nach einer Neuinstallation.

> Ehrlich dazu: Löschst du in den iOS-Einstellungen „Website-Daten" oder in Android
> die App-Daten, ist der Stand weg. Der Export-Code ist das zuverlässige Backup.
> In der **nativen** App (siehe unten) wird der Stand zusätzlich über iCloud bzw.
> Android Auto Backup gesichert und überlebt sogar eine Neuinstallation.

---

# Sofort antesten (ohne alles oben)

Der aktuelle Stand lässt sich jederzeit direkt im Handy-Browser öffnen:

**https://claude.ai/code/artifact/6d70efe3-f63c-47d8-b687-95facd1be154**

Gut zum Ausprobieren. Zum dauerhaften Spielen ist Etappe A+B besser, weil das Spiel
dort ein echtes App-Icon bekommt, offline läuft und der Spielstand geschützter liegt.

---

# Später: echte App im App Store / Play Store

Alles dafür ist vorbereitet — Icons, Splash-Screens, Konfiguration, Store-Texte und
Screenshots. Der letzte Schritt braucht zwingend einen **Mac mit Xcode** (Apple) bzw.
**Android Studio**. Die Schritt-für-Schritt-Anleitung dazu steht in
**[`game/NATIVE_BUILD.md`](./game/NATIVE_BUILD.md)**.
