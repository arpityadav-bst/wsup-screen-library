'use client'

import { useEffect, useState } from 'react'
import BottomSheet from './BottomSheet'
import CenterPopup from './CenterPopup'
import CloseButton from './CloseButton'
import CreditsBalancePill from './CreditsBalancePill'
import ChevronIcon from './ChevronIcon'
import LoginSheet from './LoginSheet'
import DailyCheckInCard from './DailyCheckInCard'
import { useAuth } from '@/lib/AuthContext'

export type StreakLoginVariant = 'standard' | 'promo'

interface StreakClaimPopupProps {
  open: boolean
  onClose: () => void
  balance: number
  streakDay: number
  tomorrowReward: number
  dailyCheckInEarn: number
  dailyCheckInClaimable?: boolean
  onClaimDailyCheckIn?: () => void
  onExploreEarn?: () => void
  loginVariant?: StreakLoginVariant
  onLoginVariantChange?: (variant: StreakLoginVariant) => void
}

type StreakLoginPreset = {
  headline: string
  subtitle: string
  mode: 'form' | 'cta'
  ctaLabel?: string
  footer?: string
}

export const STREAK_LOGIN_VARIANTS: Record<StreakLoginVariant, StreakLoginPreset> = {
  standard: {
    headline: 'Sign in to claim your credits',
    subtitle: 'Your streak follows you across all your devices.',
    mode: 'form',
  },
  promo: {
    headline: 'Save your free credits',
    subtitle: 'Sign in to keep your streak and credits across all your devices.',
    mode: 'cta',
    ctaLabel: 'Sign in to claim',
    footer: "We'll move your streak to your account on first sign-in.",
  },
}

function ExploreEarnLink({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="link text-xs bg-transparent border-none cursor-pointer inline-flex items-center gap-xxs self-center"
    >
      Need more? Explore other ways to earn
      <ChevronIcon direction="right" size={12} />
    </button>
  )
}

interface PopupContentProps extends Omit<StreakClaimPopupProps, 'open'> {
  dailyClaimed: boolean
  onClaimDaily: () => void
}

function PopupContent({
  onClose,
  balance,
  streakDay,
  tomorrowReward,
  dailyCheckInEarn,
  dailyCheckInClaimable,
  onExploreEarn,
  dailyClaimed,
  onClaimDaily,
}: PopupContentProps) {
  const dailyClaimable = dailyCheckInClaimable !== false && !dailyClaimed
  return (
    <div className="relative flex flex-col px-l pt-l pb-m">
      <CloseButton onClose={onClose} className="absolute top-xs right-xs" />

      {/* Header */}
      <div className="flex flex-col gap-xxs mb-l">
        <h2 className="font-semibold text-base text-text-title pr-xxxl">Claim your free credits!</h2>
        <div className="flex items-center justify-between gap-xs">
          <p className="text-sm text-text-small">Credits let you use premium features</p>
          <CreditsBalancePill label="Balance" value={balance} />
        </div>
      </div>

      {/* Action zone — Daily check-in card with Day badge + forward-looking footnote */}
      <div className="flex flex-col gap-s mb-l">
        <DailyCheckInCard
          dayBadge={streakDay}
          earnValue={dailyCheckInEarn}
          claimable={dailyClaimable}
          onClaim={onClaimDaily}
        />
        <p className="text-xs text-text-small px-xxs">
          Tomorrow · Get <span className="text-credit-gold font-semibold">+{tomorrowReward}</span>
        </p>
      </div>

      {/* Exit zone — divider then explore link */}
      <div className="border-t border-white-10 -mx-l mb-m" />
      <ExploreEarnLink onClick={onExploreEarn} />
    </div>
  )
}

export default function StreakClaimPopup({ open, onClose, loginVariant = 'standard', onLoginVariantChange, ...rest }: StreakClaimPopupProps) {
  const { isLoggedIn, login } = useAuth()
  const [pendingClaim, setPendingClaim] = useState<(() => void) | null>(null)
  const [loginGateOpen, setLoginGateOpen] = useState(false)
  const [dailyClaimed, setDailyClaimed] = useState(false)

  useEffect(() => {
    if (!open) {
      setPendingClaim(null)
      setLoginGateOpen(false)
      setDailyClaimed(false)
    }
  }, [open])

  const gateAction = (action: () => void) => {
    if (isLoggedIn) {
      action()
    } else {
      setPendingClaim(() => action)
      setLoginGateOpen(true)
    }
  }

  const handleSignIn = () => {
    const resume = pendingClaim
    login()
    setLoginGateOpen(false)
    setPendingClaim(null)
    resume?.()
  }

  const handleLoginGateClose = () => {
    setLoginGateOpen(false)
    setPendingClaim(null)
  }

  const handleClaimDaily = () =>
    gateAction(() => {
      setDailyClaimed(true)
      rest.onClaimDailyCheckIn?.()
    })

  const contentProps = {
    onClose,
    ...rest,
    dailyClaimed,
    onClaimDaily: handleClaimDaily,
  }

  return (
    <>
      <BottomSheet open={open} onClose={onClose} zIndex={70}>
        <PopupContent {...contentProps} />
      </BottomSheet>

      <CenterPopup open={open} onClose={onClose} maxWidth="440px" zIndex={70}>
        <PopupContent {...contentProps} />
      </CenterPopup>

      <LoginSheet
        open={loginGateOpen}
        onClose={handleLoginGateClose}
        onSignIn={handleSignIn}
        headline={STREAK_LOGIN_VARIANTS[loginVariant].headline}
        subtitle={STREAK_LOGIN_VARIANTS[loginVariant].subtitle}
        mode={STREAK_LOGIN_VARIANTS[loginVariant].mode}
        ctaLabel={STREAK_LOGIN_VARIANTS[loginVariant].ctaLabel}
        footer={STREAK_LOGIN_VARIANTS[loginVariant].footer}
        variantSwitcher={onLoginVariantChange ? {
          current: loginVariant,
          variants: [
            { id: 'standard', label: '1' },
            { id: 'promo', label: '2' },
          ],
          onChange: (id) => onLoginVariantChange(id as StreakLoginVariant),
        } : undefined}
      />
    </>
  )
}
