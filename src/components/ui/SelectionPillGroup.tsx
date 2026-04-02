'use client'

import { useState } from 'react'

interface PillOption {
  label: string
  value: string
  description?: string
}

interface SelectionPillGroupProps {
  label: string
  options: PillOption[]
  value?: string
  required?: boolean
  helperText?: string
  onChange?: (value: string) => void
}

function CheckIcon() {
  return (
    <svg className="w-m h-m" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function RadioCircle() {
  return (
    <div className="w-l h-l rounded-pill border border-white-20 bg-transparent" />
  )
}

export default function SelectionPillGroup({
  label,
  options,
  value: controlledValue,
  required,
  helperText,
  onChange,
}: SelectionPillGroupProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '')
  const selected = controlledValue ?? internalValue

  const handleSelect = (val: string) => {
    setInternalValue(val)
    onChange?.(val)
  }

  return (
    <div className="flex flex-col gap-xxs w-full">
      <span className="label-xs text-text-subtitle tracking-[1.5px]">
        {label}{required && '*'}
      </span>
      <div className="flex gap-m">
        {options.map((opt) => {
          const isSelected = selected === opt.value
          return (
            <div key={opt.value} className="flex-1 flex flex-col gap-xxs">
              <button
                onClick={() => handleSelect(opt.value)}
                className={`relative flex items-center gap-xxs h-[36px] px-s rounded-button cursor-pointer border transition-colors ${
                  isSelected
                    ? 'bg-forms-active-bg border-forms-focus-border text-text-title'
                    : 'bg-forms-bg border-forms-border text-text-subtitle hover:border-white-20'
                }`}
              >
                <span className="flex-1 text-sm font-normal text-left">{opt.label}</span>
                {isSelected ? (
                  <span className="text-forms-focus-border"><CheckIcon /></span>
                ) : (
                  <RadioCircle />
                )}
              </button>
              {opt.description && (
                <p className="text-xs text-forms-disabled-bg leading-snug">{opt.description}</p>
              )}
            </div>
          )
        })}
      </div>
      {helperText && (
        <p className="text-xs text-forms-disabled-bg leading-snug">{helperText}</p>
      )}
    </div>
  )
}
