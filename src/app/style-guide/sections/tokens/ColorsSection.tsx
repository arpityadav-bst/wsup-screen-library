'use client'

import { Section, ColorGrid, SubLabel, AlphaSwatch } from '../../helpers'

export default function ColorsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Colors" title="Colors" onVisible={onSectionVisible}>

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
            <span className="text-text-xsmall text-xxs">cool</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-24 h-10 rounded-button" style={{ background: 'linear-gradient(135deg, var(--color-gradient-warm-light), var(--color-gradient-warm-dark))' }} />
            <span className="text-text-xsmall text-xxs">warm</span>
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
          <span className="text-text-xsmall text-xxs">border gradient</span>
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

      <ColorGrid label="Profile" swatches={[
        { name: 'profile-sheet-bg', hex: '#1a1a1a' },
      ]} />

      <ColorGrid label="Coachmark" swatches={[
        { name: 'coachmark-bg', hex: '#1e1d2e' },
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
          {[5,10,20,30,40,50,55,60,70,80,90].map(n => (
            <AlphaSwatch key={n} name={`black-${n}`} color={`rgba(0,0,0,${n/100})`} onLight />
          ))}
        </div>
      </div>

    </Section>
  )
}
