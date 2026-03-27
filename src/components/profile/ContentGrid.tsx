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
      <div className="p-s pb-xl">
        {stories.map(s => <StoryCard key={s.id} {...s} />)}
      </div>
    )
  }

  return (
    <div className="p-s pb-m">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-s">
        {characters.map((c) => (
          <ProfileCharacterCard key={c.name} {...c} onMenu={() => onCharMenu?.(c.name)} />
        ))}
      </div>
    </div>
  )
}
