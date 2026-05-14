'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import SelectionPillGroup from '@/components/ui/SelectionPillGroup'
import OnboardingHeader from './OnboardingHeader'

interface OnboardingPreferencesStepProps {
  onContinue: (prefs: { identity: string; age: string; interest: string }) => void
  onSkip: () => void
}

const IDENTITY_OPTIONS = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Non-binary', value: 'nonbinary' },
]

const AGE_OPTIONS = [
  { label: '18–20', value: '18-20' },
  { label: '21–25', value: '21-25' },
  { label: '26–34', value: '26-34' },
  { label: '35–44', value: '35-44' },
  { label: '45+', value: '45+' },
]

const INTEREST_OPTIONS = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'No preference', value: 'any' },
]

// Stage 1 of onboarding — collects identity + age + interest before showing the deck.
// Continue stays disabled until all three pickers have a value.
// Order = identity → demographic → preference (dating-app convention: "who am I" before "who I want to meet").
// Layout follows the LoginSheet rhythm: header → narrative (title + subtitle) → form → footer CTA,
// with `gap-xl` between narrative and form to obey taste rule "Spacing is hierarchy".
export default function OnboardingPreferencesStep({ onContinue, onSkip }: OnboardingPreferencesStepProps) {
  const [identity, setIdentity] = useState('')
  const [age, setAge] = useState('')
  const [interest, setInterest] = useState('')
  const ready = identity !== '' && age !== '' && interest !== ''

  return (
    <div className="flex flex-col h-full p-l">
      <OnboardingHeader onSkip={onSkip} />

      <div className="flex flex-col gap-xs mt-l">
        <h2 className="text-2xl font-semibold text-text-title leading-tight">Let&apos;s find your match.</h2>
        <p className="text-sm text-text-body leading-snug">Quick questions before we show you matches.</p>
      </div>

      <div className="flex flex-col gap-l mt-xl">
        <SelectionPillGroup
          label="I am"
          options={IDENTITY_OPTIONS}
          value={identity}
          onChange={setIdentity}
          wrap
        />
        <SelectionPillGroup
          label="Your age"
          options={AGE_OPTIONS}
          value={age}
          onChange={setAge}
          wrap
        />
        <SelectionPillGroup
          label="I'm interested in"
          options={INTEREST_OPTIONS}
          value={interest}
          onChange={setInterest}
          wrap
        />
      </div>

      <div className="mt-auto pt-l">
        <Button variant="primary" fullWidth disabled={!ready} onClick={() => onContinue({ identity, age, interest })}>
          Continue
        </Button>
      </div>
    </div>
  )
}
