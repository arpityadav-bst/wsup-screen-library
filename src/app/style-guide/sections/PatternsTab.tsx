'use client'

import HeaderSection from './patterns/HeaderSection'
import SidebarSection from './patterns/SidebarSection'
import ExploreDescriptionSection from './patterns/ExploreDescriptionSection'
import FAQAccordionSection from './patterns/FAQAccordionSection'
import WhatIsWsupSection from './patterns/WhatIsWsupSection'
import FooterSection from './patterns/FooterSection'
import MobileFooterSection from './patterns/MobileFooterSection'
import ChatHeaderSection from './patterns/ChatHeaderSection'
import ChatHeaderMenuSection from './patterns/ChatHeaderMenuSection'
import ChatMessagesSection from './patterns/ChatMessagesSection'
import ChatBarSection from './patterns/ChatBarSection'
import SuggestedRepliesSection from './patterns/SuggestedRepliesSection'
import ChatRightSidebarSection from './patterns/ChatRightSidebarSection'
import DormancyBannerSection from './patterns/DormancyBannerSection'
import SafetyBannerSection from './patterns/SafetyBannerSection'
import LowCreditsBannerSection from './patterns/LowCreditsBannerSection'
import MemoryLimitPopupSection from './patterns/MemoryLimitPopupSection'
import LoginSheetSection from './patterns/LoginSheetSection'
import StreakClaimSection from './patterns/StreakClaimSection'
import BlockedListSection from './patterns/BlockedListSection'

export default function PatternsTab({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <>
      <HeaderSection onSectionVisible={onSectionVisible} />
      <SidebarSection onSectionVisible={onSectionVisible} />
      <ExploreDescriptionSection onSectionVisible={onSectionVisible} />
      <FAQAccordionSection onSectionVisible={onSectionVisible} />
      <WhatIsWsupSection onSectionVisible={onSectionVisible} />
      <FooterSection onSectionVisible={onSectionVisible} />
      <MobileFooterSection onSectionVisible={onSectionVisible} />
      <ChatHeaderSection onSectionVisible={onSectionVisible} />
      <ChatHeaderMenuSection onSectionVisible={onSectionVisible} />
      <ChatMessagesSection onSectionVisible={onSectionVisible} />
      <ChatBarSection onSectionVisible={onSectionVisible} />
      <SuggestedRepliesSection onSectionVisible={onSectionVisible} />
      <ChatRightSidebarSection onSectionVisible={onSectionVisible} />
      <DormancyBannerSection onSectionVisible={onSectionVisible} />
      <SafetyBannerSection onSectionVisible={onSectionVisible} />
      <LowCreditsBannerSection onSectionVisible={onSectionVisible} />
      <MemoryLimitPopupSection onSectionVisible={onSectionVisible} />
      <LoginSheetSection onSectionVisible={onSectionVisible} />
      <StreakClaimSection onSectionVisible={onSectionVisible} />
      <BlockedListSection onSectionVisible={onSectionVisible} />
    </>
  )
}
