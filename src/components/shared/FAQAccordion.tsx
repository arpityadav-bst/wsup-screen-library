'use client'
import { useState } from 'react'
import { cn } from '@/lib/cn'

const faqs = [
  {
    question: 'What is Wsup.ai, and how does it differ from other AI chatbots?',
    answer: 'Wsup.ai is a free AI chatbot platform where you can chat with lifelike characters for roleplay, storytelling, or just casual conversation. Unlike many AI tools, Wsup.ai offers a no sign-up option so you can start chatting instantly.',
  },
  {
    question: 'Why choose a no-sign-up AI chatbot?',
    answer: 'No sign-up means zero friction. Jump straight into a conversation without creating an account, verifying an email, or setting a password. Your privacy is respected from the first message.',
  },
  {
    question: 'Is Wsup.ai really a free AI chatbot?',
    answer: 'Yes. Wsup.ai offers a generous free tier with access to thousands of characters and unlimited basic chats. Premium credits unlock advanced features like image generation and exclusive characters.',
  },
  {
    question: 'How does the Deep Memory feature work?',
    answer: 'Deep Memory allows characters to remember details from past conversations — your name, preferences, inside jokes, and story arcs — making every new chat feel like a continuation rather than a reset.',
  },
  {
    question: 'Can I create my own AI characters for roleplay or storytelling?',
    answer: 'Absolutely. Use the Create Character tool to define a name, personality, backstory, and appearance. Your character can be kept private or shared with the Wsup.ai community.',
  },
  {
    question: 'Does Wsup.ai support NSFW or adult AI chat?',
    answer: 'Wsup.ai has an optional SPICY mode for adult content. It is gated behind age verification and only surfaces characters that have been marked as adult by their creators.',
  },
  {
    question: 'Are there any hidden fees or usage limits?',
    answer: 'No hidden fees. The free tier is genuinely free. Premium features are clearly marked with their credit cost before you use them.',
  },
  {
    question: 'How do I start chatting with AI characters online?',
    answer: 'Browse the Explore page, click any character card, and start typing. No account required for basic chats.',
  },
  {
    question: 'How can Wsup.ai benefit my creative projects?',
    answer: 'Writers use Wsup.ai to develop character voices and test dialogue. Game designers use it for NPC prototyping. The platform supports creative work with persistent memory and branching conversation styles.',
  },
  {
    question: 'Where can I find more help or report an issue?',
    answer: 'Visit our Help Center or use the Report button inside any chat. Our moderation team reviews all reports within 24 hours.',
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-xxxl w-full">
      <h2 className="text-text-title text-3xl font-semibold mb-xl text-center">Frequently Asked Questions</h2>

      <div className="flex flex-col gap-xs max-w-[768px] mx-auto">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white-10 rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <button
              className="w-full flex items-center justify-between px-l py-m text-left gap-m group-hover:bg-white-10 transition-colors pointer-events-none"
            >
              <span className="text-base font-medium text-text-title">
                {i + 1}. {faq.question}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={cn('shrink-0 transition-transform duration-200', open === i && 'rotate-180')}
              >
                <path d="M4 6l4 4 4-4" className="stroke-white-50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className={cn('grid transition-all duration-300 ease-in-out group-hover:bg-white-10', open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden">
                <p className="px-l pb-m text-text-body text-base leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
