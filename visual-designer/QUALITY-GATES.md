# WSUP Quality Gates — Mandatory Checklist

Run this checklist on every visual change, component edit, or token change. **DUAL-CADENCE MODEL — see `workflow.md` for full protocol:** during a session, only the lightweight gates run inline (Gates 0, 1 flag-only, 2, 7, 8 + scratchpad write); the heavyweight gates (Gate 5 style-guide sync, Gate 6 decisions.md promotion, Gate 1 token-creation migrations) run on **designer-triggered audit pass** ("audit", "consolidate", "health check", etc.). This keeps iteration fast while the codified knowledge stays correct.

**Why the cadence change (S32 follow-up #3 audit lesson):** running every gate inline at every correction-resolution turn was making iteration ~3× slower than necessary. The previous "Component + Style Guide + VDA = one atomic edit" rule was right in *spirit* (no audit drift) but wrong in *timing* (the heavy gates can be batched if a lightweight scratchpad captures the WHY in the moment). The scratchpad → audit-pass model preserves Gate 6 fidelity (decision freshness) while letting iteration breathe.

---

## CHANGE-SCOPE TRIAGE (run before anything else)

Not every change needs all 8 gates. Classify the change first, then run the matching gate set. **Under the dual-cadence model, mandatory gates inline are LIGHT only; the heavy ones (Gate 5 style-guide sync, Gate 6 decisions.md promotion, Gate 1 token migrations) defer to the audit pass.**

| Scope | Examples | Mandatory inline | Scratchpad flag (handled at audit) |
|---|---|---|---|
| **Tweak** | Fix a padding, reword a label, swap an icon, adjust spacing, fix a bug | 0 (precedent grep), 1 (flag if new value at threshold), 7 (consistency), 8 (UX review) + scratchpad row | Style-guide entry if any referencing section exists |
| **Component edit** | New prop/variant, changed visual of existing component, refactor inline → reusable | Add 2 (reuse + sibling-inheritance §2.2) | Style-guide section update + decisions.md row + taste-rule promotion if universal language |
| **New component or new pattern** | A brand new shared component, a new responsive overlay, a new screen | **ALL 8 gates lightweight pass** (precedent grep, primitive reuse, sibling-inheritance, UX review) | Full Gate 5 sync (new section file + ComponentsTab/PatternsTab + NAV array) + Gate 6 promotion + token migrations |

**Rules for the triage itself:**
- When in doubt, go up one level, not down — a "tweak" that turns into a pattern is worse than an over-audited tweak
- Gate 8 (UX review) is *always* on inline, regardless of scope — a designer's eye never hurts
- If your change touches 2+ files, it's almost certainly not a Tweak
- If you find yourself extracting a component mid-edit, stop — you've crossed into "New component" territory; flag every gate's audit-pass needs in scratchpad

**Why this exists:** Most sessions are iterations on established patterns, not pattern-establishing work. Running the full 8 gates inline on every one-line padding fix is bureaucracy that burns time without catching real issues. The dual-cadence model batches the heavy gates to the deliberate audit pass; the scratchpad captures WHY in the moment so the audit doesn't backfill from memory.

---

## GATE 1 — TOKENIZED

Before finishing any edit, scan all class values in the changed code:

- [ ] No raw hex colors in classNames (use token: `text-accent`, `bg-status-warning`, etc.)
- [ ] No raw px in classNames for spacing/padding/gap/margin (use: `p-s`, `gap-m`, `px-xl`, etc.)
- [ ] No raw rgba() in classNames (use: `bg-white-10`, `text-white-50`, etc.)
- [ ] No arbitrary text sizes like `text-[13px]` (use: `text-xs`, `text-sm`, `text-base`, etc.)
- [ ] If a raw value appears 3+ times with no existing token → CREATE a new token

**Accepted exceptions (do NOT tokenize these):**
- Opacity modifiers on existing tokens: `bg-status-warning/[0.20]`
- Structural one-off dimensions (header heights, toggle widths): `h-[56px]`, `w-[36px]`
- Email template inline styles (email clients require inline CSS)
- SVG width/height attributes
- CSS triangle hacks (border-based arrows in Coachmark etc.)
- Near-match micro-adjustments where forcing to nearest token would break the design: `py-[3px]`, `gap-[6px]`, `pb-[14px]`

**When a raw value crosses the 3-instance threshold during a session:**
- **Inline:** add a scratchpad line flagging the violation. Do NOT migrate inline.
- **Audit pass:** add the new token to `tailwind.config.ts`, migrate all usages, update the corresponding style guide token section, log the decision in `decisions.md`.

---

## GATE 2 — REUSE EXISTING COMPONENTS AND SIBLING-SURFACE ANATOMY

Two layers: primitives (don't re-write a button) AND sibling surfaces (don't re-invent a card's anatomy when a sibling card already nails it).

### 2.1 Primitive reuse — before building any UI element:

- [ ] Check `src/components/ui/` for existing components
- [ ] Check `src/components/shared/` for shared components
- [ ] Check `src/components/profile/` and `src/components/chat/` for domain components
- [ ] If a component exists that does 80%+ of what you need, add a prop/variant — don't create a new component
- [ ] If you're about to write a button, modal, sheet, form input, popover, tooltip, or pill — stop and check first. These all exist.

### 2.2 Sibling-surface inheritance (added S32 follow-up #3 — see "VDA would have produced what I produced" honest assessment)

Before building any **new surface in a domain** (a card, banner, popup, panel, list row, message bubble, badge), grep the codebase for sibling surfaces that play similar roles and **inherit their anatomy**:

- [ ] Identify the surface's *role* — what category does it belong to? (character-preview-card, status-banner, intervention-popup, message-bubble, action-card, etc.)
- [ ] Grep for existing surfaces in the same role:
  - Character-preview card → `CharacterCard` (explore-page anatomy: aspect-[9/16], image fills, overlay content with gradient scrim)
  - Status banner → `DormancyBanner` / `LowCreditsBanner` (bg-white-05 + border-white-10, glass-equivalent for chat-bound)
  - Intervention popup → `MemoryLimitOverlay` (custom scrim, character-voice copy)
  - Message bubble → `ChatMessages.AIBubble` (bg-chat-ai-bubble, asymmetric border radii, tail at bottom-left)
  - Action card → `BuyCreditsPromoCard`, `CreditServicePopup` chrome
  - List row → `UserListRow` (when extracted), `RewardRow`
  - Dev panel → `ChatDevPanel`, `ExploreDevPanel` (two-axis layout)
- [ ] **If a sibling exists, INHERIT its visible chrome**: same surface bg, same border, same gradient scrim placement, same typography density, same case conventions (ALL CAPS vs Title Case vs sentence case), same italic-or-not.
- [ ] Justify any DIVIATION from the sibling's anatomy in the scratchpad/decisions row.
- [ ] **The grep is part of the change** — if you finish the surface and didn't grep its siblings first, that's a Gate 2 fail. Treat it as a watch item even if the result looks clean.

**Why this exists:** the recurring failure mode in S32 was *wireframe-faithful first-pass that diverges from the established WSUP precedent.* DeckCard's first build had a 2-zone (image + body) layout because the wireframe showed that — but the explore CharacterCard's *image-fills + content-overlays* anatomy was the established pattern, and once switched to it, the design clicked. Same shape with the opening bubble (should have mirrored `ChatMessages.AIBubble` from the start). Same shape with tag-row casing (should have mirrored CharacterCard's title case).

**Pre-flight diff against precedent:** when iterating on a surface that has a sibling, mentally diff: *"does the new surface match the sibling on chrome, typography, casing, and density? If not, why is the deviation worth it?"* Three reasons for deviation are valid: (a) different content density needs (S31's amended audience-density rule); (b) different role at the same scale (active-card vs preview-card); (c) explicit designer call to deviate. Other deviations = drift; revert to sibling.

**Difference from Gate 0 (precedent grep on TOKENS):** Gate 0 prevents pixel-level token drift (`bg-X` for a banner). Gate 2.2 prevents *anatomy-level* drift (the whole card's layout structure). Both run before writing; Gate 0 is "which tokens", Gate 2.2 is "which composition".

---

## GATE 3 — COMPONENTIZE AT 2

After making changes, check for duplication:

- [ ] Does the same markup + token pattern appear twice (even across different files)?
- [ ] If YES → extract into a shared component immediately
- [ ] Replace both usages with the new component
- [ ] Threshold is 2, not 3

**Where to put the extracted component:**
- Generic UI element (button variant, accordion, empty state) → `src/components/ui/`
- Used across multiple pages but tied to a domain (character card, stat pill) → `src/components/shared/`
- Only used within one page's ecosystem (profile-specific overlays) → `src/components/profile/` or `src/components/chat/`

**When extracting a new component:**
- **Inline:** create the component file, replace all duplicate usages, add a scratchpad line.
- **Audit pass:** add a showcase in the relevant style guide section, log the full decision in `decisions.md` with reasoning + alternatives considered.

---

## GATE 4 — PATTERNIZE AT 2

Check for repeated component combinations:

- [ ] Are two or more components arranged together in the same layout/structure twice?
- [ ] The combination must be non-trivial — not just "a Button inside a div" but a specific layout like "DormancyBanner + disabled input bar for removed characters" or "SubpageHeader + TabBar + scrollable content"
- [ ] If YES → document as a pattern in `src/app/style-guide/sections/patterns/`

**What counts as a pattern:**
- A specific arrangement of 2+ components that appears on 2+ screens
- A layout structure with consistent spacing, order, and behavior
- A component + its context (e.g., a card inside a specific grid layout)

**What does NOT count:**
- A single component used in different places (that's just reuse)
- Generic flex/grid layouts (that's just CSS)
- A component with its standard props (that's just usage)

**When creating a new pattern:**
- **Inline:** add a scratchpad line capturing the pattern + which surfaces share it.
- **Audit pass:** create or update the pattern section in style guide, add to PatternsTab if new, add nav entry in `page.tsx` NAV.Patterns array, log the decision in `decisions.md` with full reasoning.

---

## GATE 5 — STYLE GUIDE SYNC (DEFERRED TO AUDIT PASS)

**Cadence:** runs on designer-triggered audit pass, NOT inline per-edit. During a session, note style-guide-relevant changes in `scratchpad.md`; the audit pass sweeps them.

For every visual change captured in the scratchpad since the last audit, verify style guide is updated:

### Mechanical pre-edit check (run inline as a SCRATCHPAD FLAG, sync at audit)

**Before editing ANY component file, run this check and flag the result in scratchpad:**
1. Grep `style-guide/sections/**` for the component name. If a section exists that imports it OR demonstrates its visual anatomy → that section is part of the AUDIT-PASS scope; note in scratchpad.
2. Grep `style-guide/sections/**` for inline mockups of the component (sections that re-implement the component's structure inline rather than importing it — common for `ChatBarSection`, `ChatHeaderSection`, `ChatMessagesSection`). If any inline mockup matches the visual you're changing → audit-pass scope; note in scratchpad.

**This converts Gate 5 from a "did the language change?" judgment call into a file-presence rule.** Either a referencing section exists or it doesn't. If it does, the audit pass syncs both. The pre-edit check still runs inline because the grep is cheap; the SYNC is the deferred part.

### For new primitives in `ui/`

A new primitive's audit-pass exit criteria — ALL THREE must happen by the next audit:
1. A standalone section file is created (e.g., `style-guide/sections/components/{Name}Section.tsx`)
2. That section is imported and rendered in `ComponentsTab.tsx`
3. The section's title is added to the `NAV.Components` array in `style-guide/page.tsx`

"Mentioned in another section's anatomy notes" does NOT satisfy Gate 5 for a new primitive. The reader of the style guide must be able to find it as its own entry.

**Inline:** scratchpad row noting the new primitive + its anticipated section name.

### Component changes:

**Component changes:**
- [ ] New component → add showcase in existing or new style guide section
- [ ] New variant/prop → add example showing the new variant
- [ ] Changed visual (colors, spacing, copy, icons) → update the style guide example to match
- [ ] New section → register in ComponentsTab or PatternsTab AND add to `page.tsx` NAV array

**Token changes:**
- [ ] New color token → add swatch to ColorsSection
- [ ] New spacing token → add to SpacingSection
- [ ] New utility class → add to UtilitiesSection
- [ ] Modified token value → update the style guide display

**Copy changes:**
- [ ] If any user-facing text changed, check if it appears in a style guide example and update it

---

## GATE 6 — VDA LEARNS (SPLIT: INLINE SCRATCHPAD + AUDIT-PASS PROMOTION)

> **HARD FAIL TRIGGER (updated S32 follow-up #3 audit):** if the designer ever asks "is VDA learning?", "did you log this?", "is the scratchpad written?", or runs the health check unprompted mid-session — Gate 6 has *already* failed for this session, regardless of how complete the audit looks afterward. The asking IS the failure. **The trigger now points at the SCRATCHPAD during a session and at decisions.md post-audit.** Both must be current. Self-monitor: if you can imagine the designer being moved to ask the meta-question, log NOW before they have to.

Gate 6 is now a two-stage gate:

**6a — INLINE (during session, every correction-resolution):** write one scratchpad line in `visual-designer/scratchpad.md`. Format: `YYYY-MM-DD HH:mm — <file/component> — <what changed> — Why: <one phrase>`. Fast (5–10 sec). Captures freshness of WHY.

**6b — AUDIT PASS (designer-triggered):** read scratchpad → write proper decisions.md rows with full reasoning. Promote universal-language rules to taste.md / knowledge-base.md / reasonings.md. Run the Gate 6.5 generalization + cross-rule check on each row. Wipe scratchpad after promotion.

The original codified per-edit rule ("write decisions.md row BEFORE sending the reply that resolves a correction") evolves: now it's *"write SCRATCHPAD row BEFORE sending the reply."* Same discipline, lighter weight. The audit pass owns the heavy lift.

### The trigger is the correction loop closing, NOT the edit completing

Every time the designer says *"no"*, *"actually"*, *"let's change"*, *"we don't need"*, *"why did you..."*, or asks a clarifying question that produces a new decision — that's a correction loop. **Before sending the reply that resolves it, write a SCRATCHPAD line capturing the change + the why-in-one-phrase. Same turn. Not "after a few more edits."** If you respond to a correction and there's no new scratchpad row, you batched.

Real-time means: scratchpad → reply. In that order. If the reply ships first, you're already late. The full decisions.md row is promoted at the audit pass — but the scratchpad freshness still has to be live during the session.

### Routing table — kills the "where does this go?" cognitive cost

| The insight is... | Goes in | Trigger words |
|---|---|---|
| A specific choice + WHY for this case | `decisions.md` | *"I picked X over Y because"* |
| An aesthetic/visual rule that applies broadly | `taste.md` | *"always", "never", "any time", "whenever"* |
| A *class of decisions* principle | `reasonings.md` | *"the way to think about this is", "anytime you face X"* |
| Confirmed default rule with 2+ uses | `knowledge-base.md` | *"this has now happened twice"* |
| WSUP-specific architecture/domain fact | `project-insights.md` | *"in WSUP", "this product's flow"* |
| Process/cadence/operating rule | `workflow.md` | *"the way VDA operates"* |
| Phase transition or gap status | `evolution.md` | *"VDA matured to" / "active gap"* |

### Per-correction (inline, while iterating)
- [ ] Add a scratchpad line: `YYYY-MM-DD HH:mm — <file> — <what changed> — Why: <one phrase>`
- [ ] No decisions.md write inline — that's the audit pass's job

### Per-audit (designer-triggered)
- [ ] Promote every scratchpad entry to a proper `decisions.md` row with full reasoning + alternatives considered
- [ ] Run the **Generalization Probe** (Gate 6.5 below) on each promoted row
- [ ] Run the **Rule-conflict cross-check** on each promoted row
- [ ] Wipe the scratchpad after promotion (append-only during session → empty after audit)

### Per-session (at session end OR final audit of the session)
- [ ] Append session entry to `session-logs.md` — what was built, changed, learned, **+ structured field `designer_caught_count: N`** (count of UX issues the designer pointed out that you should have caught)
- [ ] If a new design rule or pattern emerged → add to `knowledge-base.md`

Note: scratchpad is per-correction-loop (atomic with the resolution). `decisions.md` is the audit-pass artifact. `session-logs.md` is per-session (summary at the end). Don't conflate them.

---

## GATE 6.5 — GENERALIZATION PROBE

After logging a decision, immediately ask:

> *"Is there a transferable principle here that applies beyond this case?"*

If **yes** → sibling entry in `taste.md` (aesthetic/visual rule) or `reasonings.md` (class-of-decisions principle).

The decision entry captures **the moment** (this specific choice in this specific context). The taste/reasonings entry captures **the generalization** (the rule that explains a whole class of moments). Without this step, `decisions.md` becomes a graveyard of orphaned moments and the rules never compound across sessions.

**Trigger words signal generality** — when the decision text uses *"always", "never", "every", "all", "any X", "whenever"*, the decision IS already a rule and demands a sibling entry. Don't bury a rule inside a single decision.

**Examples from past sessions (right routing):**
- *Decision*: "Apple = `bg-black + border-white-20`, Google = `bg-white`" → *Sibling taste rule*: "Brand-pure pairing: when stacking provider sign-in buttons, differentiate by brand color, not layout."
- *Decision*: "Variant pills float OUTSIDE the popup with 10px gap" → *Sibling taste rule*: "Dev controls live OUTSIDE the design surface, not inside it."
- *Decision*: "Distinct copy for inactive vs moderation, equal text/icon shades" → *Sibling taste rule*: "When two states share visual treatment, their token shades must match exactly."

If you write a decision with universal language but skip the taste/reasonings sibling, the audit (Health Check #6 — Purpose Fit) will catch it as a misroute.

### Rule-conflict cross-check (added at S28)

After logging a decision AND running the generalization probe, run a third pass:

> *"Does this decision contradict any codified rule in `taste.md`, `knowledge-base.md`, or prior `decisions.md`? If yes, is the contradiction the right one — and how should the existing rule be amended?"*

A new decision can superficially violate an existing rule without being wrong. The S28 example: *"Unblock from the blocked-list flips CTA in place, single-tap, no confirm"* superficially conflicts with the codified rule *"Block needs confirm."* The resolution wasn't to ignore the conflict; it was to amend the codified rule with a scope clause: *deliberate-management-context relaxes confirmation friction.*

**Three possible outcomes when a conflict surfaces:**
1. **The new decision is wrong** → don't ship; revisit the design with the existing rule in force.
2. **The existing rule needs a scope clause** → amend the rule with the boundary condition (when it applies, when it doesn't); ship the decision.
3. **The existing rule is wrong** → delete it; ship the decision; log the deletion in `decisions.md` as a meta-decision.

**Why this is its own check:** Gate 6 logs the moment. Gate 6.5's generalization probe surfaces the principle. The rule-conflict pass surfaces the *cross-rule consistency* — without it, `taste.md` accumulates contradictory rules over sessions and VDA can defend any decision by citing whichever rule supports it. The cross-check forces the rule library to stay internally coherent.

**Hard signal:** if a decision uses qualifiers like *"in this case"*, *"because of the management context"*, *"unlike the public profile"* — those qualifiers are the sign that an existing rule's scope is being narrowed. Capture the narrowing on the existing rule, not just the decision.

---

## GATE 7 — UX CONSISTENCY

Think like a UX designer at every step. Before implementing anything, check how similar things already work in the project and follow the same pattern.

**Figma is a reference, not a final rule.** When a Figma value (text size, font weight, color, radius) conflicts with a codified rule in `taste.md` or `decisions.md`, the WSUP taste rule wins. Always cross-reference before writing tokens. Recurring examples: Figma shows `font-semibold` buttons — taste says `font-medium`. Figma shows 10px subcopy — taste says 12px minimum. Adapt the spec, don't pixel-match it.

- [ ] **Interactions:** If a keyboard shortcut exists for a similar feature (e.g., R key for dev togglers), use the same key — don't invent a new one
- [ ] **Visual patterns:** If links, buttons, badges, empty states, or cards have an established style, use it — don't create a variation
- [ ] **Copy patterns:** If the project uses a specific tone (descriptive, not prescriptive), follow it in every new string
- [ ] **Layout patterns:** If similar content is laid out a certain way on other pages, match it
- [ ] **State logic:** If zero data means "show CTA only" (not CTA + empty states from other tabs leaking through), make sure the logic is clean
- [ ] **Dev tools:** All dev togglers use the same panel style, same key pattern (R toggle, Shift+R cycle), same position (fixed bottom-right)

**How to apply:** Before writing any UI code, ask: "How does this already work elsewhere in WSUP?" If there's a precedent, follow it. If there isn't, you're establishing one — make it intentional and document it.

---

## GATE 8 — UX REVIEW (THINK LIKE A DESIGNER)

After every change — before saying "done" — look at what you built as a UX designer would. Not a developer checking if code compiles, but a designer checking if the experience is right.

**Ask yourself:**
- [ ] **Is it readable?** Can a user instantly understand what they're looking at? If an icon or illustration is abstract or ambiguous at the rendered size, it fails. (Learned: SVG illustrations were unreadable at 48px)
- [ ] **Is the spacing balanced?** No double gaps from nested padding. No elements floating too far from related content. Group related things tightly. (Learned: button was 64px away from its label due to nested py-4xl + gap-m)
- [ ] **Is it tappable on mobile?** Links need visible underlines, not hover-only. Buttons need adequate hit targets. Touch has no hover state. (Learned: Contact support link was invisible on mobile)
- [ ] **Does it make sense at all viewport sizes?** Text that fits on desktop may wrap on 2-col mobile. Test mentally at 180px card width. (Learned: "Last chatted 34d ago" wrapped at mobile widths)
- [ ] **Is every piece of information clear without context?** If you need surrounding context to understand a value (like "34d" meaning "last chatted 34 days ago"), it's not clear enough.
- [ ] **Is the hierarchy right?** Primary info should be largest/brightest, secondary should recede via color not size. Don't use size to demote meaningful data.
- [ ] **Does empty state make sense?** If there are zero items, only show what's relevant to that state. Don't leak empty states from other tabs/sections.

### Gate 8.2 — State matrix visibility (primitives)

When an edit touches an interactive primitive (checkbox, toggle, button, input) or uses one in a new context, render every state and verify each is visually distinct:

- [ ] Checkbox: checked AND unchecked both visible at rendered size (the unchecked state has been a recurring blind spot — verify it has a visible border/edge against the surface behind it)
- [ ] Button: enabled AND disabled both visually distinct (disabled = `opacity-40 cursor-not-allowed` per Button primitive)
- [ ] Input: empty placeholder, focused, filled, error states all readable
- [ ] Toggle/pill: active AND inactive distinguishable without hover

**Why this is its own sub-gate:** Gate 8 reviews the composed UI top-down ("does the screen feel right?"). Gate 8.2 reviews the *atoms* the screen depends on ("does each state of each primitive render correctly?"). A composed UI can pass top-down review while an underlying primitive ships a broken state — that bug only surfaces when the user lands on that exact state. If you can't show all states of a primitive on demand, you haven't reviewed it.

### Gate 8.4 — Spacing-content fit re-check (after additions or removals)

When the *content* of a surface changes — a card removed, a paragraph dropped, a section added, copy condensed — the *spacing tokens* you inherited were calibrated to the OLD content. Old `pt-6xl` cleared 80px because the old stack was 5+ elements; with the new 4-element stack, the same padding reads as accidental empty air. Old flat `gap-m` between every element was acceptable in a long stack; in a short stack it flattens semantic groups that used to be visually separated by sheer length.

When you add or remove content from a surface, run this checklist before declaring done:

- [ ] **Top/bottom padding** still proportional to the new content density? Or now too loose / too tight?
- [ ] **Inter-element gaps** still serving the new semantic groupings? (title+body as one unit, CTA+secondary as one unit) Tight WITHIN groups, wider BETWEEN them — see taste.md *"Spacing is hierarchy"*
- [ ] **Structural separators** (dividers, hairlines) — were they grouping a long stack? Do they still earn their slot in the new shorter stack? If the stack drops below 4 elements, dividers usually become visual fragmentation, not grouping
- [ ] **Surface aspect ratio** — does the new content make the surface read as too tall / too short / off-balance? Old `min-h` may now produce dead space; old fixed height may now clip
- [ ] **Did I retune in the SAME edit as the content change?** If "step 1" was the content change and "step 2 — retune" landed in a separate review pass, you shipped a state where spacing didn't fit content

**Why this is its own sub-gate:** Gates 8.0/8.2/8.3 review the screen as it stands. Gate 8.4 reviews the *delta*: when you change WHAT is on the surface, the HOW of its arrangement needs a paired pass. The recurring failure mode (S26: 3 catches, all variants of "spacing not retuned to new content") was *string-substitution thinking* — replacing the elements the user mentioned without reviewing the surface as a whole. Code-generator behavior, not designer behavior.

### Gate 8.3 — Text emphasis hierarchy

Scan every text element on the screen top-down. Does each element's opacity/color class match its semantic role?

WSUP's hierarchy (from `taste.md`):
- `text-text-title` (100%) — names, section headings, primary values
- `text-text-subtitle` (80%) — data values, active states
- `text-text-body` (70%) — body copy, descriptions, readable sentences
- `text-text-small` (60%) — secondary labels, captions, meta labels
- `text-text-xsmall` (50%) — metadata, stat labels, low-priority info
- `text-text-dim` (40%) — de-emphasized metadata
- `text-text-xxsmall` (30%) — legal, copyright, footer-fine-print ONLY

**Red flags:**
- Body/readable copy at 40% or below ("too dim to read comfortably")
- Metadata or captions at 100% white ("competing with the primary")
- Informational footnotes at 30% (reserved for legal only)
- Sibling elements with the same semantic role but different opacities
- Primary value de-emphasized by using 70% when it should be 100%

**How to apply:** Before shipping, mentally tag every text element by role (title/body/label/meta/legal), then verify the class matches. Common drift: "let me make this just a bit dimmer" ends up at 30% when it should be 50%. If a caveat/hint is meaningful enough to show, it's probably a 40-50% text, not a 30%.

**This is not optional.** Every visual change gets a UX review before it ships. The designer should never have to point out spacing issues, unreadable icons, or mobile problems — you catch them yourself.

**When to run this gate:**
- BEFORE: Read QUALITY-GATES.md at the start of every WSUP task to prime your thinking
- AFTER: Run all 8 gates after completing the change, with Gate 8 as the final visual sanity check

---

## THRESHOLDS SUMMARY

| What | Threshold | Action |
|------|-----------|--------|
| Duplicate markup pattern | 2 | Extract to shared component |
| Duplicate component arrangement | 2 | Document as pattern |
| Raw value without token | 3+ | Create new token |
| Component variant needed | 1 | Add prop to existing component (don't create new) |

---

## HOW TO VERIFY

After completing changes, run these checks:

**Check for raw spacing violations:**
```
grep -rn 'p-\[.*px\]\|gap-\[.*px\]\|text-\[.*px\]' src/components/ src/app/ --include="*.tsx" | grep -v node_modules
```

**Check for raw hex colors in classNames:**
```
grep -rn 'bg-\[#\|text-\[#\|border-\[#' src/components/ src/app/ --include="*.tsx" | grep -v node_modules
```

**Check build passes:**
```
npx next build 2>&1 | grep -E "error|Compiled"
```

**Check no p-[10px] crept back (use p-icon-btn):**
```
grep -rn 'p-\[10px\]' src/ --include="*.tsx"
```

Note: These greps catch classNames but NOT inline styles. For inline styles, manually review any `style={{` in the changed files — email templates are exempt, gradients and transforms are acceptable, but hex colors and px values that have tokens are not.

---

## WHEN TO RUN

- **BEFORE every WSUP task:** Read this file first. Prime your brain with the gates before writing any code.
- **DURING every correction-resolution:** run the INLINE light gates (0, 1 flag-only, 2, 7, 8) + write a scratchpad row. Defer the heavy gates (1 migrations, 3, 4, 5, 6) to the audit pass.
- **AT designer-triggered audit:** run the heavy gates against the scratchpad. Promote, sync, migrate, verify.
- **This applies to both Claude and VDA.** No exceptions, no shortcuts.

## REMEMBER (dual-cadence model — supersedes the pre-S32 "SAME EDIT" rule)

- **Inline contract:** correction-resolution → scratchpad row → reply. In that order. If reply ships without scratchpad, you batched and the audit pass will backfill from memory (failure mode).
- **Audit contract:** designer triggers audit (any semantic phrase — see workflow.md) → scratchpad promotes to decisions.md / taste.md / knowledge-base.md / style-guide-sections / token-migrations → scratchpad wipes → build verifies.
- **What "done" means now:** during a session, a change is "done" when the code edit lands AND the scratchpad row is written AND the inline light gates passed. The style-guide sync / decisions.md row land at the audit, not at the edit.
- VDA follows the same dual-cadence when building screens autonomously.
- **The designer should never have to catch UX issues.** Spacing, readability, mobile behavior, empty state logic — you catch these yourself at Gate 8 inline. If the designer points it out, you failed Gate 8 (which is always inline, no audit deferral for Gate 8).
