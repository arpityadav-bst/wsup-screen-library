# Visual Designer — Knowledge Base
Last updated: 2026-05-15 (S34 audit — 5 new entries: modal-vs-inline mount-point separation + custom-scrim-wrapper trigger conditions + result-step CTA cardinality + responsive popup parallel-mount + multi-orientation image asset convention)

### Modal popup vs inline chat-stream component — mount-point separation rule
Modal popups (CenterPopup / BottomSheet variants, full-viewport overlays) mount at PAGE ROOT (sibling of `<main>`) so their `fixed inset-0` scrim escapes any parent stacking context and covers Header + Sidebar. Inline chat-stream components (AI bubbles, system notices, in-stream banners) mount INSIDE the chat column so they inherit its responsive width and message-flow positioning. A single component that bundles BOTH variants (the old WatchAdGate dispatcher, retired S34) is wrong by construction — the two mount-point requirements are mutually exclusive, and bundling them forces the wrong location for one variant. **Codified by:** BuyCreditsSheet (page root), DummyAd (page root), ChatStateOverlays (page root), MemoryLimitOverlay (page root) vs WatchAdBubble (chat column inline), SuggestedReplies (chat column inline), DormancyBanner (chat column inline). **Pre-flight check before mounting any new chat-bound component:** ask *"does this need full-viewport scrim coverage, or does it need to live in the chat message stream?"* Full-viewport → page root. Stream-bound → chat column. Never both from one component.

### Custom scrim wrapper trigger conditions — when to use BottomSheet/CenterPopup primitives vs custom
Use BottomSheet/CenterPopup primitives directly when the popup's content fits entirely INSIDE their `overflow-hidden` card. Build a CUSTOM scrim wrapper when the popup needs decorations that extend OUTSIDE the card chrome — variant pills, overhanging character DPs, exclamation badges, ring decorations, anything with `absolute -top-*` / `-bottom-*` / `-translate-y-*` that escapes card boundaries. The primitives' `overflow-hidden` is load-bearing for the rounded-card-corner clipping, so we DON'T remove it; we just escape its scope for popups that need decorations. **Codified by sibling-inheritance chain:** LoginSheet (S30 — variant pill above), MemoryLimitOverlay (S31 — character DP overhanging top), OnboardingOverlay (S32 — tall stage-aware height), DownloadDataSheet (S34 — variant pill above-right). Now 4 consumers — confirmed as a real pattern, not a one-off. **Pre-flight check before reaching for CenterPopup as the "default centered popup wrapper":** inspect the popup's content — does any element have `absolute -top-*`, `-bottom-*`, `-translate-y-*`, or sibling decoration positioned outside the card? If yes → custom scrim wrapper, not CenterPopup.

### Result-step CTA cardinality — single primary CTA only, CloseButton handles give-up
Result steps (success / failure / completion / error) ship a SINGLE primary CTA — the next-step forward path for that variant. The top-right CloseButton handles the give-up / cancel / dismiss path. No secondary "Cancel" / "Not now" / "Maybe later" / "Skip" link below the primary. **Why:** a secondary cancel link is a duplicate exit affordance (the CloseButton already serves it) and adds visual noise to a screen that's supposed to communicate ONE outcome + ONE next action. Per the codified exit-affordance-uniqueness rule's end-state branch (S34 amendment) — at result steps, exit is the natural primary action via the X, and the primary CTA is the dedicated forward path. **Codified by:** BuyCreditsResultStep (S30), DownloadDataSheet ResultStep (S34 — initially shipped wrong with secondary "Cancel" link, designer-caught + corrected). **Success / failure CTA conventions:** success = "Done" / "Back to X" (closes the flow). Failure = "Try again" (re-runs the action). Both wired to either onClose or onRetry; no third option.

### Responsive popup parallel-mount pattern — BottomSheet (mobile) + CenterPopup (desktop), shared body
For popups that need to render on BOTH viewports, mount BOTH `<BottomSheet>` AND `<CenterPopup>` as siblings in the same component. Each primitive owns its own viewport-hide via `md:hidden` / `hidden md:flex` — the consumer doesn't need to know the viewport. Extract a SHARED body component or function so both wrappers render structurally identical content (anatomy stays in sync across viewports by construction). **Codified by:** BuyCreditsSheet (S30 — pioneered), WatchAdSheet (S34 — adopted), DownloadDataSheet (S34 — uses custom wrapper but follows same pattern). Sibling rule on image assets: *when a single image asset doesn't compose well at both portrait + landscape, ship two assets and mount two `<Image>` blocks with the same viewport-hide convention (`md:hidden` / `hidden md:block`).* WSUP example: DummyAd's `dummy-ad.png` (portrait) + `dummy-ad-landscape.png` (landscape). **Pre-flight check before adding viewport-conditional rendering to a popup:** can I use the parallel-mount pattern instead of conditional logic? Almost always yes — the primitive's CSS handles the hide.

