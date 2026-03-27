'use client'

interface ProfileTabBarProps {
  tabs: { label: string; count: number }[]
  active: string
  onChange: (tab: string) => void
}

export default function ProfileTabBar({ tabs, active, onChange }: ProfileTabBarProps) {
  return (
    <div className="flex w-full mt-m md:mt-0 border-b border-white-10 shrink-0 sticky top-0 z-[5] bg-page-bg">
      {tabs.map((tab) => {
        const isActive = tab.label === active
        return (
          <button
            key={tab.label}
            onClick={() => onChange(tab.label)}
            className={`flex-1 border-none bg-transparent py-xs pb-[10px] text-sm cursor-pointer relative ${
              isActive ? 'font-semibold text-text-title' : 'font-normal text-text-dim'
            }`}
          >
            {tab.label}
            <span className="mx-xxs opacity-35">·</span>
            {tab.count}
            {isActive && (
              <span className="absolute bottom-0 left-[20%] right-[20%] h-xxxs rounded-pill bg-accent" />
            )}
          </button>
        )
      })}
    </div>
  )
}
