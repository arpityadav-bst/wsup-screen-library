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

**Rule-conflict flag for next audit (Gate 6.5):**
The codified taste rule *"Exit-affordance uniqueness — don't duplicate the 'leave this surface' path at the same trigger semantic"* (S32 follow-up) said the empty state should NOT have a "Go to Explore" CTA because the Skip pill already serves /explore. Designer override at S34 isn't a contradiction — it's a scope amendment: the rule applies to ACTIVE decision surfaces (where a duplicate exit dilutes the primary actions); at the END-STATE, the user has finished deciding and exit IS the primary action. Suggested amendment: add scope clause to the rule — *"during active decision surfaces; not end-states or terminal acknowledgments."* Promote on audit pass.
