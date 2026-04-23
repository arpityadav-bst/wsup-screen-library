# Visual Designer — Designer's Reasonings
Last updated: 2026-04-22

The WHY behind the designer's decisions. Not what was chosen — why it was chosen. This file captures the designer's thinking process so the agent can reason the same way about new problems.

---

## On Spacing

**"More slimmer" is the default direction.**
The designer has never once said "make it taller" or "add more padding." Every spacing correction goes tighter. When in doubt, go slim — you'll never be wrong in the direction, only in the degree.

**Overflow is better than growth.**
When an icon needs to be bigger, the container doesn't grow — the icon overflows with negative margin. The container's height is sacred. This applies to banners, pills, stat rows.

**Breathing room for grids, tightness for singles.**
Badge grids and card grids need generous gaps (12px+) because the eye needs separation between repeating items. But individual banners and bars should be as tight as possible because they're single elements — no confusion about boundaries.

---

## On Readability

**70% white is the floor for readable copy.**
Anything a user should actually read — descriptions, bios, body text — must be `text-text-body` (70%). The designer has corrected 40% → 70% and 60% → 70% multiple times. 60% is for labels that orient but don't need to be read word-by-word. 40% is for metadata that exists but shouldn't compete.

**Small text needs wide tracking.**
10px uppercase text at `tracking-[0.2px]` was "too tight." Iterated to 0.8px. The reasoning: uppercase removes ascender/descender cues that help the eye flow, so letter spacing compensates. This is a typographic principle, not a preference.

**12px is the minimum for subcopy.**
10px was "too small" for copyright, stat labels, and subcopy multiple times. The designer's eye finds 10px uncomfortable for anything that's more than 2-3 characters. Exception: `label-xs` at 10px works because it's always uppercase + wide tracking + short.

---

## On Consistency

**Same role = same appearance. No exceptions.**
"See all" and "GROUP CHAT" serve the same role (section action) → must look identical. Follow buttons across tabs → must be fixed width. Category labels in sheets → must all use `label-xs`. The reasoning: inconsistency makes users wonder "is this different?" when it's not. Consistency is UX, not aesthetics.

**One name per concept.**
Token aliases were deleted because having `button-link` AND `secondary` for the same thing creates confusion about which to use. The designer wants one canonical name. If you're tempted to create an alias "for convenience," don't.

**Patterns over one-offs.**
When two components need the same back-nav pattern, extract SubpageHeader. When two buttons serve the same role, use SectionAction. The designer's instinct: if you copy-paste, you've already lost. Extract it.

---

## On Visual Hierarchy

**Weight before size.**
Name and description can be the same font size if name is semibold and description is normal. The eye reads weight differences faster than size differences at small scales. This is why status labels go to font-normal — reducing weight de-emphasizes without shrinking.

**Interactive vs informational is a color decision.**
`text-secondary` (blue) = clickable. `text-text-dim` = status indicator. The designer caught "Active Persona" styled as a link and corrected it. Before choosing a color, ask: "will the user try to click this?" If no, it can't be blue.

**Section labels orient, they don't compete.**
Always muted (60%), always uppercase, always `label-xs`. They're road signs, not destinations. If a section label draws attention before its content, it's too loud.

---

## On Simplicity

**"Dev handoff project, keep it surface level."**
This isn't a production app. Decisions should favor what's easiest for a receiving dev to understand. Show more/less toggle? Removed — just show everything. Custom AppBar? Removed — standard Header is what devs expect. Icons tab in style guide? Yes — devs need a visual catalog, not our React components.

**Don't duplicate entry points.**
Leaderboard button was removed from explore because "accessed via trophy icon in header only." If something is reachable from one place, don't add a second path. Duplication creates maintenance burden and confuses users about which is canonical.

---

## On Tokenization

