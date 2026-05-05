# WSUP Quality Gates — Mandatory Checklist

Run this checklist after EVERY visual change, component edit, or token change in the WSUP project. Nothing is "done" until all gates pass. Component + Style Guide + VDA = one atomic edit. Never split them.

---

## CHANGE-SCOPE TRIAGE (run before anything else)

Not every change needs all 8 gates. Classify the change first, then run the matching gate set. This prevents ceremony bloat on small tweaks.

| Scope | Examples | Mandatory gates | Skip by default |
|---|---|---|---|
| **Tweak** | Fix a padding, reword a label, swap an icon, adjust spacing, fix a bug | 1 (tokens), 7 (consistency), 8 (UX review) | 2, 3, 4, 5, 6 |
| **Component edit** | New prop/variant, changed visual of existing component, refactor inline → reusable | add 2 (reuse), **5 (style guide) — ALWAYS if a referencing section exists, no "if visual language changed" loophole** | 3, 4 unless duplication appears |
| **New component or new pattern** | A brand new shared component, a new responsive overlay, a new screen | **ALL 8 gates** | — |

**Rules for the triage itself:**
- When in doubt, go up one level, not down — a "tweak" that turns into a pattern is worse than an over-audited tweak
- Gate 8 (UX review) is *always* on, regardless of scope — a designer's eye never hurts
- If your change touches 2+ files, it's almost certainly not a Tweak
- If you find yourself extracting a component mid-edit, stop — you've crossed into "New component" territory, run all 8 gates

**Why this exists:** Most sessions are iterations on established patterns, not pattern-establishing work. Running the full 8 gates on every one-line padding fix is bureaucracy that burns time without catching real issues.

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

**When creating a new token (threshold: 3+ usages):**
1. Add to `tailwind.config.ts` (spacing, colors, radius, shadow, blur — wherever it belongs)
2. Update the corresponding style guide token section (SpacingSection, ColorsSection, etc.) — SAME EDIT
3. Log the decision in `visual-designer/decisions.md` — SAME EDIT

---

## GATE 2 — REUSE EXISTING COMPONENTS

Before building any UI element:

- [ ] Check `src/components/ui/` for existing components
- [ ] Check `src/components/shared/` for shared components
- [ ] Check `src/components/profile/` and `src/components/chat/` for domain components
- [ ] If a component exists that does 80%+ of what you need, add a prop/variant — don't create a new component
- [ ] If you're about to write a button, modal, sheet, form input, popover, tooltip, or pill — stop and check first. These all exist.

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
1. Create the component file
2. Replace all duplicate usages
3. Add a showcase in the relevant style guide section — SAME EDIT
4. Log the decision in `visual-designer/decisions.md` — SAME EDIT

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
1. Create or update pattern section in style guide
2. Add to PatternsTab if new section
3. Add nav entry in `page.tsx` NAV.Patterns array
4. Log the decision in `visual-designer/decisions.md` — SAME EDIT

---

## GATE 5 — STYLE GUIDE SYNC

For every visual change, verify style guide is updated IN THE SAME EDIT.

### Mechanical pre-edit check (no interpretation, no triage subjectivity)

**Before editing ANY component file, run this check:**
1. Grep `style-guide/sections/**` for the component name. If a section exists that imports it OR demonstrates its visual anatomy → that section is part of THIS edit's scope.
2. Grep `style-guide/sections/**` for inline mockups of the component (sections that re-implement the component's structure inline rather than importing it — common for `ChatBarSection`, `ChatHeaderSection`, `ChatMessagesSection`). If any inline mockup matches the visual you're changing → that section is part of THIS edit's scope too.
3. After making changes to the component, re-grep to verify each section that referenced the OLD visual now matches the NEW visual. Anatomy notes, inline previews, when-to-use examples — all of it.

**This converts Gate 5 from a "did the language change?" judgment call into a file-presence rule.** Either a referencing section exists or it doesn't. If it does, you edit both files in the same edit. No exceptions for "small changes" or "I'm just removing an element."

### For new primitives in `ui/`
A new primitive isn't done until ALL THREE happen in the same edit:
1. A standalone section file is created (e.g., `style-guide/sections/components/{Name}Section.tsx`)
2. That section is imported and rendered in `ComponentsTab.tsx`
3. The section's title is added to the `NAV.Components` array in `style-guide/page.tsx`

"Mentioned in another section's anatomy notes" does NOT satisfy Gate 5 for a new primitive. The reader of the style guide must be able to find it as its own entry.

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

## GATE 6 — VDA LEARNS

> **HARD FAIL TRIGGER:** if the designer ever asks "is VDA learning?", "did you log this?", or runs the health check unprompted mid-session — Gate 6 has *already* failed for this session, regardless of how complete the audit looks afterward. The asking IS the failure. Self-monitor against this signal: if you can imagine the designer being moved to ask the meta-question, log NOW before they have to.

Update VDA knowledge files for every visual change.

### The trigger is the correction loop closing, NOT the edit completing

Every time the designer says *"no"*, *"actually"*, *"let's change"*, *"we don't need"*, *"why did you..."*, or asks a clarifying question that produces a new decision — that's a correction loop. **Before sending the reply that resolves it, write the decision + reasoning in `decisions.md`. Same turn. Not "after a few more edits."** If you respond to a correction and there's no new entry, you batched.

Real-time means: log → reply. In that order. If the reply ships first, you're already late.

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

### Per-edit (same edit as the change)
- [ ] Add a row to `decisions.md` — what was decided + why
- [ ] Run the **Generalization Probe** (Gate 6.5 below) before considering Gate 6 complete

### Per-session (at session end)
- [ ] Append session entry to `session-logs.md` — what was built, changed, learned, **+ structured field `designer_caught_count: N`** (count of UX issues the designer pointed out that you should have caught)
- [ ] If a new design rule or pattern emerged → add to `knowledge-base.md`

Note: `decisions.md` is per-correction-loop (atomic with the resolution). `session-logs.md` is per-session (summary at the end). Don't conflate them.

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
- **AFTER every WSUP change:** Run all 8 gates. Gate 8 (UX Review) is the final check — look at what you built as a designer, not a developer.
- **This applies to both Claude and VDA.** No exceptions, no shortcuts.

## REMEMBER

- **"Same edit"** means the component file, style guide section, and VDA decision are updated together. Not "same session" — SAME EDIT.
- A visual change is NOT complete until all 3 are updated.
- If you say "done" before all gates pass, you are wrong.
- VDA follows these same gates when building screens autonomously.
- **The designer should never have to catch UX issues.** Spacing, readability, mobile behavior, empty state logic — you catch these yourself at Gate 8. If the designer points it out, you failed the gate.
