import Link from 'next/link'

const screens = [
  { name: 'Explore',  path: '/explore',  desc: 'Character discovery grid — desktop + mobile' },
  { name: 'Feed',     path: '/feed',     desc: 'Social feed with posts, stories, trending' },
  { name: 'Chat',     path: '/chat',     desc: 'AI character chat — desktop + mobile' },
  { name: 'Profile',  path: '/profile',  desc: 'User profile — own + other user' },
  { name: 'Login',    path: '/login',    desc: 'Login + sign up flow' },
  { name: 'Style Guide', path: '/style-guide', desc: 'Design tokens, colors, typography, components' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-page-bg p-xxl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-text-title mb-s">wsup.ai Screen Library</h1>
        <p className="text-text-body mb-xxl">Dev handoff screens — built from Figma patterns + Base DS tokens.</p>

        <div className="grid grid-cols-1 gap-m">
          {screens.map((screen) => (
            <Link
              key={screen.path}
              href={screen.path}
              className="flex items-center justify-between p-xl rounded-card border border-white-10 hover:bg-white-10 transition-colors"
            >
              <div>
                <p className="text-text-title font-medium">{screen.name}</p>
                <p className="text-text-small text-sm mt-xxs">{screen.desc}</p>
              </div>
              <span className="text-text-xxsmall text-sm">{screen.path} →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
