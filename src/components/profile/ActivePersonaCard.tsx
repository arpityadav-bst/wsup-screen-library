'use client'

import { useState } from 'react'

interface ActivePersonaCardProps {
  name: string
  description: string
  img: string
}

export default function ActivePersonaCard({ name, description, img }: ActivePersonaCardProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <div className="px-m pt-m">
        <div className="flex flex-col items-center justify-center rounded-card gap-xxs py-l px-m bg-white-05 border border-dashed border-white-10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-30 text-text-title">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-sm font-medium text-text-dim text-center">Equip a persona</p>
          <p className="text-xs text-text-xxsmall text-center">Choose a persona to display on your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-m pt-m">
      <div className="flex items-stretch rounded-card bg-white-05 border border-white-10 overflow-hidden relative">
        {/* Image */}
        <div className="absolute top-0 left-0 bottom-0 w-[106px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={name} className="w-full h-full object-cover object-center" />
          <div className="absolute top-0 right-0 bottom-0 w-[52px]"
            style={{ background: 'linear-gradient(to right, rgba(32,32,32,0) 0%, rgba(32,32,32,0.5) 40%, rgba(32,32,32,0.88) 70%, rgba(32,32,32,1) 100%)' }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 ml-[106px] py-s px-m pr-xxl flex flex-col justify-between gap-xs min-w-0">
          <span className="label-xs mb-xxs">Active Persona</span>
          <div>
            <p className="text-sm font-semibold text-text-title leading-tight truncate mb-xxs">{name}</p>
            <p className="text-xs text-text-body leading-snug line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Close */}
        <button onClick={() => setVisible(false)} className="absolute top-xs right-xs text-text-dim">
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
