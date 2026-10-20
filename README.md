# Reset v3.5.0 — Personal Edition

Reset is a local-first personal dashboard built for iPhone Home Screen use. It keeps Today, Week, University, Money, Gym, Health, Sleep, Car, Projects and Progress in one lightweight PWA. Personal records stay in the browser on the device unless you manually export a backup.

## v3.5 highlights

- Wake and Sleep now keep **planned times and actual times separate**. Unchecking and rechecking Wake restores the last actual wake time instead of replacing it with the current clock.
- Legacy v3.3/v3.4 Wake/Sleep records that likely mixed actual and planned anchors are repaired during migration.
- The scheduler has stricter hard-anchor, fixed-event, meal-order and spacing rules. Repeated rebuilds are designed to be stable.
- Week summary cards now use one unit consistently: **days complete, days needing attention and planned days**.
- Intentional cancellations are informational and do not create a Needs attention state.
- Needs attention now explains the actual scheduling problem.
- Weekly Routine / Manage Routine has a redesigned day-by-day editor with Wake/Sleep anchors plus separate fixed and flexible sections.
- Plan Day supports a short optional day note.
- Gym exercise selection updates in place without re-rendering or jumping the list, and Sets/Reps use numeric-only inputs.
- Normal saves are batched briefly to reduce unnecessary synchronous storage work.
- Consequential actions have more Undo coverage, including task moves and money-plan changes.
- Settings includes **Check Reset data** and local recovery snapshots.
- Safety snapshots are created before imports, migrations, routine changes, day resets/rebuilds and other risky repairs.
- Fast repeated taps on the same control are guarded against accidental double execution.
- Arabic/localization UI has been removed from this personal build. The app is English-only.

## Storage and privacy

Reset has no account, cloud database, analytics, AI service or external personal-data API. The working state is stored locally with a second IndexedDB browser copy plus optional manual JSON export/import. A small rolling local recovery snapshot system keeps up to three safety points for risky operations.

Clearing website data or deleting browser/app storage can still remove local copies, so export a JSON backup before major updates.

## Updating

Upload the contents of this folder to the **root** of the existing GitHub Pages repository. Wait for the newest Pages deployment to finish, then fully close and reopen the Home Screen app. Settings should show **v3.5.0**.
