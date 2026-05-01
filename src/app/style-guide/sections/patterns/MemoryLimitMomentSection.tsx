'use client'

import { Section, SubLabel, StateLabel } from '../../helpers'
import MemoryLimitMoment from '@/components/chat/MemoryLimitMoment'

export default function MemoryLimitMomentSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Memory Limit Moment" title="Memory Limit Moment" onVisible={onSectionVisible}>
      <div className="w-full max-w-[760px] flex flex-col gap-l">

        <div>
          <SubLabel>Stage 1 — initial prompt (interactive: click &ldquo;Maybe later&rdquo; to see Stage 2)</SubLabel>
          <div className="p-m bg-page-bg rounded-card">
            <MemoryLimitMoment characterName="Billie" />
          </div>
          <StateLabel>
            Single bubble (max-w 306px). (1) Billie&apos;s italic emotion + speech (white-50 italic / white-100); (2) hairline divider; (3) system explanation in <code className="text-accent-light">text-text-small</code> (60%); (4) full-width primary CTA; (5) &ldquo;Maybe later&rdquo; using <code className="text-accent-light">.link</code> utility (text-secondary, underlined). Clicking &ldquo;Maybe later&rdquo; transforms the bubble into Stage 2 — Billie accepting the user&apos;s decision, with a self-aware nod to her now-impaired memory.
          </StateLabel>
        </div>

        <div>
          <SubLabel>Stage 2 — Billie accepts (after clicking &ldquo;Maybe later&rdquo;)</SubLabel>
          <div className="p-m bg-page-bg rounded-card">
            <MemoryLimitMoment
              characterName="Billie"
              initialStage="accepted"
            />
          </div>
          <StateLabel>
            Reached by clicking &ldquo;Maybe later&rdquo; on Stage 1 (or set <code className="text-accent-light">initialStage=&quot;accepted&quot;</code> to preview directly). The bubble strips to just emotion + speech — no divider, no system text, no CTAs. Reads as a normal AI message. Billie acknowledges the user&apos;s choice <em>in-character</em>, foreshadowing the consequence (impaired memory) with self-aware humor instead of nagging about install. Default copy: <em>&ldquo;Got it — sticking with what I&apos;ve got. Heads up: I&apos;ll probably ask what we were just talking about. A lot.&rdquo;</em> Override via <code className="text-accent-light">acceptedEmotion</code> / <code className="text-accent-light">acceptedSpeech</code> props for per-character voice.
          </StateLabel>
        </div>

        <div>
          <SubLabel>Different character — Sarah</SubLabel>
          <div className="p-m bg-page-bg rounded-card">
            <MemoryLimitMoment characterName="Sarah" />
          </div>
          <StateLabel>
            Default emotion + speech are character-agnostic. For per-character custom moments, override <code className="text-accent-light">emotion</code> and <code className="text-accent-light">speech</code> props.
          </StateLabel>
        </div>

        <div>
          <SubLabel>Custom moment — Kai</SubLabel>
          <div className="p-m bg-page-bg rounded-card">
            <MemoryLimitMoment
              characterName="Kai"
              emotion="He scratches his head, looking confused."
              speech="Hold up — what were we doing again? Brain freeze."
            />
          </div>
          <StateLabel>
            Per-character voice can be tuned via <code className="text-accent-light">emotion</code> and <code className="text-accent-light">speech</code> props — match each character&apos;s personality. Kai&apos;s casual gamer voice differs from Billie&apos;s introspective tone.
          </StateLabel>
        </div>

        <div className="mt-s p-s bg-white-05 rounded-card border border-white-10 text-xs text-text-body leading-relaxed max-w-[600px]">
          <p className="font-semibold text-text-title mb-xxs">Layout shape</p>
          <p>Single bubble (max-w 340px), all content inside: emotion + speech, divider, system explanation, CTA. Similar to a normal AIBubble but stripped of feedback toolbar and replaced with one primary action.</p>
          <p className="mt-xxs font-semibold text-text-title">Color hierarchy inside the bubble</p>
          <p>Speech: <code className="text-accent-light">text-white</code> (100%) — Billie&apos;s message, primary. Emotion: <code className="text-accent-light">text-white-50 italic</code> — narration. System text: <code className="text-accent-light">text-text-small</code> (60%) — explanation, recessive enough that it reads as &ldquo;system note&rdquo; not as a second voice competing with Billie.</p>
          <p className="mt-xxs font-semibold text-text-title">Trigger</p>
          <p>Parent owns threshold logic — fires when chat session crosses ~2,267 token avg input or ~40 messages on one character. Once-per-character-per-user-per-7-days. Replaces the AI&apos;s next response (or the typing indicator) with this moment.</p>
          <p className="mt-xxs font-semibold text-text-title">Behavior — two stages</p>
          <p>Stage 1 (prompt): full bubble with system text, CTA, and &quot;Maybe later&quot; link.
          &quot;Continue to chat in app&quot; dispatches <code className="text-accent-light">wsup:open-install-prompt</code>.
          Stage 2 (accepted): clicking &quot;Maybe later&quot; transforms the SAME bubble — strips to a normal-looking AI message where Billie accepts the user&apos;s choice in-character. Instead of nagging or disappearing, the character lives with the consequence: she keeps chatting but with a self-aware acknowledgment of her impaired memory. Stays in chat history as a real conversation turn.</p>
          <p className="mt-xxs font-semibold text-text-title">Why two stages</p>
          <p>A pure dismiss would erase the moment — a missed storytelling beat. Transforming the bubble keeps the character relationship continuous: the user&apos;s choice has a felt consequence (Billie now operates on partial memory) but the chat doesn&apos;t reset or guilt-trip. Funny + honest + on-brand for an AI character platform.</p>
          <p className="mt-xxs font-semibold text-text-title">Stacking</p>
          <p>Coexists with DormancyBanner (top of chat) and the Play Games coachmark. Lives in the chat scroll itself.</p>
          <p className="mt-xxs font-semibold text-text-title">Dev toggle</p>
          <p>On <code className="text-accent-light">/chat</code>: cycle to <code className="text-accent-light">Memory full (inline)</code> via the R panel.</p>
        </div>

      </div>
    </Section>
  )
}
