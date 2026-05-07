// Personality-mapped avatar icons for ChatStyleSheet.
// Each of the 7 model personalities gets a distinct simple glyph — keeps WSUP visual
// cohesion (single shared icon set) while differentiating models within the same complexity tier.

const ClassicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M11 2L4 11h5l-1 7 8-9h-5l1-7z" fill="currentColor" />
  </svg>
)

const WeaverIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="7" cy="10" r="4.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="13" cy="10" r="4.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const StrategistIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M10 1.5V5M10 15v3.5M1.5 10H5M15 10h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
  </svg>
)

const StorytellerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="2.5" y="4" width="15" height="12" rx="0.6" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M10 4v12" stroke="currentColor" strokeWidth="1.4" />
    <path d="M5 8h3M12 8h3M5 11h3M12 11h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const LuminaryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M10 1.5L12.4 7.6L19 8.4L14 12.7L15.5 19L10 15.7L4.5 19L6 12.7L1 8.4L7.6 7.6Z" fill="currentColor" />
  </svg>
)

const ArchitectIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M10 2L17 6V14L10 18L3 14V6Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
    <path d="M3 6L10 10L17 6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M10 10V18" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

const VisionaryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M2 10C4 5.5 6.8 3.5 10 3.5S16 5.5 18 10C16 14.5 13.2 16.5 10 16.5S4 14.5 2 10Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <circle cx="10" cy="10" r="2.8" fill="currentColor" />
  </svg>
)

const PERSONALITY_ICONS: Record<string, React.FC> = {
  Classic: ClassicIcon,
  Weaver: WeaverIcon,
  Strategist: StrategistIcon,
  Storyteller: StorytellerIcon,
  Luminary: LuminaryIcon,
  Architect: ArchitectIcon,
  Visionary: VisionaryIcon,
}

export function PersonalityIcon({ personality }: { personality: string }) {
  const Icon = PERSONALITY_ICONS[personality] ?? ClassicIcon
  return <Icon />
}

export function ChatStyleAvatar({ personality }: { personality: string }) {
  return (
    <div className="size-10 rounded-full bg-white-10 flex items-center justify-center shrink-0 text-text-title">
      <PersonalityIcon personality={personality} />
    </div>
  )
}
