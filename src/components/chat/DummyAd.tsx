'use client'

import Image from 'next/image'

interface DummyAdProps {
  open: boolean
  // Fires when the user taps anywhere on the ad — closes the ad surface AND fires whatever
  // post-ad logic the parent owns (sending the held draft, resetting the gate counter, etc.).
  onComplete: () => void
}

// Mobile-only fullscreen dummy ad — placeholder stand-in for the real rewarded-video ad SDK
// (AppLovin / AdMob / Unity Ads etc). Renders OVER the WatchAdSheet/Bubble at z-80, so the
// popup stays mounted behind and dismisses cleanly via the parent's completeAd flow when the
// ad closes.
//
// Implementation: the entire fullscreen surface is one giant button. Tapping anywhere on the
// ad — top bar, image, CTA, anywhere — closes it. This matches a common mobile-ad pattern
// (the ad surface is its own click-through to the App Store; tapping resolves the rewarded-watch
// criteria in this demo). Production wires the actual SDK and replaces this component wholesale;
// until then, the static image gives the Flutter dev a clear visual spec of what comes after
// "Watch ad" is tapped.
//
// Image asset lives at `public/dummy-ad.png` — a real mobile-ad screenshot (Homescapes "How to
// Loot?") used purely as a placeholder. Swap the file to test different ad creatives without
// touching the component.
export default function DummyAd({ open, onComplete }: DummyAdProps) {
  if (!open) return null

  return (
    <button
      type="button"
      onClick={onComplete}
      aria-label="Close ad — tap anywhere to continue"
      className="md:hidden fixed inset-0 bg-black p-0 m-0 border-0 cursor-pointer overflow-hidden"
      style={{ zIndex: 80, animation: 'fade-in 0.2s ease-out' }}
    >
      <Image
        src="/dummy-ad.png"
        alt="Sponsored ad placeholder"
        fill
        className="object-contain"
        priority
        sizes="100vw"
      />
    </button>
  )
}
