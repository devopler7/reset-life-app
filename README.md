# Reset — Life Dashboard

A private, installable personal dashboard built as a Progressive Web App (PWA). It is designed around the life reset plan: sleep, university catch-up, fitness, screen-control, money, weekly planning and a personal project.

## What is included

- Today checklist with daily persistence
- 8:00 AM wake / 11:30 PM sleep targets (editable)
- “Restart Today” anti-collapse button
- Full reset plan
- University course progress + priority catch-up queue
- 7-day progress view and streaks
- Money buckets, spending and current cash
- Personal project session counter
- Weekly reset/review form
- Export/import JSON backups
- iPhone Home Screen support
- Offline cache after first successful load
- No account, backend, analytics or subscription

## Fastest way to use it on iPhone

The app needs to be served over HTTPS for full PWA/offline behavior. The easiest free route is a static host such as Netlify, Cloudflare Pages, GitHub Pages or Vercel.

### Netlify-style drag-and-drop deployment

1. Unzip `Reset_Life_Dashboard.zip` on your computer.
2. Use a static-site host's drag-and-drop deployment and upload the `life-reset-app` folder.
3. Open the HTTPS link on your iPhone in Safari.
4. Tap Share → Add to Home Screen → Add.
5. Open `Reset` from your Home Screen.

## Local preview on Windows

If Python is installed, open a terminal inside the folder and run:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080` on the PC. Localhost is for previewing; use HTTPS hosting for the proper iPhone install/offline experience.

## Data and privacy

All personal data stays in browser local storage on the device/browser profile where you use the app. There is no cloud database. Use Settings → Export backup periodically. Import the JSON backup if you need to restore it.

## Important

Clearing Safari website data can delete local app data. Export backups periodically.
