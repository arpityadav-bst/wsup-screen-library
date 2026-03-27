'use client'

import { Section, SubLabel } from '../helpers'

export default function IconsTab({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <>
        <Section id="Size Scale" title="Size Scale (Actual Usage)" onVisible={onSectionVisible}>
          <div className="w-full">
            <p className="text-text-body text-sm mb-m leading-relaxed">All icon sizes currently used across WSUP, grouped by context. Sizes are rendered width×height in pixels.</p>
            <div className="flex flex-col gap-s">
              {[
                { tier: 'Micro', sizes: '5×8, 6×7, 10', desc: 'Trend arrows, play button, chevron-small (ChatRightSidebar), close/plus/dots on small cards', color: 'text-text-dim' },
                { tier: 'Small', sizes: '12, 13, 14', desc: 'Close buttons (Sidebar, BottomSheet), external link icons (Footer), expand/collapse arrows, small card icons (MyCardsView)', color: 'text-text-xsmall' },
                { tier: 'Medium', sizes: '15, 16, 17', desc: 'Heart, send, message icons. Search icon. External SVG file icons (bulb, image, like/dislike, generate-image, regenerate). StatsRow chevrons.', color: 'text-text-small' },
                { tier: 'Action', sizes: '18', desc: 'Most action icons: edit, share, trash, heart (StoryCard), chat bubble, cards, bell, social icons in desktop Footer. Sheet menu item icons.', color: 'text-text-body' },
                { tier: 'Nav', sizes: '20', desc: 'All Sidebar + BottomNav icons (Stories, Explore, Create, Chats, Profile). Chevrons in FooterMobile. External SVG icons (mic, gift, call, gallery, back, chat, profile masks).', color: 'text-text-subtitle' },
                { tier: 'Header', sizes: '22, 24', desc: 'Game controller (22). Header app bar icons, 3-dot menu, back chevrons, social icons in mobile Footer. Back arrow in slide panels.', color: 'text-text-title' },
                { tier: 'Asset', sizes: '25, 28, 32', desc: 'Trophy.png (25), credit.png (28), persona placeholder (28), user avatar SVG (32). These are image-based or one-off sizes.', color: 'text-status-warning' },
              ].map(t => (
                <div key={t.tier} className="flex items-start gap-m px-m py-s rounded-card bg-white-05 border border-white-10">
                  <div className="flex items-center gap-xs shrink-0 w-[140px]">
                    <span className={`text-sm font-semibold ${t.color}`}>{t.tier}</span>
                    <code className="text-xxs text-accent-light">{t.sizes}</code>
                  </div>
                  <span className="text-xs text-text-body leading-relaxed">{t.desc}</span>
                </div>
              ))}
            </div>
            <div className="mt-m p-s rounded-card bg-white-05 border border-white-10">
              <p className="text-xs text-text-small leading-relaxed"><span className="font-semibold text-text-title">Rule:</span> Before adding a new size, check if an existing size from this scale works. The most common sizes are <code className="text-accent-light">10</code>, <code className="text-accent-light">18</code>, <code className="text-accent-light">20</code>, and <code className="text-accent-light">24</code> — prefer these when possible.</p>
            </div>
          </div>
        </Section>

        <Section id="Navigation" title="Navigation Icons" onVisible={onSectionVisible}>
          <div className="w-full grid grid-cols-6 gap-m">
            {([
              { name: 'Chevron Left (Back)', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '20, 24', usage: 'ProfileAppBar, ChatHeader' },
              { name: 'Chevron Right', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '5, 13, 17', usage: 'RankBanner, StatsRow, FooterMobile' },
              { name: 'Chevron Down', svg: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '20', usage: 'FooterMobile accordion' },
              { name: 'Chevron Up', svg: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 12l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '20', usage: 'FooterMobile accordion' },
              { name: 'Back Arrow', svg: <svg width="20" height="16" viewBox="0 0 28 24" fill="none"><path d="M27 12H1M1 12l9 9M1 12l9-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '20, 24×20', usage: 'SocialView, MyCardsView, ChatHeader. Also as /icons/icon-back.svg' },
              { name: 'External Link', svg: <svg width="20" height="20" viewBox="0 0 14 14" fill="none"><path d="M5.25 3H10.5C10.78 3 11 3.22 11 3.5V8.75" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round"/><path d="M3 11L10.5 3.5" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round"/></svg>, sizes: '12, 14, 20', usage: 'Footer policies, WhatIsWsup, FooterMobile' },
            ] as { name: string; svg: React.ReactNode; sizes: string; usage: string }[]).map(icon => (
              <div key={icon.name} className="flex flex-col items-center gap-xs p-s rounded-card bg-white-05 border border-white-10">
                <div className="flex items-center justify-center w-[40px] h-[40px] text-text-body">{icon.svg}</div>
                <span className="text-xxs font-medium text-text-title text-center leading-tight">{icon.name}</span>
                <span className="text-xxs text-text-dim text-center">Sizes: {icon.sizes}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="Actions" title="Action Icons" onVisible={onSectionVisible}>
          <div className="w-full grid grid-cols-6 gap-m">
            {([
              { name: 'Edit / Pencil', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '18', usage: 'ProfileHero, CharacterMenuSheet' },
              { name: 'Share', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2"/></svg>, sizes: '18', usage: 'ProfileHero, CharacterMenuSheet, StoryCard' },
              { name: 'Trash / Delete', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 6V4h6v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '18', usage: 'CharacterMenuSheet' },
              { name: 'Close / X', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>, sizes: '10, 12, 13', usage: 'BottomSheet, BioSheet, ActivePersonaCard, Sidebar' },
              { name: 'Plus / Add', svg: <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, sizes: '10, 11', usage: 'ChatHeader, Sidebar group chat' },
              { name: 'Log Out', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '18', usage: 'MenuSheet' },
              { name: 'Vertical Dots', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>, sizes: '10, 20, 24', usage: 'ProfileAppBar, ChatHeader, ProfileCharacterCard' },
              { name: 'Heart / Like', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '15, 18', usage: 'StoryCard, CommentsSheet' },
              { name: 'Chat Bubble', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '10, 15, 18', usage: 'ProfileCharacterCard, StoryCard' },
              { name: 'Cards / Credit', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>, sizes: '13, 18', usage: 'MenuSheet, MyCardsView' },
              { name: 'Search', svg: <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M15 15l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, sizes: '16', usage: 'SearchBar, MobileSearchBar' },
              { name: 'Send', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '15', usage: 'ChatBar' },
            ] as { name: string; svg: React.ReactNode; sizes: string; usage: string }[]).map(icon => (
              <div key={icon.name} className="flex flex-col items-center gap-xs p-s rounded-card bg-white-05 border border-white-10">
                <div className="flex items-center justify-center w-[40px] h-[40px] text-text-body">{icon.svg}</div>
                <span className="text-xxs font-medium text-text-title text-center leading-tight">{icon.name}</span>
                <span className="text-xxs text-text-dim text-center">Sizes: {icon.sizes}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="Social" title="Social Icons" onVisible={onSectionVisible}>
          <div className="w-full grid grid-cols-6 gap-m">
            {([
              { name: 'Discord', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.7684 6.44342C17.4872 5.87788 16.1347 5.47666 14.7454 5.25C14.5555 5.57784 14.3835 5.91497 14.23 6.26004C12.7501 6.04573 11.2452 6.04573 9.76531 6.26004C9.6118 5.91497 9.43979 5.57784 9.24997 5.25C7.85994 5.47926 6.50663 5.8814 5.22391 6.44637C2.6779 10.0784 1.98772 13.6202 2.33281 17.1117C3.82365 18.1741 5.49256 18.982 7.26685 19.5C7.66621 18.9818 8.0197 18.4323 8.32359 17.857C7.74662 17.6493 7.18976 17.393 6.65949 17.091C6.79906 16.9934 6.93556 16.8928 7.06746 16.7952C8.61055 17.4949 10.2948 17.8577 12 17.8577C13.7052 17.8577 15.3894 17.4949 16.9325 16.7952C17.0659 16.9002 17.2024 17.0008 17.3404 17.091C16.8093 17.3938 16.2514 17.6506 15.6733 17.8585C15.9766 18.4336 16.3301 18.9827 16.73 19.5C18.5058 18.984 20.176 18.1766 21.6671 17.1132C22.072 13.0641 20.9754 9.55487 18.7684 6.44342ZM8.76071 14.9644C7.79905 14.9644 7.00458 14.123 7.00458 13.0878C7.00458 12.0526 7.77145 11.2038 8.75764 11.2038C9.74384 11.2038 10.5322 12.0526 10.5153 13.0878C10.4984 14.123 9.74077 14.9644 8.76071 14.9644ZM15.2392 14.9644C14.276 14.9644 13.4846 14.123 13.4846 13.0878C13.4846 12.0526 14.2515 11.2038 15.2392 11.2038C16.227 11.2038 17.0092 12.0526 16.9923 13.0878C16.9754 14.123 16.2193 14.9644 15.2392 14.9644Z"/></svg>, sizes: '18, 24', usage: 'Footer, FooterMobile' },
              { name: 'Instagram', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.9375 1.5H8.0625C6.32202 1.5 4.65282 2.1914 3.42211 3.42211C2.1914 4.65282 1.5 6.32202 1.5 8.0625L1.5 15.9375C1.5 17.678 2.1914 19.3472 3.42211 20.5779C4.65282 21.8086 6.32202 22.5 8.0625 22.5H15.9375C17.678 22.5 19.3472 21.8086 20.5779 20.5779C21.8086 19.3472 22.5 17.678 22.5 15.9375V8.0625C22.5 6.32202 21.8086 4.65282 20.5779 3.42211C19.3472 2.1914 17.678 1.5 15.9375 1.5ZM20.5312 15.9375C20.5312 18.4706 18.4706 20.5312 15.9375 20.5312H8.0625C5.52938 20.5312 3.46875 18.4706 3.46875 15.9375V8.0625C3.46875 5.52938 5.52938 3.46875 8.0625 3.46875H15.9375C18.4706 3.46875 20.5312 5.52938 20.5312 8.0625V15.9375Z"/><path d="M12 6.75C10.6076 6.75 9.27226 7.30312 8.28769 8.28769C7.30312 9.27226 6.75 10.6076 6.75 12C6.75 13.3924 7.30312 14.7277 8.28769 15.7123C9.27226 16.6969 10.6076 17.25 12 17.25C13.3924 17.25 14.7277 16.6969 15.7123 15.7123C16.6969 14.7277 17.25 13.3924 17.25 12C17.25 10.6076 16.6969 9.27226 15.7123 8.28769C14.7277 7.30312 13.3924 6.75 12 6.75ZM12 15.2812C11.1301 15.2802 10.2961 14.9342 9.68096 14.319C9.06583 13.7039 8.71979 12.8699 8.71875 12C8.71875 10.1901 10.1914 8.71875 12 8.71875C13.8086 8.71875 15.2812 10.1901 15.2812 12C15.2812 13.8086 13.8086 15.2812 12 15.2812Z"/><path d="M17.625 6.75C17.8321 6.75 18 6.58211 18 6.375C18 6.16789 17.8321 6 17.625 6C17.4179 6 17.25 6.16789 17.25 6.375C17.25 6.58211 17.4179 6.75 17.625 6.75Z"/></svg>, sizes: '18, 24', usage: 'Footer, FooterMobile' },
              { name: 'Reddit', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.8605 4.46485C15.1043 5.52808 16.0322 6.32014 17.1402 6.32014C18.4337 6.32014 19.4824 5.24109 19.4824 3.91007C19.4824 2.57905 18.4337 1.5 17.1402 1.5C16.0092 1.5 15.0659 2.32482 14.8463 3.42195C12.952 3.63098 11.4729 5.28402 11.4729 7.28733C11.4729 7.29185 11.4729 7.29524 11.4729 7.29976C9.41288 7.38902 7.53184 7.99238 6.03843 8.94489C5.48389 8.5031 4.7877 8.23983 4.03221 8.23983C2.21925 8.23983 0.75 9.75163 0.75 11.6171C0.75 12.9707 1.52306 14.1368 2.63982 14.6757C2.74854 18.5965 6.90044 21.75 12.0077 21.75C17.1149 21.75 21.2723 18.5931 21.3755 14.6689C22.4835 14.1266 23.25 12.9639 23.25 11.6182C23.25 9.75276 21.7807 8.24096 19.9678 8.24096C19.2156 8.24096 18.5227 8.50197 17.9693 8.94037C16.4627 7.98109 14.5608 7.37772 12.4799 7.2975C12.4799 7.29411 12.4799 7.29185 12.4799 7.28846C12.4799 5.85349 13.5165 4.66258 14.8605 4.46711V4.46485ZM5.90666 13.7605C5.96157 12.5357 6.7522 11.5956 7.6713 11.5956C8.59041 11.5956 9.29319 12.5888 9.23829 13.8136C9.18338 15.0384 8.49707 15.4836 7.57687 15.4836C6.65666 15.4836 5.85176 14.9853 5.90666 13.7605ZM16.3452 11.5956C17.2654 11.5956 18.056 12.5357 18.1098 13.7605C18.1647 14.9853 17.3587 15.4836 16.4396 15.4836C15.5205 15.4836 14.8331 15.0395 14.7782 13.8136C14.7233 12.5888 15.425 11.5956 16.3452 11.5956ZM15.2515 16.5943C15.4239 16.6124 15.5337 16.7965 15.4667 16.9615C14.9012 18.3524 13.5659 19.3298 12.0077 19.3298C10.4495 19.3298 9.1153 18.3524 8.54868 16.9615C8.4817 16.7965 8.59151 16.6124 8.76391 16.5943C9.77416 16.4892 10.8668 16.4316 12.0077 16.4316C13.1486 16.4316 14.2401 16.4892 15.2515 16.5943Z"/></svg>, sizes: '18, 24', usage: 'Footer, FooterMobile' },
            ] as { name: string; svg: React.ReactNode; sizes: string; usage: string }[]).map(icon => (
              <div key={icon.name} className="flex flex-col items-center gap-xs p-s rounded-card bg-white-05 border border-white-10">
                <div className="flex items-center justify-center w-[40px] h-[40px] text-text-body">{icon.svg}</div>
                <span className="text-xxs font-medium text-text-title text-center leading-tight">{icon.name}</span>
                <span className="text-xxs text-text-dim text-center">Sizes: {icon.sizes}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="Status & Utility" title="Status & Utility Icons" onVisible={onSectionVisible}>
          <div className="w-full grid grid-cols-6 gap-m">
            {([
              { name: 'Trend Up', svg: <svg width="18" height="18" viewBox="0 0 10 10" fill="none"><path d="M5 8.5V1.5M2 4.5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '10', usage: 'TrendArrow, StatsRow, ProfileCharacterCard', color: 'text-status-success' },
              { name: 'Trend Down', svg: <svg width="18" height="18" viewBox="0 0 10 10" fill="none"><path d="M5 1.5v7M2 5.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '10', usage: 'TrendArrow, StatsRow, ProfileCharacterCard', color: 'text-status-alert' },
              { name: 'Notification Bell', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>, sizes: '18', usage: 'Header', color: 'text-accent-light' },
              { name: 'User Avatar', svg: <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="12" r="5.5" fill="currentColor"/><ellipse cx="16" cy="30" rx="11.5" ry="8" fill="rgba(255,255,255,0.1)"/></svg>, sizes: '32', usage: 'Header profile icon', color: 'text-avatar' },
              { name: 'Play', svg: <svg width="18" height="18" viewBox="0 0 6 7" fill="currentColor"><path d="M1.5 1l3.5 2.5L1.5 6V1Z"/></svg>, sizes: '6×7', usage: 'ChatMessages audio' },
              { name: 'Game Controller', svg: <svg width="18" height="18" viewBox="0 0 512 512" fill="currentColor"><path d="M350.18 221.99c-.24 0-.48 0-.72 0-15.49.4-27.73 13.3-27.33 28.84.41 15.23 12.88 27.32 28.02 27.32.26 0 .52 0 .78-.01 15.5-.4 27.73-13.3 27.34-28.8-.39-15.26-12.9-27.35-28.08-27.35zM396.91 147.2c-.25 0-.5 0-.75 0-15.5.42-27.73 13.3-27.34 28.83.41 15.23 12.9 27.32 28.03 27.32.26 0 .53 0 .8-.01 15.49-.39 27.74-13.3 27.34-28.79-.41-15.26-12.89-27.35-28.08-27.35z"/><path d="M511.97,363.87c-1.2-66.8-9.09-134.35-22.03-202.53-10.54-47.37-48.46-89.56-109.05-92.65-1.56-.06-3.08-.1-4.56-.1-40.44,0-50.39,23.26-98.08,23.26-.47,0-.94,0-1.42,0-6.91-.04-13.82-.06-20.73-.06s-13.93,.02-20.9,.06c-.48,0-.95,0-1.42,0-47.69,0-57.68-23.25-98.08-23.25-1.48,0-3,.03-4.56,.1-60.6,3.09-99.7,45.17-109.09,92.65C9.09,229.53,1.2,297.06,0,363.86c-.29,46.51,45.63,77.45,75.93,79.57,1.23,.09,2.45,.14,3.67,.14,56.81,0,102.1-98.93,136.79-98.94,13.23,.08,26.47,.12,39.7,.12s26.35-.04,39.52-.12c34.69,0,79.96,98.95,136.8,98.95,1.22,0,2.44-.05,3.67-.14,30.29-2.12,77.4-33.27,75.89-79.57Z"/><path d="M190.01,193.68h-28.34v-28.34c0-10.49-8.51-19-19-19s-19,8.51-19,19v28.34h-28.34c-10.49,0-19,8.51-19,19s8.51,19,19,19h28.34v28.34c0,10.49,8.51,19,19,19s19-8.51,19-19v-28.34h28.34c10.49,0,19-8.51,19-19s-8.51-19-19-19Z"/></svg>, sizes: '22', usage: 'ChatHeader, Coachmark' },
            ] as { name: string; svg: React.ReactNode; sizes: string; usage: string; color?: string }[]).map(icon => (
              <div key={icon.name} className="flex flex-col items-center gap-xs p-s rounded-card bg-white-05 border border-white-10">
                <div className={`flex items-center justify-center w-[40px] h-[40px] ${icon.color || 'text-text-body'}`}>{icon.svg}</div>
                <span className="text-xxs font-medium text-text-title text-center leading-tight">{icon.name}</span>
                <span className="text-xxs text-text-dim text-center">Sizes: {icon.sizes}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="Nav (Sidebar & BottomNav)" title="Nav Icons (Sidebar & Bottom Nav)" onVisible={onSectionVisible}>
          <div className="w-full">
            <p className="text-text-body text-sm mb-m leading-relaxed">These icons appear in Sidebar nav and BottomNav. They use <code className="text-accent-light">fill</code> with color passed as prop (active = white, inactive = white 50-80%). The Generate Images icon uses a warm gradient via CSS vars.</p>
            <div className="grid grid-cols-6 gap-m">
              {([
                { name: 'Stories', svg: <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M11.999 11.833C12.827 11.833 13.4998 12.5044 13.5 13.333V14.333C13.5 14.6092 13.2761 14.833 13 14.833C12.7239 14.833 12.5 14.6092 12.5 14.333V13.333C12.4998 13.0574 12.2754 12.833 11.999 12.833H4.00098C3.72457 12.833 3.50018 13.0574 3.5 13.333V14.333C3.5 14.6092 3.27614 14.833 3 14.833C2.72386 14.833 2.5 14.6092 2.5 14.333V13.333C2.50018 12.5044 3.17303 11.833 4.00098 11.833H11.999ZM12 5.33301C13.1045 5.33301 13.9998 6.22859 14 7.33301V8.66699C13.9998 9.77141 13.1045 10.667 12 10.667H4C2.89554 10.667 2.00018 9.77141 2 8.66699V7.33301C2.00018 6.22859 2.89554 5.33301 4 5.33301H12ZM13 1.16699C13.2761 1.16699 13.5 1.39085 13.5 1.66699V2.66699C13.4998 3.49527 12.8283 4.16699 12 4.16699H4C3.17168 4.16699 2.50018 3.49527 2.5 2.66699V1.66699C2.5 1.39085 2.72386 1.16699 3 1.16699C3.27614 1.16699 3.5 1.39085 3.5 1.66699V2.66699C3.50018 2.94298 3.72397 3.16699 4 3.16699H12C12.276 3.16699 12.4998 2.94298 12.5 2.66699V1.66699C12.5 1.39085 12.7239 1.16699 13 1.16699Z"/></svg>, sizes: '20', usage: 'Sidebar, BottomNav' },
                { name: 'Explore', svg: <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M4 0C3.93993 1.68111 5.31889 3.06007 7 3C5.31889 2.93993 3.93993 4.31889 4 6C4.06007 4.31889 2.68111 2.93993 1 3C2.68111 3.06007 4.06007 1.68111 4 0Z"/><path d="M10 2C9.89989 4.80184 12.1982 7.10011 15 7C12.1982 6.89989 9.89989 9.19816 10 12C10.1001 9.19816 7.80184 6.89989 5 7C7.80184 7.10011 10.1001 4.80184 10 2Z"/><path d="M5 8C4.91991 10.2415 6.75852 12.0801 9 12C6.75852 11.9199 4.91991 13.7585 5 16C5.08009 13.7585 3.24148 11.9199 1 12C3.24148 12.0801 5.08009 10.2415 5 8Z"/></svg>, sizes: '20', usage: 'Sidebar, BottomNav' },
                { name: 'Create Character', svg: <svg width="20" height="21" viewBox="0 0 16 16.1667" fill="none"><path d="M14.6667 6.3772V11.5C14.6667 13.7091 12.8758 15.5 10.6667 15.5H5.33333C3.12419 15.5 1.33333 13.7091 1.33333 11.5V6.16662C1.33333 3.95748 3.12419 2.16663 5.33333 2.16663H8" stroke="currentColor" strokeLinecap="round"/><path d="M6 10.8333C6 10.8333 7 11.5 8 11.5C9 11.5 10 10.8333 10 10.8333" stroke="currentColor" strokeLinecap="round"/><line x1="5.83333" y1="7.33333" x2="5.83333" y2="8.33333" stroke="currentColor" strokeLinecap="round"/><line x1="9.83333" y1="7.33333" x2="9.83333" y2="8.33333" stroke="currentColor" strokeLinecap="round"/><path d="M12.6667 0.5V2.83333M12.6667 5.16667V2.83333M12.6667 2.83333H10.3333H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>, sizes: '20×21', usage: 'Sidebar' },
                { name: 'Create / Create Story', svg: <svg width="20" height="20" viewBox="0 0 16.2002 16.1098" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M8.09961 0C3.63799 0.000206197 0 3.53247 0 7.91504C0.000223913 12.2974 3.63813 15.8289 8.09961 15.8291C12.5613 15.8291 16.2 12.2976 16.2002 7.91504C16.2002 6.72347 15.9306 5.5915 15.4473 4.57715C15.3284 4.32804 15.0295 4.22213 14.7803 4.34082C14.531 4.4596 14.4252 4.75853 14.5439 5.00781C14.9649 5.8912 15.2002 6.87602 15.2002 7.91504C15.2 11.7221 12.0324 14.8291 8.09961 14.8291C4.167 14.8289 1.00022 11.722 1 7.91504C1 4.10788 4.16686 1.00021 8.09961 1C8.81636 1 9.50824 1.10318 10.1592 1.29492C10.4238 1.37264 10.7011 1.22154 10.7793 0.957031C10.8573 0.692195 10.7062 0.414028 10.4414 0.335938C9.69953 0.117408 8.91285 0 8.09961 0ZM13.3677 0.29159C13.2757 0.0491448 12.9243 0.0491449 12.8323 0.29159L12.6989 0.643244C12.45 1.29958 11.9196 1.81706 11.2468 2.05993L10.8864 2.19005C10.6379 2.27976 10.6379 2.62267 10.8864 2.71239L11.2468 2.84251C11.9196 3.08538 12.45 3.60286 12.6989 4.25919L12.8323 4.61085C12.9243 4.85329 13.2757 4.85329 13.3677 4.61085L13.5011 4.25919C13.75 3.60286 14.2804 3.08538 14.9532 2.84251L15.3136 2.71239C15.5621 2.62267 15.5621 2.27976 15.3136 2.19005L14.9532 2.05993C14.2804 1.81706 13.75 1.29958 13.5011 0.643244L13.3677 0.29159ZM7.6 7.41463V4.79268C7.6 4.51654 7.82386 4.29268 8.1 4.29268C8.37614 4.29268 8.6 4.51654 8.6 4.79268V7.41463H11.3C11.5761 7.41463 11.8 7.63849 11.8 7.91463C11.8 8.19078 11.5761 8.41463 11.3 8.41463H8.6V11.0368C8.59987 11.3129 8.37606 11.5368 8.1 11.5368C7.82394 11.5368 7.60013 11.3129 7.6 11.0368V8.41463H4.89961C4.62365 8.41442 4.39961 8.19065 4.39961 7.91463C4.39961 7.63862 4.62365 7.41484 4.89961 7.41463H7.6Z"/></svg>, sizes: '20', usage: 'Sidebar (Create Story), BottomNav (Create)' },
                { name: 'Chats (mask)', svg: <div className="w-[20px] h-[20px] bg-text-body" style={{ maskImage: "url('/icons/icon-chat.svg')", maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskImage: "url('/icons/icon-chat.svg')", WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }} />, sizes: '20', usage: 'BottomNav (CSS mask)' },
                { name: 'Profile (mask)', svg: <div className="w-[20px] h-[20px] bg-text-body" style={{ maskImage: "url('/icons/icon-profile.svg')", maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskImage: "url('/icons/icon-profile.svg')", WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }} />, sizes: '20', usage: 'BottomNav (CSS mask)' },
              ] as { name: string; svg: React.ReactNode; sizes: string; usage: string }[]).map(icon => (
                <div key={icon.name} className="flex flex-col items-center gap-xs p-s rounded-card bg-white-05 border border-white-10">
                  <div className="flex items-center justify-center w-[40px] h-[40px] text-text-body">{icon.svg}</div>
                  <span className="text-xxs font-medium text-text-title text-center leading-tight">{icon.name}</span>
                  <span className="text-xxs text-text-dim text-center">Sizes: {icon.sizes}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="Chat Bar & Messages" title="Chat Bar & Message Icons" onVisible={onSectionVisible}>
          <div className="w-full">
            <p className="text-text-body text-sm mb-m leading-relaxed">These icons live as external SVG files in <code className="text-accent-light">/public/icons/</code>. They use CSS mask or img tags. The Generate Image icon uses a warm gradient via <code className="text-accent-light">--icon-gradient-warm</code>.</p>
            <div className="grid grid-cols-6 gap-m">
              {([
                { name: 'Bulb / Suggest', file: '/icons/icon-bulb.svg', sizes: '12', usage: 'ChatBar' },
                { name: 'Sparkle', file: '/icons/icon-sparkle.svg', sizes: '20', usage: 'ChatBar' },
                { name: 'Image / Photo', file: '/icons/icon-image.svg', sizes: '16', usage: 'ChatBar' },
                { name: 'Microphone', file: '/icons/icon-mic.svg', sizes: '20', usage: 'ChatBar (CSS mask)' },
                { name: 'Gift', file: '/icons/icon-gift.svg', sizes: '20', usage: 'ChatBar' },
                { name: 'Phone / Call', file: '/icons/icon-call.svg', sizes: '20', usage: 'ChatHeader (gradient mask)' },
                { name: 'Gallery', file: '/icons/icon-gallery.svg', sizes: '20', usage: 'ChatHeader (white-90 mask)' },
                { name: 'Like (thumb)', file: '/icons/icon-like.svg', sizes: '16', usage: 'ChatMessages (CSS mask)' },
                { name: 'Dislike (thumb)', file: '/icons/icon-dislike.svg', sizes: '16', usage: 'ChatMessages (CSS mask)' },
                { name: 'Generate Image', file: '/icons/icon-generate-image.svg', sizes: '16', usage: 'ChatMessages (gradient mask)' },
                { name: 'Regenerate', file: '/icons/icon-regenerate.svg', sizes: '16', usage: 'ChatMessages (CSS mask)' },
              ].map(icon => (
                <div key={icon.name} className="flex flex-col items-center gap-xs p-s rounded-card bg-white-05 border border-white-10">
                  <div className="flex items-center justify-center w-[40px] h-[40px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={icon.file} alt={icon.name} className="w-[20px] h-[20px] object-contain invert opacity-70" />
                  </div>
                  <span className="text-xxs font-medium text-text-title text-center leading-tight">{icon.name}</span>
                  <span className="text-xxs text-text-dim text-center">{icon.file}</span>
                  <span className="text-xxs text-text-xsmall text-center">Size: {icon.sizes}px</span>
                </div>
              )))}
            </div>
          </div>
        </Section>

        <Section id="Image Assets" title="Image-Based Icons" onVisible={onSectionVisible}>
          <div className="w-full">
            <p className="text-text-body text-sm mb-m leading-relaxed">These icons use raster images (PNG) instead of inline SVG. They cannot use <code className="text-accent-light">currentColor</code> for recoloring.</p>
            <div className="grid grid-cols-4 gap-m">
              {[
                { name: 'Trophy', file: '/trophy.png', size: '25×25', usage: 'Header, RankBanner' },
                { name: 'Credits', file: '/credit.png', size: '28×28', usage: 'Header credits pill' },
                { name: 'Logo', file: '/logo.png', size: '104×24 / 130×30', usage: 'Header, Footer, FooterMobile' },
              ].map(a => (
                <div key={a.name} className="flex flex-col items-center gap-xs p-m rounded-card bg-white-05 border border-white-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.file} alt={a.name} className="h-[32px] object-contain" />
                  <span className="text-xxs font-medium text-text-title">{a.name}</span>
                  <span className="text-xxs text-text-dim text-center">{a.file}</span>
                  <span className="text-xxs text-text-xsmall text-center">{a.size}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="Color Rules" title="Icon Color Rules" onVisible={onSectionVisible}>
          <div className="w-full">
            <p className="text-text-body text-sm mb-m leading-relaxed">All inline SVG icons must use <code className="text-accent-light">stroke=&quot;currentColor&quot;</code> or <code className="text-accent-light">fill=&quot;currentColor&quot;</code>. The parent element controls color via Tailwind text color tokens. Never hardcode hex values in SVG attributes.</p>
            <div className="flex flex-col gap-s">
              {[
                { context: 'Default / Inactive', token: 'text-text-body', hex: '#ffffffb2', desc: 'Most icons in normal state' },
                { context: 'Dimmed / Tertiary', token: 'text-text-dim', hex: '#ffffff66', desc: 'De-emphasized icons, footer actions' },
                { context: 'Active / Primary', token: 'text-text-title', hex: '#ffffff', desc: 'Active nav items, selected state' },
                { context: 'Accent link', token: 'text-secondary', hex: '#82a1ff', desc: 'Chevrons pointing to detail views (StatsRow, RankBanner)' },
                { context: 'Destructive', token: 'text-status-alert', hex: '#de5a48', desc: 'Delete, log out, negative trend' },
                { context: 'Positive', token: 'text-status-success', hex: '#b3d661', desc: 'Positive trend arrows' },
                { context: 'Story actions', token: 'text-accent-light', hex: '#988efc', desc: 'Like, comment, share icons in story cards' },
              ].map(r => (
                <div key={r.context} className="flex items-center gap-m px-m py-s rounded-card bg-white-05 border border-white-10">
                  <div className="w-[10px] h-[10px] rounded-full shrink-0" style={{ background: r.hex }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-text-title">{r.context}</span>
                    <span className="text-xxs text-text-dim ml-xs">{r.desc}</span>
                  </div>
                  <code className="text-xs text-accent-light shrink-0">{r.token}</code>
                </div>
              ))}
            </div>
          </div>
        </Section>
    </>
  )
}
