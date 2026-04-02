import Image from 'next/image'
import { cn } from '@/lib/cn'

type ButtonSize = 'xs' | 's' | 'm' | 'l'
type ButtonVariant = 'primary' | 'secondary'

interface CreditButtonProps {
  label: string
  credits: number
  size?: ButtonSize
  variant?: ButtonVariant
  fullWidth?: boolean
  onClick?: () => void
  className?: string
}

const SIZE_CLASSES: Record<ButtonSize, { button: string; icon: number }> = {
  xs: { button: 'text-xs leading-none px-s py-xxs', icon: 12 },
  s:  { button: 'text-sm leading-none px-m py-xs', icon: 16 },
  m:  { button: 'text-sm leading-none px-xl py-s', icon: 18 },
  l:  { button: 'text-base leading-none px-xxl py-m', icon: 20 },
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:   'bg-accent text-white border-none shadow-button hover:bg-accent-hover',
  secondary: 'bg-transparent text-text-body border border-white-20 hover:bg-white-05 hover:border-white-30',
}

export default function CreditButton({
  label,
  credits,
  size = 's',
  variant = 'primary',
  fullWidth = false,
  onClick,
  className,
}: CreditButtonProps) {
  const { button, icon } = SIZE_CLASSES[size]

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-xxs font-medium rounded-pill transition-colors cursor-pointer',
        VARIANT_CLASSES[variant],
        button,
        fullWidth && 'w-full',
        className,
      )}
    >
      {label}
      <Image src="/credit.png" alt="credits" width={icon} height={icon} className="object-contain" />
      {credits}
    </button>
  )
}
