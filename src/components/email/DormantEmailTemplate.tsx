const INACTIVE_CHARS = [
  { name: 'Mika', chats: '18.1K chats', deadline: 'Removed in 42 days', img: '/chars/char10.webp' },
]

const POLICY_CHARS = [
  { name: 'Joo Jaekyung', chats: '48.4K chats', deadline: 'Removed in 38 days', img: '/chars/char12.webp' },
]

const REVIEW_CHARS = [
  { name: 'Harlo', chats: '21.8K chats', img: '/chars/char11.webp' },
]

const REJECTED_CHARS = [
  { name: 'Roblox Story', chats: '90.4K chats', deadline: 'Removed in 38 days', img: '/chars/char13.webp' },
]

export default function DormantEmailTemplate() {
  const totalCount = INACTIVE_CHARS.length + POLICY_CHARS.length + REVIEW_CHARS.length + REJECTED_CHARS.length

  return (
    <div style={{ width: '100%', maxWidth: 600, background: '#171717', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)', overflow: 'hidden', fontFamily: "'Rubik', sans-serif" }}>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '28px 24px 20px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="wsup.ai" width={104} height={24} style={{ display: 'inline-block' }} />
      </div>
      <Divider />

      {/* Greeting */}
      <div style={{ padding: '28px 24px 0' }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, color: '#ffffff', margin: '0 0 12px' }}>Hi Creator,</h2>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          {totalCount} of your characters on wsup.ai need your attention. Review and take action to keep them active.
        </p>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'flex', gap: 10, padding: '20px 24px', flexWrap: 'wrap' as const }}>
        <StatPill dot="rgba(255,255,255,0.4)" value={String(INACTIVE_CHARS.length)} label="Inactive" />
        <StatPill dot="#ffc32a" value={String(POLICY_CHARS.length)} label="Policy Review" />
        <StatPill dot="#82a1ff" value={String(REVIEW_CHARS.length)} label="Under Review" />
        <StatPill dot="#de5a48" value={String(REJECTED_CHARS.length)} label="Rejected" />
      </div>

      {/* Inactive characters */}
      {INACTIVE_CHARS.length > 0 && (
        <div style={{ padding: '0 24px' }}>
          <SectionHeader label="Inactive" count={INACTIVE_CHARS.length} dotColor="rgba(255,255,255,0.4)" />
          {INACTIVE_CHARS.map((char, i) => (
            <CharRow key={char.name} {...char} badge="Inactive" badgeType="inactive" isLast={i === INACTIVE_CHARS.length - 1} />
          ))}
        </div>
      )}

      <SectionDivider />

      {/* Policy Review characters */}
      {POLICY_CHARS.length > 0 && (
        <div style={{ padding: '0 24px' }}>
          <SectionHeader label="Policy Review" count={POLICY_CHARS.length} dotColor="#ffc32a" />
          {POLICY_CHARS.map((char, i) => (
            <CharRow key={char.name} {...char} badge="Policy Review" badgeType="policy" isLast={i === POLICY_CHARS.length - 1} />
          ))}
        </div>
      )}

      <SectionDivider />

      {/* Under Review characters */}
      {REVIEW_CHARS.length > 0 && (
        <div style={{ padding: '0 24px' }}>
          <SectionHeader label="Under Review" count={REVIEW_CHARS.length} dotColor="#82a1ff" />
          {REVIEW_CHARS.map((char, i) => (
            <ReviewRow key={char.name} {...char} isLast={i === REVIEW_CHARS.length - 1} />
          ))}
        </div>
      )}

      <SectionDivider />

      {/* Rejected characters */}
      {REJECTED_CHARS.length > 0 && (
        <div style={{ padding: '0 24px' }}>
          <SectionHeader label="Rejected" count={REJECTED_CHARS.length} dotColor="#de5a48" />
          {REJECTED_CHARS.map((char, i) => (
            <CharRow key={char.name} {...char} badge="Rejected" badgeType="rejected" isLast={i === REJECTED_CHARS.length - 1} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{ padding: '24px 24px 0' }}>
        <a href="#" style={{ display: 'block', width: '100%', height: 48, background: '#4a3ec6', color: '#ffffff', border: 'none', borderRadius: 9999, fontSize: 16, fontWeight: 500, textAlign: 'center', lineHeight: '48px', textDecoration: 'none', boxSizing: 'border-box' }}>
          Review My Characters
        </a>
      </div>

      {/* What you can do */}
      <div style={{ padding: '28px 24px 0' }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: '#ffffff', margin: '0 0 12px' }}>What you can do</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            'Review each character on your dashboard and take action',
            'Edit and re-submit characters through the edit character flow',
            'Revive costs 20 credits per character (covers content review)',
            'Characters under review typically take 24–48 hours',
          ].map((item) => (
            <li key={item} style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, paddingLeft: 16, position: 'relative' as const, marginBottom: 8 }}>
              <span style={{ position: 'absolute' as const, left: 0, color: 'rgba(255,255,255,0.3)' }}>•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div style={{ padding: '28px 24px', marginTop: 8 }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
          You&apos;re receiving this because you created characters on wsup.ai
        </p>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <FooterLink label="Unsubscribe" />
          <Sep />
          <FooterLink label="Privacy Policy" />
          <Sep />
          <FooterLink label="Terms of Service" />
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.6, margin: '12px 0 0' }}>
          wsup.ai 2026
        </p>
      </div>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function Divider() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 24px' }} />
}

