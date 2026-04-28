# VDA Health Check — Drag this file to audit VDA end-to-end

Running this check is the ONLY ask. No follow-up questions should be needed. If VDA is healthy, everything passes. If anything is off — stale content, misrouted entries, batched updates, unused rules, drift — this audit catches it and prescribes the fix.

**When to run:** at session start (drift check), after a major feature (learning check), on demand (full audit).

**Ground rule:** every check below has a PASS/FAIL condition and a REMEDIATION. Do not report "looks fine" — report the pass/fail, the evidence, and if failed, apply the remediation inline before moving on.

---

## PART A — Identity & Foundation

### Check 1 — Identity
- Read the Identity Anchor in `agent.md` (top section).
- **PASS:** your one-sentence purpose is about THINKING LIKE A UX DESIGNER.
- **FAIL:** the answer mentions code, tokens, process, or component APIs as the purpose.
- **Remediation:** re-read `agent.md`; correct the self-description.

### Check 2 — Freshness
- Read the "Last updated" date on all 8 knowledge files: `knowledge-base.md`, `taste.md`, `decisions.md`, `reasonings.md`, `session-logs.md`, `evolution.md`, `workflow.md`, `project-insights.md`.
- **PASS:** every file dated within the last 7 days OR explicitly justified as "no changes warranted" (workflow.md is often the latter).
- **FAIL:** any file 7+ days old AND a session happened since. OR: content in the file is newer than the date (last entry dated after the header).
- **Remediation:** if content is newer, bump the header date. If nothing warranted an update, confirm explicitly — don't leave it ambiguous.

### Check 3 — Gates
- Read `QUALITY-GATES.md`. Count the gates (should be 8 top-level + 1 sub-step at 6.5). List them.
- **PASS:** you can list all 8 + describe Gate 6.5's role (Generalization Probe) + name the routing table fields and the meta-question fail trigger that live under Gate 6.
- **FAIL:** you miss any, or can't describe what they enforce.
- **Remediation:** re-read the file; if still fuzzy, the file itself needs tightening.

### Check 4 — Phase
- Read `evolution.md`. What phase are you in? What are the active gaps? Next milestone?
- **PASS:** you name the phase, the active gaps, and the next concrete milestone.
- **FAIL:** any of those are missing or unclear.

### Check 5 — Self-Audit schedule
- Latest session number in `session-logs.md`. Self-audit files exist at milestones 15, 20, 25, 30...
- **PASS:** latest session isn't a milestone, OR self-audit file exists for the nearest milestone.
- **FAIL:** milestone was passed with no self-audit file.
- **Remediation:** run self-audit now, produce `self-audit-session-{N}.md`.

---

## PART B — Learning Health (is VDA learning the RIGHT things?)

This is the heart of VDA's purpose. Every check below has an automatic pass/fail — don't wait for the designer to ask.

### Check 6 — Purpose fit (per-file content audit)

Every knowledge file has a declared purpose. Every ENTRY in that file must fulfill that purpose. Misrouted content = failure, even if the entry is otherwise correct.

| File | Declared purpose | Entry must be | NOT allowed |
|---|---|---|---|
| `taste.md` | Aesthetic instincts, design philosophy | A visual/aesthetic principle that applies broadly | Code, APIs, one-off component choices, process rules |
| `reasonings.md` | The deeper WHY behind decisions | A principle that explains a class of decisions | Specific component tweaks, step-by-step how-to |
| `knowledge-base.md` | Confirmed rules + promoted patterns (2+ consumers) | A defaulted rule backed by evidence OR a primitive promoted after reuse | Speculative rules, single-use patterns |
| `project-insights.md` | WSUP-specific architecture/domain facts | A fact about WSUP flows, screens, or domain structure | Generic UX rules, taste principles |
| `decisions.md` | Per-edit design choices + reasoning | Decision + "because..." | Code facts, prop APIs, file paths, line numbers |
| `workflow.md` | How VDA operates (lifecycle, self-update) | A process rule or cadence | Design principles, aesthetic rules |
| `evolution.md` | Phase + gaps + maturity + research log | Phase transitions, gap tracking, markers | Design rules, taste |
| `session-logs.md` | What-built + what-corrected + what-learned | A designer's notebook entry | A git diff summary / PR description |

