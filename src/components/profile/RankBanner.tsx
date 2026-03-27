import Image from 'next/image'

interface RankBannerProps {
  position: number
  label: string
}

export default function RankBanner({ position, label }: RankBannerProps) {
  return (
    <button className="w-full py-xxs px-m bg-white-10 backdrop-blur-bg border-b border-white-10 flex items-center justify-center gap-xxs relative overflow-hidden cursor-pointer">
      {/* Shimmer sweep */}
      <div
        className="absolute top-0 bottom-0 w-1/4 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)',
          animation: 'shimmer-sweep 6s linear infinite',
        }}
      />
      {/* Trophy — same asset as header */}
      <Image src="/trophy.png" alt="Leaderboard" width={22} height={22} className="object-contain relative z-[1] shrink-0 -my-xs" />
      <span className="text-xs text-text-small relative z-[1]">
        Currently{' '}
        <span className="font-semibold text-credit-gold">#{position}</span>
        {' '}on {label}
      </span>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 relative z-[1] text-secondary">
        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
