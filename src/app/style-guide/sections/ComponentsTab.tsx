'use client'

import ButtonsSection from './components/ButtonsSection'
import FormsSection from './components/FormsSection'
import TagsCardsSection from './components/TagsCardsSection'
import CoachmarkSection from './components/CoachmarkSection'
import CharacterCardSection from './components/CharacterCardSection'
import WidgetsSection from './components/WidgetsSection'
import CategoryTabsSection from './components/CategoryTabsSection'
import BottomNavSection from './components/BottomNavSection'

export default function ComponentsTab({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <>
      <ButtonsSection onSectionVisible={onSectionVisible} />
      <FormsSection onSectionVisible={onSectionVisible} />
      <TagsCardsSection onSectionVisible={onSectionVisible} />
      <CoachmarkSection onSectionVisible={onSectionVisible} />
      <CharacterCardSection onSectionVisible={onSectionVisible} />
      <WidgetsSection onSectionVisible={onSectionVisible} />
      <CategoryTabsSection onSectionVisible={onSectionVisible} />
      <BottomNavSection onSectionVisible={onSectionVisible} />
    </>
  )
}
