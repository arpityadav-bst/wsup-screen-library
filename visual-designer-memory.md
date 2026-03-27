# Visual Designer Agent — Memory
Last updated: 2026-03-26

This is the learning memory for the Visual Designer Agent. It captures the human designer's taste, reasoning patterns, and design instincts — NOT code specs (read the source code for that). The goal: when given a reference screenshot, the agent should make the same design decisions the human would.

---

## Design Philosophy

### Less is more
- Prefers slim, compact UI — will push back on padding multiple times until it feels tight ("more slimmer", "even more slimmer")
- Banners and bars should be as thin as possible while remaining readable
- Icons can overflow their containers with negative margin (`-my-xs`) rather than making the container taller
- Empty states should be subtle (dashed borders, low opacity) not attention-grabbing

### Readability over density
- Will sacrifice grid density for text readability — chose 3-col badges over 4-col because labels were truncating, chose 2-col character cards over 3-col for better spacing
- Small text (10px) needs generous letter spacing — iterated from 0.2px → 0.7px → 0.8px until it "felt right" for uppercase labels
- Body copy that users should actually read gets `text-text-body` (70% white), never `text-text-dim` (40%) — dim is for metadata only
- Copyright and subcopy bumped up from 10px to 12px — "too small" is a recurring correction

### Visual hierarchy through weight, not just size
- Name vs description: same size is okay if name is `font-semibold` and description is `font-normal`
- Status labels (like "Active Persona") should be clearly non-interactive — uses `text-text-dim` or `label-xs`, never the same color as clickable links
- Section labels are always muted (`text-text-small` 60%) — they orient, they don't compete

### Consistency is non-negotiable
- If a pattern exists, use it. Don't create variants.
- Same icon shape should appear identical everywhere — standardized all vertical dots to one viewBox, one radius, one color approach
- Same type of label (10px uppercase) must look identical across all screens — one class (`label-xs`), one tracking, one color
- Follow buttons must be fixed width so they don't jump between tabs — visual consistency matters more than content-driven sizing
- "See all" and "GROUP CHAT" must use the same button style because they serve the same role (section action)
- Bottom sheet category labels (ACCOUNT, CHARACTER, BADGES) all use `label-xs` — never the item name as a heading

### Component identity
- Buttons are always `rounded-pill` — never `rounded-full` (Tailwind built-in) even though they look identical. The token is the identity.
- Widgets/cards use `rounded-card` — they're NOT buttons. A sidebar CTA card is a card, not a button, even if it's clickable.
- Header icon buttons share identical border+hover tokens (`header-icon-border`, `header-icon-hover-bg`) — never use generic `white-10`/`white-05` for these. Semantic tokens exist for a reason.
- Header Pill CTA and Secondary/Outlined buttons look similar but are intentionally different: header recedes (10% border, dimmer text), standalone has more weight (20% border, brighter text). Never swap their tokens.
- The logo is ONE image file (wordmark baked in) — never reconstruct with icon + text span
- Use `<Link>` not `<div>` for clickable cards — keyboard focusability matters even in handoff

### Text color hierarchy (learned over multiple sessions)
- `text-text-title` (100%) — names, headings
- `text-text-subtitle` (80%) — data values, active states
- `text-text-body` (70%) — body copy, descriptions (the designer insists on this for any readable copy)
- `text-text-small` (60%) — secondary labels ONLY (NOT description copy — "too subtle to read comfortably")
- `text-text-xsmall` (50%) — metadata, stat labels
- `text-text-xxsmall` (30%) — legal, copyright
- `text-text-dim` (40%) — de-emphasized metadata that exists but shouldn't compete
- The designer has corrected dim→body at least twice: persona description and bio copy

### Precision matters
- Subtle color differences matter — FAQ card bg `#252525` not `#222222` because it needs to be "slightly lighter than page bg to be visible". The designer sees 1-step differences.
- Search gradient was "too subtle against the dark input" — bumped brighter. Lesson: test contrast against actual backgrounds, not in isolation.
- Character card description at 60% white was "too subtle for readable body copy" — bumped to 70%. The designer reads every element and judges if it's comfortable to read.
- Font rendering matters — antialiased + optimizeLegibility in globals.css is "critical for polished rendering". The designer notices subpixel differences.

### Structure over decoration
- Decorative SVG icons in style guide previews → replaced with plain placeholder boxes. Reason: "prevents icon drift, focuses on structure." The designer cares about layout accuracy more than pretty previews.
- Category tabs changed from filled colored bg → outlined pill with white border. Reason: outlined is more refined, filled looked heavy.
- "View Profile" and separator on character cards must be `hidden md:block` not `opacity-0` — invisible elements still consume flex space on mobile and cause name truncation. Structural correctness > visual hiding.
- SVG gradient IDs must be unique when the same component renders twice — the designer debugged this when the second instance's icon broke silently.

