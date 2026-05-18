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
- **S36 NEW from S35 audit** — Gate 2.2 sibling-survey BREADTH: survey ALL siblings, pick dominant pattern. Sample size 1 is inconclusive. Single-sibling sample = widen grep before adopting.
- **S36 NEW from S35 audit** — Pre-audit trigger: if 5+ scratchpad rows accumulate AND no audit has been triggered this session, trigger one VOLUNTARILY. Don't wait for the meta-question. The asking IS the failure (codified Gate 6 hard-fail).
- **S36 NEW from S35 audit** — Pre-flight rule enumeration applies to EVERY edit including: copy tweaks, eyebrow adds/drops, body lines, CTA orientation, viewport-aware decisions. Knowledge ≠ habit; codification ≠ application. Cite the rule in the scratchpad row inline at edit time.
- **S36 NEW from S35 SECOND audit (2026-05-18 second hard-fail same session)** — TWO audit-trigger forcing-function failures in ONE session. The "5+ rows triggers voluntary audit" rule I just promoted didn't fire in the second half of the same session. Codification of THAT rule didn't fix the gap. **The pattern of recurring failure has now persisted across S33/S34/S35-first AND has fired twice in a single session.** This needs a different intervention shape — not another forcing function. Possible next-experiment: a mid-session "is this an audit-trigger moment?" CHECK that runs after every batch of N edits, not "remember to trigger when conditions met." Or: external scaffolding (e.g. designer-side meta-question becomes a planned periodic check, not an exception).
- **S36 NEW from S35 SECOND audit** — When a designer pivots a just-codified rule's fundamental behavior MORE THAN ONCE within the same session, the rule framing was probably too specific. Lift the abstraction (here: from "single-exposure" → "cadence-as-parameter") so it survives the next pivot. Codified inline in taste.md "Forced per-visit acknowledgment" rule's revision history.

---

## Pending audit entries

_S35 THIRD audit pass closed (2026-05-18). Designer triggered Gate 6 meta-question for the THIRD time today, this time quoting the codified standard "We must fix problems to the best of our knowledge by ourselves." Designer specifically named the 3 health gates: tokenized + componentized + in style guide for EVERY little thing from today's session. Audit identified + fixed 2 real misses:_
- _**Gate 3 miss:** entire "Other apps to try" section was duplicated identically in 2 popups (flanked-label divider + side-by-side AppLinkButtons + same URLs). **Extracted `WindDownOtherApps.tsx`** in shared/, co-located Polybuzz + Talkie URLs there. Both popups now use 1-line imports._
- _**Gate 5 miss:** `AppLinkButton` was created today but lived only in the patterns-tab WindDownNoticeSection — NO ComponentsTab section, NOT in NAV.Components. Codified Gate 5 rule explicitly says new primitives need standalone section file + ComponentsTab import + NAV registration. **Created `AppLinkButtonSection.tsx`** with live examples + side-by-side pairing demo + 9-entry anatomy table. Registered in ComponentsTab + NAV.Components._

_Gate 1 verdict: clean for today's contributions (all arbitrary values are structural one-offs or opacity-modifiers). Pre-existing token-debt on maxWidth string-props (440/520 used 5/11× across codebase) flagged for future audit._

_WindDownNoticeSection anatomy table updated to reflect the new extraction + cross-reference the dedicated AppLinkButton ComponentsTab section._

_Build green: tsc + next build clean. /style-guide bundle 80.9 → 82.4 kB (+1.5 kB for new section)._

_**TRIPLE within-session Gate 6 hard-fail.** Same recurring failure mode. Both the "trigger audit voluntarily at 5+ rows" rule (S35-first audit) AND the post-edit gate-sweep discipline failed to fire. Designer named the three gates explicitly to bypass my forcing-function gap. This is a different intervention shape working — external scaffolding (designer-named checklist) firing where internal triggers don't. Worth noting in evolution.md as an experiment-confirmed pattern._

_Empty — S35 SECOND audit pass closed (2026-05-18). 6 substantive scratchpad rows from the post-first-audit work promoted:_
- _AppCard → AppLinkButton refactor → taste.md "External off-ramp surfaces are buttons" rule_
- _Other apps section moved to bottom with flanked-label divider → taste.md "Flanked-label divider" rule_
- _Side-by-side Polybuzz + Talkie → taste.md "Side-by-side off-ramp options" rule_
- _Read full update link under body (info group) → taste.md "Tertiary info-links belong in the info group" rule_
- _May 29/June 19 subtler highlights → taste.md "Inline date / value highlights — subtitle, no font-weight bump" rule_
- _/explore-scoped every-load + no localStorage → updated taste.md "Forced per-visit acknowledgment" rule (3rd revision of the day, lifted to cadence-as-parameter abstraction)_

_Gate 5 ran both passes:_
- _Pass A — touched-surface sync: WindDownNoticeSection style guide updated for AppLinkButton (32px not 48px), CTA reorder, every-load behavior, flanked divider, side-by-side apps, subtitle highlights; stale anatomy entries replaced + 2 new entries added (CTA order, date highlights)._
- _Pass B — codebase-wide stale-reference sweep: clean. No AppCard / WindDownTopStrip / wsup:winddown-popup-seen / wsup:winddown-popup-closed / wsup:winddown-strip-dismissed / --winddown-strip-height / placeholder URL / text-text-title font-medium for May/June references remaining. Project-insights.md StreakClaimPopup entry updated to reflect wind-down-phase removal._

_2 stale code comments fixed in audit: WindDownPopup.tsx line 22 (localStorage-permanent text removed); WindDownDetailsPopup.tsx line 18 (top-strip reference removed)._

_Build verified (tsc green + next build green; /explore 14.9 → 13.7 kB after StreakClaimPopup removal; /style-guide 81.1 → 80.9 kB). Scratchpad clean. Designer triggered the Gate 6 meta-question TWICE in this session — both hard fails acknowledged; recurring failure mode entry added to evolution.md as DOUBLE within-session pattern._
