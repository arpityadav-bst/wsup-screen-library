# Visual Designer — Session Logs
Last updated: 2026-04-17

Chronological log of every VDA session. Each entry captures what was built, what was corrected, and what was learned. Append new sessions at the top.

---

## Session 10 — 2026-04-17 (Character Lifecycle PRD Copy Alignment)
**Screen:** Profile dashboard, Chat page, Style guide
**Mode:** PRD-directed copy/tone alignment + component extraction

**Context:** PM delivered Character Lifecycle Management PRD (Ashish Pathak, 2026-03-31). PRD established a core copy principle: descriptive not prescriptive. No threats, no demands, no "failure" framing. Revival presented as available, not required.

**Changed (10 files):**
- DormancyBanner — all 3 variants rewritten to neutral copy; moderation banner neutralized (no yellow/warning styling); added isCreator prop with Revive link
- MyCharactersDashboard — threatening banner → neutral; warning triangle → info icon; added page header subtitle; added empty states per tab
- DormantCharacterCard — daysUntilRemoval countdown removed, replaced with "Last chatted X days ago"; removed card: text link not button; all tooltips softened
- CharacterStatesSheet — removed all countdown/threat language from "What happens next" boxes
- ReviveConfirmSheet — full rewrite with character thumbnail, state badge, balance display, insufficient credits state, CreditFeeAccordion
- Chat page — removed input copy updated; added creator toggle (C key)
- mockData — reasons shortened to human-readable labels per PRD

**Extracted (2 new shared components):**
- `src/components/ui/CreditFeeAccordion.tsx` — duplicate accordion in dashboard + revive sheet
- `src/components/ui/EmptyState.tsx` — inline component moved to shared ui/

**Style guide synced:**
- DormancyBannerSection — added creator variant examples (inactivity, moderation, removed with isCreator)
- LifecycleSection — added EmptyState and CreditFeeAccordion showcases
- Removed footer copy updated

**Key learnings:**
- PRD copy principle is a design constraint — tone affects every string across every component
- Moderation details are private to creators — chat users see only neutral "not listed" messaging
- Countdown language creates pressure — "Last chatted X days ago" is factual without urgency
- 2 usages of identical accordion = extract immediately (confirmed existing rule)

**Corrections:** 0 (PRD-driven, no designer corrections)

---

## Session 9 — 2026-04-10 (Profile UX Refinements + Component Extraction)
**Screen:** Profile — character cards, tooltips, confirmation dialogs, character states sheet
**Mode:** Designer-directed corrections and UX audit

**Built:**
- ReviveConfirmSheet — confirmation popup before navigating to edit character (explains credit cost + edit/resubmit flow)
- ConfirmSheet reusable UI component (`src/components/ui/ConfirmSheet.tsx`) — extracted from Logout + Revive patterns
- Blog link in CharacterStatesSheet — card-style tappable link with book icon + external arrow
- Badge tooltip UX improvements — accent color bar, reason/guidance hierarchy, dismiss hint, wider width
- Specific policy block messages in badge tooltips (from backend charCreateUpdateBlockMessages)

**Corrections (6 total):**
1. Underlined "Support" text removed from removed cards — redundant with Support button CTA
2. "Contact Support" removed from 3-dot menus (popover + bottom sheet) — same redundancy
3. Mobile logout buttons were raw `<button>` while desktop used `<Button>` component — standardized to Button
4. Blog link: Medium logo icon → book/article icon (Medium logo was confusing)
5. Blog link text needed underline + whiter text for clickability
6. "Once approved" → "Once submitted" in revive confirmation copy
7. ConfirmSheet desktop buttons size="s" → size="m" for consistency with mobile

**Component extractions:**
- ConfirmSheet: title (string), description (ReactNode), confirmLabel, cancelLabel, destructive flag, open/onClose/onConfirm
- LogoutConfirmSheet and ReviveConfirmSheet both refactored to thin wrappers around ConfirmSheet

