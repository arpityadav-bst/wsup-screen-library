# Visual Designer Memory
Last updated: 2026-03-24 (token audit pass — undocumented tokens, CSS utilities, and badge patterns reconciled against tailwind.config.ts + globals.css)

## Global Rules (apply to all screens)

[global] category-tab active state: filled colored background → outlined pill with full white border (`border border-white`) + white text. Inactive tabs use `border border-white-20`.

[global] logo: use a single `<Image src="/logo.png">` — the file at `public/logo.png` is the full wordmark (colored W icon + "wsup.ai" text baked in). Never use a separate icon + text span. Source asset: `N:\Antigravity Main\assets\chars\logo.png`. Width 104px height 24px in header, 130×30 in footer. Logo wrapper needs `pl-xs` (8px) so the "W" icon left-aligns with the sidebar nav icons (sidebar uses s+s=24px from left, header px-m=16px, so +8px corrects it).

[global] footer background: always use `bg-footer-bg` token (resolves to `#111111`) — noticeably darker than the main page bg `#171717`. Without it the footer blends into the page. Never hardcode `bg-[#111111]`.

[global] section headings (What is wsup.ai, FAQ): use `text-3xl font-semibold`, NOT `text-2xl` and NOT `font-bold`. The headings are visually large and prominent but slightly lighter than bold.

[global] character card name: use `text-lg font-bold` — `text-base` reads too small relative to the card height.

[global] FAQ card background: `bg-[#252525]` not `bg-[#222222]` — needs to be slightly lighter than page bg to be visible.

[global] footer copyright year: always current year (2026). Update whenever year rolls over.

[global] FAQ accordion: items must be numbered (e.g. "1. What is..."), use `bg-[#222222]` card background (not border-based), `rounded-xl`, `px-l py-m` padding. Max-width ~860px centered.

[global] sidebar: `w-[365px]`, `fixed top-[60px] left-0 bottom-0`, `bg-page-bg border-r border-white-10`. Three zones stacked: CTA card → nav → recent chats (flex-1, scrollable) → footer.

[global] sidebar nav items: `flex items-center gap-2 px-6 py-4 text-[12px] font-normal`. Active = `text-text-title` + gradient background (`linear-gradient(90deg, rgba(114,233,241,0.1), rgba(113,146,229,0.1), rgba(98,87,215,0.1)), linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1))`). Inactive = `text-white-70 hover:bg-white-05`. Active state MUST use `usePathname()` — never hardcode `active: true` in data.

[global] sidebar nav icons: all inline SVG, 20px rendered (`width="20" height="20"`), viewBox from Figma. Active fill/stroke = `white`. Inactive = `rgba(255,255,255,0.8)`. Icons that use stroke (CreateChar) pass `stroke` prop; icons that use fill pass `fill` prop. Never use a single flat color for all — respect each icon's Figma rendering mode.

[global] sidebar thin divider between nav items and Recent Chats section: `border-t border-white-10`.

