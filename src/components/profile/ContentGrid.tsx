import ProfileCharacterCard from './ProfileCharacterCard'
import StoryCard from './StoryCard'

interface Character {
  name: string
  chats: string
  img: string
  rank: number
  trend: number
  tag?: string
}

interface Story {
  id: number
  character: { name: string; avatar: string; img: string }
  caption: string
  likes: number
  comments: number
  date: string
  time: string
}

interface ContentGridProps {
  activeTab: string
  characters: Character[]
  stories: Story[]
  onCharMenu?: (name: string) => void
}

export default function ContentGrid({ activeTab, characters, stories, onCharMenu }: ContentGridProps) {
  if (activeTab === 'Stories') {
    return (
      <>
        {/* Mobile */}
        <div className="px-s py-s pb-xl md:hidden">
          {stories.map(s => <StoryCard key={s.id} {...s} />)}
        </div>
        {/* Desktop */}
        <div className="hidden md:block py-l center-content-pad">
          <div className="max-w-[480px] mx-auto">
            {stories.map(s => <StoryCard key={s.id} {...s} />)}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Mobile */}
      <div className="px-s py-s pb-m md:hidden">
        <div className="grid grid-cols-2 gap-s">
          {characters.map((c) => (
            <ProfileCharacterCard key={c.name} {...c} onMenu={() => onCharMenu?.(c.name)} />
          ))}
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:block py-l center-content-pad">
        <div className="grid grid-cols-4 gap-xl">
          {characters.map((c) => (
            <ProfileCharacterCard key={c.name} {...c} onMenu={() => onCharMenu?.(c.name)} />
          ))}
        </div>
      </div>
    </>
  )
}
