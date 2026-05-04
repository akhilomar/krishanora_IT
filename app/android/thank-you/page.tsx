'use client'
import Script from 'next/script'
import Link from 'next/link'

const WA_LINK  = 'https://wa.me/917007964451?text=Hi%2C%20I%27m%20interested%20in%20Android%20App%20Development%20services'
const CALL_LINK = 'tel:+917007964451'

/* ── Google Ads conversion ID + label ──────────────────────────
   Replace these two values with your own from:
   Google Ads → Goals → Conversions → [your conversion] → Tag setup
─────────────────────────────────────────────────────────────── */
const GA_CONVERSION_ID    = 'AW-18133566041'
const GA_CONVERSION_LABEL = 'XXXXXXXXXXXX'   // e.g. AbCdEfGhIjK

export default function ThankYouPage() {
  return (
    <>
      {/* ── Google Ads conversion event ── */}
      <Script id="gtag-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': '${GA_CONVERSION_ID}/${GA_CONVERSION_LABEL}'
          });
        `}
      </Script>

      {/* ── Page ── */}
      <main className="min-h-screen bg-ink flex flex-col items-center justify-center px-5 text-center">

        {/* Check mark */}
        <div className="w-20 h-20 rounded-full bg-signal/15 border border-signal/30 flex items-center justify-center mb-8">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="#5B6EF5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Heading */}
        <h1 className="font-display font-extrabold text-[32px] sm:text-[42px] tracking-tighter text-chalk leading-tight mb-3">
          Thank you!
        </h1>
        <p className="font-display font-semibold text-[20px] text-chalk mb-2">
          We have received your details.
        </p>
        <p className="font-body text-[16px] text-muted mb-10">
          Our team will contact you shortly.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
          <a
            href={WA_LINK}
            onClick={(e) => { e.preventDefault(); window.open(WA_LINK, '_blank', 'noopener,noreferrer') }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#25D366] text-white rounded-xl font-body font-bold text-[15px] hover:bg-[#1fb857] hover:-translate-y-0.5 transition-all duration-200 shadow-[0_4px_20px_rgba(37,211,102,0.35)]"
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>

          <a
            href={CALL_LINK}
            onClick={(e) => { e.preventDefault(); window.open(CALL_LINK) }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-body font-bold text-[15px] hover:bg-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            {/* Phone icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.01 2 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Call Now
          </a>
        </div>

        {/* Back link */}
        <Link
          href="/android"
          className="mt-10 text-[13px] font-body text-muted hover:text-chalk transition-colors duration-200 underline underline-offset-4"
        >
          ← Back to Android App Development
        </Link>
      </main>
    </>
  )
}