### Naming & semantics
- "What is wsup.ai?" → renamed to "About wsup.ai" — cleaner heading
- "Components" sub-section → "Tags & Cards" to avoid name collision with the tab
- Removed "Blogs CTA" from header — simplified, less clutter
- Leaderboard button removed from explore page — "accessed via trophy icon in header only." Don't duplicate entry points.
- Token aliases deleted (button-link → secondary, gray-* removed) — the designer wants one name per concept, not aliases that confuse.

### Mobile-first, responsive-aware
- Mobile character cards: max 3 tags visible, rest hidden — "5 tags wrapping on a ~160px card creates 2-3 rows, too cramped"
- Chat CTA on character cards: desktop only — "no hover on mobile touch, and invisible button steals width from stats row"
- Stats row gap: `gap-xs` on mobile, `gap-m` on desktop — "16px is too wide for narrow mobile cards and clips the chats label"
- Mobile bg image behind chat uses scrim overlay — immersive on mobile, not needed on desktop
- Chat header: border-bottom on desktop only, gradient-to-transparent on mobile (over character bg image)
- Chat bar: desktop gets gradient scrim at bottom, mobile has a separate absolute scrim div — different approaches per context

### Layout architecture preferences
- True center positioning (search bar uses `absolute left-1/2 -translate-x-1/2`) — not flex center that shifts with sibling widths
- Chat layout uses `calc(100vh - 60px)` not `h-screen pt-[60px]` — padding causes overflow at bottom. Precision matters.
- Messages align to bottom by default — flexbox spacer div BEFORE first message, compresses as messages grow
- AI bubble width constrained to `max-w-[290px]` so action row matches bubble width, not window width
- Right sidebar mirrors left sidebar width (365px) — visual symmetry
- "You May Also Like" grid in chat sidebar: 2-col, 9:16 aspect ratio cards matching explore cards — reuse the pattern

### Interaction design instincts
- Active nav states must use `usePathname()` — never hardcode `active: true`. Dynamic state from URL.
- Hover close buttons: `opacity-0 group-hover:opacity-100` — hidden until needed, with `focus-visible` for accessibility
- Custom scrollbars: JS-driven, not CSS pseudo-element (unreliable transitions in Chrome). 2px thumb, fades after 800ms idle.
- Drag-to-scroll on category tabs: `hasDragged` ref prevents accidental tab switch. `cursor-grab`/`cursor-grabbing` states.
- `overflow-x: overlay` is deprecated in Chrome — never use it
- Typing indicator dots: staggered `animationDelay` (0.15s each) with 0.9s bounce duration

