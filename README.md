# Reset - Life Dashboard v2.2.0

A private, local-first iPhone-friendly dashboard for daily planning, university, money, fitness, car upkeep, projects and progress.

## Main tabs
- Today: timed day plan, current/next task, safe Adaptive Restart and day modes.
- Week: weekly routine, one-off tasks, supplied university timetable and a Today jump button.
- Uni: simple course progress and catch-up queue without topic-level complexity.
- Money: monthly allocations and spending. "Free after plan" is the amount left after all buckets.
- More: 7-day / 30-day / all-time progress, achievements, insights, Gym, Car, Projects and the Reset Plan.

## New in v2.2
- Progress tracking for gym sessions, 3-meal days, class attendance, good days and streaks.
- Achievements and lightweight local insights.
- Gym weight tracking with per-exercise progress charts.
- Car page for odometer, rego, service and fuel fills.
- Multiple projects with description, progress, next task, plan and session history.
- Normal, Bad Day, Exam and Holiday modes.
- Today button on the Week page.
- App version shown in Settings.
- Automatic second local snapshot using IndexedDB plus a persistent-storage request where supported.

## Data
The app remains local-first. It saves the main state in localStorage and automatically keeps a second copy in IndexedDB. No account, server or subscription is required. Clearing website data, deleting the web app, or losing the phone can still remove local data, so JSON export remains available as an extra manual backup.

## iPhone
Host the folder on GitHub Pages, open it in Safari, then Share -> Add to Home Screen.
