# ChatGPT Review Handoff — Z Route Command Center v21

Prepared October 25, 2026. Purpose: help ChatGPT interpret user feedback, screenshots and improvement requests during acceptance testing. This is a review handoff, not approval to change code, merge or deploy. Private workspace contents are deliberately excluded.

## 1. Preview access and source versions

Repository: https://github.com/franksmi/z-route-guide

- Application branch: `v21-development`.
- Latest application commit before this documentation change: `1881a88a0a83788b6f818e4b7d0a9796293058dd` (Hero Command Center).
- Prior workspace-validation commit: `f43b339bd3509f7788b0cbfc3e959823952f9cd4`.
- Production/stable baseline: `629bfa3eb0812514d5c708e95a79e26a179186d6`.
- Separate preview branch: `v21-uat-preview`; latest preview packaging/startup-fix commit: `698210a2f6240bfca968ae5da2b067e89e06880e`. This commit is in the private Sites source history, not the original GitHub branch.
- This handoff is committed separately to `v21-development`; consult that branch's history for the documentation commit SHA.

**Current Mac review:** http://127.0.0.1:8766/command-center.html#heroes

**Local import:** http://127.0.0.1:8766/account-transfer.html

The local preview is a static HTML/JavaScript/CSS/artwork bundle served only on Mac loopback port 8766. Keep its server running. The supplied `Start Preview.command` restarts it. No sign-in is needed. On an iPhone, 127.0.0.1 means the iPhone itself, so this Mac-only address does not provide mobile access.

**Separate private HTTPS preview:** https://z-route-v21-uat.rainyclock20.chatgpt.site/

**HTTPS import:** https://z-route-v21-uat.rainyclock20.chatgpt.site/account-transfer.html

Hosting uses Sites, static directory `dist`, owner-only ChatGPT sign-in. The startup fix was successfully deployed, but loading/sign-in was troublesome and application-level HTTPS verification remains incomplete. Use the local version for current Mac review. Use exact `.html` links; extensionless `/account-transfer` routing has not been validated.

### Data isolation and safe import

Production, HTTPS preview and local preview have different browser origins and therefore separate localStorage, even though account key names are identical. Safari and Chrome also maintain separate stores. Preview frames use relative same-origin pages; no production account bridge or remote game sync exists. The preview bundle restricts account network connections and cross-origin frames through its content policy. It includes origin guards and an import-first launcher; these wrappers are separate from the base GitHub application.

1. Keep an untouched copy of workspace-4 outside the browser. It is a version-1 workspace backup; “4” is the filename sequence, not schema version.
2. Open the exact preview import URL. Select your private workspace-4 JSON locally; do not attach it to a public issue or commit it.
3. Review the included tools and detected conflicts. Selecting the file validates/previews it without replacing account data.
4. Choose **Replace reviewed account data** only after review. Included stores are replaced, not merged; omitted stores remain unchanged. An older backup can replace newer preview observations if confirmed.
5. Open Hero Command Center. Export a preview backup before experimenting with saved edits or recovery.

The file is read in the browser, not uploaded by the import handler. Import cannot reach production's origin-scoped localStorage. Local/hosted/device data does not automatically sync. Embedded historical seeds remain in existing source; they are not proof of the user's current account.

## 2. Feature inventory

| Area | Implemented or preserved functionality |
| --- | --- |
| Home | Next three contextual moves, Base/Camp route, active queues, blockers and resource/event priorities. |
| Construction | Three queues; completed, selected, running and held distinctions; prerequisites; Base 27/Camp 1 27 route; staging camps; funding; conditional schedule and forecasts; existing progress editors. |
| Research | 153-node ledger; claimed/running/held states; prerequisites, evidence and invoices; speed calculations, production payback, ROI, focus and event-window controls. |
| Sky Fighter | Status and six components; per-level spare inventory; fusion calculations; direct Hero versus converted Fighter effects; purchase/acquisition scenarios and random simulations with unknown odds/caps exposed. |
| Hero Command Center | Saved roster cards combining levels, stars, skill text, gear, sources and dates; evidence labels; recorded formation; development materials; recorded-target actions; disposable squad/gear simulations and Reset. |
| Soldiers | Troop/camp observations, capacity and tier counts, lower-tier promotion reserves and staging strategy; manual live-unlock checks. |
| Events/resources | Loose/boxed/combined observations, reserves, route gaps, speedups, readiness notes, VS timing/triggers and held-completion review. |
| Account tools | Observation editors; manual action plans/priorities; linked-target completion; building inventory; strategy library; original advanced tools; workspace export/import, raw recovery export and history. |