**Audit procedure (automatic, no human needed):**
1. For each file, sample the **last 5 entries**.
2. For each entry, classify: `MATCH`, `MISROUTED`, or `DUPLICATE`.
3. `MISROUTED` = entry belongs in a different file. Name the correct file.
4. `DUPLICATE` = same content already exists in another file (or elsewhere in the same file).
5. Report: `File / total / MATCH / MISROUTED / DUPLICATE`.

**PASS:** zero MISROUTED across all files, ≤1 DUPLICATE per file.
**FAIL:** any MISROUTED entry, OR 2+ DUPLICATE in a single file.
**Remediation:** move MISROUTED entries to the correct file inline. Delete DUPLICATES (keep the most canonical location). Note the fix in the next session log under a "Routing repairs" line.

### Check 7 — Real-time learning (no batching)

Per `feedback_vda_realtime_learning.md` — knowledge updates happen WITH the decision, not batched at session end.

**Signals of batching (each = FAIL):**
- The latest session log claims N routed updates, but all 8 files have the same mtime (updated in one burst).
- `decisions.md` has entries logged hours after the corresponding code change.
- The designer had to ask "did VDA learn this?" — if asked, the answer is already FAIL regardless of what comes next.
- A correction was made mid-session but no `decisions.md` entry logged that same turn.

**PASS:** each decision/correction produced an inline knowledge update that same turn.
**FAIL:** any of the above signals.
**Remediation:** next session, route each decision to its file IN the turn it's made. The health check can't fix past batching — only catch it and set the expectation forward.

### Check 8 — Staleness beyond dates

Freshness is more than the header date. Content can go stale while the file looks fresh.

**Look for (each item = one FAIL):**
- `[UNVALIDATED]` tags older than 5 sessions with no validation/contradiction noted.
- Rules in `knowledge-base.md` that no `decisions.md` entry references in the last 10 sessions (unused → orphaned).
- Active gaps in `evolution.md` marked `NEW` but unchanged for 3+ sessions (not new anymore — either reclassify or resolve).
- Rules marked `obsolete`/`deprecated`/`superseded` still present → delete.
- Same rule documented in 2+ files → keep canonical, link from others.
- Research findings with no integration into `taste.md`/`knowledge-base.md` after 3+ sessions.

**PASS:** zero of the above.
**FAIL:** any of the above.
**Remediation:** validate, resolve, consolidate, or delete — all inline during the audit. Never leave stale content "for later."

### Check 9 — Rule application (are the rules being used?)

Rules are only valuable if applied. An unused rule is either wrong or forgotten.

