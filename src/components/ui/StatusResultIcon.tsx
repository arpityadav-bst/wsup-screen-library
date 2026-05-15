'use client'

export type StatusResultVariant = 'success' | 'failure'

interface StatusResultIconProps {
  variant: StatusResultVariant
}

// 72px circular status icon used at the head of result steps (BuyCreditsResultStep,
// DownloadDataSheet ResultStep). Success = green checkmark in status-success chrome; failure =
// red X in status-alert chrome. Chrome: 15% fill + 30% border at the status color, 72px circle.
// Glyph: ✓ at 32px on success, ✕ at 28px on failure (success leans slightly larger because the
// checkmark's mass is concentrated to one side; X's mass is evenly distributed so it reads
// heavier at the same size).
export default function StatusResultIcon({ variant }: StatusResultIconProps) {
  const isSuccess = variant === 'success'
  return (
    <div
      className={`size-[72px] rounded-full flex items-center justify-center ${
        isSuccess
          ? 'bg-status-success/[0.15] border border-status-success/[0.30]'
          : 'bg-status-alert/[0.15] border border-status-alert/[0.30]'
      }`}
    >
      {isSuccess ? (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-status-success" aria-hidden>
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-status-alert" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}
