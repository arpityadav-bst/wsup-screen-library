# Scratchpad — inline session notes

**Append-only during a session. Processed and emptied during designer-triggered audit pass.**

See `workflow.md` → "DUAL-CADENCE OPERATING MODEL" for the protocol.

**Entry format (one line per correction-resolution turn):**

```
YYYY-MM-DD HH:mm — <component or file changed> — <what changed in 1 line> — Why: <one phrase>
```

**Watch-rules for the next audit pass (kept here as living reminders, NOT processed away):**

- Sibling-surface inheritance failures (any new surface that ships without a precedent grep)
- Token-threshold flags (any raw value spotted at 3+ uses without a token — note here, fix in audit)
- Build-broken catches (anything Vercel/typecheck would fail)
- Designer-explicit corrections vs implicit ones (explicit = decisions.md, implicit = might be taste.md)

---

## Pending audit entries

2026-05-15 — WatchAdBubble + WatchAdGateSection (mockup + anatomy row) — body copy "Watch a short ad to keep chatting — your message will send right after." → "Watch a short ad and your message sends right after." — Why: designer tightened — drops the redundant "to keep chatting" framing (the eyebrow "Quick ad break" already sets that context); active voice ("sends" vs "will send") feels more immediate; "and" conjunction reads more conversationally than the em-dash split.

