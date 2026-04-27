'use client'

import { useEffect, useState } from 'react'
import BottomSheet from './BottomSheet'
import CenterPopup from './CenterPopup'
import CloseButton from './CloseButton'
import CoinIcon from './CoinIcon'
import ChevronIcon from './ChevronIcon'
import LoginSheet from './LoginSheet'
import DailyCheckInCard from './DailyCheckInCard'
import { useAuth } from '@/lib/AuthContext'

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
}

const GATE_HEADLINE = 'Sign in to claim your credits'
const GATE_SUBTITLE = 'Unlock free credits and start chatting.'

function BalancePill({ balance }: { balance: number }) {
  return (
    <div className="flex items-center gap-xs px-xs py-xxxs rounded-pill bg-white-10 shrink-0">
      <span className="text-xs text-text-small">Balance</span>
      <div className="flex items-center gap-xxxs">
        <CoinIcon size={12} />
        <span className="text-xs text-text-title tabular-nums">{balance}</span>
      </div>
    </div>
  )
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
          <BalancePill balance={balance} />
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

export default function StreakClaimPopup({ open, onClose, ...rest }: StreakClaimPopupProps) {
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
        headline={GATE_HEADLINE}
        subtitle={GATE_SUBTITLE}
      />
    </>
  )
}
