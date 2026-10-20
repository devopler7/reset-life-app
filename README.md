# Reset v3.6.0 — Personal Edition

Reset is a local-first personal dashboard built for iPhone Home Screen use. It keeps Today, Week, University, Money, Gym, Health, Sleep, Car, Projects and Progress in one lightweight PWA. Personal records stay in the browser on the device unless you manually export a backup.

## v3.6 highlights

- **Plan Day is now genuinely editable.** Tap a recurring or one-off item to move/swap flexible items, cancel or restore an occurrence, edit one-off details, or delete one-off items.
- **Needs attention names the actual conflict** instead of only saying that a fixed event overlaps another task.
- Added **Task / event** and **Reminder** item types from both Today and Plan Day.
- Reminders are deliberately **non-blocking**: they can overlap classes, meetings and tasks without reserving time, triggering Needs attention, or changing Rebuild.
- Fixed one-off events can use **Allow intentional overlap** when two real events genuinely happen at the same time.
- A fixed event that is **cancelled for the day no longer blocks moves or swaps**. Restoring it immediately makes its original time protected again.
- Exact boundaries are handled correctly: an event ending at 4:00 PM and another starting at 4:00 PM is not treated as an overlap.
- Reminders are shown in the timeline with their own icon/badge but are excluded from completion percentages and day-complete logic.
- Plan Day summary now distinguishes one-off items, reminders and cancellations.
- v3.5 scheduling, Weekly Routine, Gym, Money and local-safety behavior are retained.

## Storage and privacy

Reset has no account, cloud database, analytics, AI service or external personal-data API. The working state is stored locally with a second IndexedDB browser copy plus optional manual JSON export/import. Local recovery snapshots remain available for risky operations.

Clearing website data or deleting browser/app storage can still remove local copies, so export a JSON backup before major updates.

## Updating

Upload the contents of this folder to the **root** of the existing GitHub Pages repository. Wait for the newest Pages deployment to finish, then fully close and reopen the Home Screen app. Settings should show **v3.6.0**.
