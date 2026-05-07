# Visual Designer — Project Insights
Last updated: 2026-05-08 (S30 close — chat-screen surface inventory refreshed)

WSUP-specific observations and screen-level learnings. Updated as new screens are built.

---

## Chat screen surface inventory (S30 close)

Surfaces that mount on `/chat` and how they coexist:

| Surface | Trigger | Position | Z-index | Mutual-exclusion |
|---|---|---|---|---|
| **ChatHeader** | always | top of chat column, in flex flow | base | — |
| **ChatBar** | always (or `removed-state` UI when isRemoved) | bottom of chat column, in flex flow | base | — |
| **DormancyBanner** | `chatState === 'dormant-*'` | below ChatHeader, in flex flow | base | suppressed when SafetyBanner active |
| **SafetyBanner** | `safetyVariant !== null` | mobile = absolute top overlay (covers ChatHeader); desktop = absolute centered floating card | 20 | suppresses DormancyBanner |
| **SuggestedReplies** | 4s idle after AI message OR ChatBar bulb tap | absolute above ChatBar | n/a | — |
| **MemoryLimitOverlay** | `chatState === 'context-exhausted-popup'` | full-area backdrop + popup anchored at `bottom-[88px]` | 20–30 | — |
| **ModelPickerSheet** | ChatBar pill click OR ChatHeaderMenu "Switch LLMs" | BottomSheet (mobile) / CenterPopup (desktop) | 70 | — |
| **ChatStyleSheet** | `chatState === 'chat-style-popup'` (dev cycle) | BottomSheet / CenterPopup | 70 | — |
| **Toast** | various (model switch, suggestions toggle) | fixed `bottom-[88px]` center-horizontal | 80 | — |

**Two model-picker surfaces, one feature, two audiences (S30 codified):**
- **ModelPickerSheet** — in-chat switching, power-user dense rows (3 chips per row: latency / personality / cost)
- **ChatStyleSheet** — start-of-chat onboarding, general-user light rows (avatar + name + tagline)
Both consume the same `MODELS` array in `lib/models.ts`. Different row anatomies because different audiences. Selection state is shared (`selectedModelId` in chat/page.tsx).

**SafetyBanner desktop is now in the centered-popup family**, not the top-of-chat banner family (PM-directive override S30). DormancyBanner remains the canonical top-of-chat banner on both viewports. SafetyBanner mobile still uses the top-of-chat-overlay slot.

---

## Public creator profile architecture (`/creator/[username]`) — Session 26

**Route:** `/creator/[username]` (lowercase slug). ChatHeader's "by [creatorName]" link wires to `/creator/${creatorName.toLowerCase()}`.

**Composition:** thin page component that mounts the same components used by `/profile` with `viewMode="public"`. NOT a forked page. The shared sub-components carry the mode prop:

- `ProfileHero` — `viewMode='self'|'public'`. Self has edit/share/3-dot icons + 3-dot menu opens self-MenuSheet (My cards / Log out / Remove account). Public hides edit, swaps Hero CTA from absent to **Follow** (Button m fullWidth) under bio.
- `StatsRow` — `viewMode` toggles trend deltas (▲ +12%) ON for self, OFF for public. Also gates the Followers/Following drilldown (chevron + click-through to `SocialView`) — owner-only.
- `ProfileCharacterCard` — `viewMode` gates rank trend arrow (▲ 1, ▼ 2) and the 3-dot management menu. Public sees rank number only, no trend, no menu.
- `ContentGrid` — accepts `viewMode`, passes through to ProfileCharacterCard.
- `ProfileRightSidebar` — `viewMode` hides ActivePersonaCard (creator-private) and threads Follow/Unblock handlers through.
- `PublicMenuSheet` (separate component, not a `viewMode` of MenuSheet) — Report-only by default. Same shape as MenuSheet (BottomSheet + label + button rows + Cancel) but different intent. Different intent ≠ migrate by grep.

**What's owner-only (public hides):**
- Trend deltas (Stats + character ranks) — *movement* feedback
- Followers/Following drilldown — social-graph navigation
- Active Persona card — creator-private state
- Character 3-dot management menu — owner-only actions
- MyCharactersDashboard (lifecycle filter pills, "Needs Attention" section, "Removed" section, info banner) — public uses simple `ContentGrid` instead

