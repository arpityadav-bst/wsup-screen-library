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

  // Secondary content-driven + nowrap (longer label fits one line); primary takes flex-1. Asymmetric stretch — see taste.md.
  const renderButtons = () => (
    <>
      {config.secondaryAction && (
        <Button
          variant="secondary"
          size="m"
          className="shrink-0 whitespace-nowrap"
          onClick={() => navigate(config.secondaryAction!.href)}
        >
          {config.secondaryAction.label}
        </Button>
      )}
      {config.primaryAction && (
        <Button
          variant="primary"
          size="m"
          className="flex-1 whitespace-nowrap"
          onClick={() => navigate(config.primaryAction!.href)}
        >
          {config.primaryAction.label}
        </Button>
      )}
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

  // Single vertical layout for both viewports (PM directive — match production wsup.ai).
  // Mobile: full-bleed banner anchored to top of viewport (border-b only).
  // Desktop: same layout chrome wrapped as a centered card (rounded-card + full border + max-width). Parent mount handles centering.
  return (
    <aside
      role="alert"
      className="bg-profile-sheet-bg shrink-0 px-m py-m border-b border-white-10 md:border md:rounded-card md:max-w-popup-narrow md:mx-auto md:shadow-popup"
      style={{ animation: 'fade-in 0.25s ease-out' }}
    >
      <div className="flex items-center gap-m">
        <div className="shrink-0">
          <Illustration size={56} />
        </div>
        <p className="flex-1 min-w-0 text-[15px] font-medium text-text-title leading-snug">{config.heading}</p>
        <CloseButton onClose={onClose} ariaLabel="Dismiss alert" className="self-start -mr-icon-btn -mt-icon-btn shrink-0" />
      </div>
      {(config.primaryAction || config.secondaryAction) && (
        <div className="flex items-stretch gap-s mt-m">
          {renderButtons()}
        </div>
      )}
      <div className="mt-m">
        {sourceLine}
      </div>
    </aside>
  )
}