**Key learnings:**
- Redundant entry points: count existing paths before adding new ones (Support had 3 → reduced to 1)
- Confirmation dialogs = informed consent, not friction
- Badge tooltips need visual anchoring (accent color bar) to their trigger
- Reason text leads, guidance follows — answer "why?" before "what to do"
- Dismiss affordance ("Tap to dismiss") needed for tooltips without close icons
- Blog/external links: card-style > plain text for discoverability
- Button consistency: if one viewport uses the component, all viewports must

**Files changed:**
- Created: `src/components/ui/ConfirmSheet.tsx`, `src/components/profile/ReviveConfirmSheet.tsx`
- Modified: `RemovedCharacterCard.tsx`, `DormantCharacterCard.tsx`, `CharacterMenuSheet.tsx`, `LogoutConfirmSheet.tsx`, `CharacterStatesSheet.tsx`, `BadgeTooltip.tsx`, `mockData.ts`
- VDA: decisions.md, reasonings.md, session-logs.md

---

## Session 8 — 2026-04-02 (Chat Dormancy Mobile + Needs Attention Refinements)
**Screen:** Chat screen mobile view, Profile needs attention section
**Mode:** Designer-directed with UX review methodology demonstration

**Built:**
- Chat dormancy banner: mobile version changed from edge-to-edge bar → centered floating pill (translucent, backdrop-blur, rounded-pill)
- Dormant card 3-dot menu with state-specific options: inactive = Share + Delete, moderation = Delete only
- DormantMenuPopoverItems (desktop) + DormantCharacterMenuSheet (mobile bottom sheet)
- "Why does this cost credits?" accordion in Needs Attention section (above cards)
- Dormant cards resized to 2-col on mobile (matching active cards) to fix text wrapping on <360px

**Corrections (5 total):**
- Option B (slim strip) was edge-to-edge → changed to centered pill
- Pill text `text-[11px]` → `text-xxs` then → `text-xs` (too small)
- Pill icons `w-[14px]` → `w-s` then → `w-m` (too small)
- Close icon strokeWidth 2.5 → 2, `rounded-full` → `rounded-pill`, `p-[2px]` → `p-xxxs`
- ProfileCharacterCard 3-dot missing `e.preventDefault()` — click navigated to /chat AND opened popover

**Learned:**
- Edge-to-edge is not always right on mobile — context matters (immersive bg = pill, not bar)
- Visual weight must match info priority (informational ≠ alert treatment)
- Designer's full UX review methodology: See → Critique → Explore → Decide → Audit → Polish → Verify
- This loop was codified in workflow.md as the Autonomous UX Review Loop — VDA must run it on every build
- FAQ/explanatory content placement: above the cards (reading order), not below (requires scrolling past content)
- Token audit must be proactive, not reactive — check before presenting

**Built (continued — edit character page):**
- Edit Character page (`/edit-character`) — form page with Header + Sidebar + centered form + fixed bottom action bar
- FormInput component — reusable text input with label, helper text, form tokens
- FormTextarea component — textarea with label, AI generate link, char counter, form tokens
- SelectionPillGroup component — radio-style exclusive selection pills with active state (blue border + checkmark)
- Bottom action bar with warning text + "Next" CTA, stacked on mobile, horizontal on desktop
- Connected Edit action from profile card 3-dot menu → `/edit-character`
- Fixed popover click propagation through parent Link wrappers

**Corrections (continued):**
- Desktop header didn't have bottom border → added (profile has tabs providing the border, edit-character needs it directly)
- Form wasn't centered horizontally → added `mx-auto`
- Bottom bar wasn't fixed on mobile → restructured to flex column layout
- Mobile header used SubpageHeader (text-lg, too large) → matched profile header pattern (text-base font-semibold, same arrow)

**Built (continued — lifecycle states):**
- Expanded character lifecycle to 6 states: Inactive, Under Review, Policy Review, Rejected, Removed + Approved (on Active cards)
- Merged removed chars into single NEEDS_ATTENTION_CHARACTERS array with stateType
- Removed section moved to bottom of page as separate visual group
- Approved characters moved to Active section with dismissible tap-to-dismiss badge (no close icon)
- Rejected badge changed from orange → red for distinction from Policy Review
- Contact Support button on removed cards uses Secondary/Outlined pattern
- Character States explainer sheet updated with all 7 lifecycle states
- "Have questions?" section made actionable with help center and support links
- Removed filter pill restored for direct access to terminal state cards

