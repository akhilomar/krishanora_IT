import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, type, budget, message } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Krishanora IT" <${process.env.GMAIL_USER}>`,
      to: 'krishanora54@gmail.com',
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;color:#1a1a1a">
          <h2 style="margin-bottom:24px">New project inquiry</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0"><strong>${name}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666">Project type</td><td style="padding:8px 0">${type}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Budget</td><td style="padding:8px 0">${budget}</td></tr>
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
          <p style="color:#666;margin-bottom:8px">Message</p>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }
}
