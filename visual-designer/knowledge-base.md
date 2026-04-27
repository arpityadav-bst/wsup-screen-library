# Visual Designer — Knowledge Base
Last updated: 2026-04-27

Patterns, rules, and technical knowledge learned from working with the designer. Updated every session.

---

## Layout technique: flex + justify-between = Figma auto-layout "distribute"

When Figma's Auto Layout is set to "space between" with N children (typical: logo top, content middle, footer bottom), the Tailwind equivalent is `flex flex-col justify-between` on the parent. Each child becomes a distribution slot. Group related middle content into one wrapper (`flex flex-col gap-l`) so it distributes as a single unit.

**Example (desktop LoginSheet form panel):**
```tsx
<div className="flex flex-col justify-between px-l pt-l pb-l">
  <LogoMark />                                  {/* top */}
  <div className="flex flex-col gap-l">          {/* middle group */}
    <CopyBlock />
    <InputBlock />
  </div>
  <LegalFooter />                                {/* bottom */}
</div>
```

**When to use:** any panel/sheet where corners-anchored content with free-flowing middle reads cleaner than hand-computed margins. Do NOT use when you want exact spacing — use `gap-*` tokens instead.

---

## Login gate pattern — CONFIRMED (Session 19)

`LoginSheet` (`src/components/ui/LoginSheet.tsx`) is the canonical auth gate. Applied to any action that requires a logged-in user: Buy credits flow progressions (one-time buy, monthly continue, pay in app, open wsup app), future character-save actions, etc.

**Shape:**
- Desktop: centered `max-w-[848px] h-[461px]` 2-col modal with a **40/60 split** — form on the left (40%), character image on the right (60%). Form content is **left-aligned**: W icon (app-icon) at top-left, headline / subtitle / inputs / footer all `text-left items-start`. Close button floats on the image.
- Mobile: full-viewport container with character image + radial blur/fade at the top; form sheet (`h-[380px]`, `rounded-tl-popup rounded-tr-popup`, `backdrop-blur-popup` over `bg-profile-sheet-bg bg-surface-premium`) sits on top. LogoMark floats at `-top-[20px]`, form content is **center-aligned**.
- Shared `FormContent` with `align: 'start' | 'center'` prop drives the alignment difference. Same content, same order: LogoMark → headline (24px semibold, 2 lines) → subtitle (gradient text) → EmailField → OR divider → GoogleSignIn → LegalFooter (Terms + Privacy Policy + Privacy Choices badge).

**Props:** `open`, `onClose`, `onSignIn`, optional `headline` (ReactNode), `subtitle` (string), `characterImage` (string path). Defaults to "Let's dive into character creation." for first-time/character-creation triggers.

**Usage pattern (gated action):**
```ts
const gateAction = (action, headline, subtitle) => {
  if (isLoggedIn) action()
  else setLoginGate({ headline, subtitle, resume: action })
}
const handleSignIn = () => {
  const resume = loginGate?.resume
  login()
  setLoginGate(null)
  resume?.()  // auto-continue the original action post-login
}
```

**Supporting primitives:**
- `EmailField` (`src/components/ui/EmailField.tsx`) — pill input + arrow submit button. Reusable.
- `GoogleSignIn` (`src/components/ui/GoogleSignIn.tsx`) — white pill with Google G glyph. Reusable.
- `AuthContext` (`src/lib/AuthContext.tsx`) — provides `isLoggedIn` / `login()` / `logout()`. Wrapped at `app/layout.tsx`.

**Copy per trigger (current consumers):**
- Entire purchase flow (one-time pack buy, monthly subscribe, payment continue, scan/result continue): "Sign in to continue" / "So your credits go to the right account."
- Header / BottomNav profile icon (logged-out): "Sign in to access your profile" / "So we can save your characters, chats and credits."
- Default (new-user flows like character creation): "Let's dive into character creation" / "Create detailed characters and bring them to life."

**Copy rules:**
- Headlines have NO terminal punctuation (no full stop) — they're UI titles, not sentences.
- Subtitles can end with a period — they're explanatory sentences.

**Copy principle:** One copy per user *intent*, not per button. All four BuyCredits gates share one message because the user's intent is the same throughout the purchase — "credit me." Don't splinter copy into per-step variants that say the same thing differently.

---

## ChatBar active-state expansion — CONFIRMED (Session 19)

The WSUP chat composer has two states, switched by input focus.

