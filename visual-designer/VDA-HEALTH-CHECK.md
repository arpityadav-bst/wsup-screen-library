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
```

If any check fails, fix it before proceeding with any other work.
