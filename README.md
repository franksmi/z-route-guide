# Z Route Guide v20.5

Personal field guide for a close-to-F2P account. Open index.html or serve this folder as a static website. No build step, dependencies, game login or automatic game synchronization.

## T9 Command Dashboard

[Open the interactive Command Dashboard](https://franksmi.github.io/z-route-guide/command-dashboard.html).

`command-dashboard.html` and its small static files in `command-dashboard-assets/` provide three prioritized actions, a conditional seven-day plan, the Base 27 → Camp 1 level 27 → T9 roadmap, funded construction scheduling, resource forecasts, research ROI and editable browser-local account state. Advanced analysis is expandable under four primary destinations.

Use **My Account → Export account JSON** before moving between local files, GitHub Pages or browsers; import the dashboard JSON at the destination. Browser storage does not move with the HTML file. The local downloadable HTML remains self-contained; the hosted copy loads equivalent static scripts. The guide and construction tool retain their compatible legacy formats. Explicit building and immediate-resource edits now synchronize on the same browser origin; use complete workspace export/import to move all saved tools together.

[Dashboard validation report](command-dashboard-validation.md). Unknown timers, balances, unlock thresholds and eligibility remain unverified; no game action or completion is performed automatically.

## Daily use
1. Open Account Tracker and choose a category.
2. Edit current values, evidence source, status and observed date; save each row. Linked upgrade goals complete when the tracked level reaches their target. Lowering a level reopens the goal.
3. Mark non-level tasks complete manually. History records each change; manual completion does not invent new account levels.
4. Export backup regularly. Browser data belongs to the site origin and browser profile; it does not move between devices, local previews, or GitHub Pages automatically. Import the exported JSON at the destination and review the replacement preview first.
5. Use Restore previous save for one-step recovery. Each save retains the displaced state; export before extensive edits. Clearing browser storage also clears these recovery copies.

`seed.js` contains the reviewed baseline. `app.js` keeps one editable account state with tasks and history. Later seed changes never silently overwrite existing saved accounts; import a reviewed backup to replace them. New custom fields and tasks can be added in the page.

All 18 previous sections remain in the Strategy Library with audit notes. `index_v20_4.html` and `index_v20_3.html` preserve original files byte-for-byte. See AUDIT.md for sources and limits. Footage was sampled, not exhaustively transcribed. Missing or unreadable facts remain unknown/inherited.

## Safe publication to franksmi/z-route-guide
Use a review branch and pull request. Upload index.html, app.js, seed.js, style.css, AUDIT.md, README.md and the archived HTML pages to the repository root. Keep any existing files not included here. Do not upload videos, screenshots, browser account exports, or credentials.

Before merging, inspect the changed files and preview the page. Existing GitHub Pages settings should remain unchanged. After merge, verify the Pages deployment succeeded and the public page shows v20.5. Export browser data before changing origin/domain. To roll back the site, revert the PR commit; browser account data is separate and can be restored from JSON backups.

## Master Guide and Sky Fighter update

[Open Sky Fighter](https://franksmi.github.io/z-route-guide/#fighterDashboard). The restored account editor defaults to Building Inventory; all other categories remain editable. Edit action plans and priorities inline. Saved observations are never refreshed from an older bundled audit.

Sky Fighter includes the supplied Lv73 account, six component slots, direct Hero versus converted Fighter comparisons, inventory and three-to-one fusion planning through Lv8, shop/currency tracking, editable provisional priorities, event notes and conditional random-chest acquisition scenarios. Unknown drop rates and Alliance limits are not assigned defaults. Target previews do not complete upgrades.

Use **Backups & recoverable account history** to export the complete workspace, import a reviewed backup or recover one of20 recent versions. Existing per-tool imports/exports remain available. Saved data stays local; publishing does not upload your subsequent browser edits.

[Implementation, sources, uncertainties and validation](master-validation.md). Repeatable checks: `node tests/fighter.test.cjs`, `node tests/workspace.test.cjs`, `node tests/construction.test.cjs`.

## Command Center redesign — pending design approval

The new root homepage is a local review version, not a deployed update. See [REDESIGN-REVIEW.md](REDESIGN-REVIEW.md) for protection, retained features, test evidence, uncertainties and rollback instructions. `legacy-guide.html` retains the original guide; the existing calculation and storage tools remain authoritative. Serve this folder over HTTP to use the embedded same-origin planning tools. Preview account exports are private and excluded from this repository.

## Approved Command Center release

The Command Center redesign was approved on 2026-10-20. The home screen and six categories organize actions, roadmaps and current status. Existing account storage, editors, recovery and advanced planning remain available. See REDESIGN-REVIEW.md for pre-release validation.


## v21 development milestone 1

See [architecture inventory, migration contract, validation and roadmap](V21-MILESTONE-1.md). Development changes belong to `v21-development`; merging and deployment require separate approval. The shared account view retains v20.5 workspace compatibility and fixes construction editor routing and duplicate skill-book display. Run `node --test tests/*.cjs`.
