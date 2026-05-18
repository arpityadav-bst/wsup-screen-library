# Scratchpad — inline session notes

**Append-only during a session. Processed and emptied during designer-triggered audit pass.**

See `workflow.md` → "DUAL-CADENCE OPERATING MODEL" for the protocol.

**Entry format (one line per correction-resolution turn):**

```
YYYY-MM-DD HH:mm — <component or file changed> — <what changed in 1 line> — Why: <one phrase>
```

**Watch-rules for the next audit pass (kept here as living reminders, NOT processed away):**

- Sibling-surface inheritance failures (any new surface that ships without a precedent grep)
- Token-threshold flags (any raw value spotted at 3+ uses without a token — note here, fix in audit)
- Build-broken catches (anything Vercel/typecheck would fail)
- Designer-explicit corrections vs implicit ones (explicit = decisions.md, implicit = might be taste.md)
- **S35 (refined at S34 second audit)**: Inline rule enumeration applies to ALL edits, including copy strings.
- **S35 — pre-flight for ANY copy edit**: read the surrounding surface (title + body + CTA) as one unit. Do any words repeat across the trio? Is each piece doing a distinct job (state / hint / action)?
- **S36 (refined at S34 THIRD audit)**: Audit pass must run TWO Gate 5 passes — Pass A (touched-surface sync) AND Pass B (codebase-wide grep sweep for stale references to deleted components, renamed entities, amended rules, new codified patterns).
- **S36 from S35 audit** — Gate 2.2 sibling-survey BREADTH: survey ALL siblings, pick dominant pattern. Sample size 1 is inconclusive. Single-sibling sample = widen grep before adopting.
- **S37 from S36 audit** — **Precedent-grep-as-shape-of-answer**: when designer asks an OPEN UX question (*"should X scroll?"*, *"what color should Y be?"*, *"how do other popups handle this?"*, *"did we take reference?"*), FIRST move is precedent grep, not fresh recommendation. Right reply shape: *"BioSheet/SiblingX does Y — match?"* Wrong shape: enumerating three options I'd consider. Captured in workflow.md as a per-response self-check, NOT a periodic forcing function. 5 straight sessions of Gate 2.2 sibling-survey misses (S33/S34/S35-first/S35-second/S36) — codification-fixes-everything has failed. Different intervention shape: shape-of-answer constraint applied per-response.
- **S37 from S36 audit** — When applying a wrap-as-unit (nowrap) to one compound on a surface, scan the REST of the surface for OTHER compounds needing the same treatment. Partial application across the same edit is itself a Gate 8 failure. The S36 example: applied nowrap to `re-read` in timeline body but missed it on `Sun May 24` / `Jun 19` date highlights in popup body — same edit, same surface, partial application.
- **S37 from S36 audit** — Speculative-infrastructure discipline (don't keep dev shortcuts that don't earn their slot) applies in BOTH directions: remove when no use case exists, restore without ego when the use case lands. The `labelClassName` prop on `WindDownOtherApps` went through this cycle in one session — fine, but condense by holding the prop through multi-step iteration if direction is still being debated.

---

## Pending audit entries

_S36 audit pass closed (2026-05-18). All 12 substantive scratchpad rows promoted across decisions.md / taste.md / knowledge-base.md / project-insights.md / workflow.md / evolution.md._

_**Pass A (touched-surface sync) — complete:**_
- _WindDownNoticeSection.tsx mockups synced for sticky-header chrome + recede labels + flanked-divider variants_
- _StateLabel + SubLabel + 7 anatomy entries rewritten_
- _2 stale anatomy entries fixed: date-highlights example updated from "May 29 + June 19" to "Sun May 24 + Jun 19"; compound-terms-wrap entry broadened from "read-only" to "multi-word units"_

_**Pass B (codebase-wide stale-reference sweep) — complete:**_
- _project-insights.md Wind-Down section comprehensively rewritten — phase dates corrected to locked S36 values; surface family table reflects current architecture (no localStorage, BioSheet sibling-inheritance for sticky header, action blocks, single support@wsup.ai)_
- _knowledge-base.md Wind-Down Notice entry updated; 2 new KB entries added (phase-aware orchestrator + long-content popup sticky header)_
- _taste.md historical examples touched up: "May 29 / June 19" updated to current dates; "WindDownTopStrip" + refund@/data@ references flagged as S35-historical with surface-evolution notes_
- _Remaining refund@/data@ / WindDownTopStrip / May 29 references all sit in decisions.md historical S35 audit rows (intentionally preserved as time-capsule); no living-doc stale references remain_

_**Knowledge file freshness check — all 6 files updated 2026-05-18 (S36):**_ knowledge-base ✓ | decisions ✓ | taste ✓ | project-insights ✓ | workflow ✓ | evolution ✓

_**Build verified:** tsc green + next build green. /style-guide 82.4 → 83.9 kB (+1.5 kB for sticky-header mockup chrome + action blocks + updated anatomy entries)._

_**5-straight-session recurring failure mode** (Gate 2.2 sibling-survey miss) — acknowledged honestly in evolution.md. No new forcing function added; new workflow rule is a shape-of-answer constraint applied per-response, not periodic introspection. External-scaffolding-as-intervention pattern confirmed for the 2nd-straight audit._

_Scratchpad clean. Audit closed. Designer's standard "We must fix problems to the best of our knowledge by ourselves" invoked + applied._
