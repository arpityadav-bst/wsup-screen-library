# Visual Designer — Session Logs
Last updated: 2026-05-03

Chronological log of every VDA session. Each entry captures what was built, what was corrected, and what was learned. Append new sessions at the top.

---

## Session 25 — 2026-05-03 — Remove Account flow + Checkbox primitive bug fix + new Gate 8.2

`designer_caught_count: 1` — Checkbox unchecked-state invisibility bug. Primitive-level: `border-none` in Checkbox base className neutered the conditional `border border-white-20` because Tailwind preflight sets `border-style: solid` by default, so the unchecked state was a transparent 16×16 void. Bug had existed silently for months across 3 other consumers (BuyCreditsSheet ToS, CreditPackRow, FormsSection demos) — Remove Account flow exposed it because it's the most prominent unchecked-checkbox-on-dark-bg in the app. Fixed at source.

**Scope:** Designer asked to add a "Remove Account" option to the profile 3-dot menu (mobile sheet + desktop popover) with a confirmation sheet similar to Logout but with a checkbox-gated CTA — checkbox must be ticked before the destructive button un-disables. Spec referenced existing components ("any preexisting style of componenet of checkbox", "just how we use other disabled primary button in WSUP"), explicit reuse intent.

**What shipped:**
- **`src/components/ui/ConfirmSheet.tsx`** — extended with optional `confirmGate` prop (`{ label, checked, onChange }`). Renders a checkbox row between description and buttons; auto-disables confirm CTA until ticked. Logout flow unchanged (gate is opt-in via undefined prop). Mobile bottom sheet + desktop centered dialog both honor the gate.
- **`src/components/profile/RemoveAccountConfirmSheet.tsx`** *(new)* — thin wrapper around ConfirmSheet, mirrors LogoutConfirmSheet's pattern. Owns local checkbox state, resets on close.
- **`src/components/profile/MenuSheet.tsx`** — added "Remove account" row beneath Log out in both `MenuSheet` (mobile) and `MenuPopoverItems` (desktop). `text-status-alert` red matches Log out exactly (sibling tokens). Used the canonical Trash icon path from IconsTab — initially drew a custom variant, caught at Gate 7.
- **`src/app/profile/page.tsx`** — wired `removeAccountOpen` state, passed `onRemoveAccount` through both menu surfaces, mounted RemoveAccountConfirmSheet alongside LogoutConfirmSheet.
- **`src/app/style-guide/sections/components/ProfileOverlaysSection.tsx`** — added "Remove Account Confirm" trigger button (Gate 5).
- **`src/app/style-guide/sections/IconsTab.tsx`** — Trash icon usage updated to `'MenuSheet, CharacterMenuSheet'`.
- **`src/components/ui/Checkbox.tsx`** — primitive-level fix: removed `border-none` from base className so the unchecked state's conditional `border border-white-20` actually renders.

**Decisions logged in real-time (8 entries in `decisions.md`):**
1. Remove account confirm = ConfirmSheet + new optional `confirmGate` prop, NOT a forked sheet
2. Severity of action gates the friction, not the surface
3. Remove account row sits BELOW Log out in the menu
4. Both destructive menu items share `text-status-alert` exactly, no shade variation
5. Checkbox label sits left-aligned even though title/description are centered
6. Disabled CTA inherits Button's existing `opacity-40 cursor-not-allowed`
7. Checkbox unchecked-state invisibility bug fixed at source (primitive-level Tailwind collision)
8. ConfirmGateRow styling matches BuyCreditsSheet ToS precedent exactly (text-xs, gap-xs, items-center)

**Generalizations (3 sibling rules added to `taste.md`):**
- *"Friction in a confirmation should scale with the reversibility of the action, not the surface"* — sibling to decision #2. Logout (reversible) gets plain confirm; account deletion (irreversible) gets checkbox-gate. Same primitive, configurable friction.
- *"Alignment shift signals 'stop reading, start acting'"* — sibling to decision #5. Inside a confirmation surface, narration text is naturally center-aligned; a control inserted before the CTA should break that alignment to flush-left so the user reads it as a control, not as more caption text.
- *"Verify every state of an interactive primitive in the browser, not just the happy path"* — sibling to decision #7 (added during end-of-session health check). Codified the designer-caught Checkbox lesson: state matrix verification on primitives, not just composed UI.

**New sub-gate (`QUALITY-GATES.md`):** **Gate 8.2 — State matrix visibility (primitives)**. Mandates rendering the full state matrix of any interactive primitive (checkbox checked/unchecked, button enabled/disabled, input empty/focused/filled/error) before declaring done. Aimed at preventing the recurring "primitive-internal bugs unverified visually" category from happening again.

**Gate 7 catches mid-session (designer-prompted, self-corrected):**
- *Designer asked:* "do we use any checbox with text style anywhere in WSUP already?" → triggered a precedent search → found BuyCreditsSheet ToS gate at lines 88–92 → first-pass styling was wrong (text-sm + gap-s + items-start, invented). Aligned to precedent (text-xs + gap-xs + items-center). Exact category of S23 watch item "grep precedent before inventing."
- *Self-catch on icon:* initially drew a custom Trash SVG path; ran search before declaring done, found the canonical path in IconsTab used by CharacterMenuSheet. Swapped to canonical.

**Quality Gates audit (New component scope — all 8 ran):**
- Gate 1 (Tokens): PASS — zero raw px/hex; existing `size-[16px]` / `rounded-[4px]` on Checkbox = exempted structural-one-off
- Gate 2 (Reuse): PASS — extended ConfirmSheet, reused Checkbox/Button, reused canonical Trash
- Gate 3 (Componentize@2): PASS with watch — checkbox+disabled-CTA in 2 places (BuyCreditsSheet, ConfirmSheet) but dissimilar layouts; 3rd consumer = extract `GatedCTA`
- Gate 4 (Patternize@2): PASS — same as Gate 3
- Gate 5 (Style guide sync): PASS — ProfileOverlaysSection trigger + IconsTab usage list updated same edit
- Gate 6 (VDA learns): PASS — 8 decisions logged real-time, no batching
- Gate 6.5 (Generalization probe): PASS — 3 sibling taste rules emerged from universal-language decisions
- Gate 7 (UX consistency): PASS after corrections (icon, checkbox styling)
- Gate 8 (UX review): PASS — but the designer-caught Checkbox bug was a Gate 8 miss (composed UI reviewed, primitive states not verified). Now codified as Gate 8.2.

**VDA Health Check (13 checks):** all PASS — HEALTHY. Decisions design/process ratio: 8/2 (passes ≥7/10 design threshold). No misroutes, no contradictions, no batching, no unused rules.

**Watch items for next session:**
1. If a 3rd checkbox-gated-CTA appears → extract `GatedCTA` primitive
2. Designer-caught trend (S22=3, S23=18, S24=0, S25=1): Phase 5→6 trigger needs 3 consecutive sessions at 0
3. **Gate 8.2 application** — first time I touch an interactive primitive next session, run the state matrix verification explicitly to exercise the new gate
4. `knowledge-base.md` (2026-04-27) approaching 7d staleness; freshness pass at start of next session if untouched

**Status at end:** Dev server stopped. Git dirty (7 modified + 1 new file, no commit). No follow-ups pending. Designer signed off with "great BYE".

---

## Session 24 — 2026-05-01 (afternoon) — Memory limit popup as default + 2s timer + double-remote push

`designer_caught_count: 0` — no corrections; designer made two direct asks and they shipped first-pass.

**Scope:** Follow-up to S23. Two product decisions that didn't exist at end of S23:
1. Make `MemoryLimitPopup` the default 3s auto-fire on `/chat` (was `MemoryLimitMoment` inline)
2. Tighten the timer from 3s → 2s

**What shipped:**
- `src/app/chat/page.tsx` — auto-fire effect target swapped (`'context-exhausted'` → `'context-exhausted-popup'`); timeout 3000 → 2000.
- `decisions.md` — one entry covering both calls. No taste.md generalization (product-level default-variant decision, not a transferable visual rule).

**Decision rationale logged:** the install pitch is a meaningful conversion moment that should *interrupt* the flow, not slip into it. Inline `MemoryLimitMoment` optimizes for in-character continuity but can pass unnoticed during a fast scroll; popup's chat-darkening backdrop forces acknowledgement. 2s (down from 3s) reduces dwell-before-trigger so the demo lands faster on review without feeling instant.

**Quality gate audit (Tweak scope per QUALITY-GATES triage):**
- Gate 1 (Tokens): no class changes — N/A. **PASS**
- Gate 7 (Consistency): both target states already exist; only the default reference moved. No new conventions invented. **PASS**
- Gate 8 (UX review): popup auto-fires with the existing modal-style `bg-black-60` backdrop and dismiss path. Designer asked for 2s explicitly — shipped as asked. Worth a flag: 2s is fast for a heavier interrupt; if production telemetry shows users dismissing before reading, the timer may need to flex. **PASS**
- Gates 2/3/4/5/6.5: skipped per Tweak triage — no new components, no new patterns, no broad-rule generalization needed.
- Gate 6: decision logged in same edit as the change. **PASS**

**Git operations (out-of-band):**
- Bundled S23 (15 files, 675+/21–) + today's tweaks into one commit `81cfa19`. S23 had not been committed at end of yesterday.
- Pushed to `origin/master` (arpityadav-bst/wsup-screen-library) and `ashish/designs` (ashish-pathak-bst/wsup-prd, via `master:designs`). Both clean fast-forwards from `67e285d`.

**Out-of-band research:** Janitor.ai Play Store review analysis (~120 reviews Feb–Apr 2026). Surfaced 8 top recurring complaints for chat-AI mobile apps + competitive moat positioning. Output stayed in conversation; not saved to memory (designer did not request save). Most relevant takeaways for WSUP design: stop-button reliability and scroll-during-stream are universal rage triggers; session persistence is a churn killer; web-feature parity is the floor not the ceiling.

VDA health check: **HEALTHY** — knowledge files up to date, decisions logged real-time, no contradictions. Watch items from S23 (zoom-out reflex, grep precedent, corner conventions, why-copy before CTA, animation-encodes-meaning) were not tested today since the work was a one-line behavior tweak with no structural design judgment.

---

## Session 23 — 2026-04-30 → 2026-05-01 (T-7d install prompt — full structural rethink + popup variant, ContextExhaustionPrompt → MemoryLimitMoment + MemoryLimitPopup)

