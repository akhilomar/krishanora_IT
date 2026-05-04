import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Krishanora IT',
  description: 'Privacy Policy for Krishanora IT. Learn how we collect, use, and protect your personal information.',
}

const LAST_UPDATED = 'May 4, 2026'
const COMPANY      = 'Krishanora IT'
const EMAIL        = 'query@krishanora.com'
const WEBSITE      = 'krishanora.com'

const sections = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: [
      {
        sub: 'Information you provide directly',
        body: 'When you fill out a contact or enquiry form on our website, we collect your name, email address, phone number, and project details you choose to share. This information is submitted voluntarily.',
      },
      {
        sub: 'Information collected automatically',
        body: 'When you visit our website, we may automatically collect certain technical data including your IP address, browser type, operating system, referring URLs, pages visited, and time spent on pages. This data is collected through standard server logs and analytics tools.',
      },
      {
        sub: 'Cookies',
        body: 'Our website may use cookies and similar tracking technologies to improve your browsing experience and analyse site traffic. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.',
      },
    ],
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    bullets: [
      'To respond to your enquiries and provide the services you have requested',
      'To send you project-related updates, quotes, and follow-up communications',
      'To improve our website, services, and user experience',
      'To comply with legal obligations applicable under Indian law',
      'To prevent fraud and ensure the security of our platform',
      'To send occasional marketing communications about our services (you may opt out at any time)',
    ],
  },
  {
    id: 'sharing',
    title: '3. Sharing of Information',
    content: [
      {
        sub: 'We do not sell your data',
        body: 'Krishanora IT does not sell, rent, or trade your personal information to third parties under any circumstances.',
      },
      {
        sub: 'Service providers',
        body: 'We may share your information with trusted third-party service providers who assist us in operating our website or conducting our business (for example, email service providers or analytics platforms). These parties are contractually obligated to keep your information confidential and use it only for the services they provide to us.',
      },
      {
        sub: 'Legal requirements',
        body: 'We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency) under applicable Indian law, including the Information Technology Act, 2000.',
      },
    ],
  },
  {
    id: 'data-retention',
    title: '4. Data Retention',
    body: 'We retain your personal information only for as long as necessary to fulfil the purposes described in this policy, or as required by applicable law. Enquiry data is typically retained for up to 2 years. You may request deletion of your data at any time by contacting us.',
  },
  {
    id: 'security',
    title: '5. Data Security',
    body: 'We implement industry-standard technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.',
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    bullets: [
      'Access — Request a copy of the personal data we hold about you',
      'Correction — Request that we correct inaccurate or incomplete data',
      'Deletion — Request that we delete your personal data',
      'Opt-out — Unsubscribe from marketing communications at any time',
      'Portability — Request your data in a structured, machine-readable format',
    ],
    footer: 'To exercise any of these rights, please contact us at ' + EMAIL + '. We will respond within 30 days.',
  },
  {
    id: 'third-party',
    title: '7. Third-Party Links',
    body: 'Our website may contain links to external websites that are not operated by us. We have no control over the content and practices of those sites and accept no responsibility for their privacy policies. We encourage you to review the privacy policy of every website you visit.',
  },
  {
    id: 'children',
    title: '8. Children\'s Privacy',
    body: 'Our services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately and we will take steps to remove that information.',
  },
  {
    id: 'google-ads',
    title: '9. Google Ads & Analytics',
    body: 'We may use Google Ads and Google Analytics to understand how visitors interact with our website and to measure the effectiveness of our advertising. Google may use cookies to serve ads based on your prior visits to our website. You can opt out of personalised advertising by visiting Google\'s Ads Settings at adssettings.google.com.',
  },
  {
    id: 'whatsapp',
    title: '10. WhatsApp Communications',
    body: 'When you initiate contact via WhatsApp, your conversation is subject to WhatsApp\'s own privacy policy. We use WhatsApp solely to respond to your enquiries and do not store WhatsApp conversations on our servers beyond the WhatsApp platform itself.',
  },
  {
    id: 'changes',
    title: '11. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Your continued use of our website after any changes constitutes your acceptance of the updated policy.',
  },
  {
    id: 'contact',
    title: '12. Contact Us',
    body: null,
    contactBlock: true,
  },
]