**Corrections (continued):**
- Rejected and Removed badges were both red — confused users. Separated via card treatment (grayscale) and section placement
- Approved cards in Needs Attention made no sense — moved to Active with temporary badge
- Close icon inside small badge was cramped — changed to tap-to-dismiss whole badge
- Contact Support button was custom inline styling — switched to style guide pattern
- "Have questions?" was dead-end text — added actionable links

**Built (continued — components + refinements):**
- BadgeTooltip component (`src/components/ui/BadgeTooltip.tsx`) — contextual info tooltip for state badges, separate from Popover
- Button component (`src/components/ui/Button.tsx`) — 3 variants (primary/secondary/dark) × 4 sizes (xs/s/m/l), forwardRef, fullWidth, disabled
- Replaced inline buttons in 4 files with Button component (edit-character, DormantCharacterCard, explore, LogoutConfirmSheet)
- Fixed Tailwind class order bug: leading-none must come after text-sm in both Button and CreditButton size classes
- Badge tooltips on all needs-attention card states replace full Character States sheet popup

**Corrections (continued):**
- Contact Support button was XS (too slim) → changed to S for card CTAs
- "Contact Support" text wrapped at 5-col card width → shortened to "Support"
- CreditButton font-semibold vs Button font-medium mismatch → both font-medium now
- Designer rule: same size = same weight regardless of variant. All buttons use font-medium
- Approved badge close icon was cramped → replaced with tap-to-dismiss whole badge

