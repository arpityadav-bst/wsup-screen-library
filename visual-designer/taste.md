# Visual Designer — Taste Profile
Last updated: 2026-05-08 (S30: trigger-semantics scope clause on the duplicate-entry-points rule)

### Match FILL RATIO, not just box height, when sizing icons next to text inside chips
Two chips with identical DOM height can still LOOK different heights if their visible content has different fill ratios within the box. Text inside text-xxs/text-sm/etc. naturally has line-height padding around glyphs — text glyphs typically fill ~60-70% of the line-box height, leaving ~15-20% breathing room above and below. A bare SVG icon designed to fill 100% of its box reads as "taller" than adjacent text chips at the same DOM height because the eye sees the content extent, not the box. **Rule:** when sizing a non-text icon to live alongside text chips, set the SVG dimensions to match text line-height, then size the icon's INTERNAL content to ~60-70% of the SVG height. This makes the icon visually read at the same "weight" as adjacent text glyphs. **WSUP example:** SignalIcon iteration in S30 — first version had tallest bar at 100% SVG height (h=12 in 12-tall viewBox), making the signal chip look stretched vs text chips where text glyphs sat with breathing room inside line-height. Reduced tallest bar to h=8 in 14-tall viewBox (~57% fill ratio), matching the text-chip fill ratio. **Pre-flight check:** when an icon-only chip looks "off" next to text chips at the same DOM height, inspect the icon's content fill ratio. >75% → too dense, reduce. <50% → too sparse, increase. ~60-70% matches text glyph behavior.

### Two audiences for the same feature can warrant two row anatomies — design density to match the audience, not for surface symmetry
The instinct to "keep rendering consistent" across surfaces breaks down when the surfaces serve different audiences. A power-user surface (in-context switching, mid-task) wants dense info — every metadata affordance visible, scannable. A general-user surface (onboarding, start-of-flow, low context) wants curated info — fewer cues, friendlier framing. Same underlying data, different anatomy. **Rule:** when the same feature appears on both a power-user surface AND a general-user surface, design EACH surface's row anatomy to match its audience's cognitive context — don't reuse the dense version on the lighter surface "for consistency." Forcing the dense layout into the general-user context overwhelms; forcing the light layout into the power-user context wastes their established navigation skills. **WSUP example (S30):** chat-LLM model picker has two surfaces. **ModelPickerSheet** (in-chat switch, power user): row = title + 3 chips (latency/personality/cost) + description below. Dense, scannable — user already knows what they're picking. **ChatStyleSheet** (start-of-chat onboarding, general user): row = avatar (40px circle) + name + tagline (≤6 words). Light, narrative — user is choosing how this conversation will feel. Same MODELS data source; two completely different row components. Both are correct for their context. **Pre-flight check:** when adding a feature to a second surface, ask *"is this surface's audience the same as the first?"* If yes → reuse the row component. If no → design a new row component for the new audience's needs, even if the underlying data overlaps 100%. **Counter-example (where same row IS correct):** ModelPicker rendering on mobile vs desktop — same audience, different viewport. One row component, responsive layout. The split is by AUDIENCE, not by viewport.

### A coherent set of inline metadata affordances should share chrome — heterogeneous chrome breaks the "set" reading
When a row has multiple inline affordances that all describe one entity (e.g., a model row with latency / personality / cost; a profile row with rank / role / status; a card with category / tag / price), they should share container chrome — same bg, same radius, same padding, same height. Heterogeneous chrome (one bare icon + two pill badges, or three pills with three different radii) breaks the "set" reading: the user's eye parses *three different things* instead of *three facets of one thing*. The mental cost is small per-row but compounds across a list. **Rule of thumb:** when about to add multiple inline metadata affordances to a row, ask *"are these one set or distinct affordances?"* If a set (each describes the same entity from a different angle) → force identical chrome. If distinct (e.g., status indicator + admin action button = two unrelated concerns) → keep them visually separate. **Implementation:** local Chip helper inside the consuming component, not necessarily a global primitive. Local-Chip-not-global-primitive is correct when the rectangle/pill/etc. style is a per-surface design call rather than a system-wide convention; extract globally only when 2+ surfaces use the same chrome (Gate 3). **WSUP example:** ModelPickerSheet originally had bare-SignalIcon + Badge-personality + Badge-cost (heterogeneous: SVG floating among pills). Designer asked for the latency to "have a container too like model alias and price." Wrapped all three in a local Chip helper (bg-white-10 rounded-button uniform height) — row now reads as one set. Used a local helper, NOT a Badge variant or new primitive, because Badge's pill style remains correct for other consumers.

### Baseline alignment in mixed-content inline rows — items-baseline ONLY when all items have consistent baseline semantics
**The rule's two modes:**
- **All children are text** (or text-bearing children with similar internal layout) → `items-baseline` is correct. CSS aligns text baselines directly; reads as "all text bottoms on one line."
- **Mixed content types** (some text-only chips, some SVG-only chips, some icon+text chips) → `items-baseline` is WRONG. Inline-flex elements compute their baseline from content: text-only reports text baseline (inside box), SVG-only reports bottom-of-box, icon-leading-then-text varies by browser. Aligning these heterogeneous baselines causes the text-only items to drop visibly below the icon-only items (their box bottoms sit lower because the layout aligned their text baseline to the others' box bottoms). **Use `items-center` with uniform box heights instead** — same box height + center alignment = matching tops, centers, and bottoms across all items.

**Pre-flight diagnostic:** look at each child's rendered baseline anchor.
- Text inside the child? → baseline = text baseline (inside box)
- Only SVG/replaced element? → baseline = bottom of box
- Mixed? → varies, usually bottom of box

If diagnoses match across children → items-baseline. If they don't → items-center + uniform heights + matched line-height on any text siblings outside the chips.

**WSUP example (S30 evolution):**
- Round 2: tried `items-center + leading-none` on title — fixed title's own internal asymmetry but did NOT align title baseline with badge text baselines (badges' geometric centers are offset from their text baselines by their padding).
- Round 3: switched to `items-baseline` — worked when all chips were text-bearing (Badge primitive with personality + cost text). Title bottom, "Weaver" text bottom, "Free" text bottom all aligned. ✓
- Round 4: introduced SVG-only signal chip into the row. items-baseline now misaligned the text-only chips because the SVG-only chip reported bottom-of-box as baseline, while text chips reported text baseline.
- Round 5 (current): switched to `items-center` + made all chips uniform height (text line-height + padding = 18px) + `leading-[18px]` on title for matching center. All boxes align top + center + bottom.

**The takeaway:** items-baseline is a TEXT-text alignment tool. The moment you introduce a non-text child in the same row, switch to items-center with explicit uniform heights.

