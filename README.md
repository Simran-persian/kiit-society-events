# KExplore ✳

A colorful, responsive event-discovery website concept for the KIIT KSAC web-design brief. Find student societies, campus happenings, and hackathon listings in one place.

## Run locally

This is a dependency-free static site. Open `index.html` in a browser, or serve the project folder with any static web server, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## What's here

- Responsive, animated landing page with custom event artwork and society-interest tiles.
- Event search, category filters, event detail dialogs, event dates/status labels, and official KSAC links.
- Browser-local theme preference and an event-interest demo form with confirmation.
- Keyboard shortcut **Ctrl/⌘ + K** focuses search; reduced-motion preferences are respected.

## Event data and registration status

The event cards are an initial, manually curated set of recent listings, not a live events feed. Their registration state is date-derived and the current set is already past; no active registration link is claimed. Use the official [KIIT Student Activity Centre](https://ksac.kiit.ac.in/) and [societies directory](https://ksac.kiit.ac.in/kiit-societies/) to confirm current announcements, dates, and registration links. The demo interest form stores an email only in local browser storage; it does not submit data to KIIT or KSAC.

To update or add event cards, edit the `events` array in `app.js`. For a real production launch, event data should come from a verified official feed or be reviewed and updated by a maintainer.

## Deployment

The project can be hosted on GitHub Pages or any static hosting provider. No build step is required.

## Disclaimer

KExplore is an independent student project concept and is not an official KIIT or KSAC platform.
