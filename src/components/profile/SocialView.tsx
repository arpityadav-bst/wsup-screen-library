'use client'

import { useState, useEffect } from 'react'
import SubpageHeader from '@/components/ui/SubpageHeader'

interface Person {
  name: string
  img: string
}

interface SocialViewProps {
  open: boolean
  initialTab: string
  onClose: () => void
  followers: Person[]
  following: Person[]
  followersCount: string
  followingCount: string
}

export default function SocialView({ open, initialTab, onClose, followers, following, followersCount, followingCount }: SocialViewProps) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [followed, setFollowed] = useState<Record<string, boolean>>({})
  const [unfollowed, setUnfollowed] = useState<Record<string, boolean>>({})

  useEffect(() => { if (open) setActiveTab(initialTab) }, [open, initialTab])

  if (!open) return null

  const isFollowingTab = activeTab === 'Following'
  const data = isFollowingTab ? following : followers

  return (
    <div
      className="fixed inset-0 z-50 bg-page-bg flex flex-col"
      style={{ animation: 'slide-in-right 0.26s cubic-bezier(0.32,0.72,0,1) forwards' }}
    >
      <SubpageHeader backLabel="Profile" onBack={onClose} border={false} />

      {/* Tab bar */}
      <div className="flex w-full border-b border-white-10 shrink-0">
        {['Followers', 'Following'].map(tab => {
          const isActive = tab === activeTab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 border-none bg-transparent py-xs pb-[10px] text-sm cursor-pointer relative ${
                isActive ? 'font-semibold text-text-title' : 'font-normal text-text-dim'
              }`}
            >
              {tab}<span className="mx-xxs opacity-35">·</span>{tab === 'Followers' ? followersCount : followingCount}
              {isActive && <span className="absolute bottom-0 left-[20%] right-[20%] h-xxxs rounded-pill bg-accent" />}
            </button>
          )
        })}
      </div>

      {/* List */}
      <div className="flex-1 min-h-0 overflow-y-auto pb-[72px]" style={{ scrollbarWidth: 'none' }}>
        {data.map((f, i) => {
          const toggled = isFollowingTab ? unfollowed[f.name] : followed[f.name]
          const toggle = () => isFollowingTab
            ? setUnfollowed(prev => ({ ...prev, [f.name]: !prev[f.name] }))
            : setFollowed(prev => ({ ...prev, [f.name]: !prev[f.name] }))
          const label = isFollowingTab ? (toggled ? 'Follow' : 'Following') : (toggled ? 'Following' : 'Follow back')
          const filled = isFollowingTab ? !toggled : toggled

          return (
            <div key={f.name} className={`flex items-center px-l py-s ${i < data.length - 1 ? 'border-b border-white-05' : ''}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.img} alt={f.name} className="w-[48px] h-[48px] rounded-full object-cover shrink-0 bg-white-20" />
              <span className="flex-1 ml-s font-semibold text-base text-text-title">{f.name}</span>
              <div
                onClick={toggle}
                className={`text-center w-[108px] py-xs rounded-pill text-sm font-semibold cursor-pointer shrink-0 transition-colors ${
                  filled
                    ? 'bg-white-80 text-accent'
                    : 'bg-transparent border border-white-20 text-text-body'
                }`}
              >
                {label}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
