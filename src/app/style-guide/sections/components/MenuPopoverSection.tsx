'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import MenuItem from '@/components/ui/MenuItem'

const SAMPLE_ITEMS = [
  { label: 'Memories' },
  { label: 'Cards' },
  { label: 'Clear Chat' },
  { label: 'Switch LLMs' },
  { label: 'Add Member' },
  { label: 'Report', destructive: true },
] as const

export default function MenuPopoverSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Menu Popover" title="Menu Popover" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Desktop popover surface — anchored to a trigger via anchorRef + getBoundingClientRect</SubLabel>
        <div className="bg-profile-sheet-bg border border-white-10 rounded-card shadow-popup p-xs w-max">
          <div className="flex flex-col gap-xxs">
            {SAMPLE_ITEMS.map((item) => (
              <MenuItem
                key={item.label}
                mode="popover"
                label={item.label}
                destructive={'destructive' in item ? item.destructive : false}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>

        <div className="mt-l">
          <SubLabel>Mobile sheet surface — content-driven height, title label, dividers, Cancel</SubLabel>
        </div>
        <div className="bg-profile-sheet-bg border border-white-10 rounded-card overflow-hidden max-w-[360px]">
          <div className="flex justify-center pt-s pb-0">
            <div className="w-[36px] h-[4px] rounded-pill bg-white-30" />
          </div>
          <div className="py-xs pb-m">
            <p className="px-m py-xs label-xs">Chat</p>
            <div className="h-px bg-white-05 my-xxs" />
            {SAMPLE_ITEMS.map((item, i) => (
              <div key={item.label}>
                <MenuItem
                  mode="sheet"
                  label={item.label}
                  destructive={'destructive' in item ? item.destructive : false}
                  onClick={() => {}}
                />
                {i < SAMPLE_ITEMS.length - 1 && <div className="h-px bg-white-05 my-xxs" />}
              </div>
            ))}
            <div className="h-px bg-white-05 my-xxs" />
            <button className="w-full py-s text-base font-medium text-text-xsmall text-center bg-transparent border-none cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['API: <MenuPopover open onClose anchorRef title? items showCancel?>', 'Items as data, not children. Surface styling encapsulated; per-menu code only declares items'],
            ['Mobile: BottomSheet (content-driven height) with sheet-style rows', 'Tap-friendly — text-base font-medium, left-aligned, px-m py-s, dividers between items'],
            ['Desktop: anchored popover (fixed position via anchorRef.getBoundingClientRect)', 'Compact — text-sm font-semibold, center-aligned, px-m py-xs, w-max auto-sizing'],
            ['Position: top-full + 4px below anchor, right-aligned to anchor right edge', 'Calculated via fixed positioning — works regardless of where MenuPopover is mounted in the tree'],
            ['Title prop (optional, mobile only)', 'Category label at top of mobile sheet — uppercase label-xs ("Chat", "Account", "Profile")'],
            ['showCancel prop (default true, mobile only)', 'Cancel button at bottom of mobile sheet — confirmed-exit affordance for touch'],
            ['Items (MenuPopoverItem[]): { label, onClick, destructive? }', 'Same shape on both surfaces. MenuPopover wraps onClick in onClose-then-action so consumers don\'t double-close'],
            ['Built on BottomSheet + MenuItem primitives', 'BottomSheet for the mobile container, MenuItem for both sheet-mode and popover-mode rows'],
            ['outside-click handler skips on mobile (matchMedia)', 'Mobile dismisses via backdrop-tap (BottomSheet feature) or Cancel button — no document mousedown listener competing'],
            ['Escape key closes (both viewports)', 'Standard keyboard affordance'],
            ['Lives in src/components/ui/MenuPopover.tsx', 'Used by ChatHeaderMenu, profile MenuSheet, profile PublicMenuSheet'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-l">
          <SubLabel>When to use</SubLabel>
        </div>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          <p className="text-text-body">Use MenuPopover for any 3-dot / kebab / context menu where the role is "centered-text action menu":</p>
          <ul className="list-disc pl-m space-y-1 text-text-small">
            <li>Chat 3-dot menus (per-conversation actions)</li>
            <li>Profile 3-dot menu (account actions)</li>
            <li>Public-creator 3-dot menu (Block / Report)</li>
            <li>Future per-character or per-story context menus</li>
          </ul>
          <p className="text-text-body mt-s">Don&apos;t use MenuPopover for:</p>
          <ul className="list-disc pl-m space-y-1 text-text-small">
            <li>Settings forms with multiple input types — use a dedicated Settings sheet</li>
            <li>Selection lists (radios, multi-select) — use a custom sheet</li>
            <li>One-action affordances — use a Button</li>
          </ul>
        </div>
      </div>

    </Section>
  )
}
