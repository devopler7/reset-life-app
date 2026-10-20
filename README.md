# Reset v3.6.1 — Personal Edition

Reset is a local-first personal dashboard built for iPhone Home Screen use. Personal records stay on the device unless you manually export a backup.

## v3.6.1 hotfix

- **Swap now means swap positions, not raw clock times.** Different-duration tasks are repacked around the swap instead of being allowed to overlap nearby tasks.
- The order you choose is stored as a **one-day manual order** and survives **Rebuild + keep my moves**.
- Rebuilding the day no longer silently puts `Shower + grooming` back ahead of a task you deliberately swapped it with once the morning sequence has already moved into the day.
- Fixed events still protect their real time, while fixed events cancelled for the day do not block the repack.
- Natural hard ordering is still protected. Reset refuses a swap that would deliberately put Lunch before Breakfast, Dinner before Lunch, or Shower after Breakfast while both morning items are still pending.
- Resetting the day to routine or choosing **Reset my moves + rebuild** clears the manual swap order.
- v3.6 reminders, intentional overlaps, editable Plan Day, and all v3.5 features are retained.

## Storage and privacy

Reset has no account, cloud database, analytics, AI service or external personal-data API. The working state is stored locally with an IndexedDB browser copy plus optional manual JSON export/import and local recovery snapshots.

Export a JSON backup before major updates.

## Updating

Upload the contents of this folder to the **root** of the existing GitHub Pages repository. Wait for the newest Pages deployment to finish, then fully close and reopen the Home Screen app. Settings should show **v3.6.1**.
