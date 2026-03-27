'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import CharacterCard from '@/components/shared/CharacterCard'

export default function CharacterCardSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Character Card" title="Character Card" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Variants</SubLabel>
        <div className="flex gap-4 flex-wrap">
          {[
            { name: 'Elle the Unfiltered', description: 'A fiercely independent woman with a sharp wit.', image: '/chars/char3.webp', tags: [{ label: 'Girlfriend' }, { label: 'Bold' }, { label: 'Sarcastic' }], rank: '#1,204', chats: 12600000 },
            { name: 'Rinne Tsukishiro', description: 'A quiet anime girl who blossoms into something magical.', image: '/chars/char4.webp', tags: [{ label: 'Anime' }, { label: 'Shy' }, { label: 'Sweet' }], rank: '#24,891', chats: 999900 },
            { name: 'Duke', description: 'Brooding, mysterious, and dangerously charming.', image: '/chars/char5.webp', tags: [{ label: 'Boyfriend' }, { label: 'Dark' }, { label: 'Mystery' }], rank: '#5', chats: 1100000 },
          ].map(char => (
            <div key={char.name} className="w-[160px]">
              <CharacterCard {...char} />
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['aspect-[9/16] w-full', 'Portrait 9:16 ratio — fills column'],
            ['rounded-card overflow-hidden', 'Card shape'],
            ['ring-1 ring-white-10 hover:ring-accent', 'Border: white-10 default → accent on hover'],
            ['shadow-normal', 'Drop shadow'],
            ['bg-gradient-to-t from-black via-black-60 via-[38%] to-transparent to-[62%]', 'Scrim gradient'],
            ['from-accent/20 to-transparent opacity-0 group-hover:opacity-100', 'Hover tint layer'],
            ['text-text-title font-semibold text-sm leading-tight truncate min-w-0', 'Name — no shrink-0 or flex-1'],
            ['text-text-body text-xs leading-snug mb-[6px] line-clamp-2', 'Description — text-body not text-small'],
            ['text-xxs font-normal px-xs py-[3px] rounded-pill bg-white-10 text-white-80 border border-white-10', 'Tag pill'],
            ['bg-accent hover:bg-accent-hover px-m py-xs rounded-pill', 'Chat CTA button'],
            ['opacity-0 translate-y-[6px] group-hover:opacity-100 group-hover:translate-y-0', 'Chat CTA slide-up animation'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>
      </div>

    </Section>
  )
}
