# Reset v3.6.2 - Personal Edition

## Uploading the update

Export a fresh JSON backup from the installed app first. Upload the CONTENTS of life-reset-app, including the icons folder, to the root of the existing GitHub Pages repository. Wait for deployment, fully close and reopen Reset, and confirm Settings shows v3.6.2. If the previous version is still shown, refresh the Pages URL in Safari once and reopen the Home Screen app.

The app reads the existing local data. No backup import is required for the upgrade. Your JSON backup is not included in this public site package.

## Included changes

- Past days keep independent task snapshots and saved completion summaries. Later recurring-item changes no longer rewrite those days.
- For the matching existing 17 October setup, the requested 17-19 October corrections run once during migration. University catch-up and Room + personal reset on 17 October, University catch-up on 18 October, and Outside walk and Mobility exercises on 19 October are completed. Old catch-up and walk variants are consolidated into their replacements with completed statuses and explicit time changes carried across.
- The existing setup starts tracking on 17 October 2026. Earlier calendar cells are Not tracked and do not count toward routine completion or missed days. Older unrelated logs remain stored.
- Past dates offer Correct this past day. Changes affect that date's task statuses or task membership without altering actual sleep/wake timestamps or unrelated logs.
- Manage routine retains the day-specific view and adds a collapsed All recurring items list with search, filters, sorting, editing, adding, duplication, pause/resume and removal.
- Removing a recurring item offers Keep its history or Delete its task history too. Full task-history removal retains anonymous daily progress totals, so past percentages and aggregate achievements remain. Other app logs, including exercise, spending and sleep logs, are retained. Wake and Sleep remain protected anchors.
- Next-week navigation selects Monday. Previous-week navigation selects Sunday. Arrows and swipes share this behaviour.
- Page and panel scrolling have a shared lock, return positions, visible-viewport sizing and cancellation lifecycle. The workout picker uses one vertical panel scroller. A global touchend cancellation was removed.
- Wake/Sleep recurring start edits update their end time automatically. Invalid form entries remain visible with an inline explanation. Empty fixed-event messages show the day correctly.
- Early-completed tasks remain completed and retain their times during rebuilds. Completed fixed occurrences no longer reserve future rebuild slots. Rebuild summaries explain moved tasks, fixed events and tasks that did not fit.
- Undo for recurring changes restores affected fields while retaining unrelated subsequent changes. Deleted templates are not automatically re-added on reload.
- Startup can recover from a newer automatic copy, and primary-storage failures are surfaced. New worker versions wait for a reload action instead of force-navigating an open editor.

## Data protection and testing

The existing data schema is upgraded to version 17. A pre-migration safety snapshot is retained locally when possible. The supplied backup was used only as a private test fixture. Money, gym, health, car, courses, uni tasks, projects, weekly reviews, profile data, existing one-off tasks and actual sleep/wake timestamps were compared against it and preserved.

65 local UI/state assertions, 22 reliability groups, 7 startup/storage groups, 48 scheduling combinations and 36 swap cases passed. These use a simulated DOM and VM, not a live browser. Live layout, wheel/touch scrolling, physical iPhone keyboard behaviour and Home Screen mode remain unverified because browser preview access was blocked. See TEST_REPORT.txt.

## Privacy

Reset remains local-first, without accounts, analytics or a cloud database. A public GitHub repository receives app code only. Keep JSON backups private.
