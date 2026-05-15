'use client'

import Image from 'next/image'

interface DummyAdProps {
  open: boolean
  // Fires when the user taps anywhere on the ad — closes the ad surface AND fires whatever
  // post-ad logic the parent owns (sending the held draft, resetting the gate counter, etc.).
  onComplete: () => void
}

// Fullscreen dummy ad — placeholder stand-in for the real rewarded-video ad SDK (AppLovin /
// AdMob / Unity Ads etc). Renders OVER the WatchAdSheet/Bubble at z-80, so the popup stays
// mounted behind and dismisses cleanly via the parent's completeAd flow when the ad closes.
//
// Implementation: the entire fullscreen surface is one giant button. Tapping anywhere on the
// ad — anywhere — closes it. This matches a common mobile-ad pattern (the ad surface is its
// own click-through to the App Store; tapping resolves the rewarded-watch criteria in this
// demo). Production wires the actual SDK and replaces this component wholesale; until then,
// the static images give the Flutter dev a clear visual spec of what comes after "Watch ad"
// is tapped.
//
// Two assets, one per orientation — designer's call (S34 follow-up): mobile shows the portrait
// Homescapes "How to Loot?" screenshot; desktop shows the landscape variant. Both renders are
// mounted at the same time and each hides itself on the wrong viewport (md:hidden / hidden
// md:block) so the parent doesn't have to know the viewport.
export default function DummyAd({ open, onComplete }: DummyAdProps) {
  if (!open) return null

  return (
    <button
      type="button"
      onClick={onComplete}
      aria-label="Close ad — tap anywhere to continue"
      className="fixed inset-0 bg-black p-0 m-0 border-0 cursor-pointer overflow-hidden"
      style={{ zIndex: 80, animation: 'fade-in 0.2s ease-out' }}
    >
      {/* Mobile — portrait */}
      <div className="md:hidden absolute inset-0">
        <Image
          src="/dummy-ad.png"
          alt="Sponsored ad placeholder"
          fill
          className="object-contain"
          priority
          sizes="100vw"
        />
      </div>
      {/* Desktop — landscape */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src="/dummy-ad-landscape.png"
          alt="Sponsored ad placeholder"
          fill
          className="object-contain"
          priority
          sizes="100vw"
        />
      </div>
    </button>
  )
}