### StatusResultIcon — single primitive for result-step icon chrome across all flows
The 72px circular status icon at the head of result steps is a SINGLE primitive (`ui/StatusResultIcon.tsx`) consumed by BuyCreditsResultStep (S30) + DownloadDataSheet ResultStep (S34). Chrome: `size-[72px] rounded-full bg-status-X/[0.15] border border-status-X/[0.30]`. Success glyph: 32×32 ✓ checkmark, text-status-success, strokeWidth 2.5. Failure glyph: 28×28 ✕ cross, text-status-alert, strokeWidth 2.5. **Why the success/failure glyph sizes differ (32 vs 28):** checkmark mass is concentrated to one side; X mass is evenly distributed. Matching sizes would make X read heavier than ✓. The 4px boost on success compensates. **Per-flow content (title, body, CTA) is local;** only the icon chrome is system-wide. **Gate 3 history:** initially duplicated 3× (BuyCreditsResultStep + DownloadDataSheet ResultStep + DownloadDataSheetSection mockup); extracted at S34 audit pass.


Patterns, rules, and technical knowledge learned from working with the designer. Updated every session.

---

## Small single-element typography conventions extract as CSS utility classes, not React components

When a small typography convention (uppercase eyebrow, sticker label, caption style, inline chip-text) gets reused across surfaces, the WSUP pattern is to extract as a CSS utility class via `@apply` in `globals.css` — NOT as a React component. The existing utility family (`.label-xs`, `.link`, `.glass`, `.eyebrow-label`, `.char-overlay`, `.placeholder-icon`) is the precedent. Single-element styling (one `<span>` or `<a>` with specific class composition) belongs in CSS. React component extraction is reserved for MULTI-element chrome — wrappers with children, conditional layout, prop-driven variants (CharacterTagChip, VariantSwitcherPills, MenuPopover).

### Why CSS utility, not component
- **Inline use:** typography labels almost always sit INSIDE another component's JSX. Wrapping in `<EyebrowLabel>` adds visual import noise + a className passthrough story for no real benefit.
- **Composability:** the consumer can extend the utility with additional classes (`className="eyebrow-label mt-xs"`) without prop drilling.
- **Convention familiarity:** the WSUP utility family is established. New devs find utilities by grep through globals.css; new components would need their own discovery path.
- **No state needed:** these utilities are stateless visual treatments. No useState, no useEffect, no children logic — React component is overkill.

### Pre-flight check before building any small chrome primitive
Ask: *does this convention have STATE, CHILDREN, or PROP-DRIVEN VARIANTS?*
- No → CSS utility via `@apply` in globals.css. Register in `style-guide/sections/tokens/UtilitiesSection.tsx` alongside `.label-xs` / `.link` / `.glass`.
- Yes → React component primitive. Register in `style-guide/sections/components/` with its own section.

### Codified utility family (as of S33)
- `.label-xs` — 10px medium text-small tracked 0.8px uppercase. Form-field section headers.
- `.eyebrow-label` — 10px medium text-dim tracked 0.4px uppercase. System-voice CATEGORY signals above titles.
- `.link` — text-secondary underline with subtle decoration. Inline text links.
- `.glass` — white-10 bg + backdrop-blur-bg. Glass-style surfaces.
- `.char-overlay` — black/85→transparent gradient. Character-image content overlays.
- `.placeholder-icon` — white 10% fill + stroke. Empty-state icon placeholders.

When a new single-element typography convention emerges with 2+ consumers, add to this family.

---

## Entry-point divergence on consolidation refactors — audit each entry point individually

When consolidating two surfaces with different commit semantics into ONE (e.g., ModelPickerSheet's auto-commit-on-tap + selectedId pre-fill merged with ChatStyleSheet's draft-then-Continue + no pre-fill), **each previous entry point had its OWN implicit state preferences that the consolidated surface must serve.** The consolidated component can't just inherit one of the two surfaces' init mode — it needs all the init modes the entry points expect.

