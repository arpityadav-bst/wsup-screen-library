# Visual Designer — Taste Profile
Last updated: 2026-04-24

### Adapt pattern to the device's dominant axis
The same content can have two layouts — horizontal on desktop (where width is plentiful), vertical on mobile (where height is plentiful). LoginSheet is a 40/60 left-form / right-image modal on desktop and a bottom-sheet with image-above-form on mobile. Same content, same order, different axis. Don't shoehorn the desktop split into a stacked mobile layout or vice versa — each axis has its own reading flow; the pattern should follow it.

### Scale UI weight to its context, not to a fixed rulebook
A 48px logo that feels right on desktop (where it shares the panel with a 60% character image) is undersized on mobile (where it floats alone above a form sheet with no competing chrome). Start with what *feels right* in the actual layout, not what matches another viewport's size. The mobile LoginSheet uses a 72px logo precisely because mobile has less chrome to balance it against.

### A login gate should explain *why*, not just *what*
Every auth-gated action has a reason the user was trying to do something. The LoginSheet's headline reflects that reason ("Sign in to continue", "Sign in to access your profile"). A generic "Please log in" feels punitive and disconnects from the user's intent. Same popup, adapted copy. And when they sign in, the original action resumes automatically — don't make them tap Continue twice.

### Headlines are titles, not sentences — no terminal punctuation
UI headlines ("Sign in to continue", "Let's dive into character creation") don't end with a full stop. They're labels for a surface, not spoken sentences. Subtitles are explanatory and can end with a period since they're actual sentences. Period-on-headline reads as pedantic and steals rhythm.

### Character imagery anchors every auth surface
Wsup's brand is characters, not abstract product chrome. The LoginSheet always includes a character image — right panel on desktop, top-fading backdrop on mobile. Even for payment/subscribe flows, the character stays present as a reminder of what the user came for. Pure-form sign-in sheets feel like they belong to a different app.

### Composer controls appear on focus, not by default
Input bars reveal secondary controls (model picker, send modes, attachments reorg) only when the user is actively composing. Inactive state stays minimal — a single row with the essentials. Active state expands to surface the controls the user needs *at the moment they need them*. This is progressive disclosure applied to chat UI: show the baseline, expand when invoked, collapse when done.
*Corollary: while the input has text, treat the user as still composing — keep the expanded layout. Collapsing mid-thought flickers the layout and hides controls the user may still want.*

### Row 2 of a composer is the "generation context" row
When an input bar expands to two rows, row 2 belongs to generation/context controls — model picker, auto-suggest, attach-image, persona. Row 1 stays focused on the message itself (sparkle + text + send-adjacent actions like mic and gift). Don't cram model pickers into a header or a separate settings menu when the composer already has the right visual slot for them.

### Comparison values sit AFTER the primary value, not before
When showing a "was / now" pattern (strikethrough original → bonus), the struck-through original goes to the right of the real number, not between the label/icon and the real number. Placing it before creates dead space between the icon and the meaningful value. The eye should land on the icon, then the primary number, then (optionally) the comparison.
*Example: `[icon] 1100 ~~1000~~` ✓ &nbsp; `[icon] ~~1000~~ 1100` ✗ (icon-to-value gap)*

### Metadata and manage links live with the "what just happened" group, not with the CTA
On success confirmations, a meta-action like "Manage subscription", "View receipt", or "Edit details" belongs near the confirmation pill (icon + title + pill), not underneath the primary CTA button. The CTA row is for decisive next actions; the confirmation group is for status + supporting info. Don't conflate them.
*Example — subscription success layout:*
```
[✓ icon]
Subscription active
[+1100 credits/mo pill]
Manage subscription ⇗        ← stays with confirmation

──── spacer ────

[Back to chat button]        ← primary CTA alone
```


The designer's aesthetic instincts, corrections, and workflow. This IS the reference when no screenshot is provided.

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

