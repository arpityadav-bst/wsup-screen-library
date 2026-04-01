'use client'

import { cn } from '@/lib/cn'

export interface FilterPill {
  label: string
  count?: number
  dot?: string  // optional colored dot (CSS color value)
}

interface FilterPillsProps {
  pills: FilterPill[]
  active: string
  onChange: (label: string) => void
}

export default function FilterPills({ pills, active, onChange }: FilterPillsProps) {
  return (
    <div className="flex gap-xs overflow-x-auto scroll-hide">
      {pills.map((pill) => {
        const isActive = pill.label === active
        return (
          <button
            key={pill.label}
            onClick={() => onChange(pill.label)}
            className={cn(
              'shrink-0 flex items-center gap-xxs px-m py-xs rounded-pill text-sm font-medium transition-colors whitespace-nowrap',
              isActive
                ? 'border border-secondary text-secondary bg-transparent'
                : 'border border-white-20 text-text-body bg-transparent hover:bg-white-05 hover:border-white-30'
            )}
          >
            {pill.dot && (
              <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: pill.dot }} />
            )}
            {pill.label}
            {pill.count !== undefined && (
              <span className={cn(isActive ? 'text-secondary/70' : 'text-text-dim')}>
                {pill.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
