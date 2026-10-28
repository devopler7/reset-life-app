# Reset v3.6.4 — Salary periods

This update changes Money from calendar-month budgeting to explicitly confirmed salary-to-salary periods. It retains the v3.6.3 gym update and other existing app sections.

## Installation

Export a fresh backup. Upload the contents of `life-reset-app` to the root of the existing GitHub Pages repository. Keep the same address, wait for deployment and confirm Settings shows v3.6.4. Existing device data upgrades to schema 19 without a JSON import.

## Confirming salary receipt

Money shows a Salary received button when the stored next salary date is due. It remains available if confirmation is delayed. No installation, payday or month boundary automatically closes a period or resets allocations.

Confirmation shows the previous period, new salary amount, actual received date, salary month and next expected payday. It preserves the allocation targets, closes the prior salary and begins spending totals for the new salary. Payday entries already logged can be assigned to the new period or kept in the previous period using the confirmation checkbox. The summary previews both outcomes. Duplicate or stale confirmations are rejected.

For the existing setup begun in October before payday, the initial open salary period is inferred from the app's start date and usual payday. The first confirmation lets you check the previous salary month. For the requested transition, choose September as the previous salary, October as the new salary and 28 October as the received date. Entries older than the initial period are retained as Earlier records.

Early/late salary dates and backdated confirmation are supported. The next expected date is editable, so periods are never assumed to last 30 days. Monthly defaults clamp dates such as the 31st to the last valid day of a short month and resume the usual day in following months.

## History and leftovers

Every closed period keeps its salary month, start/close dates, salary income and allocation snapshot. Transactions retain their original IDs, dates, amounts and notes, with salary assignment metadata added on confirmation. History can show each salary, every period together, or earlier records, with allocation filters and existing edit/delete controls.

Recorded net leftover sums income minus logged spending across closed periods, including negative balances from overspending. It is separate from current allocations and does not move funds, add an expense, change currentCash or double-count prior income. Existing calendar plan-history fields remain stored. Correcting an old expense updates its period and the recorded leftover total. The close-time summary is also retained for reference.

## Expense entry

Log spending is directly above Allocations near the top. Large emoji/name cards replace the allocation dropdown. The amount and note stay in place while selecting a card. Backdated expenses follow the corresponding salary, with an explicit salary selector for payday ambiguity. Currency totals use integer cents internally and show fractional SAR when needed.

Editing the current allocation plan leaves closed snapshots intact. Removed allocations that still have expenses retain their old names for history and corrections. Receipt/plan changes create safety snapshots; Undo is guarded against overwriting later Money changes.

## Validation

36 salary/Money regression groups, 28 gym regression groups and 11 page-render smoke checks passed in a simulated DOM/state environment. JavaScript syntax, scoped source changes, version/cache wiring, manifest and archive integrity were checked. Existing gym and scheduling function bodies are unchanged.

There was no live browser or physical iPhone test. The simulator does not validate layout, native controls, keyboard animations, touch scrolling or Home Screen behaviour. See TEST_REPORT.txt and perform the first-device checks after installation.

## Privacy

Reset remains local-first. This release contains app code only, without private backups, screenshots or test fixtures.
