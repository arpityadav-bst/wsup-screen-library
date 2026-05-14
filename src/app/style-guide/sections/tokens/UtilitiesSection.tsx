'use client'

import { Section, SubLabel, Tag } from '../../helpers'

export default function UtilitiesSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Utilities" title="Utilities" onVisible={onSectionVisible}>

      <div>
        <SubLabel>CSS Utility Classes</SubLabel>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
            <span className="label-xs">Section Header Label</span>
            <Tag>label-xs</Tag>
            <span className="text-text-xsmall text-xs">10px · medium · text-small (60%) · tracked 0.8px · uppercase — for form-field section headers</span>
          </div>
          <div className="flex items-center gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
            <span className="eyebrow-label">Chat model update</span>
            <Tag>.eyebrow-label</Tag>
            <span className="text-text-xsmall text-xs">10px · medium · text-dim (40%) · tracked 0.4px · uppercase — for system-voice CATEGORY signals above titles (intervention popups, in-chat system bubbles). Sibling to <code className="text-accent-light">.label-xs</code>: dimmer + tighter tracking = eyebrow not form-label. Consumers: WatchAdBubble, ModelDeprecatedSheet.</span>
          </div>
          <div className="flex items-center gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
            <a href="#" className="link" onClick={(e) => e.preventDefault()}>Inline text link</a>
            <Tag>.link</Tag>
            <span className="text-text-xsmall text-xs">text-secondary · underline · decoration-white-20 · hover:decoration-white-40</span>
          </div>
          <div className="flex flex-wrap gap-6 items-start">
            <div className="flex flex-col gap-2">
              <div className="w-[150px] h-[100px] glass rounded-card flex items-center justify-center">
                <span className="text-text-body text-sm">Glass surface</span>
              </div>
              <Tag>.glass</Tag>
              <span className="text-text-xxsmall text-xs">white-10 bg + backdrop-blur-bg</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-[150px] h-[100px] rounded-card overflow-hidden relative bg-white-10">
                <div className="char-overlay absolute inset-0" />
                <span className="absolute bottom-2 left-3 text-white text-xs">Overlay text</span>
              </div>
              <Tag>.char-overlay</Tag>
              <span className="text-text-xxsmall text-xs">black/85 → transparent gradient</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-[60px] h-[60px] placeholder-icon flex items-center justify-center">
                <span className="text-text-xxsmall text-xxs text-center leading-tight font-mono">.placeholder-icon</span>
              </div>
              <span className="text-text-xxsmall text-xs">white 10% fill + stroke</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Scroll &amp; Layout Utilities</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m">
          {[
            ['.scroll-hide', 'Hides scrollbar (Firefox + WebKit). Use on any scrollable container.'],
            ['.scroll-thumb-vertical', 'Custom 2px vertical scrollbar thumb. Use with useVerticalScrollbar hook.'],
            ['.scroll-thumb-horizontal', 'Custom horizontal scrollbar thumb. Use with useHorizontalScrollbar hook.'],
            ['.center-content-pad', 'Responsive center padding: md:px-4xl. Use on content areas.'],
            ['.avatar-ring', 'Purple gradient ring for avatar borders. 2px ring with avatar token color.'],
            ['.bio-fade', 'Bottom fade mask for truncated bio text. Gradient mask from white to transparent.'],
            ['.token-highlight', 'Pulse animation for style guide token highlighting.'],
          ].map(([cls, desc]) => (
            <div key={cls} className="flex items-start justify-between gap-m py-xxs border-b border-white-05 last:border-0">
              <code className="text-secondary text-xs shrink-0">{cls}</code>
              <span className="text-text-xsmall text-right">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Animations — keyframes encode the icon&apos;s invitation</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Each animation primitive maps to a specific icon role-class. Use them per the codified taste rule <em>&ldquo;icon animation should encode the icon&apos;s invitation, not just liveliness.&rdquo;</em> Apply via inline <code className="text-accent-light">style={'{{ animation: \'<name> <duration> <easing> infinite\' }}'}</code> on the SVG element. Keyframes live in <code className="text-accent-light">globals.css</code>.</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
            <Tag>bell-ring</Tag>
            <span className="text-text-xsmall text-xs flex-1"><strong className="text-text-title">Alarm signal</strong> — &ldquo;look at this, something happened.&rdquo; Damped oscillation, ~1.4s active + ~3.6s stillness, 5s cycle. Pivot at <code className="text-accent-light">transform-origin: 50% 15%</code> for bell-pendulum swing. Used by <code className="text-accent-light">ModelDeprecatedSheet</code> announcement icon.</span>
          </div>
          <div className="flex items-start gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
            <Tag>play-pulse</Tag>
            <span className="text-text-xsmall text-xs flex-1"><strong className="text-text-title">Invitation signal</strong> — &ldquo;tap me, ready to start.&rdquo; Gentle scale 1 → 1.08 + opacity 0.9 → 1, 2s cycle. No transform-origin (scales from center). Used by <code className="text-accent-light">WatchAdSheet</code> play-triangle icon.</span>
          </div>
          <div className="flex items-start gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
            <Tag>fade-in</Tag>
            <span className="text-text-xsmall text-xs flex-1">Generic 0 → 1 opacity ramp. Use for surfaces mounting on top of others (popup scrims, dummy ad takeover, in-chat bubbles). 0.2s ease-out is the WSUP default.</span>
          </div>
          <div className="flex items-start gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
            <Tag>slide-up</Tag>
            <span className="text-text-xsmall text-xs flex-1">Bottom-anchored slide entry. Used by <code className="text-accent-light">BottomSheet</code> primitive on open. 0.28s cubic-bezier(0.32,0.72,0,1).</span>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Gradient Reference</SubLabel>
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col gap-2">
            <div className="w-[150px] h-[80px] rounded-card" style={{ background: 'linear-gradient(90deg, var(--color-gradient-purple), var(--color-gradient-blue))' }} />
            <Tag>Brand gradient</Tag>
            <span className="text-text-xxsmall text-xs">gradient-purple → gradient-blue</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-[150px] h-[80px] rounded-card bg-gradient-to-t from-black via-black-60 via-[38%] to-transparent to-[62%]" />
            <Tag>Card scrim</Tag>
            <span className="text-text-xxsmall text-xs">from-black via-black-60 via-[38%]</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-[150px] h-[80px] rounded-card bg-gradient-to-t from-accent/20 to-transparent" />
            <Tag>Hover accent tint</Tag>
            <span className="text-text-xxsmall text-xs">from-accent/20 to-transparent</span>
          </div>
        </div>
      </div>

    </Section>
  )
}
