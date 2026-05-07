'use client'

import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'

export default function ToastSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Toast" title="Toast" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Inline preview — short message</SubLabel>
        <PreviewBox>
          <div className="backdrop-blur-popup bg-black-60 border border-white-10 rounded-card shadow-popup px-m py-s">
            <p className="text-sm text-white-90 leading-snug whitespace-nowrap">Auto-suggestions on.</p>
          </div>
        </PreviewBox>

        <div className="mt-l">
          <SubLabel>Inline preview — longer message (one-liner on desktop, wraps on mobile)</SubLabel>
        </div>
        <PreviewBox>
          <div className="backdrop-blur-popup bg-black-60 border border-white-10 rounded-card shadow-popup px-m py-s max-w-[520px]">
            <p className="text-sm text-white-90 leading-snug whitespace-nowrap">Auto-suggestions off. Turn back on from the chat menu.</p>
          </div>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['API: <Toast open message onClose durationMs={4000} />', 'Auto-dismiss on duration; minimal API; pass message as plain string'],
            ['Surface: backdrop-blur-popup bg-black-60 border border-white-10 rounded-card shadow-popup', 'Glass aesthetic — readable over plain dark bg without scrim'],
            ['Padding: px-m py-s (16px / 12px)', 'Standard breathing for a single line of text-sm copy'],
            ['Text: text-sm text-white-90 leading-snug', 'leading-snug keeps multi-line wrap tight if it has to wrap'],
            ['Width: w-[calc(100vw-32px)] md:w-auto md:max-w-[520px]', 'Mobile: fills viewport minus 16px each side. Desktop: auto-sizes up to 520px max'],
            ['Mobile: md:whitespace-nowrap on inner <p>', 'Forces single-line on desktop; mobile allowed to wrap if needed'],
            ['Position: fixed left-1/2 -translate-x-1/2 bottom-[88px]', 'Bottom-center on both viewports — sits above ChatBar so chat-context messages (auto-suggestions toggle, model switch) appear near the input area where the user\'s attention is'],
            ['z-index: 80', 'Above modals (40), bottom sheets (60), popovers (50)'],
            ['Mobile readability — relies on existing chat-area bottom scrim', 'No dedicated toast scrim needed because the chat page already renders a bottom gradient scrim above ChatBar (mobile only) for chatbar readability over the character image bg. The toast lives within that scrim\'s y-range'],
            ['pointer-events-none on outer wrapper, pointer-events-auto on inner card', 'Toast doesn\'t block clicks on content beneath, but the toast itself remains interactive if needed'],
            ['Lives in src/components/ui/Toast.tsx', 'Shared primitive — reuse for any non-modal notification'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-l">
          <SubLabel>When to use</SubLabel>
        </div>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          <p className="text-text-body">Use Toast for transient confirmations of user-initiated actions:</p>
          <ul className="list-disc pl-m space-y-1 text-text-small">
            <li>Setting toggled (e.g., "Auto-suggestions off. Turn back on from the chat menu.")</li>
            <li>Action completed (e.g., "Memory cleared.")</li>
            <li>Light status info that doesn&apos;t require a confirmation tap</li>
          </ul>
          <p className="text-text-body mt-s">Don&apos;t use Toast for:</p>
          <ul className="list-disc pl-m space-y-1 text-text-small">
            <li>Errors that require user action — use ConfirmSheet or inline error</li>
            <li>Long-form information — use BottomSheet</li>
            <li>Persistent banners — use DormancyBanner / LowCreditsBanner</li>
          </ul>
        </div>
      </div>

    </Section>
  )
}
