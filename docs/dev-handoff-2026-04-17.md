# Dev Handoff — Character Lifecycle PRD + Site-Wide Audit

**Session:** 2026-04-17
**Branch:** `master`
**Commit range:** `a152b29..698c70f` (8 product commits)
**Preview:** dev server at `localhost:3000`, Vercel auto-deploy on master

Based on the Character Lifecycle Dormancy Flow PRD shared earlier in the session. Copy and flow follow the PRD's "descriptive, not prescriptive" principle — no threats, no countdowns.

---

## 1. PRD-Driven Changes

### Copy: descriptive, non-threatening tone
All dormancy-related copy rewritten across the app. No more countdowns, no "your character will be removed in X days."

| Surface | Before | After |
|---|---|---|
| `DormancyBanner` (inactivity) | Countdown + warning tone | "This character isn't currently listed publicly. You can keep chatting." |
| `DormancyBanner` (moderation) | Threat + appeal CTA | Same neutral copy as inactivity |
| `DormancyBanner` (removed) | — | "This character is no longer on the platform. Your chat history is here for you to read." |
| Mobile pill variants | Long text | "Not listed — chat available" / "Removed — read-only" |
| `DormantCharacterCard` | "X days until removal" | "Last chatted Xd ago" |
| `CharacterStatesSheet` | Countdown + threat | Neutral state explanations |
| Chat page (removed input) | Generic disabled copy | PRD-aligned read-only message |
| `mockData.ts` `reasons` | Long internal labels | Short human-readable labels |

### New flows
- **Creator-facing Revive link in banner** — `DormancyBanner` gains `isCreator?: boolean`. When true AND variant is not `removed`, a `Revive` link appears next to the banner text and links to `/edit-character`.
- **ReviveConfirmSheet full redesign** — now renders character info (name + avatar), a single Revival fee row (20 credits), and an insufficient-credits state. Drops countdown language.
- **Creator toggle on Chat page** — `C` key toggles creator perspective. Later renamed to `R` for cross-page consistency (see §5).
- **Zero-characters empty state** (PRD D1.7) — brand-new creators see a single "Create your first character" CTA instead of empty tabs leaking through.

---

## 2. Component API Changes

### `DormancyBanner` — `src/components/chat/DormancyBanner.tsx`
```ts
type BannerVariant = 'inactivity' | 'moderation' | 'removed'

interface DormancyBannerProps {
  variant: BannerVariant
  isCreator?: boolean   // NEW — shows Revive link on non-removed variants
}
```
- `moderation` visually collapsed into the same neutral treatment as `inactivity` (bg-white-05, border-white-10).
- Revive link uses the new `.link` utility class (see §4).

### `DormantCharacterCard` — `src/components/profile/DormantCharacterCard.tsx`
- Layout refactor: character name + chat count now share a single row (`min-w-0` on name, `gap-xs` between name and count).
- "Last chatted Xd ago" is its own row at `text-xs` — fixes 2-col mobile wrapping.
- "Contact support" is now a text link (using `.link`), not a button. Underlined inline — `hover:underline` is invisible on mobile, so the underline is always on.

### `ReviveConfirmSheet` — `src/components/profile/ReviveConfirmSheet.tsx`
- Full redesign. New UI sections: character header, single Revival fee row, fee explanation (via `CreditFeeAccordion`), insufficient-credits branch (swaps Continue for Get Credits).
- `userBalance` prop is still accepted and drives the `hasEnough` branch, but the balance row itself was removed from the UI.

### `CharacterStatesSheet` — `src/components/profile/CharacterStatesSheet.tsx`
- All countdown/threat copy removed. State descriptions only.

---

## 3. New Reusable Components

### `CreditFeeAccordion` — `src/components/ui/CreditFeeAccordion.tsx`
Single source of truth for the "Why does this cost credits?" disclosure. Extracted from two duplicates (dashboard + revive sheet). Self-contained; no props.

### `EmptyState` — `src/components/ui/EmptyState.tsx`
```ts
type EmptyVariant = 'default' | 'no-active' | 'all-good' | 'no-removed' | 'create'

interface EmptyStateProps {
  message: string
  variant?: EmptyVariant   // picks the emoji
  children?: React.ReactNode   // CTA button goes here
}
```
Variants render one emoji each: `😴 no-active`, `✨ all-good`, `🛡️ no-removed`, `🎭 create`, `📭 default`. Any CTA button should be passed via `children` — the component handles spacing internally so you don't double-stack `gap` + `py`.

