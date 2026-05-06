'use client'

import Button from '@/components/ui/Button'
import CloseButton from '@/components/ui/CloseButton'
import InfoIcon from '@/components/ui/InfoIcon'
import { SAFETY_VARIANTS, type SafetyVariant } from '@/lib/safetyVariants'
import {
  HeartHandsIllustration,
  MedicalIllustration,
  FinancialIllustration,
} from './SafetyIllustrations'

interface SafetyBannerProps {
  variant: SafetyVariant
  onClose: () => void
}

const ILLUSTRATIONS: Record<SafetyVariant, React.ComponentType<{ size?: number }>> = {
  'self-harm': HeartHandsIllustration,
  'medical': MedicalIllustration,
  'financial': FinancialIllustration,
}

function navigate(href: string) {
  if (href.startsWith('tel:') || href.startsWith('mailto:')) {
    window.location.href = href
  } else {
    window.open(href, '_blank', 'noopener,noreferrer')
  }
}

export default function SafetyBanner({ variant, onClose }: SafetyBannerProps) {
  const config = SAFETY_VARIANTS[variant]
  const Illustration = ILLUSTRATIONS[variant]

  // Stretch=true (mobile): secondary content-driven + nowrap (longer label fits one line); primary takes flex-1.
  // Stretch=false (desktop): both content-driven, sit inline.
  const renderButtons = (stretch: boolean) => (
    <>
      {config.secondaryAction && (
        <Button
          variant="secondary"
          size="m"
          className={stretch ? 'shrink-0 whitespace-nowrap' : ''}
          onClick={() => navigate(config.secondaryAction!.href)}
        >
          {config.secondaryAction.label}
        </Button>
      )}
      <Button
        variant="primary"
        size="m"
        className={stretch ? 'flex-1 whitespace-nowrap' : ''}
        onClick={() => navigate(config.primaryAction.href)}
      >
        {config.primaryAction.label}
      </Button>
    </>
  )

  const sourceLine = (
    <div className="flex items-start gap-xxs">
      <InfoIcon size={12} className="text-text-xsmall shrink-0 mt-[2px]" />
      <p className="text-xs text-text-xsmall leading-snug">
        {config.sourceText}{' '}
        <a
          href={config.learnMoreHref}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Learn more
        </a>
      </p>
    </div>
  )

  return (
    <aside
      role="alert"
      // Mobile: bg-profile-sheet-bg (#1a1a1a solid) — opaque; needed because the mobile banner is an absolute overlay over arbitrary chat content.
      // Desktop: bg-white-05 — matches DormancyBanner desktop exactly so both top-of-chat banners read as the same elevated-dark surface family.
      className="bg-profile-sheet-bg md:bg-white-05 border-b border-white-10 shrink-0 px-m py-m"
      style={{ animation: 'fade-in 0.25s ease-out' }}
    >
      {/* MOBILE — vertical stacked: row 1 [illust + heading + ×], row 2 [buttons full-row], row 3 [source line] */}
      <div className="md:hidden">
        <div className="flex items-start gap-m">
          <div className="shrink-0">
            <Illustration size={56} />
          </div>
          <p className="flex-1 min-w-0 text-sm text-text-title leading-snug pt-xxs">{config.heading}</p>
          <CloseButton onClose={onClose} ariaLabel="Dismiss alert" className="-mr-icon-btn -mt-icon-btn shrink-0" />
        </div>
        <div className="flex items-stretch gap-s mt-m">
          {renderButtons(true)}
        </div>
        <div className="mt-m">
          {sourceLine}
        </div>
      </div>

      {/* DESKTOP — single horizontal row with the heading + source line stacked in their own column to the right of a smaller illustration.
          Heading and source line share the same left edge (column-aligned). items-center vertically centers the illustration / buttons / × against the text column. */}
      <div className="hidden md:flex items-center gap-m">
        <div className="shrink-0">
          <Illustration size={48} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-xs">
          <p className="text-sm text-text-title leading-snug">{config.heading}</p>
          {sourceLine}
        </div>
        <div className="flex items-center gap-s shrink-0">
          {renderButtons(false)}
        </div>
        <CloseButton onClose={onClose} ariaLabel="Dismiss alert" className="-mr-icon-btn shrink-0" />
      </div>
    </aside>
  )
}
