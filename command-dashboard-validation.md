# Z Route Action Center — validation report

Updated October 20, 2026. Deliverable: **command-dashboard.html**, a self-contained offline dashboard.

## What changed

The opening screen now has at most three state-derived recommendations. Each states the action, reason, timing, estimated invoice/workload, and next consequence. The four primary destinations are **Command**, **T9 Roadmap**, **Resources & ROI**, and **My Account**. Detailed charts, scheduling, production, staging, VS holds, the research ledger and source audit remain available in expandable panels.

The default first action is to confirm Hospital 1 level 19→20; it remains selected, not started. Warrior 23→24 appears conditionally after the recorded 22→23 upgrade. Research is not recommended until the missing evidence is supplied.

A conditional seven-day plan identifies known finishes, proposed next queue uses, protected resources, research/VS considerations and supported Tier 2 opportunities. Unknown timers never become invented dates. Timer entries are remaining-hour snapshots, not automatically elapsed live clocks.

Resources distinguish immediately available stock from unopened boxes when supplied. Boxes do not fund starts. Reserves reduce spendable funding. Resource priorities account for known net income; funding-pace estimates are not construction ETAs. Unlimited-funding charts explicitly label negative balances as hypothetical and cannot override the funded Action Center or seven-day plan.

Research shortlists compare the modeled construction-speed, research-speed and production candidates within an explicit objective; the full **153-technology dataset** remains editable. Verification, slot/hold review, invoice, bonuses, funding, strategic value and VS timing determine **Do Now / Hold for VS / Later / Insufficient Data**. Verified production can outrank construction research. Held completions never auto-claim.

## Preserved account and route

Default: Base 24; Alpha 23→24 running; Warrior 22→23 running; Hospital 1 level 19 selected for 20; Camp 1 level 24; Defense Line 22. Remaining active timers are unknown. Camps 2–4 retain T7/T6/T5 staging goals with unknown levels/thresholds.

The route remains **Base 27 → Soldier Training Camp 1 level 27 → T9**, as specified by the user. Warrior 24 remains an earlier Base 25 prerequisite. No troop access, training, completion or live eligibility is fabricated.

The 19 future building invoices still total approximately **3,532.448M Food / 3,222.300M Metal / 1,167.334M Oil** after the estimated 5.5% discount. Against the combined inventory snapshot, estimated gaps remain **1,962.448M Food / 1,542.300M Metal**, with **2.666M Oil** before reserves. Immediately spendable amounts remain unverified until separated from boxes.

## Verification

**37 functional checks passed**, plus JavaScript syntax validation. Tests execute the actual embedded code, covering the following alongside actual-browser checks:

| Area | Result |
|---|---|
| Navigation and mobile readability | All four screens work by pointer; tab arrow-key navigation works. No page overflow at tested 320px and 390px widths. Desktop checked at 1440px. |
| Opening recommendation | Exactly three cards in the supplied snapshot. At 390×844, the first card and Update button fit within the opening screen. |
| Dynamic progress | Timer edits changed the seven-day plan. Hospital completion changed the next recommendation to 20→21. |
| Starts, persistence and completion | Start deducted the invoice once; save/reload retained it; completion raised the effective level without a second charge. |
| Resource separation | A test with 500M available Food, 1,000M boxes and a 100M reserve produced a 3,132.4M funding gap; boxes stayed excluded. |
| Research decisions | A fully verified, funded positive-value candidate became Do Now; missing invoice evidence prevented it. Below-break-even RE became Later; a future VS window caused Hold for VS. |
| Claimed effects | QC 2→3 changed modeled building speed to 21.35%. Master Builder changes updated discounts and route costs. Changing a level cleared stale next-target and invoice evidence. |
| Import/export | Actual downloaded JSON round-tripped through the browser file chooser. Previous schema 3 migrated; schema 1/2 compatibility passed functional tests. Invalid imports left state unchanged. |
| Tier 2 scheduling | One QA staging upgrade fitted a genuine gap: 21 existing required/active rows remained unchanged while total modeled jobs rose to 22. Removing verification removed the proposal. |
| Final build | Fresh browser load logged no page errors. QA fixtures were replaced with the supplied snapshot. |

Schema 4 preserves existing account facts and adds liquidity, invoice-verification and research-decision fields as unknown/unreviewed when migrating. Every accepted edit reruns dependent decisions, route costs, scheduling, forecasts and ROI.

## Visual evidence and limits

Desktop and phone screenshots were inspected during validation and retained with the downloadable local deliverable.

Real-browser tests used the in-app Chromium browser over local HTTP. Direct file-origin storage can vary by browser; JSON export/import provides portable backup. No game tooltip or live server state was independently verified. The scheduler remains a priority list model, not a guaranteed optimal ETA. Flat discounts, unknown extra currencies and costs outside the modeled route remain explicit limitations in the advanced audit. Production examples remain separate from account data.
