# VDA Self-Audit — Session 25 (2026-05-03, written 2026-05-04)

Milestone audit per VDA-HEALTH-CHECK.md Check 5 (sessions 15, 20, 25, 30...). **This audit was not produced at S25 itself** — it was caught as a Check 5 fail during S26's end-of-session health check and written retrospectively. Filed late, but filed. Future milestone audits (S30, S35...) must be paired with their milestone session, not deferred.

---

## A. Files reviewed (last 5 entries each)

| File | Last entry session | Match | Misrouted | Duplicate | Notes |
|---|---|---|---|---|---|
| `taste.md` | S25 | 5/5 | 0 | 0 | "Friction scales with reversibility", "Alignment shift", "Verify every state of primitive" — all transferable aesthetic/visual rules. Correctly placed |
| `reasonings.md` | S22 | — | — | — | Not touched in 3 sessions. No new "deeper why" content surfaced. File isn't growing — borderline orphaned but no contradictions |
| `knowledge-base.md` | S22 | — | — | — | Not updated since S22. No primitive reuse hit the 2+ threshold for promotion — still legitimately quiet |
| `project-insights.md` | S15-ish | — | — | — | Last touched ~S15. Profile screen got new capabilities (Remove Account flow) that could fit here as a domain fact, but were routed to decisions.md per per-edit purpose. Not stale-broken; stale-quiet |
| `decisions.md` | S25 | 5/5 | 0 | 0 | All 8 S25 entries are decision + reasoning per row format (Remove Account flow + Checkbox bug + ConfirmGateRow precedent). Correctly placed |
| `workflow.md` | S22 | — | — | — | No process change since S22's learning-discipline forcing functions. Stable |
| `evolution.md` | S23 | — | — | — | Not updated for S24 or S25. Phase 5 status notes are stale — needs S24/S25/S26 backfill (handled in S26 audit) |
| `session-logs.md` | S25 | 1/1 | 0 | 0 | S25 entry follows established structure (scope / shipped / decisions / generalizations / gates / watch items). Includes designer_caught_count |

**Verdict:** Zero misrouting, zero duplicates among files updated this milestone window. Routing discipline holding. Several files are quiet (reasonings, knowledge-base, project-insights, workflow) but not stale-broken — they reflect that the recent sessions have been domain-feature work rather than process/principle work.

---

## B. Pattern check (last 10 decisions across decisions.md)

Sampling decisions from S22→S25 (chronological):

| # | Entry topic | Bucket |
|---|---|---|
| 1 | LoginSheet `mode='form'\|'cta'` instead of forking | DESIGN (component composition) |
| 2 | StreakClaimPopup owns variant presets | DESIGN (separation of concerns) |
| 3 | Apple = bg-black + border-white-20, Google bg-white | DESIGN (brand pairing) |
| 4 | Promo CTA → in-place provider chooser transition | DESIGN (flow continuity) |
| 5 | Default 2s auto-fire on /chat → MemoryLimitPopup (S23) | DESIGN (interrupt calibration) |
| 6 | Variant pills float OUTSIDE popup | DESIGN (dev affordance vs product chrome) |
| 7 | Remove account = ConfirmSheet + confirmGate prop (S25) | DESIGN (primitive extension) |
| 8 | Severity gates the friction, not the surface (S25) | DESIGN (system anatomy) |
| 9 | Both destructive items share text-status-alert exactly (S25) | DESIGN (token discipline) |
| 10 | Checkbox unchecked-state invisibility bug fix at source (S25) | PROCESS (primitive code bug) |

**Result:** 9 DESIGN / 1 PROCESS. Drift check **PASS** (Check 10 threshold ≥ 7/10 design).

---

## C. Contradictions

None found in this milestone window. The S25 work introduced new design patterns (gated confirm, severity-driven friction) without overriding any existing rules.

S26's later work (after this audit window closed) refined the existing "system constraint in character voice" rule via a corollary rather than contradicting it — handled correctly via taste.md routing.

---

## D. Designer-caught trend (Check 13)

| Session | designer_caught_count | Recurring category |
|---|---|---|
| S22 | 3 | Gate 8 misses (post-build review insufficient) |
| S23 | 18 | "Polishing wrong thing" + "self-created collisions" + "grep precedent before inventing" |
| S24 | 0 | (clean) |
| S25 | 1 | Primitive-internal bug unverified visually (codified as Gate 8.2) |

Trend through S25: 3 → 18 → 0 → 1. Phase 5 → 6 trigger requires 3 consecutive 0s. S24 = 1 consecutive 0; S25 = 1 catch resets the count.

Through-S25 reading: Phase 5 still active. Gate 8.2 codification was the appropriate prevention response for S25's category. **(S26 caveat: post-S25, the trend regressed — see session-logs.md S26 entry. New prevention: Gate 8.4.)**

---

## E. Maturity markers

What VDA does consistently right through S25:
- Token discipline (no raw hex/px)
- Style guide same-edit syncing
- Real-time decision logging (no batching)
- Gate 6.5 generalization probes (every decision with universal language gets a sibling taste rule)
- Brand-pure design choices (Apple HIG, login gate copy, severity-driven anatomy)
- Component reuse instinct (extending ConfirmSheet rather than forking)

What still misses:
- **Holistic Gate 8 self-review BEFORE shipping**, not after designer prompt
- **Primitive state-matrix verification** (codified S25 as Gate 8.2 — needs first exercise)
- **(Discovered S26):** Spacing-content fit retune in the SAME edit as a content change

---

## F. Drift assessment

**Design vs process content ratio (last 10 decisions, chronological sample above):** 9/10 design. Healthy.

**Identity stance through S25:** Designer-language ("severity gates the friction"), not developer-language. Decisions read as "I picked X because the user experiences Y" — not "I picked X because the code is cleaner." Identity intact at this milestone.

**(Forward-looking caveat surfaced in S26:** the identity intactness through S25 didn't prevent S26's regression. Identity is not a one-time achievement — it has to survive every string-substitution task.)

---

## G. Decisions to archive

decisions.md currently at ~110 entries (well past the 100 threshold from QUALITY-GATES.md self-audit protocol). However, archiving was **not** done in this audit because:
- The most recent ~30 entries are from active work (S22-S25)
- The next ~20 entries (S18-S21 era) are still being referenced in current taste rules
- Below that, ~30 entries from the Profile/BuyCredits/Style Guide foundational work — eligible candidates for archive but require careful absorption-check into knowledge-base.md first

**Deferred to S30 milestone audit:** explicit archiving pass on decisions.md. Track this as a maintenance debt.

---

## H. Overall health

**HEALTHY** through S25 — but with two debts surfaced:

1. **This audit itself was overdue** (S25 milestone, written at S26). Future milestone audits must be same-day.
2. **decisions.md archive pass deferred** to S30. Don't let it slip past 130 entries.

No remediations required for routing, contradictions, or drift. The S26 regression is documented separately in S26's session log + the new Gate 8.4 codification.
