# Command Center redesign — design review only

Prepared for review on 20 October 2026. **Not deployed.** The live website remains at commit `59439609528815fd0a3d9c8b3116a2b1f0b36a80`.

## Audit and protection

The current repository, live account interface, `master-validation.md`, `command-dashboard-validation.md`, and all regression suites were reviewed. The source rollback is `Before-redesign-rollback.zip`; the exact live parent commit remains available in Git. A private browser workspace export was kept outside the source repository and preview server directory. No account export or QA fixture is included in the downloadable source package.

The available live browser export contained the existing guide account only. It had117 fields,11 plans and8 history entries. The preview imported that protected copy through the existing validated transfer flow. Following testing, the same observations were restored and exported again: parsed guide state matched the protected account **exactly**, including all fields, plans, history and timestamps. The construction model starts from its unchanged reported baseline when no saved construction state exists; Fighter likewise retains its reported baseline. The local preview's Missile target8 follows the new brief and does not change its equipped level6 or the live browser account.

The redesign does not refresh saved accounts from seed data. Existing storage keys and schemas are unchanged. Live browser storage and local-preview storage are separate origins; preview edits do not update the live account. Preview recovery entries may include isolated QA versions, while the protected guide observation history is retained exactly.

## New experience

- Home answers the four questions: three next moves, next milestones, blockers, and deliberate reserves/holds.
- Six categories use Next Actions → Roadmap → Current Status: Construction; Research; Sky Fighter; Heroes & Gear; Soldiers & Training; Events & Resources.
- Actions explain the specific task, strategic reason, missing requirements, acquisition route and timing. An unverified research candidate remains a review task rather than a start recommendation.
- Direct category editors cover building levels/running targets, resources and reserves, timers, research nodes, components, Fighter status, heroes/gear, troop counts, capacity, speedups and event notes. New observations become reported entries; missing fields stay “Update Needed”.
- Mobile home has a compact three-priority list above the detailed cards. Desktop uses a sidebar; phone navigation scrolls horizontally within its own row.
- Charcoal/olive surfaces, restrained gold, category icons, authentic client building/component/Fighter artwork, route nodes, duplicate coverage meters and a resource comparison chart support decisions.
- Source-derived invoice estimates and Fighter comparisons are labelled. Claimed/recorded levels remain separate from running or held targets. No preview performs a game action.

## Retained capabilities

The original guide is retained as `legacy-guide.html`. All18 Strategy Library sections are preserved byte for byte. Research and building datasets, original Fighter model/data, seeds, source validation, import/export, history,20-version recovery, cross-page synchronization and source notes remain available.

The existing construction/research tool remains `command-dashboard.html`. It supplies the corrected Base27 → Camp1 Lv27 → T9 route, gatekeepers, three queues, exact client invoices, funded scheduling, resource forecasts, research ROI, production payback, prerequisite checks and held-completion tracking. There is no replacement calculation engine. Small validated adapters expose existing state and actions to the new interface; existing tools remain usable under Advanced Planning.

The full153-node ledger opens directly from Research. Full eight-level component inventory, fusion workbench, random-chest scenarios, currency invoices and Fighter status remain in the retained Fighter tools. Hero skills, manual plans, all other account categories and prior guides remain accessible. The lower-tier VS promotion strategy remains explicit; the tool never promotes every troop to T8 automatically.

The new workspace export includes all three in-memory/saved tools and downloads from the main page. This avoids a hidden-frame download issue found during browser QA. Import continues to validate each included tool and preview replacement before applying it. Recovery saves remain local and are labelled; no recovery deletes a game account or performs a claim.

## Verification

**97 automated checks passed:**20 Command Center decisions,37 construction/ROI/forecast checks,26 Fighter/fusion/acquisition checks,14 workspace and recovery checks. Run:

```
node tests/center.test.cjs
node tests/construction.test.cjs
node tests/fighter.test.cjs
node tests/workspace.test.cjs
```

Actual-browser tests verified:

- Hospital19→20 changed the next recommendation to20→21 and refreshed its invoice; reload retained the edit. The review snapshot was restored afterward.
- Reaching Dirk Vest20 removed that pending gear action; lowering it restored the action.
- Research claimed-level edits updated displayed progress using the existing model; previews did not claim running/held targets.
- Missile target8 saved while equipped level stayed6. Material readiness and the underlying account remain separate.
- A missing troop-count entry accepted an explicit number and became visible; no troop was promoted.
- Original workspace import validated; complete three-tool export downloaded; exported data passed validation and replacement on re-import.
- Restoring a previous version recovered its prior entry. The browser automation briefly timed out during the recovery frame reload; direct page inspection confirmed the completed restore.
- All seven main views fit390px and320px without page-wide horizontal overflow. Desktop1280px, phone390×844 and320×800 were reviewed. Wide retained legacy tables keep their own scroll areas.
- Home, Construction, Sky Fighter and mobile screenshots were inspected. Final fresh browser inspection reported no application console errors.

The first automated browser attachment reported an injected MutationObserver error, but no project source uses MutationObserver. It did not recur in the final fresh inspection. A download wait also timed out before the main-page export fix; subsequent download and validated import succeeded.

## Remaining uncertainty

No live game API is connected. The account is a last-reported record. Old/inherited observations are flagged for review; the existing troop-tier entry carries an older observed date despite a newer source note, and that inconsistency is not silently rewritten.

Alliance chest purchase limits, random drop probabilities, unknown live invoices, true event scoring rules, unentered balances, troop counts, capacity and speedups remain unknown. Three-to-one fusion and Fighter conversion rules remain conditional on live game verification. The139,000/60,000 reported component requirements retain the original warning that these numbers also occur in client power fields. No eligibility, completion date, completed upgrade or owned item is invented.

## Approval and rollback

Review the local preview at `http://127.0.0.1:8777/`. Source is ready for review; **no branch has been pushed and no deployment has been requested**. Publishing requires the user's design approval, as explicitly requested in the brief. After approval, recheck remote state and publish through a review branch/PR; keep existing Pages settings.

The prior source can be restored from commit5943960 or the rollback ZIP. Browser account data has its separate private export and local recovery history. The preview can remain open for review; its static server is retained intentionally. To reopen the source package later, serve its folder with a static HTTP server (for example `python3 -m http.server 8777 --bind 127.0.0.1`); file URLs do not reliably support same-origin embedded planning tools.

## Publication approval

The user approved this design and requested publication on 2026-10-20. The review-only header was replaced with the production Command Center header; publishing retains the existing GitHub Pages settings. The earlier review-only statements above describe the pre-approval checkpoint.
