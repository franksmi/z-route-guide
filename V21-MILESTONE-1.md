# v21.0 milestone 1: account compatibility foundation

Baseline: `629bfa3eb0812514d5c708e95a79e26a179186d6`. Work belongs only on `v21-development`. No merge, deployment, game actions, or edits to `main` / `v20.5-stable` are part of this milestone.

## Architecture and retained feature inventory

| Area | Implementation / retained features |
| --- | --- |
| Entry point | `index.html`, `center.js`, `center-model.js`, `center.css`: dark/gold command view, six operation categories, next actions, roadmaps, inventory, modal editors, backup/history |
| Guide engine | Same-origin `legacy-guide.html` iframe, `app.js`, `seed.js`, `buildings.js`: editable observations with sources/status/dates, manual plans/priorities, linked targets, complete audited building inventory, 18 strategy sections |
| Construction engine | Same-origin `command-dashboard.html` iframe, `command-dashboard-assets/app.js`: three queues, completed versus running/held levels, prerequisites, Base 27 / Camp 1 27 route, optional staging, funding, critical-chain approximation, conditional seven-day plan, forecasts |
| Research | Existing client records in `data.js` and 15 research files: 153 technologies, prerequisites, claimed/running/held distinctions, evidence/invoice checks, speed effects, production payback, ROI and event windows |
| Fighter | `fighter-data.js`, `fighter-model.js`, `fighter-ui.js`: six components, inventory, fusion, direct Hero versus converted Fighter effects, purchase scenarios, random simulations, unknown odds/caps retained |
| Persistence | Guide `zroute-v205-state`, dashboard `zroute-command-v2`, Fighter `zroute-fighter-v1`; `workspace.js` supports explicit linked edits, pending first-use edits, 20 raw recovery snapshots and full exports |
| Transfers | `account-transfer.html/js`, `transfer-validation.js`: per-tool validation, reviewed replacement, checkpoint and rollback if a storage write fails |

No backend, game-login integration, automatic completion or remote account sync exists. Historical HTML archives and client data/formulas are unchanged.

## Findings and fixes

* Every construction action previously used `edit: 'build'`, and the center editor translated it to Hospital. `buildAction` now carries `buildingId`; recommendations resolve that ID using one shared mapping. Defense Line 1002 opens `building-defense-line`; Hospital 1004 opens `hospital`. Missing/unmapped IDs open queue timers instead of guessing a building. The title is never parsed as an identity.
* `heroes()` rendered every Heroes field, then appended `hero-books` again. After the first saved entry, the same record appeared twice. The unified view separates materials from hero observations and shows books once. This was duplicate rendering, not evidence of two independent stockpiles. Custom fields whose labels resemble skill books are preserved and flagged for review rather than summed or deleted.
* Guide and dashboard can contain conflicting historical building observations. Backups & History now lists mapped conflicts. Neither side wins automatically; existing explicit-edit synchronization continues unchanged.

## Unified model and backward-compatible migration

`account-model.js` is the shared compatibility boundary. Its schema-21 **derived view** exposes heroes, formation/squads, equipped gear, buildings, research, central resource balances/materials, Fighter state and conflicts. Only observed records are included. Guide-only audited buildings remain identifiable by their original field ID; no game ID, level, cost, roster entry, dependency or formula is invented.

The three existing stores remain authoritative. There is no second persisted account to drift out of sync. The same building map drives linked edits and action routing. Heroes & Gear consumes the shared view; other retained calculation engines continue to use their original validated schemas. This is an incremental migration foundation, not a completed replacement of every engine.

`prepare()` validates a private copy of a version-1 workspace with the existing owning-tool validators. It preserves unknown extension fields accepted by those validators, does not mutate the input, does not fabricate absent tools, and rejects unsupported envelope versions/tools. The transfer page uses this boundary before its existing review/replacement step. Migration is intentionally lossless and idempotent: original storage keys, envelope version and export layout remain readable by v20.5. Unknowns stay blank/unknown, held work stays unclaimed, and conflicting records remain available for review. Merely viewing or importing a preview does not save anything.

**Workspace-4 was not available in the referenced conversation or this workspace.** Its filename is an export sequence, not a schema version. Compatibility has been tested with repository fixtures and roundtrips, not the user's actual backup. Do not substitute bundled seed data for workspace-4.

## Validation

Run `node --test tests/*.cjs` (no installation/build step). All existing checks and new regressions pass: 106 individual assertions/check cases across account-model (7), center (21), construction (37), Fighter (26), workspace (15). The legacy files use their own counters; Node's top-level summary counts those files as single tests.

New coverage includes read-only view isolation, blank/held preservation, conflicting observations, guide-only buildings, single skill-book placement, alias preservation, idempotent/partial migration, failure isolation, stable-ID routing for Defense Line/Hospital/Base, and the real transfer validator preserving extension data.

Browser smoke testing was attempted but could not run here: the sandbox refused a local listener; routed-file testing then found no bundled Chromium executable, and installed Chrome exited under the sandbox. Browser modal/save flows and visual review remain to be verified in a normal preview environment. CSS and artwork are untouched. No claim of visual QA is made.

## Next milestones

1. Review a copy of workspace-4 through the transfer preview and check all conflicts, per-tool roundtrips, recovery and editor flows in a browser. Keep the original backup untouched.
2. Add an observed/verified hero catalog and squad dropdowns with stable IDs. Keep unknown ownership distinct from not owned; separate actual equipped gear from simulations.
3. Extend central resources and building views using existing observations; verify aliases and units before consolidation. Add any missing buildings only from supplied evidence.
4. Build research-tree visuals from verified prerequisite relationships and actual node layouts. Do not infer topology from names or aggregate percentages.
5. Assess automatic sync only against an official, authorized game data/export interface. The repository supplies no such interface. Browser-origin synchronization and portable JSON already work; cross-device sync would require a separate authenticated service, conflict policy and approval. No game scraping, credentials or undocumented endpoints are introduced.
