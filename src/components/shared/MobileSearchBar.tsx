'use client'
import { useState } from 'react'
import SearchBar from '@/components/shared/SearchBar'
import SpicyToggle from '@/components/shared/SpicyToggle'

export default function MobileSearchBar() {
  const [spicy, setSpicy] = useState(false)

  return (
    <div className="md:hidden flex items-center gap-m mb-m">
      <SearchBar className="flex-1" height="h-[44px]" />
      <div className="w-px h-8 bg-white-10 shrink-0" />
      <SpicyToggle spicy={spicy} onToggle={() => setSpicy(s => !s)} className="shrink-0" />
    </div>
  )
}
