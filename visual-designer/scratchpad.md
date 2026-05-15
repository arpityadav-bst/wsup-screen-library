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
