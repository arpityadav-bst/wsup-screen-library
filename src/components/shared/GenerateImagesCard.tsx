import Link from 'next/link'

function GenerateImagesIcon({ uid }: { uid: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <defs>
        <linearGradient id={`${uid}-g0`} x1="4.86191" y1="0.692763" x2="14.9241" y2="16.0388" gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: 'var(--color-gradient-warm-light)' }} /><stop offset="0.481054" style={{ stopColor: 'var(--color-gradient-warm-mid)' }} /><stop offset="1" style={{ stopColor: 'var(--color-gradient-warm-dark)' }} />
        </linearGradient>
        <linearGradient id={`${uid}-g1`} x1="5.30241" y1="7.80492" x2="9.09022" y2="18.1685" gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: 'var(--color-gradient-warm-light)' }} /><stop offset="0.481054" style={{ stopColor: 'var(--color-gradient-warm-mid)' }} /><stop offset="1" style={{ stopColor: 'var(--color-gradient-warm-dark)' }} />
        </linearGradient>
        <linearGradient id={`${uid}-g2`} x1="4.68958" y1="3.55083" x2="7.28773" y2="7.51102" gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: 'var(--color-gradient-warm-light)' }} /><stop offset="0.481054" style={{ stopColor: 'var(--color-gradient-warm-mid)' }} /><stop offset="1" style={{ stopColor: 'var(--color-gradient-warm-dark)' }} />
        </linearGradient>
        <clipPath id={`${uid}-clip`}><rect width="16" height="16" fill="white" /></clipPath>
      </defs>
      <g clipPath={`url(#${uid}-clip)`}>
        <path d="M4.53613 0.5H11.4717C12.7049 0.500111 13.7015 0.930418 14.3906 1.65039C15.0815 2.37236 15.5 3.42454 15.5 4.73145V10.1621C15.5 11.0782 15.4455 12.4264 14.8584 13.5371C14.5705 14.0817 14.1561 14.5641 13.5547 14.9141C12.9516 15.265 12.1298 15.5 11 15.5H4C3.10347 15.5 2.26336 15.235 1.63379 14.4795C0.989831 13.7065 0.5 12.3425 0.5 10V4.73145C0.5 3.42454 0.91856 2.37233 1.61035 1.65039C2.30045 0.930326 3.29911 0.5 4.53613 0.5Z" stroke={`url(#${uid}-g0)`} />
        <path d="M16 10.1616V11.2688C16 11.4528 15.992 11.6376 15.976 11.8208C15.752 14.3488 13.996 16 11.4632 16H4.53599C3.25359 16 2.17119 15.584 1.39359 14.8288C1.08577 14.5459 0.828472 14.2126 0.632786 13.8432C0.896786 13.5216 1.19279 13.1696 1.48239 12.8168C1.90831 12.3088 2.32781 11.7954 2.74079 11.2768C3.18079 10.7312 4.34399 9.29599 5.95519 9.96959C6.28319 10.1056 6.57199 10.2976 6.83679 10.4664C7.48639 10.9 7.75839 11.028 8.21519 10.7792C8.72079 10.5072 9.04959 9.96959 9.39359 9.40799C9.57759 9.11039 9.76239 8.82239 9.96319 8.55759C10.8368 7.41919 12.1832 7.11439 13.3056 7.78799C13.8672 8.12399 14.348 8.54959 14.7968 8.98239C14.8928 9.07839 14.9888 9.16719 15.0768 9.25519C15.1968 9.37519 15.5992 9.77679 16 10.1616Z" fill={`url(#${uid}-g1)`} />
        <path d="M7.56321 5.4376C7.55841 5.98359 7.33944 6.50588 6.95342 6.89204C6.5674 7.27821 6.0452 7.49739 5.49921 7.5024C4.37281 7.5024 3.43521 6.564 3.43521 5.4376C3.43521 4.3112 4.37281 3.372 5.49921 3.372C6.62481 3.372 7.56321 4.3112 7.56321 5.4376Z" fill={`url(#${uid}-g2)`} />
      </g>
    </svg>
  )
}

interface GenerateImagesCardProps {
  className?: string
  uid?: string
}

export default function GenerateImagesCard({ className = '', uid = 'gi' }: GenerateImagesCardProps) {
  return (
    <Link
      href="/generate-images"
      className={`relative flex items-center gap-2 bg-white-05 border border-white-10 rounded-card px-3 py-[14px] hover:bg-white-10 transition-colors overflow-hidden h-[52px] ${className}`}
    >
      <GenerateImagesIcon uid={uid} />
      <span className="text-white-70 font-medium text-sm z-10 relative">Generate Images</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/chars/gen-image-chars.png" alt="" className="absolute top-1/2 -translate-y-1/2 h-[65px] w-auto object-contain" style={{ left: '155px' }} />
      <svg className="absolute right-3 z-10" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <defs>
          <linearGradient id={`${uid}-arrow`} x1="4" y1="10" x2="16" y2="10" gradientUnits="userSpaceOnUse">
            <stop style={{ stopColor: 'var(--color-gradient-warm-light)' }} />
            <stop offset="0.481" style={{ stopColor: 'var(--color-gradient-warm-mid)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-gradient-warm-dark)' }} />
          </linearGradient>
        </defs>
        <path d="M4 10h12M12 6l4 4-4 4" stroke={`url(#${uid}-arrow)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}
