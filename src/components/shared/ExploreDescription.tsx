'use client'
import { useState } from 'react'

const text = "Explore AI Characters — Chat for Free Discover thousands of AI characters to chat with — for free, no sign up required. Browse by category, search by name, or explore what's trending. Whether you're looking for an AI boyfriend, anime companion, roleplay partner, or just someone to talk to, you'll find them here. Every character supports text chat, and many offer voice calling and image generation. Start a conversation now."

export default function ExploreDescription() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative">
      {!expanded ? (
        <div className="relative">
          <p className="text-text-small text-xs leading-relaxed line-clamp-1 pr-20">{text}</p>
          <div className="absolute inset-y-0 right-0 flex items-center pl-8"
            style={{ background: 'linear-gradient(to right, transparent, var(--page-bg) 40%)' }}>
            <button
              onClick={() => setExpanded(true)}
              className="text-text-small text-xs underline underline-offset-2 hover:text-text-body transition-colors shrink-0"
            >
              Read More
            </button>
          </div>
        </div>
      ) : (
        <p className="text-text-small text-xs leading-relaxed">
          {text}{' '}
          <button
            onClick={() => setExpanded(false)}
            className="text-text-small text-xs underline underline-offset-2 hover:text-text-body transition-colors"
          >
            Read Less
          </button>
        </p>
      )}
    </div>
  )
}
