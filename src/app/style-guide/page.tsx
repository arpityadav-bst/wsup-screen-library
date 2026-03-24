'use client'
import { useState, useEffect } from 'react'
import CharacterCard from '@/components/shared/CharacterCard'

const NAV = ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows', 'Blur', 'Buttons', 'Forms', 'Components', 'Utilities', 'Character Card', 'Header', 'Sidebar', 'Widgets', 'Category Tabs', 'Explore Description', 'FAQ Accordion', 'What is wsup.ai', 'Footer', 'Bottom Nav', 'Mobile Footer', 'Chat Header', 'Chat Messages', 'Chat Bar', 'Chat Right Sidebar']

export default function StyleGuide() {
  const [active, setActive] = useState('Colors')
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="h-screen bg-page-bg" />

  return (
    <div className="h-screen bg-page-bg font-sans flex overflow-hidden">

      {/* ── Sticky sidebar nav ─────────────────────────────── */}
      <aside className="h-full w-[200px] shrink-0 border-r border-white-10 flex flex-col pt-10 px-5 gap-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <p className="label-xs mb-4 px-2">Style Guide</p>
        {NAV.map(item => (
          <button
            key={item}
            onClick={() => {
              setActive(item)
              document.getElementById(item)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className={`text-left text-sm px-3 py-2 rounded-pill transition-colors ${
              active === item
                ? 'bg-white-10 text-text-title font-medium'
                : 'text-text-small hover:bg-white-05 hover:text-text-body font-normal'
            }`}
          >
            {item}
          </button>
        ))}

        <div className="mt-auto pb-8">
          <p className="text-text-xxsmall text-[10px] px-2 leading-relaxed">
            wsup.ai<br />Design tokens
          </p>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto px-12 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {/* Hero */}
        <div className="mb-14">
          <h1 className="text-white text-3xl font-semibold mb-2">
            wsup.ai{' '}
            <span style={{
              background: 'linear-gradient(90deg, var(--color-gradient-purple), var(--color-gradient-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Style Guide
            </span>
          </h1>
          <p className="text-text-body text-sm">Living reference for all design tokens and utility classes. Updated every session.</p>
        </div>

        {/* ── Colors ─────────────────────────────────────── */}
        <Section id="Colors" title="Colors" onVisible={setActive}>

          <ColorGrid label="Accent" swatches={[
            { name: 'accent', hex: '#4a3ec6' },
            { name: 'accent-hover', hex: '#6b62d0' },
            { name: 'accent-dark', hex: '#3126ab' },
            { name: 'accent-dark-hover', hex: '#3c2ed1' },
            { name: 'accent-light', hex: '#988efc' },
            { name: 'accent-ultra-light', hex: '#e7ebff', dark: true },
          ]} />

          <ColorGrid label="Secondary" swatches={[
            { name: 'secondary', hex: '#82a1ff' },
            { name: 'secondary-hover', hex: '#4d79ff' },
            { name: 'secondary-ultra-dark', hex: '#222132' },
            { name: 'secondary-surface', hex: '#252535' },
          ]} />

          <ColorGrid label="Brand" swatches={[
            { name: 'brand-yellow', hex: '#ffc163', dark: true },
            { name: 'brand-purple', hex: '#ab37f0' },
            { name: 'brand-blue', hex: '#0a92ff' },
          ]} />

          <ColorGrid label="Gradient" swatches={[
            { name: 'gradient-purple', hex: '#9d76ff' },
            { name: 'gradient-blue', hex: '#1ec8e8', dark: true },
            { name: 'gradient-warm-light', hex: '#ffca85', dark: true },
            { name: 'gradient-warm-mid', hex: '#ffaf75', dark: true },
            { name: 'gradient-warm-dark', hex: '#ff7a38' },
          ]} extra={
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="w-24 h-10 rounded-button" style={{ background: 'linear-gradient(90deg, var(--color-gradient-purple), var(--color-gradient-blue))' }} />
                <span className="text-text-xsmall text-[10px]">cool</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-24 h-10 rounded-button" style={{ background: 'linear-gradient(135deg, var(--color-gradient-warm-light), var(--color-gradient-warm-dark))' }} />
                <span className="text-text-xsmall text-[10px]">warm</span>
              </div>
            </div>
          } />

          <ColorGrid label="Credit" swatches={[
            { name: 'credit-bg', hex: '#2b1f0e' },
            { name: 'credit-gold', hex: '#f5c842', dark: true },
            { name: 'credit-orange', hex: '#e8732a' },
          ]} extra={
            <div className="flex flex-col gap-1">
              <div className="w-24 h-10 rounded-button" style={{ background: 'linear-gradient(135deg, var(--credit-gold), var(--credit-orange))' }} />
              <span className="text-text-xsmall text-[10px]">border gradient</span>
            </div>
          } />

          <ColorGrid label="Avatar" swatches={[
            { name: 'avatar', hex: '#7b72e8' },
          ]} />

          <ColorGrid label="Status" swatches={[
            { name: 'status-alert', hex: '#de5a48' },
            { name: 'status-error', hex: '#f33621' },
            { name: 'status-warning', hex: '#ffc32a', dark: true },
            { name: 'status-success', hex: '#b3d661', dark: true },
            { name: 'status-positive', hex: '#398b4d' },
            { name: 'status-idle', hex: '#0397eb' },
            { name: 'status-info', hex: '#67c3bb', dark: true },
          ]} />

          <ColorGrid label="Text" swatches={[
            { name: 'text-title', hex: '#ffffff' },
            { name: 'text-subtitle', hex: '#ffffffcc' },
            { name: 'text-body', hex: '#ffffffb2' },
            { name: 'text-label', hex: '#ffffffb2' },
            { name: 'text-small', hex: '#ffffff99' },
            { name: 'text-xsmall', hex: '#ffffff80' },
            { name: 'text-dim', hex: '#ffffff66' },
            { name: 'text-xxsmall', hex: '#ffffff4d' },
          ]} />

          <ColorGrid label="Page" swatches={[
            { name: 'page-bg', hex: '#171717' },
            { name: 'page-divider', hex: '#ffffff1a' },
            { name: 'page-overlay', hex: '#000000b2' },
            { name: 'page-footer', hex: '#000000cc' },
          ]} />

          <ColorGrid label="Footer" swatches={[
            { name: 'footer-bg', hex: '#111111' },
          ]} />

          <ColorGrid label="Nav" swatches={[
            { name: 'nav-hover-bg', hex: '#ffffff1a' },
            { name: 'nav-active-bg', hex: '#ffffff1a' },
            { name: 'nav-icon', hex: '#ffffffcc' },
            { name: 'nav-active-icon', hex: '#ffffff' },
          ]} />

          <ColorGrid label="Card" swatches={[
            { name: 'card-bg', hex: '#ffffff00' },
            { name: 'card-border', hex: '#ffffff0d' },
            { name: 'card-hover-bg', hex: '#ffffff1a' },
            { name: 'card-hover-border', hex: '#4a3ec6' },
          ]} />

          <ColorGrid label="Forms" swatches={[
            { name: 'forms-bg', hex: '#ffffff0d' },
            { name: 'forms-border', hex: '#ffffff1a' },
            { name: 'forms-focus-border', hex: '#82a1ff' },
            { name: 'forms-error-border', hex: '#de5a48' },
            { name: 'forms-active-bg', hex: '#222132' },
            { name: 'forms-disabled-bg', hex: '#888888' },
          ]} />

          <ColorGrid label="Chat" swatches={[
            { name: 'chat-ai-bubble', hex: '#393535' },
            { name: 'chat-ai-active', hex: '#2a2727' },
            { name: 'chat-user-bubble', hex: '#4a3ec6' },
            { name: 'chat-premium-border', hex: '#f4da5c' },
            { name: 'chat-badge', hex: '#de5a48' },
            { name: 'chat-scrim-bottom', hex: '#000000' },
          ]} />

          <ColorGrid label="Header" swatches={[
            { name: 'header-icon-border', hex: '#ffffff1a' },
            { name: 'header-icon-hover-bg', hex: '#ffffff0d' },
          ]} />

          <div>
            <SubLabel>White Alpha</SubLabel>
            <div className="flex flex-wrap gap-2">
              {[5,10,20,30,40,50,60,70,80,90].map(n => (
                <AlphaSwatch key={n} name={`white-${n}`} color={`rgba(255,255,255,${n/100})`} />
              ))}
            </div>
          </div>

          <div>
            <SubLabel>Black Alpha</SubLabel>
            <div className="flex flex-wrap gap-2">
              {[5,10,20,30,40,50,60,70,80,90].map(n => (
                <AlphaSwatch key={n} name={`black-${n}`} color={`rgba(0,0,0,${n/100})`} onLight />
              ))}
            </div>
          </div>

        </Section>

        {/* ── Typography ─────────────────────────────────── */}
        <Section id="Typography" title="Typography" onVisible={setActive}>

          <div>
            <SubLabel>Font — Rubik</SubLabel>
            <div className="flex items-end gap-8 flex-wrap">
              {[
                ['300', 'Light'],
                ['400', 'Regular'],
                ['500', 'Medium'],
                ['600', 'Semi Bold'],
                ['700', 'Bold'],
              ].map(([w, label]) => (
                <div key={w} className="flex flex-col gap-2">
                  <span style={{ fontWeight: w }} className="text-white text-4xl leading-none">Aa</span>
                  <span className="text-text-small text-xs">{label}</span>
                  <Tag>{w}</Tag>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubLabel>Text Color Tokens</SubLabel>
            <div className="flex flex-col gap-3 bg-white-05 border border-white-10 rounded-card p-5">
              {[
                ['#ffffff',     'text-title',    'The quick brown fox'],
                ['#ffffffcc',   'text-subtitle', 'The quick brown fox'],
                ['#ffffffb2',   'text-body',     'The quick brown fox'],
                ['#ffffff99',   'text-small',    'The quick brown fox'],
                ['#ffffff80',   'text-xsmall',   'The quick brown fox'],
                ['#ffffff66',   'text-dim',      'The quick brown fox'],
                ['#ffffff4d',   'text-xxsmall',  'The quick brown fox'],
              ].map(([color, cls, sample]) => (
                <div key={cls} className="flex items-center gap-4">
                  <span className="text-base" style={{ color, minWidth: 220 }}>{sample}</span>
                  <Tag>{cls}</Tag>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubLabel>Utility Classes</SubLabel>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
                <span className="label-xs">Section Header Label</span>
                <Tag>label-xs</Tag>
                <span className="text-text-xsmall text-xs">10px · medium · text-small · tracked · uppercase</span>
              </div>
            </div>
          </div>

        </Section>

        {/* ── Spacing ────────────────────────────────────── */}
        <Section id="Spacing" title="Spacing" onVisible={setActive}>
          <div>
            <SubLabel>Scale</SubLabel>
            <div className="flex flex-col gap-3">
              {[
                ['xxxs', '2px'],
                ['xxs',  '4px'],
                ['xs',   '8px'],
                ['s',    '12px'],
                ['m',    '16px'],
                ['l',    '20px'],
                ['xl',   '24px'],
                ['xxl',  '32px'],
                ['xxxl', '40px'],
              ].map(([name, val]) => (
                <div id={`token-spacing-${name}`} key={name} className="flex items-center gap-4">
                  <div className="w-8 text-right">
                    <Tag>{name}</Tag>
                  </div>
                  <div className="bg-accent-light rounded-sm shrink-0" style={{ width: val, height: '10px' }} />
                  <span className="text-text-xsmall text-xs">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Border Radius ──────────────────────────────── */}
        <Section id="Radius" title="Border Radius" onVisible={setActive}>
          <div className="flex flex-wrap gap-8 items-end">
            {[
              ['button', '8px'],
              ['card',   '12px'],
              ['popup',  '24px'],
              ['pill',   '9999px'],
            ].map(([name, val]) => (
              <div id={`token-radius-${name}`} key={name} className="flex flex-col items-center gap-3">
                <div
                  className="w-20 h-20 bg-white-10 border border-white-20 flex items-center justify-center"
                  style={{ borderRadius: val }}
                />
                <Tag>{name}</Tag>
                <span className="text-text-xsmall text-[10px]">{val}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Shadows ────────────────────────────────────── */}
        <Section id="Shadows" title="Shadows" onVisible={setActive}>
          <div className="flex flex-wrap gap-10 items-end">
            {[
              ['small',  '0 1px 4px rgba(0,0,0,0.3)'],
              ['normal', '0 4px 12px rgba(0,0,0,0.4)'],
              ['big',    '0 8px 32px rgba(0,0,0,0.6)'],
              ['button', '0 2px 8px rgba(74,62,198,0.4)'],
              ['dark',   '0 4px 16px rgba(0,0,0,0.8)'],
            ].map(([name, val]) => (
              <div id={`token-shadow-${name}`} key={name} className="flex flex-col items-center gap-3">
                <div
                  className="w-20 h-20 bg-white-10 rounded-card"
                  style={{ boxShadow: val }}
                />
                <Tag>{name}</Tag>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Backdrop Blur ──────────────────────────────── */}
        <Section id="Blur" title="Backdrop Blur" onVisible={setActive}>
          <div className="flex flex-wrap gap-8">
            {[
              ['bg',    '12px',  'backdrop-blur-bg'],
              ['heavy', '120px', 'backdrop-blur-heavy'],
            ].map(([name, val, cls]) => (
              <div id={`token-blur-${name}`} key={name} className="flex flex-col gap-3">
                <div
                  className="w-36 h-24 rounded-card border border-white-10 flex flex-col items-center justify-center gap-1"
                  style={{ backdropFilter: `blur(${val})`, background: 'rgba(255,255,255,0.04)' }}
                >
                  <span className="text-text-body text-xs">blur</span>
                  <span className="text-white text-base font-medium">{val}</span>
                </div>
                <Tag>{cls}</Tag>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Buttons ────────────────────────────────────── */}
        <Section id="Buttons" title="Buttons" onVisible={setActive}>

          <div>
            <SubLabel>Primary</SubLabel>
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex flex-col items-start gap-2">
                <PreviewBox><button className="bg-accent text-white text-sm font-semibold px-xl py-s rounded-pill shadow-button leading-none">Button</button></PreviewBox>
                <StateLabel>Default</StateLabel>
              </div>
              <div className="flex flex-col items-start gap-2">
                <PreviewBox><button className="bg-accent-hover text-white text-sm font-semibold px-xl py-s rounded-pill shadow-button leading-none">Button</button></PreviewBox>
                <StateLabel>Hover</StateLabel>
              </div>
              <div className="flex flex-col items-start gap-2">
                <PreviewBox><button className="bg-accent text-white/40 text-sm font-semibold px-xl py-s rounded-pill leading-none cursor-not-allowed opacity-40">Button</button></PreviewBox>
                <StateLabel>Disabled</StateLabel>
              </div>
            </div>
          </div>

          <div>
            <SubLabel>Dark</SubLabel>
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex flex-col items-start gap-2">
                <PreviewBox><button className="bg-accent-dark text-white text-sm font-semibold px-xl py-s rounded-pill leading-none">Button</button></PreviewBox>
                <StateLabel>Default</StateLabel>
              </div>
              <div className="flex flex-col items-start gap-2">
                <PreviewBox><button className="bg-accent-dark-hover text-white text-sm font-semibold px-xl py-s rounded-pill leading-none">Button</button></PreviewBox>
                <StateLabel>Hover</StateLabel>
              </div>
            </div>
          </div>

          <div>
            <SubLabel>Secondary / Outlined</SubLabel>
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex flex-col items-start gap-2">
                <PreviewBox><button className="bg-transparent border border-white-20 text-text-body text-sm font-medium px-xl py-s rounded-pill leading-none">Button</button></PreviewBox>
                <StateLabel>Default</StateLabel>
              </div>
              <div className="flex flex-col items-start gap-2">
                <PreviewBox><button className="bg-white-05 border border-white-30 text-text-subtitle text-sm font-medium px-xl py-s rounded-pill leading-none">Button</button></PreviewBox>
                <StateLabel>Hover</StateLabel>
              </div>
            </div>
          </div>

          <div>
            <SubLabel>Link</SubLabel>
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex flex-col items-start gap-2">
                <PreviewBox><button className="text-secondary text-sm font-medium leading-none">Button</button></PreviewBox>
                <StateLabel>Default</StateLabel>
              </div>
              <div className="flex flex-col items-start gap-2">
                <PreviewBox><button className="text-secondary-hover text-sm font-medium underline leading-none">Button</button></PreviewBox>
                <StateLabel>Hover</StateLabel>
              </div>
            </div>
          </div>

          <div>
            <SubLabel>Sizes</SubLabel>
            <div className="flex flex-wrap gap-6 items-start">
              {([
                ['text-xs px-s py-xxs', 'XS'],
                ['text-sm px-m py-xs', 'S'],
                ['text-sm px-xl py-s', 'M (default)'],
                ['text-base px-xxl py-m', 'L'],
              ] as const).map(([cls, label]) => (
                <div key={label} className="flex flex-col items-start gap-2">
                  <PreviewBox>
                    <button className={`bg-accent text-white font-semibold rounded-pill leading-none ${cls}`}>Button</button>
                  </PreviewBox>
                  <StateLabel>{label}</StateLabel>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubLabel>Header Pill CTA</SubLabel>
            <p className="text-text-xsmall text-xs mb-4 max-w-sm">Icon + label pill used in the header bar for contextual actions (e.g. Blogs). Uses semantic header tokens, not generic border tokens.</p>
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex flex-col items-start gap-2">
                <PreviewBox>
                  <button className="flex items-center gap-xs border border-header-icon-border rounded-pill px-m h-[34px] text-white-50 text-sm hover:bg-header-icon-hover-bg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="rgba(255,255,255,0.5)">
                      <path d="M26,2.21H12.61c-2.702,0-4.9,2.198-4.9,4.9V17.6H6c-2.702,0-4.9,2.198-4.9,4.9v3.09c0,2.314,1.88,4.196,4.196,4.2c0.001,0,0.002,0.001,0.003,0.001h21.4c2.315,0,4.2-1.884,4.2-4.2V7.11C30.9,4.408,28.702,2.21,26,2.21z M2.9,25.59V22.5c0-1.709,1.391-3.1,3.1-3.1h1.71v6.171c0,0.006-0.003,0.011-0.003,0.017c0,1.325-1.078,2.403-2.407,2.403C3.977,27.99,2.9,26.914,2.9,25.59z M29.1,25.59c0,1.324-1.076,2.4-2.399,2.4H8.753c0.478-0.681,0.757-1.569,0.757-2.4V7.11c0-1.709,1.391-3.1,3.1-3.1H26c1.709,0,3.1,1.391,3.1,3.1V25.59z"/>
                      <path d="M24.916 10.475H13.694c-.497 0-.9.403-.9.9s.403.9.9.9h11.222c.497 0 .9-.403.9-.9S25.413 10.475 24.916 10.475zM24.916 15.1H13.694c-.497 0-.9.403-.9.9s.403.9.9.9h11.222c.497 0 .9-.403.9-.9S25.413 15.1 24.916 15.1zM19.305 19.725h-5.611c-.497 0-.9.403-.9.9s.403.9.9.9h5.611c.497 0 .9-.403.9-.9S19.802 19.725 19.305 19.725z"/>
                    </svg>
                    Blogs
                  </button>
                </PreviewBox>
                <StateLabel>Default</StateLabel>
              </div>
              <div className="flex flex-col items-start gap-2">
                <PreviewBox>
                  <button className="flex items-center gap-xs border border-header-icon-border rounded-pill px-m h-[34px] text-white-50 text-sm bg-header-icon-hover-bg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="rgba(255,255,255,0.5)">
                      <path d="M26,2.21H12.61c-2.702,0-4.9,2.198-4.9,4.9V17.6H6c-2.702,0-4.9,2.198-4.9,4.9v3.09c0,2.314,1.88,4.196,4.196,4.2c0.001,0,0.002,0.001,0.003,0.001h21.4c2.315,0,4.2-1.884,4.2-4.2V7.11C30.9,4.408,28.702,2.21,26,2.21z M2.9,25.59V22.5c0-1.709,1.391-3.1,3.1-3.1h1.71v6.171c0,0.006-0.003,0.011-0.003,0.017c0,1.325-1.078,2.403-2.407,2.403C3.977,27.99,2.9,26.914,2.9,25.59z M29.1,25.59c0,1.324-1.076,2.4-2.399,2.4H8.753c0.478-0.681,0.757-1.569,0.757-2.4V7.11c0-1.709,1.391-3.1,3.1-3.1H26c1.709,0,3.1,1.391,3.1,3.1V25.59z"/>
                      <path d="M24.916 10.475H13.694c-.497 0-.9.403-.9.9s.403.9.9.9h11.222c.497 0 .9-.403.9-.9S25.413 10.475 24.916 10.475zM24.916 15.1H13.694c-.497 0-.9.403-.9.9s.403.9.9.9h11.222c.497 0 .9-.403.9-.9S25.413 15.1 24.916 15.1zM19.305 19.725h-5.611c-.497 0-.9.403-.9.9s.403.9.9.9h5.611c.497 0 .9-.403.9-.9S19.802 19.725 19.305 19.725z"/>
                    </svg>
                    Blogs
                  </button>
                </PreviewBox>
                <StateLabel>Hover</StateLabel>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m max-w-sm">
              {[
                ['h-[34px] / rounded-pill', 'Height + shape'],
                ['border-header-icon-border', 'Border (#ffffff1a)'],
                ['hover:bg-header-icon-hover-bg', 'Hover bg (#ffffff0d)'],
                ['text-white-50 / text-sm', 'Label color + size'],
                ['gap-xs / px-m', 'Icon gap + padding'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubLabel>Header Icon Button</SubLabel>
            <p className="text-text-xsmall text-xs mb-4 max-w-sm">Icon-only circular button for utility actions in the header (notification, trophy, avatar). Same semantic tokens as Header Pill CTA.</p>
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex flex-col items-start gap-2">
                <PreviewBox>
                  <button className="w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-accent-light)">
                      <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                  </button>
                </PreviewBox>
                <StateLabel>Default</StateLabel>
              </div>
              <div className="flex flex-col items-start gap-2">
                <PreviewBox>
                  <button className="w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full bg-header-icon-hover-bg transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-accent-light)">
                      <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                  </button>
                </PreviewBox>
                <StateLabel>Hover</StateLabel>
              </div>
            </div>
          </div>

        </Section>

        {/* ── Forms ──────────────────────────────────────── */}
        <Section id="Forms" title="Forms" onVisible={setActive}>

          <div>
            <SubLabel>Text Input</SubLabel>
            <div className="flex flex-col gap-2 max-w-sm">
              <PreviewBox>
                <input
                  readOnly
                  suppressHydrationWarning
                  placeholder="Type something..."
                  className="w-full bg-forms-bg border border-forms-border rounded-card px-m py-s text-sm text-text-title placeholder:text-forms-text outline-none"
                />
              </PreviewBox>
              <StateLabel>Default</StateLabel>
            </div>
          </div>

          <div>
            <SubLabel>Textarea</SubLabel>
            <div className="flex flex-col gap-2 max-w-sm">
              <PreviewBox>
                <textarea
                  readOnly
                  suppressHydrationWarning
                  placeholder="Type something..."
                  rows={3}
                  className="w-full bg-forms-bg border border-forms-border rounded-card px-m py-s text-sm text-text-title placeholder:text-forms-text outline-none resize-none"
                />
              </PreviewBox>
              <StateLabel>Default</StateLabel>
            </div>
          </div>

          <div>
            <SubLabel>Token Reference</SubLabel>
            <div className="flex flex-wrap gap-3">
              {[
                ['bg-forms-bg',           '#ffffff0d', 'Default bg'],
                ['border-forms-border',   '#ffffff1a', 'Default border'],
                ['border-forms-focus-border', '#82a1ff', 'Focus border'],
                ['border-forms-error-border', '#de5a48', 'Error border'],
                ['bg-forms-active-bg',    '#222132',   'Active bg'],
                ['bg-forms-disabled-bg',  '#888888',   'Disabled bg'],
              ].map(([token, hex, label]) => (
                <div key={token} className="flex flex-col gap-1">
                  <div className="w-10 h-8 rounded-button border border-white-10" style={{ background: hex }} />
                  <span className="text-[9px] font-mono text-text-xsmall max-w-[80px] leading-tight">{token}</span>
                  <span className="text-[9px] text-text-xxsmall">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

        {/* ── Components ─────────────────────────────────── */}
        <Section id="Components" title="Components" onVisible={setActive}>

          <div>
            <SubLabel>Tags / Pills</SubLabel>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex flex-col items-start gap-2">
                <span className="text-[10px] font-normal px-xs py-[3px] rounded-pill bg-white-10 backdrop-blur-bg text-white-80 border border-white-10">
                  Default
                </span>
                <Tag>Default</Tag>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-[10px] font-normal px-xs py-[3px] rounded-pill bg-status-alert text-white">
                  Alert
                </span>
                <Tag>Status alert</Tag>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-[10px] font-normal px-xs py-[3px] rounded-pill bg-accent/20 backdrop-blur-bg text-accent-light border border-accent/30">
                  Category
                </span>
                <Tag>Accent tint</Tag>
              </div>
            </div>
          </div>

          <div>
            <SubLabel>Cards</SubLabel>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-2">
                <div className="w-[140px] h-[200px] bg-card-bg border border-card-border rounded-card relative overflow-hidden hover:border-card-hover-border transition-all">
                  <div className="absolute inset-0 bg-white-05" />
                  <div className="absolute bottom-0 left-0 right-0 p-xs">
                    <p className="text-text-title text-xs font-semibold truncate">Character Name</p>
                    <p className="text-text-body text-[10px] truncate">Description text here</p>
                  </div>
                </div>
                <Tag>card-bg / card-border</Tag>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-[140px] h-[200px] bg-card-hover-bg border border-card-hover-border rounded-card relative overflow-hidden transition-all">
                  <div className="absolute inset-0 bg-white-05" />
                  <div className="absolute bottom-0 left-0 right-0 p-xs">
                    <p className="text-text-title text-xs font-semibold truncate">Character Name</p>
                    <p className="text-text-body text-[10px] truncate">Description text here</p>
                  </div>
                </div>
                <Tag>Hover state</Tag>
              </div>
            </div>
          </div>

          <div>
            <SubLabel>Chat Bubbles</SubLabel>
            <div className="flex flex-col gap-3 max-w-[300px]">
              <div className="self-end bg-chat-user-bubble text-white text-sm px-m py-xs rounded-[18px] rounded-br-sm max-w-[80%]">
                Hey, what's up?
              </div>
              <div className="self-start bg-chat-ai-bubble text-text-body text-sm px-m py-xs rounded-[18px] rounded-bl-sm max-w-[80%]">
                Not much, just here to chat!
              </div>
            </div>
          </div>

          <div>
            <SubLabel>Navigation Item</SubLabel>
            <div className="flex flex-col gap-1 w-[240px] bg-white-05 rounded-card p-2">
              <div className="flex items-center gap-2 px-4 py-3 rounded-card text-text-title text-xs font-normal" style={{ backgroundImage: 'linear-gradient(90deg, rgba(114,233,241,0.1) 0%, rgba(113,146,229,0.1) 50%, rgba(98,87,215,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 0C3.94 1.68 5.32 3.06 7 3C5.32 2.94 3.94 4.32 4 6C4.06 4.32 2.68 2.94 1 3C2.68 3.06 4.06 1.68 4 0Z" fill="white"/><path d="M10 2C9.9 4.8 12.2 7.1 15 7C12.2 6.9 9.9 9.2 10 12C10.1 9.2 7.8 6.9 5 7C7.8 7.1 10.1 4.8 10 2Z" fill="white"/></svg>
                Explore
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-card text-white-70 text-xs font-normal hover:bg-white-05">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M8.1 0C3.64 0 0 3.53 0 7.92C0 12.3 3.64 15.83 8.1 15.83C12.56 15.83 16.2 12.3 16.2 7.92C16.2 6.72 15.93 5.59 15.45 4.58C15.33 4.33 15.03 4.22 14.78 4.34C14.53 4.46 14.43 4.76 14.54 5.01C14.96 5.89 15.2 6.88 15.2 7.92C15.2 11.72 12.03 14.83 8.1 14.83C4.17 14.83 1 11.72 1 7.92C1 4.11 4.17 1 8.1 1C8.82 1 9.51 1.1 10.16 1.29C10.42 1.37 10.7 1.22 10.78 0.96C10.86 0.69 10.71 0.41 10.44 0.34C9.7 0.12 8.91 0 8.1 0Z" fill="rgba(255,255,255,0.8)"/></svg>
                Stories
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <Tag>Active: gradient bg + text-text-title</Tag>
              <Tag>Inactive: text-white-70 + hover:bg-white-05</Tag>
            </div>
          </div>

        </Section>

        {/* ── Utilities ──────────────────────────────────── */}
        <Section id="Utilities" title="Utilities" onVisible={setActive}>

          <div>
            <SubLabel>CSS Utility Classes</SubLabel>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
                <span className="label-xs">Section Header Label</span>
                <Tag>label-xs</Tag>
                <span className="text-text-xsmall text-xs">10px · medium · text-small · tracked · uppercase</span>
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
                    <span className="text-text-xxsmall text-[10px] text-center leading-tight font-mono">.placeholder-icon</span>
                  </div>
                  <span className="text-text-xxsmall text-xs">white 10% fill + stroke</span>
                </div>
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

        {/* ── Character Card ──────────────────────────────── */}
        <Section id="Character Card" title="Character Card" onVisible={setActive}>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Variants</SubLabel>
            <div className="flex gap-4 flex-wrap">
              {[
                { name: 'Elle the Unfiltered', description: 'A fiercely independent woman with a sharp wit.', image: '/chars/char3.webp', tags: [{ label: 'Girlfriend' }, { label: 'Bold' }, { label: 'Sarcastic' }], rank: '#1,204', chats: 12600000 },
                { name: 'Rinne Tsukishiro', description: 'A quiet anime girl who blossoms into something magical.', image: '/chars/char4.webp', tags: [{ label: 'Anime' }, { label: 'Shy' }, { label: 'Sweet' }], rank: '#24,891', chats: 999900 },
                { name: 'Duke', description: 'Brooding, mysterious, and dangerously charming.', image: '/chars/char5.webp', tags: [{ label: 'Boyfriend' }, { label: 'Dark' }, { label: 'Mystery' }], rank: '#5', chats: 1100000 },
              ].map(char => (
                <div key={char.name} className="w-[160px]">
                  <CharacterCard {...char} />
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Anatomy</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['aspect-[9/16] w-full', 'Portrait 9:16 ratio — fills column'],
                ['rounded-card overflow-hidden', 'Card shape'],
                ['ring-1 ring-white-10 hover:ring-accent', 'Border: white-10 default → accent on hover'],
                ['shadow-normal', 'Drop shadow'],
                ['bg-gradient-to-t from-black via-black-60 via-[38%] to-transparent to-[62%]', 'Scrim gradient'],
                ['from-accent/20 to-transparent opacity-0 group-hover:opacity-100', 'Hover tint layer'],
                ['text-text-title font-semibold text-sm leading-tight truncate min-w-0', 'Name — no shrink-0 or flex-1'],
                ['text-text-body text-xs leading-snug mb-[6px] line-clamp-2', 'Description — text-body not text-small'],
                ['text-[10px] font-normal px-xs py-[3px] rounded-pill bg-white-10 text-white-80 border border-white-10', 'Tag pill'],
                ['bg-accent hover:bg-accent-hover px-m py-xs rounded-pill', 'Chat CTA button'],
                ['opacity-0 translate-y-[6px] group-hover:opacity-100 group-hover:translate-y-0', 'Chat CTA slide-up animation'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

        {/* ── Header ──────────────────────────────────────── */}
        <Section id="Header" title="Header" onVisible={setActive}>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Preview</SubLabel>
            <div className="bg-page-bg border border-white-10 rounded-card overflow-hidden">
              <div className="flex items-center px-m gap-m h-[60px] border-b border-white-10 relative">
                {/* Logo */}
                <div className="shrink-0 w-[180px] pl-xs">
                  <img src="/logo.png" alt="wsup.ai" width={104} height={24} className="object-contain" />
                </div>
                {/* Search */}
                <div className="absolute left-1/2 -translate-x-1/2 w-[320px]">
                  <div className="flex items-center gap-xs bg-white-05 border border-white-10 rounded-full px-m h-[40px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <circle cx="7" cy="7" r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                      <path d="M11 11L14 14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-text-dim text-sm">Search a <span style={{ background: 'linear-gradient(90deg, var(--color-gradient-purple), var(--color-gradient-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>character</span></span>
                  </div>
                </div>
                {/* Right */}
                <div className="flex items-center gap-s ml-auto shrink-0 relative z-10">
                  <button className="flex items-center gap-xs border border-header-icon-border rounded-pill px-m h-[34px] text-white-50 text-sm">Blogs</button>
                  <div className="w-px h-5 bg-white-10" />
                  <button className="w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-accent-light)"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Anatomy</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['h-[60px] / fixed top-0 z-50', 'Height + position'],
                ['bg-page-bg border-b border-white-10', 'Background + bottom border'],
                ['w-[384px] absolute left-1/2 -translate-x-1/2', 'Search bar: truly centered on full header width'],
                ['bg-white-05 border border-white-10 rounded-full px-m h-[40px]', 'Search field'],
                ['text-text-dim', 'Animated placeholder prefix color'],
                ['gradient-purple → gradient-blue', 'Animated keyword gradient'],
                ['border-header-icon-border / hover:bg-header-icon-hover-bg', 'All icon button tokens'],
                ['w-8 h-8 rounded-full', 'Icon buttons: bell, trophy, avatar'],
                ['h-[34px] rounded-pill px-m', 'Blogs CTA pill'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Micro-components</SubLabel>
            <div className="flex flex-col gap-m">

              {/* Credits pill */}
              <div>
                <p className="text-text-xsmall text-[10px] uppercase tracking-[0.5px] mb-xs">Credits Pill</p>
                <div className="flex items-center gap-m mb-xs">
                  <button className="relative flex items-center hover:opacity-90 transition-opacity" style={{ height: '32px' }}>
                    <div className="flex items-center rounded-full h-[28px]"
                      style={{
                        background: 'var(--credit-bg)',
                        border: '1.5px solid transparent',
                        backgroundImage: 'linear-gradient(var(--credit-bg), var(--credit-bg)), linear-gradient(135deg, var(--credit-gold), var(--credit-orange))',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box',
                        paddingLeft: '26px',
                        paddingRight: '12px',
                      }}>
                      <span className="text-white font-bold text-sm tabular-nums" style={{ lineHeight: '28px' }}>10</span>
                    </div>
                    <div className="absolute left-0 w-7 h-7 rounded-full bg-secondary-surface flex items-center justify-center"
                      style={{ top: '50%', transform: 'translateY(-50%) translateX(-20%)' }}>
                      <span className="text-[10px]">🪙</span>
                    </div>
                  </button>
                </div>
                <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
                  {[
                    ['credit-bg', 'Pill fill (#2b1f0e)'],
                    ['credit-gold → credit-orange', '135° gradient border'],
                    ['h-[28px] rounded-full', 'Pill shape'],
                    ['pl-[26px] pr-[12px]', 'Left pad for icon overlap'],
                    ['icon: absolute left-0, translateX(-20%)', 'Credit icon overlaps pill left edge'],
                  ].map(([cls, label]) => (
                    <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                      <TokenCell value={cls} />
                      <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SPICY toggle */}
              <div>
                <p className="text-text-xsmall text-[10px] uppercase tracking-[0.5px] mb-xs">SPICY Toggle</p>
                <div className="flex items-center gap-m mb-xs">
                  {/* off */}
                  <div className="flex flex-col items-center gap-[2px]">
                    <span className="text-[10px] font-medium tracking-widest text-white-50">SPICY</span>
                    <div className="w-[36px] h-[14px] border border-white-50 rounded-full relative">
                      <div className="absolute top-[2px] left-[2px] w-[8px] h-[8px] rounded-full bg-white-50"/>
                    </div>
                  </div>
                  {/* on */}
                  <div className="flex flex-col items-center gap-[2px]">
                    <span className="text-[10px] font-medium tracking-widest text-status-alert">SPICY</span>
                    <div className="w-[36px] h-[14px] border border-status-alert bg-status-alert rounded-full relative">
                      <div className="absolute top-[2px] right-[2px] w-[8px] h-[8px] rounded-full bg-white"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
                  {[
                    ['w-[36px] h-[14px] rounded-full', 'Track size'],
                    ['off: border-white-50 bg-transparent', 'Off state track'],
                    ['on: bg-status-alert border-status-alert', 'On state track'],
                    ['w-[8px] h-[8px] rounded-full top-[2px]', 'Thumb size + vertical center'],
                    ['off: left-[2px] bg-white-50 · on: right-[2px] bg-white', 'Thumb position + color by state'],
                    ['text-[10px] tracking-widest uppercase', 'Label style'],
                  ].map(([cls, label]) => (
                    <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                      <TokenCell value={cls} />
                      <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification badge */}
              <div>
                <p className="text-text-xsmall text-[10px] uppercase tracking-[0.5px] mb-xs">Notification Badge</p>
                <div className="flex items-center gap-m mb-xs">
                  <div className="relative w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-accent-light)">
                      <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-status-alert rounded-full text-[11px] font-bold text-white flex items-center justify-center ring-2 ring-page-bg">7</span>
                  </div>
                </div>
                <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
                  {[
                    ['absolute -top-1 -right-1', 'Dot position: top-right corner'],
                    ['w-4 h-4 rounded-full bg-status-alert', 'Dot size + color'],
                    ['text-[11px] font-bold text-white', 'Count text'],
                    ['ring-2 ring-page-bg', 'Separation ring matches page bg'],
                  ].map(([cls, label]) => (
                    <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                      <TokenCell value={cls} />
                      <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </Section>

        {/* ── Sidebar ─────────────────────────────────────── */}
        <Section id="Sidebar" title="Sidebar" onVisible={setActive}>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Preview</SubLabel>
            <div className="bg-page-bg border border-white-10 rounded-card overflow-hidden w-[280px]">
              <div className="flex items-center justify-between px-6 py-3 border-b border-white-10">
                <span className="label-xs">Recent Chats</span>
                <button className="text-secondary text-[10px] font-semibold tracking-[0.2px]">+ GROUP CHAT</button>
              </div>
              {[
                { name: 'Sarah', preview: 'How about now?', time: '5m' },
                { name: 'Elle', preview: 'What about it?', time: '1h' },
                { name: 'Makima', preview: 'would you like to eat keema?', time: 'Yesterday' },
              ].map((chat, i) => (
                <div key={chat.name} className="relative">
                  <div className="flex items-center gap-3 px-6 py-3 hover:bg-white-05 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-white-10 ring-1 ring-white-20 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white-70 text-sm font-medium leading-[1.45]">{chat.name}</p>
                      <div className="flex items-center gap-1 text-[12px]">
                        <p className="text-text-dim truncate min-w-0">{chat.preview}</p>
                        <span className="text-text-dim shrink-0">· {chat.time}</span>
                      </div>
                    </div>
                  </div>
                  {i < 2 && <div className="absolute bottom-0 left-6 right-6 border-t border-white-10" />}
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Anatomy</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['w-[365px] fixed top-[60px] left-0 bottom-0', 'Dimensions + position'],
                ['bg-page-bg border-r border-white-10', 'Surface + right border'],
                ['flex flex-col', 'Three zones: CTA → nav → recent chats'],
                ['flex items-center gap-2 px-6 py-4 text-[12px] font-normal', 'Nav item row'],
                ['active: gradient bg + text-text-title', 'Active nav state via usePathname()'],
                ['inactive: text-white-70 hover:bg-white-05', 'Inactive nav state'],
                ['label-xs', '"Recent Chats" section header'],
                ['text-white-70 text-sm font-medium', 'Chat name'],
                ['text-text-dim text-[12px] truncate', 'Chat preview + time'],
                ['ring-1 ring-white-20 rounded-full', 'Avatar ring'],
                ['2px thumb — custom JS scrollbar', 'Native scrollbar hidden; JS thumb fades in on scroll'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Group Chat Participant Badge</SubLabel>
            <div className="flex items-center gap-m mb-xs">
              <div className="relative w-[52px] h-[52px]">
                <div className="w-[52px] h-[52px] rounded-full bg-white-10 ring-1 ring-white-20" />
                <div className="absolute -bottom-2 -right-2 bg-secondary-surface rounded-full w-[24px] h-[24px] flex items-center justify-center text-[11px] font-medium text-white-60 leading-none"
                  style={{ boxShadow: '0 0 0 2px var(--page-bg)' }}>
                  <span>+3</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['absolute -bottom-2 -right-2', 'Position: bottom-right of avatar'],
                ['w-[24px] h-[24px] rounded-full', 'Badge size'],
                ['bg-secondary-surface', 'Fill (#252535)'],
                ['text-[11px] font-medium text-white-60', 'Count text'],
                ['boxShadow: 0 0 0 2px var(--page-bg)', 'Separation ring via CSS var'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

        {/* ── Widgets ─────────────────────────────────────── */}
        <Section id="Widgets" title="Widgets" onVisible={setActive}>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Generate Images</SubLabel>
            <div className="flex flex-col gap-3">
              <PreviewBox>
                <div className="relative flex items-center gap-2 bg-white-05 border border-white-10 rounded-card px-3 h-[52px] overflow-hidden w-[280px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <defs>
                      <linearGradient id="gi" x1="4" y1="0" x2="15" y2="16" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFCA85"/><stop offset="0.5" stopColor="#FFAF75"/><stop offset="1" stopColor="#FF7A38"/>
                      </linearGradient>
                    </defs>
                    <rect x="1" y="1" width="14" height="14" rx="3" stroke="url(#gi)" strokeWidth="1.5"/>
                    <circle cx="5.5" cy="5.5" r="1.5" fill="url(#gi)"/>
                    <path d="M1 11l4-4 3 3 2-2 5 5" stroke="url(#gi)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white-70 font-medium text-sm z-10 relative">Generate Images</span>
                  <svg className="absolute right-3 z-10" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <defs>
                      <linearGradient id="ag" x1="4" y1="10" x2="16" y2="10" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFCA85"/><stop offset="0.5" stopColor="#FFAF75"/><stop offset="1" stopColor="#FF7A38"/>
                      </linearGradient>
                    </defs>
                    <path d="M4 10h12M12 6l4 4-4 4" stroke="url(#ag)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </PreviewBox>
              <StateLabel>Default</StateLabel>
            </div>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Anatomy</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['h-[52px] bg-white-05 border border-white-10 rounded-card', 'Card surface — widgets use rounded-card not rounded-pill'],
                ['<Link> not <div>', 'Must be keyboard-focusable'],
                ['text-sm font-medium text-white-70', 'Label — NOT font-semibold or text-text-title'],
                ['rounded-card (not rounded-pill)', 'Shape — it is a widget, not a button'],
                ['absolute char image — plain <img> not <Image>', 'Avoids Next.js optimizer sharpening small PNGs'],
                ['arrow: orange gradient SVG, absolute right-3', 'Arrow matches icon gradient #FFCA85→#FF7A38'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

        {/* ── Category Tabs ───────────────────────────────── */}
        <Section id="Category Tabs" title="Category Tabs" onVisible={setActive}>

          <div className="min-w-[440px] flex-1">
            <SubLabel>States</SubLabel>
            <div className="flex items-center gap-xs flex-wrap">
              <button className="shrink-0 px-m py-xs rounded-pill text-sm font-medium border border-secondary text-secondary bg-transparent whitespace-nowrap">
                Recommended
              </button>
              <button className="shrink-0 px-m py-xs rounded-pill text-sm font-medium border border-white-20 text-text-body bg-transparent whitespace-nowrap">
                Anime
              </button>
              <button className="shrink-0 px-m py-xs rounded-pill text-sm font-medium border border-white-30 text-text-body bg-white-05 whitespace-nowrap">
                Hover
              </button>
            </div>
            <div className="flex gap-3 mt-3">
              <Tag>Active: border-secondary / text-secondary</Tag>
              <Tag>Inactive: border-white-20 / text-text-body</Tag>
              <Tag>Hover: border-white-30 / bg-white-05</Tag>
            </div>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Anatomy</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['px-m py-xs / rounded-pill', 'Secondary outline S size'],
                ['text-sm font-medium', 'Label typography'],
                ['border-secondary / text-secondary', 'Active state — #82a1ff'],
                ['border-white-20 / text-text-body', 'Inactive state'],
                ['hover:bg-white-05 / hover:border-white-30', 'Hover state'],
                ['tabs-scroll (.tabs-scroll class)', 'Wrapper: overflow-x auto, scrollbar hidden'],
                ['w-max inner flex div', 'Inner row expands beyond container width'],
                ['drag-to-scroll (mousedown/move/up)', 'Drag-to-scroll via JS handlers'],
                ['hasDragged ref', 'Prevents tab click after drag'],
                ['custom JS scrollbar div', 'opacity-0 → opacity-100 on hover, 3px tall'],
                ['pb-[11px] -mb-[11px]', 'Pre-allocated scrollbar space — no layout shift'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

        {/* ── Explore Description ─────────────────────────── */}
        <Section id="Explore Description" title="Explore Description" onVisible={setActive}>

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

        {/* ── FAQ Accordion ───────────────────────────────── */}
        <Section id="FAQ Accordion" title="FAQ Accordion" onVisible={setActive}>

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

        {/* ── What is wsup.ai ─────────────────────────────── */}
        <Section id="What is wsup.ai" title="What is wsup.ai" onVisible={setActive}>

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

        {/* ── Footer ──────────────────────────────────────── */}
        <Section id="Footer" title="Footer" onVisible={setActive}>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Columns</SubLabel>
            <div className="flex gap-xl text-sm">
              {[
                { heading: 'CATEGORIES', links: ['Recommended', 'Anime', 'Romantic', 'AI Games'] },
                { heading: 'COMPANY', links: ['About us', 'App Download'] },
                { heading: 'SUPPORT', links: ['AI Companion', 'Blog'] },
              ].map(col => (
                <div key={col.heading}>
                  <p className="text-text-dim text-[10px] font-semibold tracking-widest uppercase mb-m">{col.heading}</p>
                  <ul className="flex flex-col gap-s">
                    {col.links.map(l => (
                      <li key={l} className="text-text-body text-sm">{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <p className="text-text-dim text-[10px] font-semibold tracking-widest uppercase mb-m">FOLLOW US</p>
                <ul className="flex flex-col gap-s">
                  {['Discord', 'Instagram', 'Reddit'].map(s => (
                    <li key={s} className="text-text-body text-sm">{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <SubLabel>Copyright row</SubLabel>
            <div className="flex items-center justify-between border-t border-white-10 pt-m max-w-[600px]">
              <p className="text-text-xxsmall text-xs">© 2026 wsup.ai. All rights reserved.</p>
              <span className="text-text-xxsmall text-xs underline cursor-pointer">Your Privacy Choices</span>
            </div>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Structure</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['bg-footer-bg', 'Footer bg token — #111111, darker than page-bg'],
                ['border-t border-white-10', 'Top divider'],
                ['text-text-dim text-[10px] tracking-widest uppercase', 'Column headings (CATEGORIES, COMPANY…)'],
                ['text-text-body text-sm hover:text-text-title', 'Link items'],
                ['text-text-dim text-[10px] tracking-widest uppercase', 'POLICIES label'],
                ['text-text-dim text-xs hover:text-text-small', 'Policy links'],
                ['text-text-xxsmall text-xs', 'Copyright — © 2026 wsup.ai'],
                ['text-text-xxsmall text-xs underline + group-hover:text-white-50', 'Your Privacy Choices (with privacy-choices.png image)'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

        {/* ── Bottom Nav ──────────────────────────────────── */}
        <Section id="Bottom Nav" title="Bottom Nav" onVisible={setActive}>

          <div className="min-w-[360px] flex-1 max-w-[500px]">
            <SubLabel>Preview</SubLabel>
            <PreviewBox className="p-0 overflow-hidden">
              {/* Simulated bottom nav bar */}
              {(() => {
                const items = [
                  { label: 'Stories', active: false },
                  { label: 'Explore', active: true },
                  { label: 'Create', active: false },
                  { label: 'Chats', active: false },
                  { label: 'Profile', active: false },
                ]
                const activeGrad = 'linear-gradient(90deg, rgba(114,233,241,0.1) 0%, rgba(113,146,229,0.1) 50%, rgba(98,87,215,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)'
                return (
                  <nav className="bg-page-bg border-t border-white-10 flex items-center">
                    {items.map(({ label, active }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-[6px] py-[12px] flex-1 min-w-0"
                        style={active ? { backgroundImage: activeGrad } : undefined}
                      >
                        <div className="w-5 h-5 rounded-sm bg-white-20" />
                        <span className={`text-[12px] font-normal leading-none ${active ? 'text-text-title' : 'text-white-50'}`}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </nav>
                )
              })()}
            </PreviewBox>
            <div className="mt-s flex flex-col gap-xs">
              <StateLabel>Active item (Explore)</StateLabel>
              <StateLabel>Inactive items</StateLabel>
            </div>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Anatomy</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['fixed bottom-0 left-0 right-0 z-50 md:hidden', 'Positioning — mobile only, above everything'],
                ['bg-page-bg border-t border-white-10', 'Bar surface + top divider'],
                ['flex items-center', 'Bar layout — 5 items fill full width'],
                ['flex-1 min-w-0', 'Each item takes equal width'],
                ['flex flex-col items-center gap-[6px] py-[12px]', 'Item layout — icon + label, 12px vertical padding'],
                ['text-[12px] font-normal leading-none', 'Label typography'],
                ['text-text-title (active) / text-white-50 (inactive)', 'Label color states'],
                ['white (active) / rgba(255,255,255,0.5) (inactive)', 'Icon fill/bg color states'],
                ['backgroundImage: activeGradient (inline style)', 'Active bg — full column width gradient, no pill'],
                ['usePathname() for active state', 'Never hardcode active — derive from route'],
                ['paddingBottom: env(safe-area-inset-bottom, 8px)', 'iPhone notch safe area'],
                ['CSS mask (maskImage + backgroundColor)', 'Figma asset icons (Chat, Profile)'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

        {/* ── Mobile Footer ────────────────────────────────── */}
        <Section id="Mobile Footer" title="Mobile Footer" onVisible={setActive}>

          <div className="min-w-[360px] flex-1 max-w-[500px]">
            <SubLabel>Preview</SubLabel>
            <PreviewBox className="p-0 overflow-hidden">
              <div className="bg-footer-bg">
                {/* Logo + social row */}
                <div className="flex items-center justify-between px-l py-l border-t border-white-10">
                  <span className="text-text-body text-sm font-bold">wsup.ai</span>
                  <div className="flex items-center gap-l text-text-subtitle">
                    <span className="text-text-xsmall text-[10px]">Discord</span>
                    <span className="text-text-xsmall text-[10px]">Instagram</span>
                    <span className="text-text-xsmall text-[10px]">Reddit</span>
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

        {/* ── Chat Header ──────────────────────────────────── */}
        <Section id="Chat Header" title="Chat Header" onVisible={setActive}>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Preview</SubLabel>
            <PreviewBox className="p-0 overflow-hidden">
              <div className="h-[56px] border-b border-white-10 flex items-center px-xs bg-page-bg">
                {/* Back */}
                <button className="p-[10px] rounded-full hover:bg-white-10 transition-colors shrink-0">
                  <svg width="20" height="20" viewBox="0 0 16.8333 13.5" fill="none">
                    <path d="M6.97727 0.5L0.5 6.75M0.5 6.75L6.97727 13M0.5 6.75H16.3333" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {/* Avatar */}
                <div className="relative shrink-0 mr-m">
                  <div className="w-10 h-10 rounded-full ring-1 ring-white-10 bg-white-10 overflow-hidden" />
                  <button className="absolute -bottom-1 -right-2 w-[22px] h-[22px] bg-accent border-2 border-page-bg rounded-full flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M2 5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                </div>
                {/* Name */}
                <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                  <span className="text-text-title font-bold text-sm leading-tight">Billie Eilish</span>
                  <div className="flex items-center gap-[4px]">
                    <span className="text-xs text-text-body leading-tight">by</span>
                    <span className="text-xs text-white underline leading-tight">Honeybadger</span>
                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none"><path d="M1 1l3 3-3 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center shrink-0">
                  <button className="p-[10px] rounded-full hover:bg-white-10 transition-colors">
                    <div style={{ width: 20, height: 20, backgroundImage: 'linear-gradient(146.75deg, rgb(244,218,92) 14.649%, rgb(228,137,73) 54.497%, rgb(198,87,32) 97.483%)', maskImage: "url('/icons/icon-call.svg')", maskSize: '20px 20px', maskRepeat: 'no-repeat', maskPosition: '0 0', WebkitMaskImage: "url('/icons/icon-call.svg')", WebkitMaskSize: '20px 20px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0' }} />
                  </button>
                  <button className="p-[10px] rounded-full hover:bg-white-10 transition-colors">
                    <div style={{ width: 20, height: 20, backgroundColor: 'rgba(255,255,255,0.7)', maskImage: "url('/icons/icon-gallery.svg')", maskSize: '20px 20px', maskRepeat: 'no-repeat', maskPosition: '0 0', WebkitMaskImage: "url('/icons/icon-gallery.svg')", WebkitMaskSize: '20px 20px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0' }} />
                  </button>
                  <button className="p-[10px] rounded-full hover:bg-white-10 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="rgba(255,255,255,0.7)"><circle cx="10" cy="4.5" r="1.5" /><circle cx="10" cy="10" r="1.5" /><circle cx="10" cy="15.5" r="1.5" /></svg>
                  </button>
                </div>
              </div>
            </PreviewBox>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Anatomy</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['h-[56px] border-b border-white-10 flex items-center px-xs shrink-0', 'Header bar'],
                ['p-[10px] rounded-full hover:bg-white-10', 'Back button — hit area'],
                ['w-10 h-10 rounded-full ring-1 ring-white-10 / mr-m', 'Avatar circle + right margin'],
                ['-bottom-1 -right-2 w-[22px] h-[22px] bg-accent border-2 border-page-bg rounded-full', '+ group badge — border-page-bg cutout trick'],
                ['text-text-title font-bold text-sm', 'Character name'],
                ['text-xs text-white underline', 'Creator link'],
                ['CSS mask + warm gradient (backgroundImage)', 'Call icon — color matches accent gradient'],
                ['CSS mask + var(--white-90)', 'Gallery icon — 90% white (var(--white-90))'],
                ['bg-gradient-to-b from-black to-transparent (mobile)', 'Mobile header gradient — fades into character bg'],
                ['bg-chat-ai-active border border-accent rounded-[16px]', 'Coachmark container — accent border + active bg'],
                ['bg-white-10 rounded-[10px] px-[8px] py-[6px]', 'Coachmark feature row container'],
                ['w-[32px] h-[32px] rounded-[10px] bg-accent', 'Coachmark icon background — accent fill'],
                ['bg-status-alert animate-pulse (notification dot)', 'New-feature badge on game icon'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

        {/* ── Chat Messages ────────────────────────────────── */}
        <Section id="Chat Messages" title="Chat Messages" onVisible={setActive}>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Bubbles</SubLabel>
            <PreviewBox>
              <div className="flex flex-col gap-[16px] w-full max-w-[400px]">
                {/* User bubble */}
                <div className="flex justify-end w-full">
                  <div className="bg-chat-user-bubble px-[12px] py-[10px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl max-w-[360px]">
                    <p className="text-sm text-white leading-normal">Namaskar Sara ji</p>
                    <p className="text-sm italic text-white-50 leading-snug mt-[2px]">laugh softly with gentle smile</p>
                  </div>
                </div>
                {/* AI bubble */}
                <div className="flex items-start gap-[4px]">
                  <div className="flex flex-col max-w-[290px] min-w-[64px]">
                    <div className="bg-chat-ai-bubble px-[12px] pt-[8px] pb-[14px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                      <p className="text-sm italic text-white-50 leading-snug mb-s">She blinks, smiles and says,</p>
                      <p className="text-sm text-white leading-normal">I am Sarah! You can call me Sara.</p>
                    </div>
                    <div className="flex items-center pt-[4px]">
                      <div className="flex items-center gap-[4px]">
                        <div className="backdrop-blur-[32px] bg-black-70 flex items-center gap-[4px] h-[32px] pl-[8px] pr-[6px] rounded-[24px] shrink-0">
                          <div className="flex items-center gap-[2px]">
                            {[3, 7, 10, 8, 5].map((h, i) => <div key={i} className="w-[1.5px] bg-white-70 rounded-full" style={{ height: `${h}px` }} />)}
                          </div>
                          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shrink-0 ml-[2px]">
                            <svg width="6" height="7" viewBox="0 0 6 7" fill="none"><path d="M1.5 1l3.5 2.5L1.5 6V1Z" fill="#171717" /></svg>
                          </div>
                        </div>
                        <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10"><div style={{ width: 16, height: 16, backgroundColor: 'white', maskImage: "url('/icons/icon-like.svg')", maskSize: '16px 16px', maskRepeat: 'no-repeat', maskPosition: '0 0', WebkitMaskImage: "url('/icons/icon-like.svg')", WebkitMaskSize: '16px 16px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0' }} /></button>
                        <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10"><div style={{ width: 16, height: 16, backgroundColor: 'white', maskImage: "url('/icons/icon-dislike.svg')", maskSize: '16px 16px', maskRepeat: 'no-repeat', maskPosition: '0 0', WebkitMaskImage: "url('/icons/icon-dislike.svg')", WebkitMaskSize: '16px 16px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0' }} /></button>
                      </div>
                      <div className="flex-1" />
                      <div className="flex items-center gap-[4px]">
                        <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 transition-colors shrink-0">
                          <div style={{ width: 16, height: 16, backgroundImage: 'var(--icon-gradient-warm)', maskImage: "url('/icons/icon-generate-image.svg')", maskSize: '16px 16px', maskRepeat: 'no-repeat', maskPosition: '0 0', WebkitMaskImage: "url('/icons/icon-generate-image.svg')", WebkitMaskSize: '16px 16px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0' }} />
                        </button>
                        <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><circle cx="8" cy="3" r="1.3" /><circle cx="8" cy="8" r="1.3" /><circle cx="8" cy="13" r="1.3" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-center justify-center gap-[4px] shrink-0">
                    <button className="w-[32px] h-[32px] flex items-center justify-center backdrop-blur-[32px] bg-black-70 rounded-full">
                      <div style={{ width: 16, height: 16, backgroundColor: 'white', maskImage: "url('/icons/icon-regenerate.svg')", maskSize: '16px 16px', maskRepeat: 'no-repeat', maskPosition: '0 0', WebkitMaskImage: "url('/icons/icon-regenerate.svg')", WebkitMaskSize: '16px 16px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0' }} />
                    </button>
                    <span className="text-[10px] font-semibold text-white tracking-[0.2px]">0/3</span>
                  </div>
                </div>
                {/* Typing indicator */}
                <div className="bg-chat-ai-bubble flex items-center gap-[4px] px-[12px] py-[8px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl self-start">
                  <p className="text-sm text-white-50">Sarah is typing</p>
                  <div className="flex items-center gap-[3px] ml-[2px]">
                    {[0, 1, 2].map(i => <div key={i} className="w-[4px] h-[4px] bg-white-50 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }} />)}
                  </div>
                </div>
              </div>
            </PreviewBox>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Anatomy</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['flex-1 overflow-y-auto flex flex-col gap-[16px]', 'Scroll container'],
                ['<div className="flex-1" /> before first message', 'Bottom-alignment spacer — compresses as messages grow'],
                ['bg-chat-user-bubble / rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl', 'User bubble — bottom-right corner open'],
                ['bg-chat-ai-bubble / rounded-tl-2xl rounded-tr-2xl rounded-br-2xl', 'AI bubble — bottom-left corner open'],
                ['text-sm italic text-white-50 leading-snug', 'Emotion/action text (both user and AI)'],
                ['max-w-[290px] min-w-[64px] flex flex-col (bubble+actions wrapper)', 'Left column — constrains to bubble width'],
                ['flex items-start gap-[4px] (outer AI row)', 'Bubble left column + regenerate right column, top-aligned'],
                ['self-stretch flex flex-col items-center justify-center (regenerate)', 'Regenerate stretches full bubble height, icon vertically centered'],
                ['flex-1 spacer in action row', 'Splits left group (audio/like/dislike) from right group (generate/dots)'],
                ['p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10', 'Action buttons — use bg-black-70 token'],
                ['p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 (GenerateImageBtn)', 'GenerateImage — same pattern as other action buttons; gradient-border wrapper removed'],
                ['backgroundImage: var(--icon-gradient-warm) (icon mask)', 'GenerateImage icon — warm gradient fill via mask, distinguishes from plain-white action icons'],
                ['text-sm text-white-50 (typing name)', 'NOT italic — same dim color as emotion text but roman weight'],
                ['animate-bounce / animationDelay i*0.15s / animationDuration 0.9s', 'Staggered typing dots'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

        {/* ── Chat Bar ─────────────────────────────────────── */}
        <Section id="Chat Bar" title="Chat Bar" onVisible={setActive}>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Preview</SubLabel>
            <PreviewBox className="p-0 overflow-hidden">
              <div className="bg-gradient-to-b from-transparent to-black-40 px-[16px] py-[12px]">
                <div className="bg-chat-ai-bubble rounded-[20px] p-[10px] flex items-center gap-s">
                  <div className="flex items-center gap-s flex-1 min-w-0">
                    <button className="w-5 h-5 rounded-full bg-white-10 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.5a3 3 0 0 1 2 5.2V8a.5.5 0 0 1-.5.5h-3A.5.5 0 0 1 4 8V6.7A3 3 0 0 1 6 1.5Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinejoin="round" /><path d="M4.5 9.5h3M5 10.5h2" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" /></svg>
                    </button>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2c0 0 .6 4 2.2 5.8C13.8 9.6 18 10 18 10s-4.2.4-5.8 2.2C10.6 14 10 18 10 18s-.6-4-2.2-5.8C6.2 10.4 2 10 2 10s4.2-.4 5.8-2.2C9.4 6 10 2 10 2Z" fill="rgba(255,255,255,0.7)" /></svg>
                    <span className="text-sm text-white-50">Message</span>
                  </div>
                  <div className="flex items-center gap-[16px] shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4.5" width="16" height="11" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" /><circle cx="7" cy="9" r="1.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" /></svg>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="7" y="2" width="6" height="9" rx="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" /></svg>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="8" width="16" height="2" rx="1" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" /></svg>
                  </div>
                </div>
              </div>
            </PreviewBox>
          </div>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Anatomy</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['md:bg-gradient-to-b md:from-transparent md:to-black-40', 'Desktop scrim — fades messages into chatbar (desktop only)'],
                ['absolute bottom-0 h-[160px] gradient(#000000 → black-80 → transparent)', 'Mobile scrim — 160px gradient behind chatbar, above character image'],
                ['bg-chat-ai-bubble rounded-[20px] p-[10px]', 'Inner bar surface — same token as AI bubble'],
                ['w-5 h-5 rounded-full bg-white-10 (bulb)', 'Auto-suggest bulb — tiny circle button'],
                ['flex-1 bg-transparent text-sm text-white placeholder:text-white-50 outline-none min-w-0', 'Input field'],
                ['gap-[16px] (right icons)', 'More spacing between media action icons than gap-s'],
                ['rgba(255,255,255,0.5) stroke (media icons)', 'Dimmer than left icons — secondary affordance'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

        {/* ── Chat Right Sidebar ───────────────────────────── */}
        <Section id="Chat Right Sidebar" title="Chat Right Sidebar" onVisible={setActive}>

          <div className="min-w-[440px] flex-1">
            <SubLabel>Anatomy</SubLabel>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['hidden xl:block w-[365px] shrink-0 h-full overflow-y-auto', 'Sidebar — xl breakpoint, matches left sidebar width'],
                ['style={{ aspectRatio: "9/16" }} relative flex flex-col justify-end overflow-hidden', 'Profile card — 9:16 portrait ratio'],
                ['bg-gradient-to-b from-transparent from-[44%] to-black-80 to-[72%]', 'Scrim — clears above 44%, full dark by 72% (bg-black-80 token)'],
                ['radial-gradient ellipse 10% opacity (purple/pink/warm)', 'Decorative glows — not structural, pure aesthetic'],
                ['backdrop-blur-[32px] bg-black-70 rounded-[20px] (stat pills)', 'Stats pill container — bg-black-70 token'],
                ['text-[10px] text-white-70 tracking-[0.2px] whitespace-nowrap', 'Stat value + label text'],
                ['backdrop-blur-[32px] bg-white-10 border border-white-10 rounded-[24px] px-[10px] py-[2px] text-[10px]', 'Tag pill'],
                ['w-[140px] bg-accent rounded-pill py-[10px] text-sm font-semibold', 'Chat CTA — fixed 140px width, centered'],
                ['grid grid-cols-2 gap-[12px] px-[24px] pb-[24px]', '"You May Also Like" grid'],
                ['style={{ aspectRatio: "9/16" }} rounded-[12px] overflow-hidden', 'Related character card — 9:16 portrait'],
                ['group-hover:scale-[1.04] transition-transform duration-300', 'Subtle zoom on hover for related cards'],
                ['label-xs px-[24px] pt-[24px] pb-[12px]', '"You May Also Like" section label'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </Section>

      </main>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────

function Section({
  id, title, children, onVisible
}: {
  id: string
  title: string
  children: React.ReactNode
  onVisible: (id: string) => void
}) {
  return (
    <section
      id={id}
      className="mb-16 scroll-mt-8"
      onMouseEnter={() => onVisible(id)}
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-white text-lg font-semibold shrink-0">{title}</h2>
        <div className="flex-1 border-t border-white-10" />
      </div>
      <div className="flex flex-wrap gap-10">{children}</div>
    </section>
  )
}

function ColorGrid({
  label, swatches, extra
}: {
  label: string
  swatches: { name: string; hex: string; dark?: boolean }[]
  extra?: React.ReactNode
}) {
  return (
    <div>
      <SubLabel>{label}</SubLabel>
      <div className="flex flex-wrap gap-3 items-end">
        {swatches.map(s => <Swatch key={s.name} {...s} />)}
        {extra}
      </div>
    </div>
  )
}

function Swatch({ name, hex }: { name: string; hex: string; dark?: boolean }) {
  return (
    <div id={`token-${name}`} className="group flex flex-col gap-2 cursor-default">
      <div
        className="w-16 h-12 rounded-card border border-white-10 transition-transform group-hover:scale-105"
        style={{ background: hex }}
      />
      <span className="text-text-xsmall text-[10px] leading-tight max-w-[64px]">{name}</span>
      <span className="text-text-xxsmall text-[9px] leading-tight max-w-[64px] font-mono opacity-70">
        {hex.length > 10 ? hex.slice(0, 10) + '…' : hex}
      </span>
    </div>
  )
}

function AlphaSwatch({ name, color, onLight }: { name: string; color: string; onLight?: boolean }) {
  return (
    <div id={`token-${name}`} className="flex flex-col gap-1 items-center">
      <div
        className="w-10 h-10 rounded-button border border-white-10"
        style={{ background: onLight ? '#ffffff' : undefined, position: 'relative' }}
      >
        <div className="absolute inset-0 rounded-button" style={{ background: color }} />
      </div>
      <span className="text-text-xxsmall text-[9px] font-mono">{name.split('-')[1]}</span>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-white-05 border border-white-10 rounded px-2 py-0.5 text-[10px] font-mono text-text-xsmall whitespace-nowrap">
      {children}
    </span>
  )
}

// State label — for describing component states (Default, Hover, Disabled)
function StateLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[6px]">
      <div className="w-[2px] h-3 rounded-full bg-accent-light opacity-60 shrink-0" />
      <span className="text-[10px] text-text-xxsmall uppercase tracking-wider">{children}</span>
    </div>
  )
}

// Sub-section label — label + right-extending rule, smaller than Section heading
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="label-xs shrink-0">{children}</span>
      <div className="flex-1 border-t border-white-10" />
    </div>
  )
}

// Preview box — wraps a component to signal "component lives here"
function PreviewBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-m bg-white-05 border border-white-10 rounded-card border-dashed ${className ?? ''}`}>
      {children}
    </div>
  )
}

// ── Token linking ──────────────────────────────────────────────────

const SPACING_TOKENS = new Set(['xxxs','xxs','xs','s','m','l','xl','xxl','xxxl'])
const RADIUS_TOKENS  = new Set(['popup','card','button','pill'])
const SHADOW_TOKENS  = new Set(['small','normal','big','button','dark'])
const BLUR_TOKENS    = new Set(['bg','heavy'])

// Static set of every token id that has a matching DOM element in this page.
// Using a static set instead of document.getElementById() at render time avoids
// the timing issue where React hasn't committed sibling elements yet.
const ALPHA_STEPS = ['05','10','20','30','40','50','60','70','80','90']
const KNOWN_TOKEN_IDS = new Set<string>([
  // Accent
  'token-accent','token-accent-hover','token-accent-dark','token-accent-dark-hover','token-accent-light','token-accent-ultra-light',
  // Secondary
  'token-secondary','token-secondary-hover','token-secondary-ultra-dark','token-secondary-surface',
  // Brand
  'token-brand-yellow','token-brand-purple','token-brand-blue',
  // Gradient
  'token-gradient-purple','token-gradient-blue','token-gradient-warm-light','token-gradient-warm-mid','token-gradient-warm-dark',
  // Credit / Avatar
  'token-credit-bg','token-credit-gold','token-credit-orange','token-avatar',
  // Status
  'token-status-alert','token-status-error','token-status-warning','token-status-success','token-status-positive','token-status-idle','token-status-info',
  // Text
  'token-text-title','token-text-subtitle','token-text-body','token-text-label','token-text-small','token-text-xsmall','token-text-dim','token-text-xxsmall',
  // Page / Footer
  'token-page-bg','token-page-divider','token-page-overlay','token-page-footer','token-footer-bg',
  // Nav
  'token-nav-hover-bg','token-nav-active-bg','token-nav-icon','token-nav-active-icon',
  // Card
  'token-card-bg','token-card-border','token-card-hover-bg','token-card-hover-border',
  // Forms
  'token-forms-bg','token-forms-border','token-forms-focus-border','token-forms-error-border','token-forms-active-bg','token-forms-disabled-bg',
  // Chat
  'token-chat-ai-bubble','token-chat-ai-active','token-chat-user-bubble',
  // Header
  'token-header-icon-border','token-header-icon-hover-bg',
  // White / Black alpha
  ...ALPHA_STEPS.map(n => `token-white-${n}`),
  ...ALPHA_STEPS.map(n => `token-black-${n}`),
  // Spacing
  ...Array.from(SPACING_TOKENS, n => `token-spacing-${n}`),
  // Radius
  ...Array.from(RADIUS_TOKENS,  n => `token-radius-${n}`),
  // Shadow
  ...Array.from(SHADOW_TOKENS,  n => `token-shadow-${n}`),
  // Blur
  ...Array.from(BLUR_TOKENS,    n => `token-blur-${n}`),
])

// Map a single Tailwind class word → DOM element id (or null if not a known token)
function getTokenId(raw: string): string | null {
  // Strip Tailwind modifiers like hover:, focus:, group-hover:
  const word = raw.replace(/^[a-z-]+:/, '')
  // Skip arbitrary values
  if (word.includes('[') || word.includes(']')) return null

  // Color utilities: bg-, text-, border-, ring-, fill-, stroke-, from-, to-, via-, decoration-
  const colorM = word.match(/^(?:bg|text|border|ring|fill|stroke|from|to|via|decoration)-(.+)$/)
  if (colorM) {
    const rest = colorM[1]
    // Exclude raw size/weight keywords that follow text-
    if (['xs','sm','base','lg','xl','2xl','3xl','4xl','5xl','6xl'].includes(rest)) return null
    if (['transparent','white','black','current','inherit','none'].includes(rest)) return null
    return `token-${rest}`
  }

  // Spacing utilities
  const spaceM = word.match(/^(?:px|py|pt|pr|pb|pl|p|mx|my|mt|mr|mb|ml|m|gap|gap-x|gap-y)-(.+)$/)
  if (spaceM && SPACING_TOKENS.has(spaceM[1])) return `token-spacing-${spaceM[1]}`

  // Border radius
  const radM = word.match(/^rounded-(.+)$/)
  if (radM && RADIUS_TOKENS.has(radM[1])) return `token-radius-${radM[1]}`

  // Box shadow
  const shadowM = word.match(/^shadow-(.+)$/)
  if (shadowM && SHADOW_TOKENS.has(shadowM[1])) return `token-shadow-${shadowM[1]}`

  // Backdrop blur
  const blurM = word.match(/^backdrop-blur-(.+)$/)
  if (blurM && BLUR_TOKENS.has(blurM[1])) return `token-blur-${blurM[1]}`

  return null
}

function scrollToToken(tokenId: string) {
  const el = document.getElementById(tokenId)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.remove('token-highlight')
  void el.offsetWidth // force reflow so animation re-triggers
  el.classList.add('token-highlight')
  setTimeout(() => el.classList.remove('token-highlight'), 2900)
}

// Renders an anatomy class string with clickable underlined tokens.
// Uses KNOWN_TOKEN_IDS (static set) instead of DOM lookup to avoid
// render-time timing issues with sibling elements not yet committed.
function TokenCell({ value }: { value: string }) {
  const parts = value.split(/(\s+)/)
  return (
    <span className="font-mono text-[10px] min-w-0 break-all leading-relaxed">
      {parts.map((part, i) => {
        const trimmed = part.trim()
        if (!trimmed) return <span key={i}>{part}</span>
        const tokenId = getTokenId(trimmed)
        if (tokenId && KNOWN_TOKEN_IDS.has(tokenId)) {
          return (
            <button
              key={i}
              onClick={() => scrollToToken(tokenId)}
              className="text-secondary underline decoration-dotted underline-offset-2 hover:text-secondary-hover transition-colors cursor-pointer font-mono text-[10px]"
            >
              {part}
            </button>
          )
        }
        return <span key={i} className="text-text-xsmall">{part}</span>
      })}
    </span>
  )
}
