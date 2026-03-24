import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility: merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility: format a raw number with K/M suffix
// e.g. 24891 → "24.9K", 1200 → "1.2K", 1000000 → "1M", 5 → "5"
export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return `${n}`
}

// Utility: format rank number with K/M suffix, preserving the # prefix
// e.g. "#24891" → "#24.9K", "#1200" → "#1.2K", "#1000000" → "#1M", "#5" → "#5"
export function formatRank(rank: string): string {
  const prefix = rank.startsWith('#') ? '#' : ''
  const n = parseInt(rank.replace(/[^0-9]/g, ''), 10)
  if (isNaN(n)) return rank
  return `${prefix}${formatCount(n)}`
}
