import type { DisplayLine, Hexagram, LineType } from "./iching"
import type { ReportData } from "./ai"

export interface ReadingEntry {
  question: string
  area: string
  subArea: string
  name: string
  emotion: string
  background: string
  quizAnswers: Record<string, string>
  castResult: {
    hexagram: Hexagram
    changingLines: number[]
    transformedHexagram: Hexagram | null
    lines: LineType[]
  }
  displayLines: DisplayLine[]
  reportData?: ReportData
}

declare global {
  var __readingStore: Map<string, ReadingEntry> | undefined
}

export function getReadingStore(): Map<string, ReadingEntry> {
  if (!globalThis.__readingStore) {
    globalThis.__readingStore = new Map()
  }
  return globalThis.__readingStore
}
