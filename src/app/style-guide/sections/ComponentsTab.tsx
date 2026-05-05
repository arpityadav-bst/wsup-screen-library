'use client'

import ButtonsSection from './components/ButtonsSection'
import FormsSection from './components/FormsSection'
import AuthPrimitivesSection from './components/AuthPrimitivesSection'
import TagsCardsSection from './components/TagsCardsSection'
import CoachmarkSection from './components/CoachmarkSection'
import CharacterCardSection from './components/CharacterCardSection'
import WidgetsSection from './components/WidgetsSection'
import CategoryTabsSection from './components/CategoryTabsSection'
import TabsSection from './components/TabsSection'
import BottomNavSection from './components/BottomNavSection'
import OverlaysSection from './components/OverlaysSection'
import MenuPopoverSection from './components/MenuPopoverSection'
import ToastSection from './components/ToastSection'
import FilterPillsSection from './components/FilterPillsSection'
import LifecycleSection from './components/LifecycleSection'
import ProfileCardsSection from './components/ProfileCardsSection'
import ProfileOverlaysSection from './components/ProfileOverlaysSection'
import UIUtilitiesSection from './components/UIUtilitiesSection'
import RewardCardsSection from './components/RewardCardsSection'

export default function ComponentsTab({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <>
      <ButtonsSection onSectionVisible={onSectionVisible} />
      <FormsSection onSectionVisible={onSectionVisible} />
      <AuthPrimitivesSection onSectionVisible={onSectionVisible} />
      <TagsCardsSection onSectionVisible={onSectionVisible} />
      <CoachmarkSection onSectionVisible={onSectionVisible} />
      <CharacterCardSection onSectionVisible={onSectionVisible} />
      <WidgetsSection onSectionVisible={onSectionVisible} />
      <CategoryTabsSection onSectionVisible={onSectionVisible} />
      <TabsSection onSectionVisible={onSectionVisible} />
      <FilterPillsSection onSectionVisible={onSectionVisible} />
      <OverlaysSection onSectionVisible={onSectionVisible} />
      <MenuPopoverSection onSectionVisible={onSectionVisible} />
      <ToastSection onSectionVisible={onSectionVisible} />
      <LifecycleSection onSectionVisible={onSectionVisible} />
      <BottomNavSection onSectionVisible={onSectionVisible} />
      <ProfileCardsSection onSectionVisible={onSectionVisible} />
      <ProfileOverlaysSection onSectionVisible={onSectionVisible} />
      <RewardCardsSection onSectionVisible={onSectionVisible} />
      <UIUtilitiesSection onSectionVisible={onSectionVisible} />
    </>
  )
}
