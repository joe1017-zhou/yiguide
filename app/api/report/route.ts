import { NextResponse } from "next/server"
import { generateIChingReport, type ReportRequest } from "@/lib/ai"

export async function POST(_request: Request) {
  try {
    const body = await _request.json()

    if (!body.hexagram || !body.lines) {
      return NextResponse.json(
        { success: false, error: "Missing cast data in request body" },
        { status: 400 }
      )
    }

    const reportData = await generateIChingReport(body as ReportRequest)

    return NextResponse.json({
      success: true,
      data: reportData,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate report"
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
