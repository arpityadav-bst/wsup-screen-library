'use client'

import TrendArrow from '@/components/ui/TrendArrow'

interface Stat {
  label: string
  value: string
  trend: string
  up: boolean
}

interface StatsRowProps {
  stats: Stat[]
  onFollowersOpen: () => void
  onFollowingOpen: () => void
}

export default function StatsRow({ stats, onFollowersOpen, onFollowingOpen }: StatsRowProps) {
  return (
    <div className="flex items-stretch w-full px-m mt-m">
      {stats.map((s, i) => {
        const clickable = s.label === 'Followers' || s.label === 'Following'
        const onClick = s.label === 'Followers' ? onFollowersOpen : s.label === 'Following' ? onFollowingOpen : undefined
        return (
          <div key={s.label} className="flex items-stretch flex-1">
            {i > 0 && <div className="shrink-0 w-px bg-white-10 my-xxs" />}
            <div
              className={`flex flex-col items-center flex-1 py-xxs gap-xxxs ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={onClick}
            >
              <div className="flex items-center">
                <span className="font-semibold text-lg text-text-title leading-none">{s.value}</span>
                {clickable && (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="text-secondary">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-xxxs">
                <span className="text-xs text-text-xsmall leading-none">{s.label}</span>
                {s.trend && (
                  <span className={`flex items-center gap-xxxs text-xs font-medium leading-none ${s.up ? 'text-status-success' : 'text-status-alert'}`}>
                    {s.trend.replace(/[+\-%]/g, '')}
                    <TrendArrow trend={s.up ? 1 : -1} />
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
