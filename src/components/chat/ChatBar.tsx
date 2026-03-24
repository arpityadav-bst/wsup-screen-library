'use client'

export default function ChatBar() {
  return (
    <div className="relative px-[16px] md:px-[48px] py-[12px] shrink-0 md:bg-gradient-to-b md:from-transparent md:to-black-40">
      <div className="bg-chat-ai-bubble rounded-[20px] p-[10px] flex items-center gap-s">
        {/* Left: auto-suggest + sparkle + input */}
        <div className="flex items-center gap-s flex-1 min-w-0">
          <button className="w-5 h-5 rounded-full bg-white-10 flex items-center justify-center shrink-0 hover:bg-white-20 transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon-bulb.svg" alt="" width={12} height={12} />
          </button>
          <button className="shrink-0 hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon-sparkle.svg" alt="" width={20} height={20} />
          </button>
          <input
            type="text"
            placeholder="Message"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white-50 outline-none min-w-0"
          />
        </div>
        {/* Right: image + mic + gift */}
        <div className="flex items-center gap-[16px] shrink-0">
          <button className="hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon-image.svg" alt="" width={16} height={16} />
          </button>
          <button className="hover:opacity-80 transition-opacity">
            <div style={{
              width: 20, height: 20,
              backgroundColor: 'white',
              maskImage: "url('/icons/icon-mic.svg')",
              maskSize: '20px 20px', maskRepeat: 'no-repeat', maskPosition: '0 0',
              WebkitMaskImage: "url('/icons/icon-mic.svg')",
              WebkitMaskSize: '20px 20px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0',
            }} />
          </button>
          <button className="hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon-gift.svg" alt="" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
