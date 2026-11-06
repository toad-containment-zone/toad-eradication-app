# Toad Eradication — TCZ

A field app for the Toad Containment Zone (TCZ) program. It records hand-collection sessions:
each team member starts a session at a site, taps once for every cane toad they collect, and
ends the session when they're done. The app records the time of every toad and a GPS track of
the session, and syncs to ODK Central. Sites are revisited night after night, so the data show
how the catch drops with each visit. The app works fully offline once installed.

**App URL:** [https://toad-containment-zone.github.io/toad-eradication-app/](https://toad-containment-zone.github.io/toad-eradication-app/)

## Setup (do this once)

You'll need an app user QR code or text code from whoever manages the TCZ program's ODK Central
project.

1. **Install the app on your phone.**
   - **iOS:** open the app URL in **Safari** (other browsers don't support installing), tap
     **Share**, then **Add to Home Screen**.
   - **Android:** open the app URL in **Chrome**, tap **⋮**, then **Add to Home screen**
     (or **Install app**).

   Open the app once while you have signal so it can finish setting up for offline use.
2. **Settings.** Tap ⚙, enter **your name**, then scan the app user QR code with **📷 Scan QR
   code instead** (or paste the text code). Tap **Save settings**.
3. When your phone asks for location and camera permission, allow both. Location records where
   you searched. The camera scans teammates' site QR codes.

## A collection session

1. Tap **Start collecting** and choose your site from the sites near you (or **View on map**),
   then tap **Start collecting at …**.
   - **First night at a new site:** one person taps **＋ Create a new site**, stands at the site,
     waits for a good GPS fix, names it, and taps **Create site**. Their phone shows a QR code.
     Everyone else taps **Start collecting** → **📷 Scan teammate's QR** and points their camera
     at it. No signal is needed. With signal, the new site also turns up in everyone's list
     within about 20 seconds of being created.
   - Arrived late? Anyone already collecting at the site can tap **Show this site's QR for
     teammates**.
2. Tap **+1 Toad caught** for every toad you collect.
   - Grabbed several at once? Tap **Caught several…** and pick the number.
   - Saw one that got away? Tap **Seen, not caught**.
   - Mis-tap? Tap **Undo** on the message that pops up.

   The screen stays on during a session so the GPS track keeps recording. Carry a power bank.
3. When you've finished at the site, tap **End session**, then **Yes, end session**. Check the
   list (✕ removes a mistake), add any notes, and tap **Save session**.
   - Ended by accident? Tap 🗑, then **Resume session**.

Records are always saved on the phone first and sync whenever there's signal. If the app gets
closed partway through a session, reopen it and the session carries on.

## ODK Central setup

Both forms go in the same Central project, and the app user needs access to both.

1. Upload and publish `toad_eradication_site.xml` **first**. This creates the
   `toad_eradication_sites` entity list.
2. Then upload and publish `toad_eradication_session.xml`. Central links its
   `toad_eradication_sites.csv` attachment to that entity list.
3. Give the app user access to both forms.

## Files

- `toad-eradication-app.html`: the whole app.
- `toad_eradication_site.xlsx` / `.xml`: the site-registration form (creates the site entity).
- `toad_eradication_session.xlsx` / `.xml`: the collection-session form.
- `manifest.json`, `sw.js`, `index.html`: the offline and installable app shell.
