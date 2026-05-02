import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Krishanora IT Website" <${process.env.GMAIL_USER}>`,
      to: 'krishanora54@gmail.com',
      replyTo: email,
      subject: `[Android Lead] New inquiry from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <div style="background:#5B6EF5;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="color:#fff;margin:0;font-size:20px">Android App Development Inquiry</h2>
          </div>
          <div style="background:#f9f9f9;padding:32px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr>
                <td style="padding:10px 0;color:#666;width:130px;font-size:14px;border-bottom:1px solid #eee">Name</td>
                <td style="padding:10px 0;font-size:14px;border-bottom:1px solid #eee"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#666;font-size:14px;border-bottom:1px solid #eee">Email</td>
                <td style="padding:10px 0;font-size:14px;border-bottom:1px solid #eee">
                  <a href="mailto:${email}" style="color:#5B6EF5">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#666;font-size:14px;border-bottom:1px solid #eee">Phone</td>
                <td style="padding:10px 0;font-size:14px;border-bottom:1px solid #eee">${phone || 'Not provided'}</td>
              </tr>
            </table>
            <p style="color:#666;font-size:13px;margin:0 0 8px">Project Details</p>
            <p style="white-space:pre-wrap;background:#fff;border:1px solid #eee;border-radius:8px;padding:16px;font-size:14px;margin:0">${message}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[android-contact route error]', err)
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }
}
