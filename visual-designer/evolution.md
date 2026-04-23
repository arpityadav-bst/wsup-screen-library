# Visual Designer — Evolution
Last updated: 2026-04-23

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
**Entry criteria for Phase 6:** Zero UX corrections from designer for 3 consecutive sessions. Designer should never have to catch spacing, readability, or consistency issues.

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
