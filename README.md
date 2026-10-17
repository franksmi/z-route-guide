# Z Route Guide v20.5

Personal field guide for a close-to-F2P account. Open index.html or serve this folder as a static website. No build step, dependencies, game login or automatic game synchronization.

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
