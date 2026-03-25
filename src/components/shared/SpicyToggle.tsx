interface SpicyToggleProps {
  spicy: boolean
  onToggle: () => void
  className?: string
}

export default function SpicyToggle({ spicy, onToggle, className = '' }: SpicyToggleProps) {
  return (
    <div className={`flex flex-col items-center gap-[2px] cursor-pointer ${className}`} onClick={onToggle}>
      <span className={`text-xxs font-medium tracking-widest transition-colors ${spicy ? 'text-status-alert' : 'text-white-50'}`}>
        SPICY
      </span>
      <div className={`w-[36px] h-[14px] border rounded-full relative transition-colors ${spicy ? 'bg-status-alert border-status-alert' : 'bg-transparent border-white-50'}`}>
        <div className={`absolute top-[2px] w-[8px] h-[8px] rounded-full transition-all ${spicy ? 'left-[calc(100%-10px)] bg-white' : 'left-[2px] bg-white-50'}`} />
      </div>
    </div>
  )
}