### S33 example: ChatStyleSheet selectedId
Pre-consolidation:
- ModelPickerSheet (in-chat pill click): opened with selectedId pre-filled → user saw their current model highlighted
- ChatStyleSheet (chat-start): opened with draft=null → user picked deliberately

Post-consolidation (initial):
- ChatStyleSheet at all 3 entry points: opened with draft=null
- Mid-chat pill click forced user to re-select their currently-active model just to confirm it
- Caught by audit pass, not by design review (design review didn't test the pill-click path post-consolidation)

Fix:
- Added optional `selectedId` prop to ChatStyleSheet
- Mid-chat trigger passes `selectedId={selectedModelId}` → pre-fill + CTA enabled immediately
- New-chat trigger omits the prop → fresh start preserved
- Auto-jumps to `step='other'` if selectedId is in other tier (so the row is visible)

### Pre-flight check before consolidating two surfaces
For each previous entry point, ask:
1. What was the init state when that entry point fired? (fresh / pre-filled / mid-step)
2. What was the commit semantic? (auto / draft+confirm / preview-only)
3. What were the implicit user expectations? (recognize current state / start fresh / quick switch)

If any entry point's expectations differ, the consolidated surface needs a prop to switch modes — not a hardcoded one-mode-fits-all default. Default should be the LEAST surprising mode (usually fresh-start); the entry points that need other modes pass the prop.

### Same-edit rule
When consolidating, update ALL entry points + the consolidated surface in the same edit. Walk through each entry point's trigger code; verify the surface call passes the right props for that entry point's expected init mode.

---



## Swipe-surface conventions catalog (added S32 follow-up #3 audit)

**When VDA touches anything swipe-like next time, read this catalog FIRST** — every pattern below was discovered in S32 and codified here so a v1 build can land closer to the final state.

### Anatomy

| Layer | Convention | WSUP example |
|---|---|---|
| **Outer wrapper** | Aspect-locked container sized to parent height (`h-full max-w-full aspect-[9/16]`). Width auto-computes from aspect. No fixed `max-h` — card scales with viewport. | `DeckCardSwiper Wrapper` |
| **Card surface** | Mirror the explore CharacterCard anatomy: image fills the card (`<Image fill object-cover object-top>`); gradient scrim at bottom (`bg-gradient-to-t from-black via-black-60 via-[42%] to-transparent to-[60%]`); content overlays the bottom 40% of the image. **NO** image-on-top + body-below split. | `DeckCard` |
| **Top-left badge** | Category/role chip on a per-category linear-gradient background + per-category SVG glyph. Outline of `border-white-20`, shadow `shadow-small`. Sizes: padding `px-xs py-xxs`, glyph `12px`, label `text-xxs font-semibold`. | `DeckCard.CATEGORY_VISUALS` |
| **Top-right chip (optional)** | "Top pick for you" or similar flag. Glass chrome (`bg-black-60 backdrop-blur-popup border-white-10`), green status dot + `text-xxs font-medium`. | `DeckCard` top-right chip |
| **Bottom overlay content** | `flex flex-col gap-xs p-s`. Order top-to-bottom: name + meta → description (text-xs leading-snug, NON-italic, line-clamp-2) → tags row (matches CharacterCard chip style) → opening bubble at the very bottom (closest to the card's tail-corner). | `DeckCard` bottom overlay |
| **Opening bubble** | Mirrors `ChatMessages.AIBubble`: `bg-chat-ai-bubble`, `px-s py-xs rounded-tl-2xl rounded-tr-2xl rounded-br-2xl` (bottom-left flat for the speech tail). Avatar bottom-aligned (`items-end`) to the bubble's tail corner. NO action items (audio, like, regen, kebab). | `DeckCard` opening bubble |
| **Tags row** | Title case (NOT ALL CAPS) — match explore CharacterCard. **Chrome lives in the `<CharacterTagChip>` shared primitive** (`src/components/shared/CharacterTagChip.tsx`) — `text-xxs font-normal px-xs py-[3px] rounded-pill bg-white-10 backdrop-blur-bg text-white-80 border-white-10`. Never re-create inline — consume the primitive. Used on CharacterCard (/explore), DeckCard (onboarding), ChatRightSidebar (/chat). | `DeckCard` tags / `CharacterTagChip` |
| **Action buttons** | Wider pill buttons (NOT round icons). `flex-1` each, 52px tall, icon + label (`× Pass` / `♥ Like`). Outline + low-fill: `border-2 border-status-{alert,success}`, `bg-status-{alert,success}/[0.08]` (hover bumps to 0.18). No "primary" weight — binary decision, equal hierarchy. | `DeckActionButtons` |

### Behavior

| Concern | Convention | WSUP example |
|---|---|---|
| **Persistent stack** | Render `slice(index, index + 3)` simultaneously. Top card fully interactive + animated; peeks render `DeckCard` with no interaction, no animation, no bubble. Slot transforms: slot 0 = no transform, slot 1 = `translateY(10px) scale(0.95) opacity(0.7)`, slot 2 = `translateY(20px) scale(0.90) opacity(0.45)`. | `OnboardingDeckStep` |
| **Coordinated commit motion** | When top card commits a swipe, peek cards animate UP one slot **in parallel** with the top's fly-off (320ms ease-out). Achieved by: parent state `swipingOut` flips on `onCommitStart` callback; peeks compute `effSlot = swipingOut && slot >= 1 ? slot - 1 : slot` and apply the corresponding transform via CSS transition. After commit completes + index advances + `swipingOut` resets, state lines up naturally. | `DeckCardSwiper.onCommitStart` + `OnboardingDeckStep.swipingOut` |
| **React reconciliation** | Cards keyed by `character.id` so React preserves the underlying instance when a peek promotes to top — no unmount/remount blink. The swiper renders the same wrapper structure for `interactive=true` and `interactive=false` so swap doesn't break the chain. | All deck components |
| **Three convergent trigger paths** | Action buttons, ←/→ keyboard arrows, drag-past-threshold all fire the same `commit(dir)` pipeline. Imperative ref (`useImperativeHandle`) exposes `swipe(dir)` for button + kbd callers. | `DeckCardSwiper.commit` |
| **Drag gesture** | Pointer events on the top card wrapper: `pointerdown` captures start X + pointer ID, `pointermove` updates `dragX`, `pointerup` commits if `abs(dragX) > 80px` else snaps back. `touch-action: pan-y` preserves vertical scroll inside the card body. | `DeckCardSwiper.onPointerDown/Move/Up` |
| **Commit animation** | Top card transforms to `translateX(±600) rotate(±30°) opacity(0)` over 320ms ease-out. After animation, parent's `onSkip`/`onLike` fires → index advances → component unmounts. | `DeckCardSwiper.commit` |
| **Swipe color tint** | Full-card colored gradient overlay during drag: red on left (`status-alert`), green on right (`status-success`). Opacity scales with `min(1, abs(dragX)/120)`. Locks to 1 on commit so the color decision visually finalizes before fly-off. Mirrors explore CharacterCard's purple-hover-tint convention, just with directional color semantics. | `DeckCardSwiper.redTint/greenTint` overlays |
| **Bubble reveal sequence** | Top card only (peeks suppress bubble entirely). After card mount + 1000ms pause: bubble pops in showing 3 typing dots (1400ms animating). Then dots → message text revealed character-by-character at 25ms/char (typewriter). | `DeckCard.bubblePhase` + `charsShown` |
| **End-of-deck state** | When `index >= deck.length`, render dedicated end-state component (NOT auto-close). Two CTAs: primary = "Show me more" (next batch in production), secondary = "See them again" (replay current). No third "exit" CTA — header's Skip pill already serves /explore. | `OnboardingDeckEmptyState` |
| **Action labels** | Descriptive verb phrases, NOT slang. "Show me more" / "See them again" — clear to first-time users. "Run it back" reads as colloquial idiom; only safe for veteran users. | `OnboardingDeckEmptyState` CTAs |

### Pre-flight grep checklist before building any swipe surface

1. `grep "CharacterCard" src/components/shared/` — anatomy precedent
2. `grep "AIBubble" src/components/chat/ChatMessages.tsx` — bubble chrome precedent
3. `grep "aspect-\[9/16\]" src/` — aspect ratio precedent
4. `grep "TypingIndicator\|animate-bounce" src/components/chat/` — typing dots pattern
5. `grep "useImperativeHandle\|forwardRef" src/` — imperative-trigger-from-parent pattern

If you wrote a swipe surface and didn't grep these — that's a Gate 2.2 sibling-surface-inheritance fail. Add a watch row to scratchpad.

---

## Adding to a discriminated union: every narrowing chain that returns a sub-type must be updated in the same edit

`ChatDemoState` is a discriminated union (`'active' | 'context-exhausted-popup' | 'chat-style-popup' | ...`). Multiple consumers narrow it back down to a sub-type — e.g., `headerCharacterState: CharacterState = ...` in `chat/page.tsx` chains conditions to map all popup/safety states to `'active'` and pass everything else through. **The trap:** when you add a new variant to the union, every narrowing chain that does NOT include that new variant fails strict typecheck because the residual type after narrowing still includes the new variant — incompatible with the narrowed annotation.

### S30 → S31 example
S30 added `'chat-style-popup'` to `ChatDemoState`. The narrowing chain at `chat/page.tsx:60` returned `CharacterState` but only matched 4 popup/safety states — `'chat-style-popup'` slipped through, residual type `CharacterState | 'chat-style-popup'` was incompatible with `: CharacterState`. `next dev` silently passed (loose typecheck); `next build` (strict) failed. Both S30 commits failed Vercel; production stayed stuck on S29 until S31's hotfix added the missing branch.

### Same-edit rule
When adding to a discriminated union (or modifying its members):
1. Grep the codebase for every place that narrows the union to a sub-type — search for both `=== 'old-variant'` patterns AND any `: SubType` annotations after a narrowing chain
2. Update each chain in the SAME EDIT as the union change
3. Run `npx next build` before pushing (not `next dev` — strict typecheck only kicks in on build)

### S31 confirmation pattern
When `'claim-credits-popup'`, `'credit-service-popup'`, etc. were added to `ChatDemoState` later in S31, the narrowing chain in `page.tsx` was updated in the same commit — no Vercel surprise. The lesson stuck.

---

## Don't run `npx next build` while `next dev` is alive — it corrupts the `.next/` cache

Both commands write to `.next/` but produce different module manifests. Running them concurrently scrambles the cache; dev server starts returning 500 errors with `MODULE_NOT_FOUND` pointing at stale chunks. Recovery: `npx kill-port 3000` → `rm -rf .next` → `npm run dev`.

### S31 confirmed pattern
- First hit: mid-session, after a local `next build` to verify the Vercel hotfix locally. Dev server returned 500 immediately after the build finished.
- Second hit: during the close audit, when running `next build` to verify production-build cleanliness. Same 500 on `/style-guide`.

Both required the kill-cache-restart cycle to recover.

### Pre-build checklist
If dev is running, stop it (`npx kill-port 3000`) before `next build`. Or run build in a separate clone / CI. The "verify with build" instinct (codified in S30 close audit) is right; the trap is doing it without stopping dev first.

### Why this is its own knowledge-base entry
This is a concrete, repeatable Next.js infrastructure quirk that bit twice in one session. Not a design rule, not a taste rule — pure tooling knowledge. Belongs here so future sessions don't lose 5 minutes diagnosing the same symptom.

---

## Fixed-positioned overlays must mount in the highest-applicable stacking context

`position: fixed` is supposed to position relative to the viewport. But its EFFECTIVE z-index is always *scoped to its parent stacking context*. So if an overlay is mounted inside an ancestor that has `position: relative` + a non-auto `z-index` (creating a stacking context), the overlay's z-70 only competes within that ancestor's stacking unit — not globally against Header (z-50) or Sidebar (z-40) which live in the root.

### The trap (S31 example)
MemoryLimitOverlay was mounted inside `<div className="relative z-10 flex flex-col h-full">` (the chat UI inner wrapper). Even though the overlay used `fixed inset-0` + z-70 + bg-black-55, its visual stacking was: *"the chat UI inner's z-10 stacking unit, painted on top of the chat column."* Header + Sidebar (rendered in the global root with their own z-50 / z-40 fixed) painted ON TOP of it because they competed at the global level while the overlay competed only within the local context.

### Diagnosis pattern
- Bounding rect inspection shows the overlay covers full viewport ✓
- z-index computed style shows z-70 ✓
- Visual rendering shows the overlay only darkens part of the screen ✗
- Walk the parent chain — any ancestor with `position: relative` + non-auto `z-index` is the trap

### Fix
Move the overlay mount UP the DOM until it shares the root stacking context with Header / Sidebar — typically a direct child of the page wrapper (`<div className="bg-page-bg">` in WSUP). Then z-70 wins globally.

### Pre-flight check before adding a new overlay/popup
Walk the proposed parent chain. If any ancestor has `position: relative` + non-`auto` z-index, mount the overlay higher (page-level, not feature-level). Same goes for `transform`, `filter`, `perspective`, `will-change`, `contain` — but stacking-context-via-z-index is the most common trap because so many WSUP wrappers use `relative z-10` for layering within their own region.

### Rule of thumb
The mount location of a fixed overlay is part of its design contract. Two valid mounts:
1. **Page-level (highest-z-applicable)** — overlay competes globally; correct for full-viewport scrims (ModelPickerSheet, ChatStyleSheet, StreakClaimPopup, MemoryLimitOverlay)
2. **Feature-level inside a stacking context** — overlay scoped to that region; correct for region-specific affordances that intentionally do NOT cover Header/Sidebar (e.g. a chat-column-only menu popover)

Picking the wrong one is what made the S31 MemoryLimitOverlay fix appear broken even after the CSS itself was correct.

---

## SVG illustrations with internal `id` references are fragile under multi-mount

Whenever a component contains an inline SVG that uses internal `<linearGradient id=...>`, `<radialGradient id=...>`, `<clipPath id=...>`, `<mask id=...>`, or any other element with an `id` referenced via `xlinkHref` / `clip-path="url(#...)"` / `fill="url(#...)"`, the IDs are document-scoped — not SVG-scoped. If the same component renders at two mount points on the same page, both DOM trees ship the SAME ids, and the browser resolves URL references to the FIRST occurrence in document order. If that first occurrence is inside a `display:none` subtree, paint silently fails — paths are filled with the unresolved-paint fallback (typically transparent or black) and the illustration vanishes even though `gradientCount` looks correct under DOM inspection.

**WSUP example (S30 bug):** SafetyBanner had two viewport-conditional mounts (`md:hidden` for mobile + `hidden md:flex` for desktop). Both rendered the heart-hands SVG with 24 internal gradient IDs (`shi-SVGID_1_` etc). On desktop, the visible card's gradients pointed to the mobile (display:none) gradient definitions — empty paint.

### Three remediation options

1. **Mount once with viewport-conditional positioning classes** — default. Use Tailwind responsive prefixes (`md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2`) to switch between mobile and desktop layouts on a single DOM tree. Works when both mount points render identical content with only positioning differing.
2. **Generate per-instance ID prefixes via `useId()`** — escape hatch when content / positioning differs enough that one mount can't serve both viewports. React's `useId()` returns a stable unique string per render instance; prefix all internal SVG IDs with it. More wiring, but lets the same component mount in multiple positions safely.
3. **Avoid internal IDs in the asset entirely** — requires re-authoring the SVG to use only inline `fill` / `stroke` / `opacity` (no gradients, no clipPaths, no masks). Cleanest when feasible but loses fidelity for gradient-rich illustrations.

### Pre-flight check before adding any new SVG-containing component

Run this grep before declaring a new component done:
```
grep -E '<linearGradient|<radialGradient|<clipPath|<mask|<filter|<pattern' <component-file>
grep -c '<NewComponent' <pages-or-other-mounts>
```
If the SVG has any internal-id elements AND the component mounts more than once per page → you need one of the three options above. The DOM-presence test (`querySelectorAll('svg path').length`) is **NOT** sufficient to catch this bug. Only a visual-output test (Playwright screenshot of the actual painted pixels) catches it.

### Why this is its own knowledge-base entry

S30 shipped a refactor (multi-mount with viewport-conditional `display:none`) that passed every gate except Gate 8 (visual output). DOM inspection said all 21 paths existed, all 24 gradients existed, all `fill` attributes referenced valid URLs. The painted pixels said "nothing visible." The miss class is *DOM-correctness vs paint-correctness divergence* — and it's invisible to any audit that checks the DOM only. Codifying this entry makes the trap explicit so future SVG-bearing components route through one of the three options BEFORE landing.

---

## TopOfChatBanner shared anatomy — single chrome spec for all banners that occupy the top-of-chat slot

Any banner that occupies the top-of-chat slot (the row directly under `ChatHeader` on desktop, or the absolute-overlay-at-top on mobile) shares ONE codified chrome. **As of S30:** `DormancyBanner` (character state) is the sole canonical member of this family on BOTH viewports. `SafetyBanner` (platform intervention) uses this spec only on MOBILE — its desktop layout was re-classified by PM directive to the *centered-popup* family (matches MemoryLimitPopup precedent: `rounded-card` + `bg-profile-sheet-bg` + `border` + `shadow-popup`, mounted via absolute centered overlay in chat column). Future banner-class surfaces still match this spec; surfaces classified as popups follow the centered-popup family instead. See decisions.md S30 entry for the override context.

### The spec

| Aspect | Value |
|---|---|
| **Desktop bg** | `bg-white-05` (5% white over `bg-page-bg` — the canonical "elevated dark surface" for in-chat banners) |
| **Mobile bg (in-flow banner)** | `bg-white-05` if banner is in the flex flow (DormancyBanner pattern) |
| **Mobile bg (absolute overlay)** | `bg-profile-sheet-bg` (#1a1a1a solid) — needed because the banner sits over arbitrary chat content (character image / messages) and needs full opacity |
| **Border bottom** | `border-b border-white-10` (always — separates banner from chat content beneath) |
| **Border outer** | None — edge-to-edge with chat column (no rounded outer corners, no horizontal margin) |
| **Horizontal padding** | `px-m` (16px) on the banner's outer wrapper |
| **Vertical padding** | scoped per banner content density — `py-s` for short status banners (DormancyBanner desktop), `py-m` for taller decision banners (SafetyBanner). Both within the WSUP scale |
| **flex-shrink** | `shrink-0` — banner never compresses when chat content is tall |
| **Close button** | `<CloseButton>` primitive (NOT hand-rolled) with `-mr-icon-btn` for optical edge alignment |
| **Mobile vs desktop position** | Character-state banners (DormancyBanner): in flex flow under header on both viewports — this remains the canonical banner-class behavior. SafetyBanner mobile uses this slot via absolute overlay at top (`absolute top-0 left-0 right-0 z-20`). SafetyBanner desktop is **NOT** in this family as of S30 — see centered-popup family in decisions.md |

### Mutual exclusion

When two top-of-chat banners could fire simultaneously, **platform intervention wins** — safety/medical/financial alerts override character-state messaging because the urgency is categorically higher. Implementation: page-level state checks safety variant first; renders DormancyBanner only if no safety alert is active.

### Why this entry exists

S29 introduced SafetyBanner without grepping DormancyBanner's chrome first. The result was `bg-profile-sheet-bg` everywhere instead of `bg-white-05` desktop — a Gate 7 miss the designer caught at the end of the build. **The shared anatomy was implicit before this entry; now it's explicit.** Future banners landing in the top-of-chat slot read this spec FIRST, then build.

### Rule of thumb

Before adding a new banner-class component to chat: (a) check whether it occupies the top-of-chat slot (under header) or above-ChatBar slot (session-state, different anatomy entirely — see banner-position taste rule); (b) if top-of-chat, this entry's spec is the only valid chrome; (c) only the content/illustration/copy/buttons differ per variant.

---

## Menu cluster ordering — management above destructive, never split

Menus that combine non-destructive *management* entries (My cards, Blocked creators, Settings) with *destructive* entries (Log out, Delete account, Remove from collection) order by cluster, not by use-frequency. Management items at the top, destructive items at the bottom. New entries always insert into their matching cluster — never between two destructive items, never separating a destructive item from its sibling. **Two reasons the destructive cluster stays atomic:** (1) finger-rest position — destructive items live at the bottom because that's the hardest position for an accidental tap to land on; (2) visual cohesion — both reds reading as one zone makes severity legible at a glance. Inserting a non-red item between them would fragment the zone and break both signals. **WSUP example:** self `MenuSheet` order is `[My cards, Blocked creators, | Log out, Remove account]` — the imaginary divider lives between the two clusters, never inside either.

**Rule of thumb:** when adding a new menu item, identify its cluster first (management or destructive), then place it at the *end* of that cluster, not somewhere in the middle. Cluster end = farthest from the boundary with the other cluster.

---

## Surface chrome lives in ONE place — per-instance code should only supply content

When a recurring surface (popover, sheet, card, dialog) has a fixed look — same bg, same border, same radius, same shadow, same internal padding — the chrome belongs in a single primitive. Per-instance code should pass *only* the content (items, body, action buttons). Duplicating chrome across files is how stack padding doubles up: one instance adds `p-xs` to its container, another adds `p-xs` AND `py-xs` to its inner wrapper, a third forgets the wrapper entirely — and the same "type" of surface now has three slightly-different-looking variants across the app. The fix isn't to write down the magic numbers; the fix is a primitive that *enforces* the chrome by encapsulating it.

**WSUP example:** `MenuPopover` codifies this. Every centered-text menu (chat, profile, character, public) gets identical surface chrome because every menu mounts the same primitive. Per-menu code only supplies the `items[]` array.

**Rule of thumb:** if you find yourself copy-pasting `bg-X border-Y rounded-Z shadow-W p-N` across files for the same surface concept, stop and extract.

---

## Uniform breathing inside a pill/badge: use a square wrapper sized to container height

When a small element (icon, dot, single character) needs to sit inside a pill, badge, or button with uniform breathing on all sides, the wrong instinct is to balance `padding-left` against the implicit vertical breathing. The right move: give the element a square wrapper sized to the container's height (`w-8 h-8` inside an `h-8` pill), with the element centered via `flex items-center justify-center`. The square fills vertically (zero vertical padding) and starts at the container's left edge (zero horizontal padding before it). Breathing is automatic and equal on all four sides — `(container - element) / 2`.

**Avoids two failure modes:** (a) trial-and-error padding math, (b) the "circle-on-pill" look that happens when an inner-circle background creates a visible second container.

---

## Standardize element heights inside a horizontal control row — don't let intrinsic sizes drift

A horizontal row of mixed elements (chips with text, icon buttons, close pills) will have *different intrinsic heights* if you size them via padding alone — text-content elements get heights from `font-size + line-height + padding`, icon-only elements get heights from explicit `w-X h-X`. The drift produces a visibly uneven row even when each element is "correct" in isolation.

**Rule:** pick a target height for the row (`h-7`, `h-8`, etc.), apply it explicitly to every element, use `flex items-center` inside elements with non-text content. Padding becomes a horizontal-spacing-only concern. The row reads as a clean strip; nothing looks like an afterthought.

---

## Icon-with-modifier needs a single integrated SVG — don't compose from layered elements

"Bulb-off," "bell-muted," "eye-hidden," "user-blocked" — every icon-with-modifier looks janky when implemented as two layers (the original `<img>` plus a CSS-positioned line/slash on top). The two layers don't share anti-aliasing, line-weight, scale-rendering, or stroke-cap geometry; the modifier reads as "stuck on" rather than "part of the icon." Source or draw a single SVG that integrates the modifier into the icon's path geometry — same `stroke-width`, same `stroke-linecap`, same viewBox, same anti-aliasing pass. Lucide, Phosphor, and Heroicons all ship integrated `*-off` variants; use them rather than overlaying.

**Rule of thumb:** if an icon needs a strikethrough/slash to communicate state, the strikethrough belongs in the icon's SVG, not in a positioned wrapper.

---

## Layout shifts during a click can swallow the click — the chatbar-shrinks-on-mousedown bug

When element A's click handler causes a vertical-layout shift that moves element B (the click target), and the mouseup happens AFTER the shift, the click on B never fires — because `onClick` requires mousedown AND mouseup on the *same* element. Browser fires mousedown, document handler runs, layout shifts, cursor is now over a different element, mouseup hits that, click is never registered on B.

**Two ways to guard:**
1. Don't cause a layout shift on mousedown — make element A's outside-click handler aware of element B's container (shared ref), so clicks on B don't trigger A's collapse.
2. `onMouseDown={(e) => e.preventDefault()}` on B — fires the click action on mousedown phase, before any browser default focus/blur side-effects can shift the layout.

**WSUP fix used both:** lifted ChatBar's outside-click ref to share with SuggestedReplies (primary fix), plus belt-and-suspenders `preventDefault` on every suggestion button (defensive).

**The signal that you have this bug:** "first click does something I didn't expect, second click works."

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
5. **Style guide sync** — runs on **audit pass** under the dual-cadence model. Inline: flag a scratchpad row noting which section needs updating. Audit pass: actually update the style guide section to match the new visual. Component + style guide alignment IS still required — its TIMING shifted from "same edit" to "next audit pass."
6. **VDA learns** — split into scratchpad-inline (one-line WHY captured at the correction-resolution turn) + audit-pass promotion (full decisions.md row with reasoning + alternatives + Gate 6.5 generalization + rule-conflict cross-check). The "log → reply" discipline still applies, just to the scratchpad now, not directly to decisions.md.

**Cadence rule (replaces the old "Same edit" rule):** Gates 5 and 6 heavy work is deferred to the designer-triggered audit pass. The discipline is preserved: scratchpad-write happens within the correction-resolution turn (not "next session"); audit pass owns the heavy sync. If the scratchpad isn't written at the moment of decision, the audit pass backfills from memory — that's the failure mode the new cadence is designed to prevent. Learned originally from: credit icon change was made in ReviveConfirmSheet but style guide and VDA were not updated until the designer caught it. The fix wasn't "do everything inline" — it was "capture the WHY in scratchpad, sync the heavy stuff on audit."

**Same rule for tokens:** If a token is added or modified in tailwind.config.ts or globals.css, the style guide token section must be updated **by the audit pass**, not as a follow-up session. Inline: scratchpad row noting the value + threshold + intended token name.

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
