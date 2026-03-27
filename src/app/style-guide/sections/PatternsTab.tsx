'use client'

import HeaderSection from './patterns/HeaderSection'
import SidebarSection from './patterns/SidebarSection'
import ExploreDescriptionSection from './patterns/ExploreDescriptionSection'
import FAQAccordionSection from './patterns/FAQAccordionSection'
import WhatIsWsupSection from './patterns/WhatIsWsupSection'
import FooterSection from './patterns/FooterSection'
import MobileFooterSection from './patterns/MobileFooterSection'
import ChatHeaderSection from './patterns/ChatHeaderSection'
import ChatMessagesSection from './patterns/ChatMessagesSection'
import ChatBarSection from './patterns/ChatBarSection'
import ChatRightSidebarSection from './patterns/ChatRightSidebarSection'

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
      <ChatMessagesSection onSectionVisible={onSectionVisible} />
      <ChatBarSection onSectionVisible={onSectionVisible} />
      <ChatRightSidebarSection onSectionVisible={onSectionVisible} />
    </>
  )
}