**Mock creator data:** `HONEYBADGER_PROFILE`, `HONEYBADGER_CHARACTERS`, `HONEYBADGER_STORIES`, `HONEYBADGER_FOLLOWERS`, `HONEYBADGER_FOLLOWING` in `mockData.ts`. Lookup table in `creator/[username]/page.tsx` keyed by lowercase slug. `notFound()` if slug doesn't exist.

---

## Block flow architecture — Session 26

**Trigger:** 3-dot menu on `/creator/[username]` — order **Block** → **Report** (personal-control before institutional escalation). Both `text-status-alert`. Bare-verb labels (the menu's parent context already specifies the target).

**Confirm:** `BlockConfirmSheet` (thin wrapper around `ConfirmSheet`, mirrors `LogoutConfirmSheet` pattern). Title `"Block ${creatorName}?"` (explicit target at the friction moment). Plain confirm — NOT checkbox-gated, because Block is reversible. `destructive` prop on (Block button = alert color).

**State on confirm:**
- `setIsBlocked(true)`
- `setIsFollowing(false)` — auto-unfollow (you can't both follow and block someone)
- Sheet closes

**Blocked-state surface changes (single page-level conditional):**
- Hero: Follow CTA → **Unblock** button (Button secondary, single-tap, no confirm — un-friction action)
- Stats: unchanged (already public credibility info)
- ProfileTabBar + ContentGrid: replaced with `<EmptyState variant="blocked" />` — single banner, no tabs
- Menu items: "Block" → "Unblock"

**Unblock:** single tap from either Hero button OR menu item. State reverts. NO auto-re-follow (deliberate action separated from unblock).

**Out of scope for this iteration (deferred):**
- Feed/search filtering of blocked creator's content (would need `BlockContext` propagation)
- Active chats with blocked creator's character (PM decision pending — chat continues vs. archives)
- Distinct-user-block escalation counter / moderator dashboard (backend)
- Block from character detail page (page doesn't exist yet)

---

## Memory limit pattern — Session 26 final

`MemoryLimitMoment` (in-stream variant) was removed in S26. `MemoryLimitPopup` is canonical:
- Auto-fires 2s after `/chat` mount on `'active'` state
- Modal-style with chat-darkening backdrop (`bg-black-60` z-20)
- Anchored above ChatBar with `max-w-[420px]`
- Title is system-narration ("Billie's memory is full.") — NOT character-voice italic+attribution
- Body benefit-shaped ("The app remembers 3× more of your story.")
- Primary "Open in app" + secondary "switch model instead" link, no divider, hierarchical spacing groups (gap-xl outer, gap-xs narration, gap-s action)
- Dismiss via close X or backdrop click → reverts chatState to `'active'`

---

## Credit flow architecture — extended with Patreon monthly (Session 18)

**Two payment modes, two flow shapes:**

| Mode | Flow | Provider | Bonus |
|---|---|---|---|
| One-time | Packages → Payment method → Scan (desktop) / Finish-in-app (mobile) → Result | WSUP mobile app | — |
| Monthly | Packages → Result | Patreon (off-site auth + payment) | +10% credits (credits × 1.1, same price) |

**Mode toggle:** underline tabs at the top of the Packages step. Monthly is default; Stack of Credits is pre-selected. Switching modes preserves the selected pack across toggles.

**Bonus communication:**
- Tab chip `+10% credits` (Monthly only) — discovery signal
- Per-pack `~~1000~~ 1100` strikethrough — confirmation at the decision point
- Per-row "+10% BONUS" badges were removed — redundant with the strikethrough

**Trust boundary:** Patreon handles authentication + card + recurring billing. WSUP never touches card details for subscriptions. The flow's short shape reflects this — Monthly terminates at the provider handoff.

**Manage subscription entry points (3 places):**
1. `CreditSidebar` → "Manage subscription ⇗" next to "Transaction History"
2. `BuyCreditsResultStep` subscription success → "Manage subscription ⇗" alongside the center confirmation pill
3. `Header` credit pill → opens `CreditSidebar` (transitively)

All three use the same `<ExternalLinkIcon>` to signal off-site navigation.

---

## Surface styles — premium vs default

`src/components/ui/BottomSheet.tsx` and `CenterPopup.tsx` accept `surfaceClassName` to override the default `bg-profile-sheet-bg` surface.

- **Default (all sheets):** solid `bg-profile-sheet-bg` (#1a1a1a). Used by ConfirmSheet, ReviveConfirmSheet, CharacterMenuSheet, Popover, BadgeTooltip.
- **Premium (reserved):** `bg-profile-sheet-bg bg-surface-premium` — three-layer radial gradient (purple at top-left, pink at bottom-right, gold at top-left). Currently only used by BuyCreditsSheet.

**Rule:** premium surface signals "transaction / reward / purchase moment." Do not use it for destructive, informational, or everyday sheets — overuse dilutes the signal. When in doubt: default.

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

---

## Credit/Monetization Flow (Session 12)

**CreditSidebar is the hub for all credit-related UI.** It contains the balance hero, buy-credits promo, streak rewards, daily rewards, creator rewards, and one-time rewards. Triggered from the header credit button on every page.

**Low-credits reminder on explore:**
- `LowCreditsBanner` surfaces at the top of the Explore page when credit balance is below threshold (currently hardcoded: 10 credits / 3 replies for demo)
- Subtle status-alert tint (10% bg, 30% border) + pulsing red dot — urgent but not alarming
- "Add credits" Button primary opens CreditSidebar via `window.dispatchEvent(new CustomEvent('wsup:open-credit-sidebar'))` — Header listens and sets `creditsOpen` state
- Dismissible per-session (local state in component)

**Buy flow architecture (3-step, one sheet):**
- CreditSidebar → Buy Credits promo widget → click → BuyCreditsSheet opens on top of the sidebar at z-index 70
- **Step 1 — Packages:** 4 tiers, pick one to advance. No back button (first step).
- **Step 2 — Payment method:** shows credits summary pill (◆ 1000 / ₹ 520), single payment option "Pay with wsup app" (pre-selected), secure-payment + SSL-encryption micro-logos, primary CTA "Continue to pay in app", T&C checkbox (pre-checked). Back arrow → step 1.
- **Step 3 — viewport-aware terminal step:**
  - *Desktop (CenterPopup):* "Scan to pay" — credits summary, QR card (232×232 white, 148×148 QR from `/qr-placeholder.png`), Back/Cancel glass buttons 50/50. User scans with phone.
  - *Mobile (BottomSheet):* "Finish in the app" — app row (wsup logo + name + credits/price), Primary "Open wsup app →" button (deep-link), Secondary "Don't have it? Get the app" (app store fallback). No QR — user is already on the phone.
  - Split handled via `scanVariant: 'qr' | 'app'` prop on FlowBody; BottomSheet wrapper passes `"app"`, CenterPopup passes `"qr"`. Steps 1 and 2 remain identical across viewports.
- All 3 steps share the same sheet shell — shell renders once, body changes per step. Closing the sheet from any step resets state to step 1.
- Sidebar stays open underneath — user can dismiss sheet and return to credit management, or close sidebar entirely

**Credit pricing tiers (4, progressive, INR):**
- Handful of Credits — 350 credits / ₹210.00
- **Stack of Credits — 1000 / ₹520.00 (featured — best value)**
- Bag of Credits — 1800 / ₹1050.00
- Chest of Credits — 4000 / ₹2150.00

Names follow a natural-object progression (hand → stack → bag → chest). Rate-per-rupee varies by tier to make Stack genuinely the best deal — not arbitrary marketing. Any future pricing screen should follow this "one clearly-featured pack" principle.

**Visual treatment of the featured pack:**
- Card background: pink/blue radial gradients (stand-alone row glow)
- Buy button: golden gradient (#f4da5c → #e48949 → #c65720), golden border, dark text
- Non-featured packs: translucent glass button (bg-white-10), white/80 text, neutral card border

**Widget promo card (inside CreditSidebar):**
- Dark card + orange/yellow radial gradients
- 3D bag illustration (`/credit-bags.png`) overflowing top-right — money sack with coins + smaller coin jar
- `min-h-[104px]` on the card to prevent button-hiding during hydration
- Primary Button 180×40, text "Buy Credits" with cart icon + chevron
