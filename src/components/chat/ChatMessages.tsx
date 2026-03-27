'use client'
import { useRef, useEffect } from 'react'

// ── Disclaimer ────────────────────────────────────────────────────────────────

function Disclaimer() {
  return (
    <div className="self-center backdrop-blur-[60px] bg-black-40 px-[12px] py-[8px] rounded-card shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
      <p className="text-xxs text-white-90">
        <span className="font-medium">Remember: </span>
        <span>Everything here is AI generated</span>
      </p>
    </div>
  )
}

// ── User bubble ───────────────────────────────────────────────────────────────

function UserBubble({ text, emotion }: { text: string; emotion?: string }) {
  return (
    <div className="flex justify-end w-full">
      <div className="backdrop-blur-[32px] bg-chat-user-bubble px-[12px] py-[10px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl max-w-[360px]">
        <p className="text-sm text-white leading-normal whitespace-pre-wrap">{text}</p>
        {emotion && <p className="text-sm italic text-white-50 leading-snug mt-[2px]">{emotion}</p>}
      </div>
    </div>
  )
}

// ── AI action icons ───────────────────────────────────────────────────────────

const maskStyle = (icon: string) => ({
  width: 16, height: 16,
  backgroundColor: 'white',
  maskImage: `url('/icons/${icon}')`,
  maskSize: '16px 16px', maskRepeat: 'no-repeat' as const, maskPosition: '0 0',
  WebkitMaskImage: `url('/icons/${icon}')`,
  WebkitMaskSize: '16px 16px', WebkitMaskRepeat: 'no-repeat' as const, WebkitMaskPosition: '0 0',
})

const ThumbsUpIcon = () => <div style={maskStyle('icon-like.svg')} />
const ThumbsDownIcon = () => <div style={maskStyle('icon-dislike.svg')} />


const DotsVertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
  </svg>
)

// ── Audio/play button ─────────────────────────────────────────────────────────

function AudioPlayBtn() {
  return (
    <div className="backdrop-blur-[32px] bg-black-70 flex items-center gap-[4px] h-[32px] pl-[8px] pr-[6px] rounded-[24px] shrink-0">
      {/* Static waveform bars */}
      <div className="flex items-center gap-[2px]">
        {[3, 7, 10, 8, 5, 8, 10, 7, 3].map((h, i) => (
          <div key={i} className="w-[1.5px] bg-white-70 rounded-full" style={{ height: `${h}px` }} />
        ))}
      </div>
      {/* Play circle */}
      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shrink-0 ml-[2px]">
        <svg width="6" height="7" viewBox="0 0 6 7" fill="none">
          <path d="M1.5 1l3.5 2.5L1.5 6V1Z" fill="#171717" />
        </svg>
      </div>
    </div>
  )
}

// ── Generate image button ─────────────────────────────────────────────────────

function GenerateImageBtn() {
  return (
    <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 transition-colors shrink-0">
      <div style={{
        width: 16, height: 16,
        backgroundImage: 'var(--icon-gradient-warm)',
        maskImage: "url('/icons/icon-generate-image.svg')",
        maskSize: '16px 16px', maskRepeat: 'no-repeat', maskPosition: '0 0',
        WebkitMaskImage: "url('/icons/icon-generate-image.svg')",
        WebkitMaskSize: '16px 16px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0',
      }} />
    </button>
  )
}

// ── AI bubble ─────────────────────────────────────────────────────────────────

function AIBubble({ emotion, text }: { emotion?: string; text: string }) {
  return (
    <div className="flex items-start gap-[4px]">
      {/* Left: bubble + actions — constrained width */}
      <div className="flex flex-col max-w-[290px] min-w-[64px]">
        <div className="bg-chat-ai-bubble px-[12px] pt-[8px] pb-[14px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
          {emotion && (
            <p className="text-sm italic text-white-50 leading-snug mb-s">{emotion}</p>
          )}
          <p className="text-sm text-white leading-normal whitespace-pre-wrap">{text}</p>
        </div>
        <div className="flex items-center pt-[4px]">
          <div className="flex items-center gap-[4px]">
            <AudioPlayBtn />
            <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 transition-colors">
              <ThumbsUpIcon />
            </button>
            <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 transition-colors">
              <ThumbsDownIcon />
            </button>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-[4px]">
            <GenerateImageBtn />
            <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 transition-colors text-text-title">
              <DotsVertIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Regenerate — stretches full height, centered within */}
      <div className="self-stretch flex flex-col items-center justify-center gap-[4px] shrink-0">
        <button className="w-[32px] h-[32px] flex items-center justify-center backdrop-blur-[32px] bg-black-70 rounded-full hover:bg-white-10 transition-colors">
          <div style={maskStyle('icon-regenerate.svg')} />
        </button>
        <span className="text-xxs font-semibold text-white tracking-[0.8px]">0/3</span>
      </div>
    </div>
  )
}

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="bg-chat-ai-bubble flex items-center gap-[4px] px-[12px] py-[8px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl self-start">
      <p className="text-sm text-white-50 whitespace-nowrap">{name} is typing</p>
      <div className="flex items-center gap-[3px] ml-[2px]">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-[4px] h-[4px] bg-white-50 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ChatMessages() {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <div className="flex-1 overflow-y-auto px-[16px] md:px-[48px] py-[16px] flex flex-col gap-[16px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Spacer — pushes messages to bottom when chat is short */}
      <div className="flex-1" />
      <Disclaimer />

      <UserBubble
        text="Namaskar Sara ji"
        emotion="laugh softly with gentle smile looking into your eyes"
      />

      <AIBubble
        emotion="She blinks, smiles and say,"
        text={"I am Billie! You can call me Billie. I have a Katana \u270c"}
      />

      <TypingIndicator name="Billie Eilish" />

      <div ref={bottomRef} />
    </div>
  )
}