**Audit:**
1. Take the 5 most recent `decisions.md` entries.
2. For each, ask: does this decision ALIGN with an existing rule in `taste.md` / `knowledge-base.md`? Or CONTRADICT one?
3. Count:
   - `ALIGNED` — the decision followed a codified rule (good — rules are working)
   - `NEW` — the decision established something not yet codified (that's what these entries ARE for)
   - `CONTRADICTED` — the decision ignored or broke a codified rule (red flag)

**PASS:** 0 CONTRADICTED.
**FAIL:** 1+ CONTRADICTED.
**Remediation:** for each contradiction, decide: was the rule wrong (→ update it), or was the decision wrong (→ revert)? Log the resolution.

### Check 10 — Drift (design vs process balance)

- Last 10 `decisions.md` entries: how many are about DESIGN (taste, UX, spacing, readability) vs PROCESS (git, tokens, file structure, build)?
- **PASS:** design ≥ 7/10.
- **FAIL:** process > design.
- **Remediation:** VDA is drifting from its purpose. Stop taking on process-heavy work next session; return to design focus.

---

## PART C — Ongoing Discipline

### Check 11 — Contradictions
- `knowledge-base.md` vs `decisions.md`: any conflicts?
- `taste.md` vs recent `session-logs.md`: any contradictions?
- Any `obsolete`/`deprecated` markers still being followed?
- **PASS:** none found.
- **FAIL:** list each conflict with the two locations.
- **Remediation:** resolve each; keep the canonical source, update/delete the other.

### Check 12 — Readiness (can VDA actually apply what it learned?)

Prompt yourself with an unseen task (use one of the below, or generate a fresh one):
- "Build a delete-account confirmation sheet."
- "Design a notification settings screen."
- "Add a filter-by-tag feature to the explore page."

Without building anything, answer:
1. Which existing components do you check first?
2. Which tokens do you use? (name 5 specific ones)
3. What UX questions do you ask before building? (name 3)
4. What Gate 8 items would you check? (name 4)
5. Which taste principles apply here? (cite by name from `taste.md`)

**PASS:** you can answer all 5 with specific references. The answer proves you read `taste.md` + `knowledge-base.md` + component inventory.
**FAIL:** vague answers, no specific token/component/principle references. VDA has knowledge but can't apply it.
**Remediation:** re-read the core three (`taste.md`, `knowledge-base.md`, `project-insights.md`) and try again.

### Check 13 — Designer-caught issue count (per-session trend)

Every session log entry MUST carry a structured field: `designer_caught_count: N` (count of UX issues the designer pointed out that VDA should have caught at Gate 8). Without this field, the Phase 5 → Phase 6 trigger ("zero UX corrections × 3 consecutive sessions") is unmeasurable.

**Audit:**
1. Look at the last 3 session-log entries. Each must have `designer_caught_count: N`.
2. Compute the rolling count: `last3 = [N₁, N₂, N₃]`.
3. Identify recurring categories across the 3 (spacing? color drift? unread copy? mobile issues?).

**Counts that don't qualify:** copy choices the designer reframes (PM-driven decisions aren't VDA's catch-bar), trade-off conversations the designer initiates ("which option do you prefer?"), and explicit *new constraints* the designer adds mid-task. Counts that DO qualify: any layout/spacing/readability/consistency issue VDA shipped that the designer identified before approving.

**PASS:** every recent session has the field; trend is flat or declining.
**FAIL:** field missing on any recent session, OR trend rising 2+ sessions in a row, OR same category repeats 3+ sessions.
**Remediation:** if field is missing, backfill from session-log narrative. If trend is rising, identify the recurring category and codify the prevention as a taste rule + a Gate 8 sub-checklist item. The point of this check is *automatic gap detection* — if VDA keeps missing the same kind of thing, the rule needs to land in `taste.md` so future Gate 8 catches it.

**Phase 5 → Phase 6 trigger** reads from this check directly: 3 consecutive sessions with `designer_caught_count: 0` AND one validated autonomous-research cycle.

---

## Report format (single output, no follow-up questions)

Produce this table at the end of the audit. If any row is FAIL, include the remediation inline in the same report.

```
| # | Check | Status | Evidence | Remediation |
|---|---|---|---|---|
| 1 | Identity | PASS/FAIL | <one sentence> | <if FAIL> |
| 2 | Freshness | PASS/FAIL | <dates + any stale> | <if FAIL> |
| 3 | Gates | PASS/FAIL | <list> | <if FAIL> |
| 4 | Phase | PASS/FAIL | <phase + gaps + milestone> | <if FAIL> |
| 5 | Self-Audit | PASS/FAIL | <session #, milestone status> | <if FAIL> |
| 6 | Purpose fit | PASS/FAIL | <per-file MATCH/MISROUTED/DUPLICATE counts> | <inline repairs> |
| 7 | Real-time learning | PASS/FAIL | <signals found> | <if FAIL> |
| 8 | Staleness | PASS/FAIL | <items found> | <inline repairs> |
| 9 | Rule application | PASS/FAIL | <5 decisions classified> | <if CONTRADICTED> |
| 10 | Drift | PASS/FAIL | <X design / Y process> | <if FAIL> |
| 11 | Contradictions | PASS/FAIL | <list> | <if FAIL> |
| 12 | Readiness | PASS/FAIL | <answers to the prompt> | <if FAIL> |
| 13 | Designer-caught count | PASS/FAIL | <last 3 session counts + recurring category> | <inline codification> |
```

Overall: **HEALTHY** (all PASS) / **NEEDS ATTENTION** (1-2 FAIL) / **UNHEALTHY** (3+ FAIL).

---

## Principles this check enforces

- **Purpose over process:** every entry lives in the file that matches its purpose. Routing isn't a nicety — it's how learning stays retrievable.
- **Real-time over batched:** updates happen with the decision, not at session close. Batching hides what was learned from what was chosen.
- **Living over archived:** content must be validated, applied, or retired. Nothing decays silently in VDA memory.
- **Self-discipline over asking:** the designer should never have to ask "is VDA healthy?" This check answers that automatically.

## What to do after the report

- All PASS → proceed with session work.
- 1-2 FAIL → fix inline during the same session. Don't start new work on top of rot.
- 3+ FAIL → stop. Full routing/pruning pass before any new design work. Note the pass in `evolution.md` as a maintenance session.
