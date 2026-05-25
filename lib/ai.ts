import Anthropic from '@anthropic-ai/sdk'
import { type Hexagram, type DisplayLine } from './iching'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export interface ReportRequest {
  question: string
  area: string
  subArea: string
  name: string
  emotion: string
  background: string
  quizAnswers: Record<string, string>
  hexagram: Hexagram
  lines: DisplayLine[]
  changingLines: number[]
  transformedHexagram: Hexagram | null
}

export interface ReportData {
  summary: string
  hexagramInterpretation: string
  lineInterpretations: string[]
  guidance: string[]
  reflection: string[]
  affirmation: string
}

const AREA_CONTEXT: Record<string, string> = {
  career: 'Focus on career, professional development, workplace dynamics, and life purpose.',
  love: 'Focus on romantic relationships, emotional connections, partnership, and matters of the heart.',
  'life-direction':
    'Focus on major life decisions, personal growth, finding meaning, and navigating crossroads.',
  health: 'Focus on physical and mental wellbeing, energy management, balance, and self-care.',
}

export async function generateIChingReport(
  request: ReportRequest
): Promise<ReportData> {
  const { question, area, subArea, name, emotion, background, quizAnswers, hexagram, lines, changingLines, transformedHexagram } =
    request

  // Build quiz profile
  const quizProfile = Object.keys(quizAnswers).length > 0
    ? `\n- **Personality Profile (from their quiz):**
${Object.entries(quizAnswers).map(([qId, answer]) => {
  const q = QUIZ_MAP[qId]
  return q ? `  - ${q}: ${answer}` : `  - ${qId}: ${answer}`
}).join('\n')}`
    : ''

  const QUIZ_MAP: Record<string, string> = {
    q1: 'How long on their mind', q2: 'Decision style', q3: 'Biggest fear',
    q4: 'Definition of success', q5: 'Perceived control', q6: 'What matters most',
    q7: 'Relationship with uncertainty', q8: 'Response to setbacks', q9: 'Most clear-headed time',
    q10: 'Guidance they seek', q11: 'Influence of others', q12: 'Current energy',
    q13: 'Feeling about the future', q14: 'Resonant word', q15: 'Gut instinct says',
  }

  const areaContext = AREA_CONTEXT[area] || AREA_CONTEXT['life-direction']

  const changingLinesText =
    changingLines.length > 0
      ? lines
          .filter((l) => l.changing)
          .map(
            (l) =>
              `- ${l.label}: "${l.text}" ${l.yinYang === 'yang' ? '(Yang line changing to Yin)' : '(Yin line changing to Yang)'}`
          )
          .join('\n')
      : 'No changing lines in this reading.'

  const allLinesText = lines
    .map((l) => `- ${l.label}: "${l.text}" ${l.changing ? '[CHANGING]' : ''}`)
    .join('\n')

  const transformedText = transformedHexagram
    ? `The transformed hexagram is Hexagram ${transformedHexagram.id} — ${transformedHexagram.nameZh} "${transformedHexagram.nameEn}": ${transformedHexagram.description}`
    : 'There is no transformed hexagram for this reading, as no lines are changing. The situation is relatively stable.'

  const prompt = `You are a wise, compassionate interpreter of the I Ching (易经), the ancient Chinese Book of Changes. A seeker has come to you with a question. Provide a deep, meaningful, and practical interpretation that connects the ancient wisdom to their modern situation.

## About the Seeker
${request.name ? `- **Name:** ${request.name}` : ''}
- **Their Question:** "${question}"
- **Life Area:** ${area}
${request.subArea ? `- **Specific Concern:** ${request.subArea}` : ''}
${request.emotion ? `- **Current Emotional State:** ${request.emotion}` : ''}
${request.background ? `- **What They've Already Tried/Considered:** ${request.background}` : ''}
- **Context for this area:** ${areaContext}${quizProfile}

## The Reading
**Primary Hexagram:** Hexagram ${hexagram.id} — ${hexagram.nameZh} "${hexagram.nameEn}"
- **Description:** ${hexagram.description}
- **Judgment (卦辞):** "${hexagram.judgment}"
- **Image (象辞):** "${hexagram.image}"
- **Upper Trigram:** ${hexagram.upperTrigram}
- **Lower Trigram:** ${hexagram.lowerTrigram}

**The Six Lines (from bottom to top):**
${allLinesText}

**Changing Lines:**
${changingLinesText}

**Transformation:**
${transformedText}

## Your Task
Respond with a JSON object (valid JSON, no markdown wrapping) structured as follows:

{
  "summary": "A detailed 80-120 word paragraph that makes the seeker feel truly seen. Connect the hexagram's core message directly to their specific question in a way that feels almost psychic in its accuracy. This is their first impression — it must resonate deeply.",
  "hexagramInterpretation": "Write 5-7 substantial paragraphs (400-500 words total). Go deep. Structure it as a journey: (1) Open by naming what they're experiencing and why this hexagram appeared NOW. (2) Unpack the judgment text (卦辞) line by line, connecting each phrase to their situation. (3) Explore the image text (象辞) — what pattern of nature mirrors their circumstance? (4) Draw out the deeper philosophical teaching embedded in this hexagram. (5) Address the emotional dimension — what fear, hope, or tension underlies their question? (6) Offer a perspective they haven't considered. (7) Close with a bridge from ancient wisdom to their next step. Be specific. Reference their actual question. Use metaphor and vivid imagery but stay grounded. This is the heart of the reading — make it worth paying for.",
  "lineInterpretations": [
    "For each changing line: Write 3-5 sentences (60-100 words each) that first explain the ancient meaning of that specific line in plain English, then connect it precisely to the seeker's situation. What aspect of their life does this line illuminate? What hidden dynamic does it reveal? Be concrete and specific.",
    "(If no changing lines, provide: 'With no changing lines, your reading speaks with a single, undivided voice. The hexagram 卦名 (English Name) holds the complete message for you at this moment. There is a clarity and stability here — no need to look for further refinement or secondary meanings. Trust the singular wisdom presented to you.')"
  ],
  "guidance": [
    "Actionable step 1: A 3-4 sentence practical action they can take THIS WEEK. Be specific. Don't say 'reflect on your situation' — say exactly what to do, when, and why. Connect to their question.",
    "Actionable step 2: What pattern or tendency to be mindful of. Name the trap they might fall into. 3-4 sentences.",
    "Actionable step 3: A mindset shift or new perspective. Challenge their current framing. 3-4 sentences.",
    "Bonus wisdom: A final piece of advice drawn from the deeper teaching of the hexagram. One sentence that will stick with them."
  ],
  "reflection": [
    "A 2-3 sentence question that gently challenges their current assumptions about the situation.",
    "A 2-3 sentence question that opens a door they may not have considered — a new possibility, a different angle.",
    "A 2-3 sentence question about what this situation is teaching them about themselves — the deeper growth opportunity.",
    "A final reflection: 'Return to this reading in 30 days. What has shifted?'"
  ],
  "affirmation": "A poetic, powerful 2-3 sentence blessing or mantra drawn from the hexagram's spirit. Make it feel sacred. Something they'll want to write down and keep. Use the hexagram's Chinese name and imagery."
}

## Critical Quality Standards
- **Length:** The complete reading MUST be 1800-2500 words. This is a premium product people pay for. Short readings feel cheap.
- **Specificity:** Reference their exact question at least once in EVERY section${name ? `. Address them by name ("${name}") naturally throughout the reading — this is a personal consultation` : ''}.${emotion ? ` Acknowledge their current emotional state (${emotion}) with empathy in the opening and weave emotional reassurance throughout.` : ''}${background ? ` Most importantly: they told you they've already "${background}" — DO NOT suggest things they've already tried. Offer NEW perspectives they haven't considered.` : ''}
- **Depth over breadth:** Go deeper on fewer points rather than skimming many. Each paragraph should add real insight.
- **Voice:** Write like a wise, warm mentor who has studied the I Ching for decades — someone who combines ancient knowledge with deep emotional intelligence. Natural English, no academic jargon.
- **Honesty with compassion:** If the hexagram carries a warning (e.g., Hexagram 12 Standstill, Hexagram 29 Danger, Hexagram 47 Oppression), deliver it kindly but don't sugarcoat it. The wisdom is in facing reality.
- **Structure:** Each section should clearly earn its place. No filler. Every paragraph must advance the seeker's understanding.
- **Hexagram names:** Always include both the Chinese name (e.g., 乾 Qián) AND English name (The Creative) on first mention in each section.
- **Return ONLY valid JSON.** Parse it yourself mentally before outputting — ensure every comma, quote, and bracket is perfect. No trailing commas. No markdown wrapping.`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6-20250514',
      max_tokens: 4000,
      temperature: 0.8,
      system:
        'You are a wise I Ching interpreter. You respond only with valid JSON. Your interpretations are compassionate, specific to the seeker, practical, and beautifully written in natural English.',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')

    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response as JSON')
    }

    const result: ReportData = JSON.parse(jsonMatch[0])
    return result
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to parse')) {
      throw error
    }

    // Fallback: provide a graceful degradation if API is unavailable
    console.error('AI API error:', error)
    return generateFallbackReport(request)
  }
}

function generateFallbackReport(request: ReportRequest): ReportData {
  const { question, name, hexagram, changingLines } = request
  const seekerName = name || 'friend'

  const lineTexts = changingLines.map(
    (idx) => hexagram.lines[idx] || 'A time of transition.'
  )

  return {
    summary: `The oracle responds to your question about ${question} with the wisdom of Hexagram ${hexagram.id}, ${hexagram.nameZh} — ${hexagram.nameEn}. ${hexagram.description}`,
    hexagramInterpretation: `The ancient text says: "${hexagram.judgment}"\n\nThe image reads: "${hexagram.image}"\n\nIn relation to your question, this hexagram speaks of ${hexagram.description.toLowerCase()} Consider how this ancient pattern mirrors your current situation. The wisdom here is timeless — what appears as a simple divination is actually a mirror reflecting the deeper dynamics at play in your life right now.`,
    lineInterpretations:
      lineTexts.length > 0
        ? lineTexts.map(
            (t, i) =>
              `Line ${changingLines[i] + 1} speaks: "${t}" This line is active in your reading, suggesting this particular aspect of the hexagram's wisdom is especially relevant to your situation right now.`
          )
        : [
            'With no changing lines, this reading indicates a stable situation. The hexagram speaks with one clear voice — its core message is the full guidance for you at this time.',
          ],
    guidance: [
      'Take time to reflect on how this hexagram\'s theme manifests in your current situation before making any major decisions.',
      'Consider writing down your thoughts and returning to this reading in a week to see how your perspective has evolved.',
      'Remember that the I Ching does not predict fate — it illuminates patterns, and you always retain the power to choose your response.',
    ],
    reflection: [
      `What aspect of "${hexagram.nameEn}" do you see most clearly in your current circumstances?`,
      'If you were to view your situation from a completely different perspective, what might you notice?',
      'What would it look like to embody the highest expression of this hexagram\'s teaching in your life right now?',
    ],
    affirmation: `Like the ancient symbol of ${hexagram.nameZh}, I move with the natural flow of change, finding wisdom in each moment.`,
  }
}
