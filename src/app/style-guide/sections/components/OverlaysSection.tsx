'use client'

import { Section, SubLabel, PreviewBox, StateLabel } from '../../helpers'

function TokenRow({ token, desc }: { token: string; desc: string }) {
  return (
    <div className="flex items-baseline gap-xs">
      <code className="text-xxs text-accent-light font-mono shrink-0">{token}</code>
      <span className="text-xxs text-text-xsmall">{desc}</span>
    </div>
  )
}

export default function OverlaysSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Overlays" title="Overlays & Menus" onVisible={onSectionVisible}>

      {/* BottomSheet */}
      <div className="min-w-[440px] flex-1">
        <SubLabel>BottomSheet (mobile)</SubLabel>
        <PreviewBox>
          <div className="w-[300px] bg-profile-sheet-bg rounded-t-popup border-t border-white-10 overflow-hidden">
            <div className="flex justify-center pt-s pb-0">
              <div className="w-[36px] h-[4px] rounded-pill bg-white-30" />
            </div>
            <div className="flex items-center justify-between px-l py-s border-b border-white-10">
              <p className="font-semibold text-base text-text-title">Sheet Title</p>
              <button className="p-[10px] rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="px-l py-s text-sm text-text-body">Sheet content area</div>
          </div>
        </PreviewBox>
        <StateLabel>Type 1 — title + close button</StateLabel>

        <div className="mt-m" />
        <PreviewBox>
          <div className="w-[300px] bg-profile-sheet-bg rounded-t-popup border-t border-white-10 overflow-hidden">
            <div className="flex justify-center pt-s pb-0">
              <div className="w-[36px] h-[4px] rounded-pill bg-white-30" />
            </div>
            <div className="py-xs">
              <p className="px-m py-xs label-xs">SECTION LABEL</p>
              <div className="h-px bg-white-05 my-xxs" />
              <div className="px-m py-s text-base font-medium text-text-subtitle">Menu item</div>
            </div>
          </div>
        </PreviewBox>
        <StateLabel>Type 2 — drag handle only</StateLabel>

        <div className="mt-m flex flex-col gap-xxs">
          <TokenRow token="bg-profile-sheet-bg" desc="#1a1a1a solid" />
          <TokenRow token="rounded-t-popup" desc="24px top corners" />
          <TokenRow token="z-[60]" desc="Above BottomNav (z-50)" />
          <TokenRow token="Close icon" desc="p-[10px] rounded-full hover:bg-white-10 text-white-90" />
        </div>
      </div>

      {/* CenterPopup */}
      <div className="min-w-[440px] flex-1">
        <SubLabel>CenterPopup (desktop)</SubLabel>
        <PreviewBox>
          <div className="w-[320px] bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden">
            <div className="flex items-center justify-between px-l py-s border-b border-white-10">
              <p className="font-semibold text-base text-text-title">Popup Title</p>
              <button className="p-[10px] rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="p-l text-sm text-text-body">Popup content area</div>
          </div>
        </PreviewBox>
        <StateLabel>Centered modal with bg-black-55 backdrop</StateLabel>

        <div className="mt-m flex flex-col gap-xxs">
          <TokenRow token="bg-profile-sheet-bg" desc="#1a1a1a solid" />
          <TokenRow token="rounded-popup" desc="24px all corners" />
          <TokenRow token="shadow-popup" desc="0 8px 24px rgba(0,0,0,0.12)" />
        </div>
      </div>

      {/* Popover */}
      <div className="min-w-[440px] flex-1">
        <SubLabel>Popover (desktop menus)</SubLabel>
        <PreviewBox>
          <div className="bg-profile-sheet-bg border border-white-10 rounded-card shadow-popup p-xs min-w-[180px]">
            <div className="flex flex-col gap-xxs">
              <div className="px-m py-xs text-sm font-semibold text-text-title text-center rounded-button hover:bg-white-10 cursor-pointer">My cards</div>
              <div className="px-m py-xs text-sm font-semibold text-status-alert text-center rounded-button hover:bg-white-10 cursor-pointer">Log out</div>
            </div>
          </div>
        </PreviewBox>
        <StateLabel>Anchored to trigger — no backdrop</StateLabel>

        <div className="mt-m flex flex-col gap-xxs">
          <TokenRow token="bg-profile-sheet-bg" desc="#1a1a1a solid" />
          <TokenRow token="rounded-card" desc="12px (compact)" />
          <TokenRow token="shadow-popup" desc="0 8px 24px rgba(0,0,0,0.12)" />
          <TokenRow token="Menu items" desc="rounded-button (8px), hover:bg-white-10" />
        </div>
      </div>

      {/* Confirmation Dialog */}
      <div className="min-w-[440px] flex-1">
        <SubLabel>Confirmation Dialog (desktop)</SubLabel>
        <PreviewBox>
          <div className="w-[320px] bg-profile-sheet-bg border border-white-10 rounded-popup shadow-popup overflow-hidden">
            <div className="flex items-start justify-between pt-m px-xl">
              <p className="font-semibold text-base text-text-title">Log out?</p>
              <button className="p-[10px] -mr-[10px] -mt-xxs rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="px-xl pt-s pb-m">
              <p className="text-sm text-text-body">Description text goes here.</p>
            </div>
            <div className="flex items-center justify-end gap-xs px-m pb-m">
              <button className="px-xl py-xs rounded-pill bg-white-10 border border-white-10 text-sm font-semibold text-text-subtitle cursor-pointer">Cancel</button>
              <button className="px-xl py-xs rounded-pill bg-accent text-sm font-semibold text-text-title cursor-pointer border-none">Confirm</button>
            </div>
          </div>
        </PreviewBox>
        <StateLabel>Title + body + right-aligned actions</StateLabel>
      </div>

    </Section>
  )
}
