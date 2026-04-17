# WSUP Quality Gates — Mandatory Checklist

Run this checklist after EVERY visual change, component edit, or token change in the WSUP project. Nothing is "done" until all gates pass. Component + Style Guide + VDA = one atomic edit. Never split them.

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

For every visual change, verify style guide is updated IN THE SAME EDIT:

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

Update VDA knowledge files for every visual change:

**Per-edit (same edit as the change):**
- [ ] Add a row to `visual-designer/decisions.md` — what was decided + why

**Per-session (at session end):**
- [ ] Append session entry to `visual-designer/session-logs.md` — what was built, changed, learned
- [ ] If a new design rule or pattern emerged → add to `visual-designer/knowledge-base.md`

Note: `decisions.md` is per-edit (atomic with the change). `session-logs.md` is per-session (summary at the end). Don't conflate them.

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

## REMEMBER

- **"Same edit"** means the component file, style guide section, and VDA decision are updated together. Not "same session" — SAME EDIT.
- A visual change is NOT complete until all 3 are updated.
- If you say "done" before all gates pass, you are wrong.
- VDA follows these same gates when building screens autonomously.
