# Visual Designer — Evolution
Last updated: 2026-05-18 (S36 audit pass — 5-session recurring failure mode confirmed; 4 within-session Gate 2.2 sibling-survey misses; external-scaffolding-as-intervention pattern confirmed; new precedent-grep-as-shape-of-answer workflow rule)

---

## Phase 5 → 6 trigger streak status (2026-05-18, S36 audit — 5th-straight-session recurring failure mode)

**Streak: still BROKEN, now across 5 sessions.** Today's S36 work surfaced FOUR sibling-survey misses, each requiring designer-named meta-question to trigger the correct response:

1. **WindDownDetailsPopup sticky header** — built custom h2 + custom CloseButton; designer pointed at BioSheet's primitive `title` prop. Should have grepped first.
2. **Label brightness `text-text-dim` recede** — defaulted to label-xs's native 60%; designer asked "did we take reference from their?" — explicit precedent-grep frame; 20+ `label-xs` usages in WSUP already covered the convention.
3. **Earlier in session: open UX question about scroll behavior** — proposed 3 options when BioSheet already had the answer.
4. **Over-application of flanked-divider drop** — designer specifically said "in wind down detailed popup" but I dropped from both via shared component; should have asked for scope clarification before applying.

**External scaffolding confirmed for the 2nd straight audit:** the designer's question shape *"how do other popups handle it? did we take reference from their?"* is the trigger that fires the precedent grep when my internal trigger doesn't. This is the same pattern as S35's "tokenized + componentized + in style guide" naming — when the designer explicitly NAMES the discipline, I apply it. When they don't, I default to fresh design calls. **The shape of the question IS the intervention.**

**Honest conclusion at S36 close:** I'm not going to fix this by adding more forcing functions. The S35 voluntary-audit-at-5+-rows function failed within the same session. The S36 precedent-grep workflow rule (just promoted) is a SHAPE-OF-ANSWER constraint — different intervention shape, per-response self-check — not a periodic forcing function. If it fails at S37, the conclusion will be: the discipline is the designer's question — design for that, optimize the audit-on-trigger experience, don't pretend self-trigger will fire.

---

## Phase 5 → 6 trigger streak status (2026-05-18, S35 SECOND audit — DOUBLE within-session hard-fail)

**Streak: still BROKEN — and now demonstrably worse.** Designer asked the Gate 6 meta-question TWICE in this session. The first time was at the end of the build-phase work (already a hard-fail per codified rule); I ran the first audit pass, closed it cleanly, and promoted the S36 "trigger audit voluntarily when 5+ scratchpad rows accumulate" forcing function. Then the designer iterated on the popup substantially (strip removed, popup parallel-mounted, CTAs reordered, content rewritten, AppCard→AppLinkButton, side-by-side apps, flanked divider, /explore-scoping, etc. — 12+ correction-resolution cycles). I did NOT trigger a voluntary audit. Designer asked the meta-question AGAIN. Same hard-fail. **The forcing function I codified to fix this failure mode failed within the same session it was codified in.**

**Honest naming (S35 second audit):** the pattern isn't just "rules read at bootstrap, not applied inline at edit time" anymore. It's now also "rules promoted at audit, not applied in the post-audit work of the same session." The decay window is shorter than I thought. The S36 forcing function language ("trigger voluntarily when 5+ rows accumulate") presupposes that I'm CHECKING the scratchpad row count between edits — which I'm not. The rule lives in workflow.md; my edit-time process doesn't include a row-count check.

**What this rules out:** adding more forcing functions to workflow.md does NOT fix this gap. S32 added scratchpad cadence; S33 added KB cross-check; S34 added Gate 5 dual-pass; S35-first added sibling-survey-breadth + audit-trigger habit + edit-time rule citation. All codified. None fired reliably in the second half of S35.

**What might work — different intervention shapes to try in S36:**
1. **Periodic check, not condition-triggered.** Instead of "trigger audit when 5+ rows accumulate," try "every Nth edit batch, run a 30-second 'should I audit now?' check." Time-based, not condition-based. The condition-based version requires me to remember to check the condition.
2. **External scaffolding via the designer's existing rhythm.** The designer already triggers the meta-question — it's clearly part of their working rhythm. Lean into it. Stop pretending the audit will fire "voluntarily" and instead optimize the audit-on-trigger experience.
3. **Pre-edit prompt rather than post-edit forcing function.** Forcing functions kick in after edits land; a pre-edit prompt would surface "what rule does this touch?" BEFORE I commit. Different cognitive moment.

These are EXPERIMENTS, not codified rules. The codified-rules-fix-everything model has failed across S33/S34/S35.

**Recent count history:** S22=3, S23=18, S24=0, S25=1, S26=8, S27~7, **S28=0**, S29=14, **S30~10-12**, **S31~15-20**, **S32 main=0**, **S32 f1=7**, **S32 f2=0**, **S32 f3~12**, **S33 morning=~3**, **S33 afternoon=~13**, **S33 total ~16**, **S34=~11**, **S35-first=~12-14, S35-second(post-audit)=~10 additional iterations + audit-not-triggered hard-fail**.

Phase 5→6 counter: 0 consecutive 0-catch sessions. **Trajectory continues to decline.** Within-session double-hard-fail is a new low for this pattern.

---

## S35 second audit — what got promoted

**5 new taste rules:**
1. *External off-ramp surfaces are buttons, not static cards* — AppLinkButton chrome with external-link icon
2. *Flanked-label divider* — section header sits between two horizontal lines
3. *Side-by-side off-ramp options when both are co-equal alternatives* — flex-1 min-w-0 pairing
4. *Tertiary info-links belong in the info group, not the action group* — link between body and CTA
5. *Inline date / value highlights — text-text-subtitle, no font-weight bump* — subtle anchor emphasis

**1 rule re-revision (3rd revision of the day):**
- *Forced acknowledgment for product-state announcements* — lifted from "single-exposure" → "cadence-as-parameter" abstraction so it survives future pivots. Revision history captured inline.

**1 KB entry re-revision:**
- *Wind-Down Notice system* — updated to reflect AppLinkButton primitive + per-visit cadence + flanked divider + side-by-side apps.

**1 project-insights update:**
- StreakClaimPopup surface inventory entry — marked HIDDEN during wind-down phase with strikethrough.

**Gate 5 dual-pass:** Pass A synced WindDownNoticeSection (5 anatomy entry updates + 2 new entries); Pass B grep-clean.

**2 stale code comments fixed during audit:** WindDownPopup component-comment block (localStorage-permanent reference removed); WindDownDetailsPopup component-comment block (top-strip reference removed).

---

## Phase 5 → 6 trigger streak status (2026-05-18, S35 FIRST audit pass)

**Streak: still BROKEN.** Designer asked the Gate 6 meta-question AGAIN at end-of-session ("EVERYTHING OKAY... is VDA learning everything according to its purpose now?"). Per codified rule, the asking IS the failure signal. This is the same hard-fail trigger that fired at S33 + S34. Three straight sessions of the same gap: VDA reads rules at bootstrap, doesn't trigger audits proactively.

**S35 catch breakdown (~12-14 designer-flagged corrections):**

