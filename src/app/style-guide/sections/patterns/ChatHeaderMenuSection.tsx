'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import MenuItem from '@/components/ui/MenuItem'

const ITEMS = [
  { label: 'Memories' },
  { label: 'Cards' },
  { label: 'Clear Chat' },
  { label: 'Switch LLMs' },
  { label: 'Turn off auto-suggestions' },
  { label: 'Add Member' },
  { label: 'Report', destructive: true },
] as const

export default function ChatHeaderMenuSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Chat Header Menu" title="Chat Header Menu" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Desktop popover — compact, centered text, auto-width via MenuPopover</SubLabel>
        <div className="bg-profile-sheet-bg border border-white-10 rounded-card shadow-popup p-xs w-max">
          <div className="flex flex-col gap-xxs">
            {ITEMS.map((item) => (
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
          <SubLabel>Mobile sheet — sheet-style rows, title label, dividers, Cancel</SubLabel>
        </div>
        <div className="bg-profile-sheet-bg border border-white-10 rounded-card overflow-hidden max-w-[360px]">
          <div className="flex justify-center pt-s pb-0">
            <div className="w-[36px] h-[4px] rounded-pill bg-white-30" />
          </div>
          <div className="py-xs pb-m">
            <p className="px-m py-xs label-xs">Chat</p>
            <div className="h-px bg-white-05 my-xxs" />
            {ITEMS.map((item, i) => (
              <div key={item.label}>
                <MenuItem
                  mode="sheet"
                  label={item.label}
                  destructive={'destructive' in item ? item.destructive : false}
                  onClick={() => {}}
                />
                {i < ITEMS.length - 1 && <div className="h-px bg-white-05 my-xxs" />}
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
            ['Built on shared `MenuPopover` (ui/MenuPopover.tsx)', 'Mobile = sheet-style BottomSheet, Desktop = popover-style anchored popover. Same items[] data, viewport picks the surface'],
            ['MenuPopover items[] prop: { label, onClick, destructive? }', 'Pure data — no JSX/children for items. Surface styling is encapsulated, per-menu code only declares what the items ARE'],
            ['Mobile sheet: `MenuItem mode="sheet"` — left-aligned, text-base font-medium, px-m py-s', 'Tap-friendly rows ~40px tall. NO icons (per app convention)'],
            ['Mobile sheet has: title label (label-xs uppercase) → divider → items with dividers between → divider → Cancel', 'Title is optional (title prop), Cancel default true (showCancel prop)'],
            ['Desktop popover: `MenuItem mode="popover"` — center-aligned, text-sm font-semibold whitespace-nowrap, px-m py-xs', 'Compact rows, no dividers, no title, no Cancel — desktop has tight cursor + background dismiss'],
            ['Destructive items: text-status-alert in both modes', 'Same semantic, both surfaces'],
            ['Position: BottomSheet `fixed inset-0 md:hidden`; Desktop popover `fixed` with anchorRef.getBoundingClientRect()', 'Both surfaces fixed-positioned — MenuPopover can mount at page root regardless of trigger location'],
            ['Auto-suggestions item label flips with state', '"Turn off auto-suggestions" when on, "Turn on auto-suggestions" when off — label is the action, no toggle UI'],
            ['Cluster order: read/manage → reset → generation-config → people → escalation', 'Memories/Cards | Clear Chat | Switch LLMs/Auto-suggestions | Add Member | Report'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
