'use client'

type CheckboxVariant = 'primary' | 'success'

interface CheckboxProps {
  checked: boolean
  onChange?: (checked: boolean) => void
  variant?: CheckboxVariant
  'aria-label'?: string
}

export default function Checkbox({ checked, onChange, variant = 'primary', ...rest }: CheckboxProps) {
  const filledBg = variant === 'success' ? 'bg-status-success' : 'bg-accent'
  const tickColor = variant === 'success' ? 'text-black-80' : 'text-white'

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`size-[16px] rounded-[4px] flex items-center justify-center shrink-0 cursor-pointer transition-colors ${checked ? filledBg : 'bg-transparent border border-white-20'}`}
      {...rest}
    >
      {checked && (
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className={tickColor}>
          <path d="M2.5 6.2 L4.8 8.5 L9.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}
