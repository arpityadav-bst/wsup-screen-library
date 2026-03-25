'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ── Icons ─────────────────────────────────────────────────────────────────────

function StoriesIcon({ active }: { active: boolean }) {
  const c = active ? 'white' : 'rgba(255,255,255,0.5)'
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <path d="M11.999 11.833C12.827 11.833 13.4998 12.5044 13.5 13.333V14.333C13.5 14.6092 13.2761 14.833 13 14.833C12.7239 14.833 12.5 14.6092 12.5 14.333V13.333C12.4998 13.0574 12.2754 12.833 11.999 12.833H4.00098C3.72457 12.833 3.50018 13.0574 3.5 13.333V14.333C3.5 14.6092 3.27614 14.833 3 14.833C2.72386 14.833 2.5 14.6092 2.5 14.333V13.333C2.50018 12.5044 3.17303 11.833 4.00098 11.833H11.999ZM12 5.33301C13.1045 5.33301 13.9998 6.22859 14 7.33301V8.66699C13.9998 9.77141 13.1045 10.667 12 10.667H4C2.89554 10.667 2.00018 9.77141 2 8.66699V7.33301C2.00018 6.22859 2.89554 5.33301 4 5.33301H12ZM13 1.16699C13.2761 1.16699 13.5 1.39085 13.5 1.66699V2.66699C13.4998 3.49527 12.8283 4.16699 12 4.16699H4C3.17168 4.16699 2.50018 3.49527 2.5 2.66699V1.66699C2.5 1.39085 2.72386 1.16699 3 1.16699C3.27614 1.16699 3.5 1.39085 3.5 1.66699V2.66699C3.50018 2.94298 3.72397 3.16699 4 3.16699H12C12.276 3.16699 12.4998 2.94298 12.5 2.66699V1.66699C12.5 1.39085 12.7239 1.16699 13 1.16699Z" fill={c} />
    </svg>
  )
}

function ExploreIcon({ active }: { active: boolean }) {
  const c = active ? 'white' : 'rgba(255,255,255,0.5)'
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <path d="M4 0C3.93993 1.68111 5.31889 3.06007 7 3C5.31889 2.93993 3.93993 4.31889 4 6C4.06007 4.31889 2.68111 2.93993 1 3C2.68111 3.06007 4.06007 1.68111 4 0Z" fill={c} />
      <path d="M10 2C9.89989 4.80184 12.1982 7.10011 15 7C12.1982 6.89989 9.89989 9.19816 10 12C10.1001 9.19816 7.80184 6.89989 5 7C7.80184 7.10011 10.1001 4.80184 10 2Z" fill={c} />
      <path d="M5 8C4.91991 10.2415 6.75852 12.0801 9 12C6.75852 11.9199 4.91991 13.7585 5 16C5.08009 13.7585 3.24148 11.9199 1 12C3.24148 12.0801 5.08009 10.2415 5 8Z" fill={c} />
    </svg>
  )
}

function CreateIcon({ active }: { active: boolean }) {
  const c = active ? 'white' : 'rgba(255,255,255,0.5)'
  return (
    <svg width="20" height="20" viewBox="0 0 16.2002 16.1098" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.09961 0C3.63799 0.000206197 0 3.53247 0 7.91504C0.000223913 12.2974 3.63813 15.8289 8.09961 15.8291C12.5613 15.8291 16.2 12.2976 16.2002 7.91504C16.2002 6.72347 15.9306 5.5915 15.4473 4.57715C15.3284 4.32804 15.0295 4.22213 14.7803 4.34082C14.531 4.4596 14.4252 4.75853 14.5439 5.00781C14.9649 5.8912 15.2002 6.87602 15.2002 7.91504C15.2 11.7221 12.0324 14.8291 8.09961 14.8291C4.167 14.8289 1.00022 11.722 1 7.91504C1 4.10788 4.16686 1.00021 8.09961 1C8.81636 1 9.50824 1.10318 10.1592 1.29492C10.4238 1.37264 10.7011 1.22154 10.7793 0.957031C10.8573 0.692195 10.7062 0.414028 10.4414 0.335938C9.69953 0.117408 8.91285 0 8.09961 0ZM13.3677 0.29159C13.2757 0.0491448 12.9243 0.0491449 12.8323 0.29159L12.6989 0.643244C12.45 1.29958 11.9196 1.81706 11.2468 2.05993L10.8864 2.19005C10.6379 2.27976 10.6379 2.62267 10.8864 2.71239L11.2468 2.84251C11.9196 3.08538 12.45 3.60286 12.6989 4.25919L12.8323 4.61085C12.9243 4.85329 13.2757 4.85329 13.3677 4.61085L13.5011 4.25919C13.75 3.60286 14.2804 3.08538 14.9532 2.84251L15.3136 2.71239C15.5621 2.62267 15.5621 2.27976 15.3136 2.19005L14.9532 2.05993C14.2804 1.81706 13.75 1.29958 13.5011 0.643244L13.3677 0.29159ZM7.6 7.41463V4.79268C7.6 4.51654 7.82386 4.29268 8.1 4.29268C8.37614 4.29268 8.6 4.51654 8.6 4.79268V7.41463H11.3C11.5761 7.41463 11.8 7.63849 11.8 7.91463C11.8 8.19078 11.5761 8.41463 11.3 8.41463H8.6V11.0368C8.59987 11.3129 8.37606 11.5368 8.1 11.5368C7.82394 11.5368 7.60013 11.3129 7.6 11.0368V8.41463H4.89961C4.62365 8.41442 4.39961 8.19065 4.39961 7.91463C4.39961 7.63862 4.62365 7.41484 4.89961 7.41463H7.6Z" fill={c} />
    </svg>
  )
}

const CHAT_ICON_URL = '/icons/icon-chat.svg'

function ChatsIcon({ active }: { active: boolean }) {
  const color = active ? 'white' : 'rgba(255,255,255,0.5)'
  return (
    <div
      style={{
        width: 20,
        height: 20,
        flexShrink: 0,
        backgroundColor: color,
        maskImage: `url('${CHAT_ICON_URL}')`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url('${CHAT_ICON_URL}')`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}

const PROFILE_ICON_URL = '/icons/icon-profile.svg'

function ProfileIcon({ active }: { active: boolean }) {
  const color = active ? 'white' : 'rgba(255,255,255,0.5)'
  return (
    <div
      style={{
        width: 20,
        height: 20,
        flexShrink: 0,
        backgroundColor: color,
        maskImage: `url('${PROFILE_ICON_URL}')`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url('${PROFILE_ICON_URL}')`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}

// ── Nav items ─────────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Stories',      href: '/stories',          Icon: StoriesIcon  },
  { label: 'Explore',      href: '/explore',           Icon: ExploreIcon  },
  { label: 'Create',       href: '/create-story',      Icon: CreateIcon   },
  { label: 'Chats',        href: '/chat',              Icon: ChatsIcon    },
  { label: 'Profile',      href: '/profile',           Icon: ProfileIcon  },
]

const activeGradient = 'linear-gradient(90deg, rgba(114,233,241,0.1) 0%, rgba(113,146,229,0.1) 50%, rgba(98,87,215,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)'

// ── Component ─────────────────────────────────────────────────────────────────

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-page-bg border-t border-white-10 flex items-center"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
    >
      {navItems.map(({ label, href, Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-[6px] py-[12px] flex-1 min-w-0"
            style={active ? { backgroundImage: activeGradient } : undefined}
          >
            <Icon active={active} />
            <span className={`text-xs font-normal leading-none truncate ${active ? 'text-text-title' : 'text-white-50'}`}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
