'use server'

import nodemailer from 'nodemailer'

export async function sendEmailAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { error: 'Please fill in all required fields.' }
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER || 'uk5458622@gmail.com',
      to: 'uk5458622@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })
    return { success: true, message: 'Your message has been sent successfully!' }
  } catch (error: any) {
    console.error('Error sending email:', error)
    return { error: 'Failed to send email. Please try again later or ensure your SMTP credentials are set.' }
  }
}