### Two surfaces shipping the same anatomy = the second one to ship triggers the extraction
The Gate 3 *componentize at 2* rule applies to anatomy duplication across surfaces, not just within a single file. When you're about to compose `bg-X rounded-Y + label + icon + value` (or any other chrome cluster) inline, grep the codebase for existing instances first. If a private/named function already exists for this anatomy elsewhere — even if it's not exported — that pre-existing one IS instance #1. Your new inline composition makes it instance #2 → extract to a shared primitive immediately. **What this rule rejects:** the framing *"this is single-use, not worth extracting"* — that framing is wrong if a similar surface already shipped, even as private code. The first surface is invisible to the rule unless we go look. **Pre-flight grep pattern (popup/sheet contexts):** `grep -rn 'bg-white-10 rounded-pill' src/components/` before composing new pill chrome. Same for `bg-white-05 rounded-card`, `border border-white-10 rounded-popup`, etc. — anywhere the chrome cluster has 3+ class tokens, it's likely already a primitive in waiting. **WSUP example:** S30 round 1 of ModelPickerSheet composed inline credit-balance pill chrome ("CREDITS coin 498"). StreakClaimPopup already had a private `BalancePill` function with identical anatomy (Balance coin 10). The second surface should have triggered extraction; instead it shipped as duplicated inline code. Caught and fixed in S30 round 2 — extracted to `components/ui/CreditsBalancePill.tsx` with a flexible `label` prop, both surfaces now consume it.

### Don't ship CTAs that point at generic external directories
A CTA in a platform-intervention surface (safety banner, disclaimer, alert) earns its slot by being *directly actionable* — calling a real number, opening a tool the user can act in immediately, contacting a real resource. CTAs that link to generic external directories ("Find a doctor" → healthcare.gov, "Find an advisor" → cfp.net) don't deepen the user's path forward; they just hand off responsibility to a third-party search experience the user could have found themselves. **The cost:** generic CTAs clutter the surface and dilute the slots used by ACTIONABLE CTAs (988 Lifeline = real, dial-now). **The fix:** if a CTA doesn't deepen WSUP's value chain, it doesn't ship — the disclaimer copy + Learn more link in the source line already gives users a path forward without occupying a primary CTA slot. **WSUP example:** S30 SafetyBanner had three CTAs across the three variants; medical and financial CTAs pointed at directory sites (no integration, no real handoff). Removed in same session — only self-harm keeps its CTAs because 988 is a phone number you can actually dial. **Pre-flight check:** before adding any CTA to a disclaimer/alert/intervention surface, ask *"does tapping this give the user something they couldn't get from reading the source line and tapping Learn more?"* If no, don't add it.

### items-center on a flex row pairs naturally with self-start (or self-end) on corner-anchored children
When most children of a flex row should vertically center against the tallest item, but one or two children need to stay pinned to a corner (close button at top-right, badge at bottom-left, label at top-left), `items-center` on the parent + `self-start` / `self-end` on the corner-anchored child is the clean idiom. Don't reach for absolute positioning — that pulls the corner element out of flow and forces re-padding the rest of the row. self-start keeps the child in flow, just overrides parent alignment for itself. **WSUP example:** SafetyBanner row has [illustration, heading, close]. Heading wraps to 3-4 lines, becoming the tallest. Designer wanted illustration centered with heading, close at top-right corner. Solution: row uses items-center (illust + heading center together), close uses `self-start -mr-icon-btn -mt-icon-btn` (overrides to top, then negative margins for optical edge). **Rule of thumb:** when "most items center, one item corners," use items-center + self-start. When "all items corner the same way," skip items-center and use items-start/items-end on parent.

### When an illustration "looks small" in its container, inspect viewBox padding before bumping render size
Most designer-supplied SVGs (Illustrator/Figma exports especially) come with 4-10% empty margin inside the viewBox — the artboard padding the artist used for working room. When the illustration looks small relative to its container, the first move is to crop that padding via viewBox tightening, NOT to bump the `size` prop. **Why:** bumping size grows the SVG element, the wrapper sizes to content, neighboring elements get pushed, layout reflows. Cropping viewBox keeps the SVG element exactly the same size in DOM and layout — the artwork inside just fills more of it. **Process:** grep the source path coordinates, find the actual content bbox, set viewBox to that bbox plus a small breathing margin. If the content bbox is non-square but the SVG renders in a square frame, add `preserveAspectRatio="xMidYMid meet"` to letterbox correctly. **Reach for size-prop bumping only when:** (a) content already fills viewBox edge-to-edge so cropping has nothing to crop, or (b) the design intentionally wants the illustration to overflow into adjacent space. Otherwise viewBox tightening is the cleaner fix — pure visual change, zero layout impact, no asset re-export. **WSUP example:** S30 medical illustration (medicines, 53×53 source) had ~8% padding around the syringe + pills cluster; tightened to viewBox `3 6 47 41` (with preserveAspectRatio meet) — fills the 56px frame without resizing. Financial wallet (500×500 source) had ~4% padding around the wallet body; tightened to `20 20 460 460`. Heart-hands SVG didn't need this — its content already runs viewBox-edge to viewBox-edge.

### Two trigger semantics warrant two affordances — passive (auto/idle) and active (on-demand) are distinct intents, not duplicate entry points
The "duplicate entry points forbidden" instinct is right for *same-trigger* duplication (two buttons that both fire on the same event = visual noise + UX confusion). It's *wrong* when applied to surfaces that serve different trigger semantics for the same feature. **Two trigger semantics commonly worth separate affordances:** *passive/auto* (the system surfaces the feature on its own — idle timer, content match, lifecycle event, scheduled reminder) vs *active/on-demand* (the user explicitly invokes the feature when they decide they want it). Passive surfaces tend to live *next to* the relevant content (a floating pill near the input, an inline banner above a section, a toast that auto-dismisses); active surfaces tend to live *inside the user's control surface* (a dedicated button on a toolbar, an icon in a header cluster, a menu item). They look different, weigh different, and behave different — they're not duplicates, they're paired. **WSUP example:** auto-suggested replies have two affordances. The floating SuggestedReplies pill above ChatBar = passive (auto-appears after 4s idle, can be dismissed). The bulb icon in ChatBar = active (user taps when they want suggestions on-demand, regardless of idle timer state). Removing the bulb in S27 collapsed both intents onto the auto-only path; restoring it in S30 separated them again. **Pre-flight check before removing a "duplicate" entry point:** ask *"do these surfaces serve the same trigger semantic, or different ones?"* If different — keep both, document the role of each. If same — pick one and delete the other. **Distinct from the "two intents = two affordances" rule (transient dismiss vs permanent disable):** that rule covers two ways to *exit* a feature. This rule covers two ways to *enter* a feature. Both apply.



