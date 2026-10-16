# Reset — Life Dashboard v2

A private, installable personal dashboard built as a Progressive Web App (PWA). Version 2 is centered around an actual daily timeline: what to do today, when to do it, what is next, what the week looks like, university catch-up and a separate money allocation system.

## Main tabs

### Today
- Live daily timeline with times
- Highlights what is happening now and what comes next
- Add one-off tasks for today
- Check items off as you go
- “Restart today” skips earlier unfinished items so one bad start does not cancel the rest of the day

### Week
- Monday–Sunday overview
- Select any day and see its full schedule
- Add one-off tasks to any date
- Add/edit recurring weekly items such as real class times, gym sessions and routines
- Previous/next week navigation

### Uni
- Course progress vs teaching week
- Priority catch-up queue
- Due dates and time estimates
- Send a university task directly into your schedule

### Money
- Monthly income and current-cash snapshot
- Separate allocation buckets
- Spending log by bucket
- Automatic spent/remaining totals for the current month
- Payday countdown

### More
- Full reset plan
- 7-day progress
- Personal project session counter
- Weekly review

## Data and privacy

The app has no account, backend, analytics or subscription. Personal data is stored in browser local storage on the device/browser profile where you use it.

Use Settings → Export backup periodically. Clearing Safari website data can remove local app data.

## Updating an existing GitHub Pages install

1. Download and unzip the update ZIP.
2. Open the `life-reset-app` folder inside it.
3. In your GitHub repository, choose **Add file → Upload files**.
4. Drag **all files and the `icons` folder from inside `life-reset-app`** into the repository root.
5. Commit the changes to `main`.
6. Wait about 1–3 minutes for GitHub Pages to redeploy.
7. Open the normal app URL in Safari and refresh once. If you already added it to the iPhone Home Screen, fully close the Home Screen app and reopen it.

Your existing local data uses the same storage key and is migrated forward instead of intentionally being wiped.

## First setup after updating

Go to **Week → Manage routine** and replace the general university blocks with your real lecture/tutorial/practical times. The defaults give the app a usable structure immediately, but the real timetable makes Today much more useful.

Then go to **Uni** and set each course to your actual current week.

Finally, go to **Money → Edit** and adjust the suggested monthly allocations to match your real costs.