**Key learnings captured:**
- Badge tooltip vs Popover: same dismiss logic but different UX purpose — don't merge
- Tailwind text-sm overrides leading-none silently if class order is wrong
- 2 usages is enough to extract a component (designer's threshold)
- Font weight belongs to size, not variant — designer explicitly prefers font-medium for all buttons
- Label length must fit narrowest card width — test at 5-col desktop
- Screenshot-driven review: designer zooms into specific elements, spots contextual issues code review misses

**Files updated:** workflow.md, reasonings.md, decisions.md (31 total new entries), taste.md (button weight + default filter), session-logs.md

---

## Session 7 continued — 2026-04-01 (Lifecycle Refinements + New Components)
**Screen:** Character management views, chat dormancy, email templates
**Mode:** Designer-directed corrections on session 7 builds

**Built:**
- FilterPills component (`src/components/ui/FilterPills.tsx`) — merged summary bar + filter tabs into single row with counts
- CreditButton component (`src/components/ui/CreditButton.tsx`) — primary/secondary variants, 4 sizes, uses /credit.png
- CharacterStatesSheet — mobile BottomSheet + desktop CenterPopup, shared content via StatesContent
- Overlay usage guide added to style guide
- Compact card grid (3-col mobile / 5-col desktop, 4:5 aspect) for dormant/attention cards
- Email template brand alignment (colored dots, simplified Revive links)

**Corrections (18 total):**
1. Close icons: consistent pattern everywhere, size adapts (14px compact, 20px sheets)
2. Two pill rows → merged into one FilterPills row with counts
3. Reuse CategoryTabs pattern for FilterPills, don't invent new styles
4. Violation reasons removed from card surfaces (shaming)
5. Horizontal list cards → compact grid (3-col/5-col, 4:5 aspect)
6. Needs Attention cards visually smaller than Active cards
7. Primary buttons not repeated in grids — use secondary
8. Same-row metadata must be same font size
9. Info banner icon removed (section header already has one)
10. Banner elements vertically centered (items-center)
11. Popups/sheets hide scrollbars (scroll-hide)
12. Demo toggle keyboard-activated (R key), not floating
13. Default filter = "Needs Attention" when dormant chars exist
14. Dormancy banners need stronger bg on mobile (backdrop-blur + bg-black-50)
15. Center content desktop padding md:px-4xl (64px)
16. Email templates use brand assets (logo, char images, accent colors)
17. Email stat icons: colored dots not emojis
18. Email Revive links: "Revive →" only, no repeated credit cost

**Token audit:**
- Zero new tokens — all arbitrary values mapped to existing tokens
- text-[10px] → text-xxs, text-[13px] → text-xs, text-[15px] → text-sm
- gap-[6px] → gap-xxs, gap-[4px] → gap-xxs, h-[1px] → h-px

**Learned:**
- Redundancy detection: two rows doing the same job = always merge
- Visual weight as hierarchy: card size > badge > label for signaling importance
- Information sensitivity: don't surface punitive details on card surfaces
- Default states should be actionable, not comfortable
- Emails are brand extensions, not separate products
- Primary buttons are singular per screen, never repeated in grids

**Files updated:** taste.md, knowledge-base.md, decisions.md, reasonings.md, project-insights.md, session-logs.md, evolution.md

---

## Session 7 — 2026-04-01 (Character Lifecycle Screens)
**Screen:** Chat page lifecycle states (dormancy, moderation, revival)
**Mode:** PRD + HTML wireframes reference
**Built:**
- DormancyBanner component — dismissible info banner with three severity variants (inactivity gray, moderation yellow, removed red)
- Horizontal list cards for dormant/removed character management views (new card pattern: 80x100 image left + body right)
- State badges — gray inactive, yellow moderation, red removed pills
- Demo state toggle — floating control panel for reviewers to switch between lifecycle states
- Email templates — standalone inline-CSS components in `src/components/email/`
- Extracted mock data to `src/lib/mockData.ts` when page.tsx approached 300 lines
- Style guide updates — Lifecycle (components tab) and Dormancy Banner (patterns tab)

**Key design decision:**
- Designer corrected the build plan when new lifecycle tokens were proposed. All wireframe surface colors mapped to existing tokens: `bg-white-05`, `bg-white-10`, `bg-white-20` for containers; `bg-status-warning/[0.08]`, `bg-status-error/[0.08]` for banner tints. Zero new color tokens created.

**Corrections:**
- Token reuse over token creation — firm, immediate correction when new tokens were proposed
- Surface container colors must use white opacity tokens, not new named tokens

**Learned:**
- Token reuse is a core principle: only create when genuinely missing, always try existing token + opacity modifier first
- Horizontal list card is the pattern for status/management views
- Dismissible banners use per-session state (no persistence needed for dev handoff)
- Email templates are a separate world — inline CSS, no design system dependency
- Mock data extraction keeps pages slim

**Files updated:** taste.md, knowledge-base.md, decisions.md, reasonings.md, project-insights.md, session-logs.md, evolution.md

---

## Session 6 — 2026-03-27/28 (Profile Desktop Build — Major Session)
**Screen:** Profile (desktop + mobile fixes)
**Mode:** Designer-directed build with live corrections
**Duration:** Long session, 20+ corrections, 2 critical bugs found and fixed

### What was built
- Profile desktop layout: center area (56px header + tabs + content) + right sidebar (reused mobile components)
- CenterPopup component for desktop modals
- Popover component for desktop 3-dot menus (light + dark variants)
- MenuItem shared component (sheet + popover modes)
- SocialView sidebar mode for right sidebar embedding
- MyCardsView desktop popup mode
- LogoutConfirmSheet desktop confirmation dialog (separate from mobile)
- useVerticalScrollbar and useHorizontalScrollbar hooks
- Tokenized scrollbar CSS classes (scroll-hide, scroll-thumb-vertical, scroll-track-horizontal, scroll-thumb-horizontal)
- New spacing tokens: 2xxxl (48px), 3xxxl (56px), 4xl (64px), 5xl (72px), 6xl (80px)
- Header profile icon linked to /profile
- Popover variant system (light for dark bg, dark for images)
- MenuPopoverItems + CharacterMenuPopoverItems for desktop popovers

### Design corrections (20+)
- Stories images: must be square (1:1) everywhere, not 4:3 or 16:9
- Characters grid: spacing pushed wider 5 times (gap-s → gap-xl, padding → 64px)
- 64px (4xl token) is the standard center area padding for layout type 2 screens
- Center area header must NOT have bottom border when tabs sit directly below
- Scrollbar: must use custom JS scrollbar (recent chats style), never native — tokenize for reuse
- Center header icons must use exact same SVGs, styles, tokens as chat header — "whyyyyyyyyyy?" was the response to different styles
- No hardcoded rgba in SVGs — always currentColor with text-* token on parent
- Right sidebar must reuse actual mobile components — not rebuild them. "why is the badges different? why is the persona widget different? whyyyyyyyyyy?"
- 3-dot menu hidden in sidebar since it's already in center header — no duplicate entry points
- Center and right sidebar must scroll independently
- Desktop badges: show all in 3-col grid, no horizontal scroll, no "see all"
- Popover border radius: rounded-card (12px) not rounded-popup (24px) — tokenize
- Character card popover labels simplified: "Edit character" → "Edit" (context is obvious)
- BottomSheet frosted glass: backdrop-blur-[60px] + semi-transparent bg from Figma
- BottomSheet header: two types (with title + close, without title + just drag handle)
- Close button style should match back button style (p-[10px] rounded-full hover:bg-white-10 text-white-90)
- Desktop 3-dot menu = compact popover anchored to button, NOT centered modal
- Desktop logout = confirmation dialog with Cancel + Log out buttons, NOT bottom sheet
- BottomSheet z-index must be above BottomNav (z-[60] vs z-50)
- Bottom padding on sheets reduced (pb-m not 80px) since BottomSheet now sits above BottomNav

### Critical bugs found and fixed
**Bug 1 — Popover global listener killing BottomSheet (HARDEST BUG)**
- Popover registered `document.addEventListener('mousedown')` when `menuOpen=true`
- On mobile, Popover was CSS-hidden (`hidden md:flex`) but React effects still ran
- The mousedown listener intercepted ALL clicks, calling `onClose()` before BottomSheet button handlers could fire
- Symptoms: clicking any BottomSheet button just closed the sheet, nothing else happened
- Fix: gate listeners with `window.matchMedia('(max-width: 767px)')` — skip on mobile
- Lesson: CSS `hidden` does NOT prevent React effects from running. Invisible components with global listeners are the hardest bugs to find.

**Bug 2 — Wrapping BottomSheet breaks fixed positioning**
- Wrapping BottomSheet in `<div className="md:hidden">` or `<>` fragments broke `position: fixed`
- BottomSheet already has `md:hidden` on its own outer div — adding another wrapper clips it
- Wrapping in fragments for dual-rendering (mobile + desktop) also broke event handling
- Fix: keep BottomSheet as a single div tree. Handle desktop overlays as completely separate components.

**Bug 3 — BottomSheet behind BottomNav**
- Both at z-50, BottomNav rendered later in DOM → sat on top
- Fix: BottomSheet bumped to z-[60]
- This also removed the need for 80px bottom padding on sheet content

### Approaches that FAILED
- BottomSheet dual-rendering (mobile sheet + desktop CenterPopup in fragments) — broke events
- createPortal for BottomSheet — didn't fix the issue
- Wrapping BottomSheet in md:hidden div — broke fixed positioning
- Translucent bg (rgba(255,255,255,0.1)) on sheet — clicks passed through to backdrop
- Multiple rounds of changing onClick handlers — the bug was in the Popover, not the buttons

### What worked
- Completely separate mobile/desktop components (no shared rendering)
- Viewport-gated event listeners (matchMedia before addEventListener)
- Original BottomSheet structure preserved (single div tree, no fragments)
- Solid dark bg (#1a1a1a) — frosted glass was attempted and abandoned (caused click-through bugs)

### Final stretch (end of session)
- Frosted glass abandoned entirely — all overlays use solid `profile-sheet-bg: #1a1a1a`
- BioSheet split: BottomSheet (mobile) + CenterPopup (desktop) for "Read more"
- Token audit completed: arbitrary values replaced across all profile components
- Style guide synced: new Overlays section, spacing/blur/shadow tokens updated
- LogoutConfirmSheet buttons matched to style guide (Primary S + Secondary/Outlined S)
- Buttons widened to px-xl for better proportions — designer approved
- center-content-pad CSS utility used instead of inline styles for 64px padding

### Files updated
All VDA knowledge files updated: taste.md, knowledge-base.md, decisions.md, reasonings.md, evolution.md, project-insights.md, session-logs.md

---

## Session 5 — 2026-03-26 (Profile Desktop Refinement)
**Screen:** Profile (desktop)
**Mode:** No reference — designed from VDA knowledge alone
**Built:**
- Desktop profile layout: center content (header row, RankBanner, TabBar, ContentGrid 4-col) + right sidebar (ProfileRightSidebar.tsx)
- Right sidebar: avatar, name/badge, bio, 2x2 stats, Edit/Share buttons, persona card, 3-col badges, footer
- All VDA taste rules applied (slim spacing, tokenized, label-xs, Secondary/Outlined buttons, currentColor icons)
**Corrections:** User said "it does need some refinements" — pending next session
**Learned:** First autonomous design without reference. Structure was accepted, refinements needed.

---

## Session 4 — 2026-03-25 (Profile Mobile Build)
**Screen:** Profile (mobile)
**Mode:** Figma screenshot reference
**Built:**
- ProfileHero, ProfileTabBar, ContentGrid, StatsRow, RankBanner
- Bottom sheets: MenuSheet, BioSheet, BadgesSheet, CharacterMenuSheet, LogoutConfirmSheet
- Full-screen panels: SocialView, MyCardsView
- Shared UI: AvatarRing, BottomSheet, SectionAction, SubpageHeader, TrendArrow
**Corrections:**
- RankBanner: py-s → py-xxs ("more slimmer" x3)
- Active Persona: text-secondary → label-xs (not a link)
- Font weights: semibold → normal for status labels
- Badge grid: 4-col → 3-col (labels truncating)
- Follow buttons: fixed 108px width
- Close icons: 12px → 14px on sheets
- Bottom padding: 80px on all sheets to clear BottomNav
- ProfileAppBar removed — standard Header stays
- Show more/less removed — show all cards
**Learned:** 15+ taste corrections captured. Major theme: start slim, status labels are light, consistency across sheets.

---

## Session 3 — 2026-03-24 (Chat Screen + Style Guide Split)
**Screen:** Chat (mobile + desktop)
**Mode:** Figma screenshot reference
**Built:**
- ChatHeader, ChatMessages, ChatRightSidebar, ChatBar
- Coachmark overlay, typing indicator, audio waveform
- Style guide split from 2395-line monolith into 27 section files
**Corrections:**
- AI bubble max-width 290px (not flex-1)
- Messages bottom-aligned with flexbox spacer
- Chat bar scrim: different approach mobile vs desktop
- Coachmark uses chat-ai-active bg, not chat-ai-bubble
**Learned:** Context-specific solutions > universal patterns. Chat has unique rules.

---

## Session 2 — 2026-03-23 (Explore Screen Refinement)
**Screen:** Explore (mobile + desktop)
**Mode:** Figma screenshot reference
**Built:**
- Character cards, category tabs, explore description section
- FAQ accordion, footer, mobile footer
**Corrections:**
- Character card description: 60% → 70% white
- Category tabs: filled → outlined pills
- FAQ font-medium not font-semibold
- Search gradient bumped brighter
- Footer policies: accordion → flat list
**Learned:** Readability corrections are recurring. The designer reads every element.

---

## Session 1 — 2026-03-22 (Project Setup + Core Components)
**Screen:** Shared components
**Mode:** Figma screenshot reference
**Built:**
- Project setup, tailwind.config.ts, globals.css with all tokens
- Sidebar.tsx, Header.tsx, style-guide/page.tsx
**Corrections:**
- Token audit: 67 arbitrary text sizes eliminated, text-xxs created
- Header icon buttons: semantic tokens not generic white-10
- Sidebar widget label: font-medium not font-semibold
- Logo: one image file, not icon + text
**Learned:** Token discipline is non-negotiable from day one.
