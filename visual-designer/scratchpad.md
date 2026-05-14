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

_None — scratchpad empty as of S33 close audit (2026-05-14). 30+ scratchpad entries promoted: 13 to decisions.md (top of file), 6 new rules to taste.md, 1 dead-code revert (BottomSheet.aboveSheet slot)._

## Post-audit Gate 6 meta-question catches (2026-05-14, S33 close)

Designer asked the codified Gate 6 hard-fail trigger again: *"is everything tokenized/componentized/in style guide?"*. Honest sweep found 3 real gaps the audit pass had missed:

1. **DummyAd had no style-guide showcase** — only mentioned in WatchAdGate anatomy. Added a "Post-tap: DummyAd fullscreen takeover" subsection inside WatchAdGateSection with the actual ad image rendered at a 240×~507px constrained preview + dev-handoff note.
2. **VariantSwitcherPills had no style-guide section** — primitive was extracted today but never registered in ComponentsTab. Added `VariantSwitcherPillsSection.tsx` (interactive pill demo + anatomy table); registered in ComponentsTab + NAV.Components.
3. **bell-ring + play-pulse animations not discoverable** — new globals.css keyframes had no style-guide entry. Added "Animations — keyframes encode the icon's invitation" subsection in UtilitiesSection listing bell-ring (alarm), play-pulse (invitation), fade-in (generic surface entry), slide-up (BottomSheet entry) with semantic role + duration + consumer for each.

**Pattern recognized (and watch item for S34):** the Gate 6 meta-question caught the SAME family of misses twice today (morning: CharacterTagChip extraction + text-balance utility registration; close: VariantSwitcherPills + animations registration). Both times, NEW components/primitives/animations were added but not registered as discoverable style-guide entries. **Forcing function for S34:** every new `components/ui/` file OR new `globals.css` keyframe is a Gate 5 work item; its style-guide registration must land in the SAME edit as the addition itself, not be deferred to audit. The audit pass should be catching drift, not original sin.
