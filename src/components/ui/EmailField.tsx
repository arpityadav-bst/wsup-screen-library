'use client'

import type { ChangeEvent, FormEvent } from 'react'

interface EmailFieldProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  className?: string
}

export default function EmailField({ value, onChange, onSubmit, placeholder = 'Email Address', className = '' }: EmailFieldProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex items-center gap-icon-btn bg-white-10 rounded-popup px-m py-icon-btn">
        <input
          type="email"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-text-body placeholder:text-white-20 caret-white outline-none min-w-0"
        />
        <button
          type="submit"
          aria-label="Continue with email"
          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white-70 hover:text-white hover:bg-white-10 transition-colors"
        >
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden>
            <path d="M1 1l6 5.5-6 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  )
}
