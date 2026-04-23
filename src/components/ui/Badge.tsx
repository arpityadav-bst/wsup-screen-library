type BadgeVariant = 'success' | 'warning' | 'alert' | 'neutral'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: React.ReactNode
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  success: 'bg-status-success/[0.15] border-status-success/[0.30] text-status-success',
  warning: 'bg-status-warning/[0.15] border-status-warning/[0.30] text-status-warning',
  alert:   'bg-status-alert/[0.15] border-status-alert/[0.30] text-status-alert',
  neutral: 'bg-white-08 border-white-10 text-text-small',
}

const SIZE_STYLES: Record<BadgeSize, string> = {
  sm: 'px-xxs py-[1px] text-xxs',
  md: 'px-xs py-xxxs text-xxs',
}

export default function Badge({ children, variant = 'neutral', size = 'md', icon }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-xxs self-start rounded-pill border font-medium whitespace-nowrap ${SIZE_STYLES[size]} ${VARIANT_STYLES[variant]}`}>
      {icon}
      {children}
    </span>
  )
}