2026-05-15 — DeckActionButtons + OnboardingDeckStep + useOnboardingFlow — added Rewind affordance: tertiary icon-only circular button (52×52, neutral chrome, no status color) positioned BETWEEN Pass and Like (designer's call after first build had it to the LEFT — between feels more "pivotal" / equally accessible to both thumbs); only renders when canRewind=true (deckIndex > 0); brings back the previously-passed card with a symmetric "deck-rewind-in" animation that mirrors the pass fly-off (translateX -600 → 0, rotate -30° → 0, 320ms). — Why: designer call — gives users a recovery path after misclick / regret without leaving the deck. Sized smaller than Pass/Like (not flex-1) so the primary forward-motion pair keeps visual primacy.

2026-05-15 — DeckActionButtons — RewindGlyph SVG path corrected (lucide rotate-ccw shape — arc centered at viewBox midpoint instead of arc-from-(3,8)-radius-9 which placed the top of the arc at y=-1 and got trimmed by the viewBox top edge). Icon size bumped 18→20px for slightly more presence in the 52px container. — Why: designer caught the top-of-arc trim — symptom of an off-center arc with extents outside the viewBox.

2026-05-15 — OnboardingDeckStep — removed `!swipingOut && !swipingIn` gating on the canRewind prop passed to DeckActionButtons. The button now stays mounted whenever canRewind is true (i.e., once deckIndex > 0); click during animation is a no-op via handleRewind's existing internal guard. — Why: the gating was hiding the rewind slot during EVERY swipe animation, causing Pass/Like to expand and contract as the row reflowed each swipe — the bouncing the designer flagged. Now the slot appears ONCE (after the first pass) via a `fade-in` mount animation; subsequent swipes don't touch the layout.

2026-05-15 — OnboardingDeckEmptyState — "See them again" → "Go to Explore"; onClick now routes through onSkipFlow (same as header Skip pill, exits to /explore). — Why: designer call — at end-of-deck the user has finished the decision surface and exit IS the natural next action; surfacing exit as a primary in-flow CTA is more ergonomic than asking the user to find the header pill again.

2026-05-15 — globals.css — added `@keyframes deck-rewind-in` (mirror of pass fly-off: translateX -600→0, rotate -30°→0, opacity 0→1, 320ms ease-out). — Why: rewind animation needs the symmetric backward path; reusing the swipe-out's distance/rotation/duration keeps forward+backward animations feeling like one coherent motion language.

2026-05-15 — WatchAdBubble — removed `md:hidden` from wrapper; switched `max-w-[300px]` → `max-w-chat-bubble` token (290px); now renders on both mobile and desktop. — Why: designer call — ad flows should work on desktop too. The bubble is inline-positioned in inputAreaRef which exists on both viewports, so removing the hide is sufficient; the max-w-[300px] was a 10px drift from the codified chat-bubble token (S33 audit cleaned other bubble usages — this one was missed because it was mobile-only at the time).

2026-05-15 — WatchAdSheet — restructured to mount BOTH BottomSheet (mobile) and CenterPopup (desktop); extracted shared `<WatchAdBody />` so anatomy stays identical across viewports. — Why: designer call — sheet variant should work on desktop. Followed BuyCreditsSheet's codified parallel-mount pattern (each primitive hides itself on the wrong viewport via its own CSS). CenterPopup maxWidth=420px on desktop; z-70 preserved on both.

2026-05-15 — DummyAd — removed `md:hidden`; mounted two `<Image>` blocks (portrait `/dummy-ad.png` md:hidden + landscape `/dummy-ad-landscape.png` hidden md:block). — Why: designer call — desktop ad uses a landscape asset (already added to public/). Same tap-anywhere-to-close behavior on both viewports; the asset just orients to the available real estate.

2026-05-15 — WatchAdBubble — wrapper padding `px-m pt-s pb-s` → `px-m md:px-4xl pt-s pb-s` so the bubble's left edge aligns with the regular AI bubbles on desktop. — Why: designer caught — ChatMessages container uses `px-m md:px-4xl`, so my `px-m`-only wrapper made the ad bubble start ~32px more to the left than the regular AI bubbles above it on desktop. Inheriting ChatMessages' exact responsive padding makes the bubble visually part of the same stream.

2026-05-15 — chat-config.ts — stripped "(mobile only)" suffix from FLOW_LABELS for ad-bubble + ad-sheet + from STATE_LABELS for watch-ad-popup; updated FlowMode comment block to note both ad-flows now render on mobile + desktop. — Why: designer caught — the (mobile only) labels were correct when the codified rule "dev-panel state labels for mobile-only or desktop-only surfaces SHOULD carry the suffix" (S33 close) applied; after extending both ad flows to desktop, the suffix is stale and misleading. ModelDeprecatedSheet's "(mobile only)" suffix KEPT because that surface is still mobile-only.

**Knowledge-base candidate (promote at audit):**
*When ANY new inline chat-stream component renders on desktop, its wrapper's horizontal padding must inherit `ChatMessages`'s `px-m md:px-4xl` pattern — otherwise it visually breaks the message stream's left-edge alignment. Generalizable to any future inline chat-bound surface (typing indicators, system notices, banners that live IN the message column, etc.).*

2026-05-15 — page.tsx + WatchAdGate.tsx (DELETED) — Split WatchAdGate dispatcher: WatchAdBubble mounts INSIDE chat column (inline above ChatBar), WatchAdSheet mounts at PAGE ROOT (alongside DummyAd/BuyCreditsSheet) so its fixed-inset-0 scrim covers the full viewport. Both controlled by `chatState === 'watch-ad-popup'` gated by `flowMode`. WatchAdGate.tsx removed (unused). — Why: designer caught — sheet variant's CenterPopup scrim was only visually covering the chat column on desktop, not Header (z-50) + Sidebar (z-40). Root cause: mount-point choice. Inline-stream surfaces and modal-style popups have DIFFERENT mount-point requirements; bundling them in a single dispatcher forced the wrong location for one variant.

2026-05-15 — Scrim opacity standardized to `bg-black-70` across all 7 modal scrims — BottomSheet, CenterPopup, MemoryLimitOverlay, ConfirmSheet, LoginSheet, OnboardingOverlay, BadgeDetailPopup. CreditSidebar was already at 70. Style guide labels updated (OverlaysSection / MemoryLimitPopupSection / OnboardingOverlaySection). Glass-chrome usages of `bg-black-55` (VariantSwitcherPills) preserved — different semantic (chrome, not scrim). — Why: designer call after audit revealed dual scrim conventions (6×black-55, 1×black-70, 1×black-50). Designer chose black-70 as the new standard for stronger separation from chat content (especially important on desktop where Header + Sidebar are visible behind the scrim and need to feel "behind glass," not just slightly tinted).

**Taste-rule change for next audit (Gate 6.5):**
The codified scrim is being changed from `bg-black-55` → `bg-black-70`. This is a system-wide token semantic change, not just a one-off override. At the audit pass: update any taste/decisions/knowledge-base rule that explicitly cites bg-black-55 as the scrim token (codified in S31 around MemoryLimitOverlay extraction; "Self-chromed popups with overhanging elements need a custom scrim wrapper, not CenterPopup" example uses bg-black-55). Generalization: *the WSUP scrim opacity is `bg-black-70` — strong enough to read as a clear "behind glass" state on desktop where Header + Sidebar are visible behind the scrim. `bg-black-55` is reserved for glass-chrome pills (VariantSwitcherPills) where a softer wash is correct because the chrome is FOREGROUND, not background dimming.*

**Knowledge-base candidate (promote at audit):**
*Modal popup vs inline chat-stream component — mount-point separation rule. Modal popups (CenterPopup / BottomSheet variants) mount at PAGE ROOT (sibling of `<main>`) so their fixed-inset-0 scrim escapes any parent stacking context and covers Header + Sidebar. Inline chat-stream components (AI bubbles, banners, system messages) mount inside the chat column so they inherit its responsive width + flow. A single component that bundles BOTH variants (like the old WatchAdGate dispatcher) is wrong by construction — split into two mount points instead.*

**Knowledge-base candidate (promote at audit):**
*Responsive popup pattern — when a chat-bound popup needs to work on both viewports, mount BOTH BottomSheet (mobile) + CenterPopup (desktop) and extract a shared body component. Each primitive owns its own viewport-hide via `md:hidden` / `hidden md:flex`. Don't conditionally render only one (would force the consumer to know the viewport — re-implements primitive responsibility).* Codified by BuyCreditsSheet (S30) + WatchAdSheet (S34). Sibling rule on assets: *when a single image asset doesn't compose well at both portrait + landscape, ship two assets and mount two `<Image>` blocks with the same viewport-hide convention.*

**Rule-conflict flag for next audit (Gate 6.5):**
The codified taste rule *"Exit-affordance uniqueness — don't duplicate the 'leave this surface' path at the same trigger semantic"* (S32 follow-up) said the empty state should NOT have a "Go to Explore" CTA because the Skip pill already serves /explore. Designer override at S34 isn't a contradiction — it's a scope amendment: the rule applies to ACTIVE decision surfaces (where a duplicate exit dilutes the primary actions); at the END-STATE, the user has finished deciding and exit IS the primary action. Suggested amendment: add scope clause to the rule — *"during active decision surfaces; not end-states or terminal acknowledgments."* Promote on audit pass.