**Inactive (single row):**
`[bulb-circle] [sparkle] [Message input] | [image] [mic] [gift]`

**Active / expanded (two rows inside the bubble):**
- Row 1: `[sparkle] [input with cursor]` on the left  |  `[mic] [gift]` on the right
- Row 2: `[bulb-circle] [Claude 4.5 Opus pill ›]` on the left  |  `[image]` on the right

**Typing (expanded + `value.length > 0`):**
- Row 1 right becomes just `[gift]` — mic is hidden
- Row 2 right replaces `[image]` with `[send]` — same slot, new primary affordance
- Rationale: voice and image become irrelevant once the user is composing; send is the intent

**State transitions:**
- Input `onFocus` → expanded
- Click outside the wrapper → collapsed (via `mousedown` document listener)
- While input has a value → stays expanded (prevents flicker mid-compose)

**Layout mechanics:**
- Wrapper flips `items-center` (inactive) ↔ `items-start` (active)
- Right column flips `flex-row` (inactive) ↔ `flex-col justify-between self-stretch` (active) — this pushes image to the bottom to mirror the left column's two-row height
- Action buttons use `onMouseDown={(e) => e.preventDefault()}` to keep the input focused when tapped

**Model picker pill (active-only):**
`backdrop-blur-popup bg-black-30 border border-white-10 rounded-pill px-xs py-[2px] shadow-popup` with `text-xs text-white-90` label and a 4×8 chevron SVG. This is the surface treatment for "tap to change the generation context" chips — distinct from the bubble itself.

---

## Tabs primitive — CONFIRMED DEFAULT (Session 18)

`<Tabs>` + `<Tab>` compound component in `src/components/ui/Tabs.tsx` is the canonical underline-tabs primitive. Do not build a parallel implementation — compose the primitive.

**Confirmed consumers (2+):**
- `ProfileTabBar` — profile page content tabs with counts
- `PackModeToggle` — buy-credits one-time / monthly with badge

**Behavior codified in the primitive:**
- Active state: `font-semibold text-text-title` + accent underline (h-xxxs rounded-pill)
- Inactive state: `font-normal text-text-dim` (40%)
- Underline MATCHES content width (inline-flex inner span, absolute underline with `left-0 right-0`) — not a fixed percentage
- Underline sits flush on the container's `border-b` (padding lives on the inner span, not the button)
- Container is `flex w-full border-b border-white-10` and accepts a `className` prop for sticky/bg overrides

**When consuming:**
- Pass `active` + `onClick` to each `Tab`
- Children = label + optional inline content (badge, count, dot separator)
- Do NOT wrap the primitive in an outer pill container — the underline IS the selection signal

---

## ExternalLinkIcon — CONFIRMED (Session 18)

`src/components/ui/ExternalLinkIcon.tsx`. Diagonal-arrow icon used on any link that leaves the app (Footer policy links, CreditHero "Manage subscription", BuyCreditsResultStep subscription success). Props: `size` (default 12), `className` (default `ml-1 shrink-0`).

**Rule:** whenever a link navigates to an external domain or a non-WSUP manage surface (e.g., Patreon billing portal), pair the link copy with `<ExternalLinkIcon />`. Internal navigation uses `<ChevronIcon direction="right" />`. Never duplicate the SVG inline.

---

## Text Opacity Defaults [RESEARCHED] [UNVALIDATED]

Research triggered by 3+ corrections where text was too dim. Findings from Google Material Dark Theme guidelines, dark mode typography best practices.

**Industry standard (Google Material):** 87% / 60% / 38% for high / medium / disabled text.

**WSUP designer's scale (from taste.md corrections):**
- `text-text-title` (100%) — names, headings → aligns with "high emphasis"
- `text-text-subtitle` (80%) — data values → higher than Google's 87%, designer prefers brighter
- `text-text-body` (70%) — readable copy → the designer's floor for anything users should read
- `text-text-small` (60%) — secondary labels → matches Google's "medium emphasis"
- `text-text-dim` (40%) — de-emphasized metadata → close to Google's "disabled" (38%)

**Key insight:** The designer's 70% floor for body copy is HIGHER than Google's 60% for medium emphasis. The designer prioritizes readability over convention. When in doubt, go brighter — the designer has never said "too bright" but has corrected "too dim" multiple times.

**Default rule:** Any text a user should actually READ → `text-text-body` (70%) minimum. Only use 60% or below for labels that orient but don't need word-by-word reading.