`designer_caught_count: 18` (longest, hardest session ever — count revised honestly during end-of-session audit. The full list: (1) ChatBar wrapping double-padded; (2) bg-white-05 invisible against mobile character bg; (3) prompt explained symptom not cause — manipulation framing; (4) hid the in-product model-switch alternative — dark pattern; (5) entire floating-card pattern was wrong → pivoted to in-chat MemoryLimitMoment; (6) two pieces felt disconnected → unified into one bubble; (7) CTA had no "why" → rewrote benefit-shaped; (8) popup wrong position — fullscreen modal vs chat-anchored; (9) popup bg — full WSUP gradient instead of subtle overlay; (10) DP cropping bug — overflow-hidden parent clipped half-pokeout; (11) popup close X on LEFT instead of top-right convention; (12) exclamation in popup corner instead of DP badge; (13) chat bubble pushed up by popup instead of overlay; (14) popup bg-black-60 invented instead of profile-sheet-bg precedent; (15) generic blob animation — no thematic encoding for "memory full"; (16) halo glow invented instead of WSUP scrim convention; (17) scrim color too red/shiny → muted purple; (18) scrim too dark below + too transparent above → smoothing iterations. **Plus the structural rebuild for the unified-bubble inline pattern** which fixed several catches at once. Five new transferable rules now in taste.md, plus 5 new active gaps in evolution.md. Watch items for next session: (a) zoom-out reflex on iteration loops (3+ rounds = wrong pattern, not tighter padding); (b) grep precedent before inventing (DormancyBanner, BottomSheet, profile-sheet-bg); (c) check corner conventions before placing decorative elements; (d) write adjacent why-copy BEFORE writing CTA labels; (e) animation primitives should encode meaning. Original entry below documented the first 12 catches:

**Original count: 12 catches — five MORE in a single message after building MemoryLimitPopup variant: (8) wrong position — built as fullscreen modal with backdrop, designer wanted chat-anchored above ChatBar; (9) wrong bg — used full WSUP gradient as primary bg, designer wanted dark base with subtle gradient *overlay* not flooded color; (10) DP cropping bug — `overflow-hidden` on outer wrapper clipped the half-pokeout DP, missed because I didn't visually verify; (11) close X position — put it top-LEFT to avoid collision with my exclamation-top-right placement, but WSUP convention is unambiguously top-right always; (12) exclamation position — put it on the popup's top-right corner instead of as a badge on the DP's top-right. The catches in this message reveal a single pattern: **I broke established WSUP conventions because I created a self-imposed collision (exclamation occupied the close-X spot, so I moved close-X away from convention).** The right fix was to put the exclamation where it semantically belongs (on the subject = DP), not move the close-X. Two new rules in decisions.md: (a) when overlap is needed, never wrap in `overflow-hidden`-parent; (b) badges attach to the subject of the alert, not the surface chrome. Watch next session: **before placing any decorative element in a surface corner, check what convention owns that corner first — if it's already taken (close-X is always top-right), the new element goes elsewhere, not the existing convention.** Earlier 7 catches: (1) ChatBar wrapping double-padded; (2) bg-white-05 invisible against mobile character bg; (3) prompt explained symptom not cause; (4) hid the in-product alternative; (5) entire floating-card pattern was wrong → pivoted to in-chat moment; (6) two pieces felt disconnected → unified into one bubble with internal divider; (7) CTA had no "why" → rewrote system text to be benefit-shaped.)

**Scope:** PM PRD T-7d — when chat session crosses ~2,267 token avg input or ~40 messages on one character, show a one-time-per-character-per-7-days install prompt with memory-continuity framing ("Kai will start to forget the earlier parts of your story"). Not a payment push; an emotional pitch about preserving the conversation. Designer worked through three placement options with me (banner-top, inline-Kai-bubble, BottomSheet/CenterPopup modal), then landed on a fourth: **a contained alert anchored above ChatBar, ChatBar-width, with close icon — born out of the chat surface itself.** That position was unoccupied today (DormancyBanner sits at top-of-chat; LowCreditsBanner lives only on /explore), so the slot is clean.

