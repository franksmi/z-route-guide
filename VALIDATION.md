# v20.5 validation

- Browser: tracker camp 21 → 22 moves the goal to completed; reload preserves it; restore previous save returns to 21.
- Browser: invalid schema rejected without replacement; valid file produces preview before import; exported result preserves all 64 fields and 11 tasks plus import history.
- Logic checks: invalid schema, duplicate IDs, dangling task references, nonnumeric/unknown levels, goal completion and reopening, escaped imported text, export round trip, recovery snapshot and quota warning.
- Original v20.3/v20.4 files compared byte-for-byte to local and inspected upstream source.
- All 18 historical sections retained; all ten videos sampled, with selected skill/gear screens reviewed in detail. This does not verify every frame, cost, mechanic or current event.
- Prepared for publication as a review pull request; no live-site change has been made.

- Phone viewport 390 × 844: Action Center and Account Tracker inspected; no horizontal overflow. Desktop preview also opened.
- Git whitespace/error check passed on the prepared review branch.

## Review fixes verified
- Manual completion survives edits to unrelated tracker entries. Changes to the linked level/status still reconcile the goal.
- Storage read/write failures allow in-memory editing with an export reminder; malformed saved data remains protected.
- Imported linked goals require finite numeric targets; null, missing, string and NaN targets are rejected.
- Original functional checks and JavaScript syntax checks pass after these fixes.

- Phone viewport 390 × 844: Action Center and Account Tracker inspected; no horizontal overflow. Desktop preview also opened.
- Git whitespace/error check passed on the prepared review branch.
