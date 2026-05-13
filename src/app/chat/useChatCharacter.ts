'use client'

import { useEffect, useState } from 'react'
import { CHARACTER_AVATAR, CHARACTER_IMAGE } from './chat-config'
import { readLikedCharacter } from '@/lib/onboardingDeck'

// First names only — used in the bubble feedback / memory-limit-popup heading where the surname feels formal.
function firstName(full: string) {
  return full.split(' ')[0] ?? full
}

// Maps the deck character image (/chars/charN.webp) to its avatar variant (/chars/avatars/charN.jpg).
function avatarFor(image: string) {
  return image.replace(/^\/chars\/(char\d+)\.webp$/, '/chars/avatars/$1.jpg')
}

export interface ChatCharacter {
  fullName: string
  shortName: string
  image: string
  avatar: string
}

const DEFAULT_CHARACTER: ChatCharacter = {
  fullName: 'Billie Eilish',
  shortName: 'Billie',
  image: CHARACTER_IMAGE,
  avatar: CHARACTER_AVATAR,
}

// Resolves the chat character based on onboarding state. When the user has liked a card via the onboarding deck,
// chat renders THAT character instead of the default Billie. Read on mount client-side; SSR returns the default
// so the initial paint matches what unauthenticated users see.
export function useChatCharacter(): ChatCharacter {
  const [character, setCharacter] = useState<ChatCharacter>(DEFAULT_CHARACTER)

  useEffect(() => {
    const liked = readLikedCharacter()
    if (!liked) return
    setCharacter({
      fullName: liked.name,
      shortName: firstName(liked.name),
      image: liked.image,
      avatar: avatarFor(liked.image),
    })
  }, [])

  return character
}
