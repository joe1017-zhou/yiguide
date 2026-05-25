import { NextResponse } from "next/server"
import { generateIChingReport } from "@/lib/ai"
import { getReadingStore } from "@/lib/store"

const readingStore = getReadingStore()

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reading = readingStore.get(id)

    if (!reading) {
      return NextResponse.json({ success: false, error: "Reading not found" }, { status: 404 })
    }

    if (reading.reportData) {
      return NextResponse.json({
        success: true,
        data: reading.reportData,
        hexagram: { id: reading.castResult.hexagram.id, nameZh: reading.castResult.hexagram.nameZh, nameEn: reading.castResult.hexagram.nameEn },
      })
    }

    const reportData = await generateIChingReport({
      question: reading.question,
      area: reading.area,
      subArea: reading.subArea,
      name: reading.name,
      emotion: reading.emotion,
      background: reading.background,
      quizAnswers: reading.quizAnswers,
      hexagram: reading.castResult.hexagram,
      lines: reading.displayLines,
      changingLines: reading.castResult.changingLines,
      transformedHexagram: reading.castResult.transformedHexagram,
    })

    reading.reportData = reportData
    readingStore.set(id, reading)

    return NextResponse.json({
      success: true,
      data: reportData,
      hexagram: { id: reading.castResult.hexagram.id, nameZh: reading.castResult.hexagram.nameZh, nameEn: reading.castResult.hexagram.nameEn },
    })
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to generate report" },
      { status: 500 }
    )
  }
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reading = readingStore.get(id)

    if (!reading) {
      return NextResponse.json({ success: false, error: "Reading not found" }, { status: 404 })
    }

    const reportData = await generateIChingReport({
      question: reading.question,
      area: reading.area,
      subArea: reading.subArea,
      name: reading.name,
      emotion: reading.emotion,
      background: reading.background,
      quizAnswers: reading.quizAnswers,
      hexagram: reading.castResult.hexagram,
      lines: reading.displayLines,
      changingLines: reading.castResult.changingLines,
      transformedHexagram: reading.castResult.transformedHexagram,
    })

    reading.reportData = reportData
    readingStore.set(id, reading)

    return NextResponse.json({ success: true, data: reportData })
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to generate report" },
      { status: 500 }
    )
  }
}
