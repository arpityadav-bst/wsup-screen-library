# VDA Health Check — Drag and drop this file to verify VDA is healthy

Run these checks now and report the results. Do not skip any.

---

## 1. Identity Check
- Read the Identity Anchor in agent.md (top section)
- Answer: What is your purpose in one sentence?
- If your answer is about code, tokens, or process — you're drifting. Your purpose is to THINK LIKE A UX DESIGNER.

## 2. Freshness Check
- Read the "Last updated" date on EVERY knowledge file:
  - knowledge-base.md
  - taste.md
  - decisions.md
  - reasonings.md
  - session-logs.md
  - evolution.md
  - workflow.md
  - project-insights.md
- Report each file's date
- Flag any file that hasn't been updated in 7+ days as STALE
- For stale files: scan content and report what's outdated

## 3. Gate Check
- Read QUALITY-GATES.md
- How many gates are there? (Answer should be 8)
- List all 8 by name
- If you can't list all 8, you haven't read the file properly

## 4. Phase Check
- Read evolution.md
- What phase are you in? (Should be Phase 5 — Quality-Gated Designer)
- What are your active gaps?
- What's your next milestone?

## 5. Self-Audit Check
- What session number is the latest in session-logs.md?
- If session number is 15, 20, 25, 30... does a self-audit file exist? (`self-audit-session-{N}.md`)
- If it should exist but doesn't — run the self-audit NOW

## 6. Contradiction Check
- Is there anything in knowledge-base.md that contradicts decisions.md?
- Is there anything in taste.md that contradicts recent session logs?
- Are there any rules marked as obsolete/deprecated that are still being followed?

## 7. Drift Check
- Look at your last 10 decisions in decisions.md
- Count: how many are about DESIGN (taste, UX, spacing, readability) vs PROCESS (git, tokens, file structure)?
- If process > design — you're drifting from your purpose
- Report the ratio

## 8. Readiness Test
- If I asked you right now: "Build an email collection popup for the explore page"
- What existing components would you check first?
- What tokens would you use?
- What UX questions would you ask before building?
- What would you check at Gate 8 (UX Review)?
- Answer these WITHOUT building anything — just prove you know the approach

## 9. Routing Check (knowledge-file hygiene)

Every knowledge file has a specific purpose. When logging a learning, it must go to the RIGHT file — not whichever one feels easiest to append to. Audit whether recent entries honor this.

**File purposes (reference):**
- `taste.md` — Designer's aesthetic instincts, philosophy, recurring corrections. "How the designer thinks about design."
- `reasonings.md` — The WHY behind decisions. Principles, not specifics.
- `knowledge-base.md` — Confirmed rules, patterns, token hygiene, architectural defaults (e.g., "Responsive overlay pattern = 3+ consumers = confirmed default")
- `project-insights.md` — WSUP-specific facts (credit flow, screen architecture, domain patterns)
- `decisions.md` — Per-edit design decisions with reasoning. Atomic, linked to a specific change.
- `workflow.md` — How VDA operates (session lifecycle, self-update protocol)
- `evolution.md` — Phase tracking, gaps, maturity markers, research log
- `session-logs.md` — Chronological what-was-built-and-learned record

**Minimal-routing default:**
Every session writes to `decisions.md` + `session-logs.md`. That's the baseline — nothing else is mandatory. Only touch the other knowledge files when they've *earned* an entry this session:

- `taste.md` — a NEW aesthetic principle emerged that wasn't captured before (not a restatement)
- `reasonings.md` — a NEW deeper "why" that future-you would genuinely benefit from reading
- `knowledge-base.md` — a pattern reached 2+ consumers (promotion from pattern to confirmed default) OR a genuinely new rule/technical default surfaced
- `project-insights.md` — a NEW WSUP-specific fact (new flow, new screen architecture, new domain pattern)
- `evolution.md` — a maturity marker flipped OR a new active gap was discovered
- `workflow.md` — a process change (rare — usually set-and-forget)

**Don't write a `taste.md` entry because "this session had some taste decisions" — only if a genuinely new principle formed.** Restating existing principles with new examples is duplication, not learning. The routing check fails when it finds padding, not when it finds empty files.

**Audit procedure:**
1. Pull the last 10 entries from `decisions.md`
2. For each entry, ask: does this describe (a) a design choice + reasoning, OR (b) an implementation/code/API detail?
3. Count: how many are pure implementation (code structure, prop APIs, technical how) vs. design (visual choice, UX reasoning, taste expression)?

**Also check distribution across files:**
- Did taste.md get new entries this session? (If designer corrected anything aesthetic → taste.md should have it)
- Did reasonings.md get the WHY for any major decision this session?
- Did knowledge-base.md absorb any rule that's now consolidated?
- Did project-insights.md capture any WSUP-specific fact worth remembering?
- Did session-logs.md stay focused on design thinking, or did it become a PR description?

**Red flags (any of these = routing is broken):**
- 3+ decisions.md entries in a single session that are pure code/API facts (e.g., "added zIndex prop", "used Fragment", "set width to 180px")
- taste.md unchanged after a session where the designer corrected aesthetic choices
- session-logs.md entry reads like a git commit (files changed, diff summary) instead of a designer's notebook
- Same rule documented in both `knowledge-base.md` AND `decisions.md` — decisions should link to the rule, not duplicate it
- WSUP-specific architectural facts (credit flow, screen composition) in decisions.md instead of project-insights.md

**If routing is broken:** prune decisions.md of the implementation noise, redistribute content to the correct files, and note the routing gap in `evolution.md` active gaps table.

**What NOT to save anywhere:**
- Pure code specifics (prop APIs, line numbers, Tailwind JIT behavior) — these belong in code comments or git history, not VDA memory
- Temporary state (this session's TODOs, file paths you just touched)
- Things derivable from reading the current codebase

---

## Report Format

Answer each check as:
```
1. Identity: [PASS/DRIFT] — [your one-sentence purpose]
2. Freshness: [all dates + STALE flags]
3. Gates: [PASS/FAIL] — [list all 8]
4. Phase: [current phase + next milestone]
5. Self-audit: [due/not due/overdue]
6. Contradictions: [none found / list them]
7. Drift: [X design / Y process — HEALTHY or DRIFTING]
8. Readiness: [approach summary]
9. Routing: [design X / implementation Y of last 10 decisions; taste/reasonings/knowledge-base update status; any red flags]
```

If any check fails, fix it before proceeding with any other work.