**Tokens are identity, not convenience.**
`rounded-pill` and `rounded-full` produce the same CSS. But the designer insists on `rounded-pill` because it's the semantic token — it says "this is a pill." Using Tailwind built-ins when a token exists erases the design system's vocabulary.

**Hardcoded hex is a bug.**
Not a style preference, not a "nice to have" — the designer treats any `bg-[#171717]` as a bug to fix. The reasoning: when tokens change, hardcoded values break silently. Every hex should trace back to a CSS variable.

**Inline styles are a last resort.**
If Tailwind can express it, use Tailwind. `opacity-30` not `style={{ opacity: 0.3 }}`. The only acceptable inline styles are truly dynamic values (computed positions, SVG stop-color with CSS vars).

---

## On Platform Differences

**Context-specific solutions > universal patterns.**
Chat bar scrim is different on mobile vs desktop — not because of laziness, but because the contexts are different (mobile has a bg image, desktop doesn't). The designer doesn't force one approach everywhere. Each context gets what it needs.

**Mobile content order = desktop priority order.**
When adapting mobile to desktop, the content that's at the top of the mobile scroll becomes the primary content in the desktop layout. Content order on mobile is a declaration of visual priority.

---

## On Desktop Adaptation

**Reuse, don't rebuild.**
The designer got genuinely frustrated ("whyyyyyyyyyy?") when the right sidebar had rebuilt versions of mobile components. The reasoning: if ProfileHero exists and renders correctly, why would you write new HTML that does the same thing differently? Rebuilding creates drift — two versions that look slightly different, behave slightly different, and now need to be maintained separately. Always import the component.

**Desktop is wider, not different.**
The same components render in the sidebar. The only changes are layout-level: where things are placed, what's hidden, what gets more room. Badges get a grid instead of a scroll because the sidebar has width. The 3-dot moves to the center header because that's where actions live on desktop. But the badge cell itself, the stat row itself, the persona card itself — identical.

**Spacing inverts on desktop.**
On mobile, "more slimmer" is the constant correction — things need to be tighter. On desktop, "more spacing" is the correction — things need to breathe. The designer pushed character grid padding from 12px → 24px → 32px → 48px → 64px across five corrections. Desktop has room. Use it.

**Independent scroll is not optional.**
Center area and right sidebar must scroll independently. If scrolling one affects the other, it means the layout is broken — the root container is scrolling instead of the children. Fix: root `overflow-hidden`, each panel gets its own scroll container with explicit height constraints.

---

## On Shared State Across Viewports

**Components that share state but render differently per viewport are dangerous.**
The 3-dot menu uses `menuOpen` state. On mobile, BottomSheet listens to it. On desktop, Popover listens to it. Both mount when `menuOpen=true`. The Popover added a global `document.addEventListener('mousedown')` that fired on mobile — intercepting every click and closing the BottomSheet before any button handler could execute. The fix: gate event listeners to the correct viewport with `matchMedia`.

**The lesson: when two components share state across breakpoints, their side effects (event listeners, focus traps, scroll locks) must be viewport-gated.** CSS `hidden` hides the DOM element visually but does NOT prevent React effects from running. A hidden Popover still registers its mousedown listener. A hidden BottomSheet still registers its Escape listener. These invisible listeners are the hardest bugs to find because the component isn't visible — you don't think to look at it.

**Never wrap fixed-position overlays in non-fixed parents.**
`<div className="md:hidden"><BottomSheet /></div>` looks harmless but breaks `position: fixed`. The BottomSheet already handles its own `md:hidden`. Adding a wrapper clips it, breaks z-index, and can prevent event propagation. Same applies to any `fixed inset-0` overlay — SocialView, MyCardsView, modals.

---

## On Recommending One Option in a List (Session 12)

**When a list of options has a "best" choice, the recommendation must be visible BEFORE reading.**
In a 4-tier pricing list (Handful / Stack / Bag / Chest credits), users aren't comparison shopping — they're looking for guidance. The Figma spec gives the "Stack" pack a completely different button style (golden gradient) AND a different card background (pink/blue radial glow). Both. Not a badge, not bold text. The whole row becomes visually primary.

**Why not a "BEST VALUE" label?**
A label is what you write when you couldn't figure out how to show it visually. Users scan visual hierarchy in milliseconds — they read labels only after narrowing down. If the recommended option relies on label-reading to stand out, you've hidden it behind a cognitive step.

**Why both button AND background?**
The button alone is a CTA difference; the background alone is a "this row is special" cue. Together, the row reads as a single unified recommendation. One without the other feels half-designed — like the system is uncertain about its own recommendation.

**Why don't the other options get demoted styling?**
They stay clean, tokenized, readable. They are legit alternatives, not failed candidates. The designer's instinct: elevate the primary, don't diminish the rest. A user who wants more than 1000 credits should feel confident picking the "Chest" — not like they're buying a deprecated option.

---

## On Multi-Step Flows Inside One Sheet (Session 13)

**Why a single sheet with an internal `step` state beats 3 separate sheet components.**

The Buy Credits flow is 3 screens: pick a pack → review payment method → scan QR. I could build it as 3 `BuyCreditsSheet`, `PaymentMethodSheet`, `ScanToPaySheet` with callbacks threading state between them. It would work. But it would *feel wrong*.

**The user's mental model is ONE task.** "I'm buying credits." The task has stages, but they're not separate events. Three distinct modal open/close cycles fragment that perception — each dismiss animation + re-open animation is a micro-reset of attention. The user's brain registers "this thing closed, now something else opened," not "I moved forward."

**Visual continuity IS the UX.** The Figma spec has identical shell treatment on all 3 screens: same rounded-popup, same gradient background, same border, same shadow. That's not coincidence — it's the designer telling us these are the same surface at different states. Building as separate sheets would either duplicate the shell in 3 files (code smell) OR break the visual continuity (UX smell).

**Back navigation is trivial with step state.** `setStep('packages')` is one line. Routing between 3 sheet components would mean preserving `selectedPack` state somewhere (parent? context?) and re-opening the previous sheet — more moving parts, more chances to drop state on the floor.

**When to break this rule:** when the "steps" are actually separate concerns with independent triggers. E.g., a confirmation modal that can be opened from multiple places is its own sheet (ConfirmSheet) — because the task IS distinct. The rule is about task coherence, not about whether screens share state.

---

## On Responsive Overlays — Why Two Components Instead of One (Session 6 → 12)

**Every responsive overlay in WSUP is built as two separate components: `BottomSheet` (mobile) + `CenterPopup` (desktop), shared content via a render function.**

Why not a single overlay that restyles per breakpoint? Session 6 tried exactly that with BottomSheet and paid for it — invisible event listeners from the desktop Popover were intercepting taps on the mobile BottomSheet because both were mounted when menu state was open. CSS `hidden` doesn't stop React effects.

The rule hardened through repeat application:
- CharacterStatesSheet (Session 6) — two components, shared `StatesContent`
- ConfirmSheet (Session 9) — extracted because two features needed the same responsive pattern
- BuyCreditsSheet (Session 12) — third consumer; the pattern is now a confirmed default, not an exception

**Why this keeps winning:**
1. Each component is simple — BottomSheet is *only* a bottom sheet, CenterPopup is *only* a centered dialog. No viewport branching inside
2. Event listeners, focus traps, and scroll locks are automatically viewport-isolated because the components are themselves viewport-gated
3. Mobile and desktop UX often want *different* behavior (drag handle vs. click-outside, slide-up vs. fade-scale) — one component fighting two UX specs always loses
4. Shared content stays DRY via a simple function prop — you lose nothing in code reuse

**When to break this rule:** never, for modal overlays. Popovers that anchor to triggers are a different pattern (they stay single-component with viewport-specific positioning).

---

## On Token Reuse (Session 7)

**Only create new tokens when no existing token is close.**
The designer explicitly corrected a build plan that proposed new lifecycle-specific tokens. The reasoning: every new token is a maintenance cost. The design system vocabulary should grow slowly and deliberately. If an existing token + an opacity modifier can express the value, that's the correct approach — not a new token.

**WHY this matters beyond aesthetics:**
- New tokens create naming sprawl — future builders don't know which to use
- Opacity modifiers on existing tokens maintain a single source of truth for the base color
- When the base status-warning color changes, all opacity variants update automatically
- The designer's correction was immediate and firm — this is a core principle, not a preference

**Tailwind opacity modifiers are the bridge, not a hack.**
`bg-status-warning/[0.08]` reads as "status warning at 8% opacity" — it's semantically clear. Creating `bg-lifecycle-moderation-bg` would be a new concept that duplicates what the existing token already expresses. The modifier IS the design intent.

---

## On Dismissible Banners (Session 7)

**Per-session dismissal, not persisted.**
DormancyBanner is dismissible with an X button, but the dismiss state resets on page reload. The reasoning: this is a dev handoff project. Adding localStorage persistence for banner dismiss state is unnecessary complexity that the receiving dev doesn't need to understand. The banner's purpose is to show the pattern — not to ship production behavior.

---

## On Redundancy (Session 7 continued)

**Two rows serving the same data is always wrong.**
A summary bar with counts + a filter tab row with the same categories = redundant. The fix is always to merge: put counts inside the filter pills. The designer catches redundancy instantly because it violates the "less is more" principle at the structural level, not just the spacing level.

**Reuse existing patterns before inventing new ones.**
When FilterPills and CategoryTabs serve the same interaction (select one from many), use the same component pattern. Don't create a new visual style for a familiar behavior. The designer's instinct: "we already have this" should be the first question before any new component.

---

## On Information Sensitivity (Session 7 continued)

**Don't shame users on card surfaces.**
IP infringement/violation reasons should never appear on cards that are visible in list/grid views. The badge signals that something is wrong — that's sufficient at the surface level. Details are discoverable only when the user explicitly taps into the detail view. The reasoning: card surfaces are semi-public (other content surrounds them), and displaying the reason is punitive. The badge informs; the detail view explains.

---

## On Visual Weight as Hierarchy (Session 7 continued)

**Size is the strongest hierarchy signal.**
Active cards and dormant cards cannot be the same size — it implies equal importance. The designer's approach: active cards get 9:16 (tall, prominent, 2-col), dormant/attention cards get 4:5 (compact, recessive, 3-col). The physical size difference IS the hierarchy. Badges and labels are secondary signals — size is primary.

**Primary buttons are singular.**
A primary button repeated across every card in a grid loses its significance. Primary = "the one thing to do." In grids, use secondary/outlined for per-card actions. Reserve primary for the confirmation modal that appears after clicking secondary. One primary per screen, not one per card.

---

## On Default States (Session 7 → corrected Session 8)

**Default to the full picture, not the problems.**
~~Previously: default to "Needs Attention" when dormant chars exist.~~ Corrected: always default to "All." The reasoning: leading with problems sets a negative tone — it frames the experience as "here's what's wrong" instead of "here's everything you have." Users should see the complete state first and choose to drill into issues. The filter exists for focused views, but the landing state should be neutral and comprehensive.

---

## On Email as Brand Extension (Session 7 continued)

**Emails are the product, just in another medium.**
Email templates should use the same brand assets — logo, character images, accent colors, pill button radius. The email is not a separate product; it's the app reaching out. Deviating from the app's visual language (e.g., using emojis instead of colored dots for stat icons) breaks brand consistency. Emojis render differently across email clients anyway — colored dots + text is more reliable and matches the app.

**Don't repeat information per row.**
"Revive for 5 credits" on every row in a table is clutter. The credit cost is contextual information — state it once (in a header or footer), and let per-row links just say "Revive →". Repetition is noise.

---

## On Mobile-Specific UX Treatment (Session 8)

**Edge-to-edge is not always the answer on mobile.**
A dormancy banner that works as a full-width bar on desktop becomes a problem on mobile when the chat has an immersive character background image. The edge-to-edge banner creates a visual wall, blocks the immersive feel, and gives high-priority visual treatment to low-priority information ("dormant but still works"). The fix: a centered floating pill — compact, translucent, lets the background breathe on both sides.

**Match visual weight to information priority.**
"This character is dormant. Chat is still available." is informational, not a warning. Giving it banner/alert-level treatment is a UX mismatch. A pill reads as a status hint. A full-width banner reads as an alert. Choose the treatment that matches the severity.

**The designer's evaluation methodology matters as much as the result.**
The designer screenshots the live state, identifies the problem visually (not in code), generates multiple options (A: header integration, B: slim strip, C: inline message), picks one, then refines it (edge-to-edge → pill). Then audits tokens and icon consistency. Then catches visual sizing issues (text too small, icons too small). This full loop — see → critique → explore → decide → audit → polish → verify — is the process VDA must internalize and run autonomously.

**Explanatory content goes above the thing it explains, not below.**
"Why does this cost credits?" belongs above the card grid, not below. Reading flow: section header → context banner → FAQ → cards with Revive buttons. Placing it below forces users to scroll past all cards before finding the answer to a question they had before seeing the cards. Follow the user's mental model — they ask "why?" before they act.

**One entry point per section for shared info.**
The credit cost explanation applies to all cards equally. Adding it per card repeats it 5 times. Adding it in a modal is too heavy. A single inline accordion for the whole section is the right weight — discoverable, contextual, non-intrusive.

**Readability overrides hierarchy on constrained viewports.**
Dormant cards at 3-col with 4:5 aspect maintain size-based hierarchy on desktop, but on mobile <360px the text wraps and the layout breaks. When the hierarchy principle conflicts with readability, readability wins. Solution: 2-col on mobile (matching active cards), 5-col on desktop (maintaining compact hierarchy).

---

## On Cross-Screen Consistency (Session 8 continued)

**Headers must match across screens.**
SubpageHeader (`text-lg`, 18px, larger arrow) is visually heavier than the Profile page header (`text-base`, 16px, smaller arrow). The designer caught this on the Edit Character page — "does the mobile header seem larger?" It did. Fix: use the same header pattern (h-3xxxl, px-xs, text-base font-semibold, 20x13.5 arrow) rather than SubpageHeader when the page is a sibling of Profile in the navigation hierarchy. SubpageHeader is for overlay-style subpages (SocialView, MyCardsView), not for full route pages.

**Bottom bars must be fixed, not scrolling.**
On mobile, a bottom action bar that scrolls away defeats its purpose. The bar must be pinned — achieved via flex column layout (header shrink-0, form flex-1 overflow-y-auto, bar shrink-0). On mobile, stack the bar vertically (warning text + full-width button) since horizontal doesn't fit.

**Forms center horizontally on desktop.**
A 480px form stretched to full width of an 800px+ center area looks sparse. `max-w-[480px] mx-auto` keeps it readable and visually balanced.

---

## On Character Lifecycle States (Session 8 continued)

**Approved doesn't belong in "Needs Attention."**
"Needs Attention" means the user must act. Approved means the platform already acted — nothing for the user to do. Approved characters return to Active with a temporary badge that dismisses on tap. The badge overrides the engagement tag while visible, then the tag returns.

**Rejected and Removed need distinct visual treatment.**
Both are negative outcomes but mean different things: Rejected = "try again" (actionable), Removed = "it's over" (terminal). Rejected uses red badge on a colorful card. Removed uses red badge on a grayscale/opacity-reduced card in a separate section. The card treatment (not just the badge color) communicates the difference.

**Terminal states go to the bottom.**
The page priority order: Needs Attention (urgent, actionable) → Active (healthy) → Removed (terminal, archival). Users should see actionable items first, not scroll past dead-end cards to find things they can act on.

**Small badges shouldn't have close icons.**
A close icon inside a badge at 10px text size creates a cramped, low-contrast tap target. Better pattern: make the entire badge the dismiss target with a hover state. One tap target, not two competing micro-targets.

**Don't create components prematurely.**
The Secondary/Outlined button pattern appears in 2 places. That's not enough to justify a component. When a third usage appears, extract it. "Three similar lines is better than a premature abstraction."

**Text that says "do X" must let users do X.**
"Visit our help center" without a link is a dead end. Every call-to-action in the UI must be actionable — either link it or remove it.

---

## On Badge Tooltips vs Full State Sheets (Session 8 continued)

**Context-specific info > comprehensive info.**
When a user taps an "Inactive" badge on a specific card, they want to know what "Inactive" means for THAT character. Opening a full popup explaining all 7 states is answering a question they didn't ask. A lightweight tooltip anchored to the badge with one paragraph is the right scope.

**Same positioning logic ≠ same component.**
BadgeTooltip and Popover share dismiss-on-outside-click and absolute positioning. But they serve different purposes: Popover is an action menu (Edit, Share, Delete), BadgeTooltip is informational (one state explanation). Merging them would blur the UX distinction. Shared logic is fine to duplicate when the semantic purpose differs.

---

## On Button Component Design (Session 8 continued)

**Font weight is tied to size, not variant.**
The designer corrected the assumption that primary = semibold and secondary = medium. The rule: if two buttons are the same size (S, M, L), they must have the same font weight regardless of variant. Variant controls color/bg/border — never weight. All buttons use font-medium.

**Why font-medium over font-semibold for buttons:**
The designer explicitly prefers medium. Semibold makes buttons feel heavy. Medium is lighter, more refined. This applies to ALL button variants equally — primary, secondary, dark, CreditButton.

**Tailwind class order matters for overrides.**
`text-sm` sets BOTH font-size and line-height. If `leading-none` appears before `text-sm` in the class list, it gets overridden silently. Fix: put `leading-none` in the size classes AFTER the text-size token. This caused a real bug where CreditButton and Button rendered at different heights despite "identical" classes.

**Card CTAs need breathing room.**
XS size (py-xxs = 4px padding) is too slim for full-width card buttons. The text looks cramped and the tap target is small. S size (py-xs = 8px) is the minimum for card-level CTAs. XS is reserved for truly compact inline contexts.

**Label length must fit the narrowest context.**
"Contact Support" wraps to 2 lines in a 5-col desktop card (81px wide). The fix isn't `whitespace-nowrap` (would overflow) — it's shortening the label. "Support" is sufficient when the card context (grayscale, removed badge) already communicates the meaning. Always test labels against the narrowest card width.

**Component extraction threshold: 2 usages.**
The designer's threshold for extracting a component is 2 usages, not 3. If the same pattern appears twice with the same purpose, it's worth componentizing. "Three similar lines is better than a premature abstraction" — but two components using identical class patterns IS the abstraction signal.

**Text emails are personal notes, not reports.**
A senior UX designer thinks about what the user experiences when they open the email. Scannable in 3 seconds, emotionally engaging, clear next step. Not ASCII art, not code blocks, not a wall of text.

**Minimal formatting creates maximum clarity.**
Bold for names (scan targets), color for status (instant meaning), subtle left border to group characters (visual hierarchy without headers), action links per character (personal, not generic). The formatting serves comprehension — it's invisible when it works.

**Delight is in the details, not the decoration.**
"Revive Mika →" not "Click here to revive." Harlo has no link because there's nothing to do — the absence IS the communication. "Your characters have real fans waiting" — warm but not cheesy. One button, not five. The email respects the user's time and intelligence.

**Think like a UX designer who is also a developer and design system manager.**
Make amazing things, but minimal. Minimum understanding from users, maximum delight. This applies to every output — screens, emails, components, tooltips. Always ask: can a user get the point in 3 seconds? Does this add delight or friction?

---

## On Redundant Entry Points (Session 9)

**Count before you add.**
Before adding a new way to reach an action, count how many already exist. Support had 3 entry points (underlined text, menu item, button CTA) for the same action. The rule: one canonical entry point per action per surface. If a main CTA exists, secondary links and menu items for the same action are noise.

**Confirmation dialogs are informed consent.**
Revive navigating directly to /edit-character skips critical context: that credits are consumed on submission, that edits must be resubmitted. A confirmation step isn't friction — it's ensuring the user understands the consequences before committing. Direct navigation is only appropriate when the action is obvious and low-cost.

**Tooltips need visual anchoring to their trigger.**
A tooltip that appears below a colored badge but has no color connection feels disconnected. The accent color bar (3px top stripe matching badge color) creates an instant visual link: yellow badge → yellow-topped tooltip. The user's eye follows the color.

**Reason text IS the tooltip content.**
When a user taps a "Policy Review" badge, they're asking "why?" The specific policy message ("may infringe on copyrighted content") answers that directly. General guidance ("edit and resubmit") is secondary. Lead with the answer, follow with the action. Don't reverse this hierarchy with a "Reason:" label that makes it feel like a form field.

**Dismiss affordance for non-obvious interactions.**
A tooltip with no close icon and no visible dismiss hint creates a "how do I close this?" moment. "Tap to dismiss" at the bottom is low visual weight (xxs, xxsmall color) but high discoverability. It teaches the interaction pattern without competing with the content.

**2 usages = extract, confirmed again.**
ConfirmSheet extracted after Logout + Revive used the same pattern. The props surface (title, description as ReactNode, confirmLabel, cancelLabel) was obvious from the two usages. Waiting for a third would have meant maintaining duplicate code longer for no benefit.

**Style guide sync cannot be deferred.**
The designer asked to sync the style guide in the same session rather than deferring: "Otherwise it will get much bigger sync in the next session." The cost of immediate sync is small (update 3 files). The cost of deferred sync compounds — more components drift, more patterns go undocumented, the style guide becomes unreliable. Sync as you go, not later.

**Style guide sections should use live components.**
FormsSection renders actual `<FormInput>`, `<FormTextarea>`, `<SelectionPillGroup>`. LifecycleSection renders actual `<DormantCharacterCard>`. This means changes to the source component automatically update the style guide — no manual HTML duplication to maintain. The only cost is importing the component, but the benefit is zero drift.

## Session 10 — On Copy as UX (2026-04-17)

**Copy tone is a design constraint, not a copywriting task.** The PRD's "descriptive not prescriptive" principle affected every component — banners, cards, tooltips, emails. Changing "Review and revive these characters or they will be removed" to "These characters are not currently shown in explore" isn't just wordsmithing — it changes the user's emotional response to the screen. Threatening copy = stressed user = bad UX. Factual copy = informed user = good UX.

**Moderation is private to creators.** Chat users don't need to know WHY a character is dormant. Showing "Policy Review" to someone just trying to chat creates confusion and erodes trust. One neutral banner for all dormant types: "not currently listed publicly."

**Simple > clever for visual communication.** SVG illustrations looked creative in code but were unreadable blobs at 48px on dark backgrounds. Emoji are "boring" but universally understood. The goal is communication, not art.

**UX review must happen BEFORE presenting, not after.** 4 issues caught by the designer in Session 10 (double spacing, unreadable icons, hover-only links, D-key inconsistency) were all things VDA/Claude should have caught. Gate 8 was created specifically because the developer mindset ("it compiles, it's done") misses these. A designer looks at the rendered result and asks "does this feel right?"
