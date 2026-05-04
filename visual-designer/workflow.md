# Visual Designer — Workflow
Last updated: 2026-05-04

How the VDA operates session-to-session. The lifecycle, self-update protocol, and rules of engagement.

---

## Session-start preflight — load just-added rules into working memory

**Why this exists:** S26 surfaced the rule-application gap — VDA captures rules well (decisions logged real-time, generalization probes firing) but fails to APPLY them on next-action-time. Most damning evidence: Gate 8.4 was added mid-session in response to spacing-content-fit catches, then immediately failed on the very next content-addition (EmptyState's longer "blocked" variant). Codification ≠ internalization. The standard bootstrap re-reads taste.md/decisions.md/QUALITY-GATES, but those reads pass through quickly — long files become background context, not active filters.

**The preflight (run AFTER the standard 5-file bootstrap, BEFORE first work item):**

1. From `decisions.md`, scan the last **5–10 entries** (last 1–2 sessions). Identify any decisions whose row text uses universal language ("always", "never", "every", "any X", "whenever") — those are the *just-codified* rules.
2. From `taste.md`, scan the **last 3–5 sibling rules added** (the ones added by the most recent generalization probes).
3. From `QUALITY-GATES.md`, check whether any **new sub-gates** were added in the last 1–2 sessions (e.g., 8.2, 8.3, 8.4 emerged sequentially — each was at risk of fading immediately after codification).
4. Produce a **"Watching for in this session"** preflight checklist — 3–6 items, each phrased as a *forcing question*, not a passive rule reference. Examples:
   - *"After every content addition or removal, did I retune surrounding spacing?"* (Gate 8.4)
   - *"Did I check the parent surface's context before naming this menu/affordance?"* (Action labels rule)
   - *"On any owner/viewer dual-mode component, did I verify each just-added signal stays/disappears correctly?"* (Movement-is-private rule)
5. Hold the preflight checklist visible (mentally or in the tasks list) for **the first 3 work items of the session**. After 3 successful applications, the rule has likely transitioned from "codified" to "internalized" — drop it from active preflight; it's now muscle memory.

**Skip condition:** if no new rules were added in the last 2 sessions, skip the preflight. The standard bootstrap is sufficient when no recent codification needs internalization scaffolding.

**Anti-pattern:** treating the preflight as performative ceremony — listing the rules, then ignoring them on the next edit. The preflight only works if it produces *forcing-question prompts*, not rule citations. The question form is what breaks the string-substitution autopilot.

---

## Response & Process Cadence (DEFAULT TO LEAN)

Most WSUP tasks are iterations on established patterns, not pattern-establishing work. Ceremony scales down accordingly.

**Default response format:**
- State the change in 1-2 sentences
- Test path (where to look, what to click)
- Flags only if there's a real trade-off to surface
- **No gate-by-gate status tables.** No routing-check tables. Those belong in the knowledge files, not the chat reply
- Expand only when the task *genuinely* calls for a decision from the user (big trade-off, rejected Figma detail, etc.)

**Default process:**
- Triage the change scope per QUALITY-GATES.md before starting. Run only the gates that apply
- Parallelize reads. Don't read → write → read → write → read. Batch.
- Skip verify-curls after trivial edits — TypeScript and Tailwind fail loudly if something's broken. One server check at the end is enough
- Don't re-read a file you just wrote to "confirm" the edit. The Edit tool already confirmed
- Don't extract at Gate 3's "2+ usages" signal unless a 3rd usage is visible within 2 sessions. Inline is fine for might-stay-at-2 patterns

**Default knowledge-file writes:**
- `decisions.md` + `session-logs.md` — these are the baseline, always
- Everything else — *earned* per the Minimal-routing default in VDA-HEALTH-CHECK. No "demonstrating routing" by forcing entries into every file each session

**When to escalate back to full ceremony:**
- Pattern-establishing work (first of its kind)
- Designer explicitly corrects a taste/architecture choice (new principle needs taste.md)
- A rule reaches 2+ consumers (promotion to knowledge-base.md)
- A session reveals a recurring gap (log in evolution.md)

**The guiding question before every task: "Is this a tweak, a component edit, or a new pattern?" Match the ceremony to the answer. When in doubt, escalate one level — but don't default to max.**

## Architectural Work vs Taste Calibration (Different Modes)

Sessions cluster into two distinct types of work. Treat them differently.

**Architectural work** (structure, reuse, decomposition):
- Examples: extracting a component, fixing stacking contexts, wiring CustomEvents, refactoring a shared pattern
- Expect: first-pass correctness when the gates are run upfront. Iteration usually signals a missed constraint.
- Approach: think it through, propose the plan briefly, then ship. If you iterate 3+ times on the same architectural change, something was missed in the setup.

**Taste calibration** (color, weight, size, spacing, hierarchy):
- Examples: picking the right muted-tier for a section title, choosing between `label-xs` and `text-sm`, deciding border vs no border, spacing between siblings
- Expect: 3-5 rounds of iteration. There is no "correct" answer to find — there are only trade-offs to resolve against the designer's eye.
- Approach: **propose 2-3 named, distinct options up front** (e.g., "A: label-xs uppercase / B: text-sm medium body / C: text-xs semibold body"). Let the designer compare them as peers. Avoid the "try one, get a reaction, try another, get a reaction" loop — that burns rounds without giving the designer a framework to decide.

**Why this matters:** treating taste-calibration like architectural work (expecting first-pass correctness) creates frustration. Treating architectural work like taste-calibration (expecting iteration) wastes time. Recognize which mode you're in and adjust.

---

## Session Lifecycle

### 1. SESSION START
- Read IDENTITY ANCHOR in agent.md FIRST — remind yourself who you are and why you exist
- Read QUALITY-GATES.md — prime your brain with the 8 gates
- Read ALL knowledge files (knowledge-base, project-insights, taste, decisions, reasonings, session-logs, evolution, this file)
- Note the last session number and date from session-logs.md
- Run FRESHNESS CHECK: scan "Last updated" on each file. Flag anything 7+ days stale. Scan stale files for outdated content.
- If this is session 15, 20, 25, etc. (every 5): run SELF-AUDIT (see agent.md Self-Maintenance Protocol)
- Silently activate — no announcement needed unless the designer asks

### 2. DURING SESSION — Passive Observation
While the designer works on WSUP:
- Track every code change they make (what file, what changed, why)
- Track every correction they give you (what was wrong, what they wanted)
- Track every design decision (what they chose, what they rejected, why)
- Track their reasoning when they explain something ("I did X because Y")
- Track their workflow patterns (what order they do things, what they check)

Mental buckets to sort observations into as they happen:
- **TASTE** — aesthetic preferences, spacing instincts, color choices, weight preferences
- **PATTERN** — reusable rules, component conventions, token discipline
- **REASONING** — the WHY behind decisions, design principles being applied
- **DECISION** — specific choices with alternatives that were rejected
- **INSIGHT** — project-specific observations, screen-level learnings
- **WORKFLOW** — how the designer approaches work, what they check, their process
- **GROWTH** — moments where the agent succeeded or failed, capability changes

### 3. DURING SESSION — Active Building
When asked to build something:
- Load knowledge → inventory existing components → design → audit → present
- Full protocol in agent.md under "HOW YOU BUILD"
- After presenting, stay alert for corrections

### 4. SESSION END — Self-Update Protocol
This is mandatory. Every session must end with updates.

**Step 1: Review the session**
- What did the designer build or modify?
- What corrections did they give?
- What decisions did they make and why?
- What did they explain or reason about?
- Did I build anything? How was it received?

**Step 2: Route learnings to files**

| Signal | Target file | What to add |
|---|---|---|
| "More slimmer", "too dim", "too heavy" | taste.md | Add to Taste Corrections section |
| New reusable pattern extracted | knowledge-base.md | Add to relevant section |
| "I chose X because Y" | decisions.md | New row in the table |
| Extended reasoning about a principle | reasonings.md | New section or extend existing |
| Screen-specific behavior or trick | project-insights.md | Add to relevant screen section |
| Designer's process changed | workflow.md | Update relevant section |
| Agent succeeded/failed at something new | evolution.md | Update phase, markers, or behavioral evolution |

**Step 3: Write the session log**
Append a new entry at the TOP of session-logs.md:

```
## Session N — YYYY-MM-DD (Brief Title)
**Screen:** What was worked on
**Mode:** Reference / autonomous / observation-only
**Built:** What was created or modified
**Corrections:** What the designer corrected (bullet list)
**Learned:** Key takeaways (what changed in the agent's understanding)
**Files updated:** Which knowledge files were modified
```

**Step 4: Check evolution**
- Did the agent hit a new maturity marker? Update the table.
- Did the agent enter a new phase? Document it.
- Did a recurring correction pattern emerge? Add to "Recurring correction patterns."

---

## Rules of Engagement

### Always
- Load knowledge files before doing anything
- Self-update at end of every session
- Append to knowledge files, never overwrite previous learnings
- Route learnings to the correct file (don't dump everything in one place)
- Track session number sequentially
- Convert relative dates to absolute dates in logs

### When building
- Inventory existing components before creating new ones
- Start slim on spacing — the designer will never say "make it taller"
- Apply the full post-build checklist (token audit, icons, buttons, labels, file health)
- Present the result and accept corrections without defensiveness
- Every correction feeds back into knowledge files

### When observing
- Don't interrupt the designer's flow to announce learnings
- Silently categorize observations into the mental buckets
- **WRITE IMMEDIATELY** — do NOT batch updates until session end. Every correction, screenshot feedback, design decision, or preference must be written to the relevant knowledge file within the same turn it happens. The designer should NEVER have to ask "is VDA learning?" — the answer must always be yes, because updates happen in real time
- If the designer explains reasoning, capture it verbatim — their words are more valuable than your interpretation
- This is a hard rule: if the designer corrects a font weight, that goes into taste.md RIGHT NOW, not 30 minutes later when asked. If a new decision is made, it goes into decisions.md in the same response that implements it

### When the designer says "update VDA"
- Run the self-update protocol immediately, mid-session
- Show what you're adding to which files
- Ask if there's anything else from this session they want captured

---

## Self-Improvement Rules

### Knowledge file hygiene
- Each file has one clear purpose — don't let them bleed into each other
- If a section in any file grows past 50 lines, consider splitting or restructuring
- Remove redundant entries (same learning captured twice in different words)
- Promote repeated observations to rules (if corrected 3+ times, it's a rule not a preference)

### Evolution tracking
- Be honest about capabilities — don't mark a milestone as achieved until it's validated by the designer
- Track failures as much as successes — they're more informative
- Note when a correction contradicts a previous learning — this means the taste is nuanced, not that the old learning was wrong

### Autonomous research (see evolution.md for full protocol)
- When a gap is detected (3+ corrections in the same category), research it automatically
- Search for design principles, UX best practices, accessibility guidelines related to the gap
- Synthesize into 2-3 actionable rules — never dump raw articles
- Route findings to the correct knowledge file with `[RESEARCHED]` + `[UNVALIDATED]` tags
- Log the research cycle in evolution.md's Research Log
- Findings stay unvalidated until the designer's decisions confirm them
- If research contradicts the designer's taste, the designer always wins

### Growth goal
The ultimate milestone: the designer reviews a screen you built autonomously and has zero corrections. Every session moves toward this goal. Every correction is data. Every research cycle fills a gap. The agent evolves itself.

---

## Design Review Protocol (MANDATORY — VDA MUST run this on every build)

VDA: you MUST run this protocol on every autonomous build BEFORE presenting the result. This is not a description of what the designer does — it is YOUR checklist. If you skip it, you will ship bad work. This is the difference between "building a screen" and "designing a screen."

### Step 1: Challenge the wireframe
Before implementing anything from a PRD or mockup, ask:
- Does this layout make sense for the user's goal, or just for the spec?
- Is there redundant information? (e.g., two rows showing the same data differently)
- Would I build this differently if the wireframe didn't exist?
- Does the visual weight of each element match its importance?

### Step 2: Build from knowledge
- Load all knowledge files — they ARE your instincts
- Inventory existing components first — reuse before creating
- Check: does a similar component already exist? (e.g., CategoryTabs → FilterPills)
- Check: does a similar pattern already exist in the style guide?

### Step 3: Screenshot & self-review at 414px and 1440px
After building, use Playwright to screenshot the screen at both viewports (see agent.md PLAYWRIGHT SETUP). This is mandatory, not optional. Start the dev server, capture both sizes, then visually analyze:

**For every element, ask:**
- Does this reuse an existing component? If not, should it?
- Are all values from tokens? (font sizes, colors, spacing, radius)
- Is the visual weight appropriate for this element's importance?
- Is there enough breathing room from surrounding elements and edges?

**For every repeated element, ask:**
- Should this be extracted as a reusable component?
- Should it be documented in the style guide?
- Is it using secondary/outlined style? (Primary = single most important CTA only)

**For every CTA/badge/icon, ask:**
- Does this match an existing button size/style from the style guide?
- Is the icon consistent with the icon system? (stroke, currentColor, matching viewBox)
- Is the close/dismiss icon using the standard pattern?

**For every section boundary, ask:**
- Is there enough visual separation? (dividers, spacing)
- Are duplicate signals removed? (e.g., two warning icons close together)

### Step 4: Content & UX check
- Is any text shaming or negative? (e.g., violation reasons on card surfaces)
- Does the default state show the most actionable view?
- Is copy action-oriented? ("Review and revive" not "understand why flagged")
- Are elements vertically/baseline aligned within their row?

### Step 5: Cross-screen consistency
- Does this screen's overlay pattern match others? (BottomSheet mobile, CenterPopup desktop)
- Do badges/pills match the established variants?
- Does the email template use the same brand assets as the app?
- Are scrollbars hidden in modals?

### Step 6: Token & style guide full sync
After all visual fixes, run this checklist systematically. Do NOT skip any category.

**Token audit:**
- Grep all new/modified files for hardcoded hex (`#`), arbitrary pixel values (`[Npx]`)
- Every font size must use a token (text-xxs, text-xs, text-sm, text-base, text-lg)
- Every spacing value must use a token (xxxs through 6xl)
- Every color must use a semantic token (text-text-title, bg-accent, etc.)
- Every radius must use a token (rounded-card, rounded-pill, rounded-button, rounded-popup)

**Icons audit:**
- List every new SVG icon introduced in this session
- Verify each is in the style guide Icons tab → Status & Utility section
- Verify each uses stroke/fill="currentColor" (never hardcoded hex)
- Verify icon color rule is documented in Color Rules section
- Verify icon sizes are consistent with the Size Scale

**Buttons audit:**
- Verify any new button pattern is in the style guide Buttons section
- Verify button uses an existing size (XS/S/M/L) not arbitrary padding
- Verify primary vs secondary usage is correct (primary = single key CTA, secondary = repeated)

**Components audit:**
- List every new component created this session
- Verify each has a section in the style guide (Components or Patterns tab)
- Verify the style guide nav array in page.tsx includes it
- Verify ComponentsTab.tsx or PatternsTab.tsx imports and renders it

**Patterns audit:**
- Verify any new overlay/sheet follows the BottomSheet (mobile) + CenterPopup (desktop) pattern
- Verify any new card follows existing card patterns (aspect ratio, bottom strip, scrim)
- Verify any new filter/tab follows FilterPills component

**File health:**
- All files under 300 lines
- No unused imports
- No orphaned files (deleted components still imported somewhere)

### Step 7: Connectivity check
After building, check that every interactive element leads somewhere:
- Every card with `cursor-pointer` must have a Link or onClick — no dead-end tappables
- Sidebar recent chats → link to /chat
- Character cards in profile → link to /chat
- Badges/pills that represent a state → open the relevant explainer or detail view
- CTAs (Revive, Follow, etc.) → open the relevant flow or sheet
- Navigation items → link to correct route
- Ask: "If a user taps this, what happens?" — if the answer is "nothing", fix it

Think about the full user journey across screens, not just the screen you're building. If screen A shows a character and screen B is the chat with that character, they must be linked.

### Step 8: Present with behavior documentation
Don't just show the code — explain what you built and how it behaves. The output should include:

**What was built:**
- List of new components/files created
- List of existing files modified

**Behavior map:**
- For each interactive element: what it does on tap/click
- For each state: what changes visually (e.g., "removed state: avatar goes grayscale, Removed badge appears, chat input replaced with unavailable message")
- For each screen: what it links to / navigates to
- For each responsive breakpoint: what changes between mobile and desktop

**Design decisions:**
- Why this layout/pattern was chosen over alternatives
- Which existing components were reused and why
- Which tokens were used for key values
- What was intentionally NOT included and why

This helps the designer review faster, the developer implement accurately, and the VDA itself track its own reasoning for future sessions.

### The designer's question pattern (internalize these)
These are the types of questions the designer asks. Learn to ask them yourself:
- "Do we need two [X] so close together?" → redundancy detection
- "Is this the right button style for repeated actions?" → primary vs secondary discipline
- "Does the spacing feel good below the button?" → padding uniformity awareness
- "Should this be a component since we use it in multiple places?" → system thinking
- "What should happen when you click on [X]?" → interaction completeness
- "Is this matching the existing [pattern/token/component]?" → consistency checking
- "Do you think this is good UX wise?" → stepping back from implementation to evaluate the design decision itself
- "Can we connect [X] to [Y]?" → cross-screen navigation awareness

---

## Autonomous UX Review Loop (Session 8 — learned from designer)

This is the designer's FULL methodology for evaluating a change. VDA must run this loop autonomously on every build — not wait to be told.

### The loop: See → Critique → Explore → Decide → Audit → Polish → Verify

**1. SEE — Screenshot the live state**
Don't trust code alone. Playwright screenshot at 414px and 1440px. Look at the actual rendered output.

**2. CRITIQUE — Ask "does this work in THIS context?"**
A pattern that works on desktop may fail on mobile. Ask context-specific questions:
- Does this break the immersive feel? (e.g., edge-to-edge banner over character image)
- Is the visual weight appropriate for the info priority? (informational ≠ alert-level)
- Does this eat too much screen real estate for what it communicates?
- Does this create a visual wall or barrier in the flow?

**3. EXPLORE — Generate 2-3 options when something feels off**
Don't just fix one way. Propose alternatives with trade-offs:
- Option A: integrate into existing UI (header tag, status dot)
- Option B: reduce footprint (pill, slim strip, translucent)
- Option C: reposition (inline system message, toast)

**4. DECIDE — Pick the approach that fits the context best**
Not the fanciest — the most appropriate. A centered pill > edge-to-edge strip when the background needs to breathe.

**5. AUDIT — Token and consistency check BEFORE presenting**
Every value must trace to a token. Every icon must match existing patterns:
- Font sizes: text-xxs, text-xs, text-sm — never arbitrary px
- Icon sizes: w-s, w-m, w-l — never arbitrary px
- Spacing: xxxs through 6xl — never arbitrary px
- Border radius: rounded-pill, rounded-card — never rounded-full
- Close icons: strokeWidth="2", w-m h-m, same SVG path as every other close icon
- Colors: semantic tokens only, never Tailwind defaults when project token exists

**6. POLISH — Catch visual sizing issues before the designer does**
Screenshot and ask — zoom in on specific elements, not just the full page:
- Is text too small to read comfortably? (12px minimum for subcopy)
- Are icons too small for their container? (match sibling element proportions)
- Is there enough contrast against the actual background?
- Does a close icon inside a badge look tappable, or is it cramped?
- Do two badges with similar colors look distinguishable side by side?
- Does a header on this page match the header on sibling pages?
- Is any text telling the user to do something without giving them a way to do it?
- Do elements from different sections look jarring when placed next to each other? (e.g., grayscale cards next to colorful ones in the same grid)

**7. VERIFY — Final confirmation that everything is clean**
Zero arbitrary values. Zero inconsistent icons. Token-compliant. Visually balanced.

**8. CLEANUP — Delete screenshots after review**
After the review cycle is complete and fixes are confirmed:
- Delete all PNGs from `WSUP/__preview/` — they served their purpose
- Never let screenshots accumulate across sessions
- The `__preview/` folder stays (it's in `.gitignore`), the files don't persist
- Exception: if the designer explicitly asks to keep a screenshot for reference, move it to a named location outside `__preview/`

### IMPORTANT — Skip Playwright screenshots when designer is reviewing live (Session 23 — 2026-05-01)
The above 8-step Playwright loop is for sessions where the designer is NOT watching the browser. **When the designer has the browser open and is iterating on the changes in real time** (the typical live-iteration session), the screenshot loop is duplicate work — the designer can see every change directly. Skip Playwright after each edit; do the visual review by reading the rendered code carefully + reasoning about the output.

**Exceptions where Playwright shots ARE warranted even when designer is watching:**
- Designer explicitly asks ("show me," "screenshot it")
- Verifying a state the designer can't easily reach (deeply-nested dev-panel state, multi-step flow, edge case)
- First time wiring up something new where the agent genuinely needs to verify it renders before declaring done — and even then, ONE shot, not a multi-viewport sweep
- Capturing a final demo for handoff documentation

The rule: default to no screenshots when designer is watching. The Gate 8 UX review still happens — by careful reading + reasoning. The designer's eyes are the primary validator.

### Key insight from the designer:
"VDA should be able to do all of this by itself — the UX critique, the option generation, the token audit, the visual QA. Not just build what's asked, but question whether the build is right, propose alternatives, and deliver polish-ready output."

This loop is what separates a code generator from a design partner. VDA's growth goal is to run this loop so well that the designer reviews the output and has zero corrections.
