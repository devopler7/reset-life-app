# Reset v3.6.5 — Compact Money summary

The Money home card displays the current salary's spending, income, dates and progress bar. The multi-period bar chart has moved to **Money > Salary history > Compare salary periods**, collapsed by default.

## Install

Export a fresh backup, upload the contents of `life-reset-app` to the root of the existing GitHub Pages repository, wait for deployment and reopen Reset. Confirm Settings shows v3.6.5. Existing salary confirmations and records carry over automatically; no import or new salary confirmation is required.

## Scope

This release changes presentation only. Data schema remains 19. Salary periods, allocations, recorded leftovers, spending history, gym features and scheduling behaviour are retained from v3.6.4. There is no financial-data migration in this release.

## Validation

36 existing Money regression groups passed. A focused simulated-DOM check confirmed no comparison chart on the home page, a collapsed comparison section in history, a retained spending progress bar and no Money state change from this navigation. JavaScript syntax and release packaging were checked. Only the two Money render function bodies and the required display-version/build references changed in app.js.

No physical iPhone or live browser layout/touch test was performed. The package contains app code only, without personal backups, screenshots or test fixtures.