### Changes since v20.5

Milestone 1 added a shared, read-only account view and reviewed backward-compatible workspace preparation. It fixed construction actions opening the wrong building editor, removed duplicate skill-book rendering in the main inventory, and exposed mapped account conflicts. Subsequent validation fixed loss of accepted extension properties and added conflicts to import preview.

Milestone 2 replaced the flat Heroes & Gear overview with joined hero cards, explicit evidence and session-only squad/gear previews, while retaining editors, targets and original observations. Existing dark/gold styling, artwork, calculation engines, historical HTML and strategy tools remain available.

### Incomplete or deferred

No comprehensive verified hero catalog, explicit owned/not-owned model, structured multi-squad editor, combat-power prediction, verified gear compatibility rules, complete skill database, automatic upgrade costing, game integration or cross-device sync. Resource/building consolidation and research-tree visuals remain future work. “Update Needed” is an evidence gap, not a fabricated zero or a claim that a game feature is locked. Existing recommendations remain conditional on their evidence and live invoices.

## 3. Hero Command Center behavior

### Representation

Saved guide observations remain authoritative. Each field has an ID, group, label, text value, source, status and update date. `hero-model.js` derives hero objects from existing `Heroes`, `Skills` and `Gear` fields using the suffixes `Level`, `Stars`, `Skills`, `Helmet`, `Vest`, `Rifle`, `Scope`. The prefix becomes the derived hero ID; the first label word supplies its display name. No catalog hero is automatically added.

Skill ranks remain original text, including locked skills and partial/untranscribed notes. Gear is linked by its original field ID and recognized slot; it is not a complete inventory of uniquely numbered game items. Unrecognized observations remain accessible in the original observations section.

The `formation` observation retains its original text. The parser recognizes explicit `Front:` / `rear:` lists separated by semicolons, with hero names joined by `+`. It links matching saved heroes. The simulator offers two front and three rear positions for Squad 1. Other squads and ambiguous/unmatched placement text are not inferred.

### Evidence labels

| Saved evidence | Card label |
| --- | --- |
| Nonblank `recorded` | Confirmed record |
| Nonblank `manual` | Player reported |
| Inherited/other nonblank record | Unverified record |
| Missing field, blank value or `unknown` status | Missing |

“Confirmed record” means historical game-screen evidence, not live verification. Source/date are shown. A confirmed skill field can still contain explicitly incomplete transcription; its label does not certify every skill detail. Older records require user review even when the status remains recorded. Recommendations may use a separate freshness label.

### Simulations

- Plans copy the derived assignments into memory; they never save actual assignments, history or game actions.
- A squad move removes the hero's previous draft position and replaces the selected position's occupant. The displaced hero becomes unplaced; this is not an automatic squad swap.
- A gear move reassigns the selected recorded item in the draft. If the destination has a recorded item in the same slot, the two draft owners swap. Item identity, levels and evidence stay unchanged.
- Reset discards the draft and returns to recorded assignments. Reloading loses the draft. Changing the derived saved roster/formation invalidates it on refresh.
- There is no Apply-to-actual button, compatibility guarantee, stat gain, invoice or battle-outcome prediction.

### Gaps and useful evidence

The private validation reference contains missing star records, incomplete skill transcriptions, inherited gear and only one recorded formation. Additional slots, bag inventory and other squads are not proven complete. Prefix-based discovery and first-word names are limited; malformed formation data is not comprehensively validated. An absent observation must not be interpreted as “not owned.”

Provide dated screenshots or exact transcriptions of each hero's level/stars, named skills/ranks/caps/locks, gear slot/rarity/level/owner, spare gear, squad number and position. Distinguish actual assignments from proposed changes. For upgrade recommendations, supply live invoices, available materials and verified effects. Keep private evidence in the review conversation, not public repository records.

