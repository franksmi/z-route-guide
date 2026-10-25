# Workspace-4 v21 validation

Validated 2026-10-25 against v21-development baseline 6f93840e1ab37b8a60cadffd100c77f4870b311e.

## Results

Both uploaded workspace-4 and workspace-3 pass the actual account-model preparation and all three owning tool validators. No values change during preparation. Repeated reviewed import and export retains the entire data object exactly, including unknown/blank values, tasks, history, queues, research and Fighter state. Export timestamps are generated anew and are excluded from data equality.

Workspace-4 contains 118 fields, 11 tasks and 16 history entries. No duplicate field IDs or model-detected building/skill-book conflicts were found. This conflict scope is the existing account model, not an assertion of semantic agreement across every possible field.

Compared with workspace-3: Arnold 112 → 115; Monroe 115 → 118; Dirk 110 → 115; Carter 110 → 115; new skill books observation 33,800; five added history entries. The construction dashboard and Fighter data are identical. Tasks are unchanged. Historical tasks below already recorded levels remain preserved rather than silently rewritten.

## Fixes

- Workspace preparation retains extension properties at tool and nested record levels while applying validator-normalized values. Dashboard and Fighter validators previously rebuilt these records and discarded extensions.
- Import preview displays detected conflicts before replacement, without reconciling or overwriting either observation.
- Added an opt-in private-backup regression test for both real backups, repeated imports/exports, no writes before confirmation, rejection without account changes, injected conflict preview, nested extension retention and original file preservation. Private account JSON is not committed.

Run the suite with ZR_WORKSPACE_FILE=/absolute/path/to/backup.json node --test tests/*.cjs. Without that variable the private-backup test skips. All automated suite entries passed with workspace-4; the real-backup regression also passed with workspace-3.

Original workspace-4 SHA-256: fc5158a301d48555f822cb6dcf7c6c79a77e78ac55769f81772675e7f26c153f. Original attachment and working copy match after testing.

## Limits and milestone gate

The import UI handlers were exercised in an isolated browser-state harness, not a rendered browser. Visual verification and the wider editor flows remain outstanding. Milestone 2 was not started. No merge or deployment was performed. Only v21-development is updated.
