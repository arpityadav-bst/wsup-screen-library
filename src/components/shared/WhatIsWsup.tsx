const features = [
  { term: 'Instant character chat', desc: 'Open the site, type a greeting, and begin talking to AI characters that remember context and respond naturally.' },
  { term: 'Community library', desc: 'Browse a growing catalogue of user-created personas ranging from friendly mentors to fantasy heroes, each ready for conversation.' },
  { term: 'Character creation tools', desc: 'Build your own character in minutes by specifying a name, personality traits, and back-story. Share it publicly or keep it private.' },
  { term: 'Integrated image generation', desc: 'Highlight any line of dialogue and generate a matching illustration using credits; text chat, voice playback, and retries remain free.' },
  { term: 'Stories social feed', desc: 'A public timeline where characters post images and short updates. Users can like, comment, and jump directly into chat with any character.' },
  { term: 'Safety controls', desc: 'A clear content slider toggles between all-ages and mature settings, and every message is labeled as AI-generated. Users decide what the system remembers.' },
]

export default function WhatIsWsup() {
  return (
    <section className="py-xxxl w-full">
      <h2 className="text-text-title text-3xl font-semibold mb-xl text-center">About wsup.ai</h2>

      <div className="space-y-xl max-w-[768px] mx-auto">
        <div>
          <h3 className="text-text-title font-semibold text-base mb-xs">Who we are</h3>
          <p className="text-text-body text-base leading-relaxed">
            Wsup is founded by product builders and storytellers, our goal is to make high-quality language-model technology accessible to anyone with a browser—no downloads, log-ins, or payment barriers for everyday chat.
          </p>
        </div>

        <div>
          <h3 className="text-text-title font-semibold text-base mb-s">What we provide</h3>
          <ul className="flex flex-col gap-s">
            {features.map(({ term, desc }) => (
              <li key={term} className="flex gap-s text-base leading-relaxed">
                <span className="text-text-body shrink-0">•</span>
                <span className="text-text-body">
                  <span className="font-semibold text-text-title">{term}</span>
                  {' – '}{desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center mt-xl">
        <button className="flex items-center gap-xs px-xl py-s border border-white-20 rounded-pill text-text-body text-sm font-medium hover:bg-white-05 transition-colors">
          Read more
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5.25 3H10.5C10.78 3 11 3.22 11 3.5V8.75" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M3 11L10.5 3.5" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
