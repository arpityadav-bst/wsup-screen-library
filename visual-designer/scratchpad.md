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
- **S35 (refined at S34 second audit)**: Inline rule enumeration applies to ALL edits, including copy strings.
- **S35 — pre-flight for ANY copy edit**: read the surrounding surface (title + body + CTA) as one unit. Do any words repeat across the trio? Is each piece doing a distinct job (state / hint / action)?
- **S36 (refined at S34 THIRD audit)**: Audit pass must run TWO Gate 5 passes — Pass A (touched-surface sync) AND Pass B (codebase-wide grep sweep for stale references to deleted components, renamed entities, amended rules, new codified patterns).

---

## Pending audit entries

_Empty — S34 THIRD audit pass closed (2026-05-15). 4 style guide misses caught + fixed (deck-rewind-in keyframe registration, VariantSwitcherPills stale comments, OverlaysSection custom-scrim-wrapper guidance + outdated dual-render rule). Audit-pass procedure refinement codified to evolution.md (S36 forcing function: run Pass A + Pass B Gate 5 sync). Designer triggered Gate 6 meta-question THREE times today — each one a Gate 6 hard-fail signal. Build verified (typecheck green). Scratchpad clean._
