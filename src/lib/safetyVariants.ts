// Variant data for SafetyBanner — three platform-intervention banners triggered by user content classification.
// Illustration components live alongside the data so consumers get one import per variant.

export type SafetyVariant = 'self-harm' | 'medical' | 'financial'

export interface SafetyVariantConfig {
  heading: string
  primaryAction: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  sourceText: string
  learnMoreHref: string
}

export const SAFETY_VARIANTS: Record<SafetyVariant, SafetyVariantConfig> = {
  'self-harm': {
    heading: 'If you or someone you know is having a difficult time, free support is available.',
    primaryAction: { label: 'Call now', href: 'tel:988' },
    secondaryAction: { label: 'Browse resources', href: 'https://988lifeline.org/' },
    sourceText: 'Support provided by 988 Suicide & Crisis Lifeline, not wsup.ai.',
    learnMoreHref: 'https://988lifeline.org/about/',
  },
  'medical': {
    heading: 'wsup.ai is not a medical professional. For health questions, please consult a qualified doctor.',
    primaryAction: { label: 'Find a doctor', href: 'https://www.healthcare.gov/' },
    sourceText: 'AI responses can be inaccurate. Always verify medical guidance with a healthcare provider.',
    learnMoreHref: 'https://www.healthcare.gov/',
  },
  'financial': {
    heading: 'wsup.ai is not a financial advisor. For money decisions, please consult a qualified professional.',
    primaryAction: { label: 'Find an advisor', href: 'https://www.cfp.net/find-a-cfp-professional' },
    sourceText: 'AI responses can be inaccurate. Always verify financial guidance with a licensed advisor.',
    learnMoreHref: 'https://www.cfp.net/',
  },
}
