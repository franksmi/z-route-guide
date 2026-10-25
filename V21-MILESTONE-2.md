# Milestone 2 — Hero Command Center

Implemented on v21-development from f43b339. The existing Heroes & Gear category now joins the saved roster with levels, stars, full skill descriptions (including locked and untranscribed details), equipped gear, source notes, dates and formation. Existing editors, targets, raw observations and advanced tools remain available, using the existing CSS components.

Evidence labels distinguish saved game-screen records, player reports, unverified/inherited records and missing values. Confirmed records are historical observations, not live game verification. No hero catalog, combat stats, skill effects, costs or ownership is invented. Discovery currently recognizes the established Level/Stars/Skills/Helmet/Vest/Rifle/Scope field suffixes; other observations remain available in the original observations section.

Squad 1 and gear what-if plans are disposable in-memory copies. Squad changes replace an occupied draft position and remove a hero's previous draft position. Gear changes swap a destination's recorded item of the same slot. Plans never write local storage, update history, or apply assignments. Reset discards the plan; changing the underlying observed roster clears it. No eligibility or combat outcome is claimed.

## Verification

Ran node --test tests/*.cjs with ZR_WORKSPACE_FILE pointing to the previously validated private workspace-4 copy. All 19 runner entries passed (the existing legacy test files contain additional internal assertions). Seven new hero cases cover roster joins, missing evidence, assignment uniqueness, gear swaps, invalid requests and repeated private-backup simulations and page rendering/draft invalidation in an isolated harness. Existing workspace import/preview/conflict/recovery harness checks also pass. Private backup JSON is not committed.

## Rendered browser limits and remaining gaps

Attempted rendered verification first. Local HTTP serving was denied by the execution sandbox (socket bind Operation not permitted). The in-app browser rejected local file navigation under its URL security policy; no workaround was attempted. Thus import preview, conflict display, recovery dialogs, responsive layout and new simulation controls still require real rendered-browser acceptance. Automated harness verification does not replace that check.

Workspace-4 contains five roster heroes, five skill observations, ten gear observations, Nora's stars and one text formation. Other hero stars, complete transcriptions of some skills, other squad placements, missing gear slots, gear compatibility and live costs remain unverified. The formation parser only interprets explicit Front/rear lists joined by plus signs; original text stays visible. No predicted battle power is supplied without verified formulas.

No merge or deployment. main and v20.5-stable are not updated.
