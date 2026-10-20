# Master Guide implementation and validation — 20 October 2026

## What changed

The master guide's original editing code still existed. Its default category was “Base & buildings”, while the audited building rows had moved to “Building Inventory”. The default now shows editable building rows. Resources and all other categories remain editable. Action titles, rationale, linked targets and priority are editable; building rows also record running status separately from confirmed level.

Saved accounts retain their existing observations, including same-day edits. The former audit migration could overwrite observations with the bundled 20 October snapshot; it now adds missing entries only. New accounts use the supplied Base24, Camp1 24/T8, Alpha23→24 and Warrior22→23 running, Hospital1 19, Defense22 snapshot. Existing accounts are offered a review of that snapshot without automatic replacement.

Explicit building and immediate-resource edits synchronize between the master guide and construction dashboard on the same browser origin. A tool not yet opened receives pending explicit changes on first use. Seeds are not bulk-synchronized. Unknown resource boxes remain unknown, and old combined estimates are retained until a full breakdown is supplied. Other account categories remain in the master guide; research state and forecasts remain in the construction tool. All 18 historical Strategy Library sections are unchanged byte for byte.

Each saved edit retains a recovery snapshot, up to 20 versions across the three tools. Complete workspace export/import validates each included tool and previews replacement. Legacy tool exports remain supported by their original tool. Raw recovery export preserves unreadable stored values. Storage failures are displayed; browser data does not automatically move between local origins, devices or browsers.

## Sky Fighter data and calculations

The supplied level73, approximate power2,014,499, stats, conversion percentages, displayed Hero conversions, Inferno Missile3 stars and Lv90 milestone are retained. All six supplied component levels, bonuses, matching-copy displays and reported requirements are included. Target previews never change actual equipped levels. Manual upgrade recording requires explicit confirmation, two entered spare copies at the current level, reviewed inventory, a confirmed recipe, a confirmed invoice and sufficient recorded currency. Bag fusion and chest-result recording are separate explicit actions.

Component comparisons use a pinned subset of [JeffxLabs fighter.json](https://github.com/JeffxLabs/zrouteredemption/blob/52e32f60ad85564b0dcf7c060b054054d2186bf3/data/fighter.json), client v1.30.07, catalog P1_V202609071132. The [source extraction notes](https://github.com/JeffxLabs/zrouteredemption/blob/52e32f60ad85564b0dcf7c060b054054d2186bf3/docs/fighter-planner.md) explain the mechanics. Source values are externally derived; they are not live-server verification.

The six supplied component bonuses match those rows. Examples: Missile6→7 gives direct Hero ATK+2,500 and Hero Damage+1 percentage point; Battery5→6 gives Fighter ATK+2,450, modeled converted Hero ATK+367.5 at the entered15%; Engine6→7 gives direct Hero HP+101,000. Direct Hero effects are not multiplied by Fighter conversion coefficients. Percentage effects are not converted to flat damage or an unproved combat ROI score.

The client recipe uses three identical copies through Lv8, retaining the equipped ingredient; Lv8+ uses XP and is outside this planner. By default, the supplied “1/3” means one equipped and no spare, “2/3” means one equipped and one spare. This interpretation is labelled and editable, and inventory requires review. Missile6→7 requires two spare Lv6 copies:486 L1 equivalents or54 L3 equivalents. Missile6→8 needs eight additional Lv6 copies before bag stock. Higher-level items are never assumed dismantlable. Equivalents are quantities, not dates or interchangeable component types.

The user reported139,000 /60,000 as upgrade currency requirements. These values also occur in the client's component **power** fields at Lv6 /Lv5. They remain preserved as reported requirements, with currency identity and live invoice confirmation pending. No costs for unobserved levels are invented. Reported budget subtotals are conditional L1-synthesis scenarios; actual Lv3 chest arrivals can avoid lower fusions.

## Acquisition model and limits

Verified player-supplied sources: Trial random Lv3 chest costs200 medals, three funded purchases weekly; Alliance random Lv1 chest costs1,000 coins, income at least20,000/day. Neither is selectable. Current balances, Alliance purchase cap and all six drop rates start unknown. The explicit equal-odds button is a hypothetical scenario, not evidence. One probability vector is used for both shops, clearly labelled as a scenario assumption.

Acquisition estimates require probabilities totalling100%, a scenario purchase cap and confirmation of the fusion rule. They use192 seeded independent trials per target over730 days, daily Alliance income/purchases and weekly Trial batches at the entered next delivery day. Reservations apply to starting Alliance Coins and recurring income. Blank starting coins mean zero in the scenario; that is labelled. The verified ability to fund three weekly Trial chests supplies those recurring batches; no unspecified medal-income rate or extra current-balance purchases are inferred. Recorded purchase counts use local calendar day/week; actual game reset boundaries remain unknown.

Mean and10th/90th percentiles are estimates, not guarantees. If trials exceed the horizon, the full mean is withheld instead of reporting a biased mean from only completed trials. Estimates are acquisition-only; unknown upgrade-currency income, recipe costs and unreviewed bag stock prevent a guaranteed completion date. Individual-target dates cannot be summed as though every type received the entire shop stream. Provisional priorities can change with inventory readiness, manual rank and recorded battle performance; they are not proven optimal ROI rankings. Alliance speedup reservations stay separate from T9 Food/Metal/Oil reserves. Fighter VS scoring triggers remain unknown and require live verification.

## Verification

- 37 existing construction checks passed: T9 endpoint, invoice totals, dependencies, three queues, funding, research ROI, resource forecasts, held completions, migrations and imports.
- 26 Fighter checks passed: exact snapshot, marginal bonuses, conversions, duplicate arithmetic, inventory offsets, missing evidence, probability validation, deterministic delivery cases, seeded reproducibility, censoring and malformed input. A stochastic single-source case agrees with the negative-binomial mean within the test tolerance.
- 12 workspace checks passed:20-version recovery retention, forward/reverse synchronization, pending edits, untouched-field preservation, unknown-box handling, export, schema validation and same-day audit safety.
- Actual browser checks:59 editable building rows rendered; Base edit survived reload; Hospital edits synchronized in both directions and updated the construction view; Fighter inventory/scenario edits persisted and propagated between tabs; random acquisition cards and spending chart rendered; complete three-tool export downloaded, validated and imported through the replacement preview. No page errors in final checked views.
- Desktop1280px and phone390px/320px reviewed. A mobile editor overflow was corrected; both guide and construction pages fit320px without page-wide overflow. Wide inventory tables use their own horizontal scroll area.

Run locally with Node.js: `node tests/fighter.test.cjs`, `node tests/workspace.test.cjs`, `node tests/construction.test.cjs`. Serve the repository with any static HTTP server for browser checks. Test scenarios are not published as account data.