## 4. Technical context and safeguards

| Files | Responsibility |
| --- | --- |
| `index.html`, `center.js`, `center-model.js`, `center.css` | Base entry point, navigation/rendering/editors, recommendations and established styling. |
| `hero-model.js` | Derived roster, evidence classification, placement parsing and immutable simulations. |
| `account-model.js` | Shared account view, building identity map, limited conflict detection and lossless workspace preparation. |
| `account-transfer.html/js`, `transfer-validation.js` | File selection, validators, replacement preview, confirmation and import rollback. |
| `workspace.js` | Full bundle export, raw checkpoints/recovery and explicit guide/dashboard synchronization. |
| `legacy-guide.html`, `app.js`, `seed.js`, `buildings.js` | Original guide/editor engine, seed observations, building audit and strategy access. |
| `command-dashboard.html`, `command-dashboard-assets/*` | Construction/research engine, client datasets, account snapshot and forecast tools. |
| `fighter-data.js`, `fighter-model.js`, `fighter-ui.js`, `fighter.css` | Fighter data, validation/math, UI and styles. |
| `tests/*.cjs` | Automated model, transfer and persistence checks. |
| Preview-only `dist/index.html`, `command-center.html`, `preview-entry.js`, `preview-guard.js` | Import-first entry, renamed application page, routing/fallback and allowed-origin checks; private/local preview source only. |

Primary localStorage keys: `zroute-v205-state` (guide), `zroute-command-v2` (dashboard), `zroute-fighter-v1` (Fighter). `zroute-recovery-v1` holds up to 20 raw workspace checkpoints; `zroute-link-pending` retains explicit linked edits before first use of a destination tool. The guide also retains previous/unreadable/audit copies and legacy keys for migration.

Workspace envelope: `{format:"zroute-workspace", version:1, exportedAt, data:{<included storage key>:<tool state>}}`. The derived account view has schema version 21; this does not replace existing persisted schemas or change the envelope to version 21.

Preparation copies and validates included tools, retains accepted extension properties, and rejects unsupported envelopes, unknown tools and invalid records. Confirmation checkpoints current raw data and writes included stores; on a write failure the handler attempts to restore prior raw values. This is browser-local code, not a database transaction. Export generates a new timestamp; compare `data`, not export timestamps, for equality. Explicit saved building/resource edits can synchronize mapped fields across the two existing tools; simulations cannot.

Conflict reporting currently covers mapped building disagreements and possible skill-book aliases. It is not comprehensive hero/gear semantic reconciliation. Conflicts are retained for review, not automatically resolved.

**Never without explicit approval:** change `main` or `v20.5-stable`; merge; deploy to or replace the existing production site; change actual assignments from simulations; publish private workspace data; discard unknown/extension/conflicting observations; invent game stats/formulas/ownership; add scraping, credentials or sync services. Preserve existing features and design. Review feedback is not blanket implementation approval. No Milestone 3 development is authorized by this handoff.

## 5. Verification and open issues

- Milestone 1: 106 internally counted checks passed across the original five test files.
- Workspace-3/workspace-4 validation: repeated preparation/import/export preserved all three data sections; accepted extensions retained; invalid duplicate fields rejected; injected mapped conflicts displayed in the handler harness; original backup checksum unchanged.
- Application at `1881a88`: all 19 Node runner entries passed with workspace-4, including seven hero cases. Legacy files contain additional internal checks; do not present the runner count as the total individual assertion count.
- Preview after startup fix: all 25 runner entries passed (the application suite plus six preview checks). Tests cover origin guard, import-first behavior, package exclusions, startup regression, immutable simulations and draft invalidation. Preview-only tests/wrappers are not on the base application branch.
- Command: `ZR_WORKSPACE_FILE=/private/path/to/backup.json node --test tests/*.cjs`. Private-reference tests skip without that variable. Do not commit the backup.
- Browser evidence: local server returned HTTP 200; private HTTPS owner sign-in screen rendered in Chrome. Other automated browser attempts timed out or lacked sign-in. The user subsequently confirmed the local application opened and reached Hero Command Center. That is user smoke evidence, not completed agent visual QA.
- No completed rendered end-to-end import/conflict/recovery/export, simulation-control, desktop layout, mobile viewport or physical iPhone test has been recorded.

