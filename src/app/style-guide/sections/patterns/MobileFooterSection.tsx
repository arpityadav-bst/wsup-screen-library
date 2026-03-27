'use client'

import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'

export default function MobileFooterSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Mobile Footer" title="Mobile Footer" onVisible={onSectionVisible}>

      <div className="min-w-[360px] flex-1 max-w-[500px]">
        <SubLabel>Preview</SubLabel>
        <PreviewBox className="p-0 overflow-hidden">
          <div className="bg-footer-bg">
            {/* Logo + social row */}
            <div className="flex items-center justify-between px-l py-l border-t border-white-10">
              <span className="text-text-body text-sm font-bold">wsup.ai</span>
              <div className="flex items-center gap-l text-text-subtitle">
                <span className="text-text-xsmall text-xxs">Discord</span>
                <span className="text-text-xsmall text-xxs">Instagram</span>
                <span className="text-text-xsmall text-xxs">Reddit</span>
              </div>
            </div>
            {/* Accordion row (open) */}
            <div className="h-[84px] flex items-center justify-between px-m border-t border-white-10">
              <span className="text-text-subtitle font-semibold text-base">Categories</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 12l5-5 5 5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            {/* Accordion row (closed) */}
            <div className="h-[84px] flex items-center justify-between px-m border-t border-white-10">
              <span className="text-text-subtitle font-semibold text-base">Policies</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            {/* Copyright */}
            <div className="px-l pt-l pb-l flex flex-wrap gap-l">
              <p className="text-text-xxsmall text-xs">© 2026 wsup.ai. All rights reserved.</p>
              <span className="text-text-xxsmall text-xs underline">Your Privacy Choices</span>
            </div>
          </div>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['md:hidden bg-footer-bg', 'Mobile only — uses footer-bg (#111111), not page-bg'],
            ['flex items-center justify-between px-l py-l border-t border-white-10', 'Logo + social top row'],
            ['w-[104px] h-[24px] /logo.png', 'Logo — same source as header, same 104×24 size'],
            ['text-text-subtitle (social icons)', 'Social icon color — 80% white, NOT text-title'],
            ['h-[84px] flex items-center justify-between px-m border-t border-white-10', 'Each accordion / nav row height + divider'],
            ['text-text-subtitle font-semibold text-base', 'Row label text'],
            ['hover:bg-white-05 transition-colors', 'Row hover state'],
            ['useState<"categories"|"policies"|null>("policies")', 'Policies open by default'],
            ['border-t border-b border-white-10 flex flex-col px-l py-s', 'Expanded content container'],
            ['py-s text-text-xsmall text-base hover:text-text-body', 'Sub-link items inside expanded section'],
            ['pb-[calc(80px+env(safe-area-inset-bottom,0px))]', 'Copyright bottom padding — clears BottomNav + safe area'],
            ['text-text-xxsmall text-xs', 'Copyright text (30% white)'],
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
