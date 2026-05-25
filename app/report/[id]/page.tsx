"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"

interface ReportData {
  summary: string
  hexagramInterpretation: string
  lineInterpretations: string[]
  guidance: string[]
  reflection: string[]
  affirmation: string
}

interface ReportState {
  status: "loading" | "preview" | "full" | "generating" | "error"
  data: ReportData | null
  hexagramName: string | null
  errorMessage: string | null
  hasPaid: boolean
}

export default function ReportPage() {
  const params = useParams()
  const id = params.id as string
  const [state, setState] = useState<ReportState>({
    status: "loading",
    data: null,
    hexagramName: null,
    errorMessage: null,
    hasPaid: false,
  })

  const fetchReport = useCallback(async () => {
    try {
      const res = await fetch(`/api/report/${id}`)
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to load report")
      }
      const result = await res.json()
      setState((prev) => ({
        ...prev,
        status: "preview",
        data: result.data,
        hexagramName: result.hexagram
          ? `${result.hexagram.nameZh} — ${result.hexagram.nameEn}`
          : null,
      }))
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong"
      setState((prev) => ({
        ...prev,
        status: "error",
        errorMessage: message,
      }))
    }
  }, [id])

  useEffect(() => {
    fetchReport()
  }, [fetchReport])

  const handleUnlock = useCallback(async () => {
    setState((prev) => ({ ...prev, status: "generating" }))
    try {
      const res = await fetch(`/api/report/${id}`, { method: "POST" })
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
      const message =
        error instanceof Error ? error.message : "Generation failed"
      setState((prev) => ({
        ...prev,
        status: "error",
        errorMessage: message,
        hasPaid: true,
      }))
    }
  }, [id])

  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse">☯</div>
          <p className="text-starlight/50">Preparing your reading...</p>
        </div>
      </div>
    )
  }

  if (state.status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-card p-10 text-center max-w-md">
          <div className="text-4xl mb-4">⚠</div>
          <h2 className="font-serif text-xl font-semibold mb-2 text-cream">
            Something went wrong
          </h2>
          <p className="text-starlight/50 mb-6 text-sm">
            {state.errorMessage}
          </p>
          <a href="/cast" className="btn-primary inline-block">
            Try Again
          </a>
        </div>
      </div>
    )
  }

  const data = state.data
  if (!data) return null

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            Your <span className="gold-text">Reading</span>
          </h1>
          {state.hexagramName && (
            <p className="text-starlight/40">{state.hexagramName}</p>
          )}
        </div>

        {/* Summary (always visible as preview) */}
        <div className="glass-card p-8 mb-6 animate-fade-in">
          <div className="text-xs text-gold/60 tracking-widest mb-3 uppercase">
            The Oracle Speaks
          </div>
          <p className="text-starlight/80 text-lg leading-relaxed font-serif italic">
            {data.summary}
          </p>
        </div>

        {/* Paywall */}
        {(state.status === "preview" || state.status === "generating") && (
          <div className="glass-card p-10 text-center animate-fade-in">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="font-serif text-2xl font-semibold mb-3 text-cream">
              Unlock Your Full Reading
            </h2>
            <p className="text-starlight/50 mb-2 max-w-md mx-auto">
              Your complete reading includes 5 more sections: detailed hexagram
              interpretation, line-by-line analysis, specific guidance,
              reflection questions, and a personal affirmation.
            </p>
            <p className="text-gold/70 font-semibold mb-6">
              One-time payment — $4.99
            </p>

            <button onClick={handleUnlock} className="btn-primary px-12 py-4">
              {state.status === "generating"
                ? "Generating..."
                : "Unlock Full Reading — $4.99"}
            </button>

            <p className="mt-4 text-xs text-starlight/30">
              Your reading is generated uniquely for you using AI. Satisfaction
              guaranteed.
            </p>
          </div>
        )}

        {/* Full Report Sections */}
        {state.status === "full" && (
          <div className="space-y-6 animate-fade-in">
            {/* Section 2: Hexagram Interpretation */}
            <section className="glass-card p-8">
              <h2 className="text-xs text-gold/60 tracking-widest mb-4 uppercase">
                The Hexagram&apos;s Wisdom
              </h2>
              <div className="prose prose-invert max-w-none">
                {data.hexagramInterpretation
                  .split("\n\n")
                  .map((para, i) => (
                    <p
                      key={i}
                      className="text-starlight/70 leading-relaxed mb-3 last:mb-0"
                    >
                      {para}
                    </p>
                  ))}
              </div>
            </section>

            {/* Section 3: Line Interpretations */}
            {data.lineInterpretations.length > 0 && (
              <section className="glass-card p-8">
                <h2 className="text-xs text-gold/60 tracking-widest mb-4 uppercase">
                  The Moving Lines
                </h2>
                <div className="space-y-4">
                  {data.lineInterpretations.map((line, i) => (
                    <div
                      key={i}
                      className="glass-card-light p-5 border-l-2 border-gold/30"
                    >
                      <p className="text-starlight/70 leading-relaxed text-sm">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 4: Guidance */}
            <section className="glass-card p-8">
              <h2 className="text-xs text-gold/60 tracking-widest mb-4 uppercase">
                Your Guidance
              </h2>
              <div className="space-y-4">
                {data.guidance.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-gold font-serif text-lg mt-0.5 shrink-0">
                      {i + 1}.
                    </span>
                    <p className="text-starlight/70 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Reflection */}
            <section className="glass-card p-8">
              <h2 className="text-xs text-gold/60 tracking-widest mb-4 uppercase">
                For Reflection
              </h2>
              <div className="space-y-4">
                {data.reflection.map((item, i) => (
                  <div
                    key={i}
                    className="glass-card-light p-5"
                  >
                    <p className="text-starlight/60 text-sm leading-relaxed italic">
                      &ldquo;{item}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Affirmation */}
            <section className="glass-card glow-gold p-10 text-center">
              <div className="text-xs text-gold/60 tracking-widest mb-4 uppercase">
                Your Affirmation
              </div>
              <p className="font-serif text-2xl text-cream leading-relaxed gold-text">
                {data.affirmation}
              </p>
            </section>

            {/* Bottom actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-8">
              <a href="/cast" className="btn-primary px-10">
                Cast Another Hexagram
              </a>
              <a href="/pricing" className="btn-secondary px-10 text-sm">
                Get Unlimited Readings
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