## Font Weight Defaults [RESEARCHED] [UNVALIDATED]

Research triggered by 3+ corrections where weight was too heavy. Findings from typography hierarchy best practices, Atlassian, Fontfabric.

**Industry principle:** "Skip a weight" for clear hierarchy — pair Regular (400) with Semibold (600), not Medium (500) with Semibold (600). The contrast should be intentional.

**WSUP designer's weight preferences (from taste.md corrections):**
- Headings/names: `font-semibold` (600) — strong, clear
- Body copy/descriptions: `font-normal` (400) — readable, doesn't compete
- Labels/metadata: `font-medium` (500) — the standard for `label-xs`
- Status labels ("Active Persona"): `font-normal` (400) — pushed down from semibold multiple times
- Widget labels: `font-medium` (500) — "same dim tone as inactive nav items"

**Key insight:** The designer corrects toward LIGHTER weights, never heavier. Status indicators and section labels should be light — they orient, they don't compete. The only things that get semibold are actual names and headings.

**Default rule:** Start with `font-normal` for anything that's not a title or name. The designer will never say "make it bolder" for labels.

## Component Identity Rules

- Buttons are always `rounded-pill` — never `rounded-full` (Tailwind built-in) even though they look identical. The token is the identity.
- Widgets/cards use `rounded-card` — they're NOT buttons. A sidebar CTA card is a card, not a button, even if it's clickable.
- Header icon buttons share identical border+hover tokens (`header-icon-border`, `header-icon-hover-bg`) — never use generic `white-10`/`white-05` for these. Semantic tokens exist for a reason.
- Header Pill CTA and Secondary/Outlined buttons look similar but are intentionally different: header recedes (10% border, dimmer text), standalone has more weight (20% border, brighter text). Never swap their tokens.
- The logo is ONE image file (wordmark baked in) — never reconstruct with icon + text span
- Use `<Link>` not `<div>` for clickable cards — keyboard focusability matters even in handoff

## Token Hygiene

- Common violations the designer catches: `bg-[#171717]` → `bg-page-bg`, `text-[#82a1ff]` → `text-secondary`, `bg-[#252535]` → `bg-secondary-surface`, SVG fill hex → `currentColor`
- Deleted token aliases must never reappear: `button-link`, `button-link-hover`, `button-light-accent`, `button-dark`, `forms-active-border`, `gray-*` — all removed, replaced with canonical names
- Use `black-60` token, not `black/60` opacity modifier — they resolve differently and the token is the source of truth
- `lineHeight: '28px'` matching pill height is the most reliable vertical centering — avoids font metric issues with flex
- No hardcoded hex in SVG attributes — always `currentColor` with parent `text-*` class
- No arbitrary Tailwind values when a token exists — `h-[40px]` → `h-xxxl`, `h-[2px]` → `h-xxxs`, `rounded-[16px]` → `rounded-card`
- Inline styles are a red flag — if Tailwind can do it, use Tailwind (`opacity-30` not `style={{ opacity: 0.3 }}`)
- Badge background/border colors that look hardcoded should use Tailwind opacity modifiers: `bg-status-warning/[0.12]` not `rgba(255,195,42,0.12)`

## Quality Gates (MANDATORY — every edit)

These are hard requirements, not guidelines. Every WSUP edit must pass all gates:

1. **Tokenized** — every value uses existing tokens. No raw hex, px, rgba in classNames.
2. **Reuse existing components** — check src/components/ui/ before building anything new.
3. **Componentize at 2** — if the same markup+token pattern appears twice (even across files), extract to shared ui/ component immediately.
4. **Patternize at 2** — if two or more components are used together in the same combination twice, extract as a pattern and document in style guide patterns section.
5. **Style guide sync** — every visual change updates its style guide section **in the same edit**, not as a follow-up. Component + style guide + VDA = one atomic change.
6. **VDA learns** — every visual change updates decisions.md **in the same edit**. Not batched at session end. Each change = immediate update.

**"Same edit" rule:** Gates 5 and 6 are not a second pass. When you change a component, the component file, the style guide section, and the VDA decision are all ONE atomic change. If any of the three is missing, the change is incomplete. Learned from: credit icon change was made in ReviveConfirmSheet but style guide and VDA were not updated until the designer caught it.

**Same rule for tokens:** If a token is added or modified in tailwind.config.ts or globals.css, the style guide token section must be updated in the same edit. Token change + style guide + VDA = one atomic change.