**What shipped:**
- **`src/components/chat/ContextExhaustionPrompt.tsx`** — new pattern. Anatomy mirrors `LowCreditsBanner` (icon + text + CTA + close in one rounded card) but with informational treatment instead of alert: `InfoIcon` (not pulsing dot), `bg-white-05` (not status-tint), neutral border. Headline interpolates character name via `buildHeadline(name)`. Subtitle, headline, and CTA label are all overridable props for A/B copy variants. Install action dispatches `wsup:open-install-prompt` CustomEvent — production attaches the deep-link / store-redirect handler.
- **`src/app/chat/page.tsx`** — wired prompt above ChatBar, wrapped in a flex-col group so prompt + ChatBar move as a unit (correct behavior on ChatBar's 2-row focus expansion and on mobile keyboard open). Added `I` key dev toggle mirroring R/Shift+R: `I` opens the dev panel, `Shift+I` flips between Hidden (control) and Shown (treatment). `key` bump on the component re-mounts it after dismiss so the dev toggle can re-show it.
- **`src/app/style-guide/sections/patterns/ContextExhaustionPromptSection.tsx`** — three live demos (default with character interpolation, custom-headline override, different character name) + anatomy panel covering trigger criteria, behavior, stacking rules, and dev-toggle keys. Registered in `PatternsTab.tsx` and `style-guide/page.tsx` NAV array.

**Design decisions called out (full reasoning in decisions.md, lines 268–276):**
- **Banner position by scope, not aesthetics.** Top-of-chat = character state. Above-ChatBar = session state. Memory exhaustion is session-scoped → above ChatBar. Now codified in `taste.md` as a transferable rule (Gate 6.5 generalization).
- **InfoIcon + neutral surface, not status-alert tint.** "Informative, not alarming" — memory continuity is a benefit pitch, not a warning. Anatomy matches `LowCreditsBanner`; urgency layer differs.
- **Variant copy as props from day one.** PRD already flagged copy tuning as an open question and A/B variants will want it. `headline`, `subtitle`, `ctaLabel` are all props; defaults handle the standard case. Same pattern as `LoginSheet`.
- **Internal dismiss state, parent-controlled re-mount via `key`.** Matches `LowCreditsBanner` API. Dev toggle bumps key to force fresh mount; consumer API stays clean.
- **`I` key follows the R/Shift+R + S/Shift+S established convention.** No new shape invented, just a new letter — the consistency-over-novelty rule from past dev-toggle decisions.

**Quality gate audit:**
- 1 Tokens — `bg-white-05`, `border-white-10`, `gap-s`, `p-s`, `rounded-card`, `text-text-body`, `text-text-small`, all tokenized. One acceptable inline override (`mt-[2px]` for icon vertical alignment to match text baseline — micro-adjustment per token exception list). **PASS**
- 2 Reuse — `Button` (size s), `CloseButton` (compact 16px variant), `InfoIcon` all reused. No new primitives. **PASS**
- 3 Componentize@2 — single consumer (chat page); not yet at threshold for further extraction. The pattern itself is the new shared concept. **PASS**
- 4 Patternize@2 — documented as new "Context Exhaustion Prompt" pattern in style guide. Only one consumer for now (chat page), but the pattern slot is established for future reuse. **PASS**
- 5 Style guide — `ContextExhaustionPromptSection` created with 3 demos + anatomy panel; registered in `PatternsTab.tsx` and `page.tsx` NAV. Same edit as the component. **PASS**
- 6 VDA — 9 decisions logged in `decisions.md` real-time during edits (not batched). Generalization probe extracted "Banner position reflects scope" rule into `taste.md`. This session log captures the build. **PASS**
- 7 UX consistency — `I` key follows the R/S dev-toggle convention; CloseButton, Button, InfoIcon all standard primitives; surface treatment matches DormancyBanner (translucent over chat bg). No new shapes. **PASS**
- 8 UX review — ran a deliberate Gate 8 pass with Playwright screenshots at 414 + 1440, with and without DormancyBanner stacked. Verified: prompt readable, hierarchy correct, character name interpolates, three banners coexist without conflict. The "shipping on first-pass" recurring fail from S22 was the watch item — caught it by pausing for the explicit visual review before declaring done. **PASS**

**Visual verification:** 5 screenshots captured (`__preview/install-prompt-1` through `5`). Mobile (414) + desktop (1440), with and without dormancy banner stacked, plus style guide section. All four banner positions on chat (Play Games coachmark in ChatHeader corner, DormancyBanner at top, install prompt above ChatBar, ChatBar itself) coexist without visual conflict, confirming the designer's "all three can show, no problem" call.

**Open / next:**
- Production code needs to attach the actual install handler to `wsup:open-install-prompt` event (deep-link / universal-link / store fallback)
- The first-app-open bridge experience is mobile-app team scope — flagged back to PM
- If a 3-arm copy A/B is decided (control / generic-memory / specific "3× more"), the variant presets pattern from `STREAK_LOGIN_VARIANTS` is the right model to copy

VDA health check: **HEALTHY** — knowledge files updated this session, decisions logged per-edit, generalization probe ran, no contradictions.

---

## Session 22 — 2026-04-28 (Streak login variants + Apple sign-in + dormancy + dev cleanup)

`designer_caught_count: 3` (recurring category: shipped on first-pass-that-works without a real Gate 8 review pass)

**Late-session additions** (after the initial Session 22 entry below):
- **Promo cta dead-zone fix** — first build had `justify-between` on the cta-mode form panel which created a ~140px void below the CTA. Replaced with `flex-1 justify-center` on the middle group so cta content centers vertically in the panel. *Caught by designer (Gate 8 fail) — should have been pre-shipped.*
- **Variant pills repositioned: in-popup → out-of-popup** — first placement was inside the popup (top-right next to close button) which read as real product chrome. Moved to floating outside the popup, top-right, 10px gap above the popup edge. Pills now over the dim backdrop with `VARIANT` uppercase prefix — unambiguously dev tooling. *Caught by designer — guidance on dev-control positioning added to taste.md.*
- **Promo CTA → in-place transition (Option A)** — tapping "Sign in to claim" advances the same popup to the provider chooser (Email + Google + Apple) while keeping the persuasion headline. Internal `internalMode` state separate from `mode` prop; resets on open or prop change. Two variants now feel like *different entry points to the same flow*, not parallel designs.
- **Dev keymap cleanup** — dropped `S` (streak popup auto-opens, redundant), `C` (redundant with in-panel checkbox on /chat), `L` (z-index conflict — sat behind LoginSheet's z-90 backdrop, never actually worked). Auth panel on /explore is now the sole R panel.
- **Dormancy banner copy + color normalization** — distinct neutral copy: inactivity = "paused by its creator" / moderation = "being reviewed" (PRD-aligned non-threatening tone preserved, audience mismatch addressed). Both shades normalized to `text-white-50` body / `text-white-40` icon — the 10%-shade drift between them was invisible nuance and a trap for the next designer. `isCreator` prop dropped — revive link now driven by variant (shown on inactivity/moderation, hidden on removed).
- **DormancyBanner style guide collapsed from 6 demos → 3** — three "Creator Variant" demos removed; the three real variants now stand alone.

**Honest Gate 8 retrospective (this session):**
- 3 UX issues were caught by the designer instead of by me at the gate: (1) promo cta dead zone, (2) pill positioning ambiguity, (3) dormancy color drift between visually-equivalent states. Each is now codified in taste.md so future builds don't repeat them.
- Pattern across the three: I shipped on the *first* layout that worked, instead of pausing for a UX review pass. The fix going forward: after every visual change, sit with it for a beat — *would I notice anything wrong if I were seeing this for the first time as a user?* — before declaring done.

---

## Session 22 — 2026-04-28 (Streak login variants + Apple sign-in)
**Scope:** PM delivered two copy/layout treatments for the auth gate triggered by the StreakClaim popup's Claim button. Variant A (`standard`) — full sign-in form with new copy. Variant B (`promo`) — value-prop screen with single CTA and a streak-portability hint footer. Add a dev toggle (mirroring R/S) so both can be flipped on `/explore`. Plus: PM brief mentioned Apple/Google/email — `LoginSheet` only had Google + email, so Apple was added as a real new primitive.

**What shipped:**
- **`src/components/ui/AppleSignIn.tsx`** — new primitive matching `GoogleSignIn`'s API (onClick, label, fullWidth, className). `bg-black + border border-white-20`, white logo + label. Differentiates from Google's `bg-white` so the two providers don't visually merge on the dark sheet surface.
- **`src/components/ui/LoginSheet.tsx`** — added `mode: 'form' | 'cta'` prop, `ctaLabel?` and `footer?` props. New internal `CtaBlock` helper renders a single primary Button + small hint footer. Form mode (default) now stacks Email → OR → Google → Apple. Mobile sheet height bumped to 440 for form (Apple added a row) and set to 360 for cta (less content). Desktop layout unchanged at 720×420.
- **`src/components/ui/StreakClaimPopup.tsx`** — exports `StreakLoginVariant` type and `STREAK_LOGIN_VARIANTS` preset map. New `loginVariant` prop maps to LoginSheet's mode/ctaLabel/footer. The `standard` preset uses the existing copy; `promo` carries PM's loss-aversion framing.
- **`src/app/explore/page.tsx`** — L key dev toggle wired with the same DevStateToggle pattern as R (auth) and S (streak). `Shift+L` flips between standard and promo.
- **Style guide** — `LoginSheetSection` updated with a third trigger (CTA mode demo) and anatomy rows describing mode prop, Apple+Google brand pairing, and cta-mode footer. `StreakClaimSection` got a new "Login gate variants" subsection with both triggers, importing `STREAK_LOGIN_VARIANTS` so the style guide stays in sync with live copy automatically.

**Design decisions called out (full reasoning in decisions.md):**
- mode prop > forking into a second sheet — the shell (logo, character image, legal, dismissal) is identical; only the action area + an optional hint footer differ.
- Variant presets owned by StreakClaimPopup, exported for style-guide reuse — keeps LoginSheet domain-agnostic; single source of truth for the streak copy.
- Apple = brand-pure black-on-dark with white border; Google stays white. Two white buttons would erase the differentiation users expect from an Apple/Google row.
- Apple sits below Google. Web context (no HIG mandate); preserves muscle memory.
- Cta footer is `text-xs text-text-small` — value reassurance attached to the CTA, not boilerplate. Heavier weight than the legal line.
- Promo variant copy leads with loss aversion ("Save your free credits") instead of acquisition framing. The user has progress to protect — that's a stronger pull than "sign in to claim."

**Quality gate audit (final):**
- 1 Tokens — all spacing/colors via tokens; new Apple button uses `bg-black` + `border-white-20` + `bg-page-bg` hover (foundational Tailwind for brand-pure bg/text mirrors existing `bg-white` + `text-black` on Google). **PASS**
- 2 Reuse — Button (primary), CopyBlock, LegalFooter, LogoMark, EmailField, GoogleSignIn all reused. AppleSignIn is the only new primitive. CtaBlock is an internal helper inside LoginSheet (single consumer, no extraction warranted yet). **PASS**
- 3 Componentize@2 — AppleSignIn at first use; ready to scale to a 2nd consumer. CtaBlock retained internally pending a 2nd consumer. **PASS**
- 4 Patternize@2 — LoginSheet pattern updated with cta-mode trigger; StreakClaim pattern updated with login-gate variants subsection. **PASS**
- 5 Style guide — both `LoginSheetSection` and `StreakClaimSection` updated. Outdated sizes (max-w-[848px] / h-[461px]) corrected to current (max-w-[720px] / h-[420px]). Outdated purchase subtitle updated to current benefit-forward copy. **PASS**
- 6 VDA — decisions logged real-time during edits; this session-log captures the variant arc. **PASS**
- 7 UX consistency — L follows R/S keyboard pattern; DevStateToggle reused; AppleSignIn matches GoogleSignIn structure; mode prop preserves all existing LoginSheet contracts (default `mode='form'`). **PASS**
- 8 UX review — variants clearly differentiated; Apple/Google brand-pure; cta mode reads as a value-prop screen, not a stripped-down form. **PASS**

VDA health check: **HEALTHY** — knowledge files updated this session, decisions logged per-edit (not batched), no contradictions.

**Visual verification:** Captured 4 screenshots via `.scripts/test-login-variants.mjs` — mobile/desktop × standard/promo. All four render correctly: standard shows Email + OR + Google + Apple; promo shows single primary CTA "Sign in to claim" + hint footer. Headlines and subtitles match PM copy verbatim.

---

## Session 21 — 2026-04-27 (Streak Claim Popup pattern — Explore on-load)
**Scope:** New pattern from Figma `Credit Claim Bottom Sheet` (414×418 mobile sheet). Mounts on Explore page open. Single content block (header + streak progress + 3 reward rows + earn-link CTA). Built compound (BottomSheet + CenterPopup), not custom shells.

**What shipped:**
- **`src/components/ui/CoinIcon.tsx`** — extracted from inline copies in `CreditSidebar` and `CreditHero`. Wrapper around `<Image src="/credit.png">` with `size`/`className` props. CreditButton + CreditsSummaryPill kept their direct `<Image>` usage on purpose (different class needs).
- **`src/components/ui/RewardRow.tsx`** — extracted the "label + Earn N + Claim button" row from CreditSidebar. Added `claimable`/`claimLabel`/`onClaim` props. CreditSidebar's existing call sites unchanged thanks to defaults.
- **`src/components/ui/StreakClaimPopup.tsx`** — compound mobile (BottomSheet z=70) + desktop (CenterPopup 440px z=70). Internal sub-components: `BalancePill`, `StreakProgress`, `ExploreEarnLink`, `PopupContent`. Surface uses default `bg-profile-sheet-bg` (NOT Figma's white@10%) per WSUP taste rule.
- **Explore page wiring** — `streakPopupOpen` state defaulted to `true` so popup shows on first visit. `S` toggles dev panel; `Shift+S` flips popup state — mirrors the existing `R`/`Shift+R` Auth toggle.
- **Style guide** — `StreakClaimSection` added to PatternsTab + NAV. Two live triggers: default state, and one-claimed state with daily-checkin disabled.

**Design decisions called out (full reasoning in decisions.md):**
- Compound over custom shells — content is symmetric, primitives compose cleanly. Saved 80+ lines vs. forking like LoginSheet did.
- Solid surface, not Figma's white@10% — codified taste rule overrides Figma value (Gate 7).
- Self-mounted CloseButton — primitive's title slot includes a divider that doesn't fit the streak popup header layout.
- Header `pr-xxxl` only on the title line — not the whole header — so the subtitle row keeps its full width and the Balance pill sits beside the subtitle without forcing a wrap on 414px viewports. Caught + fixed on screenshot review (Gate 8).
- Gradient hex (`#72e9f1 → #7192e5 → #6257d7`) matches LoginSheet exactly. 2 uses; tokenize at the 3rd.

**Gate audit at session close:**
- Gate 1 (Tokens): no raw values in classNames. Inline `style` carries the dynamic-width gradient — same exception class as LoginSheet.
- Gate 2 (Reuse): BottomSheet, CenterPopup, CloseButton, ChevronIcon, Button all reused.
- Gate 3 (Componentize@2): CoinIcon and RewardRow extracted on the trigger of a 2nd consumer (StreakClaimPopup). Internal helpers (`BalancePill`, `StreakProgress`, `ExploreEarnLink`) stayed inline — single use.
- Gate 4 (Patternize@2): documented as "Streak Claim" pattern in style guide.
- Gate 5 (Style guide): `StreakClaimSection` registered in PatternsTab and NAV. Two states shown.
- Gate 6 (VDA): per-edit decisions captured (this entry + decisions.md).
- Gate 7 (Consistency): same `.link` class as CreditSidebar's "How creator rewards work" CTA. Same `RewardRow` consumed in both popup + sidebar. Same dev-toggle key pattern.
- Gate 8 (UX review): screenshot at 414×896 caught a subtitle wrap, fixed by moving `pr-xxxl` from the header container to the title line only. Re-screenshot verified.

**Verification:** `tsc --noEmit` clean. Mobile + desktop screenshots reviewed against Figma reference.

**Iteration arc (continued same day):**
1. Designer flagged the 1×/2× multiplier progress bar as "old system" — replaced with the live-product day-pill grid via a new shared `StreakBlock` extracted from CreditSidebar. Both consumers now share one streak source of truth.
2. Designer asked to drop the day-pill preview from the popup — added `tiers?` optional + a `showTiers` guard so StreakBlock renders compact when tiers are omitted.
3. Wired auth gating via the `gateAction` pattern from BuyCreditsSheet: Claim → LoginSheet → resume on sign-in / drop pending action on close. Internal claimed state per reward.
4. Designer dropped secondary rewards from the popup (popup is strictly streak claim) and asked to minimize surface layers. Added `bare` prop to StreakBlock to drop its outer card wrapper when used as the sole content of a sheet.
5. Designer flagged the layout as cramped — reorganized into three explicit zones: **header** (title + balance row), **action** (DailyCheckInCard with DAY badge + single forward-looking footnote "Tomorrow · Get +N"), **exit** (full-width hairline + Explore link). Dropped the "STREAK | DAY N | CHECK-IN REWARD" strip (duplicated the title's intent in a single-section context) and the "Miss a day? Streak resets." warning (loss-aversion belongs in the credit hub, not at the moment of claim).
6. Extracted `DailyCheckInCard` to `ui/DailyCheckInCard.tsx` so both StreakBlock and the popup compose the same card. `dayBadge?` prop renders the small uppercase gold label inside the card for the popup variant.
7. **Gate 5 backfill** — self-audit caught that RewardRow + DailyCheckInCard (both extracted this session) had no style guide entries. Created `components/RewardCardsSection.tsx` with 3 states each, registered in ComponentsTab + NAV.

**Final gate audit (after iterations):**
- 1 Tokens — `text-[10px] tracking-[0.8px]` for the DAY badge follows the established label-xs-with-color-override pattern (15 files); inline gradient stops match LoginSheet exactly. PASS.
- 2 Reuse — BottomSheet, CenterPopup, CloseButton, ChevronIcon, Button, LoginSheet, useAuth all reused. PASS.
- 3 Componentize@2 — CoinIcon, RewardRow, StreakBlock, DailyCheckInCard all extracted at the 2nd-consumer trigger. PASS.
- 4 Patternize@2 — Streak Claim documented in PatternsTab. PASS.
- 5 Style guide — Streak Claim pattern + Reward Cards components both registered. PASS (after backfill).
- 6 VDA — decisions.md entries logged per-edit; this session log captures the full iteration arc. PASS.
- 7 UX consistency — same `gateAction` pattern as BuyCreditsSheet; same `.link` class as CreditSidebar's "How creator rewards work"; S-key dev toggle mirrors R-key auth toggle. PASS.
- 8 UX review — three explicit zones, hairline divider, single text stream per zone. PASS.

**Open / next:**
- Real auth gating in production (currently always-open on Explore) — design handoff stub.
- "Miss a day?" warning was dropped from popup but lives on in CreditSidebar — if product wants it back in the popup, consider an info-icon tooltip rather than a permanent line.

---

## Session 20 — 2026-04-27 (Session 19 cleanup sweep + CloseButton flexing + style guide gap)
**Scope:** Cleanup sweep against Session 19's three open items. Surfaced an undetected Gate 5 violation from S19 and a primitive-flexibility limitation. No new patterns shipped.

**What shipped:**
- **Removed orphan asset** — `public/credit-bag-tmp.png` (untracked from Session 18, no references anywhere in src).
- **CloseButton flexing** — refactored to use `cn` (twMerge) for className merging so consumers can override `text-white-X`, padding, hover behavior cleanly. Original used raw string concat which left both default + override in the className string and let CSS-emit order pick the winner (unreliable).
- **4 close-button migrations** —
  - `BuyCreditsSheet` StepHeader (exact-match swap)
  - `CreditSidebar` header (exact-match swap)
  - `LowCreditsBanner` (16px svg + muted color override)
  - `DormancyBanner` mobile (`p-xxxs`, `text-white-40`, transparent hover) and desktop (`p-xxs`)
- **CloseButton added to style guide** (`UIUtilitiesSection`) with 3 variants: default 20px, compact 16px, banner muted. Closes a Gate 5 violation that slipped past Session 19's audit.
- **Memory** — saved `project_wsup_design_only.md`: WSUP is design-only handoff; AuthContext + LoginSheet stubs are intentional; mock data is intentional; don't propose backend wiring.

**Misidentifications corrected:**
- Session 19's "6 close-button copies" list named `BuyCreditsResultStep` and `DormantCharacterCard.rejected-badge`. Both render the same X-shape SVG path but as **failure status indicator** and **rejected-state badge icon** respectively, not dismiss actions. Left them inline. Real count: 4 dismiss buttons across 5 callsites (DormancyBanner has mobile + desktop).

**Gate audit at session close:**
- Gate 1 (Tokens): No new raw values introduced. Override classNames passed to CloseButton all use tokens (text-white-40, p-xxxs, etc).
- Gate 2 (Reuse): The session was the reuse work — 4 migrations onto existing CloseButton.
- Gate 3 (Componentize@2): CloseButton primitive exists since S19; this session widened its consumer count from 4 → 8.
- Gate 4 (Patternize@2): N/A — no pattern work.
- Gate 5 (Style guide): **Caught a S19 gap** — CloseButton was extracted but never documented. Now in `UIUtilitiesSection` with 3 variants. Going forward: every primitive lands in style guide in the same edit, not as a follow-up.
- Gate 6 (VDA): decisions.md (4 entries), taste.md (3 principle groups: primitives that flex, same-shape-different-intent, style guide is a contract), session-logs.md (this entry), knowledge-base.md (CloseButton API + override pattern).
- Gate 7 (Consistency): Migrations are visual no-ops (override classes preserve each callsite's previous look). No regressions.
- Gate 8 (UX review): Reviewed all 5 migrated render sites for visual parity; identical to inline versions.

**Learned:**
- Migrating to a primitive isn't a grep job. Same SVG path can mean dismiss-action, status-indicator, or state-badge. Verify intent at each callsite before swapping.
- A primitive that takes className without `cn`/twMerge is fragile — overrides "work" only by happy accident of CSS source order. Add `cn` from day one.
- A style guide gap is a primitive-existence gap. If CloseButton wasn't in the style guide for 3 days, the next consumer would have rebuilt the inline version (not knowing it existed). Style guide entry IS the announcement.
- "Design-only project" context matters for what optimizations to propose. Don't suggest real OAuth, real payment processing, real session persistence — those aren't part of the deliverable.

---

## Session 19 — 2026-04-24 (ChatBar active state + LoginSheet pattern + auth gating)
**Scope:** Multiple new patterns + 3 new primitives + cross-flow auth gating. All 8 gates.

**What shipped:**
- **ChatBar active/focused state** — input focus expands the single-row composer into a two-row layout: row 1 sparkle + input | mic + gift; row 2 bulb-circle + "Claude 4.5 Opus" model pill | image. Click-outside collapses. Stays expanded while input has value to avoid mid-compose flicker.
- **ChatBar typing state** — once `value.length > 0`, mic hidden, image swapped for send-icon (new `/icons/icon-send.svg`, Figma asset). Gift stays.
- **AuthContext** (`src/lib/AuthContext.tsx`) — minimal `{ isLoggedIn, login, logout, setIsLoggedIn }`. Wrapped at `app/layout.tsx`.
- **EmailField primitive** — pill input (`bg-white-10 rounded-popup px-m py-icon-btn`) with inline arrow submit. Not a FormInput variant (that's a labeled form field) — distinct UX.
- **GoogleSignIn primitive** — white pill with the official Google G glyph + label prop (defaults to "Login with Google").
- **LoginSheet pattern** — responsive auth gate. Desktop: 720×420 modal, 40/60 split, form left (dark `bg-footer-bg` with subtle `bg-surface-premium` overlay, `border-white-20`), character image right (top-aligned, radial dark gradient in top-right for close-icon contrast). Mobile: bottom-sheet with image + radial fade above, form below. Logo is the colored W mark (`/wsup-logo.svg`, fetched from Figma). Copy is prop-driven.
- **LoginSheet gating** — BuyCreditsSheet's four progression CTAs (one-time buy, Continue on Patreon, Continue to pay in app, Open wsup app) all gated through one `gateAction` helper. Copy unified: "Sign in to continue." / "So we know which account to credit." Header profile icon (logged-out) opens LoginSheet with: "Sign in to access your profile." / "So we can save your characters, chats and credits."
- **Header avatar** — logged-in shows `/profile-picture.jpg` linked to `/profile`; logged-out is a button that opens LoginSheet.
- **Explore R-key toggle** — mirrors Chat's R/Shift+R pattern for a Logged-in/Not-logged-in dev switcher.
- **Split of BuyCreditsSheet** — extracted `BuyCreditsScanSteps` (ScanQRStep + FinishInAppStep) to stay under the 300-line cap after gating code was added.
- **CloseButton shared primitive** — replaced inline X buttons in BottomSheet, CenterPopup, ConfirmSheet, and LoginSheet. Reduced a 4-way duplication; 6+ banner/sidebar close-buttons remain as future cleanup.
- **DevStateToggle shared primitive** (+ `DevStateOption`) — replaced the three per-page floating dev toggles (Chat character state, Explore auth, Profile data mode). One panel shape, one option style.

**Corrections received:**
- "Send icon should be exactly like this" → replaced stand-in paper-plane SVG with the Figma-authored path (15×15 viewbox in a 20×20 container via `translate(2.5 2.5)`).
- "Profile icon on not logged in shouldn't navigate" → split the Header avatar into Link (logged-in) / button (logged-out → opens LoginSheet) branches.
- "Image top right needs slightly darker gradient for close-icon visibility" → added a radial gradient overlay in the image panel's top-right; dropped the `backdrop-blur-bg bg-black-30` on the button itself.
- "Login popup needs stroke and darker bg without blur" → `border-white-10 → border-white-20`; form panel `bg-profile-sheet-bg bg-surface-premium → bg-footer-bg` (temporarily).
- "Include the subtle gradient from the reference" → re-added `bg-surface-premium` over `bg-footer-bg` — gives the soft colored hints on the darker base.
- "Decrease the login popup size" → 848×461 → 720×420.
- "Remove Your Privacy Choices, make Terms and Privacy Policy subtle" → footer collapsed to a single `<p>`; Terms/Privacy demoted from `text-white`/`text-white-90` to `text-white-40`.
- "Content should spread evenly" → form panel restructured into 3 flex children (logo / copy+inputs group / footer) with `justify-between`, matching Figma Auto Layout distribute.
- "Only the logo is required" and "the real logo, not the app-icon" → replaced LogoMark asset twice: `/app-icon.png` → `/logo.png` (wordmark) → `/wsup-logo.svg` (the colored W mark alone, fetched from Figma).
- "Copy should reflect the purchase intent" → collapsed per-step BuyCredits gate copy ("Sign in to buy credits" / "Sign in to subscribe" / "Almost there" / "Finish checkout") into one message: "Sign in to continue." / "So we know which account to credit."

**Gate audit at session close:**
- Gate 1 (Tokens): EmailField raw `rounded-[24px]`, `py-[10px]`, `gap-[10px]` → tokenized to `rounded-popup`, `py-icon-btn`, `gap-icon-btn`. LoginSheet `text-[24px]` → `text-2xl`. `-top-[20px]` (logo float) kept as accepted structural one-off.
- Gate 2 (Reuse): FormInput considered for EmailField; rejected — different UX (labeled form vs pill+submit). BottomSheet/CenterPopup considered for LoginSheet; rejected — desktop 2-col layout is too structurally different.
- Gate 3 (Componentize@2): CloseButton (4-way in modal family) and DevStateToggle (3-way in dev panels) both extracted.
- Gate 4 (Patternize@2): LoginSheet registered as a new Patterns entry.
- Gate 5 (Style guide): AuthPrimitivesSection (Components) + LoginSheetSection (Patterns) + ChatBar typing state preview all added. Nav arrays updated.
- Gate 6 (VDA): decisions.md (9+ entries this session), knowledge-base.md (LoginSheet pattern, ChatBar active-state, purchase copy rule), taste.md (4 principles: composer controls appear on focus; row 2 is the generation context row; login gate explains *why*; character imagery anchors auth surfaces).
- Gate 7 (Consistency): R-key dev toggle pattern matched Chat; CloseButton visual matched existing modal close styles; purchase-flow copy unified across gates.
- Gate 8 (UX review): Terms/Privacy at `text-white-40` — slight emphasis over surrounding `text-white-20`, still in legal-fine-print territory; verified readable.

**Learned:**
- When a pattern's ≥3 uses are quietly copy-pasted across pages (dev toggles), the right time to extract is when the 3rd use arrives — any later and the drift starts to pile up.
- Login-gate copy is intent-scoped, not action-scoped. All four BuyCredits progressions share one intent ("credit me"), so one message covers them. Splintering produced 4 restatements of the same idea.
- Desktop form panels with `justify-between` + 3 flex children approximate Figma's Auto Layout "distribute" cleanly — easier than computing exact margins.
- The user's "no blur" was about removing soft glowy gradients, not removing all color. Re-adding `bg-surface-premium` over a darker base satisfied both "subtle gradient" and "darker bg" in one move.

---

## Session 18 — 2026-04-23 (Patreon Monthly Subscription Flow + Tabs Primitive)
**Scope:** New pattern (Patreon subscription) + shared primitive extraction. All 8 gates apply.

**What shipped:**
- Monthly subscription mode on BuyCreditsSheet. Packages → Result (Patreon handles auth + payment off-site, skipping the WSUP-hosted Payment + Scan steps). One-time flow unchanged.
- `+10% bonus credits` for monthly packs, shown as strikethrough `~~1000~~ 1100`. Rate recalculates. Tab chip teases "+10% credits" as the discovery signal.
- `PackModeToggle` (One-time / Monthly underline tabs) and `BuyCreditsPackagesStep` extracted from BuyCreditsSheet.
- `<Checkbox variant="success">` replaces a bespoke radio on pack selection — reuses the payment-method pattern already in the product.
- "Manage subscription" link on subscription success, placed with the center confirmation pill (not below the primary CTA).
- `ExternalLinkIcon` extracted from Footer + FooterMobile (was duplicated) → shared primitive. Now used by Footer, FooterMobile, CreditHero ("Manage subscription" next to "Transaction History"), and BuyCreditsResultStep.
- `Tabs` + `Tab` compound primitive extracted. ProfileTabBar and PackModeToggle both compose it. Content-width underline, flush on the baseline.
- `bg-surface-premium` Tailwind token — the three-layer radial gradient used on BuyCreditsSheet. Style guide Overlays section now documents default vs premium surface treatments.
- `Badge` gains `size="sm"` variant for dense contexts (tab chip).
- Billing frequency disclosure: "Billed monthly · Cancel anytime" under the Patreon CTA.

**Corrections received:**
- "Radio not visible on Stack of Credits" (bright gradient washed out the border) → changed to `bg-black-40 border-white-40` for contrast against any bg.
- "Calculation seems wrong" → the +10% was labeled but not applied. Now actually recomputes credits and rate.
- "Save 10% badge and +10% BONUS — what do you think UX-wise?" → recognized copy mismatch (save = price off, bonus = more credits). Dropped per-row badges, renamed tab chip "+10% credits" for accuracy.
- "3 nested pill shapes — is that good UX?" → tried removing the outer container (broke tab grouping), reverted, then matched ProfileTabBar's underline-only pattern.
- "We use tabs on profile — can't we make the toggle like tabs?" → matched the visual style but didn't extract a shared primitive. Later: "Why are these different? I thought we used the same component?" → extracted `<Tabs>` + `<Tab>` compound component.
- "Highlighter should be on the baseline, strikethrough after the value, and use the same checkbox from payment method" → three fixes applied together.
- "The receipt line / manage link should come alongside the center content" → moved manage link out of the CTA group and into the confirmation group.

**Quality-gate violations caught during final audit:**
- Gate 1 / 8.3: `text-[10px]` in Badge sm (fixed → `text-xxs`); `text-xxs` rate line and billing note (fixed → `text-xs` per the "12px min subcopy" taste rule). **Same gap as Session 17** — Figma-parity drifting against codified taste rules. Count +1 under that active gap.
- Gate 4: `ProfileTabBar` + `PackModeToggle` both implemented the underline tabs pattern separately. Resolved mid-session by extracting `Tabs` primitive.

**Genuine learnings (routed to the right files, not just decisions.md):**
- `taste.md` — two new principles: "Strikethrough after the value, not before" and "Manage/meta links on success belong with the confirmation group, not the CTA."
- `knowledge-base.md` — `Tabs` primitive promoted to confirmed default (2 consumers). `ExternalLinkIcon` confirmed (4 consumers).
- `reasonings.md` — WHY behind the Patreon flow branching: mirrors the real trust boundary (off-site auth + payment).
- `project-insights.md` — Patreon subscription flow and premium surface style added to the credit architecture.
- `evolution.md` — active gap "Tabs pattern duplication" resolved; Figma-parity gap count bumped; no new gap categories.

**Corrections distribution:** ~8 design corrections, all taste/UX level (none architectural). Iteration-heavy but moved into pattern work (Tabs extraction) mid-session.

**Routing:**
- decisions.md — 12 entries (design choices with reasoning, no code facts)
- taste.md — 2 new principles
- knowledge-base.md — Tabs + ExternalLinkIcon promoted to confirmed defaults
- reasonings.md — Patreon flow rationale
- project-insights.md — Patreon flow added to credit architecture
- evolution.md — 1 gap resolved, 1 gap count bumped

---

## Session 17 — 2026-04-22 (Polish Pass — Mobile Regressions, Architecture Lift, Checkbox Extraction)
**Scope:** Iteration phase — no new patterns, just refinements and one architectural cleanup. Lean workflow active.

**What shipped:**
- Fixed three mobile regressions: CreditSidebar capped at 365px (→ full-width mobile), BottomSheet gradient seam at drag handle (→ added `surfaceClassName`/`surfaceStyle` props so consumers can push custom bg through the entire surface), BottomNav rendering above sheets (root cause: Header's `fixed z-50` trapped nested CreditSidebar's z-60 in a sub-stacking context — moved CreditSidebar + BuyCreditsSheet to Fragment-sibling of `<header>`)
- Lifted BuyCreditsSheet out of CreditSidebar to Header. Two CustomEvents now: `wsup:open-credit-sidebar` opens the balance hub, `wsup:open-buy-credits` opens the purchase flow directly. LowCreditsBanner's "Add credits" now skips the sidebar detour
- Extracted `Checkbox` component (Gate 3 at 2 usages: payment-method indicator + T&C toggle). `variant: 'primary' | 'success'`. Tick SVG refined — thinner stroke (1.75), 14×14 in 16×16 box
- FinishInAppStep redesigned — 96px app icon centered vertically, buttons pinned to bottom via `mt-auto` (designer feedback: too much empty space with horizontal card)
- PaymentStep payment-method row: swapped `/logo.png` (invisible wordmark on white bg) → `/app-icon.png`
- LowCreditsBanner: mobile text stacks vertically instead of wrapping mid-phrase
- Close icon on LowCreditsBanner standardized: 16px + `strokeLinejoin="round"` per the codified close-icon rule

**Genuine learnings:**
- The "Fragment-sibling escape" pattern extended — three layers of nesting (Header → CreditSidebar → BuyCreditsSheet) all defeated by a simple BottomNav z-50. Added to `knowledge-base.md`: *never render a modal/sheet as a child of any positioned + z-indexed element.*
- Two-CustomEvent pattern scales — `wsup:open-credit-sidebar` and `wsup:open-buy-credits` show the pattern handles multiple cross-component triggers cleanly. Still single-owner (Header), still zero prop-drilling.
- Wordmark (`/logo.png`) vs app-icon (`/app-icon.png`) is a semantic fit question, not just asset availability — wrong asset on the wrong surface = invisible.

**Corrections received:** ~10, all polish iterations (none were pattern regressions). Trend: session became iteration-heavy rather than pattern-establishing. Healthy direction.

**Routing:**
- decisions.md — 4 entries (Checkbox extraction, BuyCreditsSheet event lift, Header Fragment, /app-icon.png vs /logo.png)
- knowledge-base.md — stacking-context rule expanded
- No taste.md / reasonings.md entries (no new principles, existing ones cover this)
- No project-insights.md (flow is documented)
- No evolution.md (no maturity-marker change)

---

## Session 16 — 2026-04-22 (BuyCreditsSheet — Result Step: Success + Failure)
**Scope:** Component edit — added a terminal result step to an established flow. Gates 1, 2, 5, 7, 8.

Designer pointed out that after the user pays in the wsup app and returns to web, they need to know whether the top-up succeeded. Added a `result` step with two variants (`success` | `failure`). Success = green check, "Credits added", `+X credits · Y total` pill, "Back to chat →" CTA, receipt note. Failure = red X, "Payment failed", explanatory text, "Try again" CTA restarts at packages, "Contact support" link.

Style guide gets a Success/Failure toggle above the Step 4 preview so reviewers can flip between states. FinishInAppStep "Open wsup app" button now advances to `result` (success by default) for demo; in production, the result variant would be set by a payment webhook/callback.

Also swapped `/logo.png` → `/app-icon.png` in FinishInAppStep (designer added the proper app icon asset).

**Routing (lean default):** decisions.md + session-logs.md only. No new taste/reasonings/knowledge-base entries — the patterns here (status-tinted icons, terminal state, step extension) all follow existing principles.

---

## Session 15 — 2026-04-22 (BuyCreditsSheet — Viewport-Split Terminal Step)
**Screen:** BuyCreditsSheet step 3 bifurcates — QR on desktop, deep-link on mobile
**Mode:** Designer-led UX critique + wireframe for mobile variant

**Context:** Designer spotted the core UX flaw in step 3: a QR code on a mobile device asks the user to scan themselves. The QR's job is to bridge desktop→phone — useless when the user is already on the phone. Designer provided a mobile wireframe: "Finish in the app" with a direct deep-link button + app-store fallback.

**The design decision (routed to taste.md):**
New principle: *"Right device, right action — viewport-aware flow endings."* Input steps (pick a pack, confirm payment) are device-agnostic because they're selections. Action steps (complete the task) often need to be device-specific because the *available affordances* differ. QR = desktop's bridge to phone. Deep-link = mobile's direct action. Same flow, same shell, terminal step branches.

**Built:**
- `BuyCreditsSheet.tsx` — renamed existing ScanStep → ScanQRStep; added new FinishInAppStep (wsup app card, "Open wsup app →" primary button, "Don't have it? Get the app" secondary); FlowBody gains `scanVariant: 'qr' | 'app'` prop; BottomSheet passes "app", CenterPopup passes "qr"
- Style guide `BuyCreditsSheetShowcase.tsx` — now shows both step 3 variants side-by-side (Desktop QR + Mobile deep-link) with a note on why they differ

**Rejected wireframe detail:** The wireframe showed a purple-pink gradient on the "Open wsup app" button. Chose Button primary (solid accent) instead — same reasoning as Sessions 12-13. Brand gradient is already used for the featured pack in step 1; adding another gradient here would compete for attention. Logged in decisions.md.

**Routing (per check #9):**
- taste.md — new principle "Right device, right action"
- decisions.md — 3 entries: the viewport split, prop-based vs split-FlowBody, button-style consistency
- project-insights.md — step 3 doc updated to reflect viewport branch
- reasonings.md — NOT updated; taste principle carries the why
- knowledge-base.md — NOT updated; viewport-specific-step pattern has one consumer
- session-logs.md — this entry, design-focused
- evolution.md — NOT updated

**Corrections:** 0 yet. One from previous session surfaced retrospectively: the QR step was shipping universally without considering mobile affordance. Designer caught it after seeing the flow live. Logged in evolution.md active gaps as something to watch: *"viewport affordance check — does this screen's action make sense on the target device?"*

---

## Session 14 — 2026-04-22 (Low Credits Reminder on Explore)
**Screen:** Explore page gets a new dismissible banner when credits are running low
**Mode:** Wireframe-directed (no pixel Figma), designer asked me to translate to WSUP theme

**Context:** Designer provided a rough wireframe showing a "10 credits left · about 3 replies" strip with "Add credits" CTA at top of explore page. The wireframe used red tint + gradient purple button. The design question: what's the WSUP-native version of this?

**The design decision (routed to taste.md):**
A warning that informs, not alarms. Subtle `status-alert/[0.10]` bg + `/[0.30]` border + pulsing red dot communicates "your state matters" without screaming. The "Add credits" button uses Button primary (accent purple), NOT the wireframe's gradient — because the *action* is neutral (buy more), while the *state* is urgent. Conflating the two with a gradient button muddies the tone. Also: banner tone doesn't escalate at lower credits (2 vs 10 look identical) — parent decides visibility, banner looks the same. Inconsistent styling at thresholds adds noise.

**Built:**
- `src/components/shared/LowCreditsBanner.tsx` — props: credits, estimatedReplies, onAddCredits. Default action dispatches `wsup:open-credit-sidebar` CustomEvent. Dismissible per-session.
- `Header.tsx` — gains useEffect listener for `wsup:open-credit-sidebar`; decouples banner from sidebar state management without prop-drilling or context
- Explore page: banner rendered above CategoryTabs with credits=10, estimatedReplies=3 for demo
- Style guide: new `LowCreditsBannerSection` under Patterns tab, 2 threshold previews + behavior docs

**Routing (per VDA-HEALTH-CHECK #9):**
- taste.md — new principle "Warnings are informative, not alarming"
- decisions.md — 3 entries: button-style choice (primary not gradient), CustomEvent for cross-component action, context copy principle
- project-insights.md — credit flow documentation extended with the banner
- knowledge-base.md — NOT updated (first consumer of the CustomEvent cross-cutting pattern; needs a 2nd before it's a confirmed default)
- reasonings.md — NOT updated (taste principle carries the why)
- evolution.md — NOT updated

**Corrections:** 0 so far.

---

## Session 13 — 2026-04-22 (Buy Credits Flow — Payment + QR Steps)
**Screen:** BuyCreditsSheet evolves from single-screen package picker to 3-step flow
**Mode:** Figma-directed feature build; gates + routing check both primed before starting

**Context:** Session 12 built the package selector. Designer asked: what happens when someone clicks Buy? Two new Figma specs — a payment-method review screen, then a QR-to-download-app screen. The design question wasn't "how do I build three modals" — it was "how does this feel like one task."

**The design decision (routed to reasonings.md + taste.md):**
Three screens sharing an identical shell, each a stage in one purchase task. The designer's Figma made this explicit — same rounded-popup, same gradient bg, same sheet proportions on every step. Building as separate sheets would have been a code-clean but UX-broken solution: every dismiss + re-open cycle fragments the user's sense of momentum. Users think "I'm buying credits," not "I clicked through three modals." Resolved: one `BuyCreditsSheet` with internal `step` state (`packages` | `payment` | `scan`), back navigation via `setStep`, close resets state. See taste.md "Multi-step flows stay in one surface" and reasonings.md "On Multi-Step Flows Inside One Sheet."

**Built:**
- `CreditsSummaryPill` — shared pill showing credit icon + amount + price, used on steps 2 and 3
- `BuyCreditsSheet` refactored — 3 step renderers (PackagesStep, PaymentStep, ScanStep), shared StepHeader with back arrow, gradient bg once in parent
- Style guide: OverlaysSection shows all 3 steps as stacked preview boxes with the shared shell pattern explained
- QR placeholder downloaded from Figma to `/public/qr-placeholder.png` (3.9KB, real QR pattern)

**Routing report (per VDA-HEALTH-CHECK Routing Check):**
- decisions.md — 3 entries: single-sheet-vs-3-sheets choice, CreditsSummaryPill extraction (Gate 3 at 2), Button-component threshold (carried from previous session, not duplicated)
- taste.md — new principle "Multi-step flows stay in one surface"
- reasonings.md — new "On Multi-Step Flows Inside One Sheet" section with the full WHY
- project-insights.md — Buy flow architecture section expanded to document all 3 steps
- knowledge-base.md — NOT updated (one consumer of "sheet with step state" so far; promote to confirmed-pattern only at 2+ consumers)
- evolution.md — NOT updated this session (no maturity marker change; routing discipline now holding)
- workflow.md — NOT updated

No implementation-detail bloat in decisions.md this time. The check from Session 12 is working.

**Corrections:** 1 from designer — header back-arrow was jumping between steps because each step's natural content height differed. Fixed with `min-h-[497px]` on the content wrapper (matches Figma) + `flex-1` on step bodies + `mt-auto` to push ScanStep's Back/Cancel to the bottom. The fix is now captured as a taste.md principle: "Multi-step flows keep fixed height across steps — the sheet doesn't shrink, empty space is better than a moving control."
**Screen:** CreditSidebar → Buy Credits button opens package-selection sheet
**Mode:** Figma-directed new feature — first session where gates ran BEFORE coding, not after

**Context:** Buy Credits widget from Session 11 wasn't wired to anything. Designer asked for the package popup (Figma node 28594:43349). The interesting design question: how do you show 4 pricing tiers such that one is clearly the recommendation?

**The design decision (captured in taste.md + reasonings.md):**
The Figma spec answers this beautifully — the "Stack of Credits" pack gets unique visual treatment on BOTH dimensions: a golden gradient Buy button (not just a different color — a full gradient that feels premium) AND a pink/blue radial background glow on the row itself. The other three packs are clean, readable, tokenized — not demoted, just not primary. Users scan for the recommendation visually, before reading labels. A "BEST VALUE" badge would be a developer's shortcut — a label you write when you couldn't figure out how to show it visually.

**Built:** CreditPackRow (reusable row with `featured` prop), BuyCreditsSheet (orchestrator using BottomSheet + CenterPopup). Added style guide showcase. Wired up from CreditSidebar.

**What this session taught VDA (routed to the right files):**
- taste.md — "Selection lists show the recommendation" principle (featured option gets unique button AND background, not a badge)
- reasonings.md — "On Recommending One Option in a List" (why both treatments are needed) + "On Responsive Overlays" (why 3 consumers now confirms the pattern)
- knowledge-base.md — Responsive overlay pattern promoted from "pattern" to "CONFIRMED DEFAULT" with 3 consumers
- project-insights.md — WSUP credit flow documented: 4-tier INR pricing, Stack featured, buy flow opens above CreditSidebar
- decisions.md — 3 entries (extraction, featured treatment, Button-component threshold)
- evolution.md — "Runs quality gates autonomously" upgraded from Not yet → Partial. New gap logged: Knowledge-file routing (user had to ask why everything was going to decisions.md)

**Gate discipline — first time passing all 8 proactively:**
All 8 gates read before the build, checked during. The user's Session 11 "did you pass the gates?" question became the meta-learning: gates must be a starting ritual, not a finishing one.

**Corrections received this session:** 1 — designer asked "are we routing data to the right knowledge files?" The answer was no. Fixed mid-session by pruning decisions.md, distributing content to taste/reasonings/knowledge-base/project-insights/evolution, and adding a Routing Check to VDA-HEALTH-CHECK so this gap doesn't recur.

---

## Session 11 — 2026-04-22 (Credit Sidebar — Buy Credits Widget Refinement)
**Screen:** CreditSidebar drawer (right panel on Explore page)
**Mode:** Figma-directed refinement against spec

**Context:** User flagged the Buy Credits promo inside the credit sidebar as visually wrong. Pulled Figma spec (node 28585:42889). Real difference was the bag illustration — flat `credit-bag.png` was rendering as two brown "horn" shapes; Figma spec has a detailed 3D money sack with coins spilling out + a smaller coin jar beside it. User exported the bags group from Figma as `credit-bags.png` (471×303).

**Changed:**
- `CreditSidebar.tsx` — replaced `/credit-bag.png` with `/credit-bags.png`; reposition to `-right-[18px] -top-[8px] w-[170px] h-auto`; added `min-h-[104px]` to card to prevent button being hidden during hydration; swapped Next.js `<Image>` for plain `<img>` (intrinsic-size quirks); refactored inline `<button>` → `Button` component with `size="s"` + `w-[180px] h-[40px]` className override; fixed `font-semibold` → `font-medium` (was contradicting the established button-weight rule)
- `WidgetsSection.tsx` — added "Buy Credits Promo" showcase with anatomy + preview
- `decisions.md` — 5 new entries (bag illustration, min-h, plain img rationale, Button refactor, style guide sync)

**Key learnings:**
- Figma-shipped screens can drift from Figma over time — the button weight contradiction (font-semibold vs font-medium) was already in the codebase, caught only when gate-auditing
- Next.js `<Image>` + `h-auto` on a card with `overflow-hidden` can hide siblings during hydration — plain `<img>` is safer for decorative overlays
- `min-height` as a safety net on cards that rely on bag-overflow layouts prevents button-hiding regressions

**Gates violated on this edit (retroactively closed):**
- Gate 2 (reuse) — inline `<button>` refactored to `Button` component
- Gate 5 (style guide sync) — Buy Credits added to WidgetsSection
- Gate 6 (VDA learns) — decisions.md + session log written (this entry)
- Gate 7 (UX consistency) — `font-semibold` → `font-medium` to match decisions.md rule
- Gate 8 (UX review) — missed the button-hidden issue up front; user had to flag it

**Process failure:** Shipped the first pass without running gates. User had to ask "did you pass quality gates?" — answer was no. All 8 gates now retroactively closed on this edit. Lesson reinforced: read QUALITY-GATES.md before every WSUP task, not after.

**Corrections:** 3 (wrong bag image → fixed; button hidden → fixed via min-h + plain img; user flagged "container too slim" → fixed)

---

## Session 10 — 2026-04-17 (Character Lifecycle PRD Copy Alignment)
**Screen:** Profile dashboard, Chat page, Style guide
**Mode:** PRD-directed copy/tone alignment + component extraction

**Context:** PM delivered Character Lifecycle Management PRD (Ashish Pathak, 2026-03-31). PRD established a core copy principle: descriptive not prescriptive. No threats, no demands, no "failure" framing. Revival presented as available, not required.

**Changed (10 files):**
- DormancyBanner — all 3 variants rewritten to neutral copy; moderation banner neutralized (no yellow/warning styling); added isCreator prop with Revive link
- MyCharactersDashboard — threatening banner → neutral; warning triangle → info icon; added page header subtitle; added empty states per tab
- DormantCharacterCard — daysUntilRemoval countdown removed, replaced with "Last chatted X days ago"; removed card: text link not button; all tooltips softened
- CharacterStatesSheet — removed all countdown/threat language from "What happens next" boxes
- ReviveConfirmSheet — full rewrite with character thumbnail, state badge, balance display, insufficient credits state, CreditFeeAccordion
- Chat page — removed input copy updated; added creator toggle (C key)
- mockData — reasons shortened to human-readable labels per PRD

**Extracted (2 new shared components):**
- `src/components/ui/CreditFeeAccordion.tsx` — duplicate accordion in dashboard + revive sheet
- `src/components/ui/EmptyState.tsx` — inline component moved to shared ui/

**Style guide synced:**
- DormancyBannerSection — added creator variant examples (inactivity, moderation, removed with isCreator)
- LifecycleSection — added EmptyState and CreditFeeAccordion showcases
- Removed footer copy updated

**Key learnings:**
- PRD copy principle is a design constraint — tone affects every string across every component
- Moderation details are private to creators — chat users see only neutral "not listed" messaging
- Countdown language creates pressure — "Last chatted X days ago" is factual without urgency
- 2 usages of identical accordion = extract immediately (confirmed existing rule)

**Corrections:** 0 (PRD-driven, no designer corrections)

---

## Session 9 — 2026-04-10 (Profile UX Refinements + Component Extraction)
**Screen:** Profile — character cards, tooltips, confirmation dialogs, character states sheet
**Mode:** Designer-directed corrections and UX audit

**Built:**
- ReviveConfirmSheet — confirmation popup before navigating to edit character (explains credit cost + edit/resubmit flow)
- ConfirmSheet reusable UI component (`src/components/ui/ConfirmSheet.tsx`) — extracted from Logout + Revive patterns
- Blog link in CharacterStatesSheet — card-style tappable link with book icon + external arrow
- Badge tooltip UX improvements — accent color bar, reason/guidance hierarchy, dismiss hint, wider width
- Specific policy block messages in badge tooltips (from backend charCreateUpdateBlockMessages)

**Corrections (6 total):**
1. Underlined "Support" text removed from removed cards — redundant with Support button CTA
2. "Contact Support" removed from 3-dot menus (popover + bottom sheet) — same redundancy
3. Mobile logout buttons were raw `<button>` while desktop used `<Button>` component — standardized to Button
4. Blog link: Medium logo icon → book/article icon (Medium logo was confusing)
5. Blog link text needed underline + whiter text for clickability
6. "Once approved" → "Once submitted" in revive confirmation copy
7. ConfirmSheet desktop buttons size="s" → size="m" for consistency with mobile

**Component extractions:**
- ConfirmSheet: title (string), description (ReactNode), confirmLabel, cancelLabel, destructive flag, open/onClose/onConfirm
- LogoutConfirmSheet and ReviveConfirmSheet both refactored to thin wrappers around ConfirmSheet

**Key learnings:**
- Redundant entry points: count existing paths before adding new ones (Support had 3 → reduced to 1)
- Confirmation dialogs = informed consent, not friction
- Badge tooltips need visual anchoring (accent color bar) to their trigger
- Reason text leads, guidance follows — answer "why?" before "what to do"
- Dismiss affordance ("Tap to dismiss") needed for tooltips without close icons
- Blog/external links: card-style > plain text for discoverability
- Button consistency: if one viewport uses the component, all viewports must

**Files changed:**
- Created: `src/components/ui/ConfirmSheet.tsx`, `src/components/profile/ReviveConfirmSheet.tsx`
- Modified: `RemovedCharacterCard.tsx`, `DormantCharacterCard.tsx`, `CharacterMenuSheet.tsx`, `LogoutConfirmSheet.tsx`, `CharacterStatesSheet.tsx`, `BadgeTooltip.tsx`, `mockData.ts`
- VDA: decisions.md, reasonings.md, session-logs.md

---

## Session 8 — 2026-04-02 (Chat Dormancy Mobile + Needs Attention Refinements)
**Screen:** Chat screen mobile view, Profile needs attention section
**Mode:** Designer-directed with UX review methodology demonstration

**Built:**
- Chat dormancy banner: mobile version changed from edge-to-edge bar → centered floating pill (translucent, backdrop-blur, rounded-pill)
- Dormant card 3-dot menu with state-specific options: inactive = Share + Delete, moderation = Delete only
- DormantMenuPopoverItems (desktop) + DormantCharacterMenuSheet (mobile bottom sheet)
- "Why does this cost credits?" accordion in Needs Attention section (above cards)
- Dormant cards resized to 2-col on mobile (matching active cards) to fix text wrapping on <360px

**Corrections (5 total):**
- Option B (slim strip) was edge-to-edge → changed to centered pill
- Pill text `text-[11px]` → `text-xxs` then → `text-xs` (too small)
- Pill icons `w-[14px]` → `w-s` then → `w-m` (too small)
- Close icon strokeWidth 2.5 → 2, `rounded-full` → `rounded-pill`, `p-[2px]` → `p-xxxs`
- ProfileCharacterCard 3-dot missing `e.preventDefault()` — click navigated to /chat AND opened popover

**Learned:**
- Edge-to-edge is not always right on mobile — context matters (immersive bg = pill, not bar)
- Visual weight must match info priority (informational ≠ alert treatment)
- Designer's full UX review methodology: See → Critique → Explore → Decide → Audit → Polish → Verify
- This loop was codified in workflow.md as the Autonomous UX Review Loop — VDA must run it on every build
- FAQ/explanatory content placement: above the cards (reading order), not below (requires scrolling past content)
- Token audit must be proactive, not reactive — check before presenting

**Built (continued — edit character page):**
- Edit Character page (`/edit-character`) — form page with Header + Sidebar + centered form + fixed bottom action bar
- FormInput component — reusable text input with label, helper text, form tokens
- FormTextarea component — textarea with label, AI generate link, char counter, form tokens
- SelectionPillGroup component — radio-style exclusive selection pills with active state (blue border + checkmark)
- Bottom action bar with warning text + "Next" CTA, stacked on mobile, horizontal on desktop
- Connected Edit action from profile card 3-dot menu → `/edit-character`
- Fixed popover click propagation through parent Link wrappers

**Corrections (continued):**
- Desktop header didn't have bottom border → added (profile has tabs providing the border, edit-character needs it directly)
- Form wasn't centered horizontally → added `mx-auto`
- Bottom bar wasn't fixed on mobile → restructured to flex column layout
- Mobile header used SubpageHeader (text-lg, too large) → matched profile header pattern (text-base font-semibold, same arrow)

**Built (continued — lifecycle states):**
- Expanded character lifecycle to 6 states: Inactive, Under Review, Policy Review, Rejected, Removed + Approved (on Active cards)
- Merged removed chars into single NEEDS_ATTENTION_CHARACTERS array with stateType
- Removed section moved to bottom of page as separate visual group
- Approved characters moved to Active section with dismissible tap-to-dismiss badge (no close icon)
- Rejected badge changed from orange → red for distinction from Policy Review
- Contact Support button on removed cards uses Secondary/Outlined pattern
- Character States explainer sheet updated with all 7 lifecycle states
- "Have questions?" section made actionable with help center and support links
- Removed filter pill restored for direct access to terminal state cards

**Corrections (continued):**
- Rejected and Removed badges were both red — confused users. Separated via card treatment (grayscale) and section placement
- Approved cards in Needs Attention made no sense — moved to Active with temporary badge
- Close icon inside small badge was cramped — changed to tap-to-dismiss whole badge
- Contact Support button was custom inline styling — switched to style guide pattern
- "Have questions?" was dead-end text — added actionable links

**Built (continued — components + refinements):**
- BadgeTooltip component (`src/components/ui/BadgeTooltip.tsx`) — contextual info tooltip for state badges, separate from Popover
- Button component (`src/components/ui/Button.tsx`) — 3 variants (primary/secondary/dark) × 4 sizes (xs/s/m/l), forwardRef, fullWidth, disabled
- Replaced inline buttons in 4 files with Button component (edit-character, DormantCharacterCard, explore, LogoutConfirmSheet)
- Fixed Tailwind class order bug: leading-none must come after text-sm in both Button and CreditButton size classes
- Badge tooltips on all needs-attention card states replace full Character States sheet popup

**Corrections (continued):**
- Contact Support button was XS (too slim) → changed to S for card CTAs
- "Contact Support" text wrapped at 5-col card width → shortened to "Support"
- CreditButton font-semibold vs Button font-medium mismatch → both font-medium now
- Designer rule: same size = same weight regardless of variant. All buttons use font-medium
- Approved badge close icon was cramped → replaced with tap-to-dismiss whole badge

**Key learnings captured:**
- Badge tooltip vs Popover: same dismiss logic but different UX purpose — don't merge
- Tailwind text-sm overrides leading-none silently if class order is wrong
- 2 usages is enough to extract a component (designer's threshold)
- Font weight belongs to size, not variant — designer explicitly prefers font-medium for all buttons
- Label length must fit narrowest card width — test at 5-col desktop
- Screenshot-driven review: designer zooms into specific elements, spots contextual issues code review misses

**Files updated:** workflow.md, reasonings.md, decisions.md (31 total new entries), taste.md (button weight + default filter), session-logs.md

---

## Session 7 continued — 2026-04-01 (Lifecycle Refinements + New Components)
**Screen:** Character management views, chat dormancy, email templates
**Mode:** Designer-directed corrections on session 7 builds

**Built:**
- FilterPills component (`src/components/ui/FilterPills.tsx`) — merged summary bar + filter tabs into single row with counts
- CreditButton component (`src/components/ui/CreditButton.tsx`) — primary/secondary variants, 4 sizes, uses /credit.png
- CharacterStatesSheet — mobile BottomSheet + desktop CenterPopup, shared content via StatesContent
- Overlay usage guide added to style guide
- Compact card grid (3-col mobile / 5-col desktop, 4:5 aspect) for dormant/attention cards
- Email template brand alignment (colored dots, simplified Revive links)

**Corrections (18 total):**
1. Close icons: consistent pattern everywhere, size adapts (14px compact, 20px sheets)
2. Two pill rows → merged into one FilterPills row with counts
3. Reuse CategoryTabs pattern for FilterPills, don't invent new styles
4. Violation reasons removed from card surfaces (shaming)
5. Horizontal list cards → compact grid (3-col/5-col, 4:5 aspect)
6. Needs Attention cards visually smaller than Active cards
7. Primary buttons not repeated in grids — use secondary
8. Same-row metadata must be same font size
9. Info banner icon removed (section header already has one)
10. Banner elements vertically centered (items-center)
11. Popups/sheets hide scrollbars (scroll-hide)
12. Demo toggle keyboard-activated (R key), not floating
13. Default filter = "Needs Attention" when dormant chars exist
14. Dormancy banners need stronger bg on mobile (backdrop-blur + bg-black-50)
15. Center content desktop padding md:px-4xl (64px)
16. Email templates use brand assets (logo, char images, accent colors)
17. Email stat icons: colored dots not emojis
18. Email Revive links: "Revive →" only, no repeated credit cost

**Token audit:**
- Zero new tokens — all arbitrary values mapped to existing tokens
- text-[10px] → text-xxs, text-[13px] → text-xs, text-[15px] → text-sm
- gap-[6px] → gap-xxs, gap-[4px] → gap-xxs, h-[1px] → h-px

**Learned:**
- Redundancy detection: two rows doing the same job = always merge
- Visual weight as hierarchy: card size > badge > label for signaling importance
- Information sensitivity: don't surface punitive details on card surfaces
- Default states should be actionable, not comfortable
- Emails are brand extensions, not separate products
- Primary buttons are singular per screen, never repeated in grids

**Files updated:** taste.md, knowledge-base.md, decisions.md, reasonings.md, project-insights.md, session-logs.md, evolution.md

---

## Session 7 — 2026-04-01 (Character Lifecycle Screens)
**Screen:** Chat page lifecycle states (dormancy, moderation, revival)
**Mode:** PRD + HTML wireframes reference
**Built:**
- DormancyBanner component — dismissible info banner with three severity variants (inactivity gray, moderation yellow, removed red)
- Horizontal list cards for dormant/removed character management views (new card pattern: 80x100 image left + body right)
- State badges — gray inactive, yellow moderation, red removed pills
- Demo state toggle — floating control panel for reviewers to switch between lifecycle states
- Email templates — standalone inline-CSS components in `src/components/email/`
- Extracted mock data to `src/lib/mockData.ts` when page.tsx approached 300 lines
- Style guide updates — Lifecycle (components tab) and Dormancy Banner (patterns tab)

**Key design decision:**
- Designer corrected the build plan when new lifecycle tokens were proposed. All wireframe surface colors mapped to existing tokens: `bg-white-05`, `bg-white-10`, `bg-white-20` for containers; `bg-status-warning/[0.08]`, `bg-status-error/[0.08]` for banner tints. Zero new color tokens created.

**Corrections:**
- Token reuse over token creation — firm, immediate correction when new tokens were proposed
- Surface container colors must use white opacity tokens, not new named tokens

**Learned:**
- Token reuse is a core principle: only create when genuinely missing, always try existing token + opacity modifier first
- Horizontal list card is the pattern for status/management views
- Dismissible banners use per-session state (no persistence needed for dev handoff)
- Email templates are a separate world — inline CSS, no design system dependency
- Mock data extraction keeps pages slim

**Files updated:** taste.md, knowledge-base.md, decisions.md, reasonings.md, project-insights.md, session-logs.md, evolution.md

---

## Session 6 — 2026-03-27/28 (Profile Desktop Build — Major Session)
**Screen:** Profile (desktop + mobile fixes)
**Mode:** Designer-directed build with live corrections
**Duration:** Long session, 20+ corrections, 2 critical bugs found and fixed

### What was built
- Profile desktop layout: center area (56px header + tabs + content) + right sidebar (reused mobile components)
- CenterPopup component for desktop modals
- Popover component for desktop 3-dot menus (light + dark variants)
- MenuItem shared component (sheet + popover modes)
- SocialView sidebar mode for right sidebar embedding
- MyCardsView desktop popup mode
- LogoutConfirmSheet desktop confirmation dialog (separate from mobile)
- useVerticalScrollbar and useHorizontalScrollbar hooks
- Tokenized scrollbar CSS classes (scroll-hide, scroll-thumb-vertical, scroll-track-horizontal, scroll-thumb-horizontal)
- New spacing tokens: 2xxxl (48px), 3xxxl (56px), 4xl (64px), 5xl (72px), 6xl (80px)
- Header profile icon linked to /profile
- Popover variant system (light for dark bg, dark for images)
- MenuPopoverItems + CharacterMenuPopoverItems for desktop popovers

### Design corrections (20+)
- Stories images: must be square (1:1) everywhere, not 4:3 or 16:9
- Characters grid: spacing pushed wider 5 times (gap-s → gap-xl, padding → 64px)
- 64px (4xl token) is the standard center area padding for layout type 2 screens
- Center area header must NOT have bottom border when tabs sit directly below
- Scrollbar: must use custom JS scrollbar (recent chats style), never native — tokenize for reuse
- Center header icons must use exact same SVGs, styles, tokens as chat header — "whyyyyyyyyyy?" was the response to different styles
- No hardcoded rgba in SVGs — always currentColor with text-* token on parent
- Right sidebar must reuse actual mobile components — not rebuild them. "why is the badges different? why is the persona widget different? whyyyyyyyyyy?"
- 3-dot menu hidden in sidebar since it's already in center header — no duplicate entry points
- Center and right sidebar must scroll independently
- Desktop badges: show all in 3-col grid, no horizontal scroll, no "see all"
- Popover border radius: rounded-card (12px) not rounded-popup (24px) — tokenize
- Character card popover labels simplified: "Edit character" → "Edit" (context is obvious)
- BottomSheet frosted glass: backdrop-blur-[60px] + semi-transparent bg from Figma
- BottomSheet header: two types (with title + close, without title + just drag handle)
- Close button style should match back button style (p-[10px] rounded-full hover:bg-white-10 text-white-90)
- Desktop 3-dot menu = compact popover anchored to button, NOT centered modal
- Desktop logout = confirmation dialog with Cancel + Log out buttons, NOT bottom sheet
- BottomSheet z-index must be above BottomNav (z-[60] vs z-50)
- Bottom padding on sheets reduced (pb-m not 80px) since BottomSheet now sits above BottomNav

### Critical bugs found and fixed
**Bug 1 — Popover global listener killing BottomSheet (HARDEST BUG)**
- Popover registered `document.addEventListener('mousedown')` when `menuOpen=true`
- On mobile, Popover was CSS-hidden (`hidden md:flex`) but React effects still ran
- The mousedown listener intercepted ALL clicks, calling `onClose()` before BottomSheet button handlers could fire
- Symptoms: clicking any BottomSheet button just closed the sheet, nothing else happened
- Fix: gate listeners with `window.matchMedia('(max-width: 767px)')` — skip on mobile
- Lesson: CSS `hidden` does NOT prevent React effects from running. Invisible components with global listeners are the hardest bugs to find.

**Bug 2 — Wrapping BottomSheet breaks fixed positioning**
- Wrapping BottomSheet in `<div className="md:hidden">` or `<>` fragments broke `position: fixed`
- BottomSheet already has `md:hidden` on its own outer div — adding another wrapper clips it
- Wrapping in fragments for dual-rendering (mobile + desktop) also broke event handling
- Fix: keep BottomSheet as a single div tree. Handle desktop overlays as completely separate components.

**Bug 3 — BottomSheet behind BottomNav**
- Both at z-50, BottomNav rendered later in DOM → sat on top
- Fix: BottomSheet bumped to z-[60]
- This also removed the need for 80px bottom padding on sheet content

### Approaches that FAILED
- BottomSheet dual-rendering (mobile sheet + desktop CenterPopup in fragments) — broke events
- createPortal for BottomSheet — didn't fix the issue
- Wrapping BottomSheet in md:hidden div — broke fixed positioning
- Translucent bg (rgba(255,255,255,0.1)) on sheet — clicks passed through to backdrop
- Multiple rounds of changing onClick handlers — the bug was in the Popover, not the buttons

### What worked
- Completely separate mobile/desktop components (no shared rendering)
- Viewport-gated event listeners (matchMedia before addEventListener)
- Original BottomSheet structure preserved (single div tree, no fragments)
- Solid dark bg (#1a1a1a) — frosted glass was attempted and abandoned (caused click-through bugs)

### Final stretch (end of session)
- Frosted glass abandoned entirely — all overlays use solid `profile-sheet-bg: #1a1a1a`
- BioSheet split: BottomSheet (mobile) + CenterPopup (desktop) for "Read more"
- Token audit completed: arbitrary values replaced across all profile components
- Style guide synced: new Overlays section, spacing/blur/shadow tokens updated
- LogoutConfirmSheet buttons matched to style guide (Primary S + Secondary/Outlined S)
- Buttons widened to px-xl for better proportions — designer approved
- center-content-pad CSS utility used instead of inline styles for 64px padding

### Files updated
All VDA knowledge files updated: taste.md, knowledge-base.md, decisions.md, reasonings.md, evolution.md, project-insights.md, session-logs.md

---

## Session 5 — 2026-03-26 (Profile Desktop Refinement)
**Screen:** Profile (desktop)
**Mode:** No reference — designed from VDA knowledge alone
**Built:**
- Desktop profile layout: center content (header row, RankBanner, TabBar, ContentGrid 4-col) + right sidebar (ProfileRightSidebar.tsx)
- Right sidebar: avatar, name/badge, bio, 2x2 stats, Edit/Share buttons, persona card, 3-col badges, footer
- All VDA taste rules applied (slim spacing, tokenized, label-xs, Secondary/Outlined buttons, currentColor icons)
**Corrections:** User said "it does need some refinements" — pending next session
**Learned:** First autonomous design without reference. Structure was accepted, refinements needed.

---

## Session 4 — 2026-03-25 (Profile Mobile Build)
**Screen:** Profile (mobile)
**Mode:** Figma screenshot reference
**Built:**
- ProfileHero, ProfileTabBar, ContentGrid, StatsRow, RankBanner
- Bottom sheets: MenuSheet, BioSheet, BadgesSheet, CharacterMenuSheet, LogoutConfirmSheet
- Full-screen panels: SocialView, MyCardsView
- Shared UI: AvatarRing, BottomSheet, SectionAction, SubpageHeader, TrendArrow
**Corrections:**
- RankBanner: py-s → py-xxs ("more slimmer" x3)
- Active Persona: text-secondary → label-xs (not a link)
- Font weights: semibold → normal for status labels
- Badge grid: 4-col → 3-col (labels truncating)
- Follow buttons: fixed 108px width
- Close icons: 12px → 14px on sheets
- Bottom padding: 80px on all sheets to clear BottomNav
- ProfileAppBar removed — standard Header stays
- Show more/less removed — show all cards
**Learned:** 15+ taste corrections captured. Major theme: start slim, status labels are light, consistency across sheets.

---

## Session 3 — 2026-03-24 (Chat Screen + Style Guide Split)
**Screen:** Chat (mobile + desktop)
**Mode:** Figma screenshot reference
**Built:**
- ChatHeader, ChatMessages, ChatRightSidebar, ChatBar
- Coachmark overlay, typing indicator, audio waveform
- Style guide split from 2395-line monolith into 27 section files
**Corrections:**
- AI bubble max-width 290px (not flex-1)
- Messages bottom-aligned with flexbox spacer
- Chat bar scrim: different approach mobile vs desktop
- Coachmark uses chat-ai-active bg, not chat-ai-bubble
**Learned:** Context-specific solutions > universal patterns. Chat has unique rules.

---

## Session 2 — 2026-03-23 (Explore Screen Refinement)
**Screen:** Explore (mobile + desktop)
**Mode:** Figma screenshot reference
**Built:**
- Character cards, category tabs, explore description section
- FAQ accordion, footer, mobile footer
**Corrections:**
- Character card description: 60% → 70% white
- Category tabs: filled → outlined pills
- FAQ font-medium not font-semibold
- Search gradient bumped brighter
- Footer policies: accordion → flat list
**Learned:** Readability corrections are recurring. The designer reads every element.

---

## Session 1 — 2026-03-22 (Project Setup + Core Components)
**Screen:** Shared components
**Mode:** Figma screenshot reference
**Built:**
- Project setup, tailwind.config.ts, globals.css with all tokens
- Sidebar.tsx, Header.tsx, style-guide/page.tsx
**Corrections:**
- Token audit: 67 arbitrary text sizes eliminated, text-xxs created
- Header icon buttons: semantic tokens not generic white-10
- Sidebar widget label: font-medium not font-semibold
- Logo: one image file, not icon + text
**Learned:** Token discipline is non-negotiable from day one.
