import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const responses: { [key: string]: string } = {
  hello: "Hello! How can I help you today?",
  hi: "Hello! How can I help you today?",
  services:
    "We offer Web Development, Mobile App Development, Custom Software, and CRM Solutions. What are you interested in?",
  pricing: "For pricing information, please contact our sales team through the contact form.",
  default: "I'm sorry, I don't understand. Can you please rephrase your question?",
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    const lowerCaseMessage = message.toLowerCase()
    let response = responses.default

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      response = responses.hello
    } else if (lowerCaseMessage.includes("services")) {
      response = responses.services
    } else if (lowerCaseMessage.includes("pricing")) {
      response = responses.pricing
    }

    return NextResponse.json({ reply: response })
  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