This file is for **aesthetic / visual / voice / hierarchy** rules — what the designer's eye reaches for. Technique rules ("use a square wrapper for breathing", "single integrated SVG for icon-with-modifier"), code-pattern rules ("layout shifts can swallow clicks"), and architectural rules ("surface chrome in one primitive") live in `knowledge-base.md`.

### Toggle CTAs: verb-then-status flip works only when the toggled state has an accurate positive status word
A flip-CTA pattern (button label changes when tapped, indicating the current relationship) has two valid label families: *verb-then-status* (`Follow` ↔ `Following`, `Subscribe` ↔ `Subscribed`, `Save` ↔ `Saved`) or *verb-then-verb* (`Unblock` ↔ `Block`, `Hide` ↔ `Show`, `Mute` ↔ `Unmute`). Picking which family by precedent alone is the trap — every toggle on Earth uses verb-then-status because Twitter normalized it for follow, but the pattern only *works* when the toggled state has a real positive status word that accurately describes the user's new relationship. *Following* describes "I am following them" → real status, ships. *Blocked* in the unblocked state would describe "this person is blocked" → opposite of true (they just unblocked) → mis-signals action failure. **Pre-flight check before any flip-CTA ships:** read the toggled label aloud as a description of the user's current state — *"I am [toggled label]"* or *"this person IS [toggled label]"*. If the sentence is true and positively framed, ship verb-then-status. If false, contradictory, or grammatically forced (*"I am blocked"* doesn't describe an unblocker), use verb-then-verb where the toggled label is the *next available action*, not a fictional status. **The design system gain:** consistency-by-precedent breaks down at the linguistics layer; the rule must be applied per-toggle, not copied across toggles. WSUP example: SocialView ships `Follow ↔ Following` (status fits); BlockedListView ships `Unblock ↔ Block` (no status fits, so verb-then-verb).

### Menu items that perform a verb use bare verbs; menu items that navigate use noun phrases
Sibling clause to *"Action labels inherit context from the parent surface."* The bare-verb rule (*Block, Unblock, Report, Edit, Delete*) applies when the menu item *performs* the verb on a target the parent surface already specifies — `PublicMenuSheet`'s "Block" is bare because the parent says *who* (you're on Honeybadger's profile). It does NOT apply when the menu entry *navigates into a list or management surface* — there the label needs to specify the destination, because there's no in-flight target context for the user to inherit. Self `MenuSheet`'s "Blocked creators" is a noun phrase (matching its sibling "My cards"), not a bare verb "Blocked" — that would read as a state label or be grammatically stranded. **Rule of thumb:** *if the menu item is a verb-on-a-known-target, bare verb wins; if it's a verb-on-an-implicit-list ("show me my blocked creators"), the destination needs to be named.* The split is action-vs-navigation, not low-friction-vs-high-friction.

### Deliberate-management-context relaxes confirmation friction for state-flip actions inside it
The codified *"Block needs confirm"* rule guards against *accidental block during incidental browsing* — when a user is on someone's profile and the block button sits next to other tappable affordances, mis-tapping has real cost. That cost calculation flips when the user is inside a *deliberate management surface* — a blocked-creators list, a muted-accounts page, an archived-items folder. They navigated specifically to manage that state; the friction the confirm dialog buys was already paid by the navigation itself. State-flip actions (Unblock ↔ Block, Mute ↔ Unmute, Archive ↔ Restore) inside such a surface get to be single-tap toggles with no confirmation in either direction. **Rule of thumb:** *the management context's existence IS the friction. Don't double-charge.* Pairs with the reverse-of-confirmed rule but extends it: that rule covers the un-action; this rule covers re-acting from inside a management list. Where to draw the boundary: a list reached by deliberate navigation from a profile menu = management context; a list reached as a side effect of another flow (e.g., scrolling someone's followers, encountering them inline in a feed) = NOT management context, original confirmation rules apply.

### Scrim what's BEHIND the surface, don't make the surface itself heavier
When a notification or floating element needs to be readable over an arbitrary content background (character image, video, photo), the wrong instinct is to bump the surface's own background opacity higher to "force" readability. That kills any glass / blur aesthetic the surface has where it WAS readable. The right move: scrim the area BEHIND the surface with a gradient overlay — keep the surface's glass aesthetic unchanged everywhere, and let the scrim handle readability only where the content background is hostile. Implementation: a fixed-positioned gradient element at z-index just below the surface, scoped to the viewport(s) that need it (`md:hidden` if only mobile needs it). The surface stays consistent across all contexts; the scrim adapts to the context. WSUP example: Toast keeps its `bg-black-60 backdrop-blur-popup` glass aesthetic. On mobile (where chat bg = character image), a dedicated 220px-tall gradient scrim renders behind the toast (`linear-gradient bottom→top: 0.8 → 0.5 → 0`). Desktop has plain dark page-bg — no scrim needed. Surface unchanged either way.

### Asymmetric stretch on CTA rows when labels differ in length — content-driven for the longer, flex-1 for the shorter
When two action buttons share a row and one label is meaningfully longer than the other (e.g., "Browse resources" vs "Call now"), do NOT use equal `flex-1` on both — the longer label gets squeezed and wraps, breaking the visual rhythm of the row. **The right split:** the longer label / secondary action gets `shrink-0 whitespace-nowrap` (content-driven width, never wraps); the shorter label / primary action gets `flex-1 whitespace-nowrap` (absorbs remaining row width). The asymmetry mirrors the visual hierarchy — the primary action claims the visual real estate; the secondary's label fits its content size. **Pre-flight check:** before applying flex-1 to multiple CTA buttons, read the labels — are they within ~3 characters of each other? Equal-split is safe. Otherwise asymmetric. **Single-button fallback (one CTA in the row):** `flex-1` on the lone primary makes it span full width — same code path, correct outcome. WSUP example: SafetyBanner self-harm variant on mobile — Browse resources (16 chars, secondary, nowrap) + Call now (8 chars, primary, flex-1).

### Header element + tagline/source line on wide layouts — column-align under the leading visual, not flush-left under the whole surface
When a heading has a small attribution / source / tagline / metadata line that semantically *belongs to it* (the source explains the heading, not the whole surface), the two elements should share the **same left edge in the same column** on wide layouts — both indented under whatever leading visual sits to their left (illustration, icon, avatar). Flush-left under the entire surface reads as a separate "footer" concern; column-aligned under heading reads as "this line is the heading's tagline." Position semantics again — same-column = same parent concern; left-aligned-to-surface = different concern. On narrow layouts (mobile) where the leading visual stacks above the heading, the source line goes flush-left below everything (becomes a footer naturally). **Implementation:** desktop = put heading + source line in a single flex-col, both children of the column to the right of the leading visual. Mobile = heading next to leading visual on row 1; source line full-width on its own row at the bottom. WSUP example: SafetyBanner desktop — illustration | (heading + source line stacked, column-aligned) | buttons | × — vs mobile where source is the bottom row.

