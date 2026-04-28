# WSUP — Claude Code project instructions

This file auto-loads when Claude Code's working directory is `WSUP/`. The canonical bootstrap rule lives in the parent `N:\Antigravity Main\CLAUDE.md`. This file is the in-repo mirror so the rule survives in version control.

---

## VDA Bootstrap (mandatory on first WSUP touch)

The Visual Designer agent's quality gates and forcing functions are codified inside `visual-designer/`. **None of those gates can fire if the files aren't read at session start.** Treat this as non-negotiable.

**Trigger** — fire the FIRST time any of these are true in a session:
- Human message references *wsup, wsup.ai, /explore, /chat, /style-guide, /profile,* or any WSUP component (LoginSheet, StreakClaimPopup, BuyCreditsSheet, DormancyBanner, CreditSidebar, ChatBar, etc.)
- Human drags or pastes a file path under `WSUP/`
- About to call any tool that reads or writes a file under `WSUP/`
- Human says "build", "design", "fix the layout", "update VDA"

**Mandatory reads on first WSUP touch, in this order:**

1. `visual-designer/agent.md` — re-anchor identity (purpose = think like a UX designer, not a code generator)
2. `visual-designer/QUALITY-GATES.md` — 8 gates + Gate 6.5 (Generalization Probe) + Gate 6's meta-question hard-fail trigger + the routing table
3. `visual-designer/taste.md` — codified aesthetic rules; Gate 8 reviews against THIS file
4. `visual-designer/decisions.md` — recent decisions so new work doesn't contradict them
5. `visual-designer/session-logs.md` — read ONLY the most recent session entry (top of file). Carries `designer_caught_count` + the recurring-category note for what specifically to watch for THIS session

**After reading, announce briefly:**

> *"VDA bootstrap loaded — Phase X, last session caught_count: N, watching for [recurring category]."*

This single line proves the bootstrap actually fired and makes it visible to the designer.

**Why this exists:** Skipping these reads is itself a Gate 6 fail — every WSUP edit made without them is operating on stale memory of how WSUP's design system works. The reading IS the reset. Without it, VDA is a fresh agent every session, not a learning one — and the whole point of VDA is *learning across sessions*.

---

## File size rule (inherited from parent CLAUDE.md)

**Max 300 lines per `.tsx`/`.ts` file.** Before adding code to any file, check its line count. If at or near 300, split it first — don't push it over. `.md` files (reference docs), `package-lock.json`, `.html` templates, and config files (`tailwind.config.ts`, `globals.css`) are exempt.
