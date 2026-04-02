'use client'

interface FormInputProps {
  label: string
  value?: string
  placeholder?: string
  required?: boolean
  helperText?: string
  onChange?: (value: string) => void
}

export default function FormInput({
  label,
  value = '',
  placeholder = '',
  required,
  helperText,
  onChange,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-xxs w-full">
      <label className="label-xs text-text-body tracking-[1.5px]">
        {label}{required && '*'}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-forms-bg border border-forms-border rounded-pill px-m py-s text-sm text-text-title placeholder:text-forms-text outline-none focus:border-forms-focus-border transition-colors"
      />
      {helperText && (
        <p className="text-xs text-forms-disabled-bg leading-snug">{helperText}</p>
      )}
    </div>
  )
}