### Dark theme nuances
- Footer bg (#111111) is "noticeably darker" than page bg (#171717) — intentional separation, not a bug
- FAQ cards: #252525 not #222222 — "needs to be slightly lighter than page bg to be visible"
- Scrim gradients use different profiles per context: character card scrim concentrates darkness in bottom 38%; chat header scrim is top-to-transparent; story card scrim is 55% top fade
- "Cutout trick" for badges: `box-shadow: 0 0 0 2px var(--page-bg)` with CSS var — hardcoded hex breaks when page-bg changes
- Profile icon bg must be `transparent` not a dark hex — or it creates visible mismatch against page bg
- Double borders bleed — don't add stroke circle inside SVG when the button's CSS border handles the outline

### Premium/special element handling
- Generate image button uses gradient-border wrapper pattern: outer 1px padding with gradient bg, inner solid surface. Not a CSS border.
- Warm gradient icons use CSS mask with `backgroundImage` gradient — not SVG fill
- Credit badge on premium buttons: same placement pattern as notification badges (-top-3 -right-3, 12px)
- Credit widget: icon deliberately overlaps/overflows pill's left edge — the overlap is the design

### Chat-specific design instincts (from initial build)
- User bubbles round 3 corners, square on bottom-right (where they "attach" to the edge). AI bubbles round 3 corners, square on bottom-left. This is intentional asymmetry showing conversation direction.
- AI bubble emotion text is italic — but typing indicator name is NOT italic. Emotion = character voice, typing indicator = system status.
- Regenerate button sits beside the bubble column, not at window edge — it belongs to the bubble, not the viewport
- Audio waveform bars are static (not animated) — specific heights `[3,7,10,8,5,8,10,7,3]` create a recognizable waveform silhouette
- Coachmark arrow bleeds outside its container (no overflow-hidden) — the arrow IS the design
- Coachmark uses `bg-chat-ai-active` (not `bg-chat-ai-bubble`) and `border-accent` — it's a UI overlay, visually distinct from messages
- New-feature badge: always visible in dev mode, localStorage-gated in production — different behavior per environment
- Disclaimer pill uses extreme blur (60px) for a frosted glass effect — heavier than standard 12px
- Chat action buttons all share the same glass-dark pattern: `backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10`
- Warm gradient is never hardcoded inline — always reference `var(--icon-gradient-warm)` CSS var
- Decorative radial glows on chat sidebar profile card at 10% opacity — ambient, not attention-grabbing

### Token hygiene rules (from initial build)
- Common violations the designer catches: `bg-[#171717]` → `bg-page-bg`, `text-[#82a1ff]` → `text-secondary`, `bg-[#252535]` → `bg-secondary-surface`, SVG fill hex → `currentColor`
- Deleted token aliases must never reappear: `button-link`, `button-link-hover`, `button-light-accent`, `button-dark`, `forms-active-border`, `gray-*` — all removed, replaced with canonical names
- Use `black-60` token, not `black/60` opacity modifier — they resolve differently and the token is the source of truth
- `lineHeight: '28px'` matching pill height is the most reliable vertical centering — avoids font metric issues with flex

### Style guide rules (from initial build)
- Previews wrapped in `<PreviewBox>` (dashed border, neutral bg) — separates preview from metadata at a glance
- State descriptions use `<StateLabel>` (accent left bar + dim uppercase) — never same visual weight as the preview itself
- Style guide previews MUST match real components exactly — wrong icon size, wrong token, wrong text size are all bugs
- Update style guide whenever a new token, utility, or pattern is added — it's the living truth

### Data handling
- Always store raw numbers, format at render time — `chats: 2400000` not `chats: "2.4M"`. Pre-formatted strings break sorting and future logic.
- Use CSS vars (not Tailwind tokens) for values needed in inline styles, SVG stops, and JS — `var(--page-bg)` works everywhere, `bg-page-bg` only works in className.
- React doesn't translate SVG attribute strings to CSS vars — must use `style={{ stopColor: 'var(--x)' }}` JSX prop format.

---

## Taste Corrections (things the designer pushed back on)

### Sizing & spacing
- "More slimmer" on RankBanner — went from `py-s` (12px) → `py-xs` (8px) → `py-xxs` (4px). Lesson: start slim, the designer will never say "make it taller"
- "Trophy can be bigger without changing banner height" — use negative margin overflow instead of growing the container
- Stats subcopy "slightly larger" — the designer notices when 10px labels feel too small next to larger numbers. Default subcopy to `text-xs` (12px), not `text-xxs` (10px)
- Badges needed "more optimised spacing and padding" — went from 8px gaps/padding to 12px. Lesson: badge/card grids need breathing room
- Character card bottom strip was too cramped — padding doubled from 4px to 8px, fonts bumped from 10px to 12px
- MyCards grid spacing was too tight — padding and gaps both needed increasing
- Close icons "too small" at 12-13px — bumped to 14px on sheets. Lesson: close buttons are tap targets, err on the larger side

### Colors & visual identity
- Creator badge pill didn't need the trophy emoji — text alone is cleaner
- "Active Persona" label should NOT look like a link — changed from `text-secondary` (blue, interactive) to `text-text-dim` (subdued status indicator). Then changed to `label-xs` for full consistency.
- Gold rank number should use existing `text-credit-gold` token, not a custom rgba value
- Story action icons (heart, comment, share) should all use `text-accent-light` with `currentColor` — never hardcoded hex in SVGs

### Font weights
- "Active Persona" label: went from `font-semibold` → `font-medium` → `font-normal` ("more slimmer"). Lesson: status labels should be light weight, not compete with content
- Section category labels in sheets use `label-xs` which is `font-medium` — the standard, not heavier

### Layout & structure
- Character name in bottom sheet should be a category label ("CHARACTER") not the character's actual name — it's a section header, not a title
- "See all" button should match sidebar "GROUP CHAT" style — same role = same appearance
- Follow buttons need fixed width for visual consistency between Followers/Following tabs — text length shouldn't change button size
- ProfileAppBar removed entirely — "the header stays" because profile is accessed via navigation, not a modal
- Show more/less removed — "show all cards at once" is simpler and this is a dev handoff, not production

---

## Patterns Learned

### When to reuse vs create
- Always check if an icon already exists before drawing a new one — the designer asked "do we already have an external icon?" and caught a duplicate
- Always check if a button size exists in the style guide — Chat button on StoryCard was custom, should have been XS size
- When two things serve the same role, they must look identical — SectionAction component extracted for this reason
- SubpageHeader extracted because SocialView and MyCardsView both needed the same back nav pattern

### Token discipline
- The designer audits EVERYTHING for tokenization — "is this tokenized?" is asked for every component, every sheet, every icon
- No hardcoded hex in SVG attributes — always `currentColor` with parent `text-*` class
- No arbitrary Tailwind values when a token exists — `h-[40px]` → `h-xxxl`, `h-[2px]` → `h-xxxs`, `rounded-[16px]` → `rounded-card`
- Inline styles are a red flag — if Tailwind can do it, use Tailwind (`opacity-30` not `style={{ opacity: 0.3 }}`)
- Badge background/border colors that look hardcoded should use Tailwind opacity modifiers: `bg-status-warning/[0.12]` not `rgba(255,195,42,0.12)`

### Bottom sheets & overlays
- Full-screen panels (SocialView, MyCardsView) must be `fixed inset-0 z-50` — not `absolute` inside main content, or they get clipped by `overflow-hidden`
- All bottom sheets need 80px bottom padding to clear the BottomNav — the designer caught "cancel not visible" multiple times
- Content-sized sheets (Menu, Logout) should NOT fill a fixed height — only scrollable sheets (Bio, Badges) use `fillHeight`
- When a tab bar sits below SubpageHeader, turn off the header's border to avoid a double line

### Icons
- 3-dot menu on small cards needs to be bigger (16px with r=2) to be visible — 10px dots disappear on dark images
- Close icons: 12px on small widgets, 14px on sheets — the designer called out "too small" at 12px on a sheet
- Tag badges on character cards need enough padding (`px-xs`) and shouldn't overlap with the 3-dot menu on narrow cards
- Back arrow (←) and chevron (<) are intentionally different icons — don't consolidate them

### File health
- 300-line max per file — enforced in CLAUDE.md. Split before adding, not after bloating.
- Style guide was the cautionary tale: grew to 2395 lines before being split into 27 files

---

## Design Decision Log

| Decision | Reasoning |
|---|---|
| 2-col character cards (mobile) | 3-col was too cramped, text truncated |
| 3-col badge grid in sheet | 4-col truncated labels; 3-col lets text breathe |
| `tracking-[0.8px]` for all 10px uppercase | Iterated from 0.2→0.7→0.8; uppercase at small size needs wide spacing for readability |
| Fixed-width follow buttons (108px) | Different text lengths ("Follow" vs "Follow back") caused visual jumping between tabs |
| "CHARACTER" label not character name | Sheet category labels should be generic (like "ACCOUNT"), not dynamic content |
| No show more/less on profile | Dev handoff project — simpler is better, show all content |
| Standard Header on profile (no custom AppBar) | Profile is navigated to via bottom nav — it's a main screen, needs full app chrome |
| `label-xs` for all 10px uppercase labels | Was using 4 different colors/weights — standardized for consistency |
| Active Persona label above name, not below | Category label → content is the natural reading order |
| `text-text-body` for readable descriptions | `text-text-dim` (40%) is too faint for copy users should actually read |
| Icons tab in style guide (not centralized components) | Dev handoff project — devs need a visual reference, not our React components |
| Outlined pills for category tabs (not filled) | Filled bg looked heavy; outlined with white border is more refined |
| FAQ question text `font-medium` not `font-semibold` | "Intentionally lighter weight" — questions should be readable, not shouty |
| FAQ max-width 768px (not 860px) | Narrower reading width is more comfortable |
| Character card description at 70% white (not 60%) | 60% "too subtle for readable body copy on a card" |
| Placeholder boxes instead of real icons in style guide | "Prevents icon drift, focuses on structure" in previews |
| Search gradient bumped brighter | Original "too subtle against dark input background" |
| Header Pill CTA vs Secondary/Outlined are different | "Intentionally different" — header recedes (10% border), standalone has more weight (20% border) |
| Sidebar widget label `font-medium` not `font-semibold` | Widget labels should match "same dim tone as inactive nav items" |
| `text-xxs` (10px) token created, 67 arbitrary sizes eliminated | Zero tolerance for arbitrary `text-[Npx]` values |
| Footer policies: flat list not accordion on mobile | Accordion hid important legal links — "cannot hide this under a dropdown" |
| External link icon: diagonal-arrow from WhatIsWsup section | Reused existing icon instead of creating a new box-with-arrow variant |
| Chat messages bottom-aligned with flexbox spacer | Spacer div before first message, compresses as content grows — natural scroll behavior |
| AI bubble max-width 290px (not flex-1) | Action row must match bubble width, not stretch to window |
| Gradient-border pattern for premium buttons | 1px padding outer with gradient bg + solid inner surface. Looks like a gradient border. |
| Chat bar scrim: different on mobile vs desktop | Mobile: absolute div in page.tsx. Desktop: gradient on bar's outer wrapper. Context-specific solutions. |
| `usePathname()` for active nav states | Never hardcode active state — always derive from URL |
| Custom JS scrollbar (not CSS pseudo) | Chrome transitions on scrollbar pseudo-elements are unreliable |
| Footer policies changed from accordion to flat list | "Cannot hide this under a dropdown" — legal links must be visible |
| Coachmark uses chat-ai-active bg (not chat-ai-bubble) | Distinct from regular bubbles — it's a UI overlay, not a message |
| Profile header kept (not replaced with custom AppBar) | Profile is a main navigational screen — needs full app chrome |
| Sidebar Generate Images widget label: font-medium not font-semibold | Widget labels match "same dim tone as inactive nav items" — they're waypoints, not CTAs |

---

## How the Designer Works (workflow to emulate)

### Process
- Builds mobile first from an HTML/CSS preview or Figma screenshot, then extends to desktop
- Checks everything against the style guide and tokens AFTER building — not just during
- Asks "is this tokenized?" about literally every element — colors, spacing, font sizes, radii, icons
- Asks "do we already have this?" before creating anything new — icons, button styles, components
- Reviews screens by clicking through every interactive element — sheets, panels, tabs, toggles
- Catches subtle issues: cancel hidden behind nav, text truncating, icon too small on dark bg, double borders
- Iterates fast: "more slimmer" → immediate fix → "more" → fix again. Expects rapid response.
- Treats consistency as a UX issue, not just an aesthetic one — follow buttons jumping width = broken UX

### Quality bar
- Zero arbitrary Tailwind values when a token exists
- Zero hardcoded hex in SVG attributes
- Zero inconsistent labels (same role = same appearance everywhere)
- Every component audited after build — not shipped until clean
- Style guide updated with every new pattern/variant
- VDA memory updated with every new learning
- File health checked: nothing over 300 lines

### Decision-making style
- Practical over perfect — "dev handoff project, keep it surface level"
- Simpler is better — removed show more/less, used standard Header instead of custom AppBar
- But never cuts corners on consistency or tokenization — those are non-negotiable regardless of scope
- Asks "what will the receiving dev need?" — visual reference > our code, icons catalog > centralized components

---

## How the Agent Should Work

### When given a reference (screenshot, Figma, HTML preview):
1. Read this memory first
2. Check existing patterns — reuse components, icons, button sizes from the style guide
3. Build the screen, matching the reference while applying learned taste
4. Audit for token compliance, icon consistency, label uniformity
5. Show the result, accept corrections, update this memory

### When given just a task (no reference):
1. Read this memory first — it IS the reference
2. Inventory what already exists in the project that can be reused (components, patterns, icons, button sizes)
3. Design the screen from scratch using learned taste: slim spacing, readable subcopy (12px), consistent labels (label-xs), tokenized everything, existing button sizes (XS/S/M/L), existing color scale
4. Make layout decisions based on past patterns: 2-col mobile grids, 4-col desktop, fixed-width toggle buttons, category labels above content, muted status labels, interactive elements in secondary blue
5. Build it, audit it, show it
6. Accept corrections, learn, update this memory

### Desktop adaptation rule:
When the mobile design establishes a pattern, the desktop adaptation follows the same hierarchy and logic. Don't ask — apply. Mobile content order = visual priority order for desktop sidebar/panels.

### Post-build checklist (do this every time):
- Token audit — zero hardcoded hex, zero arbitrary values
- Icon consistency — all from style guide, standardized viewBox/currentColor
- Button sizes — match XS/S/M/L from style guide
- Labels — all 10px uppercase use `label-xs`, tracking `0.8px`
- Style guide — update if new patterns/components/variants were created
- VDA memory — update with any new taste corrections or decisions
- File health — nothing over 300 lines
- Build — must pass clean

### Always:
- Start slim — the designer will never say "make it taller"
- Tokenize everything — no hardcoded hex, no arbitrary values, no inline styles where Tailwind works
- Ask when unsure about hierarchy — "should this look like a link or a label?" determines color choice
- Match existing patterns exactly — "close enough" is not enough
- Keep files under 300 lines — split proactively
- After every correction, ask yourself: "is this a new taste pattern I should remember?"
