# IPA Julia Jäggi
Dieses Dokument umreißt die allgemeine Spezifikation für das Backend eines Parkplatzreservierungssystems.

## Anforderungen

### Akteure
- Anonym: alle nicht authentifizierten Benutzer.
- Mitarbeiter: jeder in der Datenbank vorhandene Benutzer.
- Administrator: ein aktiver Benutzer, der Administratorrechte im Reservierungssystem erhalten hat.

### Assets
- Benutzer: Benutzerkonten (Benutzername/E-Mail, Vor- und Nachname, Fahrzeug[e]) plus ein "deaktiviert"-Flag (gesetzt von Administratoren, um einen Benutzer an der Reservierung zu hindern)
- Fahrzeuge: bekannte Fahrzeuge, die von ihren Besitzern (Benutzern) unter ihrem Profil verwaltet werden. Felder: Kennzeichen,
  Marke, Modell, Fahrzeugtyp (Auto oder Motorrad), EV (Elektrofahrzeug, ja/nein)
- Parkplätze: verfügbare Parkplätze, verwaltet von administrativen Benutzern. Felder: Parkplatznummer, Ladestation (ja/nein)
- Reservierungen: Stellt eine Reservierung von Benutzern für einen bestimmten Parkplatz und ein bestimmtes Fahrzeug dar. Hat eine Start-/Endzeit
  an einem bestimmten Datum, wobei es sich entweder um eine halb- oder ganztägige Reservierung handelt.

### Rollen
- Mitarbeiter: Standardrolle für authentifizierte Benutzer (Rolle `staff`).
  Können Reservierungen für sich und ihre Fahrzeuge erstellen, ändern und stornieren. Können eigene Fahrzeuge erstellen, ändern und löschen. Können Reservierungskalender und Reservierungen lesen/ansehen
  Können eigene und fremde Reservierungen im Reservierungssystem ansehen.
- Administratoren: Authentifizierter Benutzer mit der Rolle `admin`. Administratoren können andere Benutzer aktivieren/deaktivieren und
  Benutzerprofile im Reservierungssystem lesen/ändern, Reservierungen erstellen/lesen/ändern/stornieren, Benutzerfahrzeuge erstellen/lesen/ändern/löschen,
  Parkplätze erstellen/lesen/ändern/löschen.
- Anonym: alle anderen Benutzer.

### Authentifizierung und Autorisierung
- Die Authentifizierung sollte über HTTP Basic Authentication erfolgen.
- Autorisierung:
  - Erfolgreich authentifizierte Benutzer erhalten standardmäßig `role = 'staff'`
  - Benutzern mit `disabled = true` in ihrem Profil wird der Zugriff unabhängig von ihrer Rolle verweigert

### Matrix
Berechtigungen: CRU(D/N)
– C = Erstellen
– R = Lesen
– U = Aktualisieren (ändern)
– D = Löschen oder N = Stornieren

| Rolle/Asset | Benutzer                    | Fahrzeuge          | Parkplätze   | Reservierungen           |
|-------------|-----------------------------|--------------------|--------------|------------------------- |
| Mitarbeiter | ---- (außer selbst: -RU-) | ---- (außer eigen: CRUD) | R--- | R--- (außer eigene: CRUN) |
| Administratoren | -RU- | CRUD | CRUD | CRUN |
| Anonym | ---- | ---- | ---- | ---- |

### Regeln

#### Parkplatz
- Ein Parkplatz kann gleichzeitig von nur einem Auto besetzt sein
- Ein Parkplatz kann von
  administrativen Benutzern für eine bestimmte Dauer
auf "nicht verfügbar" (einschließlich eines optionalen Grunds für die Nichtverfügbarkeit) gesetzt werden (Startdatum/-zeit, Enddatum/-zeit).
  Parkplätze sind standardmäßig "verfügbar". Wenn ein Parkplatz auf "nicht verfügbar" gesetzt ist, sollen
  bestehende, sich mit dem Zeitraum der Nichtverfügbarkeit überschneidende Reservierungen automatisch storniert werden.
  Wenn ein Parkplatz wieder auf verfügbar gesetzt wird, muss ein allfälliger Grund für die Nichtverfügbarkeit automatisch gelöscht werden
- Auf einem Parkplatz kann ein EV-Ladegerät installiert sein. Dies wird durch die Einstellung `charger = true` angezeigt
- Ein Parkplatz kann nicht gelöscht werden, wenn er von Reservierungen referenziert wird

#### Reservierungen
- Ein Parkplatz kann für einen halben oder einen ganzen Tag pro Datum reserviert werden
- Ein halber Tag Reservierung ist entweder Mitternacht bis Mittag oder Mittag bis Mitternacht
-
 Ein Benutzer kann bis zu zwei Wochen in die Zukunft reservieren
- Ein Benutzer kann nicht mehr als 3 Reservierungen pro Woche haben. Reservierungen, die dafür gezählt werden, sind:
  - Nicht stornierte Reservierungen
  - Stornierte Reservierungen, die nach ihrer Startzeit storniert wurden
- Ein Benutzer kann nicht mehr als eine Reservierung pro Tag haben:
  - Nicht stornierte Reservierungen
  - Stornierte Reservierungen, die nach ihrer Startzeit storniert wurden
- Eine Reservierung kann aus Gründen der Nachverfolgung nicht gelöscht, sondern muss stattdessen auf storniert gesetzt werden
- Das Zeitfenster (Startzeit => Endzeit) von Reservierungen dürfen sich nicht überschneiden

#### Fahrzeuge
- Ein Fahrzeug kann nicht gelöscht werden, wenn es durch Reservierungen referenziert wird
- Ein Kfz-Kennzeichen muss eindeutig sein

#### Benutzer
- Benutzer können nicht gelöscht, sondern nur deaktiviert werden.

### Technische Voraussetzungen
- Alle Datums-/Uhrzeitangaben müssen im UTC / ISO 8601-Vollzeitformat persistiert werden.

### Installation
Vor der Installation muss die Authentifizierung mit der Adobe Berufsbildung Basel GitHub Organization eingerichtet werden.
Dazu muss unter _GitHub Developer Settings_ in den persönlichen GitHub-Settings ein neues _Access Token_ für Scope `read:packages`  erstellt werden. Mit diesem kann folgender Befehl ausgeführt werden, um sich anzumelden:
```
npm login --scope @berufsbildung-basel --registry=https://npm.pkg.github.com
```
- Username: GitHub-Benutzername
- Password: Access Token
- E-Mail: die mit GitHub registrierte E-Mail-Adresse

```
npm install
```

### Server starten
```
npm start
```
(Started auf http://localhost:3000/)

### Tests
```
npm test
```
