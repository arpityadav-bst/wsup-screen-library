'use client'

export default function DormantNotificationTextPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0e', display: 'flex', justifyContent: 'center', padding: '48px 16px' }}>
      <div style={{ width: '100%', maxWidth: 560 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>Text Email Preview</span>
        </div>
        <div style={{ background: '#ffffff', borderRadius: 8, padding: '40px 32px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontSize: 15, lineHeight: 1.85, color: '#3a3a3a' }}>

          <p style={{ margin: '0 0 20px', color: '#1a1a1a' }}>
            Hey Creator,
          </p>

          <p style={{ margin: '0 0 28px' }}>
            Your characters miss you. <strong style={{ color: '#1a1a1a' }}>4 of them</strong> need a quick check-in to stay active on wsup.ai.
          </p>

          {/* Character list */}
          <div style={{ margin: '0 0 32px', paddingLeft: 16, borderLeft: '2px solid #e5e5e5' }}>

            <div style={{ marginBottom: 24 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#1a1a1a' }}>Mika</strong>
                <span style={{ color: '#999', margin: '0 6px' }}>·</span>
                <span style={{ color: '#b08000' }}>Inactive</span>
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 14, color: '#777' }}>
                No new chats in 42 days. Revive to get back in distribution.
              </p>
              <a href="https://wsup.ai/edit-character?id=mika" style={{ fontSize: 14, color: '#4a3ec6', textDecoration: 'none' }}>Revive Mika →</a>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#1a1a1a' }}>Joo Jaekyung</strong>
                <span style={{ color: '#999', margin: '0 6px' }}>·</span>
                <span style={{ color: '#b08000' }}>Policy Review</span>
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 14, color: '#777' }}>
                Flagged for content. Edit and resubmit to resolve.
              </p>
              <a href="https://wsup.ai/edit-character?id=joo-jaekyung" style={{ fontSize: 14, color: '#4a3ec6', textDecoration: 'none' }}>Edit & resubmit →</a>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#1a1a1a' }}>Harlo</strong>
                <span style={{ color: '#999', margin: '0 6px' }}>·</span>
                <span style={{ color: '#4a3ec6' }}>Under Review</span>
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 14, color: '#777' }}>
                Your edits are being reviewed. Nothing to do — we&apos;ll let you know.
              </p>
            </div>

            <div>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#1a1a1a' }}>Roblox Story</strong>
                <span style={{ color: '#999', margin: '0 6px' }}>·</span>
                <span style={{ color: '#c0392b' }}>Rejected</span>
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 14, color: '#777' }}>
                Edits didn&apos;t pass. Revise and try again.
              </p>
              <a href="https://wsup.ai/edit-character?id=roblox-story" style={{ fontSize: 14, color: '#4a3ec6', textDecoration: 'none' }}>Edit & resubmit →</a>
            </div>

          </div>

          {/* CTA */}
          <p style={{ margin: '0 0 8px' }}>
            It takes about 2 minutes. Each revival is 20 credits.
          </p>
          <a href="https://wsup.ai/profile?tab=characters" style={{ display: 'inline-block', padding: '10px 24px', background: '#4a3ec6', color: '#ffffff', fontSize: 15, fontWeight: 500, borderRadius: 9999, textDecoration: 'none', margin: '8px 0 0' }}>
            Review my characters
          </a>

          {/* Closing */}
          <p style={{ margin: '32px 0 0', color: '#777' }}>
            Your characters have real fans waiting. A small effort keeps those conversations alive.
          </p>
          <p style={{ margin: '12px 0 0', color: '#1a1a1a' }}>
            — The wsup team
          </p>

          {/* Footer */}
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #eee', fontSize: 12, color: '#aaa', lineHeight: 1.8 }}>
            <p style={{ margin: 0 }}>You&apos;re receiving this because you created characters on wsup.ai.</p>
            <p style={{ margin: '4px 0 0' }}>
              <a href="#" style={{ color: '#aaa', textDecoration: 'underline' }}>Unsubscribe</a>
              {' · '}
              <a href="#" style={{ color: '#aaa', textDecoration: 'underline' }}>Privacy</a>
              {' · '}
              <a href="#" style={{ color: '#aaa', textDecoration: 'underline' }}>Terms</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
