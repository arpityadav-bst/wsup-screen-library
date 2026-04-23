type BadgeVariant = 'success' | 'warning' | 'alert' | 'neutral'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  icon?: React.ReactNode
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  success: 'bg-status-success/[0.15] border-status-success/[0.30] text-status-success',
  warning: 'bg-status-warning/[0.15] border-status-warning/[0.30] text-status-warning',
  alert:   'bg-status-alert/[0.15] border-status-alert/[0.30] text-status-alert',
  neutral: 'bg-white-08 border-white-10 text-text-small',
}

export default function Badge({ children, variant = 'neutral', icon }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-xxs self-start px-xs py-xxxs rounded-pill border text-xxs font-medium ${VARIANT_STYLES[variant]}`}>
      {icon}
      {children}
    </span>
  )
}