function SectionDivider() {
  return (
    <div style={{ padding: '0 24px' }}>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />
    </div>
  )
}

function Sep() {
  return <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 6px' }}>|</span>
}

function StatPill({ dot, value, label }: { dot: string; value: string; label: string }) {
  return (
    <div style={{ flex: '1 1 calc(50% - 5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 9999 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0 }} />
      <span style={{ fontSize: 14, fontWeight: 500, color: '#ffffff' }}>{value}</span>
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
    </div>
  )
}

function SectionHeader({ label, count, dotColor }: { label: string; count: number; dotColor: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0 4px' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
      <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)', borderRadius: 100, padding: '1px 8px' }}>{count}</span>
    </div>
  )
}

const BADGE_STYLES: Record<string, { background: string; color: string }> = {
  inactive: { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' },
  policy: { background: 'rgba(255,195,42,0.15)', color: '#ffc32a' },
  rejected: { background: 'rgba(222,90,72,0.15)', color: '#f08070' },
}

function CharRow({ name, badge, badgeType, chats, deadline, img, isLast }: {
  name: string; badge: string; badgeType: string
  chats: string; deadline?: string; img: string; isLast: boolean
}) {
  const badgeStyle = BADGE_STYLES[badgeType] || BADGE_STYLES.inactive

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)', gap: 12 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={name} width={48} height={48} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#ffffff' }}>{name}</span>
          <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 100, whiteSpace: 'nowrap' as const, ...badgeStyle }}>{badge}</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{chats}</div>
      </div>
      <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
        {deadline && <div style={{ fontSize: 12, color: '#ffc32a', fontWeight: 500, whiteSpace: 'nowrap' as const }}>{deadline}</div>}
        <a href="#" style={{ fontSize: 12, color: '#82a1ff', textDecoration: 'none', display: 'inline-block', marginTop: 4, cursor: 'pointer' }}>Revive →</a>
      </div>
    </div>
  )
}

function ReviewRow({ name, chats, img, isLast }: {
  name: string; chats: string; img: string; isLast: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)', gap: 12 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={name} width={48} height={48} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#ffffff' }}>{name}</span>
          <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 100, whiteSpace: 'nowrap' as const, background: 'rgba(130,161,255,0.15)', color: '#a3bfff' }}>Under Review</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{chats}</div>
      </div>
      <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>In progress</div>
      </div>
    </div>
  )
}

function FooterLink({ label }: { label: string }) {
  return <a href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{label}</a>
}