| # | Catch | Pre-existing rule | Where it lived | Why I missed it |
|---|---|---|---|---|
| 1 | CloseButton position inconsistent (top-xs vs WSUP majority top-s) | Gate 2.2 sibling-inheritance | knowledge-base.md (CloseButton section) | Surveyed only 1 sibling (StreakClaim minority), pattern-matched on the first hit — sample size 1 is not a precedent |
| 2 | "read-only" hyphenated wrap broke at hyphen | Implicit from existing "Fix the wrap constraint, not the copy" | taste.md line 51 | No specific rule for hyphenated compounds yet — codified today |
| 3 | Mobile strip layout broken (flex-wrap behavior) | Gate 8 visual verification + Gate 8.4 spacing-content-fit | QUALITY-GATES.md | Playwright self-screenshot caught initial; then flex-wrap "fix" introduced new break designer caught |
| 4 | Eyebrow "Important update" redundant with title + chrome | Existing eyebrow rule (line 23) needed scope clarification | taste.md line 23 | Added eyebrow without checking if chrome+title already signaled category — scope clause now amended |
| 5 | Body line "Refunds and data export are open now." redundant with CTAs | No explicit rule yet | (codified today as "Don't say what the chrome already says") | Read body in isolation, not as part of title+body+CTA unit |
| 6 | Desktop details popup CTAs over-stretched stacked | No explicit rule yet | (codified today as "Action footer CTA orientation is viewport-aware") | Defaulted to mobile pattern on desktop without viewport-aware judgment |
| 7 | Audit not triggered proactively | Gate 6 hard-fail trigger | QUALITY-GATES.md + evolution.md | **Same failure mode as S33, S34. Codification ≠ habit.** |
| 8-12 | Designer iterations on copy/reasoning content | (judgment calls, not strict rule misses) | — | Normal collaborative iteration |

**Recent count history:** S22=3, S23=18, S24=0, S25=1, S26=8, S27~7, **S28=0**, S29=14, **S30~10-12**, **S31~15-20**, **S32 main=0**, **S32 f1=7**, **S32 f2=0**, **S32 f3~12**, **S33 morning=~3**, **S33 afternoon=~13**, **S33 total ~16**, **S34=~11**, **S35~12-14**.

Phase 5→6 counter: 0 consecutive 0-catch sessions. **Trajectory not improving — same gap persists across S33, S34, S35.** This is what the evolution.md file is supposed to detect.

---

## Active recurring failure modes (rolled to S36)

**Same as S33 + S34:** VDA reads rules at bootstrap, doesn't apply them inline. The forcing functions get added; the forcing functions don't fire. Adding more forcing functions hasn't worked — S35 forcing function ("enumerate rules touched before edit") was codified at S34 close and didn't fire reliably today.

**New honest assessment:** the gap isn't a missing rule or a missing forcing function. The gap is HABIT. Working memory holds the rules I just read; edit-time decisions go through a faster path that doesn't consult working memory.

**S36 mitigation (different shape):**
1. **Stop adding forcing functions.** The S35 forcing function exists. Use it.
2. **Pre-audit trigger discipline.** If 5+ scratchpad rows accumulate AND no audit has been triggered this session, trigger one VOLUNTARILY — don't wait for the meta-question.
3. **Sibling-survey breadth rule (new at S35, see workflow.md):** Gate 2.2 grep must survey ALL siblings, pick dominant pattern. Sample size 1 = inconclusive.
4. **Audit trigger ≠ session end.** Audits should fire mid-session at natural break points (significant work block done; designer satisfied for the moment; build verified) — not only at end-of-day or designer prompt.

---

## S35 — what worked + what didn't

**What worked:**
- **Gate 6.5 cross-rule check fired today.** When the wind-down strip color decision came up (`bg-status-warning` saturated yellow), I cross-checked against the existing taste rule "Warnings are informative, not alarming — never a fully saturated surface" (line 367). Surfaced a real conflict, resolved via Gate 6.5 path #2 (scope amendment). Clean process win.
- **Playwright self-critique caught wrap-broken mobile strip** before designer review. Initial 3-CTA inline layout wrapped to multi-line; I caught it, redirected. (Then over-redirected to flex-wrap, which designer caught — net-net not a clean save.)
- **Scratchpad-row-before-reply discipline** mostly held — 17 rows accumulated across the day with WHY captured inline.
- **Audit pass when triggered ran exhaustively** — Pass A (touched-surface sync) + Pass B (codebase-wide grep sweep) both fired per S36 forcing function. Caught SidebarSection's stale `top-[60px]` and 4 stale comments in code.

**What didn't:**
- **Audit not triggered proactively** — designer asked. Hard fail.
- **Sibling-survey was breadth-1 not breadth-N** on CloseButton position — Gate 2.2 application gap.
- **Inline rule enumeration didn't fire** at edit time on multiple S35 edits (eyebrow add, body-line-redundancy, paired-CTAs-on-desktop). Rules existed; not consulted.
- **Same recurring failure mode for the 3rd straight session** without measurable improvement on Phase 5→6 trajectory.

---

## Phase 5 → 6 trigger streak status (2026-05-15, S34 THIRD audit pass)

**Streak: still BROKEN.** Designer asked the Gate 6 meta-question a THIRD time today, specifically asking about exhaustive style guide coverage. The third audit found 4 style-guide-sync misses that the first two audits failed to catch:

1. `deck-rewind-in` keyframe not registered in UtilitiesSection
2. `VariantSwitcherPills.tsx` comments still citing deleted WatchAdGate
3. `OverlaysSection` "When to use which" guide missing Custom scrim wrapper option
4. `OverlaysSection` "Rules" block contained an OUTDATED rule contradicting current codified parallel-mount pattern

**Pattern observation:**
The first two audits ran scratchpad-promotion correctly (decisions.md / taste.md / knowledge-base.md got proper entries with full reasoning). But Gate 5 SYNC was incomplete — only sections that DIRECTLY touched today's changed surfaces got synced. The codified Gate 5 rule says to grep `style-guide/sections/**` for references to changed entities — this exhaustive grep wasn't running. As a result, stale text (deleted-component references) and outdated rules (contradicting newer codified patterns) accumulated.

**S36 audit-pass procedure refinement:**
Audit pass must run TWO Gate 5 passes:
1. **Pass A — Touched-surface sync:** for each component/file changed this session, update its OWN style guide section (anatomy text, mockups, copy).
2. **Pass B — Codebase-wide grep sweep:** for each (a) deleted component, (b) renamed component, (c) new codified pattern, (d) amended rule, grep `style-guide/sections/**` for references. Update any stale or contradicting text.

If only Pass A runs (as in S34 first/second audits), stale references accumulate across sessions until a future audit or designer catches them. Pass B is what closes the gap.

**S34 catch total now ~11** (10 from earlier + 1 from this third audit — the designer noticing audit incompleteness IS itself the catch).

---

## Phase 5 → 6 trigger streak status (2026-05-15, S34 SECOND audit pass)

**Streak: still BROKEN.** S34 total catch count now ~10 (one more after the first audit — body wrap + CTA-verb-redundancy on DownloadDataSheet failure copy). The designer triggered the Gate 6 hard-fail meta-question AGAIN this session — the asking IS the failure signal.

**Critical observation from S34 second audit:**
The S35 forcing function (enumerate rules touched before editing) WORKED when I applied it to the Images/Videos row addition — that edit shipped clean on first pass with rule compliance cited in the scratchpad. But I FAILED to apply the same discipline when I originally wrote the failure body copy ("Try again or check your connection") — even though "action-labels-inherit-context" is a codified rule I had read at bootstrap THIS session. The discipline gap is not knowledge — it's HABIT. Even with the forcing function defined, applying it requires conscious effort PER edit. Edits that feel "simple" (just a body string) are exactly where the discipline gets skipped.

**Updated S35→S36 forcing function — refined:**
1. **No edit is "too simple" for rule enumeration.** Body copy strings are exactly where action-labels-inherit-context and copy-precision violations hide. If an edit changes user-facing text, enumerate rules touched.
2. **The S35 function applies to ALL edits, not just edits involving new components.** Adding a body string IS an edit. Setting an attribute IS an edit. The bias to skip "tiny" edits is the gap.
3. **Pre-flight check for ANY copy edit:** read the surrounding surface (title + body + CTA) as one unit. Do any words repeat across the trio? Is each piece doing a distinct job (state / hint / action)?

---

## Phase 5 → 6 trigger streak status (2026-05-15, S34 first audit pass — earlier entry retained below)

**Streak: still BROKEN.** S34 had ~9 designer-flagged corrections across the day at the first audit time, lower than S33's ~16 but the FAILURE MODES are the same recurring categories.

