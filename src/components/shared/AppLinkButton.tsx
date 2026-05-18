import Image from 'next/image'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

interface AppLinkButtonProps {
  href: string
  logo: string
  name: string
}

// External-app suggestion link button. 32px logo + name + external link icon.
// Used in wind-down surfaces (popup + details popup) for the "Other apps to try"
// section pointing users to alternative AI-companion apps (Polybuzz, Talkie).
// Whole row is a clickable anchor that opens in a new tab — communicates "tap to
// leave for this app" via the trailing external-link icon. Replaces the earlier
// AppCard (static visual) since the button-style reads more like an off-ramp.
export default function AppLinkButton({ href, logo, name }: AppLinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-s px-m py-s rounded-card border border-white-10 bg-white-05 hover:bg-white-10 hover:border-white-20 transition-colors w-full text-left no-underline"
    >
      <Image src={logo} alt={name} width={32} height={32} className="rounded-button shrink-0" />
      <span className="flex-1 text-sm font-medium text-text-title">{name}</span>
      <ExternalLinkIcon size={14} className="text-text-small shrink-0" />
    </a>
  )
}
