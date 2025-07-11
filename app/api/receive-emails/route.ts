import { NextResponse } from "next/server"

interface Email {
  id: string
  from: string
  to: string
  subject: string
  content: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  isImportant: boolean
}

// Mock in-memory email storage
const mockEmails: Email[] = [
  {
    id: "email_1",
    from: "support@limitless.com",
    to: "webmail@limitless.com",
    subject: "Welcome to Limitless Webmail!",
    content:
      "Dear User,\n\nWelcome to your new Limitless Webmail account! We're excited to provide you with a secure and efficient email experience.\n\nHere are some tips to get started:\n1. Compose new emails using the 'Compose' button.\n2. Organize your emails with stars and folders.\n3. Keep an eye on important announcements from Limitless Infotech.\n\nIf you have any questions, feel free to contact our support team.\n\nBest regards,\nThe Limitless Team",
    timestamp: "2024-07-10T10:00:00Z",
    isRead: false,
    isStarred: false,
    isImportant: true,
  },
  {
    id: "email_2",
    from: "newsletter@techdaily.com",
    to: "webmail@limitless.com",
    subject: "Your Daily Tech Digest - AI Breakthroughs",
    content:
      "Good morning!\n\nHere's what's new in the world of technology today:\n\n- AI models achieve new benchmarks in natural language understanding.\n- Quantum computing makes strides towards commercial viability.\n- Cybersecurity threats continue to evolve, requiring robust solutions.\n\nStay tuned for more updates!\n\nTech Daily Team",
    timestamp: "2024-07-11T08:30:00Z",
    isRead: false,
    isStarred: false,
    isImportant: false,
  },
  {
    id: "email_3",
    from: "client@example.com",
    to: "webmail@limitless.com",
    subject: "Regarding Project X - Urgent!",
    content:
      "Hi Team,\n\nWe need to discuss the latest changes for Project X. There's an urgent bug that needs to be addressed before deployment. Please get back to me as soon as possible.\n\nThanks,\nClient",
    timestamp: "2024-07-10T15:45:00Z",
    isRead: false,
    isStarred: true,
    isImportant: true,
  },
  {
    id: "email_4",
    from: "webmail@limitless.com",
    to: "partner@example.com",
    subject: "Meeting Confirmation",
    content:
      "Hi Partner,\n\nConfirming our meeting for tomorrow at 2 PM EST. Looking forward to it!\n\nRegards,\nLimitless Team",
    timestamp: "2024-07-09T11:00:00Z",
    isRead: true,
    isStarred: false,
    isImportant: false,
  },
  {
    id: "email_5",
    from: "admin@limitless.com",
    to: "webmail@limitless.com",
    subject: "System Maintenance Notification",
    content:
      "Dear User,\n\nPlease be advised that we will be performing scheduled system maintenance on July 15th, from 1 AM to 3 AM UTC. During this period, some services may experience brief interruptions. We apologize for any inconvenience.\n\nThank you for your understanding,\nLimitless Admin Team",
    timestamp: "2024-07-08T09:00:00Z",
    isRead: true,
    isStarred: false,
    isImportant: true,
  },
]

export async function GET() {
  // Sort emails by timestamp, newest first
  const sortedEmails = [...mockEmails].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  return NextResponse.json({ success: true, emails: sortedEmails })
}

export async function POST(request: Request) {
  const { action, emailId, data } = await request.json()

  if (action === "markAsRead") {
    const emailIndex = mockEmails.findIndex((e) => e.id === emailId)
    if (emailIndex !== -1) {
      mockEmails[emailIndex].isRead = true
      return NextResponse.json({ success: true, emails: mockEmails })
    }
    return NextResponse.json({ success: false, error: "Email not found" }, { status: 404 })
  } else if (action === "toggleStar") {
    const emailIndex = mockEmails.findIndex((e) => e.id === emailId)
    if (emailIndex !== -1) {
      mockEmails[emailIndex].isStarred = !mockEmails[emailIndex].isStarred
      return NextResponse.json({ success: true, emails: mockEmails })
    }
    return NextResponse.json({ success: false, error: "Email not found" }, { status: 404 })
  } else if (action === "addEmail") {
    // Used to simulate adding sent emails to the list
    if (data) {
      const newEmail: Email = {
        id: `email_${Date.now()}`,
        from: data.from,
        to: data.to,
        subject: data.subject,
        content: data.content,
        timestamp: new Date().toISOString(),
        isRead: true, // Sent emails are considered read
        isStarred: false,
        isImportant: false,
      }
      mockEmails.push(newEmail)
      return NextResponse.json({ success: true, emails: mockEmails })
    }
    return NextResponse.json({ success: false, error: "Missing email data" }, { status: 400 })
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
}