[global] sidebar CTA card (Generate Images): `h-[52px] bg-white-05 border border-white-10 rounded-lg px-3 overflow-hidden`. Use `<Link>` not `<div>` — must be keyboard-focusable. Layout: icon (16px) + label (`text-sm font-semibold text-text-title z-10`) + absolute character image + absolute arrow pinned right. Character image: plain `<img>` (NOT Next.js `<Image>` — optimizer sharpens small PNGs), `absolute top-1/2 -translate-y-1/2 h-[65px] w-auto`, left position hard-coded to clear the label. Arrow: inline SVG with same orange gradient as the icon (#FFCA85 → #FFAF75 → #FF7A38).

[global] recent chats section header: `label-xs` class for "RECENT CHATS" label. "GROUP CHAT" button: `text-secondary text-[10px] font-semibold tracking-[0.2px]`.

[global] recent chat item: `flex items-center gap-3 px-6 py-4 hover:bg-white-05`. Avatar `w-9 h-9 rounded-full ring-1 ring-white-20`. Name: `text-white-70 text-sm font-medium`. Message preview: `text-white-40 text-[12px] truncate`. Time: `· {time}` as `text-white-40 shrink-0 whitespace-nowrap` — time is ALWAYS fully visible, preview truncates. Item divider: `absolute bottom-0 left-6 right-6 border-t border-white-10` (inset, not full-width).

[global] recent chat hover close button: `absolute top-3 right-4`, `opacity-0 group-hover:opacity-100 focus-visible:opacity-100`, `p-1 rounded-full hover:bg-white-20`. SVG 10×10, stroke `rgba(255,255,255,0.5)`. Must have `aria-label="Remove chat"`.

[global] group chat in recent chats: participant count badge at `-bottom-2 -right-2` of avatar. Container: `bg-secondary-surface rounded-full w-[24px] h-[24px]`, `box-shadow: 0 0 0 2px var(--page-bg)` (cutout trick — not a CSS border; MUST use CSS var not hardcoded hex or the ring disappears when bg-page-bg recompiles). Text: `text-[11px] font-medium text-white-60`. Message preview shows sender name prefix in `text-white-70` before the preview text.

[global] recent chats custom scrollbar: JS-driven. Native scrollbar hidden with `[scrollbar-width:none] [&::-webkit-scrollbar]:hidden`. 2px thumb `absolute right-0`, `bg-[rgba(255,255,255,0.2)]`, fades in on scroll, hides after 800ms idle. Height and top calculated from `scrollTop/scrollHeight * clientHeight`.

[global] typography utility class `label-xs`: defined in `globals.css` — `@apply text-[10px] font-medium text-text-small tracking-[0.5px] uppercase`. Use for all small uppercase section labels across the app (sidebar headers, empty states, metadata captions, etc.).

[global] font rendering: Rubik loaded via `next/font/google` (NOT CSS `@import`). `html` element gets `{ -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility }` in globals.css base layer. This is critical for polished rendering in Edge/Chrome.

[global] SPICY toggle: stacked vertically (`flex-col items-center gap-[2px]`), text ABOVE toggle. Text: `text-[10px] tracking-widest`. Track: `w-[36px] h-[14px] bg-transparent border rounded-full`. Knob: `w-[8px] h-[8px]` at top-[2px]. OFF: text+border+knob = `white-70`, knob at left-[2px]. ON: text = `text-status-alert`, track = `bg-status-alert border-status-alert` (filled red), knob = `bg-white` (white) at right. OFF: track = `bg-transparent border-white-50`, knob = `bg-white-50` at left. NOTE: `status-alert` not `alert` — nested under `status` in tailwind config., knob slides to right `left-[calc(100%-10px)]`. Smooth transition on all.

[global] notification bell: solid filled bell SVG (`fill="var(--color-accent-light)"` — use CSS var, NOT hardcoded hex `fill="#988efc"`), inside `w-8 h-8 border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg transition-colors` circle button. NOT an outline stroke icon. Size: width/height 18px (not 16px).

[global] header icon buttons (bell, trophy, profile, blogs CTA): all share identical border + hover tokens — `border border-header-icon-border` + `hover:bg-header-icon-hover-bg`. Tokens defined in tailwind.config.ts under `header: { 'icon-border': '#ffffff1a', 'icon-hover-bg': '#ffffff0d' }`. Never use `white-10`/`white-05` directly for these — always use the semantic tokens.

[global] trophy icon: `w-8 h-8 border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg`. Image size 25×25px (not 22).

[global] profile icon: SVG-based silhouette. `w-8 h-8 border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg`. SVG is 32×32, overflow hidden, border-radius 50%. Background circle fill must be `transparent` — NOT a dark hex color, or it creates a visible bg mismatch against the page. Head circle: cx=16 cy=12 r=5.5 `fill="var(--avatar-fill)"` (CSS var, NOT hardcoded `#7B72E8`). Body: ellipse cx=16 cy=30 rx=11.5 ry=8 fill="rgba(255,255,255,0.1)". Do NOT add a stroke circle inside the SVG — the button's CSS border handles the outline. Double borders cause a bleeding/bleed effect.

[global] credits widget: two-layer composition. Layer 1 — pill: `rounded-full h-[28px]` with dark brown bg, gradient border via backgroundImage trick. ALL colors must use CSS vars: `var(--credit-bg)`, `var(--credit-gold)`, `var(--credit-orange)` — NOT hardcoded hex. paddingLeft 26px, paddingRight 12px. Number text: `text-white font-bold text-sm tabular-nums whitespace-nowrap` with `lineHeight: '28px'` (matches pill height exactly — most reliable vertical centering, avoids font metric issues with flex). Layer 2 — icon: `<Image>` absolutely positioned over left of pill, width/height 28px, `translateY(-50%) translateX(-20%)`. Source: `public/credit.png` (copied from `assets/Credit.png`). The icon overlaps/overflows the pill's left edge.

[global] header right-side dividers: `w-px h-5 bg-white-10` vertical dividers between Blogs | SPICY | icons group.

[global] character card — full anatomy: `relative rounded-card overflow-hidden cursor-pointer group aspect-[9/16] w-full ring-1 ring-white-10 hover:ring-accent transition-all duration-300 shadow-normal`. Portrait 9:16 ratio always. Ring border changes from white-10 to accent on hover.

[global] character card — scrim gradient: `bg-gradient-to-t from-black via-black-60 via-[38%] to-transparent to-[62%]`. Concentrates darkness in bottom 38% where text lives, clears above 62%. Never use `via-black/60` (opacity modifier) — always use the `black-60` token.

[global] character card — hover accent tint: `bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`. Sits above scrim, below content.

[global] character card — name row: `flex items-center gap-[6px] mb-xxs min-w-0`. Name: `text-text-title font-semibold text-sm leading-tight truncate min-w-0` — NO `shrink-0`, NO `flex-1`, NO `max-w-[60%]`. With `min-w-0` and default flex-shrink the name yields space naturally when "· View Profile" appears on hover, then truncates with ellipsis. `flex-1` breaks this by always pushing siblings to the far right. `shrink-0` breaks it by making the name rigid and causing overflow. The `·` separator and "View Profile" button must be `hidden md:block` — on mobile they are never visible (no hover) but if left as `opacity-0` they still consume flex width and cause the name to truncate too early.

[global] character card — view profile: dot separator `text-white-30 text-xs shrink-0`, button `text-secondary text-xs font-medium shrink-0 whitespace-nowrap`. Both `opacity-0 group-hover:opacity-100 transition-opacity duration-200`. Appear on hover, sit naturally beside the name.

[global] character card — description: `text-text-body text-xs leading-snug mb-[6px] line-clamp-2`. Use `text-text-body` (70% white) NOT `text-text-small` (60%) — 60% is too subtle for readable body copy on a card. `leading-snug` (1.375) keeps lines tight and fitting within the card.

[global] character card — tags: `text-[10px] font-normal px-xs py-[3px] rounded-pill bg-white-10 backdrop-blur-bg text-white-80 border border-white-10`. Font-weight is `font-normal` (not medium/semibold). Up to 5 tags in data. On desktop all 5 show. On mobile tags at index ≥ 3 get `hidden md:inline-block` — max 3 visible. 5 tags wrapping on a ~160px-wide mobile card creates 2–3 rows of tags which is too cramped. There is no "unfiltered" variant — deprecated and removed everywhere.

[global] character card — stats row: `flex items-center justify-between`. Stats div: `flex items-center gap-xs md:gap-m text-text-xsmall text-[11px] min-w-0 shrink overflow-hidden`. Each stat: `shrink-0`. Value text: `text-text-subtitle font-semibold`. Label text: `text-text-xsmall`. Always show both rank and chats. Format with `formatRank()` and `formatCount()` — raw numbers stored in data, formatted at render. Gap is `gap-xs` on mobile and `gap-m` on desktop — `gap-m` (16px) is too wide for narrow mobile cards and clips the "chats" label.

[global] character card — chat CTA: `hidden md:flex bg-accent hover:bg-accent-hover px-m py-xs rounded-pill text-sm font-semibold text-white leading-none shrink-0`. Desktop only (`hidden md:flex`) — no hover state on mobile touch, and the invisible button steals width from the stats row. Slides up on hover: `opacity-0 translate-y-[6px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200`. Arrow SVG: 18px, `opacity-50 -translate-y-[1px]` for subtle vertical centering. Gap between "Chat" text and arrow: `gap-xxs`.

[global] formatCount/formatRank utilities: always store numbers raw in data (e.g. `chats: 2400000`, `rank: '#1'`). Format at render time via `formatCount(n)` (2.4M, 999.9K) and `formatRank(rank)` (#24.9K for large ranks). Never store pre-formatted strings.

[global] all buttons are `rounded-pill` — never `rounded-full` (Tailwind built-in) or `rounded-button` or rectangular. `rounded-full` and `rounded-pill` look identical but `rounded-pill` is the token. Widget/cards use `rounded-card`, not buttons.

[global] button variant — Header Pill CTA vs Secondary/Outlined: these look similar but are intentionally different. Header Pill: `border-header-icon-border` (10% white) + `hover:bg-header-icon-hover-bg` + `h-[34px]` fixed height + `text-white-50` — recedes in the header bar. Secondary/Outlined: `border-white-20` (20% white) + `hover:bg-white-05` + `py-s px-xl` padding height + `text-text-body` — more visual weight for standalone CTAs. Do NOT merge or swap tokens between them.

[global] sidebar Generate Images widget: `rounded-card` — it is a widget/card, NOT a button. Label: `font-medium text-white-70` (same dim tone as inactive nav items). NOT `font-semibold`, NOT `text-text-title`.

[global] token hygiene — forbidden hardcodes: `bg-[#171717]` → `bg-page-bg`. `ring-[#171717]` or `box-shadow: ... #171717` → use `var(--page-bg)` (CSS var, not Tailwind token — needed for inline styles and SVG stops). `text-[#ffc32a]` → `text-status-warning`. `fill="#ffc32a"` in SVGs inside colored buttons → `fill="currentColor"`. `text-[#82a1ff]` → `text-secondary`. `bg-[#252535]` → `bg-secondary-surface`. SVG stop colors and inline style hex values → CSS variables from `:root` in globals.css. These are the most common violations — always check after building a new screen.

[global] token consolidation — removed aliases (do NOT use these tokens, they were deleted): `button-link` → `secondary`. `button-link-hover` → `secondary-hover`. `button-light-accent` → `accent-light`. `button-dark` → `accent-dark`. `button-dark-hover` → `accent-dark-hover`. `forms-active-border` → `secondary`. `gray-*` tokens are fully removed (were duplicate of `page-bg` and `chat-*`). If you see any of these in a component, replace immediately.

[global] text color scale — when to use what: `text-text-title` (100%) for names/headings. `text-text-subtitle` (80%) for data values (stats, active states). `text-text-body` (70%) for body copy and descriptions. `text-text-small` (60%) for secondary labels only — NOT for description copy (too subtle to read comfortably). `text-text-xsmall` (50%) for metadata like stat labels. `text-text-xxsmall` (30%) for legal/copyright.

[global] style guide — StateLabel + PreviewBox helpers: all component previews in the style guide must be wrapped in `<PreviewBox>` (dashed border, neutral bg, separates preview from metadata). State descriptions use `<StateLabel>` (accent left bar + dim uppercase text). Never show preview and metadata at the same visual weight — the distinction must be immediately clear.

[global] style guide — previews must match real components exactly: wrong SVG icon, wrong icon size (16px vs 18px), wrong token (`border-white-10` vs `border-header-icon-border`), wrong text size (`text-xs` vs `text-sm`) — all of these are bugs in the style guide. Before finishing a style guide section, read the real component source and verify every class value.

[global] CSS variables in globals.css `:root`: some values cannot be consumed as Tailwind tokens (inline `style={}` props, SVG `stopColor`, JS-computed styles). These use CSS vars defined in `:root`: `--page-bg`, `--credit-bg/gold/orange`, `--avatar-fill`, `--secondary-surface`, `--color-gradient-purple/blue/warm-light/mid/dark`, `--color-accent-light`. SVG `<stop>` elements must use `style={{ stopColor: 'var(--x)' }}` (JSX prop), NOT `stopColor="var(--x)"` attribute string — React does not translate attribute strings to CSS vars.

[global] search keyword gradient: use token values `gradient.purple` (#9d76ff) → `gradient.blue` (#1ec8e8) — defined in tailwind.config.ts. Never hardcode gradient hex. Values were bumped brighter from original (#7b4cff → #0ea4c5) because the original was too subtle against the dark input background.

[global] header search bar: w-[384px], absolutely positioned with `absolute left-1/2 -translate-x-1/2` for true center (not flex center between logo and actions). Right actions need `relative z-10` so they render above the absolute search bar.

[global] token groups — full reference (use these, never guess hex):
- `nav.*`: `nav-bg` (transparent), `nav-border` (#ffffff0d), `nav-hover-bg` (#ffffff1a), `nav-active-bg` (#ffffff1a), `nav-icon` (#ffffffcc), `nav-active-icon` (#ffffff), `nav-active-title` (#ffffff). Use for sidebar and bottom nav states.
- `popup.*`: `popup-bg` (#ffffff1a), `popup-close-icon` (#ffffffcc), `popup-border` (transparent), `popup-divider` (#ffffff1a). Use for modal overlays and dialogs.
- `forms.*`: `forms-bg` (#ffffff0d), `forms-border` (#ffffff1a), `forms-text` (#ffffff80), `forms-focus-border` (#82a1ff), `forms-error-border` (#de5a48), `forms-active-bg` (#222132), `forms-disabled-bg` (#888888). Use for all input fields, selects, textareas.
- `tabs.*`: `tabs-bg` (transparent), `tabs-hover-bg` (#ffffff33), `tabs-active-bg` (#ffffff4d), `tabs-active-bar` (#82a1ff), `tabs-border` (#ffffff0d). Note: the CategoryTabs component uses `secondary` border for active state — check Figma per screen, `tabs-active-bar` is for underline-style tabs.
- `card.*`: `card-bg` (transparent), `card-border` (#ffffff0d), `card-hover-bg` (#ffffff1a), `card-hover-border` (#4a3ec6). Use for generic card hover patterns outside of character cards.
- `page.*`: `page-bg` (#171717), `page-footer` (#000000cc), `page-divider` (#ffffff1a), `page-icon` (#ffffff), `page-overlay` (#000000b2). Use `page-divider` for section separators; `page-overlay` for full-screen dimmer overlays.
- `brand.*`: `brand-yellow` (#ffc163), `brand-purple` (#ab37f0), `brand-blue` (#0a92ff). Marketing accent colors — not for UI chrome.
- `text.dim` (#ffffff66): between `text-text-xsmall` (50%) and `text-text-small` (60%) — use for de-emphasized metadata that needs to exist but not compete. `text.label` (#ffffffb2): alias for `text-text-body` — use either, they resolve identically.
- `accent.ultra-light` (#e7ebff): very pale lavender, for large tinted backgrounds or empty-state illustrations.
- `secondary.ultra-dark` (#222132): deep navy, used as `forms-active-bg` — background of an active/focused input field.

[global] shadow scale — full set: `shadow-small` (0 1px 4px rgba(0,0,0,0.3)), `shadow-normal` (0 4px 12px rgba(0,0,0,0.4)), `shadow-big` (0 8px 32px rgba(0,0,0,0.6)), `shadow-button` (0 2px 8px rgba(74,62,198,0.4)), `shadow-dark` (0 4px 16px rgba(0,0,0,0.8)). Default elevation for cards = `shadow-normal`. Floating panels/dropdowns = `shadow-big`. Accent CTA buttons = `shadow-button`. `shadow-dark` for heavy-depth surfaces.

[global] border-radius full set: `rounded-pill` (9999px) for buttons/tags, `rounded-card` (12px) for cards/widgets, `rounded-button` (8px) for rectangular UI elements (inputs, dropdowns), `rounded-popup` (24px) for modals, drawers, and bottom sheets.

[global] custom breakpoints: `mobile` = 414px, `desktop` = 1440px. These are in addition to Tailwind defaults (`sm`=640, `md`=768, `lg`=1024, `xl`=1280, `2xl`=1536). Most responsive logic in WSUP uses `md:` (768px) as the mobile↔desktop threshold. `mobile:` and `desktop:` are available but used sparingly for precise viewport targeting.

[global] backdrop-blur scale: `backdrop-blur-bg` (12px) for standard glass elements (tags, pills), `backdrop-blur-heavy` (120px) for heavy frosted-glass surfaces. Never use arbitrary values like `backdrop-blur-[12px]` — use the named tokens.

[global] CSS utility classes (globals.css): `.placeholder-icon` — `bg-white-10 border border-white-10 rounded` — for icon/image placeholders during loading or when asset is absent. `.char-overlay` — `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)` — shorthand gradient overlay for character images where the full card scrim isn't needed. `.glass` — `bg-white-10 backdrop-blur-bg border border-white-10` — standard glassmorphism surface. `.token-highlight` — pulse animation for style guide token click interaction (do not repurpose outside style guide).

[global] notification badge (header bell): `absolute -top-1 -right-1 w-4 h-4 bg-status-alert rounded-full text-[11px] font-bold text-white flex items-center justify-center ring-2 ring-page-bg`. Uses Tailwind `ring-2 ring-page-bg` for the cutout ring — NOT the CSS `box-shadow` trick. The group-chat participant count badge uses `box-shadow: 0 0 0 2px var(--page-bg)` (inline CSS) because it is rendered inside a `<div>` where Tailwind ring may conflict with other ring utilities. Use Tailwind `ring` for simple absolute badges, CSS `box-shadow` for badges on top of ring-bearing parent containers.

[global] header background: the actual header uses `bg-page-bg` (solid `#171717`) — NOT the `header-bg` token (`#ffffff00` transparent). The `header-bg` token exists for cases where the header floats over content (e.g. chat screen mobile). Always check whether the header is opaque or transparent per screen design.

## Screen-Specific Rules

### Style Guide

[style-guide] lives at `/style-guide` in the WSUP app. Update it whenever a new token, utility class, or component pattern is added. Sections: Colors → Typography → Spacing → Border Radius → Shadows → Backdrop Blur. Use the `Section`, `Group`, `Swatch`, and `Tag` helper components defined at the bottom of the file.

### Explore

[explore] mobile responsive layout: same `explore/page.tsx` file — default styles = mobile, `md:` prefix = desktop (768px breakpoint). Sidebar is `hidden md:block` wrapper around fixed element. Main gets `md:ml-[365px]` (no margin on mobile). Content padding `px-m md:px-xl`. Character grid `grid-cols-2 md:grid-cols-5`. Desktop footer wrapped `hidden md:block`; mobile footer + bottom nav always rendered (they self-hide at `md:hidden`).

[explore] mobile content order (top → bottom): MobileSearchBar → GenerateImagesCard → Explore label + filter → CategoryTabs → ExploreDescription → character grid → Show more → divider → WhatIsWsup → FAQAccordion → FooterMobile → BottomNav.

[explore] character grid: `grid grid-cols-5 gap-m`. Cards are 9:16 portrait ratio and self-size to column width. Do not set explicit card widths.

[explore] show more CTA: `px-xl py-s border border-white-20 rounded-pill text-text-body text-sm font-medium hover:bg-white-05 transition-colors` centered with `flex justify-center`. This is the Secondary/Outlined button variant. Uses `white-20` border (20% white) — NOT `header-icon-border` (10% white).

[explore] leaderboards button: REMOVED from explore page heading. The leaderboard is accessed via the trophy icon in the header only. Do not add a separate leaderboard CTA to the explore page heading row.

[explore] page section label "EXPLORE": use `label-xs` — NOT a heading. Same style as sidebar "RECENT CHATS". Small uppercase section identifier, not a page title.

[explore] category tabs active state: `border border-secondary text-secondary` (#82a1ff) — NOT `border-white text-white`, NOT `border-forms-active-border` (removed token). Inactive: `border-white-20 text-text-body`. Hover: `hover:bg-white-05 hover:border-white-30`.

[explore] category tabs pill size: SMALL (S size) — `px-m py-xs rounded-pill text-sm font-medium`. Uses `rounded-pill` token (NOT `rounded-full` Tailwind built-in). `py-xs` (8px) + `text-sm` matches the Secondary/Outlined S size button spec.

[explore] category tabs scroll: horizontal drag-to-scroll. Wrapper uses `tabs-scroll` CSS class (defined in globals.css: `overflow-x: auto; scrollbar-width: none` + `::-webkit-scrollbar { display: none }`). Inner row: `flex items-center gap-xs w-max` (w-max is critical — lets inner content expand beyond container). Custom JS scrollbar — absolute 3px div at bottom of wrapper, opacity-0 → opacity-100 on mouseenter, derived from `scrollLeft/scrollWidth * clientWidth`. Pre-allocate scrollbar space with `pb-[11px] -mb-[11px]` on wrapper so it never shifts content down. `hasDragged` ref prevents accidental tab switches when dragging. `cursor-grab` / `cursor-grabbing` state. DO NOT use CSS `::-webkit-scrollbar-thumb` hover tricks — transitions on scrollbar pseudo-elements are unreliable in Chrome. DO NOT use `overflow-x: overlay` — deprecated in Chrome.

[explore] description text (below tabs): SEO blurb with expand/collapse toggle. Collapsed: `line-clamp-1 pr-20` + gradient fade overlay at right edge (`linear-gradient(to right, transparent, #171717 40%)`) + absolutely positioned "Read More" button at the right end of the line. Expanded: full text + inline "Read Less" at end. Button style: `text-text-small text-xs underline underline-offset-2 hover:text-text-body transition-colors`. Uses `useState(false)`. Component: `ExploreDescription.tsx` (`'use client'`). Do NOT use `text-button-link` or `font-medium` for Read More — it must match the paragraph text color (text-small) with just underline as the differentiator.

[explore] what-is-wsup section: title is "About wsup.ai" (NOT "What is wsup.ai?"). h2: `text-3xl font-semibold text-center text-text-title`. Two sub-sections: "Who we are" (paragraph) + "What we provide" (bullet list). Sub-headings: `text-base font-semibold text-text-title` (100% white — NOT text-text-subtitle 80%). Body: `text-base text-text-body`. Feature bullets: bold term `font-semibold text-text-title` + ` – ` + regular desc `text-text-body`, all inline. Max-width `768px` mx-auto. "Read more" CTA: `px-xl py-s border border-white-20 rounded-pill text-text-body text-sm font-medium hover:bg-white-05 transition-colors` with Figma external link icon (node 27719:45729) — two paths: L-bracket `M5.25 3H10.5C10.78 3 11 3.22 11 3.5V8.75` + arrow `M3 11L10.5 3.5`, both `stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round"`.

[explore] FAQ accordion: card bg `bg-white-10` (`rgba(255,255,255,0.1)`) — NOT `bg-[#252525]`. Question text: `text-base font-medium text-text-title` (NOT font-semibold — intentionally lighter weight). Answer text: `text-base text-text-body`. Button row has `hover:bg-white-10 transition-colors` (adds another white-10 layer on hover = white-20 effective). Max-width `768px` mx-auto (NOT 860px).

[explore] FAQ container: no outer max-width on the section wrapper — the inner content uses max-w-[768px] mx-auto. Do NOT wrap FAQAccordion in a flex justify-center div.

[explore] bottom nav: `fixed bottom-0 left-0 right-0 z-50 md:hidden bg-page-bg border-t border-white-10`. Five items: Stories, Explore, Create, Chats, Profile. Each item: `flex flex-col items-center gap-[6px] py-[12px] flex-1`. Active state = full-column-width gradient applied via `style={{ backgroundImage: activeGradient }}` on the `<Link>` itself — NOT a rounded pill inside the item. Active label: `text-text-title`. Inactive label: `text-white-50`. Active icon fill: `white`. Inactive icon fill: `rgba(255,255,255,0.5)`. `activeGradient = 'linear-gradient(90deg, rgba(114,233,241,0.1) 0%, rgba(113,146,229,0.1) 50%, rgba(98,87,215,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)'` — same gradient pattern as sidebar active state. Bottom safe area: `paddingBottom: 'env(safe-area-inset-bottom, 8px)'`. Active derived from `usePathname()`.

[explore] bottom nav icons — Chat and Profile: use CSS mask technique. `backgroundColor` = icon color state, `maskImage`/`WebkitMaskImage` = URL of asset, `maskSize: 'contain'`, `maskRepeat: 'no-repeat'`, `maskPosition: 'center'`. Icons saved locally at `/public/icons/icon-chat.svg` and `/public/icons/icon-profile.svg` (downloaded from Figma, SVG format). Stories, Explore, Create use inline SVG paths (no mask needed).

[explore] mobile footer (`FooterMobile.tsx`): `md:hidden bg-footer-bg`. Top row: logo (104×24) + social icons (Discord, Instagram, Reddit) — same SVGs as desktop `Footer.tsx`. Social icon color: `text-text-subtitle` (80% white). Accordion rows: `h-[84px] border-t border-white-10 flex items-center justify-between px-m`. Row label: `text-text-subtitle font-semibold text-base`. Two accordion sections: Categories + Policies. Four nav rows: About Us, Download App (ChevronRight), AI Companion, Blog (ExternalLinkIcon). Default open: Policies (`useState<AccordionKey|null>('policies')`). Expanded content: `border-t border-white-10 flex flex-col px-l py-s`. Sub-links: `py-s text-text-xsmall text-base hover:text-text-body`. Copyright padding: `pb-[calc(80px+env(safe-area-inset-bottom,0px))]` — clears BottomNav height + iPhone safe area.

[explore] SVG gradient ID uniqueness (GenerateImagesCard): when the same SVG-with-gradients component renders more than once in the same DOM, all gradient/clipPath `id` attributes must be unique. Use a `uid` prop — all SVG IDs become `${uid}-g0`, `${uid}-g1`, etc. Sidebar instance uses `uid="sidebar"`, mobile uses `uid="mobile"`. Forgetting this causes the second instance's fills to silently reference the first instance's gradient defs, visually breaking the icon.

[explore] footer Follow Us: Discord, Instagram, Reddit — in that order, with actual SVG brand icons (not placeholder boxes).

[explore] footer policies row: starts with "POLICIES" uppercase label, then 8 links: Community, Law Enforcement Request, Cookies, DMCA & IP, NCII, Safety & Crisis, Terms of Use, Privacy Policy.

[explore] footer categories: Recommended, Anime, Romantic, Romantic, AI Games — NOT the full tag list from the character cards.

### Feed
<!-- Learnings specific to the Feed screen -->

### Chat

[chat] layout: `md:ml-[365px] mt-[60px] flex` with `style={{ height: 'calc(100vh - 60px)' }}` on `<main>`. Use `calc()` NOT `h-screen pt-[60px]` — pt causes 60px overflow at bottom. Three columns: flex-1 center (flex-col) | ChatRightSidebar (fixed `w-[365px]`, matches left sidebar width).

[chat] center column: `flex-1 flex flex-col min-w-0 border-r border-white-10 overflow-hidden`. Three zones stacked: ChatHeader (shrink-0 h-[56px]) → ChatMessages (flex-1 overflow-y-auto) → ChatBar (shrink-0).

[chat] message bottom-alignment: messages default to bottom of the viewport. Pattern: `flex flex-col` scroll container with `<div className="flex-1" />` spacer BEFORE the first message. As messages grow, spacer compresses and messages push upward naturally.

[chat] user bubble: `bg-chat-user-bubble px-[12px] py-[10px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl max-w-[360px]`. Always `flex justify-end w-full` to align right. Text: `text-sm text-white leading-normal whitespace-pre-wrap`. Emotion text below message: `text-sm italic text-white-50 leading-snug mt-[2px]`.

[chat] AI bubble container: `flex items-start gap-[4px]` (top-aligned flex row — bubble column left, regenerate right). Bubble+actions wrapper: `flex flex-col max-w-[290px] min-w-[64px]` — NOT `flex-1`. Width constrained to bubble so action row matches bubble width, not window width. Regenerate: `self-stretch flex flex-col items-center justify-center` so it stretches and centers vertically across the full bubble+actions height.

[chat] AI bubble: `bg-chat-ai-bubble px-[12px] pt-[8px] pb-[14px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl`. Emotion: `text-sm italic text-white-50 leading-snug mb-s`. Text: `text-sm text-white leading-normal whitespace-pre-wrap`.

[chat] AI bubble action row: `flex items-center pt-[4px]`. Left group: AudioPlayBtn + ThumbsUp + ThumbsDown in `flex items-center gap-[4px]`. Spacer: `<div className="flex-1" />`. Right group: GenerateImageBtn + DotsVert in `flex items-center gap-[4px]`. All action buttons: `p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 transition-colors`.

[chat] audio play button: `backdrop-blur-[32px] bg-black-70 flex items-center gap-[4px] h-[32px] pl-[8px] pr-[6px] rounded-[24px] shrink-0`. Static waveform bars: array `[3,7,10,8,5,8,10,7,3]` as `w-[1.5px] bg-white-70 rounded-full`. Play circle: `w-4 h-4 bg-white rounded-full` with black triangle path `M1.5 1l3.5 2.5L1.5 6V1Z`.

[chat] generate image (premium) button: gradient-border wrapper pattern — outer `<button className="relative p-[1px] rounded-full" style={{ background: 'var(--icon-gradient-warm)' }}>` then inner `<div className="p-[7px] rounded-full bg-surface-raised">`. The 1px padding on the outer creates a gradient border ring around the solid inner surface. Icon: CSS mask with `backgroundImage: 'var(--icon-gradient-warm)'`. Credit badge: `credit.png` at `absolute -top-[3px] -right-[3px] w-[12px] h-[12px]` — same badge placement pattern as notification badges.

[chat] icon warm gradient: `--icon-gradient-warm` CSS var (`linear-gradient(146.75deg, #f4da5c 14.649%, #e48949 54.497%, #c65720 97.483%)`). Used as `backgroundImage: 'var(--icon-gradient-warm)'` for the call icon mask and generate-image icon mask. Never hardcode the gradient hex values inline.

[chat] new-feature badge dot: `bg-status-alert` with `animate-pulse`. 8px circle at `absolute top-[6px] right-[6px]` inside the `relative` game button. Always visible in dev mode (`useState(true)`, no localStorage). For production: init state from `!localStorage.getItem('wsup_game_seen')` and set key on dismiss.

[chat] coachmark tooltip: `absolute top-full -right-[6px] mt-[6px] w-[220px] backdrop-blur-[40px] bg-chat-ai-active border border-accent rounded-[16px] shadow-[0_12px_32px_rgba(0,0,0,0.5)] z-50`. Has an arrow — `absolute -top-[7px] right-[20px] w-[14px] h-[14px] bg-chat-ai-active border-t border-l border-accent rotate-45` (diamond-cut CSS triangle pointing up). No overflow-hidden on container (arrow must bleed out). Inner padding `px-[14px] pt-[12px] pb-[14px]`. Label row: `label-xs text-white` "New Feature" + 18px X dismiss button (`hover:bg-white-10 rounded-full`). Feature row container: `flex items-center gap-[8px] mb-[6px] bg-white-10 rounded-[10px] px-[8px] py-[6px]`. Icon tile: `w-[32px] h-[32px] rounded-[10px] bg-accent flex items-center justify-center`. Icon: 18px game SVG `fill="white"`. Title: `text-[13px] font-semibold text-text-title`. Description: `text-sm text-white-50`. Uses `characterName` prop dynamically. `'use client'` required for useState dismiss. Uses `bg-chat-ai-active` (not `bg-chat-ai-bubble`) and `border-accent` (not `border-white-10`).

[chat] chat token additions: `chat-premium-border: #f4da5c` (warm yellow border for premium/generate-image button), `chat-badge: #de5a48` (notification dot). Both defined in tailwind.config.ts under `chat.*`. CSS var `--icon-gradient-warm` defined in globals.css `:root`.

[chat] CSS mask icon helper (`maskStyle`): `{ width, height, backgroundColor: 'white', maskImage: url, maskSize, maskRepeat: 'no-repeat', maskPosition: '0 0', WebkitMask* mirrors }`. Use for all 16px icon buttons (like, dislike, regenerate). For colored icons replace `backgroundColor` with `backgroundImage` gradient and keep mask props.

[chat] regenerate button: sits right of AI bubble column, NOT at window edge. Container: `self-stretch flex flex-col items-center justify-center gap-[4px] shrink-0` — stretches full height of bubble+actions, button vertically centered. Button: `w-[32px] h-[32px] flex items-center justify-center backdrop-blur-[32px] bg-black-70 rounded-full hover:bg-white-10 transition-colors`. Counter: `text-[10px] font-semibold text-white tracking-[0.2px]` showing "0/3".

[chat] typing indicator: uses `bg-chat-ai-bubble` same as AI bubble. `flex items-center gap-[4px] px-[12px] py-[8px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl self-start`. Name text: `text-sm text-white-50 whitespace-nowrap` (NOT italic). Dots: `w-[4px] h-[4px] bg-white-50 rounded-full animate-bounce` with staggered `animationDelay: i * 0.15s`, `animationDuration: 0.9s`.

[chat] disclaimer pill: `self-center backdrop-blur-[60px] bg-black/40 px-[12px] py-[8px] rounded-[16px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]`. Text: `text-[10px] text-white/90`. "Remember: " in `font-medium`.

[chat] ChatBar: outer wrapper `relative px-[16px] md:px-[48px] py-[12px] shrink-0 md:bg-gradient-to-b md:from-transparent md:to-black-40` — desktop scrim is on the outer div (token `black-40`). Mobile scrim is a separate absolutely-positioned div in `page.tsx` (`h-[160px]`, gradient from `#000000` → `black-80` → transparent). Inner container: `bg-chat-ai-bubble rounded-[20px] p-[10px] flex items-center gap-s`. Left: bulb circle `w-5 h-5 rounded-full bg-white-10` + sparkle icon (20px) + flex-1 text input. Right: image, mic, gift icons at 20px using img/mask. Input: `flex-1 bg-transparent text-sm text-white placeholder:text-white-50 outline-none min-w-0`.

[chat] ChatHeader: `h-[56px] md:border-b md:border-white-10 flex items-center px-xs shrink-0 md:bg-none bg-gradient-to-b from-black to-transparent` — border-b is desktop only; mobile shows gradient over character bg. Back button: `p-[10px] rounded-full hover:bg-white-10`. Avatar: `w-10 h-10 rounded-full ring-1 ring-white-10 overflow-hidden`, `mr-m` spacing to name. Add-to-group `+` button: `absolute -bottom-1 -right-2 w-[22px] h-[22px] bg-accent border-2 border-page-bg rounded-full` — `border-page-bg` is the cutout trick. Call icon: CSS mask `backgroundImage: 'var(--icon-gradient-warm)'`. Gallery icon: CSS mask `backgroundColor: 'var(--white-90)'` (CSS var — use for inline styles; SVG fill attributes stay as rgba literals). GameIcon + DotsVerticalIcon SVG fill: `rgba(255,255,255,0.9)` in SVG `fill=` attribute — cannot use CSS var in JSX SVG attributes, acceptable exception. Character name: `text-text-title font-medium text-sm`. Creator: `text-xs text-white underline`.

[chat] right sidebar: `hidden xl:block w-[365px] shrink-0 overflow-y-auto h-full`. Profile card: `style={{ aspectRatio: '9/16' }}` with `relative flex flex-col justify-end overflow-hidden`. Character image: Next.js `<Image fill className="object-cover" priority>`. Scrim: `bg-gradient-to-b from-transparent from-[44%] to-black-80 to-[72%]` (use `black-80` token, not `black/80`). Decorative radial glows at 10% opacity (purple bottom-left, pink top-right, warm top-left). Name text shadow: `style={{ textShadow: '0 0 2px var(--black-70)' }}` — use CSS var.

[chat] right sidebar stat pills: `backdrop-blur-[32px] bg-black-70 flex items-center gap-[2px] pl-[6px] pr-[8px] py-[4px] rounded-[20px]` (use `black-70` token, not `black/70`). Icon 16px inline SVG. Value + label: `text-[10px] text-white-70 tracking-[0.2px] whitespace-nowrap`.

[chat] right sidebar tags: `backdrop-blur-[32px] bg-white-10 border border-white-10 rounded-[24px] px-[10px] py-[2px] text-[10px] text-white tracking-[0.2px]`. Chat CTA: `w-[140px] bg-accent hover:bg-accent-hover rounded-pill py-[10px] text-sm font-semibold`.

[chat] "You May Also Like" grid: `grid grid-cols-2 gap-[12px] px-[24px] pb-[24px]`. Avatar cards: `style={{ aspectRatio: '9/16' }}` with `rounded-[12px] overflow-hidden`. Hover scale: `group-hover:scale-[1.04] transition-transform duration-300`. Card name: `text-sm font-semibold text-text-title`. Description: `text-xs text-text-body line-clamp-2`.

### Profile
<!-- Learnings specific to the Profile screen -->

### Login
<!-- Learnings specific to the Login screen -->

---

## Session Log

### 2026-03-24 — Chat Screen Mobile/Desktop Improvements

**What was built:**
- Mobile character background image (full-bleed behind chat, `object-cover object-top`)
- Mobile bottom chatbar scrim (160px gradient, separate from ChatBar's desktop scrim)
- Mobile-only `bg-black-10` tint overlay on character image
- ChatHeader: mobile gradient (`bg-gradient-to-b from-black to-transparent`), desktop border-b only
- ChatHeader: right icon colors updated — gallery/dots use `var(--white-90)` CSS var
- ChatHeader: coachmark with `bg-chat-ai-active` + `border-accent`, CSS arrow, `bg-white-10` feature row, `bg-accent` icon bg
- ChatMessages: AI bubble row restructured from `flex items-end` (grid-like) to `flex items-start gap-[4px]` (flex columns)
- ChatMessages: regenerate button container changed to `self-stretch flex flex-col items-center justify-center` (true vertical centering across full bubble height)
- ChatMessages: GenerateImageBtn changed from bordered button to gradient-border wrapper pattern (`p-[1px]` outer shell + `bg-surface-raised` inner)
- ChatMessages: all `bg-black/70` replaced with `bg-black-70` token
- ChatBar: mobile scrim moved to `page.tsx` as a separate absolute div
- ChatRightSidebar: char image updated to `char5`, tags updated to match CharacterCard

**Key design decisions:**
- Mobile scrim lives in `page.tsx` as an absolute-positioned layer (sits above character image, below UI) — NOT inside ChatBar, which is a layout concern
- Desktop scrim stays on ChatBar's outer wrapper (`md:bg-gradient-to-b md:to-black-40`)
- Gradient-border button pattern: `p-[1px] rounded-full` wrapper with `background: var(--icon-gradient-warm)` creates a 1px gradient ring; inner div `bg-surface-raised` (#1a1a1a) provides the dark fill — cleaner than `box-shadow` or `border-image`
- Coachmark uses `bg-chat-ai-active` (darker than ai-bubble) to distinguish from regular bubbles; `border-accent` ties it to the brand purple
- CSS arrow (rotated square) built from the coachmark's own bg color + border — no extra assets needed
- Mobile header gradient `from-black to-transparent` — intentionally simple, `to-transparent` not to a named token since it's a true transparent fade

**Taste profile observations:**
- Prefers token-based values over hardcoded hex — every `bg-[#1a1a1a]`, `bg-black/70`, `bg-black/80` gets replaced with proper tokens
- Rejects over-engineered solutions — mobile scrim as a separate positioned div is simpler than trying to make ChatBar do both jobs
- CSS opacity modifier syntax `bg-black/70` acceptable in Tailwind JIT but the team prefers named alpha tokens (`bg-black-70`) for traceability
- SVG `fill=` and `stroke=` attribute literals are an acceptable exception to tokenization — CSS vars cannot be used in JSX SVG attribute strings
- `rgba(255,255,255,0.9)` in inline `style={{ backgroundColor }}` must use `var(--white-90)` — CSS vars added to globals.css for this purpose

**Post-audit additions (2026-03-24 token audit):**
- GenerateImageBtn final design: simplified to match all other action buttons — `p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10`; gradient-border wrapper removed, credit badge removed, gradient icon fill (`backgroundImage: var(--icon-gradient-warm)` via mask) kept as the sole visual distinction
- Design principle: backdrop-blur semi-transparent backgrounds (`bg-black-70`) are incompatible with gradient borders — the gradient bleeds through the transparent surface, making the border invisible or distorted; use a solid border token (`border-white-10`) instead
- `surface-raised` token removed: was only needed for the GenerateImageBtn gradient-border inner fill; with that pattern gone, the token had zero usages and was cleaned up from `tailwind.config.ts`, `globals.css`, and the style guide swatch grid
- `rgba(0,0,0,0.8)` stop in the chat page mobile scrim gradient (`linear-gradient` inline style) replaced with `var(--black-80)` CSS var
- Style guide Chat Bar preview `to-black/40` corrected to `to-black-40` (slash syntax → named alpha token, consistent with codebase convention)
- New tokens added this session: `chat-scrim-bottom` (#000000), `surface-raised` (#1a1a1a), plus CSS vars `--white-50`, `--white-70`, `--white-90`, `--black-70`, `--black-80`

### 2026-03-24 — Token Audit Pass (tailwind.config.ts + globals.css reconciliation)

**What was audited:**
- Compared all token groups in `tailwind.config.ts` against documented VDA memory rules
- Compared `globals.css` utility classes against documented rules
- Compared `Header.tsx` notification badge against memory badge rule

**New rules added:**
- Full `nav.*`, `popup.*`, `forms.*`, `tabs.*`, `card.*`, `page.*`, `brand.*` token group references
- `text.dim` and `text.label` clarified in text scale
- `accent.ultra-light` and `secondary.ultra-dark` documented
- Full shadow scale (`shadow-small`, `shadow-big`, `shadow-button`, `shadow-dark`)
- `rounded-popup` (24px) added to border-radius reference
- Custom breakpoints `mobile: 414px` / `desktop: 1440px` documented
- `backdrop-blur-heavy` (120px) documented
- `.placeholder-icon`, `.char-overlay`, `.glass`, `.token-highlight` CSS utilities documented
- Notification badge ring pattern (Tailwind `ring-2 ring-page-bg`) vs group-chat badge (CSS `box-shadow`) distinction clarified
- Header background clarified: uses `bg-page-bg` (opaque), not `header-bg` token (transparent), `--surface-raised`
