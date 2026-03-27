'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'

export default function ExploreDescriptionSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Explore Description" title="Explore Description" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Preview</SubLabel>
        <div className="relative max-w-[600px]">
          <div className="relative">
            <p className="text-text-small text-xs leading-relaxed line-clamp-1 pr-20">Explore AI Characters — Chat for Free. Discover thousands of AI characters to chat with — for free, no sign up required. Browse by category, search by name, or explore what's trending.</p>
            <div className="absolute inset-y-0 right-0 flex items-center pl-8"
              style={{ background: 'linear-gradient(to right, transparent, var(--page-bg) 40%)' }}>
              <button className="text-text-small text-xs underline underline-offset-2 hover:text-text-body transition-colors shrink-0">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['text-text-small text-xs leading-relaxed', 'SEO text — text-small not text-body'],
            ['line-clamp-1 pr-20', 'Collapsed: clamp to 1 line, right padding for button'],
            ['absolute inset-y-0 right-0 / gradient fade', 'Read More fades in at right edge'],
            ['linear-gradient(to right, transparent, #171717 40%)', 'Gradient matches page-bg'],
            ['text-text-small text-xs underline underline-offset-2', 'Read More / Read Less button'],
            ['hover:text-text-body', 'Hover lifts to body color'],
            ['useState expanded', 'Toggle collapsed/expanded state'],
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
