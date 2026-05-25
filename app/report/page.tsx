"use client"

import { useState, useEffect, useCallback } from "react"

interface ReportData {
  summary: string
  hexagramInterpretation: string
  lineInterpretations: string[]
  guidance: string[]
  reflection: string[]
  affirmation: string
}

interface StoredReading {
  question: string
  area: string
  subArea: string
  name: string
  emotion: string
  background: string
  quizAnswers: Record<string, string>
  hexagram: { id: number; nameZh: string; nameEn: string; description: string; judgment: string; image: string }
  displayLines: { position: number; label: string; yinYang: "yin" | "yang"; changing: boolean }[]
  changingLines: number[]
  transformedHexagram: { id: number; nameZh: string; nameEn: string; description: string } | null
}

export default function ReportPage() {
  const [state, setState] = useState<{
    status: "loading" | "preview" | "full" | "error"
    data: ReportData | null
    reading: StoredReading | null
    hexagramName: string | null
    errorMessage: string | null
  }>({
    status: "loading",
    data: null,
    reading: null,
    hexagramName: null,
    errorMessage: null,
  })

  const [isGenerating, setIsGenerating] = useState(false)

  // Load stored reading on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("yiguide_reading")
    if (!stored) {
      setState((prev) => ({ ...prev, status: "error", errorMessage: "No reading found. Please cast a hexagram first." }))
      return
    }

    const reading: StoredReading = JSON.parse(stored)
    const hexName = `${reading.hexagram.nameZh} — ${reading.hexagram.nameEn}`

    setState((prev) => ({
      ...prev,
      status: "preview",
      reading,
      hexagramName: hexName,
    }))
  }, [])

  const handleUnlock = useCallback(async () => {
    if (!state.reading) return
    setIsGenerating(true)

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: state.reading.question,
          area: state.reading.area,
          subArea: state.reading.subArea,
          name: state.reading.name,
          emotion: state.reading.emotion,
          background: state.reading.background,
          quizAnswers: state.reading.quizAnswers,
          hexagram: state.reading.hexagram,
          lines: state.reading.displayLines,
          changingLines: state.reading.changingLines,
          transformedHexagram: state.reading.transformedHexagram,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to generate report")
      }

      const result = await res.json()
      setState((prev) => ({
        ...prev,
        status: "full",
        data: result.data,
        hasPaid: true,
      }))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Generation failed"
      setIsGenerating(false)
      setState((prev) => ({ ...prev, status: "error", errorMessage: message }))
    }
  }, [state.reading])

  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center"><div className="text-5xl mb-4 animate-pulse">☯</div><p className="text-starlight/50">Preparing...</p></div>
      </div>
    )
  }

  if (state.status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-card p-10 text-center max-w-md">
          <div className="text-4xl mb-4">⚠</div>
          <h2 className="font-serif text-xl font-semibold mb-2 text-cream">Something went wrong</h2>
          <p className="text-starlight/50 mb-6 text-sm">{state.errorMessage}</p>
          <a href="/cast" className="btn-primary inline-block">Try Again</a>
        </div>
      </div>
    )
  }

  const data = state.data
  const reading = state.reading
  if (!reading) return null

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            Your <span className="gold-text">Reading</span>
          </h1>
          {state.hexagramName && <p className="text-starlight/40">{state.hexagramName}</p>}
        </div>

        {/* Preview: Summary + Hexagram info */}
        {state.status === "preview" && (
          <>
            <div className="glass-card p-8 mb-6 animate-fade-in">
              <div className="text-xs text-gold/60 tracking-widest mb-3 uppercase">The Oracle Speaks</div>
              <p className="text-starlight/80 text-lg leading-relaxed font-serif italic">
                The hexagram {reading.hexagram.nameZh} &mdash; {reading.hexagram.nameEn} has appeared for your question. {reading.hexagram.description}
              </p>
              <div className="mt-4 pt-4 border-t border-white/[0.04]">
                <div className="border-l-2 border-gold/20 pl-4">
                  <p className="text-starlight/30 text-xs italic">&ldquo;{reading.hexagram.judgment}&rdquo;</p>
                  <p className="text-starlight/20 text-xs italic mt-1">&ldquo;{reading.hexagram.image}&rdquo;</p>
                </div>
              </div>
            </div>

            {/* Paywall */}
            <div className="glass-card p-10 text-center animate-fade-in">
              <div className="text-4xl mb-4">🔒</div>
              <h2 className="font-serif text-2xl font-semibold mb-3 text-cream">Unlock Your Full Reading</h2>
              <p className="text-starlight/50 mb-2 max-w-md mx-auto text-sm">
                Your complete reading includes 6 detailed sections: personalized hexagram interpretation,
                line-by-line analysis, specific guidance, deep reflection questions, and a personal affirmation.
                Approximately 2,000 words of personalized wisdom.
              </p>
              {reading.changingLines.length > 0 && (
                <div className="inline-flex items-center gap-2 glass-card-light px-4 py-2 rounded-full text-sm text-starlight/50 mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  {reading.changingLines.length} moving line{reading.changingLines.length > 1 ? "s" : ""}
                  {reading.transformedHexagram && <span> → {reading.transformedHexagram.nameZh} {reading.transformedHexagram.nameEn}</span>}
                </div>
              )}
              <p className="text-gold/70 font-semibold mb-6">One-time payment — $4.99</p>
              <button onClick={handleUnlock} className="btn-primary px-12 py-4" disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Unlock Full Reading — $4.99"}
              </button>
              <p className="mt-4 text-xs text-starlight/30">Satisfaction guaranteed · Instant delivery</p>
            </div>
          </>
        )}

        {/* Generating */}
        {isGenerating && (
          <div className="glass-card p-12 text-center">
            <div className="text-5xl mb-6 animate-pulse">☯</div>
            <h2 className="font-serif text-2xl font-semibold mb-3 text-cream">Weaving your reading...</h2>
            <p className="text-starlight/40 text-sm">The oracle connects ancient wisdom to your story</p>
          </div>
        )}

        {/* Full Report */}
        {state.status === "full" && data && (
          <div className="space-y-6 animate-fade-in">
            {/* Section 1: Summary */}
            <section className="glass-card p-8">
              <h2 className="text-xs text-gold/60 tracking-widest mb-4 uppercase">The Oracle Speaks</h2>
              <p className="text-starlight/80 text-lg leading-relaxed font-serif italic">{data.summary}</p>
            </section>

            {/* Section 2: Hexagram Interpretation */}
            <section className="glass-card p-8">
              <h2 className="text-xs text-gold/60 tracking-widest mb-4 uppercase">The Hexagram&apos;s Wisdom</h2>
              <div className="prose prose-invert max-w-none">
                {data.hexagramInterpretation.split("\n\n").map((para, i) => (
                  <p key={i} className="text-starlight/70 leading-relaxed mb-3 last:mb-0">{para}</p>
                ))}
              </div>
            </section>

            {/* Section 3: Line Interpretations */}
            {data.lineInterpretations.length > 0 && (
              <section className="glass-card p-8">
                <h2 className="text-xs text-gold/60 tracking-widest mb-4 uppercase">The Moving Lines</h2>
                <div className="space-y-4">
                  {data.lineInterpretations.map((line, i) => (
                    <div key={i} className="glass-card-light p-5 border-l-2 border-gold/30">
                      <p className="text-starlight/70 leading-relaxed text-sm">{line}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 4: Guidance */}
            <section className="glass-card p-8">
              <h2 className="text-xs text-gold/60 tracking-widest mb-4 uppercase">Your Guidance</h2>
              <div className="space-y-4">
                {data.guidance.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-gold font-serif text-lg mt-0.5 shrink-0">{i + 1}.</span>
                    <p className="text-starlight/70 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Reflection */}
            <section className="glass-card p-8">
              <h2 className="text-xs text-gold/60 tracking-widest mb-4 uppercase">For Reflection</h2>
              <div className="space-y-4">
                {data.reflection.map((item, i) => (
                  <div key={i} className="glass-card-light p-5">
                    <p className="text-starlight/60 text-sm leading-relaxed italic">&ldquo;{item}&rdquo;</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Affirmation */}
            <section className="glass-card glow-gold p-10 text-center">
              <div className="text-xs text-gold/60 tracking-widest mb-4 uppercase">Your Affirmation</div>
              <p className="font-serif text-2xl text-cream leading-relaxed gold-text">{data.affirmation}</p>
            </section>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-8">
              <a href="/cast" className="btn-primary px-10">Cast Another Hexagram</a>
              <a href="/pricing" className="btn-secondary px-10 text-sm">Get Unlimited Readings</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
