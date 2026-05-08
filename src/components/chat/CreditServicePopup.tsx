'use client'

import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CloseButton from '@/components/ui/CloseButton'
import BuyCreditsPromoCard from '@/components/shared/BuyCreditsPromoCard'

interface CreditServicePopupProps {
  open: boolean
  onClose: () => void
  creditsRequired?: number
  onBuyCredits: () => void
}

function PopupContent({ creditsRequired, onBuyCredits, onClose }: {
  creditsRequired: number
  onBuyCredits: () => void
  onClose: () => void
}) {
  return (
    <>
      {/* Header — hex sparkle icon + title + absolute close */}
      <div className="relative flex flex-col items-center px-l pt-l pb-l gap-xs">
        <CloseButton onClose={onClose} className="absolute top-s right-s" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/icon-credit-hexagon.png" alt="" width={82} height={82} className="select-none" />
        <p className="text-xl font-semibold text-text-title text-center">{creditsRequired} more credits required</p>
      </div>

      {/* Actions — divider + label + buy credits promo */}
      <div className="flex flex-col gap-s px-l pt-l pb-l border-t border-white-10">
        <p className="label-xs text-text-small text-center">Top up your balance to continue</p>
        <BuyCreditsPromoCard onBuy={onBuyCredits} />
      </div>
    </>
  )
}

export default function CreditServicePopup({ open, onClose, creditsRequired = 2, onBuyCredits }: CreditServicePopupProps) {
  const props = { creditsRequired, onBuyCredits, onClose }
  return (
    <>
      <BottomSheet open={open} onClose={onClose} zIndex={70}>
        <PopupContent {...props} />
      </BottomSheet>
      <CenterPopup open={open} onClose={onClose} maxWidth="414px" zIndex={70}>
        <PopupContent {...props} />
      </CenterPopup>
    </>
  )
}
