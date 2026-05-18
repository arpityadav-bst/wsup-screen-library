'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import WindDownPopup from './WindDownPopup'
import WindDownDetailsPopup from './WindDownDetailsPopup'
import DownloadDataSheet from '@/components/profile/DownloadDataSheet'

const EXPLORE_PATH = '/explore'

// Phase boundaries — Phase 2 (read-only) begins Mon May 25 2026; Phase 3 (landing-page mode)
// begins Fri Jun 19 2026. Used to swap the first-exposure popup body copy without redeploying.
const PHASE_2_START = new Date('2026-05-25T00:00:00').getTime()
const PHASE_3_START = new Date('2026-06-19T00:00:00').getTime()

function computePhase(): 1 | 2 | 3 {
  const now = Date.now()
  if (now >= PHASE_3_START) return 3
  if (now >= PHASE_2_START) return 2
  return 1
}

// Wind-down announcement orchestrator. Mounted globally in `app/layout.tsx`. The
// first-exposure popup is scoped to /explore and shows EVERY time the user lands
// there (no localStorage persistence — dismissal is in-memory only and resets on
// navigation). The details popup is only reachable from the popup, so it inherits
// the same /explore scope. DownloadDataSheet global mount listens for
// `wsup:open-download-data` so any "Download my data" CTA can open it.
//
// **Why every-load on /explore (no permanent dismissal):** designer call S35
// close — the wind-down message is critical enough to re-surface on every entry,
// not just first ever. The "Okay, I understand" CTA enforces acknowledgment
// per-visit, not per-device.
export default function WindDownNotice() {
  const pathname = usePathname()
  const [dismissed, setDismissed] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [downloadSheetOpen, setDownloadSheetOpen] = useState(false)
  // Phase starts at 1 on initial render (SSR-safe — both server and client agree).
  // useEffect post-hydrate updates to the real phase based on the current date so
  // when May 25 / Jun 19 cross, body copy swaps without redeploy.
  const [phase, setPhase] = useState<1 | 2 | 3>(1)

  useEffect(() => {
    setPhase(computePhase())
  }, [])

  // Reset dismissal whenever the user leaves /explore — coming back triggers the popup again.
  useEffect(() => {
    if (pathname !== EXPLORE_PATH) {
      setDismissed(false)
      setDetailsOpen(false)
    }
  }, [pathname])

  useEffect(() => {
    const handler = () => setDownloadSheetOpen(true)
    window.addEventListener('wsup:open-download-data', handler)
    return () => window.removeEventListener('wsup:open-download-data', handler)
  }, [])

  const showPopup = pathname === EXPLORE_PATH && !dismissed

  const dismissPopup = () => setDismissed(true)
  const handleReadMore = () => setDetailsOpen(true)

  return (
    <>
      <WindDownPopup
        open={showPopup}
        phase={phase}
        onAcknowledge={dismissPopup}
        onReadMore={handleReadMore}
      />

      <WindDownDetailsPopup
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />

      <DownloadDataSheet open={downloadSheetOpen} onClose={() => setDownloadSheetOpen(false)} />
    </>
  )
}
