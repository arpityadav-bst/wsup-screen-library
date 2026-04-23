'use client'

interface TabsProps {
  className?: string
  children: React.ReactNode
}

interface TabProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

export function Tabs({ className = '', children }: TabsProps) {
  return <div className={`flex w-full border-b border-white-10 ${className}`}>{children}</div>
}

export function Tab({ active, onClick, children }: TabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 border-none bg-transparent cursor-pointer flex items-center justify-center text-sm whitespace-nowrap ${
        active ? 'font-semibold text-text-title' : 'font-normal text-text-dim'
      }`}
    >
      <span className="relative inline-flex items-center gap-xs pt-xs pb-[10px]">
        {children}
        {active && (
          <span className="absolute left-0 right-0 bottom-0 h-xxxs rounded-pill bg-accent" />
        )}
      </span>
    </button>
  )
}
