'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import FormTextarea from '@/components/ui/FormTextarea'
import SelectionPillGroup from '@/components/ui/SelectionPillGroup'

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Others', value: 'others' },
]

const VISIBILITY_OPTIONS = [
  { label: 'Public', value: 'public' },
  { label: 'Private', value: 'private' },
]

const CHAT_FILTER_OPTIONS = [
  { label: 'Filtered', value: 'filtered', description: 'Safe for all audiences' },
  { label: 'Unfiltered', value: 'unfiltered', description: 'Mature themes allowed' },
]

export default function EditCharacterPage() {
  const [name, setName] = useState('Cyberpunk DJ')
  const [gender, setGender] = useState('male')
  const [visibility, setVisibility] = useState('private')
  const [chatFilter, setChatFilter] = useState('unfiltered')
  const [age, setAge] = useState('18')
  const [tags, setTags] = useState('')
  const [bio, setBio] = useState('')
  const [advancedOpen, setAdvancedOpen] = useState(false)

  return (
    <div className="h-screen bg-page-bg flex flex-col">
      <Header />
      <div className="hidden md:block"><Sidebar /></div>

      <main className="flex-1 md:ml-[365px] mt-[60px] flex flex-col overflow-hidden">

        {/* Mobile header — matches profile header style */}
        <div className="flex md:hidden items-center h-3xxxl px-xs shrink-0 bg-page-bg border-b border-white-10">
          <button onClick={() => window.history.back()} className="p-icon-btn rounded-pill hover:bg-white-10 transition-colors text-white-90 shrink-0 border-none bg-transparent cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 16.8333 13.5" fill="none">
              <path d="M6.97727 0.5L0.5 6.75M0.5 6.75L6.97727 13M0.5 6.75H16.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="ml-xs text-base font-semibold text-text-title">Edit Character</span>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex items-center h-3xxxl px-xs shrink-0 bg-page-bg border-b border-white-10">
          <Link href="/profile" className="p-icon-btn rounded-pill hover:bg-white-10 transition-colors text-white-90 shrink-0 no-underline flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 16.8333 13.5" fill="none">
              <path d="M6.97727 0.5L0.5 6.75M0.5 6.75L6.97727 13M0.5 6.75H16.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="ml-xs text-base font-semibold text-text-title">Edit Character</span>
        </div>

        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto scroll-hide">
          <div className="px-m md:px-4xl py-xl flex flex-col gap-xl max-w-[480px] mx-auto">

            <FormInput
              label="Name"
              value={name}
              required
              onChange={setName}
            />

            <SelectionPillGroup
              label="Gender"
              options={GENDER_OPTIONS}
              value={gender}
              required
              onChange={setGender}
            />

            <SelectionPillGroup
              label="Visibility"
              options={VISIBILITY_OPTIONS}
              value={visibility}
              required
              helperText="Character once set to public, you can't switch it to private later."
              onChange={setVisibility}
            />

            <SelectionPillGroup
              label="Chat Filter"
              options={CHAT_FILTER_OPTIONS}
              value={chatFilter}
              required
              onChange={setChatFilter}
            />

            <FormInput
              label="Character Age (18+)"
              value={age}
              required
              helperText="Minor characters (under 18 years old) are not allowed."
              onChange={setAge}
            />

            <FormTextarea
              label="Tags (upto 5)"
              value={tags}
              placeholder="Example: Athletic, Tall, Curvy, Rain, Clouds..."
              required
              maxLength={100}
              rows={3}
              aiGenerate
              onChange={setTags}
            />

            <FormTextarea
              label="Bio"
              value={bio}
              placeholder="Example: Tall and athletic, with tanned skin and short brown hair. He has green eyes and a kind smile. Usually seen in casual beachwear."
              required
              maxLength={2000}
              rows={5}
              aiGenerate
              onChange={setBio}
            />

            {/* Advanced Options accordion */}
            <div className="border-t border-b border-white-10">
              <button
                onClick={() => setAdvancedOpen(!advancedOpen)}
                className="flex items-center justify-between w-full py-m bg-transparent border-none cursor-pointer"
              >
                <span className="text-sm font-semibold text-forms-focus-border">Advanced Options</span>
                <svg
                  className="w-m h-m text-forms-focus-border transition-transform"
                  style={{ transform: advancedOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {advancedOpen && (
                <div className="pb-m flex flex-col gap-xl">
                  <p className="text-xs text-text-dim">Advanced character configuration options will appear here.</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Bottom action bar */}
        <div className="shrink-0 flex flex-col md:flex-row items-center gap-xs md:gap-m px-m md:px-l py-s md:py-m border-t border-white-10 backdrop-blur-popup bg-black-40">
          <p className="text-xs md:text-sm text-status-alert text-center md:text-left md:flex-1">
            Warning: Explicit content may lead to character removal and/or account restrictions.
          </p>
          <Button className="shrink-0 w-full md:w-auto md:min-w-[180px]">
            Next
          </Button>
        </div>

      </main>
    </div>
  )
}