**Gate 7 — UX Consistency:** Before implementing any interaction, visual pattern, or copy, check how the same thing already works elsewhere in WSUP and match it. Examples: all dev togglers use R key (not D, not T); all inline links use .link class; all empty states use EmptyState component. Don't invent variations of established patterns.

**Gate 8 — UX Review (think like a designer):** After every change, review it as a UX designer — not a developer. Catch these BEFORE the designer has to:
- Readability: can the user instantly understand it? (SVG illustrations failed at 48px — switched to emoji)
- Spacing: no double gaps from nested padding (EmptyState py-4xl + parent gap-m = too much space)
- Mobile tappability: no hover-only affordances (Contact support link needed always-visible underline)
- Viewport wrapping: will text wrap at 180px card width? ("Last chatted 34d ago" wrapped — moved to own row)
- Clarity without context: "34d" alone is meaningless — need "Last chatted 34d ago"
- Empty state logic: zero items = only relevant CTA, no leaking empty states from other tabs

**Run QUALITY-GATES.md BEFORE every task (prime thinking) and AFTER every change (verify).**

## Reuse Patterns

- Always check if an icon already exists before drawing a new one — the designer asked "do we already have an external icon?" and caught a duplicate
- Always check if a button size exists in the style guide — Chat button on StoryCard was custom, should have been XS size
- When two things serve the same role, they must look identical — SectionAction component extracted for this reason
- SubpageHeader extracted because SocialView and MyCardsView both needed the same back nav pattern

## Bottom Sheets & Overlays

- Full-screen panels (SocialView, MyCardsView) must be `fixed inset-0 z-50` — not `absolute` inside main content, or they get clipped by `overflow-hidden`
- ~~80px bottom padding~~ OBSOLETE — BottomSheet is now z-[60] above BottomNav z-50, so pb-m is sufficient. The 80px rule was a hack for when sheets rendered behind the nav bar.
- Content-sized sheets (Menu, Logout) should NOT fill a fixed height — only scrollable sheets (Bio, Badges) use `fillHeight`
- When a tab bar sits below SubpageHeader, turn off the header's border to avoid a double line
- **Responsive overlay pattern = CONFIRMED DEFAULT (3+ consumers as of Session 12).** Any modal overlay that needs to render on both mobile and desktop uses `BottomSheet` + `CenterPopup` as siblings, sharing content via a render function. Never dual-render one component. Current consumers: CharacterStatesSheet, ConfirmSheet, BuyCreditsSheet.
- Stacking overlays: when an overlay needs to appear *above* another overlay (e.g., a package popup on top of an already-open sidebar), pass `zIndex={70}` to BottomSheet/CenterPopup and render as a sibling of the outer overlay (Fragment), not a child. Children inherit the parent's stacking context and can't escape it.
- **Never render a modal/sheet as a child of any `position: fixed/absolute/relative` element that has a `z-index`.** That ancestor creates a stacking context — the modal's z-index becomes RELATIVE to the ancestor's, not global. Symptom: another fixed element at a lower z-index (e.g., BottomNav z-50) paints on top of your modal because DOM order wins within the same global z-layer. Fix: the component that owns the modal state returns a Fragment — `<header>...</header><MyModal />` — so the modal lives at document root. This bit us with Header nesting CreditSidebar, which nested BuyCreditsSheet — three layers of trapped stacking contexts all defeated by BottomNav's simple z-50.

## Icons

- 3-dot menu on small cards needs to be bigger (16px with r=2) to be visible — 10px dots disappear on dark images
- Close icons: 12px on small widgets, 14px on sheets — the designer called out "too small" at 12px on a sheet
- Tag badges on character cards need enough padding (`px-xs`) and shouldn't overlap with the 3-dot menu on narrow cards
- Back arrow (←) and chevron (<) are intentionally different icons — don't consolidate them

## Data Handling

- Always store raw numbers, format at render time — `chats: 2400000` not `chats: "2.4M"`. Pre-formatted strings break sorting and future logic.
- Use CSS vars (not Tailwind tokens) for values needed in inline styles, SVG stops, and JS — `var(--page-bg)` works everywhere, `bg-page-bg` only works in className.
- React doesn't translate SVG attribute strings to CSS vars — must use `style={{ stopColor: 'var(--x)' }}` JSX prop format.

## Style Guide Rules

