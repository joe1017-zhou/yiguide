"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const AREAS = [
  {
    value: "career", label: "Career & Work", icon: "◆",
    subAreas: ["Job change / Offer decision", "Promotion / Advancement", "Starting a business", "Workplace conflict", "Finding my calling", "Burnout / Quitting"],
    examples: ["I've been offered a job in another city. Should I go?", "I feel stuck in my career and don't know what direction to take.", "My boss and I keep clashing. How should I handle this?"],
  },
  {
    value: "love", label: "Love & Relationships", icon: "♡",
    subAreas: ["New relationship / Dating", "Current partnership", "Breakup / Divorce", "Finding someone", "Family tension", "Friendship"],
    examples: ["I've been dating someone for 3 months. Is this going somewhere?", "We've been married 5 years but feel distant. What should I do?", "I can't get over my ex. How do I move on?"],
  },
  {
    value: "life-direction", label: "Life Direction", icon: "✦",
    subAreas: ["Major life crossroads", "Finding meaning / Purpose", "Relocation decision", "Personal growth", "Feeling lost / Stuck", "Big financial decision"],
    examples: ["I'm 32 and feel like I haven't accomplished anything. What should I focus on?", "Should I move abroad or stay close to family?", "I have multiple paths ahead and I'm paralyzed by choice."],
  },
  {
    value: "health", label: "Health & Wellbeing", icon: "❋",
    subAreas: ["Physical health concern", "Mental / Emotional wellbeing", "Stress & Burnout", "Life balance", "Recovery / Healing", "Habit change"],
    examples: ["I've been anxious for months and nothing seems to help.", "I know I need to change my lifestyle but I keep failing.", "I'm recovering from a difficult period and need guidance on what's next."],
  },
]

const EMOTIONS = [
  { value: "anxious", label: "Anxious", emoji: "😰" },
  { value: "confused", label: "Confused", emoji: "😕" },
  { value: "hopeful", label: "Hopeful", emoji: "🌱" },
  { value: "frustrated", label: "Frustrated", emoji: "😤" },
  { value: "curious", label: "Curious", emoji: "🤔" },
  { value: "sad", label: "Heavy-hearted", emoji: "💙" },
  { value: "excited", label: "Excited", emoji: "✨" },
  { value: "overwhelmed", label: "Overwhelmed", emoji: "🌊" },
]

const QUIZ_QUESTIONS = [
  {
    id: "q1", question: "How long has this been on your mind?",
    options: ["A few days", "A few weeks", "Several months", "A year or more"],
  },
  {
    id: "q2", question: "When facing a tough decision, you usually rely on...",
    options: ["Gut instinct", "Logic & analysis", "Advice from others", "Signs & intuition"],
  },
  {
    id: "q3", question: "What's your biggest fear about this situation?",
    options: ["Making the wrong choice", "Letting people down", "Missing a better path", "The unknown outcome"],
  },
  {
    id: "q4", question: "What would 'success' look like to you?",
    options: ["Inner peace & happiness", "Achievement & recognition", "Security & stability", "Growth & learning"],
  },
  {
    id: "q5", question: "How much control do you feel you have right now?",
    options: ["I'm in full control", "I have some influence", "Very little control", "None — I feel powerless"],
  },
  {
    id: "q6", question: "Which matters most to you in this moment?",
    options: ["Security & safety", "Growth & expansion", "Freedom & independence", "Connection & belonging"],
  },
  {
    id: "q7", question: "Your relationship with uncertainty is...",
    options: ["I thrive in the unknown", "I can handle it", "It makes me anxious", "I avoid it completely"],
  },
  {
    id: "q8", question: "When life knocks you down, you usually...",
    options: ["Pivot and adapt quickly", "Push through with grit", "Step back and reflect", "Reach out for support"],
  },
  {
    id: "q9", question: "What time of day do you feel most clear-headed?",
    options: ["Early morning", "Midday / Afternoon", "Evening", "Late at night"],
  },
  {
    id: "q10", question: "What kind of guidance are you hoping for?",
    options: ["A clear direction", "A fresh perspective", "Practical next steps", "Emotional reassurance"],
  },
  {
    id: "q11", question: "How much do others' opinions shape your choices?",
    options: ["They guide me a lot", "I consider them carefully", "I mostly follow my own path", "I go entirely my own way"],
  },
  {
    id: "q12", question: "How would you describe your current energy?",
    options: ["Fired up & ready", "Steady & grounded", "Running on fumes", "Completely drained"],
  },
  {
    id: "q13", question: "When you imagine your future, you feel...",
    options: ["Excited & eager", "Curious & open", "Uncertain & hesitant", "Anxious & worried"],
  },
  {
    id: "q14", question: "Which word resonates with you most right now?",
    options: ["Courage", "Patience", "Clarity", "Letting go"],
  },
  {
    id: "q15", question: "Deep down, your instinct is telling you to...",
    options: ["Move forward boldly", "Wait and observe", "Change direction", "I honestly don't know"],
  },
]

