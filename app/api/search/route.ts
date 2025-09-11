import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const mockSearchResults = [
  {
    section: "coreServices",
    content: "We offer stunning, responsive websites and powerful web applications.",
    score: 0.92,
  },
  {
    section: "faqs",
    content: "What is the typical timeline for a web development project?",
    score: 0.88,
  },
  {
    section: "portfolio",
    content: "Case Study: A complete e-commerce solution for a fashion brand.",
    score: 0.85,
  },
  {
    section: "hero",
    content: "Limitless Infotech Solution. Professional. Scalable. Data-driven.",
    score: 0.81,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  // In a real application, you would use the query to perform a semantic search.
  // Here, we're implementing a keyword-based scoring algorithm.
  const keywords = query.toLowerCase().split(" ")
  const scoredResults = mockSearchResults
    .map((result) => {
      let score = 0
      keywords.forEach((keyword) => {
        if (result.content.toLowerCase().includes(keyword)) {
          score++
        }
      })
      return { ...result, score }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)

  return NextResponse.json({ results: scoredResults })
}
