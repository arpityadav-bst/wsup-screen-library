'use client'

import { Section, SubLabel } from '../../helpers'
import ProfileCharacterCard from '@/components/profile/ProfileCharacterCard'
import ActivePersonaCard from '@/components/profile/ActivePersonaCard'
import StoryCard from '@/components/profile/StoryCard'
import RankBanner from '@/components/profile/RankBanner'
import StatsRow from '@/components/profile/StatsRow'
import BadgesWidget from '@/components/profile/BadgesWidget'
import { CHARACTERS, PROFILE, STORIES, BADGES } from '@/lib/mockData'

export default function ProfileCardsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Profile Cards" title="Profile Cards" onVisible={onSectionVisible}>

      {/* Active Persona */}
      <div className="w-full max-w-[414px]">
        <SubLabel>ActivePersonaCard</SubLabel>
        <ActivePersonaCard
          name="Blue Fire Girl"
          description="A fierce elemental spirit with an unquenchable spark."
          img="/chars/char5.webp"
        />
      </div>

      {/* ProfileCharacterCard grid */}
      <div className="w-full max-w-[480px]">
        <SubLabel>ProfileCharacterCard (active characters grid)</SubLabel>
        <div className="grid grid-cols-2 gap-s">
          {CHARACTERS.slice(0, 4).map((c) => (
            <ProfileCharacterCard key={c.name} {...c} />
          ))}
        </div>
      </div>

      {/* StatsRow */}
      <div className="w-full max-w-[414px]">
        <SubLabel>StatsRow</SubLabel>
        <StatsRow stats={PROFILE.stats} onFollowersOpen={() => {}} onFollowingOpen={() => {}} />
      </div>

      {/* RankBanner */}
      <div className="w-full max-w-[414px]">
        <SubLabel>RankBanner</SubLabel>
        <RankBanner position={PROFILE.rank.position} label={PROFILE.rank.label} />
      </div>

      {/* BadgesWidget */}
      <div className="w-full max-w-[414px]">
        <SubLabel>BadgesWidget</SubLabel>
        <BadgesWidget badges={BADGES.slice(0, 6)} onSeeAll={() => {}} onBadgeClick={() => {}} />
      </div>

      {/* StoryCard */}
      <div className="w-full max-w-[414px]">
        <SubLabel>StoryCard</SubLabel>
        <div className="flex flex-col gap-s">
          {STORIES.slice(0, 2).map((s) => (
            <StoryCard key={s.id} {...s} />
          ))}
        </div>
      </div>

    </Section>
  )
}
