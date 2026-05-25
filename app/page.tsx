import Link from "next/link"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Star particles background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="star-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                opacity: 0.1 + Math.random() * 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 glass-card-light px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs text-starlight/60 tracking-wider uppercase">
              Powered by 3,000 Years of Eastern Wisdom
            </span>
          </div>

          {/* Main headline */}
          <h1 className="animate-fade-in-delay-1 font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="gold-text">Ancient Wisdom</span>
            <br />
            <span className="text-cream">For Modern Decisions</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-delay-2 max-w-2xl mx-auto text-lg md:text-xl text-starlight/60 leading-relaxed mb-10">
            Ask a question. Cast your hexagram. Receive a deeply personal AI
            interpretation rooted in the I Ching — the world&apos;s oldest
            decision-making system.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cast" className="btn-primary text-lg px-8 py-3.5">
              Ask the Oracle →
            </Link>
            <Link
              href="/pricing"
              className="btn-secondary text-lg px-8 py-3.5"
            >
              View Plans
            </Link>
          </div>

          {/* Trust signal */}
          <p className="mt-6 text-xs text-starlight/30">
            Free preview · No account required to try
          </p>
        </div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic-base to-transparent pointer-events-none" />
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-16">
            How It <span className="gold-text">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "✧",
                title: "Ask Your Question",
                desc: "What's on your mind? Career, love, direction, or health — frame your question and the oracle will respond.",
              },
              {
                step: "02",
                icon: "☯",
                title: "Cast the Hexagram",
                desc: "The ancient three-coin method generates one of 64 hexagrams — a unique pattern of lines that mirrors your situation.",
              },
              {
                step: "03",
                icon: "◇",
                title: "Receive Your Reading",
                desc: "AI-powered interpretation reveals the hexagram's meaning, moving lines, and specific guidance for your question.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="glass-card p-8 text-center group hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="text-xs text-gold/60 tracking-widest mb-4">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-cream">
                  {item.title}
                </h3>
                <p className="text-sm text-starlight/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-6 bg-cosmic-deep/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-16">
            Why People <span className="gold-text">Trust</span> the I Ching
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Timeless Wisdom",
                desc: "For over three millennia, emperors, scholars, and seekers have turned to the I Ching for guidance at life's crossroads. Now you can too — with a modern, personal touch.",
              },
              {
                title: "Deeply Personal",
                desc: "Unlike generic horoscopes, your reading is uniquely generated from your question and the specific hexagram cast. No two readings are alike.",
              },
              {
                title: "Practical, Not Mystical",
                desc: "We don't predict your future. We illuminate patterns, offer perspective, and help you see your situation with new clarity — so you can make better decisions.",
              },
              {
                title: "The Original Decision Tool",
                desc: "Long before pro-con lists and decision matrices, the I Ching offered a framework for thinking through life's complexities. It still works.",
              },
              {
                title: "Rooted in Philosophy",
                desc: "The I Ching isn't superstition — it's a philosophical system exploring how change operates in the world, studied by Carl Jung, Leibniz, and countless thinkers.",
              },
              {
                title: "Your Private Sanctuary",
                desc: "No social features. No public sharing. Just you and the oracle. Your questions and readings remain completely private.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card-light p-6">
                <h3 className="font-serif text-lg font-semibold mb-2 text-cream">
                  {item.title}
                </h3>
                <p className="text-sm text-starlight/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card glow-gold p-12">
            <span className="text-5xl block mb-6">☯</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Ready to Ask the <span className="gold-text">Oracle</span>?
            </h2>
            <p className="text-starlight/50 mb-8 leading-relaxed max-w-xl mx-auto">
              Your first reading includes a free preview. Unlock the full
              interpretation — 6 sections of personalized guidance — for just
              $4.99, or subscribe for unlimited readings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/cast" className="btn-primary text-lg px-10 py-4">
                Cast Your First Hexagram
              </Link>
              <Link
                href="/pricing"
                className="btn-secondary text-lg px-10 py-4"
              >
                See Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