### Small surfaces stay in flow; only popup-sized surfaces earn overlay treatment
A small UI sliver (a pill, a chip row, a thin banner) that overlays existing content reads as broken — the user's eye sees content getting partially obscured by a surface that's *too small* to claim "popup status," and their mental model parses it as a layout bug rather than intentional layered chrome. Overlay treatment is a privilege earned by surfaces with enough visual presence to read as *their own discrete thing on top of content* — clear surface boundary (header/title, distinct chrome, perceived elevation), enough size in the relevant dimension (~120px+), and a role meaningfully separate from the content beneath. A labeled glass panel with header + body earns overlay; a 32px floating sliver above a chat bubble does not. **Rule of thumb:** if the surface looks like content-on-content when it overlaps something, it should be in flow. If it looks like a popup-over-content, it can overlay. Toggling between in-flow and overlay states is acceptable when state-character changes (sliver pill → labeled panel) — the ~36px flow-space shift is a small cost for the right semantic at each scale. WSUP example: SuggestedReplies pill (32px sliver) is in flow above ChatBar — pushes recent messages up. Expanded panel (~200px with labeled header) overlays content. Either-or, not both.

### Compensate parent padding for internal button padding — measure optical edge, not container edge
When a button with its own internal padding (e.g., `p-icon-btn` = 10px on every side) sits at the edge of a parent container, the parent's external padding on that side should be reduced to compensate. Equal padding on both sides of a header that holds text on the left and an icon button on the right creates *optical* asymmetry: the text's edge is at the container's left padding, but the icon button's visual content (the glyph at the button's center) is at container-padding + button-internal-padding. The right side reads as having "too much space" even though the geometric padding is identical. **WSUP idiom — the `-mr-icon-btn` negative margin pattern:** keep symmetric `px-m` on the parent and apply `-mr-icon-btn` (negative right margin = -10px) to the rightmost edge button. The negative margin pulls the button outward by exactly its intrinsic padding, so the glyph sits at the same optical position as the geometric edge. ConfirmSheet's desktop dialog header is the canonical precedent: `<CloseButton className="-mr-icon-btn -mt-xxs" />`. **Use this pattern, not asymmetric parent padding** — it keeps the parent's padding clean and tokenized, and it's already the codified WSUP idiom (grep `-mr-icon-btn` to find every existing instance). **Rule of thumb:** when a button with its own padding-from-glyph-edge sits at a container's edge, reach for `-mr-icon-btn` (or `-ml-icon-btn`) on the button — not asymmetric parent padding. The optical principle (measure where the glyph sits, not where the container ends) is the rule; the negative-margin idiom is the WSUP-specific implementation. WSUP example: SuggestedReplies panel header uses `px-m` symmetric + `<CloseButton className="-mr-icon-btn" />` so the close glyph optically aligns with the panel right edge.

### Toggling element stays at one position across states — open and close from the same spot (sliver-to-sliver only)
When a UI affordance toggles between two states **of the same surface character** (collapsed pill ↔ expanded chip row; closed accordion ↔ open accordion within the same band; minimized inline card ↔ full inline card), the *control that toggles* should occupy the same X-Y position in both states. Click pill at position X → expand → close-back-to-pill control should ALSO be at position X. Putting the open-trigger at left and the close-trigger at right (or top vs bottom) forces the user to scan the new layout to find the way back and breaks the mental model that "this thing is the toggle." Codify by structuring expanded state as `[toggle-control] [...new-content]` where the toggle-control sits exactly where the closed-state control was. **Sibling-band example:** an inline expand-collapse chip row where the trigger pill becomes a chip-row header at the same band, same horizontal position. Same gesture opens and closes.

**Scope clause — when expanded state is a structurally different surface, this rule does NOT apply.** If the expanded state is a *labeled overlay*, *sheet*, *card*, or any surface whose character is categorically different from the trigger's (sliver → labeled panel; pill → bottom sheet; chip → modal), the close affordance follows the new surface's universal convention (top-right × on labeled panels, drag-handle + tap-outside on sheets, ✕ in title bar on modals) — not the trigger's original position. The user's mental model has shifted from "this same thing toggled" to "a new surface opened" — and the new surface's chrome conventions win. The signal that you've crossed the boundary: the expanded state has its own header/title, its own padding system, its own perceived elevation. Once any of those are true, the close lives where panel-conventions put it. **WSUP example:** SuggestedReplies's expanded state is a labeled panel ("Suggestions" header + body of stacked rows), structurally a different surface from the trigger pill. × lives at top-right of the header, NOT at the leftmost band-position the pill occupied. The earlier chip-row design (where × WAS at leftmost) is the sliver-to-sliver case the rule was originally written for; the labeled-panel design is the scope-clause case.

### Two intents = two affordances: separate "this round dismiss" from "turn off forever"
When a feature has both a transient-dismiss path ("not interested right now, but show me again") AND a permanent-disable path ("stop showing this entirely"), they need **separate UI**. Folding both into one button creates ambiguity — the user can't tell whether tapping × is a one-time skip or a permanent kill. Surface-level close (`×` icon, swipe-down, tap-outside) handles the transient intent; menu item / settings toggle handles the permanent intent. The surface close gives the immediate relief; the menu route gives the full opt-out. Match the friction to the cost: a one-time skip is one tap, a permanent disable is two taps + a confirmation toast that points back to the re-enable affordance. Suggested replies codifies this: × on the expanded stack collapses back to the pill (transient); ⋯ menu → "Turn off auto-suggestions" kills it forever + toast explains where to switch on again.

### Ship the eventual menu shape, not a one-off, when future items are inevitable
When a 3-dot menu / pill kebab / context menu will carry ≥2 items eventually but only has 1 today, ship the eventual *shape* — the menu wrapper, the dropdown anatomy, the divider conventions — not a one-off button styled "as if" it were the same. The single option's button-style implementation will get refactored anyway when item 2 arrives, and refactoring under pressure produces inconsistent menus across the app. Better to render the menu container with a single item now, then add the rest as they land. Applies anywhere the design intent is "this is a menu, it just happens to have one entry today" — the chat 3-dot is the example: real WSUP eventually has Memories / Cards / Clear Chat / Switch LLMs / Add Member / Report; we wired all 7 slots in the WSUP demo with only auto-suggestions toggle functional, so devs see the intended shape without us having to restructure when the rest land.

### Position carries semantic meaning — don't put preview/option elements where committed elements live
Right-aligned bubbles in a chat are *sent messages*. Top-of-feed cards are *active items*. Highlighted rows in a list are *selected*. The position itself communicates state — and putting an *option*, *preview*, or *not-yet-committed* element in that position will read as "already done" no matter how visually distinct you try to make it. Suggestions that sit in the right-aligned band above ChatBar look like already-sent messages, even when the bubble is a button — because the spatial slot is the slot for "you took this action." When you need to show preview/option/draft elements, choose a position that ISN'T the position of committed action: a left-anchored band (where the source/trigger lives), an above-input strip (clearly part of input affordances, not message stream), or an inline-with-trigger expansion. **Rule:** before placing a not-yet-committed element, ask "is this position already used for committed/done state?" If yes, pick another position — visual treatment alone won't compensate for spatial mis-signal.

### Trigger and result share spatial position — don't let users hunt for what they just summoned
When a user taps an affordance to summon a UI (open a menu, expand options, reveal suggestions), the result should appear in or attached to the trigger's position — not somewhere else on the screen. Tapping a left-pill that produces results on the right side feels like teleportation: the user has to scan to find what their tap produced, and the visual chain "trigger → result" is broken. The fix is positional continuity: the result *grows out of* the trigger (in-place expansion), occupies the same band as the trigger (horizontal chip row that replaces the pill in the same row), or is anchored adjacent to the trigger (popover with a leader line / arrow pointing to the trigger). SuggestedReplies codifies this: collapsed pill is left-aligned at chat-column edge → tapped → expands into a horizontal chip row IN THE SAME BAND, with the bulb icon persisting at the left as an anchor. Trigger and result share the same horizontal slot — eye stays in one place, the relationship is obvious without thinking.

### Same role + same viewport = same pattern. Different viewports CAN legitimately have different patterns.
The consistency rule for design-system roles isn't "one visual pattern wins app-wide" — it's "one pattern wins per viewport-role." All 3-dot menus on mobile share the same sheet-style (tap-friendly rows, title label, dividers, Cancel). All 3-dot menus on desktop share the same popover-style (compact, centered, no dividers, no Cancel). Mobile and desktop ARE allowed to look different from each other when the platform affordances differ — touch wants bigger tap targets and explicit Cancel, mouse-and-keyboard wants compact menus that close on background-tap or Escape. The fragmentation worth fighting is *within* a viewport (chat menu and profile menu rendering differently on mobile; popover spacing different across desktop menus). When in doubt, ask "would a user notice the difference comparing two menus on the same device?" If yes, that's the inconsistency to kill. If the difference only appears when comparing the mobile and desktop versions of the *same* menu, that's not inconsistency — that's responsive design done right. Codify per-viewport patterns in a primitive that handles both surfaces internally (e.g., MenuPopover renders sheet-style on mobile + popover-style on desktop from one `items[]` array) — that way per-menu code can never accidentally drift on either viewport.

### Related controls cluster — don't push them to opposite ends of a row "for balance"
When a row has primary content (e.g., suggestion chips, list items, message rows) and secondary controls (close, dismiss, more actions), the secondary controls belong **immediately adjacent** to the content they control — not pushed to the far right via `ml-auto` "for visual balance." On wide viewports, `ml-auto` separates the close button from the chips by hundreds of pixels of empty air; the user sees a strip of suggestions on the left and a lonely × on the right and has to mentally connect them. Keep related stuff together: chips, then the controls that act on them, with the same `gap` between as between sibling chips. The cluster reads as ONE unit that does ONE thing. Reach for `ml-auto` only when the right-side element is genuinely *unrelated* to the left-side group — a different intent, a different scope.

### Don't segment a single-action surface to fit a secondary control — find the secondary control another home
A pill shaped `[primary action | divider | secondary control]` looks tidy in mockups but is fragile in implementation: rounded-pill + overflow-hidden interacts badly with rectangular hover states on the segments, and the segmentation invites visual broken-ness on hover/focus. More importantly, the segmentation is usually a sign you've conflated two different intents into one surface — the primary action ("expand suggestions") and the secondary control ("disable forever") deserve separate homes. Move the secondary into a dedicated settings location (chat menu, settings page, kebab menu on the parent surface) — keep the surface single-action. Cleaner hover, cleaner intent separation, cleaner code. **Rule:** if you find yourself splitting a pill / button / chip with a divider to fit two functions, stop — the second function belongs somewhere else.



### Action labels inherit context from the parent surface — don't repeat what's already specified
A menu, popover, or context sheet sits on a parent surface that already establishes the target ("you're on Honeybadger's profile"). Action labels in that nested affordance should be bare verbs — *"Block"*, *"Unblock"*, *"Report"*, *"Edit"*, *"Delete"* — not target-qualified — *not* "Block Honeybadger", "Edit this character", "Delete this story". The qualification is redundant noise: the parent already says who/what. **Where the qualification *does* belong: confirmation surfaces.** When the user pauses to confirm a destructive or irreversible action, the title reaffirms the target — *"Block Honeybadger?"*, *"Delete Magic Library?"* — because that's the explicit moment where mis-confirms must be prevented. **Rule of thumb (paired with the friction-scales-with-reversibility rule):** *low-friction affordance = bare verb (the menu item); high-friction confirm = explicit target (the dialog title).* Friction calibrates specificity — invest the words where the consequence demands attention, not where the user is just browsing options.

### The reverse of a confirmed action should not itself confirm
When an action requires a confirmation step (Block, Mute, Archive, Hide, Snooze), the *reverse* of that action — Unblock, Unmute, Unarchive, Unhide, Unsnooze — should be a single tap with no confirm dialog. The friction was already paid at the original action: the user deliberately confirmed they wanted the state change. Reversing it is the *un-friction action* — they're undoing a deliberate choice or signaling readiness for the original relationship. Two taps to undo a one-tap-to-confirm action ("Are you sure you want to unblock?") feels patronizing and surfaces the wrong cost calibration. The cost of the *original* action being mis-tapped was real; the cost of an *un-action* being mis-tapped is "they see this profile again" — fully recoverable in one more tap. Twitter, TikTok, and Slack all follow this rule. **Rule of thumb:** asymmetric friction tracks asymmetric cost. Confirm the deliberate change (block, archive, delete-with-recovery); don't confirm the rollback.

### Safety/control actions live in menus, not as primary CTAs — even when "important"
A public creator profile (or any viewer-facing surface) reserves the top-level CTA slot for actions that align with the *purpose of the surface*. Public profile = "evaluate and follow this creator" → Follow earns the slot. Block, Mute, Restrict, and Report are *deliberate, low-frequency safety/control* actions that should be findable in the more-menu (3-dot) — never as top-level buttons. **Why:** elevating safety actions to top-level visual priority frames the surface defensively ("here's the warning, also some content"), which is wrong for the typical case (most viewers aren't there to police, they're there to engage). Twitter/Instagram/TikTok/Discord all converge on the same pattern: 3-dot menu houses Block + Report. Order within the menu: personal-control actions first (Block, Mute), institutional escalation second (Report) — your own tools come before the moderator handoff.

### Movement is private; absolutes are public
On any owner-vs-viewer surface, the *absolute state* (count, rank, name, image, bio) is the credibility signal — public. The *change signal* (trend delta ▲ +8%, rank movement ▲ 1, "X new this week") is feedback for the owner watching their own progress — private. The same goes for *management affordances* (3-dot menus that edit/delete, drilldowns that surface internal lists, lifecycle filters): they're for the owner maintaining the work, not the viewer evaluating it. **Don't show movement to viewers** — they didn't ask for it and don't have context to interpret it ("Honeybadger's followers rose 12%" is meaningless to a stranger; "Honeybadger has 18.2k followers" is the credibility signal). **Don't show management to viewers** — they can't act on it, and exposing it leaks owner-only affordances. The trick: when designing a dual-audience surface, walk every signal element-by-element and ask *"is this the value, or the change in the value? is this the artifact, or the way to manage the artifact?"* Values + artifacts → public. Changes + management → self only. Spotify/TikTok creator pages do this well; Twitter/Instagram are the exception (because their product *is* the social graph movement).

### When a screen serves two audiences, decompose by `viewMode`, not by forking the page
Most "owner vs viewer" screens (your profile vs another creator's, your post vs someone else's, your dashboard vs a teammate's) share most of the structure and differ only in *visibility* (some widgets owner-only), *affordance* (Edit vs Follow, Settings vs Report), and *data depth* (your own private metrics vs public counts). The wrong move is to fork into two parallel page components — that doubles the maintenance surface and the two slowly drift. The right move is a `viewMode: 'self' | 'public'` prop threaded through the *components themselves* (Hero, Stats, Sidebar, Menu), and two thin page-level compositions that mount the same components with different mode + data. Within each component, branches are scoped: hide owner-only widgets, swap CTAs, hide private fields. Across the system, the components STAY in sync as they evolve — you can't have a styling change land for self but miss public. **Rule of thumb:** when a viewer sees the same surface as the owner with delta differences, the deltas belong inside the components, not in forked pages. Use forked pages only when the audiences truly need fundamentally different layouts (e.g., admin dashboard vs end-user chat).

### Spacing is hierarchy — tight WITHIN groups, wider BETWEEN them
Equal `gap-m` between every stacked element flattens semantic hierarchy. A popup with [title, body, CTA, secondary] all separated by 16px reads as four equal-weight peers — but they're not. Title+body are one *narrative unit* ("what happened" + "why it matters"). CTA+secondary are one *action pair* (primary path + alternate). The boundary between *reading* and *acting* is where the surface should breathe, not between every element equally. **Rule:** before stacking elements with a flat gap, ask *what conceptually groups together?* Then use **smaller gaps inside groups** (gap-xs / gap-s) and a **larger gap between them** (gap-l / gap-xl). The user's eye then tracks the natural narrative rhythm — title-body as one beat, CTA-secondary as another — instead of pinging through four equally-spaced stops. ConfirmSheet codifies this: title↔description at `mb-xxs` (4px), then a clear padding break, then action stack at `gap-xs` (8px). Apply the same anatomy to any popup with 4+ stacked elements — match the gap to the *semantic distance*, not the visual rhythm of "everything 16px apart."

### Subtraction is a design pass, not just a delete
When you remove content from a surface (a card, a label, a banner, a bullet), the spacing and structural separators around it were calibrated to the *longer* content. Old `pt-6xl` cleared 80px above content because the old stack was 5+ elements; when the stack drops to 4, the same padding reads as empty air, not breathing room. Old divider grouped concerns inside a dense stack; when the stack thins, the same divider fragments unity for no reason. **Rule:** after every content-removal pass, do a *spacing + structure retune pass in the same edit*. Step 1 is not done until step 2 is done. Don't ship a removed-content layout with old-content spacing — the surface will read as accidentally hollow even though every element is correct in isolation.

### Verify every state of an interactive primitive in the browser, not just the happy path
A primitive renders multiple states — checked/unchecked, hover/active, enabled/disabled, empty/populated. Reviewing the code path that produces *one* state and concluding "ships" is how invisible-state bugs reach the designer. The Checkbox shipped with `border-none` in the base className for months; the unchecked state was a 16×16 transparent void with no edge — but every consumer that exercised it (BuyCreditsSheet ToS, CreditPackRow, FormsSection demos) somehow didn't trip the catch, because review focused on whether the *checked* state filled correctly. **Rule:** before declaring an interactive primitive (or a feature using one) done, render the full state matrix and verify each state is visually distinct and visible. The audit isn't "does the happy path render?" — it's "can a user *tell* what state they're in at every moment?" Disabled CTA must look disabled. Unchecked checkbox must look like a checkbox. Empty card must look intentional. If any state is invisible, the primitive isn't done — even if the consuming code looks clean.

### Friction in a confirmation should scale with the reversibility of the action, not the surface
Two destructive actions can use the *same* confirm surface and still feel categorically different. Logout (reversible — sign back in any time) gets a plain "are you sure?" confirm — one tap to abort, one tap to proceed. Account deletion (irreversible — gone forever) gets the same surface plus a *gate*: an explicit checkbox the user has to tick before the confirm CTA un-disables. The cost of a misclick is what calibrates the gate. Don't reach for a different sheet, scarier color, or shock-iconography — that fragments the design system over a behavior delta. Reach for one more interaction step, layered onto the same primitive, that converts "I tapped the wrong thing" into "I had to read, acknowledge, and click twice." **Rule of thumb:** if the action is undoable from the same UI within five seconds, plain confirm. If it requires a backup, support ticket, or recreating data to undo, gate it. The gate is the design — not the messaging.

### Alignment shift signals "stop reading, start acting"
Inside a confirmation surface, narration text (title + description) is naturally center-aligned — it reads like a heading + caption, the user's eye moves through it once and lands at the bottom. A form control (checkbox + acknowledgment) inserted between narration and CTA should *break* that center alignment and go flush-left. The alignment change is itself a UI signal: "this isn't more text to read, it's a control you have to interact with before the CTA unlocks." Keeping the checkbox row centered makes it look like a continuation of the caption — easy to miss, easy to mistake for static label copy. Left-aligned, flush with the surface's inner padding, the checkbox reads as the gate it is.

### Banner position reflects scope, not just visual hierarchy
Chat surfaces have at least two distinct banner positions: top-of-chat (under ChatHeader) and above-ChatBar. Don't pick by aesthetics — pick by *what the banner is about*. **Top-of-chat is for "something larger than the user's current message"** — *character state* ("who am I talking to right now?") OR *platform intervention* (safety alerts, content disclaimers, brand-level notices). DormancyBanner is character state; SafetyBanner *on mobile* is platform intervention; both legitimately occupy the same slot because both speak about a concern that exists *outside* the immediate conversation turn. **Above-ChatBar is for *session state*** ("what's happening with *this conversation*?") — context-exhaustion / install prompt sits there because the user is creating the very content the prompt is about. Wrong anchor reads as a system-level intrusion (top) for a session-scoped concern (bottom), or vice versa. The position IS part of the meaning. **Mutual exclusion at top-of-chat:** when both a character-state banner AND a platform-intervention banner could fire simultaneously, platform intervention wins — safety/medical/financial alerts are categorically more urgent than dormancy notices. **Viewport-specific clause for mobile:** when the banner is platform-intervention class (safety, content disclaimer), mobile renders it ABOVE ChatHeader, not below. The rationale — vertical space is precious on mobile, the urgency of platform intervention outranks who-am-I-talking-to context, and the topmost slot is the most-attention-grabbing position. **Desktop scope clause (S30, PM directive):** platform-intervention surfaces on desktop CAN be re-classified out of the banner family entirely — implemented as centered floating popups instead of full-width banners (matches production wsup.ai for SafetyBanner). When this re-classification happens, the surface follows centered-popup conventions (rounded card, max-width, mx-auto, no edge-to-edge anchoring), not banner conventions. The banner-position rule still governs surfaces that REMAIN in the banner class — DormancyBanner stays below header on both viewports because it's contextually scoped to the character, which the header is also about. **Rule of thumb:** apply the banner-position rule to banner-class surfaces; if a surface has been re-classified to popup-class (centered, max-width, rounded), it's no longer governed by this rule even though its underlying purpose (platform intervention, character state, etc.) hasn't changed. The classification — banner vs popup — determines which family of conventions applies.

### Solid surface signals "platform speaking"; glass surface signals "chat-bound"
Glass surfaces (`bg-black-60 + backdrop-blur-popup`) are the codified WSUP convention for surfaces that live *inside* the chat experience — DormancyBanner, Toast, SuggestedReplies pill — because they sit visually *over* the character image and need to feel like part of the conversation's UI layer. **Solid surfaces** (`bg-page-bg`) carry a different message: they signal *the platform itself is speaking*, not the chat. Use solid for platform-intervention banners (safety alerts, medical/financial disclaimers) — the user reads it as a system intervention coming from outside the conversation. The visual choice is a *speaker identifier*: glass = chat layer, solid = platform layer. Don't crossover — a safety banner with glass would feel like Billie was offering you the suicide hotline; a memory-limit prompt with solid would feel like the platform was breaking immersion to insert advice. Match the surface to the speaker.

### Surface tint matches what's *behind* the surface, not the surface's tone
"This card is informative, so use a subtle bg" is not a rule — subtlety is *relative to the bg behind it*. On plain dark page-bg, `bg-white-05` is a perfectly readable subtle card. On full-bleed mobile chat (bg = saturated character image), `bg-white-05` disappears because white at low alpha over a colorful image gives near-zero contrast — the card reads as "broken, not subtle." The fix is the inverse: darken the surface (`bg-black-60`) and add `backdrop-blur-popup` so the user can still see the character through the blur. **Rule:** when introducing a new chat-bound surface, grep `DormancyBanner` first — it's the codified precedent for "card over character image." Don't re-derive the surface choice; copy the pattern. **Corollary:** chat overlays/scrims need viewport-specific opacity — mobile (character image bg) needs a harsher tint to fight the colorful bg; desktop (plain dark bg) can use a softer tint. Same gradient curve, two opacity ranges, gated via `md:hidden` / `hidden md:block`.

### Coordinate sibling padding via shared tokens, not via shared wrappers
When you add a new element next to an existing component (e.g., a banner above ChatBar), don't wrap the existing component in a parent that adds padding — its outer wrapper almost certainly already declares its own padding, and your new wrapper *stacks on top*, silently corrupting the layout. The safe move: keep them as siblings, mirror the existing component's padding tokens (`px-m`, `md:px-2xxxl`, etc.) on the new sibling's own wrapper. Each element owns its padding, the visual alignment falls out from the shared token scale, and the original component is untouched.

### When the product has a real alternative to the primary CTA, never hide it
Hiding a real alternative path is a dark pattern even when (a) the alternative is paid, (b) the primary CTA is the revenue driver, and (c) the conversion math looks better short-term with a single-path prompt. Two costs you don't see in the A/B numbers: **trust** — users who later discover the alternative read the original prompt as manipulation, and a returning-user product can't afford that retroactive damage; **revenue** — users who can't take the primary action *today* (wrong device, no storage, just-not-now) have only "primary or dismiss" as options, so a visible secondary path captures them as paid alternative-takers instead of dismissers. Hierarchy stays unambiguous via *affordance weight*: primary action = Button, secondary action = `.link` text. The eye still picks the button first; the link is a respect-the-user gesture that pays for itself.

### Owning a system constraint in character voice turns it into a feature
When you have to surface a system limit to the user (chat memory full, daily quota hit, model unavailable), don't write it in system voice ("This chat has reached its memory limit"). Write it in the character's voice ("*I can only remember so much of one chat.* — Billie"). The constraint stops being something *broken* and becomes something *true about this character* — a shape of who they are, not a UI failure. Italic + attribution signals "dialogue, not UI copy" the same way italic action descriptions in chat already do. Works because WSUP's whole product premise is character-as-relationship: a memory limit framed as character truth fits the world; framed as system error breaks it.
*Corollary — voice scales with how much the surface breaks immersion:* **in-stream** (chat scroll, character bubble) → character voice, first-person, italic + attribution ("*I can't remember…*" — Billie). **Flow-interrupting popup** (chat-darkening backdrop, modal-style interruption) → narrator voice, third-person about the character ("Billie's memory is full."). The character stays the *subject* in both — only the speaking distance changes. Pure system voice ("This chat has reached its memory limit") stays reserved for non-character moments (network failures, payment errors) where character framing would feel forced. The surface's break-immersion level dictates the voice; don't apply italic + attribution to copy the character isn't actually saying.

### Pick the pattern by role, not by position
A chat-anchored card *positioned* like a banner (above ChatBar, ChatBar-width) doesn't automatically *behave* like a banner. Banner anatomy (uniform `text-xs`, `p-s` padding, `gap-s` spacing) fits *status indicators* — short content, single action, low-decision surfaces (LowCreditsBanner, DormancyBanner pill). When the card asks the user to *make a meaningful decision* with copy that explains why, it's a sheet in disguise — apply sheet hierarchy: title `text-sm text-text-title`, body `text-xs text-text-body leading-relaxed`, explicit zones with `gap-m`, `p-m` outer padding. Position tells you *where* the card lives; role tells you *how* it should be structured. Don't conflate them — a decision prompt squeezed into banner anatomy reads as cramped and dismissable; a status indicator inflated into sheet anatomy reads as overwrought. Match the structure to what the card is *for*.

### Live inside the conversation, not on top of it
When a chat surface needs to surface a system event (memory limit, model switch, content moderation), don't build a *separate* surface that floats above the chat — make the event *part of* the chat. A floating card that explains "Billie will start to forget" breaks immersion to talk about preserving immersion: the system is now speaking *about* the character *to* the user, severing the very relationship the prompt is trying to extend. The right pattern is two-piece, in-stream: (1) the character's NEXT response *is* the moment, in their own voice ("Wait... what were we just talking about?") — a stripped bubble with no toolbar, since this isn't a feedback-worthy turn; (2) a small system action card attached below the bubble, visually distinct (`bg-black-60 + backdrop-blur`, info icon), offering the real-world paths. The bubble is permanent in chat history (the moment was real); the action card is dismissable (the offer is optional). The character lives the limit; the system offers the path. Voice stays where voice belongs.

### Refining typography on a structurally wrong design just polishes the wrong thing
When iteration after iteration of typography, hierarchy, padding, copy, and spacing tweaks aren't producing a design that feels right, stop tweaking. The structure is wrong — not the surface. Ask: *is this the right pattern at all?* — not *can I make this pattern feel better?* Floating card → in-chat message is a structural pivot, not a refinement. Recognize when you're polishing a wrong thing and zoom out to the role/position/voice/surface decision. The signal is fatigue: if the third or fourth iteration on the same surface still feels off in a way you can't quite articulate, the answer is almost never "tighter padding" — it's "wrong pattern."

### One moment = one artifact: differentiate voice via typography, not via separate surfaces
When a UI moment has two voices in it (the character speaking + the system explaining, or a user message + a related action) — don't put them on two separate cards with a gap between them. The gap reads as "two unrelated things stacked," not as "one moment." Instead: one container, one surface, one shape, with an *internal hairline divider* between the two voices. Voice differentiation comes from typography (italic for character, info-icon prefix for system, different opacity for system text) — not from separate visual surfaces. Two surfaces signal "two events" to the eye; one surface with internal sections signals "one event with multiple parts." When the design need is *unity*, surface continuity > anatomical separation.

### A CTA without "to do what" is a faith-based ask
Every CTA needs adjacent copy that answers "if I tap this, what changes for me?" — and the answer must be benefit-shaped, not feature-shaped. "The app remembers ~3× more memory" is the *feature*. "Your whole story stays with her" is the *benefit*. Users tap benefits, not features. **Pre-flight check for any new CTA you build:** *if a user read only the system text + button label, would they know what the action does for them?* If no — the system text is missing the why, even if the design looks polished. A "Get the app" button stranded without context is a dead button: it converts only the users who already know what the app does, which is the wrong audience for an install prompt.

### Soft-dismiss on a character platform should be a character moment, not just a hide
For a "skip / Maybe later / not now" action on a character-driven platform (where the user is in a relationship with an AI character), erasing the prompt on dismiss misses the storytelling beat. Better: transform the artifact in place — let the character *react in their own voice* to the user's choice. On WSUP's MemoryLimitMoment, clicking "Maybe later" doesn't hide the bubble; it morphs it into a Stage 2 where Billie nods, brain visibly buffering, and accepts: *"Got it — sticking with what I've got. Heads up: I'll probably ask what we were just talking about. A lot."* The user feels the consequence of their decision (Billie now operates on partial memory) without the platform nagging them to reconsider. Two-stage in-character dismiss > hide-and-forget. **Rule of thumb:** when designing a "soft no" on a character platform, write Stage 2 copy in the character's voice that *acknowledges the choice and previews the consequence* — never erase the moment, transform it.

### Brand-pure pairing: when stacking provider sign-in buttons, differentiate by brand color, not layout
Stacking two `bg-white` buttons (Google + Apple both white) erases the brand cue users rely on to scan a provider list. Apple's HIG offers black-on-white-text or white-on-black-text — pick the one that *contrasts with the dark surface beneath*. WSUP: Apple = `bg-black + border-white-20` (border defines edge against `bg-profile-sheet-bg`), Google = `bg-white`. Same shape, same height, same icon-then-label structure — only the color differs. The eye locates each provider in <100ms.

### When two states share visual treatment, their token shades must match exactly
Sibling states that look almost-identical-but-not-quite (e.g., `text-white-50` vs `text-white-60` — a 10% opacity drift) read as broken hierarchy, not nuance. The shade variation is invisible to a user comparing screens, but it sets a trap for the next designer who can't tell which shade is canonical. Either commit to a real visual difference (different bg, different icon family) or align tokens exactly. No 10%-shade "almost-but-not-quite" deltas. *Same role → same token, every time.*

### Dev controls live OUTSIDE the design surface, not inside it
Variant pills, state togglers, and other reviewer affordances should never sit *inside* the popup/sheet/modal they control. Inside means: competing with real product chrome, ambiguous visual role (is this a control or a feature?), z-index conflicts when overlays stack. Outside means: floating above/beside the surface over the dim backdrop with a clear `VARIANT` / `STATE` uppercase label. The reader instantly knows: this is scaffolding, not product. Apply: 10px gap above the popup, right-aligned to the popup's right edge, dark pill with backdrop-blur for legibility on any background.

### Don't keep dev shortcuts that don't earn their slot
Every keyboard shortcut in the dev keymap is cognitive load on the reviewer who has to remember it. A shortcut that's redundant with another control (`C` toggling what an in-panel checkbox already toggled), broken under real flow (`L` panel sitting at z-70 behind a z-90 sheet), or never-actually-used belongs in the trash. Consistency for its own sake — adding `L` because R and S exist — produces a memorized broken thing. Earn the slot or drop it.

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

### Primitives that flex (Session 20)
- A shared primitive should accept `cn`/twMerge-aware className so consumers can override defaults (color, padding, size) without forking the component or duplicating CSS rules.
- Three callsites with similar-but-not-identical styling (sheet 10px padding, banner 4px padding, banner 2px padding) is a sign the primitive needs override flexibility — not three copies and not three variants. One primitive, configurable surface.
- 16px svg vs 20px svg is a context decision (banner density vs sheet header) — make `size` a prop, not a hardcode.

### Same shape, different intent (Session 20)
- Visual identity (the `M18 6L6 18M6 6l12 12` X path) is not semantic identity. The same SVG path renders dismiss buttons, failure status indicators, and rejected-state badges in WSUP. Don't migrate by grep — migrate by intent.
- When auditing for primitive adoption, ask "is this a [primitive] or does it just look like one?" Different intent = leave it alone.

### Style guide is a contract (Session 20)
- A primitive that exists in code but isn't in the style guide is invisible to the consumer (designer, engineer, future Claude). They'll either rebuild it inline or miss it entirely.
- Every extracted primitive must land in the style guide in the same edit, not as a follow-up. Gate 5 isn't optional.
