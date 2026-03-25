import Image from 'next/image'
import Link from 'next/link'

const columns = [
  {
    heading: 'CATEGORIES',
    links: [
      { label: 'Recommended', href: '#' },
      { label: 'Anime', href: '#' },
      { label: 'Romantic', href: '#' },
      { label: 'Romantic', href: '#' },
      { label: 'AI Games', href: '#' },
    ],
  },
  {
    heading: 'COMPANY',
    links: [
      { label: 'About us', href: '#' },
      { label: 'App Download', href: '#' },
    ],
  },
  {
    heading: 'SUPPORT',
    links: [
      { label: 'AI Companion', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
]

const socialLinks = [
  {
    label: 'Discord',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18.7684 6.44342C17.4872 5.87788 16.1347 5.47666 14.7454 5.25C14.5555 5.57784 14.3835 5.91497 14.23 6.26004C12.7501 6.04573 11.2452 6.04573 9.76531 6.26004C9.6118 5.91497 9.43979 5.57784 9.24997 5.25C7.85994 5.47926 6.50663 5.8814 5.22391 6.44637C2.6779 10.0784 1.98772 13.6202 2.33281 17.1117C3.82365 18.1741 5.49256 18.982 7.26685 19.5C7.66621 18.9818 8.0197 18.4323 8.32359 17.857C7.74662 17.6493 7.18976 17.393 6.65949 17.091C6.79906 16.9934 6.93556 16.8928 7.06746 16.7952C8.61055 17.4949 10.2948 17.8577 12 17.8577C13.7052 17.8577 15.3894 17.4949 16.9325 16.7952C17.0659 16.9002 17.2024 17.0008 17.3404 17.091C16.8093 17.3938 16.2514 17.6506 15.6733 17.8585C15.9766 18.4336 16.3301 18.9827 16.73 19.5C18.5058 18.984 20.176 18.1766 21.6671 17.1132C22.072 13.0641 20.9754 9.55487 18.7684 6.44342ZM8.76071 14.9644C7.79905 14.9644 7.00458 14.123 7.00458 13.0878C7.00458 12.0526 7.77145 11.2038 8.75764 11.2038C9.74384 11.2038 10.5322 12.0526 10.5153 13.0878C10.4984 14.123 9.74077 14.9644 8.76071 14.9644ZM15.2392 14.9644C14.276 14.9644 13.4846 14.123 13.4846 13.0878C13.4846 12.0526 14.2515 11.2038 15.2392 11.2038C16.227 11.2038 17.0092 12.0526 16.9923 13.0878C16.9754 14.123 16.2193 14.9644 15.2392 14.9644Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M15.9375 1.5H8.0625C6.32202 1.5 4.65282 2.1914 3.42211 3.42211C2.1914 4.65282 1.5 6.32202 1.5 8.0625L1.5 15.9375C1.5 17.678 2.1914 19.3472 3.42211 20.5779C4.65282 21.8086 6.32202 22.5 8.0625 22.5H15.9375C17.678 22.5 19.3472 21.8086 20.5779 20.5779C21.8086 19.3472 22.5 17.678 22.5 15.9375V8.0625C22.5 6.32202 21.8086 4.65282 20.5779 3.42211C19.3472 2.1914 17.678 1.5 15.9375 1.5ZM20.5312 15.9375C20.5312 18.4706 18.4706 20.5312 15.9375 20.5312H8.0625C5.52938 20.5312 3.46875 18.4706 3.46875 15.9375V8.0625C3.46875 5.52938 5.52938 3.46875 8.0625 3.46875H15.9375C18.4706 3.46875 20.5312 5.52938 20.5312 8.0625V15.9375Z" fill="currentColor"/>
        <path d="M12 6.75C10.6076 6.75 9.27226 7.30312 8.28769 8.28769C7.30312 9.27226 6.75 10.6076 6.75 12C6.75 13.3924 7.30312 14.7277 8.28769 15.7123C9.27226 16.6969 10.6076 17.25 12 17.25C13.3924 17.25 14.7277 16.6969 15.7123 15.7123C16.6969 14.7277 17.25 13.3924 17.25 12C17.25 10.6076 16.6969 9.27226 15.7123 8.28769C14.7277 7.30312 13.3924 6.75 12 6.75ZM12 15.2812C11.1301 15.2802 10.2961 14.9342 9.68096 14.319C9.06583 13.7039 8.71979 12.8699 8.71875 12C8.71875 10.1901 10.1914 8.71875 12 8.71875C13.8086 8.71875 15.2812 10.1901 15.2812 12C15.2812 13.8086 13.8086 15.2812 12 15.2812Z" fill="currentColor"/>
        <path d="M17.625 6.75C17.8321 6.75 18 6.58211 18 6.375C18 6.16789 17.8321 6 17.625 6C17.4179 6 17.25 6.16789 17.25 6.375C17.25 6.58211 17.4179 6.75 17.625 6.75Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Reddit',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M14.8605 4.46485C15.1043 5.52808 16.0322 6.32014 17.1402 6.32014C18.4337 6.32014 19.4824 5.24109 19.4824 3.91007C19.4824 2.57905 18.4337 1.5 17.1402 1.5C16.0092 1.5 15.0659 2.32482 14.8463 3.42195C12.952 3.63098 11.4729 5.28402 11.4729 7.28733C11.4729 7.29185 11.4729 7.29524 11.4729 7.29976C9.41288 7.38902 7.53184 7.99238 6.03843 8.94489C5.48389 8.5031 4.7877 8.23983 4.03221 8.23983C2.21925 8.23983 0.75 9.75163 0.75 11.6171C0.75 12.9707 1.52306 14.1368 2.63982 14.6757C2.74854 18.5965 6.90044 21.75 12.0077 21.75C17.1149 21.75 21.2723 18.5931 21.3755 14.6689C22.4835 14.1266 23.25 12.9639 23.25 11.6182C23.25 9.75276 21.7807 8.24096 19.9678 8.24096C19.2156 8.24096 18.5227 8.50197 17.9693 8.94037C16.4627 7.98109 14.5608 7.37772 12.4799 7.2975C12.4799 7.29411 12.4799 7.29185 12.4799 7.28846C12.4799 5.85349 13.5165 4.66258 14.8605 4.46711V4.46485ZM5.90666 13.7605C5.96157 12.5357 6.7522 11.5956 7.6713 11.5956C8.59041 11.5956 9.29319 12.5888 9.23829 13.8136C9.18338 15.0384 8.49707 15.4836 7.57687 15.4836C6.65666 15.4836 5.85176 14.9853 5.90666 13.7605ZM16.3452 11.5956C17.2654 11.5956 18.056 12.5357 18.1098 13.7605C18.1647 14.9853 17.3587 15.4836 16.4396 15.4836C15.5205 15.4836 14.8331 15.0395 14.7782 13.8136C14.7233 12.5888 15.425 11.5956 16.3452 11.5956ZM15.2515 16.5943C15.4239 16.6124 15.5337 16.7965 15.4667 16.9615C14.9012 18.3524 13.5659 19.3298 12.0077 19.3298C10.4495 19.3298 9.1153 18.3524 8.54868 16.9615C8.4817 16.7965 8.59151 16.6124 8.76391 16.5943C9.77416 16.4892 10.8668 16.4316 12.0077 16.4316C13.1486 16.4316 14.2401 16.4892 15.2515 16.5943Z" fill="currentColor"/>
      </svg>
    ),
  },
]

const policies = [
  'Community',
  'Law Enforcement Request',
  'Cookies',
  'DMCA & IP',
  'NCII',
  'Safety & Crisis',
  'Terms of Use',
  'Privacy Policy',
]

export default function Footer() {
  return (
    <footer className="bg-footer-bg border-t border-white-10 pt-xxxl pb-xl px-xl">
      <div className="max-w-[1100px] mx-auto">
        {/* Top row */}
        <div className="flex gap-xxxl mb-xxxl">
          {/* Brand */}
          <div className="shrink-0 w-[200px]">
            <div className="mb-s">
              <Image src="/logo.png" alt="wsup.ai" width={130} height={30} className="object-contain" />
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-1 gap-xl">
            {columns.map((col) => (
              <div key={col.heading} className="flex-1">
                <p className="text-text-dim text-xxs font-semibold tracking-widest uppercase mb-m">{col.heading}</p>
                <ul className="flex flex-col gap-s">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="text-text-body text-sm hover:text-text-title transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Follow Us */}
            <div className="flex-1">
              <p className="text-text-dim text-xxs font-semibold tracking-widest uppercase mb-m">FOLLOW US</p>
              <ul className="flex flex-col gap-s">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <Link href={s.href} className="group flex items-center gap-xs text-text-body text-sm hover:text-text-title transition-colors">
                      {s.icon}
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Policies row */}
        <div className="border-t border-white-10 pt-m mb-s">
          <p className="text-text-dim text-xxs font-semibold tracking-widest uppercase mb-s">POLICIES</p>
          <div className="flex flex-wrap gap-x-l gap-y-xs">
            {policies.map((p) => (
              <Link key={p} href="#" className="text-text-dim text-xs hover:text-text-small transition-colors">
                {p}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-m flex items-center justify-between">
          <p className="text-text-xxsmall text-xs">© 2026 wsup.ai. All rights reserved.</p>
          <button className="flex items-center gap-2 group cursor-pointer">
            <img src="/privacy-choices.png" alt="" width={34} height={16} className="object-contain opacity-30 group-hover:opacity-50 transition-opacity" />
            <span className="text-text-xxsmall text-xs underline group-hover:text-white-50 transition-colors">Your Privacy Choices</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
