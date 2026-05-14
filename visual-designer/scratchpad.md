# Scratchpad — inline session notes

**Append-only during a session. Processed and emptied during designer-triggered audit pass.**

See `workflow.md` → "DUAL-CADENCE OPERATING MODEL" for the protocol.

**Entry format (one line per correction-resolution turn):**

```
YYYY-MM-DD HH:mm — <component or file changed> — <what changed in 1 line> — Why: <one phrase>
```

**Examples:**

```
2026-05-13 14:22 — DeckCard.tsx — image aspect 3/2 → 5/4 — Why: character heads were cropped on desktop
2026-05-13 14:31 — OnboardingDeckBanner.tsx — moved View link inline with title — Why: was teleported to far right via space-between
2026-05-13 15:04 — DeckActionButtons.tsx — round 56×56 → wider flex-1 pills with text — Why: round icons read as utility; deliberate-action needs label
```

**Watch-rules for the next audit pass (kept here as living reminders, NOT processed away):**

- Sibling-surface inheritance failures (any new surface that ships without a precedent grep)
- Token-threshold flags (any raw value spotted at 3+ uses without a token — note here, fix in audit)
- Build-broken catches (anything Vercel/typecheck would fail)
- Designer-explicit corrections vs implicit ones (explicit = decisions.md, implicit = might be taste.md)

---

## Pending audit entries

_None — scratchpad empty as of S33 audit (2026-05-14). 6 entries promoted to decisions.md, 2 new taste rules added to taste.md, 1 workflow.md amendment, 1 sibling-inheritance regression caught + reverted (DeckCard tags)._
