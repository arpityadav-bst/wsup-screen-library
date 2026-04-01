'use client'

import { useState } from 'react'
import { Section, SubLabel } from '../../helpers'
import FilterPills from '@/components/ui/FilterPills'

export default function FilterPillsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [active1, setActive1] = useState('All')
  const [active2, setActive2] = useState('Recommended')

  return (
    <Section id="Filter Pills" title="Filter Pills" onVisible={onSectionVisible}>

      <div className="w-full max-w-[414px]">
        <SubLabel>With counts + dots (lifecycle filters)</SubLabel>
        <FilterPills
          pills={[
            { label: 'All', count: 19 },
            { label: 'Active', count: 12, dot: '#398b4d' },
            { label: 'Needs Attention', count: 5, dot: '#ffc32a' },
            { label: 'Removed', count: 2, dot: '#de5a48' },
          ]}
          active={active1}
          onChange={setActive1}
        />
      </div>

      <div className="w-full max-w-[414px]">
        <SubLabel>Plain labels (category style)</SubLabel>
        <FilterPills
          pills={[
            { label: 'Recommended' },
            { label: 'Anime' },
            { label: 'Girlfriend' },
            { label: 'Fantasy' },
            { label: 'Sci-Fi' },
          ]}
          active={active2}
          onChange={setActive2}
        />
      </div>

    </Section>
  )
}
