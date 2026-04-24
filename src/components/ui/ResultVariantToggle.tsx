'use client'

import DevStateToggle, { DevStateOption } from './DevStateToggle'

type ResultVariant = 'success' | 'failure'

const VARIANTS: ResultVariant[] = ['success', 'failure']
const LABELS: Record<ResultVariant, string> = {
  success: 'Success',
  failure: 'Failure',
}

interface ResultVariantToggleProps {
  variant: ResultVariant
  onChange: (variant: ResultVariant) => void
}

export default function ResultVariantToggle({ variant, onChange }: ResultVariantToggleProps) {
  return (
    <DevStateToggle open title="Result" hint="R toggle · Shift+R flip" zIndex={90}>
      {VARIANTS.map((v) => (
        <DevStateOption key={v} active={variant === v} onClick={() => onChange(v)}>
          {LABELS[v]}
        </DevStateOption>
      ))}
    </DevStateToggle>
  )
}
