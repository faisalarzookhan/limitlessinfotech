import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { put } from "@vercel/blob" // Assuming @vercel/blob is installed

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Basic file type validation (example)
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    }

    // Basic file size validation (example: max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds limit (5MB)" }, { status: 400 })
    }

    // In a real application, you would save the file to a persistent storage.
    // This example uses Vercel Blob for demonstration.
    // Ensure BLOB_READ_WRITE_TOKEN is set in your environment variables.

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.warn("BLOB_READ_WRITE_TOKEN is not set. Skipping actual file upload to Vercel Blob.")
      return NextResponse.json({
        success: true,
        message: "File upload simulated (BLOB_READ_WRITE_TOKEN not set).",
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      })
    }

    const blob = await put(file.name, file, {
      access: "public", // or 'private'
    })

    console.log("File uploaded to Vercel Blob:", blob)

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully!",
      url: blob.url,
      pathname: blob.pathname,
    })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
