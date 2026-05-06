// Keyword classifier — design demo only. Production would use an ML classifier.
// Severity hierarchy on collision: self-harm > medical > financial (most severe wins).

import type { SafetyVariant } from './safetyVariants'

const PATTERNS: { variant: SafetyVariant; match: RegExp }[] = [
  {
    variant: 'self-harm',
    match: /\b(suicide|suicidal|kill\s*myself|killing\s*myself|hurt\s*myself|harming\s*myself|self[- ]?harm|end\s*(my|it\s*all|things)|don'?t\s*want\s*to\s*(live|be\s*here)|want\s*to\s*die|wanna\s*die|cut\s*myself|cutting\s*myself|overdose)\b/i,
  },
  {
    variant: 'medical',
    match: /\b(diagnose|diagnosis|symptom|symptoms|prescription|prescribe|medicine|medication|illness|disease|cancer|covid|tumor|bleeding|chest\s*pain|head\s*aches|migraine|infection|fever|allergic\s*reaction|stroke|heart\s*attack|pregnan(t|cy)|antibiotic|painkiller|dosage|mg)\b/i,
  },
  {
    variant: 'financial',
    match: /\b(invest|investment|stock|stocks|bitcoin|crypto|cryptocurrency|loan|mortgage|debt|tax(es)?|retirement|401k|ira|insurance|portfolio|trading|day\s*trade|day\s*trading|forex|hedge\s*fund|interest\s*rate|refinanc(e|ing)|bankrupt(cy)?)\b/i,
  },
]

export function detectSafetyCategory(text: string): SafetyVariant | null {
  for (const entry of PATTERNS) {
    if (entry.match.test(text)) return entry.variant
  }
  return null
}
