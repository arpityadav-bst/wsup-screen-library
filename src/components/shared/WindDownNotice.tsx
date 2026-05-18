'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import WindDownPopup from './WindDownPopup'
import WindDownDetailsPopup from './WindDownDetailsPopup'
import DownloadDataSheet from '@/components/profile/DownloadDataSheet'

const EXPLORE_PATH = '/explore'

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
