'use client'

import { useState } from 'react'
import FilterPills from '@/components/ui/FilterPills'
import type { FilterPill } from '@/components/ui/FilterPills'
import DormantCharacterCard from './DormantCharacterCard'
import type { DormantCharacter } from './DormantCharacterCard'
import ProfileCharacterCard from './ProfileCharacterCard'

interface ActiveCharacter {
  name: string
  chats: string
  img: string
  rank: number
  trend: number
  tag?: string
}

interface MyCharactersDashboardProps {
  activeChars: ActiveCharacter[]
  needsAttentionChars: DormantCharacter[]
  onCharMenu?: (name: string) => void
  onDormantMenu?: (name: string, stateType: string) => void
  onStatesInfo?: () => void
}

export default function MyCharactersDashboard({
  activeChars,
  needsAttentionChars,
  onCharMenu,
  onDormantMenu,
  onStatesInfo,
}: MyCharactersDashboardProps) {
  const [filter, setFilter] = useState('All')
  const [creditFaqOpen, setCreditFaqOpen] = useState(false)

  const actionableChars = needsAttentionChars.filter(c => c.stateType !== 'removed')
  const removedChars = needsAttentionChars.filter(c => c.stateType === 'removed')
  const totalCount = activeChars.length + needsAttentionChars.length
  const pills: FilterPill[] = [
    { label: 'All', count: totalCount },
    { label: 'Active', count: activeChars.length, dot: '#398b4d' },
    { label: 'Needs Attention', count: actionableChars.length, dot: '#ffc32a' },
    { label: 'Removed', count: removedChars.length, dot: '#de5a48' },
  ]

  const showNeedsAttention = filter === 'All' || filter === 'Needs Attention'
  const showActive = filter === 'All' || filter === 'Active'
  const showRemoved = filter === 'All' || filter === 'Removed'

  return (
    <div className="px-m md:px-4xl py-m flex flex-col gap-xl">
      {/* Filter pills + info icon */}
      <div className="flex items-center gap-xs">
        <div className="flex-1 min-w-0">
          <FilterPills pills={pills} active={filter} onChange={setFilter} />
        </div>
        {onStatesInfo && (
          <button
            onClick={onStatesInfo}
            className="shrink-0 w-xxl h-xxl flex items-center justify-center rounded-pill bg-transparent border border-white-20 cursor-pointer hover:bg-white-05 hover:border-white-30 transition-colors text-text-dim"
            title="What do these states mean?"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </button>
        )}
      </div>

      {/* Needs Attention section */}
      {showNeedsAttention && actionableChars.length > 0 && (
        <div className="flex flex-col gap-s">
          <div className="flex items-center gap-xs">
            <svg className="w-l h-l text-status-warning shrink-0" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" />
              <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" />
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" />
            </svg>
            <span className="text-sm font-semibold text-text-title">Needs Attention</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-l px-xs bg-white-10 rounded-pill text-xxs font-semibold text-text-small">
              {actionableChars.length}
            </span>
          </div>

          {/* Info banner */}
          <p className="p-s bg-status-warning/[0.08] border border-status-warning/[0.15] rounded-card text-xs leading-relaxed text-text-small">
            Review and revive these characters to keep them active, or they will be removed.
          </p>

          {/* Credit cost FAQ accordion */}
          <div>
            <button
              onClick={() => setCreditFaqOpen(!creditFaqOpen)}
              className="flex items-center gap-xxs bg-transparent border-none cursor-pointer p-0 text-text-dim hover:text-text-small transition-colors"
            >
              <span className="text-xs">Why does this cost credits?</span>
              <svg
                className="w-s h-s transition-transform"
                style={{ transform: creditFaqOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {creditFaqOpen && (
              <p className="mt-xs text-xs leading-relaxed text-text-small">
                Every revival goes through a content review to keep the platform safe for everyone. The 20-credit fee helps us maintain fast, high-quality reviews so your character can get back online quickly. Credits are deducted only when you submit your edits.
              </p>
            )}
          </div>

          {/* Actionable cards */}
          {actionableChars.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-s md:gap-s">
              {actionableChars.map((char) => (
                <DormantCharacterCard key={char.name} {...char} onMenu={() => onDormantMenu?.(char.name, char.stateType)} />
              ))}
            </div>
          )}

        </div>
      )}

      {/* Divider between sections */}
      {showNeedsAttention && actionableChars.length > 0 && showActive && activeChars.length > 0 && (
        <div className="h-px bg-white-10" />
      )}

      {/* Active Characters section */}
      {showActive && activeChars.length > 0 && (
        <div className="flex flex-col gap-s">
          <div className="flex items-center gap-xs">
            <span className="text-sm font-semibold text-text-title">Active Characters</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-l px-xs bg-white-10 rounded-pill text-xxs font-semibold text-text-small">
              {activeChars.length}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-s md:gap-xl">
            {activeChars.map((c) => (
              <ProfileCharacterCard key={c.name} {...c} onMenu={() => onCharMenu?.(c.name)} />
            ))}
          </div>
        </div>
      )}

      {/* Divider before removed */}
      {showRemoved && removedChars.length > 0 && ((showActive && activeChars.length > 0) || (showNeedsAttention && actionableChars.length > 0)) && (
        <div className="h-px bg-white-10" />
      )}

      {/* Removed section — bottom of page, terminal state */}
      {showRemoved && removedChars.length > 0 && (
        <div className="flex flex-col gap-s">
          <div className="flex items-center gap-xs">
            <span className="text-sm font-semibold text-text-title">Removed</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-l px-xs bg-white-10 rounded-pill text-xxs font-semibold text-text-small">
              {removedChars.length}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-s md:gap-s">
            {removedChars.map((char) => (
              <DormantCharacterCard key={char.name} {...char} onMenu={() => onDormantMenu?.(char.name, char.stateType)} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