export default function PrivacyPage() {
  return (
    <main className="bg-ink min-h-screen">

      {/* ── Minimal nav ── */}
      <header className="px-5 md:px-10 py-5 border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight text-chalk">
            Krishanora<span className="text-signal">.</span>IT
          </Link>
          <Link
            href="/"
            className="text-[13px] font-body text-muted hover:text-chalk transition-colors duration-200"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      {/* ── Content ── */}
      <article className="px-5 md:px-10 py-16 md:py-24 max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">
            Legal
          </span>
          <h1 className="font-display font-extrabold text-[40px] md:text-[54px] tracking-tighter text-chalk leading-[0.95] mb-5">
            Privacy Policy
          </h1>
          <p className="text-muted font-body text-[14px]">
            Last updated: <span className="text-chalk/70">{LAST_UPDATED}</span>
          </p>
          <div className="mt-6 p-5 bg-surface border border-border rounded-2xl">
            <p className="text-[14px] font-body text-muted leading-relaxed">
              This Privacy Policy describes how <strong className="text-chalk/80">{COMPANY}</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects personal information you provide when using our website{' '}
              <strong className="text-chalk/80">{WEBSITE}</strong> or contacting us about our services. By using our website, you agree to the practices described in this policy.
            </p>
          </div>
        </div>

        {/* Table of contents */}
        <nav className="mb-14 p-6 bg-surface border border-border rounded-2xl">
          <p className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4">
            Contents
          </p>
          <ol className="flex flex-col gap-2">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-[13px] font-body text-muted hover:text-signal transition-colors duration-200 scroll-smooth"
                >
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map(({ id, title, content, bullets, body, footer, contactBlock }) => (
            <section key={id} id={id} className="scroll-mt-8">
              <h2 className="font-display font-bold text-[20px] text-chalk mb-4 pb-3 border-b border-border">
                {title}
              </h2>

              {/* Sub-sections */}
              {content && (
                <div className="flex flex-col gap-5">
                  {content.map(({ sub, body: subBody }) => (
                    <div key={sub}>
                      <h3 className="font-body font-semibold text-[14px] text-chalk/90 mb-1.5">{sub}</h3>
                      <p className="font-body text-[14px] text-muted leading-relaxed">{subBody}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Bullet list */}
              {bullets && (
                <ul className="flex flex-col gap-2.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[14px] font-body text-muted leading-relaxed">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {footer && (
                <p className="mt-4 font-body text-[14px] text-muted leading-relaxed">{footer}</p>
              )}

              {/* Plain body */}
              {body && (
                <p className="font-body text-[14px] text-muted leading-relaxed">{body}</p>
              )}

              {/* Contact block */}
              {contactBlock && (
                <div className="flex flex-col gap-3">
                  <p className="font-body text-[14px] text-muted leading-relaxed">
                    If you have any questions about this Privacy Policy or the way we handle your personal data, please contact us:
                  </p>
                  <div className="mt-2 p-6 bg-surface border border-border rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-signal/15 flex items-center justify-center shrink-0 text-sm">🏢</span>
                      <div>
                        <p className="text-[13px] font-body font-semibold text-chalk">{COMPANY}</p>
                        <p className="text-[12px] font-body text-muted">IT Services — Web & Android Development</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-signal/15 flex items-center justify-center shrink-0 text-sm">✉</span>
                      <a href={`mailto:${EMAIL}`} className="text-[13px] font-body text-signal hover:text-[#6b7df7] transition-colors">
                        {EMAIL}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-signal/15 flex items-center justify-center shrink-0 text-sm">🌐</span>
                      <span className="text-[13px] font-body text-muted">{WEBSITE}</span>
                    </div>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] font-body text-muted">
            © {new Date().getFullYear()} {COMPANY}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-[12px] font-body text-muted hover:text-chalk transition-colors">
              Home
            </Link>
            <Link href="/android" className="text-[12px] font-body text-muted hover:text-chalk transition-colors">
              Android Services
            </Link>
            <a href={`mailto:${EMAIL}`} className="text-[12px] font-body text-muted hover:text-chalk transition-colors">
              Contact
            </a>
          </div>
        </div>
      </article>
    </main>
  )
}