- Previews wrapped in `<PreviewBox>` (dashed border, neutral bg) — separates preview from metadata at a glance
- State descriptions use `<StateLabel>` (accent left bar + dim uppercase) — never same visual weight as the preview itself
- Style guide previews MUST match real components exactly — wrong icon size, wrong token, wrong text size are all bugs
- Update style guide whenever a new token, utility, or pattern is added — it's the living truth

## Spacing Calibration [RESEARCHED] [UNVALIDATED]

Research triggered by 8+ spacing corrections in session 6. Findings synthesized from industry design systems (Atlassian, Cloudscape, Red Hat, EightShapes).

**Mobile vs desktop spacing are fundamentally different:**
- Mobile margins: 12–24px (tight, maximize content on small screens)
- Desktop margins: 32–64px (generous, content needs breathing room in wide viewports)
- The designer's corrections confirm this: mobile = "more slimmer", desktop = "more spacing" — opposite directions

**Desktop content density rules:**
- Desktop has room — use it. Don't apply mobile's tight spacing to desktop grids.
- Desktop card grids need generous gaps (24px+) because the eye needs separation between repeating items at larger sizes
- Content padding on desktop center areas: 48–64px sides is standard for content-focused layouts (WSUP uses 64px / 4xl)
- Sidebars are tighter (20px padding) because they're narrower containers

**Base unit principle:**
- WSUP uses an 8px base (xxxs=2, xxs=4, xs=8, s=12, m=16...) which aligns with industry standard
- For desktop grids, start at `xl` (24px) gap minimum, not `s` (12px)
- For desktop content padding, start at `xxl` (32px) minimum, not `s` (12px)

**Default spacing by context:**
- Mobile component padding: `s` (12px) or `xs` (8px)
- Desktop card grid gaps: `xl` (24px) minimum
- Desktop content side padding: `4xl` (64px) for layout type 2
- Desktop header height: `3xxxl` (56px) — consistent across screens
- Right sidebar padding: `l` (20px) — tighter because narrower container

## Layout Types

Two desktop layout types exist. Know which you're building:
- **Type 1** — Header + left sidebar + center area (e.g., explore page)
- **Type 2** — Header + left sidebar + center area + right sidebar (e.g., chat, profile)
- Type 2 center area always gets `px-4xl` (64px) content padding below its header
- Type 2 center and right sidebar must scroll independently — root `overflow-hidden`, each panel has its own scroll container
- Center area header is 56px, same across all screens, uses same icon buttons (back, dots) with same tokens

## Scrollbar Patterns

Two custom scrollbar types, both tokenized:
- **Vertical** (useVerticalScrollbar hook): 2px thin thumb, fades after 800ms. Used for sidebar recent chats, center areas, right sidebars. CSS: `.scroll-thumb-vertical`, `.scroll-hide`
- **Horizontal** (useHorizontalScrollbar hook): 3px thumb, visible on hover. Used for category tabs. CSS: `.scroll-track-horizontal`, `.scroll-thumb-horizontal`
- Never use native scrollbars — always hide with `.scroll-hide` and use the JS-driven custom thumb

## Tailwind CSS Pitfalls

- Shorthand `p-s` overrides responsive `md:px-4xl` due to CSS generation order in Tailwind v3 with custom tokens. Fix: use directional classes (`px-s py-s`) or split into separate mobile/desktop divs.
- Always test responsive overrides with custom tokens — they can silently fail.

## Desktop Adaptation Rules

- Right sidebar must reuse actual mobile components — never rebuild what exists
- If a control moves to a different location on desktop (e.g., 3-dot → center header), hide it in its mobile location with `md:hidden`
- Desktop badges: show all in grid, no scroll, no "see all" — the sidebar has room

## Critical: BottomSheet & Overlay Rules

**NEVER wrap BottomSheet in a `<div className="md:hidden">` or any wrapper.**
BottomSheet uses `fixed inset-0 z-50` — wrapping it in a non-fixed parent breaks the fixed positioning. The BottomSheet already has `md:hidden` on its own outer div. Adding another wrapper clips it.

**NEVER wrap BottomSheet in React fragments `<>` for dual-rendering.**
The original BottomSheet returns a single `<div>` tree. Wrapping it in fragments (mobile sheet + desktop popup) broke event handling. Keep BottomSheet as mobile-only. Handle desktop separately at the consumer level (Popover, CenterPopup, confirmation dialog).

