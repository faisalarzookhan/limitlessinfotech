import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailTemplate {
  to: string[]
  subject: string
  html: string
  from?: string
}

export class EmailService {
  static async sendEmail({ to, subject, html, from = "noreply@limitless.com" }: EmailTemplate) {
    try {
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
      })

      if (error) {
        console.error("Email send error:", error)
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Email service error:", error)
      return { success: false, error }
    }
  }

  static async sendApprovalNotification(approvalRequest: any, assignees: string[]) {
    const subject = `New Approval Request: ${approvalRequest.title}`
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Approval Request</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>${approvalRequest.title}</h3>
          <p><strong>Type:</strong> ${approvalRequest.type}</p>
          <p><strong>Priority:</strong> ${approvalRequest.priority}</p>
          <p><strong>Description:</strong> ${approvalRequest.description}</p>
          <p><strong>Requested by:</strong> ${approvalRequest.requested_by}</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/employee?tab=approvals" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Review Approval Request
          </a>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          This is an automated message from Limitless Infotech Solutions.
        </p>
      </div>
    `

    return this.sendEmail({
      to: assignees,
      subject,
      html,
    })
  }

  static async sendTaskAssignmentNotification(task: any, assignees: string[]) {
    const subject = `New Task Assigned: ${task.title}`
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">New Task Assignment</h2>
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>${task.title}</h3>
          <p><strong>Priority:</strong> ${task.priority}</p>
          <p><strong>Due Date:</strong> ${task.due_date}</p>
          <p><strong>Description:</strong> ${task.description}</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/employee?tab=tasks" 
             style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Task
          </a>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          This is an automated message from Limitless Infotech Solutions.
        </p>
      </div>
    `

    return this.sendEmail({
      to: assignees,
      subject,
      html,
    })
  }

  static async sendClientApprovalRequest(project: any, clientEmail: string) {
    const subject = `Project Update Requires Your Approval: ${project.title}`
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">Client Approval Required</h2>
        <div style="background: #faf5ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>${project.title}</h3>
          <p>We have completed the latest updates to your project and would like your approval before proceeding to the next phase.</p>
          <p><strong>Project Status:</strong> ${project.status}</p>
          <p><strong>Progress:</strong> ${project.progress}%</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/demo" 
             style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Review & Approve
          </a>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          Thank you for choosing Limitless Infotech Solutions.
        </p>
      </div>
    `

    return this.sendEmail({
      to: [clientEmail],
      subject,
      html,
    })
  }
}
