# Visual Designer — Project Insights
Last updated: 2026-04-17

WSUP-specific observations and screen-level learnings. Updated as new screens are built.

---

## Mobile-First, Responsive-Aware

- Mobile character cards: max 3 tags visible, rest hidden — "5 tags wrapping on a ~160px card creates 2-3 rows, too cramped"
- Chat CTA on character cards: desktop only — "no hover on mobile touch, and invisible button steals width from stats row"
- Stats row gap: `gap-xs` on mobile, `gap-m` on desktop — "16px is too wide for narrow mobile cards and clips the chats label"
- Mobile bg image behind chat uses scrim overlay — immersive on mobile, not needed on desktop
- Chat header: border-bottom on desktop only, gradient-to-transparent on mobile (over character bg image)
- Chat bar: desktop gets gradient scrim at bottom, mobile has a separate absolute scrim div — different approaches per context

## Layout Architecture

- True center positioning (search bar uses `absolute left-1/2 -translate-x-1/2`) — not flex center that shifts with sibling widths
- Chat layout uses `calc(100vh - 60px)` not `h-screen pt-[60px]` — padding causes overflow at bottom. Precision matters.
- Messages align to bottom by default — flexbox spacer div BEFORE first message, compresses as messages grow
- AI bubble width constrained to `max-w-[290px]` so action row matches bubble width, not window width
- Right sidebar mirrors left sidebar width (365px) — visual symmetry
- "You May Also Like" grid in chat sidebar: 2-col, 9:16 aspect ratio cards matching explore cards — reuse the pattern

## Interaction Design

- Active nav states must use `usePathname()` — never hardcode `active: true`. Dynamic state from URL.
- Hover close buttons: `opacity-0 group-hover:opacity-100` — hidden until needed, with `focus-visible` for accessibility
- Custom scrollbars: JS-driven, not CSS pseudo-element (unreliable transitions in Chrome). 2px thumb, fades after 800ms idle.
- Drag-to-scroll on category tabs: `hasDragged` ref prevents accidental tab switch. `cursor-grab`/`cursor-grabbing` states.
- `overflow-x: overlay` is deprecated in Chrome — never use it
- Typing indicator dots: staggered `animationDelay` (0.15s each) with 0.9s bounce duration

## Dark Theme Nuances

- Footer bg (#111111) is "noticeably darker" than page bg (#171717) — intentional separation, not a bug
- FAQ cards: #252525 not #222222 — "needs to be slightly lighter than page bg to be visible"
- Scrim gradients use different profiles per context: character card scrim concentrates darkness in bottom 38%; chat header scrim is top-to-transparent; story card scrim is 55% top fade
- "Cutout trick" for badges: `box-shadow: 0 0 0 2px var(--page-bg)` with CSS var — hardcoded hex breaks when page-bg changes
- Profile icon bg must be `transparent` not a dark hex — or it creates visible mismatch against page bg
- Double borders bleed — don't add stroke circle inside SVG when the button's CSS border handles the outline

## Premium/Special Elements

- Generate image button uses gradient-border wrapper pattern: outer 1px padding with gradient bg, inner solid surface. Not a CSS border.
- Warm gradient icons use CSS mask with `backgroundImage` gradient — not SVG fill
- Credit badge on premium buttons: same placement pattern as notification badges (-top-3 -right-3, 12px)
- Credit widget: icon deliberately overlaps/overflows pill's left edge — the overlap is the design

## Chat-Specific Instincts

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

## Overlay & Sheet Architecture (from session 6)

- BottomSheet is mobile-only (`md:hidden` on its outer div, z-[60] above BottomNav z-50)
- NEVER wrap BottomSheet in extra divs or fragments — breaks fixed positioning and event handling
- Desktop overlays (popovers, dialogs, CenterPopup) are completely separate components — no dual-rendering
- When mobile and desktop share state (e.g., `menuOpen`), their event listeners MUST be viewport-gated with `matchMedia`
- CSS `hidden` does NOT prevent React effects — a hidden Popover still registers global mousedown listeners
- Popover has two variants: `light` (bg-profile-sheet-bg, over dark areas) and `dark` (bg-black-70, over images)
- BottomSheet bg: `rgba(30,30,30,0.85)` + `backdrop-blur-[60px]` — opaque enough for clicks, translucent enough for glass
- BottomSheet bottom padding: `pb-m` (16px), NOT 80px — sheet is above BottomNav now
- MenuSheet and CharacterMenuSheet: BottomSheet on mobile, Popover on desktop — separate paths, shared state
- LogoutConfirmSheet: BottomSheet on mobile, centered dialog on desktop — fully separate components

## Lifecycle Screens (Session 7)

WSUP now has character lifecycle screens covering dormancy, moderation, and revival flows:
- **DormancyBanner** — dismissible info banner with three severity variants (inactivity/moderation/removed), each using status color tokens with opacity modifiers
- **Horizontal list cards** — new card variant for dormant/removed characters (80x100 image left, status + actions right), distinct from vertical ProfileCharacterCard
- **State badges** — gray/yellow/red pills for inactive/moderation/removed states
- **Demo state toggle** — floating control (fixed bottom-right) for reviewers to switch between character lifecycle states on the chat page
- **Email templates** — standalone components in `src/components/email/` using inline CSS only (no Tailwind), self-contained for email client rendering
- **Mock data extraction** — `src/lib/mockData.ts` holds all demo data, keeping page files as thin orchestrators

### Token strategy for lifecycle
All wireframe colors mapped to existing tokens — no new color tokens created:
- Surface containers: `bg-white-05`, `bg-white-10`, `bg-white-20`
- Banner tints: `bg-status-warning/[0.08]`, `bg-status-error/[0.08]`
- Badge colors: existing status tokens with opacity backgrounds

### Style guide updated
Two new sections added: Lifecycle (components tab) and Dormancy Banner (patterns tab).

### Session 7 continued — Refinements (2026-04-01)

**FilterPills pattern:**
- Reusable component at `src/components/ui/FilterPills.tsx`
- Merges summary bar + filter tabs into single row with counts inside pills
- Uses secondary border active state matching CategoryTabs

**CreditButton pattern:**
- Reusable component at `src/components/ui/CreditButton.tsx`
- Primary/secondary variants, 4 sizes (xs/s/m/l), uses `/credit.png` icon
- Secondary on cards, primary in confirmation modals only

**Card grid hierarchy:**
- Active cards: 2-col mobile / 4-col desktop, 9:16 aspect — full visual weight
- Dormant/attention cards: 3-col mobile / 5-col desktop, 4:5 aspect — compact, recessive
- Size difference IS the hierarchy signal, not just badges

**Overlay additions:**
- CharacterStatesSheet: BottomSheet (mobile) + CenterPopup (desktop), shared content via StatesContent function
- Overlay usage guide added to style guide: when to use BottomSheet vs CenterPopup vs Popover

**Email template refinements:**
- Use brand assets (logo.png, char images, accent colors, pill radius) — emails extend the product
- Colored dots + text for stat icons, not emojis — email-safe and matches app
- "Revive →" per row, no repeated credit cost

**Token audit: zero new tokens**
- `text-[10px]` → `text-xxs`, `text-[13px]` → `text-xs`, `text-[15px]` → `text-sm`
- `gap-[6px]` → `gap-xxs`, `gap-[4px]` → `gap-xxs`, `h-[1px]` → `h-px`