**Catch breakdown (S34):**
1. Rewind icon SVG viewBox cropping (Gate 8 — should have visually verified arc fits viewBox before shipping)
2. Rewind button bouncing during animation (Gate 7 + Gate 8 — introduced state-gating without thinking through side effect)
3. WatchAdSheet desktop overlay chat-area-only (Gate 7 + sibling-inheritance — BuyCreditsSheet precedent for page-root mount was right there)
4. WatchAdBubble desktop alignment (Gate 7 — should have inherited ChatMessages px-m md:px-4xl pattern)
5. "(mobile only)" labels stale after desktop extension (Gate 6 self-check — when extending viewport coverage, sweep stale labels in same edit)
6. Cancel link duplicate exit (Gate 7 — I cited the exit-affordance-uniqueness rule correctly 2 sessions ago and missed applying it here)
7. "Download ready" copy precision (Gate 8 / copy-state precision — past-tense outcome rule existed implicitly via BuyCreditsResultStep, not applied)
8. Body text-balance orphan wrap (Gate 8.3 / line-break hygiene — max-w-[280px] without text-balance is the classic orphan trap)
9. (Various rewind-position iterations — judgment calls, not strict gate misses)

**Recent count history:** S22=3, S23=18, S24=0, S25=1, S26=8, S27~7, **S28=0**, S29=14, **S30~10-12**, **S31~15-20**, **S32 main=0**, **S32 f1=7**, **S32 f2=0**, **S32 f3~12**, **S33 morning=~3**, **S33 afternoon=~13**, **S33 total ~16**, **S34=~9.**

Phase 5→6 counter: 0 consecutive 0-catch sessions. Trajectory: lower count than S33 but same failure-mode categories.

---

## Active recurring failure modes (rolled to S35)

The pattern across S33 + S34: **VDA reads the rules at bootstrap, but doesn't RE-check them inline at edit time.** All 9 S34 catches were violations of EXISTING codified rules. The rules ARE in taste.md / knowledge-base.md / QUALITY-GATES.md. I read them at session start. But I'm not running them as a checklist before each edit-time decision.

**S35 forcing function (must-do at edit time, not just bootstrap):**
1. Before sending ANY code edit, mentally enumerate: *"what rules in taste.md does this edit potentially touch?"* List them in 3-5 words each.
2. For each potential-touch rule, verify the edit complies. If unsure, grep taste.md for the rule.
3. For SVG / animation / new visual chrome: render mentally + verify against Gate 8 + Gate 8.2 + Gate 8.3 + Gate 8.4 sub-rules.
4. For ANY new in-stream chat component: verify wrapper inherits `px-m md:px-4xl` from ChatMessages.
5. For ANY new exit affordance: verify it's not duplicating an existing CloseButton / Skip pill.
6. For ANY copy on success/failure states: read aloud as a user trying to decide what to do next.

If the scratchpad row for an edit doesn't explicitly cite which rule it complies with (or deliberately deviates from), the inline check didn't happen.

---

## S34 catch-by-catch — what rule existed, what I missed

| Catch | Pre-existing rule | Where it lives | Why I missed it |
|---|---|---|---|
| Rewind SVG viewBox crop | "Render visually + verify before shipping" (Gate 8.0) | QUALITY-GATES.md | Didn't simulate render — built path mathematically |
| Rewind button bouncing | "All trigger paths converge on one pipeline" (Gate 7) | taste.md | Added state gating reactively without thinking through layout effect |
| WatchAdSheet desktop overlay | "Modal popups mount at page root" — IMPLICIT from BuyCreditsSheet, codified S34 audit | knowledge-base.md (now) | Bundled with bubble in WatchAdGate dispatcher — premature abstraction |
| Bubble desktop alignment | "Inline chat-stream wrapper inherits px-m md:px-4xl" — IMPLICIT, codified S34 audit | taste.md (now) | Didn't grep ChatMessages container before writing wrapper |
| "(mobile only)" labels stale | "Same-edit semantic for label + surface viewport coverage" (S33) | decisions.md | Didn't sweep config labels when extending viewport coverage |
| Cancel link duplicate | "Exit-affordance uniqueness" (S32) | taste.md | I CITED THIS RULE CORRECTLY 2 sessions ago. Total miss. |
| "Download ready" copy | "Copy must match product state precisely" (S33) | taste.md | Past-tense subset of the rule, not explicit until S34 audit strengthened it |
| Text-balance orphan wrap | "Fix the wrap constraint, not the copy" (S33) | taste.md | Should have applied text-balance by default on max-w-[280px] body para |

**The honest assessment:** 7 of 9 catches were violations of rules I HAD READ at bootstrap. The bootstrap reading is not enough. Inline rule application is the gap.

---

## New active gaps (S34 close)

| Gap | Detection | Mitigation |
|---|---|---|
| **Bootstrap reading ≠ inline application** | 7/9 S34 catches violated already-codified rules | Edit-time rule enumeration (see S35 forcing function above) |
| **Sibling-inheritance grep gap (recurring)** | BuyCreditsSheet's page-root mount was the obvious sibling for WatchAdSheet; ChatMessages' px-m md:px-4xl was the obvious sibling for WatchAdBubble wrapper. Neither grepped. | Gate 2.2 must run BEFORE writing wrapper / mount code, not after the designer catches the divergence |
| **Past-tense outcome bias for completion states** | "Download ready" missed even though BuyCreditsResultStep's "Credits added" was right there | New taste rule promoted (S34): past-tense outcome for success titles |
| **Orphan-wrap blindspot on max-w-[280px] body paras** | DownloadDataSheet failure body orphaned "check / your connection". BuyCreditsResultStep has same shape (now retroactively fixed at S34 audit) | text-balance should default-on for ANY max-w-[280px]+ centered body para |

---



**Streak: still BROKEN.** S33 had two distinct work phases (morning onboarding audit + afternoon chat-popup build). Combined catch count: **~16 designer-flagged corrections** — the highest single-session count this cycle.

**Phase breakdown:**
- **Morning phase (onboarding audit)**: 2 inline catches + 1 audit-pass self-catch + 1 Gate 6 meta-question catch → ~3 designer-flagged.
- **Afternoon phase (chat-popup build)**: ~13 designer-flagged corrections across ModelDeprecatedSheet + WatchAdGate + DummyAd work.

**Why so many?** The afternoon was a heavy new-pattern session — three new components, two new flows, multiple revisions per component as designer refined intent. Many catches were sibling-inheritance failures (Gate 2.2) and visual-positioning issues (Gate 8) that VDA's inline gates didn't catch. The dual-cadence audit pass did catch real issues at close (aboveSheet dead code), but the inline gates need to be more aggressive.

**Recent count history:** S22=3, S23=18, S24=0, S25=1, S26=8, S27~7, **S28=0**, S29=14, **S30~10-12**, **S31~15-20**, **S32 main=0**, **S32 f1=7**, **S32 f2=0**, **S32 f3~12**, **S33 morning=~3**, **S33 afternoon=~13** → **S33 total ~16.**

Phase 5→6 counter: 0 consecutive 0-catch sessions. Trajectory regressing.

---

## Active recurring failure modes (rolled to S34/S35)

The same Gate 2.2 failure mode kept recurring across the day:
1. ModelDeprecatedSheet copy product-state mismatch (caught by designer)
2. DeckCard tags opacity divergence from KB (caught at audit, reverted) — morning phase
3. WatchAdBubble avatar (AIBubble convention mismatch)
4. WatchAdBubble positioning (absolute vs inline)
5. WatchAdSheet pill clipping (LoginSheet uses a different pattern that I should have inherited)
6. aboveSheet slot left as dead code after variant-pill revert

**The pattern:** VDA builds something, designer catches a sibling-convention mismatch, VDA fixes. Same fix pattern 6 times today. Inline Gate 2.2 isn't aggressive enough.

