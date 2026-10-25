# Milestone 2.1 — Hero card redesign

Continues `v21-development` from `3af33d5`. No changes to main, v20.5-stable, production hosting, or Milestone 3.

Five observed roster heroes now use compact dark/gold cards with prominent clickable levels, optional recorded power, five individually editable star observations, named skill rows with rank/maximum/lock controls, and all four equipment slots directly on every card in Rifle/Helmet/Scope/Vest order. Each 2×2 tile has an original neutral slot icon, recorded rarity and level, and a focused editor. Missing is distinct from empty or not owned. Evidence and dates, earlier observations and Hall of Legends are expandable. Existing targets, simulations, materials, advanced tools and other categories remain.

## Evidence and limits

The supplied historical Carter screenshot shows three full gold stars, a partial fourth and gray fifth. It does not establish a discrete segment count, per-step thresholds or costs. This build supports recording unknown, gray, partial gold or full gold for each star independently. Partial fill is a visual symbol, not a claim of 50% game progress. Exact interactive sub-star steps remain deferred until verified. No screenshot automatically updates saved values, skill ranks, power or gear. Hall of Legends remains a distinct unverified/deferred stage.

Reviewed the referenced [ZR:Reference README](https://github.com/JeffxLabs/zrouteredemption/blob/main/README.md), which describes extracted client artwork. Reuse permission for the game artwork was not established; no external portraits, skill sprites or gear sprites are copied. Cards use clearly labeled original neutral silhouette placeholders and original slot diagrams. Authentic portraits remain a documented asset limitation. No scraping, game-client extraction, inferred identity matching or power formulas are introduced.

## Lossless editing contract

Existing storage keys, guide schema and workspace envelope remain unchanged. Merely viewing cards derives a detached view and performs no migration save. Conservative skill parsing recognizes exact named rank/max clauses and explicit locks; ambiguous clauses retain their full original text as notes, with unknown ranks/maxima. Exact whole-star numbers alone derive full/gray stars.

Explicit focused edits use the existing guide API and normal checkpoint/previous-save/history path. `heroDetail` is a versioned field extension; its `rawValue` must match the field's current raw value before the derived view uses it. A later legacy value edit invalidates stale structured display without deleting its extension. Structured skill/star edits keep the original raw text unchanged; active structured observations are authoritative for these new controls. Legacy text editors continue showing historical text, not a rewritten approximation. Each explicit focused save appends the displaced value, label, source, status, date and prior detail to `originalObservations`, then records the new evidence/date. Archived observations are expandable on the card. Unknown accepted extension properties remain present through validation and transfer.

Gear levels remain numeric strings in their original field IDs, so existing target reconciliation still works. A new slot is created only after an explicit saved observation. Rarity/item details are extensions of that gear field; explicit gear edits also update its display label. No speculative inventory or bag ownership is created. Power is recorded only, never calculated.

Squad and gear simulations still operate on detached in-memory plans and have no Apply action. Save changes invalidate the plan through the derived baseline. Reset/reload discards drafts.

## Validation

`node --test tests/*.cjs`: 24 runner entries, 23 passed, 1 skipped (private workspace fixture unavailable), 0 failures. Legacy files contain additional internal assertions. New cases cover partial text preservation, conservative stars, stale metadata, immutable detail, real guide API edits with retained original evidence/extensions, and real transfer validation retaining structured records. Existing suites retain workspace, target, construction, Fighter and simulation coverage.

Rendered in the Codex in-app browser at test origin `http://127.0.0.1:8767`: import preview/confirmation with a disposable bundled fixture; five cards and twenty gear slots; level, individual skill, partial-star and new gear-slot saves; reload persistence; simulation/reset; workspace export. Exported `data` before and after squad simulation compared equal across all included tools. Actual export includes structured skill edits and original text/evidence. Narrow layout visually checked at approximately 320px. Standalone Chrome automation could not launch; in-app-browser checks supplied the rendered evidence instead.

Full browser import/conflict/recovery/export acceptance with the user's private backup, injected write/quota failures, desktop layout and physical iPhone checks remain outstanding. Existing recovery limitations documented in V21-REVIEW-HANDOFF.md are unchanged. This is a review build, not release approval.

A separate local review package retains the preceding preview's import-first entry and origin guards on a new origin; no hosted preview or production deployment is performed. It excludes Git metadata, test fixtures, screenshots and private account exports. See the supplied local handoff for preview access and restart instructions.
