'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'

export default function FAQAccordionSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="FAQ Accordion" title="FAQ Accordion" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Preview</SubLabel>
        <div className="flex flex-col gap-xs max-w-[600px]">
          {/* Open item */}
          <div className="bg-white-10 rounded-xl overflow-hidden">
            <div className="w-full flex items-center justify-between px-l py-m gap-m">
              <span className="text-base font-medium text-text-title">1. What is Wsup.ai, and how does it differ from other AI chatbots?</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 rotate-180">
                <path d="M4 6l4 4 4-4" className="stroke-white-50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="px-l pb-m">
              <p className="text-text-body text-base leading-relaxed">Wsup.ai is a free AI chatbot platform where you can chat with lifelike characters for roleplay, storytelling, or just casual conversation.</p>
            </div>
          </div>
          {/* Closed item */}
          <div className="bg-white-10 rounded-xl overflow-hidden">
            <div className="w-full flex items-center justify-between px-l py-m gap-m">
              <span className="text-base font-medium text-text-title">2. Why choose a no-sign-up AI chatbot?</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M4 6l4 4 4-4" className="stroke-white-50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['bg-white-10 / rounded-xl', 'Card surface + radius — NOT rounded-card'],
            ['px-l py-m', 'Row padding'],
            ['text-base font-medium text-text-title', 'Question text'],
            ['text-base text-text-body', 'Answer text'],
            ['max-w-[768px] mx-auto', 'Container width'],
            ['gap-xs', 'Gap between items'],
            ['hover:bg-white-10 transition-colors', 'Row hover state'],
            ['stroke-white-50', 'Chevron stroke color (NOT hardcoded rgba)'],
            ['rotate-180 on open', 'Chevron animation'],
            ['grid grid-rows-[0fr→1fr] transition-all duration-300', 'Answer expand/collapse animation'],
            ['group + group-hover:bg-white-10', 'Hover covers full card (button + answer)'],
            ['onClick on outer div + pointer-events-none on button', 'Full card is clickable'],
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