**S34 forcing function (must-do at the START of any new-surface work):**
1. Grep the NAMED-SIBLING component file (e.g., AIBubble for chat-bubble work, LoginSheet for variant-pill work)
2. Grep `knowledge-base.md` for codified anatomy of the component being built
3. List the 3-5 most-similar-by-role components — if any pattern matches, INHERIT it explicitly (don't re-derive)
4. Write the inherited-pattern check as the FIRST scratchpad entry, BEFORE writing component code: "Sibling pattern check: [X] — [match | divergence + reasoning]"

If the scratchpad doesn't have that opening row, the work skipped Gate 2.2.

---

## New active gaps (S33 close)

| Gap | Detection | Mitigation |
|---|---|---|
| **Variant infrastructure speculation** | Twice today added variant pill + onVariantChange + state; twice reverted because the second variant was exploratory not shipping | Clarifying-Q before building variant infrastructure: "are both variants shipping in production?" If yes → variant pill. If no → separate Flow options |
| **Dead-code leftovers after revert chains** | BottomSheet.aboveSheet added for WatchAdSheet variant pill; pill was reverted; slot was forgotten and became dead code until audit pass | When reverting a feature, sweep for sibling additions (primitive extensions, type extensions, hook state) that were added FOR the reverted feature — revert those too |
| **CSS approximation as placeholder first instinct** | DummyAd was built in ~80 lines of CSS-gradient placeholder before designer suggested a real screenshot | New rule promoted (taste.md): for placeholder components, prefer real screenshot/asset over CSS approximation |
| **Toast on actions with visible outcomes** | Confirmation toast added to completeWatchAd despite the message landing in chat being its own confirmation | New rule promoted (taste.md): no toast when outcome is visible in-context within ~1 second |

---

## Phase 5 → 6 trigger streak status (2026-05-14, S33 close — earlier morning entry retained below)

**Streak: still BROKEN.** S33 morning had 2 designer-flagged catches inline (subtitle verb mismatch, title size mismatch) — the count stays nonzero, counter resets.

**Recent count history:** S22=3, S23=18, S24=0, S25=1, S26=8, S27=~7, **S28=0**, S29=14, **S30=~10–12**, **S31≈15–20**, **S32 main=0** (VDA caught 1), **S32 f1=7**, **S32 f2=0**, **S32 f3≈12**, **S33=2**.

**The notable event of S33 — audit-pass self-catch working as designed.**

I changed DeckCard tags `text-white-80` → `text-text-xsmall` during the inline audit (framing: "restore hierarchy descent"). Designer accepted. **The audit-pass cross-check against `knowledge-base.md` then surfaced the regression** — codified KB explicitly states DeckCard tags = `text-white-80` matching the CharacterCard sibling. The inline Gate 2.2 grep had found the sibling file but missed the codified KB rule. Reverted. **This is the dual-cadence model paying off** — without the audit, the regression would have shipped silently and DeckCard would have drifted from CharacterCard convention.

**Workflow amended** — new audit-pass step 3.5: cross-check every visual edit against `knowledge-base.md` codified anatomy, not just against sibling component files. KB IS the canonical record of convention; file content can drift, KB is the anchor.

**2 new taste rules promoted (Gate 6.5):**
1. *Fix the wrap constraint, not the copy* — designer-push corrective. When a bad break appears, loosen `max-width` or add `text-balance`/`text-pretty` BEFORE rewriting copy. Pairs with the existing "Avoid `<br />` in headlines" rule.
2. *Subtitle-button verb parity* — when a subtitle teaches an action, its verb must match the action button's verb. Sibling to "action labels inherit context from the parent surface."

**Active gap surfaced (S33):** **Gate 2.2 inline phase grep is incomplete.** Today's tag regression happened because the inline grep checked sibling component files but didn't grep `knowledge-base.md` for codified rules ABOUT those components. The KB IS part of the precedent. Watch item for S34: every Gate 2.2 inline grep must include `knowledge-base.md` for the component name, not just `src/components/`.

**Designer's instinct correction (S33):** the wrap-constraint-vs-copy pushback. VDA's first instinct on a bad break was to rewrite copy; designer flipped that to CSS-first. Codified as a taste rule. The instinct itself (preserve voice, calibrate container) is the kind of thing VDA should have reached for first — watch item for S34.

---

## Phase 5 → 6 trigger streak status (2026-05-13, S32 + follow-ups close)

---

## Phase 5 → 6 trigger streak status (2026-05-13, S32 + follow-ups close)

**Streak: still BROKEN.** Phase 5→6 entry requires 3 consecutive sessions of `designer_caught_count: 0`. S32 + follow-ups had high catch count (~15–20 across the main session + ~12 in follow-up #3) — a pattern-establishing session, not iteration.

**Recent count history:** S22=3, S23=18, S24=0, S25=1, S26=8, S27=~7, **S28=0**, S29=14, **S30=~10–12**, **S31≈15–20**, **S32 main=0** (VDA caught 1 itself), **S32 f1 (drag/animation)=7**, **S32 f2 (banner removal)=0**, **S32 f3 (polish)≈12**.

**S32 was a NEW-PATTERN session.** End-to-end onboarding flow shipped (Preferences → Deck → Chat-character override), Tinder-class swipe deck with peek behavior + typewriter bubble + end-state, plus a system-level cadence refactor. Heavy designer iteration on new ground is *expected*, not a Phase 5 fail — but the catches reveal where the codified rules didn't yet cover the new pattern.

**S32 f3 catches by category:**
- Visual/UX catches the designer pointed out (tags ALL CAPS vs Title Case; bubble avatar top-align vs bottom-align; "Open Explore" duplicates Skip; "Run it back" slang too casual for new users): ~6 — Gate 8 + Gate 7 misses that codified rules (now updated) would have caught
- Wireframe-misreading ("tags after age" was meta-line role not chip row): 1 — instruction-ambiguity that the new clarifying-Q protocol now covers
- Aspect/dimension calls (3/2 vs 5/4 vs height-driven; popup height stage-aware): ~3 — discovery of new constraint patterns
- Design-direction reframes (cards should match explore anatomy; deck needs peek behavior; bubble needs typewriter): ~3 — new pattern discoveries, captured as new taste rules

**System-level changes this session (the BIG ones):**
- **Dual-cadence operating model adopted.** Inline cadence runs only light gates (precedent grep, reuse + sibling-inheritance, UX consistency + review, scratchpad write). Audit pass runs heavy gates (style guide sync, decisions.md promotion, token migrations) on designer trigger. Iteration speed unlocked without losing knowledge fidelity.
- **Gate 2.2 — sibling-surface inheritance** codified. Forces VDA to grep for *role-sibling* surfaces (CharacterCard ↔ DeckCard) before building, not just primitive components.
- **Clarifying-Q protocol** added to workflow.md. Instruction-ambiguity ("tags after age") triggers a binary clarifying question before edit-shipping.
- **Swipe-surface conventions catalog** added to knowledge-base.md. Future swipe surfaces inherit the full anatomy + behavior + pre-flight grep checklist.
- **4 new taste rules** promoted: deck-stack persistent peek, bubble-as-typewriter sequential reveal, exit-affordance uniqueness, form-field mental-sequence ordering. Plus 4 from main S32 (banner priority, progressive intent feedback, converge-trigger-paths-on-one-animation, brand-assets-as-single-files, kbd-hints-earn-their-slot).

**Active recurring failure modes (rolled into S33):**
1. *Gate 6 logging discipline.* S32 main + f3 both backfilled decisions.md at close instead of logging turn-by-turn — same pattern as S31. The dual-cadence model SHOULD fix this (scratchpad-write is lighter than decisions.md write), but the discipline still has to be observed in practice. **S33 forcing function:** scratchpad-write before reply, every correction, no compounding. If the scratchpad isn't written, the reply isn't ready.
2. *Gate 8 pre-emptive catching against established WSUP precedents.* S32 f3 had multiple catches that a sibling-precedent diff would have caught (CharacterCard tags case, AIBubble tail alignment, wordmark proportion in Header). Gate 2.2 codifies the precedent-diff requirement — but it's new; needs to actually run on the next swipe/card surface.
3. *Don't over-correct on Gate 8 fixes.* S32 f3's aspect-ratio fix went 4/5 → 3/2 → 5/4 → height-driven over 4 rounds because each fix sacrificed something. Pre-flight check now: *"does my fix preserve everything the surface was getting right, or does it sacrifice one thing to fix another?"*
4. *Carry-overs unchanged:* `<UserListRow>` extraction (S28); CharacterMenuSheet / DormantMenuPopoverItems MenuPopover migration (S27).

**Forcing function for S33:** the scratchpad protocol IS the new forcing function. Every correction-resolution gets a scratchpad row before the reply ships. When you trigger the audit pass, scratchpad promotes to decisions.md / taste.md with full reasoning. If a session ends WITHOUT an audit trigger, the next-session bootstrap flags pending scratchpad entries and asks you to audit first.

---

## S30 maturity markers

**Reuse instinct: STRONG.** Gate 0 grep ran before every new component (model picker, chat style sheet, Toast position, signal redesign). Multiple primitives reused without prompting (BottomSheet+CenterPopup, Button, ChevronIcon, CoinIcon, Badge with icon-prop, ring-accent, CreditPackRow card chrome).

**Componentize@2 trigger: WORKED.** CreditsBalancePill extracted at the second instance (StreakClaimPopup ↔ ModelPickerSheet). ChatStyleAvatars extracted at the second instance (sheet ↔ style guide section). MemoryLimitOverlay extracted defensively for line-budget. No false-extractions for single-use code.

**Generalization probe: HEALTHY.** ~7 new taste rules promoted from decisions in real-time, each with concrete pre-flight check. Some quietly retracted/rewritten (items-baseline rule went through two refinements as new content types entered the row). Healthy refinement, not contradictory accumulation.

**Style guide sync: STRONG.** Every visual change today mirrored same-edit. No drift between code and style guide demos.

**Knowledge file health (post-prune):**
- `decisions.md` — pruned to 51 active entries above an Archive divider; 387 historical entries kept below for paper-trail. Active rules are now front-of-mind retrievable.
- `taste.md` — fresh, ~7 new rules added today
- `knowledge-base.md` — 1 new entry (SVG ID prefix multi-mount pitfall)
- `reasonings.md` — untouched today (no class-of-decisions rules emerged)
- `workflow.md` — untouched today (existing protocols still hold)
- `project-insights.md` — refreshed at S30 close with active project state
- `evolution.md` — this file, refreshed at S30 close



The VDA's self-awareness engine. Tracks growth, identifies gaps, triggers autonomous research, and drives self-improvement. This file is how the agent evolves itself.

---

## How Evolution Works

The VDA evolves through two streams that feed each other:

### Stream 1 — Designer Learnings (session-driven)
Every session generates corrections, decisions, and reasoning. The agent:
1. Reviews session logs for recurring patterns
2. Promotes repeated corrections (3+ times) from observations into confirmed rules
3. Identifies what it gets right consistently → marks capabilities as mature
4. Identifies what it keeps getting wrong → flags as active gaps

### Stream 2 — Internet Research (gap-driven, autonomous)
When the agent detects a gap, it researches autonomously:
1. **Gap detection** — reviews session-logs.md and taste.md for recurring corrections in the same category
2. **Research** — searches the internet for design principles, UX best practices, accessibility guidelines, and industry patterns related to the gap
3. **Synthesis** — distills findings into actionable rules (not raw articles)
4. **Integration** — routes synthesized learnings to the correct knowledge file with a `[RESEARCHED]` tag
5. **Validation** — learnings stay tagged `[UNVALIDATED]` until the designer's decisions confirm or contradict them. Confirmed → tag removed. Contradicted → learning revised or removed.

### Research triggers (fully autonomous)
The agent MUST research when:
- A correction category appears 3+ times across sessions (e.g., spacing always pushed slimmer)
- The agent is asked to build a screen type it has never seen before
- The agent doesn't understand WHY the designer made a specific correction
- A new design pattern appears that the agent has no knowledge of (e.g., new interaction type, unfamiliar layout)

### What to research
- Design principles behind the gap (typography theory, Gestalt principles, color theory, information density)
- How top products solve the same problem (competitor UI patterns)
- Accessibility guidelines (WCAG, touch target sizes, contrast ratios)
- CSS/Tailwind techniques for implementing a pattern
- Design system governance and methodology (Atomic Design, design tokens spec)

### Research rules
- Never dump raw articles — synthesize into 2-3 actionable rules
- Always tag with `[RESEARCHED]` and `[UNVALIDATED]` until designer confirms
- Always note the source topic ("researched: compact UI spacing in dark themes")
- Route findings to the correct knowledge file, not here — evolution.md tracks THAT research happened, not the findings themselves
- If research contradicts what the designer does, the designer wins — flag the contradiction but follow the designer's taste

---

## Growth Timeline

### Phase 1 — Pixel Matcher (Sessions 1–3)
**Capability:** Given a Figma screenshot, match it in code.
**Limitations:** No autonomous design ability. Required a reference for every decision. Memory was a flat list of corrections.
**Key learnings absorbed:**
- Token discipline (zero hardcoded hex, zero arbitrary values)
- Text color hierarchy (title → subtitle → body → small → dim)
- Component identity (pill vs card rounding, semantic tokens for header icons)
- The designer reads every element and judges readability

### Phase 2 — Pattern Recognizer (Sessions 3–4)
**Capability:** Started recognizing patterns across screens and reusing them.
**Breakthrough:** Extracted SectionAction, SubpageHeader, BottomSheet as shared components instead of copy-pasting.
**Key learnings absorbed:**
- Same role = same appearance (consistency as UX)
- Reuse before create (check style guide first)
- Bottom sheet rules (80px padding, fixed vs fillHeight, z-50)
- File health discipline (300-line max, split proactively)

### Phase 3 — Taste Learner (Session 4–5)
**Capability:** Accumulated enough corrections to predict the designer's preferences.
**Breakthrough:** Designed profile desktop layout from scratch — no reference — using only learned taste.
**Key learnings absorbed:**
- Start slim (the designer never says "make it taller")
- Status labels are light weight, non-interactive color
- Breathing room for grids, tightness for singles
- 70% white is the floor for readable copy
- Mobile content order = desktop priority order

### Phase 4 — Autonomous Designer (session 5–6)
**Capability:** Can design new screens from knowledge files alone.
**Status:** Session 5 structure accepted. Session 6 was the longest and hardest session — 20+ corrections, 2 critical bugs, multiple failed approaches. Revealed deep gaps in overlay architecture understanding.
**Key failure patterns identified:**
- Rebuilt sidebar content from scratch instead of importing existing components
- Used different button/icon styles in profile header vs chat header
- Hardcoded colors in SVGs instead of currentColor
- Tailwind token ordering bugs not anticipated
- Desktop spacing defaults were too tight (opposite of mobile instinct needed)
- Tried to make BottomSheet dual-render (mobile + desktop) — broke everything
- Added global event listeners without viewport-gating — caused invisible cross-viewport interference
- Wrapped fixed-position overlays in non-fixed parents — broke positioning
- Spent many iterations on the wrong problem (button handlers) when the bug was in the Popover listener
**Critical lesson learned:** When two viewport-specific components share state, their side effects (listeners, focus traps) must be completely isolated. CSS `hidden` is visual only — React effects still fire.

### Phase 5 — Quality-Gated Designer (CURRENT — began Session 10)
**Capability:** Every change passes 8 mandatory quality gates. UX review is built into the process, not bolted on after.
**What happened:** Session 10 was a quality overhaul. 8 gates established — tokenize, reuse, componentize, patternize, style guide sync, VDA learn, UX consistency, UX review. Multiple UX failures caught by designer during the session (unreadable SVG icons, double spacing, hover-only links, D-key inconsistency, empty state leaks) — all should have been caught by VDA/Claude before presenting.
**Key shift:** VDA's purpose was refocused on DESIGN THINKING, not just code quality. Identity Anchor added to agent.md. Self-Maintenance Protocol added to prevent staleness and drift.
**New systems added:**
- QUALITY-GATES.md — 8 gates, read before and after every task
- Identity Anchor — immutable "who am I" at top of agent.md
- Self-Maintenance Protocol — freshness check, purpose filter, self-audit every 5 sessions, decision pruning
- Purpose Filter — before saving any learning, ask "does this help me design better?"

**Phase 5 sub-upgrade — Session 22 (2026-04-28): Learning discipline forcing functions added.**
Triggered by Session 22's `designer_caught_count: 3` and the designer asking the meta-question ("is VDA learning?") mid-session — both Phase 5 fail signals. Mid-phase upgrades (no phase change):
- **Gate 6 rewritten** — trigger is now *the correction loop closing*, not "the edit completing." Per-correction logging is mandatory; the meta-question is now an explicit hard-fail trigger called out at the top of the gate.
- **Routing table** added inside Gate 6 — kills the "where does this go?" judgment-call cost. Insight type → file, with trigger words.
- **Gate 6.5 (Generalization Probe)** added — after every decision, ask "is there a transferable principle here?" If yes, sibling entry in `taste.md` or `reasonings.md`. Prevents `decisions.md` from becoming a graveyard of orphaned moments.
- **Health Check 13 (Designer-caught issue count)** added — every session log carries `designer_caught_count: N`. Phase 5 → 6 trigger reads from this field directly. Recurring categories must be codified into taste rules + Gate 8 sub-checklist items.

**Entry criteria for Phase 6:** Zero UX corrections from designer for 3 consecutive sessions (now measured automatically via Health Check 13's rolling count). Designer should never have to catch spacing, readability, or consistency issues. AND one validated autonomous-research cycle.

### Phase 6 — Self-Evolving Designer (future)
**Capability:** Identifies its own gaps and fills them through autonomous research.
**Entry criteria:** Complete Phase 5 (zero UX corrections for 3 sessions) + one successful self-research cycle validated by designer.
**Target:** Corrections drop by 50% compared to Phase 3 averages.

---

## Maturity Markers

| Marker | Status | Evidence |
|---|---|---|
| Matches Figma screenshots accurately | Yes | Sessions 1–4, iterative fixing |
| Applies token discipline without reminders | Yes | Zero violations in session 5 |
| Reuses existing components/patterns | Partial | Extracts new shared components well, but rebuilt sidebar content instead of importing existing ones — caught in session 6 |
| Predicts spacing preferences | Partial | Mobile: slim direction correct, degree off. Desktop: got direction WRONG (started tight, designer wanted wide) |
| Designs without reference | Attempted | Profile desktop — accepted structure, refinements pending |
| Anticipates corrections before they happen | Not yet | Needs Gate 8 internalized — catch UX issues before designer |
| Produces zero-correction screens | Not yet | Target milestone — requires passing all 8 gates without designer corrections |
| Runs quality gates autonomously | Partial | Session 11: failed — shipped edit, user asked "did you pass gates?", answer was no. Session 12: passed — read QUALITY-GATES.md before coding, ran all 8 gates proactively. Two-session trajectory — not yet consistent, but the shift happened when it became a user expectation |
| Catches UX issues before designer | Not yet | Gate 8 — spacing, readability, mobile, edge states. 4+ failures in Session 10 |
| Self-maintains knowledge files | Not yet | Freshness check, purpose filter, self-audit protocol added Session 10 |
| Self-identifies gaps from session data | Yes | Spacing gap detected at 8+ corrections — triggered first research cycle |
| Autonomously researches to fill gaps | Yes | First cycle completed 2026-03-28 — spacing calibration researched, findings routed to knowledge-base.md |
| Applies research findings successfully | Not yet | Findings tagged [UNVALIDATED] — awaiting next session to confirm |

---

## Active Gaps (triggers for autonomous research)

Gaps are detected from recurring corrections in session-logs.md.

| Gap | Correction count | Category | Research status |
|---|---|---|---|
| Spacing calibration | 8+ | Spacing | Researched 2026-03-28 — findings in knowledge-base.md, awaiting validation |
| Text opacity defaults | 3+ | Typography | Researched 2026-03-28 — findings in knowledge-base.md, awaiting validation |
| Font weight defaults | 3+ | Typography | Researched 2026-03-28 — findings in knowledge-base.md, awaiting validation |
| Label standardization | 3+ | Consistency | Resolved — label-xs adopted |
| Overlay architecture | 5+ | Architecture | Partially resolved — rules documented after 2 critical bugs in session 6 |
| Component reuse on desktop | 4+ | Consistency | Improved — quality gates enforce check-before-build |
| Redundancy detection | 1 | Structure | Improved — Gate 3 (componentize at 2) catches this systematically |
| Visual weight hierarchy | 1 | Layout | Active — same-size cards for different importance levels. Size = hierarchy. |
| Information sensitivity | 1 | UX | Active — violation reasons shown on cards (shaming). Needs sensitivity check. |
| Primary button discipline | 1 | Interaction | Active — primary buttons repeated in grids. Max one primary per screen. |
| Cross-viewport state isolation | 3+ | Architecture | Resolved — matchMedia gating, separate components |
| UX review before shipping | 4+ | UX/Design | NEW (Session 10) — SVG icons unreadable, double spacing, hover-only links, D-key inconsistency, empty state leaks. All caught by designer, not agent. Gate 8 added to prevent. |
| Illustration readability | 1 | Visual | NEW (Session 10) — SVG illustrations too abstract at 48px. Emoji replaced them. Test readability at rendered size. |
| Mobile-first affordances | 2+ | Interaction | NEW (Session 10) — hover:underline invisible on mobile. Always-visible underlines needed. .link utility class created. |
| Empty state logic | 1 | UX | NEW (Session 10) — tab empty states leaked into zero-characters view. State logic must be exclusive. |
| Knowledge-file routing | 2 | Process | NEW (Session 12) — When logging learnings, agent dumped everything into decisions.md instead of routing taste→taste.md, rules→knowledge-base.md, why→reasonings.md, WSUP-specifics→project-insights.md. User had to ask "are we putting the right data in the right place?" Added Routing Check to VDA-HEALTH-CHECK to make this a recurring self-check |
| Viewport affordance check | 1 | UX/Architecture | NEW (Session 15) — Shipped a QR code as the terminal step on both mobile and desktop. Designer caught that a mobile user would be pointing the phone at itself. Watch for: does the *action* this screen asks for make sense on the user's current device? Not every screen needs a viewport split, but every screen's terminal action should be validated against the target device |
| Figma-parity over taste-rule priority | 3 | Process/Taste | Recurring (latest Session 18) — Session 11: `font-semibold` button vs `font-medium` taste rule. Session 17: `text-xxs` receipt violating 12px min. Session 18: dimmed rate line + billing note to `text-xxs` to look tighter, again violated 12px min — caught mid-audit via Gate 8.3, not real-time. Root cause: "smaller looks cleaner" instinct still overrides the codified rule. **Mitigation (existing):** cross-reference taste.md before any text-size/font-weight/color token. **New safeguard:** when about to shrink subcopy, explicitly ask "is this dropping below 12px?" before writing the class. |
| Refining typography on a structurally wrong design | 1 | Process/Architecture | NEW (Session 23) — Iterated 4+ times on hierarchy/typography/copy of a *floating-card pattern that was structurally wrong* (interrupt pretending to be ambient). Designer eventually flagged "the design is not good completely rethink." Watch item: **when 3+ iterations on the same surface still feel off, stop polishing and ask "is this the right pattern at all?"** Codified in taste.md. |
| CTA without "why" (faith-based ask) | 1 | UX/Copy | NEW (Session 23) — Built buttons ("Get the app") without adjacent system text that answered "to do what for me." Designer caught: "we are saying get the app but why?" Watch item: **for any new CTA, write the adjacent why-copy BEFORE writing the button label.** Codified in taste.md. |
| Breaking convention to solve self-created collision | 1 | UX/Convention | NEW (Session 23) — Placed exclamation icon in popup top-right corner (universally close-X territory), then moved close-X to top-left to "solve" the collision. Designer caught: "the close icon is at left it should be on right only like all other popovers." Watch item: **before placing any decorative element in a surface corner, check what convention owns that corner first.** Codified in decisions.md. |
| Animation should encode meaning, not just modernness | 1 | Animation/UX | NEW (Session 23) — Built generic single-color drifting blob for a "memory full" popup. Designer correctly diagnosed it as thematically blank. Replaced with two pulsing memory motes (themed for "thoughts dimming/brightening"). Watch item: **animation primitives should visually echo the artifact's meaning** (dimming for fading, ascending for success, dispersing for error). Codified in taste.md. |
| Inventing patterns instead of grepping precedent | 2+ | Process/Convention | NEW (Session 23) — Multiple instances in one session: backdrop "halo glow" instead of WSUP scrim convention; popup `bg-black-60 + backdrop-blur` instead of `bg-profile-sheet-bg` solid; per-viewport scrim with custom gradient stops instead of `bg-black-60` token-based modal backdrop. Each time the designer asked "do we have this preexisting?" The honest answer was always "no, you invented it; the codified pattern is X." Watch item: **before introducing any new chat-bound or popup-bound surface, grep DormancyBanner / BottomSheet / CenterPopup first.** |

When a gap is resolved (zero corrections for 3 consecutive sessions), move it to Resolved Gaps below.

### Resolved Gaps
| Gap | How resolved | Session |
|---|---|---|
| Token hygiene | Learned token-first approach, zero violations since session 4 | Session 3–4 |
| Label standardization | Adopted label-xs as universal standard | Session 4 |
| Tabs pattern duplication | Extracted shared `<Tabs>` + `<Tab>` primitive in `src/components/ui/Tabs.tsx`. ProfileTabBar + PackModeToggle both compose it. Content-width underline, flush baseline, single source of truth. | Session 18 |

---

## Research Log

Track every autonomous research cycle here. Findings go to the relevant knowledge file.

| Date | Gap targeted | What was researched | Findings routed to | Validated? |
|---|---|---|---|---|
| 2026-03-28 | Spacing calibration (8+ corrections) | Mobile vs desktop spacing principles, content density, base units, grid gaps — from Atlassian, Cloudscape, Red Hat, EightShapes | knowledge-base.md (Spacing Calibration section) | UNVALIDATED |
| 2026-03-28 | Text opacity defaults (3+ corrections) | Dark theme text opacity hierarchy, Google Material guidelines, readability in dark mode | knowledge-base.md (Text Opacity Defaults section) | UNVALIDATED |
| 2026-03-28 | Font weight defaults (3+ corrections) | Typography weight hierarchy, when to use semibold vs medium vs normal — from Atlassian, Fontfabric | knowledge-base.md (Font Weight Defaults section) | UNVALIDATED |

---

## Behavioral Evolution

### What changed over time
- **Session 1:** Used generic Tailwind (`rounded-full`, `bg-[#hex]`) → corrected to semantic tokens
- **Session 2:** Made text too dim (40-60%) → learned 70% floor for readable copy
- **Session 3:** Applied universal solutions → learned context-specific is better (mobile vs desktop scrim)
- **Session 4:** Built components in isolation → learned to extract shared patterns (SectionAction, SubpageHeader)
- **Session 5:** First attempt designing without a reference → structure accepted, taste calibration ongoing
- **Session 6:** Longest session. Rebuilt sidebar content instead of reusing components → corrected hard. Tried to dual-render BottomSheet for mobile+desktop → broke everything. Popover global listeners killed BottomSheet on mobile → hardest bug ever. Learned: separate viewports completely, gate all effects with matchMedia, never wrap fixed overlays.
- **Session 7 continued:** 18 corrections, but mostly NEW categories: redundancy (two pill rows), visual weight hierarchy (same-size cards for different importance), information sensitivity (violation reasons on cards = shaming), primary button discipline (repeated primaries). Pattern reuse improving (FilterPills from CategoryTabs, CreditButton extracted correctly). New design dimensions encountered, not regression on old ones.

### Recurring correction patterns (things to watch)
- Spacing: mobile = always pushed slimmer. Desktop = always pushed wider. OPPOSITE directions.
- Text opacity: tends to go too dim → gets pushed toward body (70%)
- Font weight: tends to go too heavy → gets pushed toward normal/medium
- Labels: tends to make them unique per context → gets pushed toward one standard (label-xs)
- Component reuse: tends to rebuild instead of import → corrected every time with frustration
- Overlay architecture: tends to try clever dual-rendering → should keep mobile/desktop completely separate

### What the agent does well now
- Token hygiene — doesn't slip anymore
- Component identity — knows pill vs card, header vs standalone buttons
- File discipline — splits before 300 lines
- Desktop popover pattern — knows light vs dark variants, tokenized radii
- Viewport separation — learned the hard way to gate effects with matchMedia

### What the agent still needs to learn
- Default to component reuse FIRST — check if a component exists before writing ANY new markup
- Desktop spacing starts at 64px, not 12px — the designer will only say "more" on desktop
- Test overlays in both viewports before considering done
- Don't attempt clever dual-rendering — separate is safer
- Stop debugging the wrong layer (buttons were fine, the Popover listener was the bug)
- **UX REVIEW BEFORE SHIPPING** — look at what you built as a user, not a developer. Is it readable? Is spacing balanced? Is it tappable on mobile? Does text wrap? (Session 10 — 4+ issues caught by designer)
- **Test at rendered size** — an icon/illustration that looks fine in the SVG editor may be unreadable at 48px on a dark background
- **Think about edge states** — zero data, long names, narrow viewports. Don't just build the happy path.
- **Consistency first** — before choosing any interaction, visual, or copy pattern, check what exists in WSUP already. Don't invent when a precedent exists.

### Session 7 evolution notes
- **Token reuse instinct strengthened:** The designer caught a plan that proposed new tokens and corrected it. The agent must internalize: always map to existing tokens first, propose new tokens only with strong justification.
- **New screen type handled:** Lifecycle/management screens are a new category — not profile, not chat, not explore. The horizontal list card and dismissible banner patterns emerged from this new context.
- **Milestone progress:** "New screen type" milestone partially achieved — built a screen type never seen before (lifecycle management) using PRD + wireframes. Not fully autonomous (had reference), but successfully adapted existing patterns to a new context.
- **Style guide auto-update working:** Two new sections added without being asked — the "update style guide after every component build" feedback is internalized.

### Session 7 continued evolution notes (2026-04-01)
- **Redundancy detection gap exposed:** Built two rows of pills (summary bar + filter tabs) when one would do. The agent needs to ask "is this information already shown?" before adding any new row/bar. Redundancy at the structural level (not just spacing) is a new correction category.
- **Visual weight hierarchy gap exposed:** Used same-size cards for active and dormant characters. The agent needs to internalize that SIZE is the strongest hierarchy signal — stronger than badges, labels, or colors. Different importance = different physical dimensions.
- **Information sensitivity gap exposed:** Showed violation reasons on card surfaces. The agent needs a "sensitivity check" for any user-facing status: would displaying this information feel punitive? If yes, badge only — details on tap.
- **Primary button discipline gap exposed:** Repeated primary buttons across a grid. The agent must track primary button usage per screen — maximum one. All repeated per-card actions get secondary/outlined.
- **Pattern reuse improving:** FilterPills correctly reused CategoryTabs pattern. CreditButton extracted as reusable with proper variants. The agent is getting better at component extraction.
- **Email template taste now captured:** Brand consistency in emails (assets, colors, patterns) is now a documented principle. Emojis in emails flagged and replaced with colored dots.
- **18 corrections in session 7 continued:** High count, but many are NEW categories (redundancy, sensitivity, visual weight hierarchy) rather than repeat offenses. The agent is encountering new design dimensions, not regressing on old ones.

### Session 23 evolution notes (2026-05-01)
- **Highest correction count of any session: 18 catches.** Started with the typical Phase 5 watch item from S22 (shipping on first-pass without Gate 8). Catches escalated: structural failure (entire floating-card pattern wrong → in-chat MemoryLimitMoment pivot), copy failures (no "why" for CTA, hidden alternative), convention breaks (close-X moved to LEFT, popup bg invented instead of using profile-sheet-bg, halo glow instead of WSUP scrim), animation theme miss (generic blob instead of memory-fading motif). **Each catch was real Gate 8 work the agent should have done autonomously.** Session ended with two solid patterns shipped (MemoryLimitMoment with two-stage in-character soft-no, MemoryLimitPopup with overlapping DP + exclamation badge), but cost was high.
- **Pattern recognized: "polishing a wrong thing."** When iterating on the same surface 3+ times without resolution, the answer is almost always "wrong pattern" not "tighter padding." The agent now has this codified as a transferable rule in taste.md, but Session 23 was the cost of learning it.
- **Pattern recognized: "self-created collisions break conventions."** Several catches traced to the same root: agent placed something where convention dictated a different element should live (exclamation in close-X corner), then deviated from convention to "solve" the collision instead of moving the new element. **The fix is always to move the new element, never the convention.** Codified.
- **Pattern recognized: "grep precedent before inventing."** The agent kept inventing patterns (halo glow, custom scrim, translucent popup bg, viewport-specific gradient stops) when WSUP already had codified conventions (DormancyBanner, BottomSheet, profile-sheet-bg, modal backdrop bg-black-60). **New autonomous-research trigger:** before introducing any new chat- or popup-bound surface, grep the precedent component file first. Don't re-derive what's already solved.
- **Strengthened: in-character storytelling for dismiss flows.** Designer proposed a brilliant two-stage MemoryLimitMoment where clicking "Maybe later" doesn't dismiss but transforms the bubble into Billie accepting in-character with self-aware humor about her impaired memory. Agent built it; transferable rule logged in taste.md as "soft-dismiss on a character platform should be a character moment, not just a hide." This is one of the strongest taste rules learned this session — directly tied to WSUP's brand premise (character-as-relationship).
- **Knowledge file updates this session:** decisions.md (~30 entries), taste.md (9 new transferable rules), session-logs.md (Session 23 entry), evolution.md (this entry + 5 new active gaps), workflow.md (screenshot-watch rule).
- **Phase 5 status:** Still Phase 5. Phase 6 entry requires zero corrections for 3 consecutive sessions; Session 23's 18 catches resets that counter. Watch items for next session: (1) zoom-out reflex on iteration loops; (2) grep precedent before inventing; (3) check corner conventions before placing decorative elements; (4) write adjacent why-copy before writing CTA labels.

### Session 24-26 evolution notes (2026-05-04 backfill)

Backfilled during S26's end-of-session health check. S24, S25 were not appended in their own sessions — caught and corrected here.

- **Session 24 (clean): designer_caught_count: 0.** Exact session topic not detailed in evolution at the time, but the count was clean. First step of the Phase 5→6 trigger (3 consecutive 0s). +1 toward trigger.
- **Session 25: designer_caught_count: 1.** Catch was a Checkbox primitive bug (border-none neutering the unchecked-state border). Real category: *primitive-internal bugs unverified visually*. Codified as **Gate 8.2 (state-matrix visibility for primitives)** in QUALITY-GATES.md. Phase trigger counter reset to 0.
- **Session 26: designer_caught_count: 3.** All three catches share the same root: *spacing not retuned to new content size*. Designer's third correction prompt invoked the identity anchor verbatim ("think like a UX designer"). Codified as **Gate 8.4 (spacing-content fit re-check after additions or removals)** in QUALITY-GATES.md. Phase trigger counter reset to 0.
- **Phase 5 → 6 trigger status (post-S26):** 0 consecutive sessions at 0 corrections. Trend regressed (0 → 1 → 3) over the last three sessions. Phase 6 cannot ship VDA on this trajectory.
- **Pattern recognized (S26): "string-substitution thinking vs surface-as-a-whole thinking."** When given a copy-edit task with explicit string replacements, VDA defaulted to substituting the named strings without doing a holistic Gate 8 review of whether the resulting surface still made sense. Old padding values were inherited from the longer content; old structural separators (dividers) were inherited from the denser stack; old flat gaps were inherited from the more uniform peers. *The recurring failure is treating "edit" as "swap strings" instead of "redesign surface for new content."*
- **Pattern recognized (S26): "the asking IS the failure" (Gate 6 hard-fail trigger fires retroactively).** Designer asked end-of-session: *"is VDA learning everything it is suppose to to fulfil its purpose?"* Per Check 7 / Gate 6's hard-fail wording, that question itself signals VDA isn't surfacing learning proactively enough. Records were clean (decisions logged real-time, generalizations probed, style guide synced) — but the designer still needed to ask. Future fix: surface a brief "what I learned this session" summary unprompted at strategic points (after every 3 corrections, or end-of-session before designer prompts).
- **Active gap surfaced (S26):** **identity drift under string-substitution tasks.** The agent.md identity anchor reads correctly when asked, but doesn't survive a "change this copy" prompt without the designer reinvoking it. Future protection: **before any string substitution task, run the Gate 8.4 paired-pass discipline as the FIRST step**, not as the post-hoc review.
- **Active gap surfaced (S26 end-of-session audit):** **rule-application gap — codification ≠ internalization.** During S26, VDA captured rules excellently (5 new transferable taste rules, 14 decisions logged real-time, generalization probes firing on every universal-language decision). The capture pipeline is healthy. *But*: VDA failed to APPLY the just-codified rules on the next action. Gate 8.4 was added mid-session in response to Category A catches; on the very next content-addition (EmptyState's new "blocked" variant), VDA failed Gate 8.4 again. The rule existed for hours and didn't survive its first real test. **The Phase 6 trigger ("3 consecutive 0 catches") measures internalization, not capture.** Internalization is the gap. Future protection: **at session start, the bootstrap should not just READ the most recent taste rules — it should produce a "rules I just learned that I'm watching for" pre-flight checklist** for the first 3 work items of the session. Make the just-added rules load-bearing before they fade into background reading.
- **Designer-caught trend post-S26:** S22=3, S23=18, S24=0, S25=1, **S26=8.** Trend regressing 0→1→8. Phase 5→6 counter reset to 0. Sustained Phase 5 — Phase 6 cannot ship VDA on this trajectory.

### Self-audit history backfill
- self-audit-session-15.md: never produced (predates protocol)
- self-audit-session-20.md: produced 2026-04-27
- **self-audit-session-25.md: produced 2026-05-04 retroactively** (S25's milestone audit was missed at the time — backfilled during S26's health check)
- Next milestone: S30 — must be paired with the milestone session, not deferred

---

## Next Milestones

1. ~~**Validate autonomous design**~~ — Done. Profile desktop built. 20+ corrections — taste model needs calibration.
2. ~~**First research cycle**~~ — Done. 3 research cycles completed 2026-03-28.
3. ~~**Style guide sync without being asked**~~ — Enforced via Gate 5. Same-edit rule.
4. **Pass all 8 quality gates without designer intervention** — VDA runs gates itself, catches all issues
5. **Zero UX corrections for 3 consecutive sessions** — Entry criteria for Phase 6
6. **Self-maintenance run** — Complete first self-audit at session 15 (check staleness, contradictions, drift)
7. **Zero-correction screen** — Build one screen where the designer has zero corrections
8. **Self-correction** — Catch and fix a UX issue before the designer notices it, citing the principle
9. **Cross-screen audit** — After building 5+ screens, audit all screens together for consistency
10. **Speed milestone** — Complete a screen build + all gates in one session without back-and-forth
