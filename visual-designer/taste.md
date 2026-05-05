# Visual Designer — Taste Profile
Last updated: 2026-05-05

This file is for **aesthetic / visual / voice / hierarchy** rules — what the designer's eye reaches for. Technique rules ("use a square wrapper for breathing", "single integrated SVG for icon-with-modifier"), code-pattern rules ("layout shifts can swallow clicks"), and architectural rules ("surface chrome in one primitive") live in `knowledge-base.md`.

### Scrim what's BEHIND the surface, don't make the surface itself heavier
When a notification or floating element needs to be readable over an arbitrary content background (character image, video, photo), the wrong instinct is to bump the surface's own background opacity higher to "force" readability. That kills any glass / blur aesthetic the surface has where it WAS readable. The right move: scrim the area BEHIND the surface with a gradient overlay — keep the surface's glass aesthetic unchanged everywhere, and let the scrim handle readability only where the content background is hostile. Implementation: a fixed-positioned gradient element at z-index just below the surface, scoped to the viewport(s) that need it (`md:hidden` if only mobile needs it). The surface stays consistent across all contexts; the scrim adapts to the context. WSUP example: Toast keeps its `bg-black-60 backdrop-blur-popup` glass aesthetic. On mobile (where chat bg = character image), a dedicated 220px-tall gradient scrim renders behind the toast (`linear-gradient bottom→top: 0.8 → 0.5 → 0`). Desktop has plain dark page-bg — no scrim needed. Surface unchanged either way.

### Toggling element stays at one position across states — open and close from the same spot
When a UI affordance toggles between two states (collapsed pill ↔ expanded panel; closed accordion ↔ open accordion; minimized card ↔ full card), the *control that toggles* should occupy the same X-Y position in both states. Click pill at position X → expand → close-back-to-pill control should ALSO be at position X. Putting the open-trigger at left and the close-trigger at right (or top vs bottom) forces the user to scan the new layout to find the way back, breaks the mental model that "this thing is the toggle," and creates an asymmetric open/close experience. Codify by structuring expanded state as `[toggle-control] [...new-content]` where the toggle-control sits exactly where the closed-state control was. SuggestedReplies is the canonical example: collapsed pill (with bulb icon) at chat-column-left → expand → × close button at chat-column-left, chips fan out to the right. Same position, different content; same gesture opens and closes.

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
Chat surfaces have at least two distinct banner positions: top-of-chat (under ChatHeader) and above-ChatBar. Don't pick by aesthetics — pick by *what the banner is about*. Top-of-chat is for **character state** ("who am I talking to right now?") — DormancyBanner sits there because the news is about the character. Above-ChatBar is for **session state** ("what's happening with *this conversation*?") — context-exhaustion / install prompt sits there because the user is creating the very content the prompt is about. Wrong anchor reads as a system-level intrusion (top) for a session-scoped concern (bottom), or vice versa. The position IS part of the meaning.

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