### CTA size reflects the action's role, not just the container type
- A codified rule like "Card CTAs use size S" applies to the context it was established in (multi-CTA grids with density competition), not universally
- When a CTA is the **primary reason a user opened the screen**, it deserves visual weight proportional to its role — `size="m"` or larger, even if a sibling "card CTA" rule defaults to S
- Before applying a sizing rule, check: *is this a competing-CTA grid (density matters) or a primary-action row (discoverability matters)?* The answer changes the default.
- Conservative sizing hurts discoverability for primary actions. A Claim button on a reward row should invite the tap — not look incidental.
- Rule-scope check: when a rule seems to apply, check where it was codified and whether the original constraints still hold in the new context. Narrow rules that don't translate.

### Hierarchy is relational — map before changing
- Every text element's visual weight (size, color, opacity, weight, case) is a **relative position** in a hierarchy, not an absolute property
- Before changing any text's token, map the full hierarchy for the screen: what sits above this element (its parent/section), what sits below it (its sub-items), what sits beside it (siblings at the same level)
- A change that makes ONE element "look right" often breaks its relationships with neighbors — sub-labels become more prominent than their section title, section titles clash with sub-item content, sibling elements with identical semantic roles get different opacities
- **Rule:** when adjusting one element, verify the adjacent ones still form a coherent ladder. If the section title drops, sub-labels and sub-items need to drop too (or they'll shout louder than their parent). If a subcopy brightens, check that body copy is still brighter.
- Common trap: treating each element as an isolated token choice instead of a position in a system. The question isn't "what color should this text be?" — it's "what color does this text need to be given its parent is X% and its children are Y%?"

### Right device, right action — viewport-aware flow endings
- Don't ask a user on mobile to scan a QR code from the same device. They'd need to point the phone at itself. A QR ends a desktop flow (jump to phone), but it ends a mobile flow as dead weight.
- On mobile: replace QR with a direct deep-link button ("Open wsup app →") + a secondary "Get the app" link for non-installers
- On desktop: QR code is the correct affordance (user is on laptop/desktop, phone is out of the flow)
- Implementation: keep the flow shell identical, swap only the terminal step's body per viewport. Steps 1 and 2 stay device-agnostic because they're inputs, not actions

### Warnings are informative, not alarming
- Status banners that surface a user's state ("you're running low", "this is about to expire") should be factual with a small visual accent, not aggressive
- Use the status color as a tint (10% bg, 30% border) + a single colored indicator (dot, icon), never a fully saturated surface
- The action button uses the app's primary accent (purple), NOT the status color — because the action is neutral ("buy more", "renew"), while the indicator communicates urgency
- Banners include context, not just state: "10 credits left · about 3 replies" beats "10 credits left" alone — the translation to user-visible impact is what creates urgency the right way
- Banner tone doesn't escalate with threshold — 2 credits and 10 credits use the same styling. Parent decides when to show. Changing the banner's appearance at thresholds creates UI inconsistency and adds noise

### Multi-step flows stay in one surface
- A purchase/confirmation flow with 2+ screens should render as ONE sheet with internal step state, not a chain of dismiss/re-open modals
- The shell (background, border, shadow, shape) stays identical across steps — only the body content transitions
- Back arrows appear only on non-first steps; close button always present
- Closing the flow from any step fully dismisses AND resets state to step 1 for next open
- **The sheet height stays fixed across all steps.** If step 2 has less content than step 1, the sheet does NOT shrink — the header position must not jump between navigations. Empty space inside is better than a moving back arrow. Use `min-h-[Xpx]` on the content wrapper + `flex-1` on step bodies to distribute space naturally; for content that should stick to bottom (CTAs, Back/Cancel), use `mt-auto`
- Rationale: users perceive a single coherent task, not a gauntlet of unrelated popups. The visual continuity is the UX — and stable controls are part of that continuity.

### Selection lists show the recommendation
- When showing pricing tiers, plans, or any list of options where one is "best" — give that one unique styling, not a subtle "best value" badge
- The featured option gets a distinctive button treatment (gradient, color shift, whatever separates it visually) AND ambient differentiation (background glow, border accent) — *both*, not either
- A label like "BEST VALUE" on top of otherwise-identical rows is a developer's shortcut. Users scan for the visually primary option first, label second
- All-equal presentation = paralysis. One clear primary + supporting options = decision
- Non-featured options stay clean and readable — they're legit alternatives, not also-rans. Translucent glass button (white/10) reads as "available" without competing

### Consistency is non-negotiable
- If a pattern exists, use it. Don't create variants.
- Same icon shape should appear identical everywhere — standardized all vertical dots to one viewBox, one radius, one color approach
- Same type of label (10px uppercase) must look identical across all screens — one class (`label-xs`), one tracking, one color
- Follow buttons must be fixed width so they don't jump between tabs — visual consistency matters more than content-driven sizing
- "See all" and "GROUP CHAT" must use the same button style because they serve the same role (section action)
- Bottom sheet category labels (ACCOUNT, CHARACTER, BADGES) all use `label-xs` — never the item name as a heading

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

### Precision matters
- Subtle color differences matter — FAQ card bg `#252525` not `#222222` because it needs to be "slightly lighter than page bg to be visible". The designer sees 1-step differences.
- Search gradient was "too subtle against the dark input" — bumped brighter. Lesson: test contrast against actual backgrounds, not in isolation.
- Character card description at 60% white was "too subtle for readable body copy" — bumped to 70%. The designer reads every element and judges if it's comfortable to read.
- Font rendering matters — antialiased + optimizeLegibility in globals.css is "critical for polished rendering". The designer notices subpixel differences.

### Text color hierarchy (learned over multiple sessions)
- `text-text-title` (100%) — names, headings
- `text-text-subtitle` (80%) — data values, active states
- `text-text-body` (70%) — body copy, descriptions (the designer insists on this for any readable copy)
- `text-text-small` (60%) — secondary labels ONLY (NOT description copy — "too subtle to read comfortably")
- `text-text-xsmall` (50%) — metadata, stat labels
- `text-text-xxsmall` (30%) — legal, copyright
- `text-text-dim` (40%) — de-emphasized metadata that exists but shouldn't compete
- The designer has corrected dim→body at least twice: persona description and bio copy

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
- ALL buttons use `font-medium` regardless of variant (primary, secondary, dark, CreditButton). Designer explicitly prefers medium over semibold for buttons — "lighter feel." Same size = same weight, variant only changes color/bg/border

### Layout & structure
- Character name in bottom sheet should be a category label ("CHARACTER") not the character's actual name — it's a section header, not a title
- "See all" button should match sidebar "GROUP CHAT" style — same role = same appearance
- Follow buttons need fixed width for visual consistency between Followers/Following tabs — text length shouldn't change button size
- ProfileAppBar removed entirely — "the header stays" because profile is accessed via navigation, not a modal
- Show more/less removed — "show all cards at once" is simpler and this is a dev handoff, not production

### Desktop-specific (from session 6)
- Desktop grid spacing goes WIDER not tighter — "more spacing" was said 3 times, pushed from gap-s → gap-xl. Opposite of mobile's "more slimmer" pattern.
- 64px (4xl token) is the standard left/right padding for center area content in layout type 2 screens (center + right sidebar). Non-negotiable.
- Story images are square (1:1) on both mobile and desktop — not 4:3, not 16:9. The designer corrected this twice.
- Headers with tabs directly below must NOT have bottom border — the tabs already have one. Double lines are a bug.
- Desktop badges in right sidebar: show ALL in a grid (3-col). No horizontal scroll, no "see all" button, NOT clickable. The sidebar has room — use it. Mobile badges remain clickable (opens BadgesSheet).
- Duplicate entry points are forbidden — 3-dot menu moved to center header means it's hidden in sidebar (md:hidden)
- Right sidebar must reuse the exact same components from mobile — ProfileHero, StatsRow, ActivePersonaCard. Never rebuild what exists.
- Same icon buttons, same SVGs, same tokens across ALL screens. "whyyyyyyyyyy?" was the designer's response to seeing different icon styles in profile vs chat header.
- Desktop 3-dot menus are compact popovers anchored to the trigger button — NOT centered modals. Two variants: light (over dark bg) and dark (over images).
- Popover border radius: rounded-card (12px), NOT rounded-popup (24px). Small menus need tighter corners.
- Character card popover labels: simplified — "Edit character" → "Edit". Context is obvious from where you clicked.
- Close button on sheets/popups must match back button style: `p-[10px] rounded-full hover:bg-white-10 text-white-90` — same everywhere.
- BottomSheet header types: Type 1 = title + close button (with border below). Type 2 = just drag handle, content provides its own labels.
- Desktop logout = confirmation dialog (title, description, Cancel + Log out buttons right-aligned). NOT a bottom sheet style.
- BottomSheet, CenterPopup, Popover: solid dark bg (`profile-sheet-bg: #1a1a1a`), NO backdrop-blur. Frosted glass was attempted and abandoned — caused click-through bugs and visual inconsistency. Solid is reliable.
- BottomSheet sits ABOVE BottomNav (z-[60] vs z-50) — no need for 80px bottom padding anymore, pb-m is enough.
- Bio "Read more": BottomSheet on mobile, CenterPopup on desktop — separate components, same state.

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

### Screenshot-driven review (critical pattern)
- The designer screenshots the LIVE UI in the browser — not the code, not the Playwright output
- Shares the screenshot and asks targeted questions: "does this look right?", "does this seem larger?", "anything wrong here?"
- This catches things code review and automated screenshots miss:
  - Close icon too small/low contrast inside a badge (Session 8 — spotted visually, not in code)
  - Header text appearing larger than expected (Session 8 — compared against memory of profile page)
  - "Have questions?" being dead-end text with no link (Session 8 — spotted in context of the popup)
  - Policy Review and Rejected badges looking too similar (Session 8 — spotted when both were orange)
  - Removed and Rejected cards blending together (Session 8 — grayscale next to colorful was jarring)
- The designer's eye is the final validator — not the token audit, not the Playwright screenshot
- VDA must learn to do this same visual QA: screenshot, zoom in, ask "does this feel right in context?", spot the subtle issues before the designer does

### Quality bar
- Zero arbitrary Tailwind values when a token exists
- Zero hardcoded hex in SVG attributes
- Zero inconsistent labels (same role = same appearance everywhere)
- Every component audited after build — not shipped until clean
- Style guide updated with every new pattern/variant
- Knowledge files updated with every new learning
- File health checked: nothing over 300 lines

### Decision-making style
- Practical over perfect — "dev handoff project, keep it surface level"
- Simpler is better — removed show more/less, used standard Header instead of custom AppBar
- But never cuts corners on consistency or tokenization — those are non-negotiable regardless of scope
- Asks "what will the receiving dev need?" — visual reference > our code, icons catalog > centralized components

---

## How the Agent Should Work

### When given a reference (screenshot, Figma, HTML preview):
1. Read ALL knowledge files first
2. Check existing patterns — reuse components, icons, button sizes from the style guide
3. Build the screen, matching the reference while applying learned taste
4. Audit for token compliance, icon consistency, label uniformity
5. Show the result, accept corrections, update knowledge files

### When given just a task (no reference):
1. Read ALL knowledge files first — they ARE the reference
2. Inventory what already exists in the project that can be reused (components, patterns, icons, button sizes)
3. Design the screen from scratch using learned taste: slim spacing, readable subcopy (12px), consistent labels (label-xs), tokenized everything, existing button sizes (XS/S/M/L), existing color scale
4. Make layout decisions based on past patterns: 2-col mobile grids, 4-col desktop, fixed-width toggle buttons, category labels above content, muted status labels, interactive elements in secondary blue
5. Build it, audit it, show it
6. Accept corrections, learn, update knowledge files

### Desktop adaptation rule:
When the mobile design establishes a pattern, the desktop adaptation follows the same hierarchy and logic. Don't ask — apply. Mobile content order = visual priority order for desktop sidebar/panels.

### Post-build checklist (do this every time):
- Token audit — zero hardcoded hex, zero arbitrary values
- Icon consistency — all from style guide, standardized viewBox/currentColor
- Button sizes — match XS/S/M/L from style guide
- Labels — all 10px uppercase use `label-xs`, tracking `0.8px`
- Style guide — update if new patterns/components/variants were created
- Knowledge files — update with any new taste corrections or decisions
- File health — nothing over 300 lines
- Build — must pass clean

### Always:
- Start slim — the designer will never say "make it taller"
- Tokenize everything — no hardcoded hex, no arbitrary values, no inline styles where Tailwind works
- Ask when unsure about hierarchy — "should this look like a link or a label?" determines color choice
- Match existing patterns exactly — "close enough" is not enough
- Keep files under 300 lines — split proactively
- After every correction, ask yourself: "is this a new taste pattern I should remember?"

---

## Token Reuse Philosophy (Session 7)

### "Only create new tokens when genuinely missing"
The designer explicitly corrected a plan that proposed new lifecycle-specific tokens (surface-container colors like #201f1f, #2a2a2a, #353534). The rule: always check if an existing token can express the value first. If a close match exists, use it — potentially with a Tailwind opacity modifier.

- Surface container colors mapped to `bg-white-05`, `bg-white-10`, `bg-white-20` — existing white opacity tokens used as overlays on dark page-bg instead of creating new surface tokens
- Banner tint backgrounds use `bg-status-warning/[0.08]`, `bg-status-error/[0.08]` — Tailwind opacity modifiers on existing status color tokens, not new tokens
- This is an extension of the existing "tokens are identity" principle: the design system vocabulary should grow slowly and deliberately. New tokens create maintenance burden and naming sprawl.

### Default instinct: map before create
Before proposing any new token, exhaust these options:
1. Direct existing token match
2. Existing token + Tailwind opacity modifier (`/[0.08]`, `/[0.12]`)
3. Existing white-opacity token (`white-05`, `white-10`, `white-20`)
4. Only then — propose a new token with strong justification

---

## Session 7 Continued — Taste Corrections (2026-04-01)

### Close/dismiss icons — consistency with contextual sizing
- Close/dismiss icons must use the standard pattern everywhere: `text-white-90`, `hover:bg-white-10`, same SVG path
- SIZE adapts to context: 14px in compact banners, 20px in sheets/modals. The icon and behavior stay consistent — only the size flexes.

### Redundancy elimination
- Two rows of pills (summary bar + filter tabs) is redundant — merge into one row. Counts go inside the filter pills, not in a separate bar.
- Reuse existing component patterns instead of building new styles for similar behavior. CategoryTabs and FilterPills serve the same interaction — use the same pattern (FilterPills).

### Information sensitivity on card surfaces
- IP infringement/violation reasons should NOT be shown on card surfaces — it's shaming. The badge is the signal; details are discoverable only on tap/detail view. Surface-level UI should inform, not punish.

### Visual weight = importance
- Horizontal list cards are space-inefficient for management views — use compact grid (3-col mobile, 5-col desktop) with shorter aspect ratio (4:5 instead of 9:16) for lower-priority cards.
- Needs Attention cards should be visually SMALLER than Active cards — different importance = different visual weight. Size is hierarchy.
- Primary buttons should NOT be repeated — use secondary/outlined for repeated actions in grids. Primary is reserved for the single most important CTA on the screen.

### Typography alignment
- Same-row metadata should be same font size — mixing sizes creates baseline misalignment and implies false hierarchy where none exists.

### Redundant visual signals
- Info banners don't need icons when the section header already has one — avoid duplicate alert signals close together. One signal per concept.

### Banner layout
- Banner elements should be vertically centered (`items-center`) not top-aligned — vertical centering is the default for horizontal layouts.

### Scrollbar discipline
- Popups/sheets should hide scrollbars (`scroll-hide`) — no visible scrollbars inside modals. Always use the custom scrollbar pattern.

### Demo controls
- Demo toggles should be keyboard-activated (R key), not always visible as floating panels. Floating UI competes with the actual design being reviewed.

### Default filter intelligence
- ~~Default filter should be "Needs Attention" when dormant chars exist~~ CORRECTED (Session 8): Default filter is always "All" — show the full picture first. Leading with problems sets a negative tone. Users choose to drill into issues via filters.

### Mobile readability
- Chat dormancy banners need stronger backgrounds on mobile (`backdrop-blur` + `bg-black-50`) to be readable over character images. Test banners against actual backgrounds.

### Desktop breathing room
- Center content area needs desktop padding (`md:px-4xl` / 64px) for breathing room from sidebars. Reinforces the existing 64px rule for layout type 2.

### Email template brand consistency
- Email templates should use the same brand assets (logo.png, char images, accent colors, pill button radius) as the app — emails are an extension of the product.
- Stat card icons in emails: use colored dots + text instead of emojis — matches app pattern and is more email-safe.
- Per-row "Revive" links in emails should just say "Revive →", not repeat the credit cost on every row. Repetition is clutter.

### Copy tone (Session 10 — PRD-driven)
- Descriptive, not prescriptive. Describe what state the character is in. Do not threaten removal, demand action, or frame moderation as failure.
- Revival is "available" not "required." Creators decide; we don't pressure.
- No countdown language ("42d left", "will be removed in X days"). Countdowns create urgency/pressure. Use "Last chatted 34d ago" — factual without urgency.
- Moderation details are private to creators. Chat users see only neutral "not listed publicly" messaging. Never expose policy review or rejection reasons to chat users.
- "Did not pass review" not "failed" or "rejected" in notifications. Neutral, no shame.

### Illustration & empty states (Session 10)
- Emoji over SVG illustrations. SVG illustrations were too abstract and unreadable at small rendered sizes (48px on dark bg). Emoji are universally understood, render well at any scale. Simple > clever.
- Empty states need contextual meaning — each state gets its own emoji: 😴 inactive, ✨ all good, 🛡️ no removed, 🎭 create.
- EmptyState component accepts children slot for CTA buttons. Keep emoji + text + button as one tight group. No double spacing from nested padding.

### Links (Session 10)
- All inline text links use `.link` utility class — always underlined, text-secondary, decoration-white-20.
- hover:underline alone is invisible on mobile (no hover). Always show underline.
- Link color (text-secondary) is enough to signal tappability in most contexts, but when surrounded by similar-colored text (like white-50 status text), underline + color is needed.

### Interaction patterns (Session 10)
- All dev togglers use R key (toggle) + Shift+R (cycle). Same key, same position (fixed bottom-right), same panel style across all pages. Don't invent new keys.
- Badge tooltip: tap badge to open, tap anywhere to close. No close icon inside small badges — whole badge is the dismiss target.
- Credit icon replaces "credits" text when icon is present. Icon + number is sufficient. Don't repeat the word.

### Spacing corrections (Session 10)
- "Last chatted Xd ago" on its own row below character name, not sharing a row with chat count (wraps at 2-col mobile).
- Chat count moved to right of character name row — name (left, truncate) + count (right, shrink-0). Saves vertical space.
- Contact support: text link (text-secondary, .link class), not a button. Button implies required action.
