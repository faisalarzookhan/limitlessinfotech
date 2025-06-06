import { type NextRequest, NextResponse } from "next/server"

// Mock email storage (in production, use a database)
let mockEmails = [
  {
    id: "1",
    from: "client@business.com",
    to: "info@limitless.com",
    subject: "Project Requirements Discussion",
    content:
      "Hi team,\n\nI wanted to discuss the upcoming project requirements for our new web application. We need to ensure all security protocols are in place.\n\nBest regards,\nClient",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    isStarred: true,
    isImportant: true,
  },
  {
    id: "2",
    from: "support@limitless.com",
    to: "team@limitless.com",
    subject: "System Maintenance Notification",
    content:
      "Dear Team,\n\nScheduled maintenance will occur tonight from 2 AM to 4 AM EST. All services will be temporarily unavailable.\n\nThank you for your patience.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    isStarred: false,
    isImportant: false,
  },
  {
    id: "3",
    from: "team@limitless.com",
    to: "admin@limitless.com",
    subject: "Weekly Progress Report",
    content:
      "Team Update:\n\nThis week we completed 3 major milestones and are on track for our Q1 deliverables. Great work everyone!\n\nNext week priorities:\n- Code review\n- Testing phase\n- Client presentation",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    isStarred: true,
    isImportant: false,
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      emails: mockEmails.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, emailId, data } = await request.json()

    switch (action) {
      case "markAsRead":
        mockEmails = mockEmails.map((email) => (email.id === emailId ? { ...email, isRead: true } : email))
        break

      case "toggleStar":
        mockEmails = mockEmails.map((email) =>
          email.id === emailId ? { ...email, isStarred: !email.isStarred } : email,
        )
        break

      case "delete":
        mockEmails = mockEmails.filter((email) => email.id !== emailId)
        break

      case "addEmail":
        const newEmail = {
          id: Date.now().toString(),
          from: data.from,
          to: data.to,
          subject: data.subject,
          content: data.content,
          timestamp: new Date().toISOString(),
          isRead: false,
          isStarred: false,
          isImportant: false,
        }
        mockEmails.unshift(newEmail)
        break

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({ success: true, emails: mockEmails })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update email" }, { status: 500 })
  }
}
