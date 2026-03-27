'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'

export default function WhatIsWsupSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="What is wsup.ai" title="What is wsup.ai" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Preview</SubLabel>
        <div className="max-w-[600px]">
          <h2 className="text-text-title text-3xl font-semibold mb-xl text-center">About wsup.ai</h2>
          <div className="space-y-l">
            <div>
              <h3 className="text-text-title font-semibold text-base mb-xs">Who we are</h3>
              <p className="text-text-body text-base leading-relaxed">Wsup is founded by product builders and storytellers, our goal is to make high-quality language-model technology accessible to anyone with a browser—no downloads, log-ins, or payment barriers for everyday chat.</p>
            </div>
            <div>
              <h3 className="text-text-title font-semibold text-base mb-s">What we provide</h3>
              <ul className="flex flex-col gap-s">
                <li className="flex gap-s text-base leading-relaxed">
                  <span className="text-text-body shrink-0">•</span>
                  <span className="text-text-body"><span className="font-semibold text-text-title">Instant character chat</span> – Open the site, type a greeting, and begin talking to AI characters that remember context and respond naturally.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-xl">
            <button className="flex items-center gap-xs px-xl py-s border border-white-20 rounded-pill text-text-body text-sm font-medium hover:bg-white-05 transition-colors">
              Read more
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.25 3H10.5C10.78 3 11 3.22 11 3.5V8.75" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M3 11L10.5 3.5" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['text-3xl font-semibold text-center text-text-title', 'Heading h2 — centered, full white'],
            ['text-base font-semibold text-text-title', 'Sub-heading h3 (100% white)'],
            ['font-semibold text-text-title + text-text-body', 'Feature list: bold term + regular desc'],
            ['text-base text-text-body', 'Body copy (70% white)'],
            ['max-w-[768px] mx-auto', 'Content container'],
            ['text-left', 'Body text alignment (NOT centered)'],
            ['px-xl py-s border border-white-20 rounded-pill text-text-body text-sm font-medium hover:bg-white-05', '"Read more" CTA (same as Show more)'],
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
