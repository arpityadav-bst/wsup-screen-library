import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'ghost'
type ButtonSize = 'xs' | 's' | 'm' | 'l'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent border-none text-white font-medium shadow-button hover:bg-accent-hover',
  secondary: 'bg-transparent border border-white-20 text-text-body font-medium hover:bg-white-05 hover:border-white-30',
  dark: 'bg-accent-dark border-none text-white font-medium hover:bg-accent-dark-hover',
  ghost: 'bg-white-10 border border-white-30 text-text-title font-medium backdrop-blur-bg hover:bg-white-20 hover:border-white-40',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: 'text-xs leading-none px-s py-xxs',
  s: 'text-sm leading-none px-m py-xs',
  m: 'text-sm leading-none px-xl py-s',
  l: 'text-base leading-none px-xxl py-m',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'm',
  fullWidth,
  disabled,
  className,
  children,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`flex items-center justify-center rounded-pill cursor-pointer transition-colors ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