Known issues/risks: the preview startup redirect cancellation bug was fixed and deployed only in preview packaging. Hosted loading/sign-in and extensionless routing remain unverified. Recovery writes only keys present in the chosen checkpoint; it does not remove later-added stores absent from that checkpoint, and its multi-key restore lacks import-style rollback. Treat restoring an empty/partial checkpoint as a known limitation. Full-quota/failure recovery needs manual acceptance. The preview guard also needs blocked-storage acceptance testing. No additional fixes are made in this documentation task.

## 6. Prioritized review checklist

### P0 — Data safety and correctness

- Confirm preview origin; retain the original private backup and export a baseline.
- Preview workspace-4, cancel once, then confirm; compare each tool against the private reference.
- Check conflict messages using a disposable conflict fixture; invalid JSON/duplicate IDs must leave account data unchanged.
- Export before/after simulations: `data` must match. Refresh and Reset must restore recorded assignments.
- Make a reversible saved edit, verify draft invalidation and history, then recover/export. Check partial-checkpoint limits above. Confirm production is unchanged.

### P1 — Hero workflow

- Verify every roster card, stars, skill text, gear/source/date and evidence label; distinguish missing from zero/not owned.
- Verify formation parsing and original text; move into an occupied position and check the displaced hero is unplaced.
- Move gear into occupied and empty slots; check swaps, item identity and unchanged saved records.
- Check dropdowns, Reset, editors, targets, original observations and advanced-tool return navigation.

### P1 — Existing operations

- Check Home and all six categories; Defense Line/Hospital open their own editors.
- Check queue states, research held versus claimed levels, Fighter scenarios, resources, strategy, export and recovery. Viewing must not imply a game completion.

### P2 — Desktop/mobile usability

- Desktop: navigation, scrolling, card density, readable source/date text, keyboard focus, modal close and long content.
- iPhone: use HTTPS with owner sign-in and import separately; check narrow cards/forms, touch targets, overflow, rotation, file picker/downloads, dialogs and advanced frames. Local Mac loopback is not an iPhone URL.
- After browser restart, confirm saved observations persist; confirm drafts are disposable. Record browser/device and exact URL for failures.

## 7. Feedback tracking

Use one record per issue. Keep screenshot files and private account details outside public issues unless explicitly approved.

```text
ID: V21-###
Type: Bug / usability / missing evidence / enhancement
Feature or screen:
Environment: Mac/iPhone, browser/version, local/HTTPS, exact route
Source version: application SHA + preview SHA when applicable
Steps to reproduce:
Current behavior:
Expected behavior:
Priority: P0 data loss/blocker; P1 core workflow; P2 usability; P3 polish
Screenshots or evidence: before/after, date, relevant source/status
Data impact: saved records / simulation only / none / unknown
Acceptance criteria: observable pass/fail conditions
Status: reported / clarified / approved / implemented / verified
```

ChatGPT should distinguish observed defects from missing game evidence and desired enhancements, ask only for information needed to resolve ambiguity, and retain the original account/simulation boundary. Agree on acceptance criteria before requesting implementation. Do not label a fix verified until its actual test evidence exists.

## 8. Remaining roadmap — planning only

1. Complete Milestone 2 acceptance: rendered import/recovery and hero flows, desktop/mobile review, then approved corrections; improve hero identities, ownership, skills and multiple squads only from evidence.
2. Milestone 3: extend unified resource/building views using actual observations; verify aliases, units and missing building identities before consolidation.
3. Research visuals: use verified prerequisite relationships and real node layouts; preserve existing ledger and formulas; do not infer topology from names/percentages.
4. Sync feasibility: investigate only official authorized exports/APIs. Cross-device sync requires separate authentication, persistence, conflict policy and approval; no such interface is established.
5. Final regression, documented user acceptance and explicit release/merge/deployment approval.

No new milestone, production deployment or merge is started by this handoff.