**NEVER add global event listeners that fire on all viewports.**
The Popover component registered `document.addEventListener('mousedown')` on open — this fired on mobile too, intercepting clicks on the BottomSheet and closing the menu before button handlers could fire. Fix: gate listeners with `window.matchMedia('(max-width: 767px)')` and skip on mobile. This was the hardest bug to find in session 6.

**When mobile and desktop share the same state but different UI:**
- Don't try to make one component serve both — use separate components
- Gate listeners and effects to the correct viewport
- The Popover handles desktop, BottomSheet handles mobile — shared state, separate DOM

**All overlays use solid dark bg — NO backdrop-blur.**
Frosted glass (backdrop-blur + translucent bg) was attempted and abandoned. It caused click-through bugs (translucent bg lets clicks pass to backdrop), visual inconsistency, and multiple debugging cycles. Solid `profile-sheet-bg: #1a1a1a` is reliable. If frosted glass is needed in the future, it requires a completely different approach (not bg opacity).
- The Popover handles desktop, BottomSheet handles mobile — they can share state but must not interfere with each other's event handling

## File Health

- 300-line max per file — enforced in CLAUDE.md. Split before adding, not after bloating.
- Style guide was the cautionary tale: grew to 2395 lines before being split into 27 files

## Horizontal List Card Pattern

A new card variant for status/management views (dormant characters, removed characters). Unlike the existing vertical ProfileCharacterCard (image on top, body below), the horizontal list card places:
- 80x100 character image on the left
- Body content (name, status, metadata, actions) on the right
- Used when the card needs to convey status information and actions alongside the character image
- This is the pattern for list-style management views where vertical cards would waste space

## Dismissible Banner Pattern

Introduced with DormancyBanner. A dismissible info banner with icon + text + X (close) button. Three color variants based on severity:
- **Inactivity** — subtle gray tint (neutral information)
- **Moderation** — yellow/amber tint using `bg-status-warning/[0.08]` (warning)
- **Removed** — red tint using `bg-status-error/[0.08]` (critical)

Key characteristics:
- Dismissible per session only (state resets on page reload — not persisted)
- Uses existing status color tokens with Tailwind opacity modifiers for backgrounds
- Icon + text body + close button layout
- Can be reused for any contextual info/warning banner pattern

## State Badge Variants

Three badge variants for character lifecycle states:
- **Inactive** — gray pill (neutral/dormant state)
- **Moderation** — yellow/amber pill (under review)
- **Removed** — red pill (permanently removed)

All use existing status color tokens (`status-warning`, `status-error`) with opacity backgrounds. No new color tokens needed.

## Mock Data Extraction Pattern

When a page.tsx file approaches the 300-line limit, extract all mock/demo data arrays into `src/lib/mockData.ts`. This keeps page files as thin orchestrators (imports + layout) while mock data lives in a shared location. Applied during lifecycle screen build when chat page.tsx grew too large.

## Demo State Toggle Pattern

A floating control panel (fixed bottom-right) for reviewers to switch between demo states (e.g., active, dormant, moderated, removed). Useful for any screen with multiple visual states that reviewers need to compare. Applied to the chat page for lifecycle state preview.

## Email Template Pattern

Email templates (e.g., dormancy notifications) are standalone components using inline CSS only — no Tailwind classes. They render as self-contained HTML suitable for email clients. Located in `src/components/email/`. Completely separate from the app's design system.

## FilterPills Component Pattern (Session 7 continued)

Reusable filter pill row (`src/components/ui/FilterPills.tsx`) with:
- Optional counts displayed inside each pill
- Colored dots for visual categorization
- Secondary border active state matching CategoryTabs pattern
- Replaces redundant summary bar + filter tabs two-row layouts — always merge into one row

When a summary bar and filter tabs serve the same data, merge them. Counts go inside the pill labels, not in a separate bar above.

## CreditButton Component Pattern (Session 7 continued)

Reusable credit button (`src/components/ui/CreditButton.tsx`) with:
- Two variants: primary and secondary
- Four sizes: xs, s, m, l
- Uses actual `/credit.png` icon (not emoji or SVG substitute)
- Secondary variant used on cards in grids; primary reserved for confirmation modals only

## Overlay Usage Guide (Session 7 continued)

When to use each overlay type:
- **BottomSheet** — mobile full/partial overlays (lists, details, confirmations)
- **CenterPopup** — desktop modals (same content as BottomSheet but desktop-rendered)
- **Popover** — desktop compact menus anchored to trigger buttons

