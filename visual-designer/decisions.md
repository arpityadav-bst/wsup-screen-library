# Visual Designer — Design Decisions
Last updated: 2026-04-23

Every design decision and its reasoning. New decisions are appended as screens are built.

---

| Decision | Reasoning |
|---|---|
| Monthly subscription skips Payment + Scan steps | Patreon handles auth + payment off-site. The flow shape mirrors the real trust boundary — don't pad it with WSUP-hosted steps that do nothing |
| +10% bonus shown via strikethrough `~~1000~~ 1100`, not per-row badges | Badges label the promise; strikethrough SHOWS the value. The real numbers do the selling |
| Strikethrough original appears AFTER the primary value | Placing it before creates space between the credit icon and the meaningful number — icon adjacency matters |
| Pack selection uses `<Checkbox variant="success">` (not a radio) | Matches the payment-method indicator already in the project. Reuse over semantic purity when visual pattern already exists |
| Tab chip copy: "+10% credits" (not "Save 10%") | We don't discount the price — we add credits. "Save 10%" was inaccurate |
| Per-row bonus badges removed from monthly packs | Tab chip teases, strikethrough confirms. Four repetitions of the same badge = noise, not emphasis |
| "Manage subscription" link sits WITH the center confirmation pill | Belongs with "what just happened" group. Primary CTA stands alone at the bottom of success screens |
| Premium surface (`bg-surface-premium`) reserved for transactional moments | BuyCreditsSheet only. All other sheets use solid `bg-profile-sheet-bg`. Over-using premium dilutes its meaning |
| Tab underline matches content width via inline-flex inner span | Fixed 60% (old ProfileTabBar) looked off when content widths varied (Monthly+badge vs One-time). Content-sized underline adapts |
| Tab padding lives on the inline span, not the button | Underline at span's bottom-0 sits flush with the container border-b. Padding on button pushed underline upward away from the baseline |
| Dropped outer pill container on PackModeToggle | Three nested pills (outer + active + badge) competed visually. Matching ProfileTabBar's underline-only pattern eliminated the nesting |
| Billing note "Billed monthly · Cancel anytime" | Recurring charges need explicit disclosure; users should never be surprised by a renewal |
| 2-col character cards (mobile) | 3-col was too cramped, text truncated |
| 3-col badge grid in sheet | 4-col truncated labels; 3-col lets text breathe |
| `tracking-[0.8px]` for all 10px uppercase | Iterated from 0.2→0.7→0.8; uppercase at small size needs wide spacing for readability |
| Fixed-width follow buttons (108px) | Different text lengths ("Follow" vs "Follow back") caused visual jumping between tabs |
| "CHARACTER" label not character name | Sheet category labels should be generic (like "ACCOUNT"), not dynamic content |
| No show more/less on profile | Dev handoff project — simpler is better, show all content |
| Standard Header on profile (not custom AppBar) | Profile is a main navigational screen — needs full app chrome |
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
| Story images square (1:1) not 4:3 | Designer corrected twice — square is the format for story images on all breakpoints |
| 64px (4xl) center area padding for layout type 2 | Standard across all screens with center + right sidebar layout |
| Desktop badges: full grid, no scroll, no "see all" | Sidebar has room to show all — horizontal scroll is a mobile constraint, not a pattern |
| 3-dot menu in center header, hidden in sidebar | No duplicate entry points — one location per action |
| Right sidebar reuses mobile components | Never rebuild — ProfileHero, StatsRow, ActivePersonaCard are the source of truth |
| No border-bottom on header when tabs sit below | Tabs already have bottom border — double lines are a bug |
| BottomSheet stays mobile-only, no dual-rendering | Wrapping in fragments or adding CenterPopup broke event handling — keep BottomSheet as a single div tree, handle desktop separately |
| Popover listeners gated to desktop via matchMedia | Global mousedown listener on Popover intercepted ALL clicks on mobile, killing BottomSheet buttons — hardest bug in session 6 |
| Separate scroll containers for center + sidebar | Root overflow-hidden, each panel scrolls independently |
| Custom scrollbar hooks tokenized | useVerticalScrollbar (2px, fade) and useHorizontalScrollbar (3px, hover) for consistent reuse |
| BottomSheet z-[60], above BottomNav z-50 | Sheet was rendering behind nav bar — DOM order put BottomNav on top. Higher z-index fixes it. |
| Sheet bottom padding pb-m not 80px | BottomSheet now above BottomNav, no clearance needed. 80px was a hack. |
| Popover variant: light (dark bg) vs dark (images) | white-10 bg invisible over images — need bg-black-70 for character card popovers |
| Popover rounded-card (12px) not rounded-popup (24px) | Small compact menus need tighter corners than full-screen sheets |
| Desktop logout = separate confirmation dialog | Not a BottomSheet variant — completely different layout (title, body, right-aligned Cancel + action buttons) |
| Mobile/desktop overlays: completely separate components | Dual-rendering broke 3 times. Shared state is fine, shared DOM rendering is not. |
| Profile avatar in Header linked to /profile | `<Link>` not `<button>` — navigation, not action |
| Solid bg on all overlays, no backdrop-blur | Frosted glass caused click-through, visual inconsistency, and multiple bugs. Solid `#1a1a1a` is reliable. |
| BioSheet: BottomSheet (mobile) + CenterPopup (desktop) | Bio "Read more" must work on both viewports — separate rendering paths, shared content component |
| Desktop badges: not clickable | Desktop shows all badges in grid — no need to open a sheet. Mobile badges remain clickable (opens BadgesSheet). Shared components must have viewport-appropriate behavior. |
| Map wireframe surface tokens to white opacity tokens | PRD proposed #201f1f, #2a2a2a, #353534 surface containers — mapped to existing `bg-white-05`, `bg-white-10`, `bg-white-20` instead. Designer corrected the plan that proposed new tokens. Token reuse > token creation. |
| Tailwind opacity modifiers for banner backgrounds | Banner tint colors use `bg-status-warning/[0.08]` and `bg-status-error/[0.08]` — opacity modifiers on existing status tokens. No new color tokens needed for lifecycle banner variants. |
| Horizontal list card for lifecycle views | Dormant/removed character cards use horizontal layout (image left + body right) — different from vertical ProfileCharacterCard. Management/status views need information density that vertical cards don't provide. |
| Dismissible banners are per-session only | DormancyBanner dismiss state is not persisted — resets on page reload. For a dev handoff project, localStorage persistence is unnecessary complexity. |
| Mock data extracted to shared file | When page.tsx approached 300 lines, mock data moved to `src/lib/mockData.ts`. Keeps pages as thin orchestrators. |
| Email templates use inline CSS only | Email clients don't support Tailwind or external CSS. Templates are self-contained components with inline styles, separate from the app's design system. |
| Merged summary bar + filter tabs into single FilterPills row | Two rows of pills serving the same data is redundant — counts belong inside filter pills, not a separate summary bar |
| Dormant/removed cards use compact 4:5 aspect in 3-col/5-col grid | Lower-priority cards should be visually smaller than active cards — size IS hierarchy |
| Active cards keep full 9:16 aspect in 2-col/4-col grid | Active cards deserve full visual weight — different importance = different card size |
| Revive buttons use secondary variant on cards, primary reserved for confirmation modals | Primary buttons should NOT repeat across a grid — secondary for repeated actions, primary for the single most important CTA |
| Violation reasons removed from all card surfaces | Showing IP infringement reasons on cards is shaming — badge is the signal, details discoverable on tap |
| Info banner icon removed when section header has warning icon | Duplicate alert signals close together add noise — one signal per concept |
| Default filter = "All" always, not "Needs Attention" | Showing problems first sets a negative tone — give the full picture, let users filter down to issues when they choose to |
| Banners use items-center not items-start | Horizontal banner elements should be vertically centered — top-alignment looks broken |
| Scrollbars hidden in popups/sheets | No visible scrollbars inside modals — always use scroll-hide + custom scrollbar |
| Demo toggle keyboard-activated (R key) not floating panel | Floating UI competes with the design being reviewed — keyboard activation is invisible |
| Chat dormancy banners use backdrop-blur + bg-black-50 on mobile | Banners over character images need stronger backgrounds to be readable |
| Email stat icons use colored dots not emojis | Matches app pattern, more email-safe, consistent brand language |
| Email "Revive" links don't repeat credit cost per row | Repetition is clutter — say "Revive →" once, cost shown elsewhere |
| FilterPills component reuses CategoryTabs pattern | Same interaction pattern = same component style, not a new invention |
| CreditButton with primary/secondary variants and 4 sizes | Standardized credit action button, uses actual /credit.png icon |
| CharacterStatesSheet: BottomSheet (mobile) + CenterPopup (desktop) | Shared content via StatesContent function, separate rendering per viewport |
| Chat dormancy banner = centered pill on mobile, full bar on desktop | Edge-to-edge banner breaks immersion over character bg image; pill is compact, translucent, lets background breathe. Visual weight must match info priority — informational ≠ alert |
| Dormant cards 2-col on mobile (same as active), 5-col on desktop | 3-col made text wrap on <360px screens — readability > hierarchy on mobile. Desktop keeps compact 4:5 aspect for visual hierarchy |
| Dormant card 3-dot menu: inactive = Share + Delete, moderation = Delete only | Inactive chars can still be shared; moderation chars are under review so only delete is appropriate |
| "Why does this cost credits?" accordion above cards, not below | Natural reading flow: banner → FAQ → cards. User asks "why?" before seeing Revive buttons, not after scrolling past all cards |
| Single FAQ entry point per section, not per card | "Don't repeat info per row" — one accordion for the whole section, not duplicated on each card |
| Edit Character page: same header pattern as Profile on both viewports | Back arrow + title uses identical `h-3xxxl px-xs` container, same SVG (20x13.5), `text-base font-semibold` — not SubpageHeader which is visually heavier (text-lg) |
| Edit Character form centered horizontally in center area | `max-w-[480px] mx-auto` — form doesn't stretch full width on desktop, stays readable |
| Bottom action bar: stacked on mobile, horizontal on desktop | Mobile: warning text (text-xs) + full-width button stacked. Desktop: inline warning + button. Bar is always pinned, form scrolls above it |
| Form page layout: header + scroll area + fixed bottom bar | Same flex column pattern as chat: header shrink-0, form flex-1 overflow-y-auto, bottom bar shrink-0 |
| Popover items inside Link wrappers need preventDefault + stopPropagation | Clicks on popover menu items bubble up to parent Link and trigger navigation — must block at popover container level |
| New reusable form components: FormInput, FormTextarea, SelectionPillGroup | All use form tokens (forms-bg, forms-border, forms-focus-border, forms-active-bg). SelectionPillGroup handles radio-style exclusive selection with active state |
| Removed section stays separate, moves to bottom of page | Terminal state needs visual separation from actionable cards. Not a filter-level peer but its own section below Active. Removed filter pill restored for direct access |
| Rejected badge uses red (status-alert), not orange | Red = user tried and failed (urgent). Orange = platform flagged it (Policy Review). Distinct colors prevent confusion between similar-sounding states |
| Approved characters move to Active section, not Needs Attention | "Needs Attention" = "you need to do something." Approved = nothing to do. Character returns to Active with a temporary dismissible badge |
| Approved badge: tap entire badge to dismiss, no close icon | Close icon inside a small badge is cramped and low contrast. Whole badge as dismiss target is cleaner — hover state signals interactivity |
| Contact Support button uses Secondary/Outlined pattern from style guide | `border-white-20 text-text-body font-medium rounded-pill` — not a custom blue button. Matches the established button system |
| `text-secondary` for links, `text-forms-focus-border` for form focus | Same color (#82a1ff) but different semantic roles. Links use `text-secondary`, form active states use `forms-focus-border`. Correct token selection matters even when values match |
| Dead-end text must be actionable or removed | "Have questions? Visit our help center" without a link is bad UX. Either link it or delete it |
| Badge tap → lightweight tooltip, not full states sheet | Tapping "Inactive" badge opens a small tooltip with just that state's explanation. Full 7-state sheet is too much context for a contextual question. Simpler = better |
| BadgeTooltip is a separate component from Popover | Popover = action menu (Edit, Share, Delete). BadgeTooltip = contextual info for one state. Same positioning/dismiss logic but different UX patterns — don't merge them |
| Button component: 3 variants × 4 sizes | Primary, Secondary, Dark × XS/S/M/L. Extracted after audit showed same inline classes repeated across 4+ files |
| All button variants use font-medium, not font-semibold | Same size = same weight. Variant changes color/bg/border, never weight. Designer prefers medium — lighter feel. Applies to Button AND CreditButton |
| Card CTAs use size S, not XS | XS (py-xxs = 4px) is too slim for card action buttons. S (py-xs = 8px) is more tappable. XS is for truly compact inline contexts |
| "Contact Support" shortened to "Support" on removed cards | Full text wraps to 2 lines at 5-col desktop card width (81px). Shortened label fits single line — context (grayscale card, removed badge) already communicates the meaning |
| leading-none must come AFTER text-size in Tailwind classes | Tailwind's text-sm sets both font-size AND line-height. leading-none before text-sm gets overridden. Put leading-none in size classes after the text-size token |
| 2 usages is enough to extract a component | Designer's threshold is lower than "wait for 3." If the same pattern appears twice with the same purpose, componentize it |
| Style guide must be synced in the same session as component changes | Don't defer style guide updates to "next session" — the gap grows and sync becomes a bigger task. Update style guide sections as components are built/changed |
| Style guide shows live components, not static HTML | FormsSection uses actual FormInput, FormTextarea, SelectionPillGroup components. LifecycleSection uses actual DormantCharacterCard. ButtonsSection uses actual Button component. Changes to components automatically reflect in the style guide |
| Style guide ButtonsSection: all variants use font-medium | Updated from font-semibold across all button examples — Primary, Secondary, Dark, Filled/Inverted, sizes, CreditButton |
| Revive button navigates to /edit-character | The revival flow IS the edit flow — user edits the character to address issues, then submits for review. Revive = edit + resubmit |
| Email template updated for full lifecycle | HTML email now shows all 4 actionable states: Inactive, Policy Review, Under Review (no Revive — in progress), Rejected. Arianda Grande removed (now Approved/Active). Under Review rows show "In progress" instead of deadline + Revive link |
| Plain text email as separate route | `/email/dormant-notification-text` — ASCII-formatted, scannable, full URLs visible (not hidden behind href), section dividers, no HTML dependency. Optimized for email clients that strip HTML |
| Text email: full URLs, not hidden links | In HTML email, links hide behind "Revive →". In text email, the full URL is visible. Users can see exactly where they're going |
| Text email is NOT monospace/ASCII art | A UX designer designs text emails like actual emails — proportional font, natural paragraph spacing, visual hierarchy through size/weight, not terminal-style code blocks with `===` dividers |
| Text emails need warmth and personality | "Your characters miss you!" > "Character Attention Required". Per-character action links, numbered tips, warm closing with team signature. Emails are a touchpoint — they should feel human, not automated |
| Pure text email = literally a string | No HTML, no CSS, no images. Unicode characters (● ◆ → ─) for visual structure. Preview renders on white bg with system font to show how email clients display it. Copy-to-clipboard for pasting into any email system |
| Remove redundant Support CTAs when main Support button exists | Don't duplicate entry points — underlined "Support" text + "Contact Support" in menu + Support button CTA = 3 entry points for same action. Keep only the main CTA |
| Blog link as tappable card, not plain text link | Plain text links are easy to miss. Card-style (bg + border + padding + hover state + arrow icon) reads as interactive immediately. Book icon + external arrow communicates "read more elsewhere" |
| ConfirmSheet extracted as reusable UI component after 2 usages | Logout and Revive confirmations share identical structure (title, description, confirm/cancel). Extracted to `src/components/ui/ConfirmSheet.tsx` — props: title, description (ReactNode), confirmLabel, cancelLabel, destructive |
| Revive CTA shows confirmation before navigating to edit | User needs to understand: (1) they must edit and resubmit, (2) credits are consumed on submission. Direct navigation to /edit-character skips informed consent |
| Badge tooltip: accent color bar matches severity | Thin top stripe (3px) using badge's color: yellow for policy review, red for rejected/removed, blue for under review. Visual connection between badge and tooltip |
| Badge tooltip: reason as primary text, guidance as secondary | Specific policy message is what the user needs — it's the answer to "why?". General guidance (edit and resubmit) is secondary context, shown smaller below a divider |
| Badge tooltip: no dismiss hint needed | Target audience (young US users, good computer literacy) knows tooltip behavior. "Tap to dismiss" is unnecessary hand-holding — removes it for cleaner UI |
| Badge tooltip width 240px not 200px | Policy messages are 1-2 sentences — 200px forces excessive wrapping that's hard to read. 240px fits most messages in 2-3 lines |
| Button size m for both mobile and desktop in ConfirmSheet | Consistent sizing across viewports. Confirmation actions need comfortable tap/click targets on both |
| Mock data reasons use actual block message copy | Prototype tooltips should show real user-facing messages from the moderation system, not shorthand labels like "IP infringement" |
| Accent colors in data configs use hex with token comment | Tailwind v3 doesn't auto-generate CSS vars — use hex values with `// status-warning` comments to maintain traceability. Inline style `background` needs raw values |
| Close icon 20px on all dialogs/sheets | ConfirmSheet was 16px, CenterPopup/BottomSheet are 20px — standardized to 20px. Close icons must include `strokeLinejoin="round"` |
| Book icon strokeWidth 2, not 1.8 | All icons in the system use strokeWidth="2" unless explicitly documented otherwise. 1.8 was inconsistent |
| Style guide updated: ConfirmSheet + BadgeTooltip | Overlays section now documents ConfirmSheet as responsive component with props, and BadgeTooltip with/without accent bar variants |
| PRD copy principle: descriptive not prescriptive | Never threaten removal, demand action, or frame moderation as failure. Revival is "available" not "required." Creators decide; we don't pressure. Applied across all lifecycle UI |
| Moderation banner neutralized — no yellow/warning styling for chat users | Chat users should not see moderation state details — that's private to the creator. All dormancy banners use same neutral bg-white-05 + info icon, regardless of internal reason |
| "Last chatted X days ago" replaces countdown | No "Xd left" or "removed in X days" — countdown language creates urgency/pressure. "Last chatted" is factual and descriptive |
| Removed card: text link not button for Contact Support | Button implies required action. Subtle text link in muted color (white-50) presents support as available without pressure |
| Creator banner variant: isCreator prop on DormancyBanner | Creator viewing their own dormant character's chat gets a subtle "Revive" link. Not shown for removed state (not self-service revivable). Available, not required |
| ReviveConfirmSheet: full character context + balance display | Shows character thumbnail (64px), name, state badge, reason, cost breakdown, user balance, insufficient credits state. User makes informed decision with full context |
| CreditFeeAccordion extracted as shared UI component | "Why does this cost credits?" accordion appeared in both ReviveConfirmSheet and MyCharactersDashboard. Extracted to single source of truth per "2 usages = extract" rule |
| EmptyState extracted as shared UI component | Dashboard empty states (No active characters, Nothing needs attention, No removed characters) extracted to reusable component in ui/ |
| Reason strings: human-readable labels not raw messages | PRD specifies short labels: "IP/Trademark", "Content policy", "Age concern", "Real person likeness" — not verbose explanation strings |
| Needs Attention section: info icon not warning triangle | Warning icon implies urgency. Info icon (circle-i) is neutral and informational — matches the PRD's descriptive tone |
| Credit icon replaces "credits" text in cost/balance rows | When /credit.png icon is present, the word "credits" is redundant. Icon + number is cleaner. Applied in ReviveConfirmSheet cost breakdown |
| `icon-btn` spacing token (10px) for icon button padding | 30+ instances of `p-[10px]` across all icon buttons. 10px sits between xs(8) and s(12), justified its own token. Used for hit area padding on close buttons, nav icons, action icons |
| Contact support link: always underlined, text-secondary | `no-underline hover:underline` is invisible on mobile (no hover). Always show underline with muted decoration. Use `text-secondary` for link color — distinguishes from surrounding `text-white-50` status text |
| "Last chatted" on its own row, not sharing row with chat count | Sharing a row caused wrapping at 2-col mobile. Tried shortening to "34d ago" and clock icon — both lost meaning. Solution: keep full text, give it its own row. Clarity > compactness |
| "Last chatted" text-xs not text-xxs | Same hierarchy as chat count — both are engagement data. Color (white-40) already creates visual hierarchy. Don't use size to demote meaningful data |
| Chat count moved to right of character name row | Saves a vertical line — name (left, truncate) + chat count (right, shrink-0) on same row. "Last chatted" gets its own row below. Tighter card without losing info |
| `.link` utility class for all inline text links | 4 links across 3 files had identical styles. Extracted to `.link` in globals.css — text-secondary, always underlined, subtle decoration. One link style across the whole app. Same logic as `label-xs` for repeated text patterns |
| Zero characters empty state with "Create Character" CTA | PRD D1.7 requires empty state for brand new creators. Plus icon + message + primary Button. Different from tab empty states which are just icon + message |
| R key data toggler on profile page (not D) | Must use R key — same as chat page toggler. D was wrong. All dev togglers in WSUP use R toggle + Shift+R cycle. UX consistency rule: check existing patterns before choosing interactions |
| Zero characters state hides tab empty states | When totalCount === 0, only show "Create your first character" CTA. Tab-specific empty states ("Nothing needs attention", "No removed characters") must not leak through — they imply the creator has characters in other states |
| Gate 7 — UX Consistency added to quality gates | Before implementing any interaction/visual/copy, check how it already works in WSUP and match it. Established after D-key mistake. Applies to both Claude and VDA |
| EmptyState uses emoji not SVG illustrations | SVG illustrations were too abstract and unreadable at small sizes. Emoji are universally understood, render well at any size, work in dark theme. 😴 no-active, ✨ all-good, 🛡️ no-removed, 🎭 create. Simple > clever |
| EmptyState accepts children slot for CTA buttons | Button outside EmptyState created double spacing (py-4xl + gap-m). Button inside keeps emoji + text + CTA as one tight group with consistent gap-s spacing |
| Gate 8 — UX Review added to quality gates | Designer should never catch UX issues. Spacing, readability, mobile tappability, text wrapping, empty state logic — all must be caught by Claude/VDA before presenting. Read gates before task, run after task. Every time |
| Buy Credits promo uses detailed bag illustration, not flat icon | Figma spec (node 28585:42889) shows a 3D money sack with coins + smaller coin jar, not a single flat `credit-bag.png`. Asset exported from Figma at 3x (471×303) as `/credit-bags.png`. Positioned `absolute -right-[18px] -top-[8px] w-[170px] h-auto` — overflows top-right per Figma `cart 1` spec |
| Buy Credits card gets `min-h-[104px]` | Without it the card collapses when bag image loads asynchronously — button was getting hidden behind the absolute-positioned bag during hydration. 104px = p-m (32) + text (12) + gap-m (16) + button (40) + 4px buffer. Guarantees button visibility |
| Buy Credits promo bag uses plain `<img>` not Next.js `<Image>` | Next.js Image intrinsic-size handling inflated layout pre-hydration, causing the card to render without proper height. Plain `<img>` with `h-auto` + `object-contain` renders predictably. Same rule as widget character thumbnails per WidgetsSection anatomy |
| Buy Credits button uses `Button` component at size="s" with 180×40 override | Figma spec is 180×40; no standard Button size matches exactly. Override via className (`w-[180px] h-[40px]`) instead of adding a new variant — dimensions are structural one-off per token exception list. Inherits primary variant styling (bg-accent, font-medium, rounded-pill, shadow-button) |
| Buy Credits widget added to style guide WidgetsSection | Previously uncovered — same-edit rule: visual change in CreditSidebar = style guide showcase in same edit. Includes anatomy call-outs (card surface, bag position, button sizing) |
| CreditPackRow extracted from 4 identical pack rows | Same structure repeated: name label, credit amount, rate, Buy button. Gate 3 threshold met. `featured` prop flips the visual treatment for the recommended pack |
| Featured pack gets unique visual primacy, not a "best value" badge | In a selection list with pricing tiers, one option must stand out via its whole styling — gradient button + ambient bg glow — not just a tacked-on label. All-equal presentation buries the recommendation; a badge is a developer's solution |
| Credit pack Buy buttons stay inline, not promoted to Button variants | Two one-off styles (glass + golden gradient) for a single flow don't justify two new Button variants. Inline buttons with tokenized colors are cleaner than polluting the component API for a commerce-only pattern |
| Buy Credits = one sheet with 3 steps (packages → payment → scan), not 3 separate sheets | The flow is a single decision chain with a shared visual shell (same gradient bg, same sheet frame, same credit summary pill). Separate modals would create re-render flickers and fragment the user's context. Internal `step` state + back-arrow navigation keeps orientation continuous |
| CreditsSummaryPill extracted after 2 usages (payment step + scan step) | Gate 3 threshold hit — same "credits + price" row renders identically on both steps. Extracted rather than duplicated inline |
| BuyCreditsSheet has fixed `min-h-[497px]` across all 3 steps | Designer flagged that the header back-arrow was jumping vertically between steps because each step had different natural heights. Fixed via `min-h-[497px]` (matches Figma spec) on the content wrapper + `flex-1` on step bodies so space distributes without the sheet resizing. Empty space inside a step is better than a moving control |
| ScanStep Back/Cancel buttons pushed to bottom with `mt-auto` | In a fixed-height container, CTAs belong at the bottom (Figma spec + convention). `mt-auto` pushes the button row down after QR content renders naturally from top |
| LowCreditsBanner uses status-alert tint + Button primary (accent purple), not a gradient | Wireframe showed a pink/purple gradient "Add credits" button, but WSUP primary actions are solid `bg-accent`. Using Button primary keeps the banner consistent with every other CTA in the app. The status-alert tint communicates urgency; the action button stays in the app's visual vocabulary |
| LowCreditsBanner "Add credits" dispatches `wsup:open-credit-sidebar` CustomEvent | Header owns CreditSidebar state. Prop-drilling or context for one cross-cutting action is overkill. CustomEvent decouples banner from sidebar — any component can trigger the sidebar by dispatching the event, Header just listens once |
| Banner context copy: "10 credits left · about 3 replies" (not just "10 credits left") | Raw number is meaningless to a user who doesn't know cost-per-action. Translation to user-visible impact ("about 3 replies") is what creates the right urgency — without needing aggressive styling to compensate for weak copy |
| BuyCreditsSheet step 3 is viewport-split: QR on desktop, deep-link on mobile | Asking a mobile user to scan a QR with their phone IS the phone. The QR is a device-to-device bridge; on mobile it's asking the user to point the phone at itself. Mobile step 3 replaces QR with a "Open wsup app →" deep-link + "Don't have it? Get the app" fallback. Desktop keeps QR. Shell + steps 1-2 remain identical |
| Viewport split uses scanVariant prop, not a new FlowBody per viewport | FlowBody already runs inside viewport-gated BottomSheet + CenterPopup. Passing `scanVariant: 'qr' \| 'app'` as a prop keeps everything in one FlowBody with a 2-line branch. Alternative (separate Mobile/Desktop FlowBody files) doubles code for one differing step |
| Mobile step 3 "Open wsup app" uses Button primary, NOT the wireframe's gradient | Wireframe showed a purple-pink gradient button. WSUP has established solid-accent primary CTAs across the entire app (including earlier in this same flow). Gradient would break consistency for one screen. Brand gradient is already expressed via the featured pack's golden button — adding another gradient here competes for attention |
| BuyCreditsSheet gets a `result` step (success + failure variants) | User pays in the wsup app, returns to web expecting confirmation. Without it, they don't know if the top-up went through. Result step uses status-success/status-alert tinted icon + heading + contextual pill or error copy + single CTA (Back to chat / Try again). Style guide has a toggle to preview both variants |
| FinishInAppStep uses `/app-icon.png` instead of `/logo.png` | Designer added a proper 256×256 character-forward app icon. `logo.png` is the wordmark. An icon represents the app in an OS context (like a tile); a wordmark identifies it in a header. Right asset for the right role |
| Header returns a Fragment — CreditSidebar rendered as sibling, not child | Header has `fixed z-50` which creates a stacking context. Nesting CreditSidebar (z-60) inside trapped its z-index as RELATIVE to Header's context, not global. BottomNav (z-50 at document root) was painting on top because CreditSidebar was effectively "at z-50" globally. Fragment-sibling places CreditSidebar at document root where z-60 wins |
| Checkbox extracted after 2 usages (payment method + T&C) | Same 16×16 tick primitive was inlined twice in PaymentStep. Extracted to `src/components/ui/Checkbox.tsx` with `variant: 'primary' \| 'success'` prop — primary for interactive T&C-style toggles, success for "this option is selected" visual indicators. Replaces the awkward bg-status-success inline indicator AND the native `<input type="checkbox">` with one consistent primitive |
| BuyCreditsSheet lifted from CreditSidebar to Header — two CustomEvents | `wsup:open-credit-sidebar` opens the sidebar (balance hub); `wsup:open-buy-credits` opens the purchase flow directly. LowCreditsBanner's "Add credits" now skips the sidebar detour — user wants to buy, not browse rewards. CreditSidebar's "Buy Credits" button also dispatches the buy-credits event. Two trigger points, one top-level owner (Header), zero prop-drilling |
| PaymentStep icon: `/app-icon.png` not `/logo.png` | `/logo.png` is the wordmark (white-on-transparent) — on a white-bg tile it renders invisible. `/app-icon.png` is the OS-style app identity tile with its own background. Use the right asset for the container |
| InfoIcon extracted to `src/components/ui/InfoIcon.tsx` | Gate 3 at 2 consumers — CreditSidebar and DormancyBanner both had inline SVGs with slightly different implementations (path vs circle for the dot). Unified to single component with `size` and `className` props; consumers pass color/hover behavior via className |
| CreditSidebar text-xxs → text-xs sweep | Multiple lowercase subcopy uses at 10px violated the 12px-minimum rule: streak day pills, Daily check-in "Earn 10", footnote, creator activity "X unique chatters", "Deposited" pill. "Yesterday's payout" and "Lifetime Earnings" converted to `label-xs` (uppercase + 10px is the allowed exception for category labels) |
| Transaction History + "How creator rewards work" use `.link` utility | Both were using `text-accent-light` (purple #9d76ff). Established link convention is `.link` class → `text-secondary` (#82a1ff blue), always underlined. Same fix pattern applies to any inline text link across WSUP |
| CreditHero pill uses `bg-credit-bg` + `border-credit-premium-border` tokens | Previously inline hex `#2d220c` bg and `#f4da5c` border. Tokens existed (`credit-bg: #2b1f0e`, `credit-premium-border: #f4da5c`) — swapped. Small bg color shift (2d220c → 2b1f0e) is imperceptible and keeps the design system consolidated |
| CreditSidebar Claim CTAs `size="xs"` → `size="s"` | Violated the "Card CTAs use size S, not XS" rule (decisions.md) — xs is too slim for tappable card actions. Applies to daily check-in, RewardRow (Daily/One-Time Rewards). Bumped heights from ~20px to ~30px — better tap target, still compact |
| Streak footnote stacked vertically instead of justify-between | At 365px sidebar width with text-xs (12px), "Day 3 · Tomorrow · Get +15" and "Miss a day? Streak resets." both wrapped when laid out horizontally. Don't widen the sidebar (intentional width) — stack vertically so each gets its own line. Also trimmed "Day 3 ·" redundancy (streak state is shown above) |
| Streak InfoIcon gets the same className treatment as SectionTitle's InfoIcon | Both info icons in CreditSidebar are interactive (hover, cursor), same color (text-white-40). After extracting to shared InfoIcon, the Streak usage lost its className and rendered bright-white via inherited `currentColor`. Fix: consumer-owned className pattern — each usage site declares interaction + color explicitly |
| Rewarded/Purchased breakdown hidden by default, revealed via "Show breakdown" toggle | Primary info is the total — 350. The rewarded-vs-purchased split is useful context, not primary. Showing both always makes the hero taller than needed and buries the total. Toggle keeps the default view clean; interested users expand. Toggle + Transaction History sit side-by-side under the total as peer actions |
