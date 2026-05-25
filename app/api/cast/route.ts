import { NextResponse } from "next/server"
import { castHexagram, getDisplayLines } from "@/lib/iching"
import { getReadingStore } from "@/lib/store"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      question,
      area,
      subArea = "",
      name = "",
      emotion = "",
      background = "",
      quizAnswers = {},
    } = body as {
      question: string
      area: string
      subArea?: string
      name?: string
      emotion?: string
      background?: string
      quizAnswers?: Record<string, string>
    }

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Question is required" },
        { status: 400 }
      )
    }

    if (question.trim().length > 500) {
      return NextResponse.json(
        { success: false, error: "Question must be under 500 characters" },
        { status: 400 }
      )
    }

    const validAreas = ["career", "love", "life-direction", "health"]
    if (!validAreas.includes(area)) {
      return NextResponse.json(
        { success: false, error: "Invalid area of concern" },
        { status: 400 }
      )
    }

    const castResult = castHexagram()
    const displayLines = getDisplayLines(castResult.hexagram, castResult.changingLines)
    const reportId = uuidv4()

    const store = getReadingStore()
    store.set(reportId, {
      question: question.trim(),
      area,
      subArea: subArea.trim(),
      name: name.trim(),
      emotion: emotion.trim(),
      background: background.trim(),
      quizAnswers,
      castResult,
      displayLines,
    })

    return NextResponse.json({
      success: true,
      reportId,
      castResult: {
        hexagram: {
          id: castResult.hexagram.id,
          nameZh: castResult.hexagram.nameZh,
          nameEn: castResult.hexagram.nameEn,
          upperTrigram: castResult.hexagram.upperTrigram,
          lowerTrigram: castResult.hexagram.lowerTrigram,
          judgment: castResult.hexagram.judgment,
          image: castResult.hexagram.image,
          description: castResult.hexagram.description,
        },
        changingLines: castResult.changingLines,
        transformedHexagram: castResult.transformedHexagram
          ? {
              id: castResult.transformedHexagram.id,
              nameZh: castResult.transformedHexagram.nameZh,
              nameEn: castResult.transformedHexagram.nameEn,
              description: castResult.transformedHexagram.description,
            }
          : null,
      },
      displayLines,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