CharacterStatesSheet works on both mobile (BottomSheet) and desktop (CenterPopup) — separate rendering paths, shared content via a `StatesContent` function component.

## Compact Grid for Lower-Priority Cards (Session 7 continued)

Active cards and lower-priority cards (dormant, needs attention) use different grid layouts:
- **Active cards:** 2-col mobile / 4-col desktop, 9:16 aspect ratio — full visual weight
- **Dormant/attention cards:** 3-col mobile / 5-col desktop, 4:5 aspect ratio — compact, reduced visual weight
- Visual hierarchy through SIZE, not just badges or labels. Important cards are physically larger.

## Close/Dismiss Icon Consistency (Session 7 continued)

Close/dismiss icons follow one standard pattern everywhere:
- SVG path: consistent across all instances
- Color: `text-white-90`
- Hover: `hover:bg-white-10`
- Size adapts to context: 14px in compact banners, 20px in sheets/modals
- The icon identity and behavior stay consistent — only size flexes

## Token Mapping Quick Reference (Session 7 continued)

Common arbitrary values and their token equivalents:
- `text-[10px]` → `text-xxs`
- `text-[13px]` → `text-xs`
- `text-[15px]` → `text-sm`
- `gap-[6px]` → `gap-xxs`
- `gap-[4px]` → `gap-xxs`
- `h-[1px]` → `h-px`

No new tokens were needed — all mapped to existing values.

---

## CloseButton primitive (Session 19 → 20)

**File:** `src/components/ui/CloseButton.tsx`

**API:**
```tsx
<CloseButton onClose={() => {}} size={20} className="..." ariaLabel="Close" />
```

- `onClose` — required, click handler
- `size` — svg pixel size (default 20). Use 16 for banners, 20 for sheets/sidebars.
- `className` — merged via `cn` (twMerge), so any default class can be overridden
- `ariaLabel` — defaults to "Close"; pass "Dismiss" for banners

**Defaults:** `p-icon-btn rounded-full hover:bg-white-10 text-white-90 bg-transparent`

**Override patterns observed in WSUP:**
- Sheet/sidebar header (default): `<CloseButton onClose={onClose} />`
- Buy-credits step header (slightly muted): `<CloseButton onClose={onClose} className="text-white-80" />`
- Banner-style with smaller icon: `<CloseButton onClose={...} size={16} ariaLabel="Dismiss" className="text-white-50 hover:text-white-80" />`
- Tight banner (mobile): `<CloseButton onClose={...} size={16} className="p-xxxs text-white-40 hover:text-white-90 hover:bg-transparent" />`
- Tight banner (desktop): `<CloseButton onClose={...} size={16} className="p-xxs" />`

**When NOT to use:**
- The X-shape SVG path appears in WSUP for **three** distinct uses. Only the first should compose CloseButton:
  1. Dismiss/close action — yes, use CloseButton
  2. Failure status indicator (e.g. inside a 72×72 status badge in BuyCreditsResultStep) — no, this is an icon
  3. Rejected-state badge icon (DormantCharacterCard `rejected` config) — no, this is part of a labeled badge

**Migration rule:** A close button has a click handler that hides/closes something. A status icon is decorative. Verify before migrating.

**Currently consumed by:** BottomSheet, CenterPopup, ConfirmSheet, LoginSheet (S19) + BuyCreditsSheet StepHeader, CreditSidebar, LowCreditsBanner, DormancyBanner mobile + desktop (S20). 8 callsites.

**Documented in style guide:** UIUtilitiesSection — 3 variants shown (default, compact, banner muted).

---

## Project context — WSUP is design-only (Session 20)

**Why this matters for VDA:** WSUP is a design-spec / dev-handoff project, not a production app. Stubs are intentional, not bugs.

**What's a stub by design (don't propose to fix):**
- `AuthContext` exposes `{ isLoggedIn, login, logout }` — `login()` synchronously flips the boolean. Production will swap in real OAuth.
- `LoginSheet` email submit + Google click both call the same stub `onSignIn` — fine.
- `PACKS`, `CREATOR_ACTIVITY`, `STREAK_DAYS`, etc. hardcoded in components — fine.
- Payment, subscription, and "Open wsup app" steps have no real backends — fine.

**Where VDA energy belongs instead:** visual polish, token discipline, primitive reuse, copy clarity, accessibility, dev-handoff legibility, style guide completeness.
