'use client'

interface CoachmarkProps {
  characterName: string
  onDismiss: () => void
}

const GameIconSvg = () => (
  <svg width="22" height="22" viewBox="0 0 512 512" fill="white">
    <path d="M350.18 221.99c-.24 0-.48 0-.72 0-15.49.4-27.73 13.3-27.33 28.84.41 15.23 12.88 27.32 28.02 27.32.26 0 .52 0 .78-.01 15.5-.4 27.73-13.3 27.34-28.8-.39-15.26-12.9-27.35-28.08-27.35zM396.91 147.2c-.25 0-.5 0-.75 0-15.5.42-27.73 13.3-27.34 28.83.41 15.23 12.9 27.32 28.03 27.32.26 0 .53 0 .8-.01 15.49-.39 27.74-13.3 27.34-28.79-.41-15.26-12.89-27.35-28.08-27.35z" />
    <path d="M511.97,363.87c-1.2-66.8-9.09-134.35-22.03-202.53-10.54-47.37-48.46-89.56-109.05-92.65-1.56-.06-3.08-.1-4.56-.1-40.44,0-50.39,23.26-98.08,23.26-.47,0-.94,0-1.42,0-6.91-.04-13.82-.06-20.73-.06s-13.93,.02-20.9,.06c-.48,0-.95,0-1.42,0-47.69,0-57.68-23.25-98.08-23.25-1.48,0-3,.03-4.56,.1-60.6,3.09-99.7,45.17-109.09,92.65C9.09,229.53,1.2,297.06,0,363.86c-.29,46.51,45.63,77.45,75.93,79.57,1.23,.09,2.45,.14,3.67,.14,56.81,0,102.1-98.93,136.79-98.94,13.23,.08,26.47,.12,39.7,.12s26.35-.04,39.52-.12c34.69,0,79.96,98.95,136.8,98.95,1.22,0,2.44-.05,3.67-.14,30.29-2.12,77.4-33.27,75.89-79.57Zm-78.55,41.67c-.07,0-.13,0-.2,.01-.27,.02-.54,.03-.81,.03-5.11,0-12.77-3.83-21.55-10.79-11.7-9.27-23.68-22.49-35.26-35.27-24.65-27.2-47.93-52.88-79.99-52.89-.08,0-.15,0-.23,0-13.04,.08-26.26,.11-39.3,.11s-26.38-.04-39.47-.12c-.08,0-.15,0-.23,0-32.05,0-55.34,25.69-79.99,52.89-11.58,12.78-23.56,25.99-35.26,35.26-8.78,6.96-16.43,10.79-21.54,10.79-.27,0-.54-.01-.8-.03-.07,0-.14-.01-.21-.02-12.44-.87-40.59-17.35-40.58-41.25,1.12-61.94,8.1-125.96,21.33-195.69,3.25-16.26,11.62-31.2,23.6-42.09,13.14-11.95,30.41-18.8,49.94-19.83,.96-.04,1.9-.06,2.81-.06,11.51,0,18.31,2.93,29.58,7.79,15.12,6.52,35.82,15.46,68.5,15.46,.56,0,1.14,0,1.71,0,6.84-.04,13.77-.06,20.61-.06s13.66,.02,20.44,.06c.57,0,1.14,0,1.71,0,32.68,0,53.38-8.94,68.49-15.46,11.26-4.86,18.06-7.8,29.59-7.8,.91,0,1.86,.02,2.82,.06,44.26,2.34,66.99,33.65,73.58,62.41,13.19,69.65,20.14,133.6,21.25,195.48,0,.19,0,.37,.01,.56,.75,22.95-28.16,39.56-40.57,40.43Z" />
    <path d="M190.01,193.68h-28.34v-28.34c0-10.49-8.51-19-19-19s-19,8.51-19,19v28.34h-28.34c-10.49,0-19,8.51-19,19s8.51,19,19,19h28.34v28.34c0,10.49,8.51,19,19,19s19-8.51,19-19v-28.34h28.34c10.49,0,19-8.51,19-19s-8.51-19-19-19Z" />
  </svg>
)

export default function Coachmark({ characterName, onDismiss }: CoachmarkProps) {
  return (
    <div className="absolute top-full right-0 mt-xs w-[220px] bg-coachmark-bg border border-accent rounded-card shadow-button z-50">
      {/* Caret */}
      <div className="absolute -top-[10px] right-[17px]" style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid var(--accent)' }} />
      <div className="absolute -top-xs right-[18px]" style={{ width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderBottom: '9px solid var(--coachmark-bg)' }} />

      <div className="p-s">
        {/* Label + dismiss */}
        <div className="flex items-center justify-between mb-xs">
          <span className="label-xs text-white">New Feature</span>
          <button
            onClick={onDismiss}
            className="p-xs flex items-center justify-center rounded-full hover:bg-white-10 transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="var(--popup-close-icon)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Feature row button */}
        <button className="flex items-center gap-xs mb-xs bg-white-10 rounded-button pr-xs overflow-hidden hover:bg-white-20 transition-colors w-full">
          <div className="px-xs flex items-center justify-center shrink-0 bg-accent self-stretch" style={{ borderRadius: 'var(--radius-button) 0 0 var(--radius-button)' }}>
            <GameIconSvg />
          </div>
          <p className="text-xs font-medium text-text-title leading-tight py-xs">Play Games</p>
        </button>

        {/* Description */}
        <p className="text-sm text-white-50">
          A whole new way to connect with {characterName}!
        </p>
      </div>
    </div>
  )
}
