# Reset v3.4.0 — Personal Edition

Reset is a local-first personal life dashboard designed primarily for iPhone Home Screen use. It keeps Today, Week, University, Money, Gym, Health, Sleep, Car, Projects and Progress in one dark OLED-friendly app.

## v3.4 highlights

- Rebuilt day scheduler with Wake and Sleep as hard anchors.
- Planned Wake/Sleep and actual Wake/Sleep are stored separately.
- Early and late waking can intelligently rebuild the remaining flexible day without changing the planned anchor.
- Rebuild keeps fixed classes/appointments at their real times, preserves cancellations, keeps meals in order and surfaces impossible days as Needs attention instead of creating nonsense times.
- Missed & Cancelled items now live in a compact collapsible section with restore behavior.
- Manual moves remain stable across repeated rebuilds, and Rebuild provides Undo.
- Week redesigned around the new Week and Plan Day experience: swipeable weeks, day status, previews, day-specific Wake/Sleep overrides, one-off tasks, quick day status, copy setup, rebuild and reset-to-routine tools.
- More consistent SVG icon system across the app. The main navigation keeps the established icons with the updated graduation-cap Uni icon.
- Gym polish: exercise selection no longer jumps the workout picker back to the top, Sets/Reps use numeric-only entry, and the redundant workout guide was removed.
- Money remains intentionally unchanged except for smarter allocation feedback: blue normally, amber near the limit, red at/over budget.
- Sleep history uses stored local timezone offsets for more stable duration calculations across DST/timezone changes.
- Automatic midnight refresh keeps Today/Week current when the app remains open overnight.
- English-only personal build.
- Subtle update-ready checking in Settings.
- Quiet local safety snapshots before important rebuild/reset/import operations.

## Storage and privacy

Reset has no account, cloud database, analytics service, AI service or external personal-data backend. Your personal records stay in this browser/device storage. Reset also keeps a second local IndexedDB copy and supports manual JSON export/import from Settings.

Clearing website data or deleting the web app can still remove local browser storage, so keep periodic exported backups.

## Updating

Back up from Settings first. Upload the contents of this folder to the root of the existing GitHub Pages repository and wait for the newest Pages deployment to finish. Then fully close and reopen the Home Screen app. If an older cached version remains, refresh the GitHub Pages URL once in Safari and reopen Reset.
