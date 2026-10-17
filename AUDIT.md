# Z Route v20.5 evidence audit

All ten local clips were sampled at 12 evenly spaced timestamps per clip; selected detail screens were inspected more closely. This is a section-by-section audit, not a claim of frame-by-frame transcription. Transient or unreadable screens remain unverified. Recorded values describe 17 October 2026, not live game state.

The GitHub HEAD at inspection was `42325e50a21d971add6c83e8298b3f68ab4483d2`; its HTML files matched the supplied local files. Original HTML files are retained byte-for-byte. No recordings or private screenshots are included in this publishing package.

## Recordings
- ScreenRecording_10-17-2026 11.MP4 — 132.1s: Account buffs and research trees.
- ScreenRecording_10-17-2026 12.MP4 — 87.1s: Economy nodes and research overview.
- ScreenRecording_10-17-2026 13.MP4 — 78.9s: Hero ranks and roster; Nora five stars.
- ScreenRecording_10-17-2026 14.MP4 — 34.7s: Core hero gear and roster.
- ScreenRecording_10-17-2026 15.MP4 — 50.9s: Gear and selected skill screens.
- ScreenRecording_10-17-2026 16.MP4 — 87.5s: City buildings and research overview.
- ScreenRecording_10-17-2026 17.MP4 — 74.4s: Multiple battle reports; same-type bonus.
- ScreenRecording_10-17-2026 18.MP4 — 40.3s: Formation, power, world activity and gathering.
- ScreenRecording_10-17-2026 19.MP4 — 75.8s: Inventory, decorations, hospital and drill ground.
- ScreenRecording_10-17-2026 20.MP4 — 72.2s: Hero skill screens and caps.

## Section decisions

### c1: ALive Account Snapshot + Next 10
Replace duplicated account values and Top 10 with the tracker and derived action queue above. Inherited values are labeled separately from footage.

### c2: SSkill Investment — Current Decision Rules
20 @ 0–20s confirms Arnold Shotgun 16/20, Field Support 18/20, Shield 20/20 capped; Monroe auto attack 13/20, Reinforcement 20/20 capped, Scout 11/20. Dirk skills 10/10 capped; Carter shown skills capped. Nora Crossbow 19/30 in 15 @ 38s. Untranscribed ranks remain unknown.

### c3: BFront Line - Battle Evidence
17 contains multiple reports and different opponents. Preserve historical damage totals as examples only; five matching types show +20% HP/ATK/DEF in report 17 @ 18s.

### c4: HHero Release Watch - Season 1
Vince is acquired (14 @ 29s). Lucian acquisition and Monument mappings are not confirmed by these recordings; retain release dates as historical planning.

### c5: RResource Routing — Base 23 / T8 / Lucian
Gear and resource state now lives in the tracker. Loose balances in 19 exclude packs. Dirk Vest 10 is visible in 14/15. Carter Scope 13 is inherited pending exact gear verification.

### c6: GMaster Priority Menu - Combat + Research
Historical priority menu has obsolete completed gear and skill targets. Use Action Center; this entire menu is retained for context only.

### c7: DMaster Priority Menu - Decorations + Economy
Reference economics and decoration policy remain conditional. Record actual next-node costs; no measured payback demonstrated by these clips.

### c8: $Shops + Events + Decision Rules
Recordings do not establish all shop prices or current event scoring. Verify in-game before spending; keep passive shop guidance here.

### c9: CBase 20–30 Timeline
16/19 show selected city buildings; they do not prove a complete city inventory. Tracker records visible levels without inferring every building.

### c10: CBase-by-Base Build Playbook
Base rush and T8 path remain conditional. 16 shows Camp 21 upgrade underway; exact T8 prerequisite panel not established.

### c11: CBuilding Policy - Every Major Category
Preserve building policy as strategy. Upgrade prerequisites must come from the current in-game panel.

### c12: VAlliance Ambush - Operational Playbook
18 shows world activity; it does not validate every ambush timing/reward claim. Keep as reference.

### c13: VAlliance Competition / VS - Execution Calendar
No complete current scoring calendar in these recordings. Treat day mappings as historical and verify current event UI.

### c14: DDecoration Strategy - Level 3 Foundation
19 shows Falcon 3 and decoration gallery. Existing level-3 strategy is a recommendation, not a verified optimum. Individual bonus/cost comparisons remain open.

### c15: TBase + Research - Updated Planning Notes
Replace stale Squad I 89% / Super Soldiers 3% with recorded 96% / 7% (12 @ 43.5s). Tree percentage cannot establish specific node ranks.

### c16: TEconomy Research - Verified Tree Detail
12 shows Quick Construction III 2/5. Full deeper-node effect tables remain inherited; do not reinterpret building speed or cost labels without node details.

### c17: TResearch Queue — Current Authoritative Order
Retire this competing authoritative queue. Gathering target and node priorities are conditional on current tracker and verified unlock needs.

### c18: +Battlefield Medic + Economy Decision Rules
Medic casualty wording remains unresolved. Preserve the literal historical wording; place verification before any spending recommendation.

## Living data
`seed.js` is the versioned baseline. The browser stores one editable state containing fields, tasks and dated history. No separate editable copies of current values are kept in strategy sections. Export contains the entire state, including evidence and history. Import validates then previews changes before replacement and creates a recovery snapshot. Restore previous save swaps states and preserves the displaced state for recovery. Storage failure is surfaced visibly. Legacy v20.4 checkmarks are migrated once; no completion dates are fabricated. New completed goals reopen if their linked tracker level falls below target.
