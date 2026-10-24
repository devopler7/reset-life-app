# Reset v3.6.3 — Personal Edition

This release updates the gym section. Existing scheduling, recurring routines, history protections and other app sections are retained from v3.6.2.

## Install

Export a fresh JSON backup first. Upload the contents of `life-reset-app`, including `icons`, to the root of the existing GitHub Pages repository. Wait for deployment, reopen Reset and confirm Settings shows v3.6.3. Existing device data is upgraded automatically to schema 18. No backup import is required.

## Workouts across midnight

An active workout remains active until explicitly finished or cancelled. Exercise logs follow its start date, including when saved after midnight. Closing or refreshing the app retains its ID, selected exercises, saved sets and original start timestamp. A second workout cannot overwrite an unfinished one.

The active card displays elapsed time without re-rendering exercise inputs. Finishing stores actual start and finish timestamps and duration. History shows daily duration totals and Details for individual workouts. Timing includes rest and time spent with the app closed. Earlier workouts with no recorded finish time show Duration not recorded rather than an estimate.

## Sets, warm-ups and previous performance

Each exercise contains individually editable working and warm-up sets. Weight and reps may vary between sets. The Add warm-up button inserts warm-up rows before working sets. Copy first working set to all working sets speeds up repeated sets.

LAST TIME displays the most recent previous working-set entry, excluding the active workout, warm-up-only logs and entries after the selected date. Use last workout copies its working sets while keeping any warm-ups already entered.

Warm-ups stay visible in history. Strength charts show the best working-set weight for each exercise entry. PRs and strength-gain achievements use working sets only. Old aggregate logs remain intact and are interpreted as working sets unless explicitly marked as warm-ups. Existing warm-up logs can be reclassified manually through Edit.

Partial entries are stored as device-local drafts on input, including temporarily invalid/blank fields. Reopen the exercise to resume. Saved exercise entries replace their own workout entry, avoiding duplicate logs. Closing an editor retains its draft. Explicitly finishing/cancelling the workout warns about and discards any remaining drafts for that workout.

## Compatibility and validation

The existing storage key remains unchanged. Migration adds gym workout history and draft containers without rewriting legacy exercise logs or unrelated domains. The previous release's schedule and historical corrections are retained. The previously discussed wake/rebuild display issue is outside this gym update.

28 gym regression groups and 11 page-render smoke checks passed in a local DOM/state simulator, along with JavaScript syntax and release-package checks. Tests include midnight while an editor is open, original-date attribution, exact duration, DST, partial draft recovery, warm-up exclusion, mixed working sets, previous hints, multiple workouts, duplicate saves, empty exercises, migration and export/import preservation.

These are simulated checks. No live browser layout, touch scrolling or physical iPhone test was completed. See TEST_REPORT.txt for the scope and first-device checklist.

## Privacy

Reset remains local-first without accounts, analytics or a cloud database. Upload app code only. Keep JSON backups private.
