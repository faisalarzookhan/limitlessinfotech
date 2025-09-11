import { Resend } from "resend"

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Defines the options for sending an email.
 */
interface SendEmailOptions {
  /** The recipient's email address or an array of addresses. */
  to: string | string[]
  /** The subject line of the email. */
  subject: string
  /** The HTML body of the email. */
  html?: string
  /** The plain text body of the email. */
  text?: string
  /** The sender's email address. Defaults to "onboarding@resend.dev". */
  from?: string
}

/**
 * Sends an email using the Resend service.
 * If the RESEND_API_KEY environment variable is not set, it will log the email details
 * to the console instead of sending an actual email. This is useful for development.
 * @param options - The email options, including recipient, subject, and body.
 * @returns A promise that resolves with the Resend API response or is void if simulated.
 * @throws An error if the email fails to send.
 */
export async function sendEmail(options: SendEmailOptions) {
  const { to, subject, html, text, from = "onboarding@resend.dev" } = options

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Simulating email sending.")
    console.log("Simulated Email Details:", { to, subject, from, text: text?.trim(), html: html?.trim() })
    return
  }

  try {
    const { data, error } = await resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      html: html,
      text: text,
    })

    if (error) {
      console.error("Error sending email via Resend:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log("Email sent successfully via Resend:", data)
    return data
  } catch (error) {
    console.error("Caught error in sendEmail:", error)
    throw error
  }
}

/**
 * Defines the data structure for a contact form submission.
 */
interface ContactFormEmailData {
  /** The name of the person submitting the form. */
  name: string
  /** The email address of the person submitting the form. */
  email: string
  /** The subject of the contact message. */
  subject: string
  /** The content of the contact message. */
  message: string
}

/**
 * Composes and sends an email notification for a new contact form submission.
 * @param data - The data collected from the contact form.
 */
export async function sendContactFormEmail(data: ContactFormEmailData) {
  const { name, email, subject, message } = data
  const recipientEmail = "contact@limitlessinfotech.com" // Target email for notifications

  const htmlContent = `
    <h1>New Contact Form Submission</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Subject:</strong> ${subject}</p>
    <hr>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `
  const textContent = `
    New Contact Form Submission
    ===========================
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    ---------------------------
    Message:
    ${message}
  `

  await sendEmail({
    to: recipientEmail,
    subject: `New Contact Form Submission: ${subject}`,
    html: htmlContent,
    text: textContent,
    // Set a "Reply-To" friendly sender name and use their email.
    from: `"${name}" <contact-form@limitlessinfotech.com>`,
  })
}

/**
 * Composes and sends a password reset email to a user.
 * @param toEmail - The recipient's email address.
 * @param resetLink - The unique, secure link for resetting the password.
 */
export async function sendPasswordResetEmail(toEmail: string, resetLink: string) {
  const subject = "Your Password Reset Request"
  const htmlContent = `
    <p>Hello,</p>
    <p>We received a request to reset the password for your account at Limitless Infotech Solutions.</p>
    <p>Please click the link below to set a new password:</p>
    <p><a href="${resetLink}" style="font-weight:bold;">Reset Your Password</a></p>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
    <p>Thank you,</p>
    <p>The Limitless Infotech Solutions Team</p>
  `
  const textContent = `
    Hello,

    We received a request to reset the password for your account at Limitless Infotech Solutions.

    Please copy and paste the following link into your browser to set a new password:
    ${resetLink}

    This link will expire in 1 hour for security reasons.

    If you did not request a password reset, please ignore this email or contact support if you have concerns.

    Thank you,
    The Limitless Infotech Solutions Team
  `

  await sendEmail({
    to: toEmail,
    subject: subject,
    html: htmlContent,
    text: textContent,
    from: "Limitless Infotech Security <no-reply@limitlessinfotech.com>",
  })
}