---

## 4. New Tokens & Utilities

| Name | Value | Where | Replaces |
|---|---|---|---|
| `icon-btn` spacing token | `10px` | `tailwind.config.ts` → use as `p-icon-btn` | 30+ `p-[10px]` usages across 15 files |
| `.link` utility class | `underline text-secondary decoration-white-20` | `src/styles/globals.css` | 4 ad-hoc inline link styles across 3 files |
| `profile-sheet-bg` | existing | documented in style guide | — |
| `black-55` | existing | documented in style guide | — |

### Token audit — 50+ exact-match violations replaced
`gap-[4px]` → `gap-xxs`, `px-[12px]` → `px-s`, etc. Always prefer the named token over an exact value.

### `.link` usage
Use for any inline text link in body copy. Always underlined (mobile has no hover state) with `text-secondary` color and `white-20` decoration. Do not add `hover:underline` — it's already underlined.

---

## 5. Dev-Only Keyboard Shortcuts

Consistent across Chat and Profile pages:

| Key | Action |
|---|---|
| `R` | Toggle creator/viewer perspective on Chat page; toggle data panel on Profile page |
| `Shift+R` | Cycle data modes on Profile: Full → Active Only → Dormant Only → Removed Only → Zero Characters |

Previously `C` (chat) and `D` (profile). Unified to `R` for consistency — update any bookmarks/docs.

---

## 6. Style Guide Updates

`/style-guide` is the living reference. Synced with every change this session:

- **New sections:** Profile Cards, Profile Overlays, UI Utilities
- **Updated sections:** DormancyBanner (creator variants), Lifecycle (ReviveConfirmSheet demos, EmptyState variants, CreditFeeAccordion)
- **Token sections:** `icon-btn` in `SpacingSection`, `.link` in `UtilitiesSection`

When you add or touch a token/component/utility, update `/style-guide` in the same PR.

---

## 7. Files Changed

**43 files** (excluding design-agent / VDA tooling). Lines: +910 / −231.

High-traffic files to be aware of:
- `src/app/chat/page.tsx`
- `src/app/profile/page.tsx`
- `src/components/chat/DormancyBanner.tsx`
- `src/components/profile/DormantCharacterCard.tsx`
- `src/components/profile/ReviveConfirmSheet.tsx`
- `src/components/profile/CharacterStatesSheet.tsx`
- `src/components/profile/MyCharactersDashboard.tsx`
- `src/lib/mockData.ts`
- `src/styles/globals.css`
- `tailwind.config.ts`

Full list via `git diff --stat a152b29^..698c70f`.

---

## 8. Commits (product, in order)

| SHA | Title |
|---|---|
| `a152b29` | Character lifecycle PRD alignment + site-wide token/style guide audit |
| `683ebd0` | Refine dormant card layout — name+count row, contact support link, last chatted spacing |
| `d22da60` | Extract `.link` utility class — one consistent inline link style |
| `64097fd` | Add zero-characters empty state + data mode toggler on profile page |
| `0e88406` | Fix zero-characters state, R key consistency |
| `0e74057` | Contextual empty state illustrations — replace generic icons |
| `97c6f91` | `EmptyState`: emoji instead of SVG illustrations |
| `1b9517d` | Fix empty state spacing — button inside `EmptyState` via children slot |

---

## 9. How to Verify Locally

```bash
cd WSUP
npm install   # if deps changed
npm run dev
```

Then:
1. `/chat` — cycle variants, press `R` to toggle creator view, confirm Revive link appears on non-removed banners.
2. `/profile` — press `R` to open data panel, `Shift+R` to cycle data modes and inspect all empty states (including Zero Characters).
3. `/style-guide` — spot-check Profile Cards, Profile Overlays, UI Utilities sections render cleanly.
4. Mobile viewport (≤ `md`) — confirm banner pill wraps correctly, dormant cards don't wrap the chat count, contact support link is underlined.

---

## 10. Open Items / Not Included

- Backend wiring for Revive flow (frontend is UI-only against `mockData`).
- Real credit balance API — currently hardcoded in `mockData.ts`.
- No migration needed; this release is UI + component-level only.
