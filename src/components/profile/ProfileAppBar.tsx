interface ProfileAppBarProps {
  handle: string
  onMenuOpen: () => void
}

export default function ProfileAppBar({ handle, onMenuOpen }: ProfileAppBarProps) {
  return (
    <div className="md:hidden flex items-center h-3xxxl px-xs border-b border-white-10 shrink-0 z-[2]"
      style={{ background: 'rgba(13,13,13,0.80)', backdropFilter: 'blur(24px)' }}
    >
      <button className="flex items-center justify-center w-xxxl h-xxxl rounded-button text-text-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p className="flex-1 text-center font-semibold text-base text-text-title">{handle}</p>
      <button onClick={onMenuOpen} className="flex items-center justify-center w-xxxl h-xxxl rounded-button text-text-body">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="19" r="1.5" fill="currentColor" />
        </svg>
      </button>
    </div>
  )
}
