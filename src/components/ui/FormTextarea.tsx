'use client'

import { useState } from 'react'

interface FormTextareaProps {
  label: string
  value?: string
  placeholder?: string
  required?: boolean
  maxLength?: number
  rows?: number
  aiGenerate?: boolean
  onChange?: (value: string) => void
}

export default function FormTextarea({
  label,
  value: controlledValue,
  placeholder = '',
  required,
  maxLength,
  rows = 4,
  aiGenerate,
  onChange,
}: FormTextareaProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '')
  const value = controlledValue ?? internalValue

  const handleChange = (v: string) => {
    if (maxLength && v.length > maxLength) return
    setInternalValue(v)
    onChange?.(v)
  }

  return (
    <div className="flex flex-col gap-xxs w-full">
      <div className="flex items-center justify-between">
        <label className="label-xs text-text-body tracking-[1.5px]">
          {label}{required && '*'}
        </label>
        {aiGenerate && (
          <button className="link text-xs bg-transparent border-none cursor-pointer p-0">
            Generate with AI
          </button>
        )}
      </div>
      <div className="relative">
        <textarea
          value={value}
          placeholder={placeholder}
          rows={rows}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full bg-forms-bg border border-forms-border rounded-card px-s py-s text-sm text-text-title placeholder:text-forms-text outline-none resize-none focus:border-forms-focus-border transition-colors"
        />
        {maxLength !== undefined && (
          <span className="absolute bottom-s right-s text-xxs text-white-40 tracking-[0.2px]">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