interface CastData {
  reportId: string
  hexagram: { id: number; nameZh: string; nameEn: string; upperTrigram: string; lowerTrigram: string; judgment: string; image: string; description: string }
  changingLines: number[]
  transformedHexagram: { id: number; nameZh: string; nameEn: string; description: string } | null
  displayLines: { position: number; label: string; yinYang: "yin" | "yang"; changing: boolean; text: string }[]
}

type Phase = "input" | "quiz" | "casting" | "reveal" | "generating" | "error"

interface CoinState { flipping: boolean; result: number | null }
interface AnimLine { position: number; yinYang: "yin" | "yang"; changing: boolean; visible: boolean }

export default function CastPage() {
  const router = useRouter()

  // ── Form state ──
  const [name, setName] = useState("")
  const [area, setArea] = useState("life-direction")
  const [subArea, setSubArea] = useState("")
  const [question, setQuestion] = useState("")
  const [emotion, setEmotion] = useState("")
  const [background, setBackground] = useState("")
  const [showMore, setShowMore] = useState(false)
  const [useExample, setUseExample] = useState("")
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)

  // ── Flow state ──
  const [phase, setPhase] = useState<Phase>("input")
  const [castData, setCastData] = useState<CastData | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // ── Animation state ──
  const [round, setRound] = useState(0)
  const [coins, setCoins] = useState<CoinState[]>([{ flipping: false, result: null }, { flipping: false, result: null }, { flipping: false, result: null }])
  const [animLines, setAnimLines] = useState<AnimLine[]>([])
  const [ritualStep, setRitualStep] = useState<"toss" | "reveal" | "pause">("toss")
  const [showReveal, setShowReveal] = useState(false)
  const [revealStage, setRevealStage] = useState(0)
  const apiDataRef = useRef<CastData | null>(null)
  const ritualRunningRef = useRef(false)

  const currentArea = AREAS.find((a) => a.value === area)!
  const quizProgress = Object.keys(quizAnswers).length
  const quizPercent = Math.round((quizProgress / 15) * 100)

  const fetchCast = useCallback(async () => {
    const res = await fetch("/api/cast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: question.trim(), area, subArea,
        name: name.trim(), emotion,
        background: background.trim(),
        quizAnswers,
      }),
    })
    if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Failed") }
    return await res.json()
  }, [question, area, subArea, name, emotion, background, quizAnswers])

  // ── Navigate to quiz ──
  const startQuiz = useCallback(() => {
    if (!question.trim()) return
    setPhase("quiz")
    setCurrentQuizIndex(0)
  }, [question])

  // ── Answer a quiz question ──
  const answerQuiz = useCallback((qId: string, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: answer }))
    if (currentQuizIndex < 14) {
      setCurrentQuizIndex((prev) => prev + 1)
    } else {
      // All answered — start the ritual
      setPhase("casting")
      handleCastAfterQuiz()
    }
  }, [currentQuizIndex])

  // ── Skip remaining quiz questions ──
  const skipQuiz = useCallback(() => {
    setPhase("casting")
    handleCastAfterQuiz()
  }, [])

  const handleCastAfterQuiz = useCallback(async () => {
    ritualRunningRef.current = true
    setErrorMessage(null)
    setRound(0)
    setAnimLines([])
    setShowReveal(false)
    setRevealStage(0)

    let data: CastData
    try {
      data = await fetchCast()
      apiDataRef.current = data
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
      setPhase("error")
      ritualRunningRef.current = false
      return
    }

    for (let r = 0; r < 6; r++) {
      setRound(r)
      setRitualStep("toss")
      setCoins([{ flipping: true, result: null }, { flipping: true, result: null }, { flipping: true, result: null }])
      await delay(600)

      const line = data.displayLines[5 - r]
      let coinResults: number[]
      if (line.changing) { coinResults = line.yinYang === "yang" ? [3, 3, 3] : [2, 2, 2] }
      else { coinResults = line.yinYang === "yang" ? [3, 3, 2] : [2, 2, 3] }

      for (let c = 0; c < 3; c++) {
        setCoins((prev) => prev.map((coin, i) => (i === c ? { ...coin, flipping: false, result: coinResults[c] } : coin)))
        await delay(200)
      }

      setRitualStep("reveal")
      await delay(400)
      setAnimLines((prev) => [{ position: 6 - r, yinYang: line.yinYang, changing: line.changing, visible: true }, ...prev])
      setRitualStep("pause")
      await delay(500)
    }

    setShowReveal(true)
    setCastData(data)
    setPhase("reveal")
    await delay(400); setRevealStage(1)
    await delay(600); setRevealStage(2)
    await delay(800); setRevealStage(3)
    ritualRunningRef.current = false
  }, [fetchCast])

  const handleUnlock = useCallback(() => {
    if (!castData) return
    // Store everything in sessionStorage so the report page can use it
    sessionStorage.setItem("yiguide_reading", JSON.stringify({
      question: question.trim(),
      area,
      subArea,
      name: name.trim(),
      emotion,
      background: background.trim(),
      quizAnswers,
      hexagram: castData.hexagram,
      displayLines: castData.displayLines,
      changingLines: castData.changingLines,
      transformedHexagram: castData.transformedHexagram,
    }))
    setPhase("generating")
    router.push("/report")
  }, [castData, router, question, area, subArea, name, emotion, background, quizAnswers])

  const handleReset = useCallback(() => {
    setPhase("input"); setCastData(null); setErrorMessage(null)
    setRound(0); setAnimLines([]); setShowReveal(false); setRevealStage(0)
    setQuizAnswers({}); setCurrentQuizIndex(0)
    ritualRunningRef.current = false
  }, [])

  const coinEmoji = (r: number | null) => r === null ? "◉" : r === 3 ? "⚊" : "⚋"
  const isFormValid = question.trim().length > 0

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            Ask the <span className="gold-text">Oracle</span>
          </h1>
          <p className="text-starlight/50 text-sm max-w-lg mx-auto">
            The more you share, the deeper the oracle can speak
          </p>
        </div>

        {/* ════════ PHASE 1: INPUT FORM ════════ */}
        {phase === "input" && (
          <div className="glass-card p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-starlight/70 mb-1">Your name <span className="text-starlight/30 font-normal">(optional)</span></label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Sarah" className="w-full" maxLength={40} />
            </div>

            <div>
              <label className="block text-sm font-medium text-starlight/70 mb-2">What area of life is this about?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {AREAS.map((a) => (
                  <button key={a.value} type="button" onClick={() => { setArea(a.value); setSubArea("") }}
                    className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                      area === a.value ? "border-gold/40 bg-gold/[0.06] text-cream shadow-[0_0_20px_rgba(212,168,83,0.08)]" : "border-white/[0.05] bg-white/[0.01] text-starlight/50 hover:border-white/[0.12]"
                    }`}>
                    <div className="text-base mb-0.5">{a.icon}</div>
                    <div className={`text-[11px] leading-tight ${area === a.value ? "font-medium" : ""}`}>{a.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-starlight/70 mb-2">What specifically?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {currentArea.subAreas.map((s) => (
                  <button key={s} type="button" onClick={() => setSubArea(s)}
                    className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                      subArea === s ? "border-gold/40 bg-gold/[0.06] text-cream" : "border-white/[0.04] text-starlight/50 hover:border-white/[0.1]"
                    }`}>{s}</button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-starlight/70 mb-1">Your question <span className="text-gold/60">*</span></label>
              <textarea id="question" rows={3} value={question} onChange={(e) => setQuestion(e.target.value)}
                placeholder={currentArea.examples[0]} className="w-full resize-none text-sm" maxLength={400} />
              <div className="flex justify-between items-center mt-1">
                <div className="flex gap-1.5 flex-wrap">
                  {currentArea.examples.slice(0, 2).map((ex, i) => (
                    <button key={i} type="button" onClick={() => { setQuestion(ex); setUseExample(ex) }}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                        useExample === ex ? "border-gold/30 bg-gold/[0.05] text-gold/60" : "border-white/[0.05] text-starlight/30 hover:border-white/[0.1] hover:text-starlight/60"
                      }`}>✦ Use example</button>
                  ))}
                </div>
                <span className="text-[10px] text-starlight/30">{question.length}/400</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-starlight/70 mb-2">How are you feeling? <span className="text-starlight/30 font-normal">(optional)</span></label>
              <div className="flex flex-wrap gap-1.5">
                {EMOTIONS.map((e) => (
                  <button key={e.value} type="button" onClick={() => setEmotion(emotion === e.value ? "" : e.value)}
                    className={`px-2.5 py-1 rounded-full text-[11px] border transition-all ${
                      emotion === e.value ? "border-gold/40 bg-gold/[0.08] text-cream" : "border-white/[0.04] text-starlight/50 hover:border-white/[0.1]"
                    }`}><span className="mr-1">{e.emoji}</span>{e.label}</button>
                ))}
              </div>
            </div>

            <div>
              <button type="button" onClick={() => setShowMore(!showMore)}
                className="text-xs text-starlight/30 hover:text-starlight/50 transition-colors flex items-center gap-1">
                <span className={`transition-transform duration-200 ${showMore ? "rotate-45" : ""}`}>+</span>
                {showMore ? "Less context" : "Add more context (helps the oracle avoid generic advice)"}
              </button>
              {showMore && (
                <div className="mt-2">
                  <textarea rows={2} value={background} onChange={(e) => setBackground(e.target.value)}
                    placeholder="e.g., I've talked to my partner about this but we keep going in circles..." className="w-full resize-none text-sm" maxLength={300} />
                  <p className="text-[10px] text-starlight/30 mt-1">This helps the oracle give advice you haven't already heard.</p>
                </div>
              )}
            </div>

            <button onClick={startQuiz} disabled={!isFormValid}
              className={`w-full btn-primary py-3.5 text-base tracking-wide ${!isFormValid ? "opacity-40 cursor-not-allowed" : ""}`}>
              Continue to Personalize  →
            </button>
            <p className="text-center text-[11px] text-starlight/25">
              Next: 15 quick questions to help the oracle know you deeply
            </p>
          </div>
        )}

        {/* ════════ PHASE 2: QUIZ ════════ */}
        {phase === "quiz" && (
          <div className="glass-card p-6">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-starlight/40">Getting to know you</span>
                <span className="text-xs text-gold/60 font-medium">{quizPercent}%</span>
              </div>
              <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
                <div className="h-full bg-gold/40 rounded-full transition-all duration-500" style={{ width: `${quizPercent}%` }} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuizIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <p className="text-[11px] text-starlight/30 mb-1">Question {currentQuizIndex + 1} of 15</p>
                  <h3 className="font-serif text-xl text-cream leading-snug">
                    {QUIZ_QUESTIONS[currentQuizIndex].question}
                  </h3>
                </div>

                <div className="space-y-2">
                  {QUIZ_QUESTIONS[currentQuizIndex].options.map((opt) => {
                    const isSelected = quizAnswers[QUIZ_QUESTIONS[currentQuizIndex].id] === opt
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => answerQuiz(QUIZ_QUESTIONS[currentQuizIndex].id, opt)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${
                          isSelected
                            ? "border-gold/50 bg-gold/[0.08] text-cream shadow-[0_0_20px_rgba(212,168,83,0.06)]"
                            : "border-white/[0.05] bg-white/[0.01] text-starlight/60 hover:border-white/[0.12] hover:text-starlight/80"
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between">
              <button onClick={() => setCurrentQuizIndex(Math.max(0, currentQuizIndex - 1))}
                disabled={currentQuizIndex === 0}
                className={`text-xs transition-colors ${currentQuizIndex === 0 ? "text-starlight/15 cursor-not-allowed" : "text-starlight/40 hover:text-starlight/70"}`}>
                ← Back
              </button>
              <button onClick={skipQuiz}
                className="text-xs text-starlight/30 hover:text-starlight/50 transition-colors">
                Skip remaining →
              </button>
            </div>
          </div>
        )}

        {/* ════════ PHASE 3: CASTING RITUAL ════════ */}
        {phase === "casting" && (
          <div className="glass-card p-8 text-center">
            <p className="text-xs text-gold/40 tracking-[0.3em] uppercase mb-4">The coins are falling</p>
            {name && <p className="text-sm text-starlight/30 mb-3">{name}, the oracle is listening...</p>}
            <div className="mb-6">
              <p className="font-serif text-lg md:text-xl text-starlight/40 italic max-w-md mx-auto">&ldquo;{question}&rdquo;</p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-3">
              {coins.map((coin, i) => (
                <div key={i} className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                  coin.flipping ? "bg-gold/10 border border-gold/30 animate-bounce" : coin.result !== null ? "bg-cosmic-card border border-white/10" : "bg-cosmic-card border border-white/[0.04]"
                }`}>
                  <span className={coin.flipping ? "animate-spin" : ""}>{coinEmoji(coin.result)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2.5 mb-5 min-h-[170px]">
              {Array.from({ length: 6 }).map((_, rowIdx) => {
                const line = animLines.find((l) => l.position === rowIdx + 1)
                return (
                  <div key={rowIdx} className={`relative w-44 h-5 flex items-center justify-center transition-all duration-500 ${round === 5 - rowIdx && ritualStep === "toss" ? "scale-105" : ""}`}>
                    {line?.visible ? (
                      <>
                        {line.yinYang === "yang" ? (
                          <div className={`hex-line-yang transition-all duration-700 ${line.changing ? "bg-gold shadow-[0_0_12px_rgba(212,168,83,0.5)]" : "bg-cream/80"}`} />
                        ) : (
                          <div className="hex-line-yin">
                            <span className={`transition-all duration-700 ${line.changing ? "bg-gold shadow-[0_0_12px_rgba(212,168,83,0.5)]" : "bg-cream/80"}`} />
                            <span className={`transition-all duration-700 ${line.changing ? "bg-gold shadow-[0_0_12px_rgba(212,168,83,0.5)]" : "bg-cream/80"}`} />
                          </div>
                        )}
                        {line.changing && <span className="absolute -right-5 text-gold text-[10px]">●</span>}
                      </>
                    ) : <div className="w-full h-[2px] bg-white/[0.03] rounded-full" />}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-center gap-2.5 mb-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  i < round || (i === round && ritualStep !== "toss") ? "bg-gold shadow-[0_0_6px_rgba(212,168,83,0.5)]" : i === round ? "bg-gold/50 animate-pulse" : "bg-white/[0.08]"
                }`} />
              ))}
            </div>
            <p className="text-sm text-starlight/20 animate-pulse">
              {ritualStep === "toss" ? "Casting the coins..." : ritualStep === "reveal" ? "A line takes form..." : "Gathering energy..."}
            </p>
          </div>
        )}

        {/* ════════ PHASE 4: GRAND REVEAL ════════ */}
        {phase === "reveal" && castData && showReveal && (
          <div className="space-y-6">
            <div className={`glass-card glow-mystic p-10 text-center transition-all duration-1000 ${revealStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className={`transition-all duration-700 ${revealStage >= 1 ? "opacity-100" : "opacity-0"}`}>
                <div className="text-xs text-gold/40 tracking-[0.3em] uppercase mb-6">The Oracle Has Spoken</div>
                <div className="text-8xl font-serif text-cream/[0.06] mb-4">{castData.hexagram.id}</div>
              </div>
              <div className={`transition-all duration-700 ${revealStage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2 gold-text">{castData.hexagram.nameEn}</h2>
                <p className="text-2xl text-starlight/30 mb-4">{castData.hexagram.nameZh}</p>
              </div>
              <div className={`transition-all duration-700 ${revealStage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="flex flex-col items-center gap-2.5 mb-8">
                  {castData.displayLines.map((line) => (
                    <div key={line.position} className="relative w-48 h-5 flex items-center justify-center">
                      {line.yinYang === "yang" ? (
                        <div className={`hex-line-yang ${line.changing ? "!bg-gold shadow-[0_0_12px_rgba(212,168,83,0.5)]" : ""}`} />
                      ) : (
                        <div className="hex-line-yin">
                          <span className={line.changing ? "!bg-gold shadow-[0_0_12px_rgba(212,168,83,0.5)]" : ""} />
                          <span className={line.changing ? "!bg-gold shadow-[0_0_12px_rgba(212,168,83,0.5)]" : ""} />
                        </div>
                      )}
                      {line.changing && <span className="absolute -right-5 text-gold text-[10px]">●</span>}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 text-xs text-starlight/30 mb-6">
                  <span>{castData.hexagram.upperTrigram} above</span><span className="w-1 h-1 rounded-full bg-starlight/20" /><span>{castData.hexagram.lowerTrigram} below</span>
                </div>
                {castData.changingLines.length > 0 && (
                  <div className="inline-flex items-center gap-2 glass-card-light px-4 py-2 rounded-full text-sm text-starlight/50 mb-8">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    {castData.changingLines.length} moving line{castData.changingLines.length > 1 ? "s" : ""}
                    {castData.transformedHexagram && <span> → {castData.transformedHexagram.nameZh} {castData.transformedHexagram.nameEn}</span>}
                  </div>
                )}
                <div className="glass-card-light p-8 text-left mb-8">
                  <div className="text-xs text-gold/40 tracking-[0.2em] uppercase mb-4">A Glimpse of Your Reading</div>
                  <h3 className="font-serif text-lg font-semibold text-cream/80 mb-3">The Oracle&apos;s First Word</h3>
                  <p className="text-starlight/50 text-sm leading-relaxed mb-3">{castData.hexagram.description}</p>
                  <div className="border-l-2 border-gold/20 pl-4">
                    <p className="text-starlight/30 text-xs italic">&ldquo;{castData.hexagram.judgment}&rdquo;</p>
                    <p className="text-starlight/20 text-xs italic mt-1">&ldquo;{castData.hexagram.image}&rdquo;</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/[0.04]">
                    <p className="text-starlight/40 text-xs leading-relaxed">
                      <span className="text-gold/60">✦</span> Your full reading — uniquely written for <em>you</em> based on everything you shared — deciphers every changing line, reveals what to embrace &amp; avoid, and closes with a personal affirmation. ~2,000 words.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button onClick={handleUnlock} className="btn-primary px-10 py-4 text-lg">Unlock Full Reading →</button>
                  <button onClick={handleReset} className="btn-secondary px-8 py-4 text-sm">Cast Again</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════ GENERATING ════════ */}
        {phase === "generating" && (
          <div className="glass-card p-12 text-center">
            <div className="text-5xl mb-6 animate-pulse">☯</div>
            <h2 className="font-serif text-2xl font-semibold mb-3 text-cream">Weaving your reading...</h2>
            <p className="text-starlight/40 text-sm">The oracle is connecting ancient wisdom to your story</p>
          </div>
        )}

        {/* ════════ ERROR ════════ */}
        {phase === "error" && (
          <div className="glass-card p-10 text-center">
            <div className="text-5xl mb-6">⚗</div>
            <h3 className="font-serif text-xl font-semibold mb-2 text-cream">The connection wavered</h3>
            <p className="text-starlight/50 mb-8 text-sm">{errorMessage}</p>
            <button onClick={handleReset} className="btn-primary">Try Again</button>
          </div>
        )}
      </div>
    </div>
  )
}

function delay(ms: number): Promise<void> { return new Promise((r) => setTimeout(r, ms)) }
