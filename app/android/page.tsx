'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/* ─── constants ─────────────────────────────────────────────── */
const WA_LINK = 'https://wa.me/917007964451?text=Hi%2C%20I%27m%20interested%20in%20Android%20App%20Development%20services'
const CALL_LINK = 'tel:+917007964451'

/* ─── link helpers — bypass browser "leave site?" / protocol dialogs ─ */
const goWA  = (e: React.MouseEvent) => { e.preventDefault(); window.open(WA_LINK, '_blank', 'noopener,noreferrer') }
const goCall = (e: React.MouseEvent) => { e.preventDefault(); window.open(CALL_LINK) }

/* shared SVGs */
const WaIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const PhoneIcon = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.01 2 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="7" fill="rgba(91,110,245,0.2)"/>
    <path d="M4 7l2 2 4-4" stroke="#5B6EF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ─── animation helper ──────────────────────────────────────── */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.65, ease: [0.23, 1, 0.32, 1] },
})

/* ─── reusable section CTA strip ───────────────────────────── */
function SectionCTA({ label = 'Ready to build your app?' }: { label?: string }) {
  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
      <p className="text-muted font-body text-[14px]">{label}</p>
      <div className="flex items-center gap-2.5">
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-signal text-white rounded-xl font-body font-semibold text-[13px] hover:bg-[#6b7df7] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(91,110,245,0.4)] transition-all duration-200"
        >
          Get Free Quote
        </a>
        <a
          href={CALL_LINK}
          onClick={goCall}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-border bg-surface rounded-xl text-chalk font-body font-semibold text-[13px] hover:border-signal/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          <PhoneIcon size={13} color="#5B6EF5" />
          Call Now
        </a>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   NAV — sticky "Call Now" visible after scroll
═══════════════════════════════════════════════════════════════ */
function AndroidNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 md:px-8 pt-4"
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${scrolled ? 'bg-[#111118]/90 backdrop-blur-2xl border border-[#252534] shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : ''}`}>
        <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight text-chalk shrink-0">
          Krishanora<span className="text-signal">.</span>IT
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="text-[13px] font-body font-medium text-muted hover:text-chalk transition-colors duration-200">
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs — Call Now prominent after scroll */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={CALL_LINK}
            onClick={goCall}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-body font-semibold transition-all duration-300 ${
              scrolled
                ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_4px_16px_rgba(16,185,129,0.4)]'
                : 'border border-border text-chalk hover:border-signal/40'
            }`}
          >
            <PhoneIcon size={13} color={scrolled ? 'white' : '#5B6EF5'} />
            Call Now
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-signal text-white text-[13px] font-body font-semibold hover:bg-[#6b7df7] transition-all duration-200 hover:shadow-[0_4px_20px_rgba(91,110,245,0.35)] hover:-translate-y-px"
          >
            Get Free Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5" aria-label="Toggle menu">
          <span className={`block w-5 h-px bg-chalk transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`block w-5 h-px bg-chalk transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-chalk transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 mx-auto max-w-7xl bg-[#111118]/97 backdrop-blur-2xl border border-[#252534] rounded-2xl p-5 flex flex-col gap-3"
        >
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)} className="text-sm font-body font-medium text-muted hover:text-chalk py-1.5 border-b border-border/50 last:border-0">
              {label}
            </a>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={CALL_LINK}
              onClick={(e) => { setMobileOpen(false); goCall(e) }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-white text-sm font-body font-semibold"
            >
              <PhoneIcon size={14} color="white" />
              Call Now
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="text-center py-3 rounded-xl bg-signal text-white text-sm font-body font-semibold"
            >
              Get Free Quote
            </a>
          </div>
          <a href={WA_LINK} onClick={(e) => { setMobileOpen(false); goWA(e) }}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-body font-medium">
            <WaIcon size={14} />
            Chat on WhatsApp
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO — single dominant CTA, clear hierarchy, mobile-first
═══════════════════════════════════════════════════════════════ */
function Hero() {
  const CONTAINER = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  }
  const ITEM = {
    hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1] } },
  }

  return (
    <section className="relative overflow-hidden bg-ink pt-24 pb-14 md:pt-32 md:pb-20">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-signal/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-violet-600/8 rounded-full blur-[90px]" />
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-emerald-500/6 rounded-full blur-[90px]" />
      </div>
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <motion.div
        variants={CONTAINER}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-5 md:px-10 max-w-4xl mx-auto w-full"
      >
        {/* Badge */}
        <motion.div variants={ITEM} className="mb-6">
          <span className="inline-flex items-center gap-2 text-[11px] font-body font-medium tracking-widest uppercase text-signal border border-signal/25 bg-signal/10 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            Android App Development Company — India
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={ITEM}
          className="font-display font-extrabold text-[42px] sm:text-[58px] md:text-[74px] xl:text-[88px] leading-[0.93] tracking-tighter text-chalk mb-5"
        >
          Build Your Android
          <br />
          App in{' '}
          <em className="not-italic text-signal">7–14 Days</em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={ITEM}
          className="text-[#c8c5bf] font-body font-light text-[17px] md:text-xl leading-relaxed max-w-[500px] mb-4"
        >
          We help startups and businesses launch powerful, scalable Android apps quickly and affordably.
        </motion.p>

        {/* Urgency + trust lines — between subheadline and CTA */}
        <motion.div variants={ITEM} className="flex flex-col items-center gap-1.5 mb-8">
          <p className="text-[13px] font-body font-medium text-amber-300/90">
            ⚡ Free consultation — Limited slots available this month
          </p>
          <p className="text-[13px] font-body text-muted">
            Trusted by startups &amp; growing businesses
          </p>
        </motion.div>

        {/* ── PRIMARY CTA — single dominant action ── */}
        <motion.div variants={ITEM} className="flex flex-col items-center gap-2 w-full sm:w-auto mb-4">
          <a
            href="#contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-signal text-white rounded-2xl font-body font-bold text-[16px] hover:bg-[#6b7df7] hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(91,110,245,0.55)] transition-all duration-200 shadow-[0_4px_20px_rgba(91,110,245,0.35)]"
          >
            Get Free App Quote
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          {/* Microcopy */}
          <p className="text-[12px] font-body text-muted">Takes less than 30 seconds</p>
        </motion.div>

        {/* ── SECONDARY CTAs — reduced visual weight ── */}
        <motion.div variants={ITEM} className="flex items-center justify-center gap-3 mb-8">
          <a
            href={CALL_LINK}
            onClick={goCall}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border text-muted font-body font-medium text-[13px] hover:border-signal/40 hover:text-chalk transition-all duration-200"
          >
            <PhoneIcon size={13} color="currentColor" />
            Call Now
          </a>
          <span className="w-px h-4 bg-border" />
          <a
            href={WA_LINK}
            onClick={goWA}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border text-muted font-body font-medium text-[13px] hover:border-[#25D366]/40 hover:text-[#25D366] transition-all duration-200"
          >
            <WaIcon size={13} />
            WhatsApp
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div variants={ITEM} className="flex flex-wrap items-center justify-center gap-2">
          {['50+ Apps Delivered', 'Rated 4.9★', 'Play Store Ready', 'Kotlin & Compose'].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 text-[12px] font-body text-muted bg-surface border border-border px-3 py-1.5 rounded-lg">
              <span className="w-1 h-1 rounded-full bg-signal" />
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   OFFER STRIP — urgency + social proof, right below hero
═══════════════════════════════════════════════════════════════ */
function OfferStrip() {
  return (
    <section className="bg-surface border-y border-border px-5 md:px-10 py-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Offer pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <span className="inline-flex items-center gap-2 text-[12px] font-body font-medium text-signal bg-signal/10 border border-signal/25 px-3 py-1.5 rounded-lg">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="#5B6EF5"/><path d="M6 3v3l2 1" stroke="#5B6EF5" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Free Consultation
          </span>
          <span className="inline-flex items-center gap-2 text-[12px] font-body font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-lg">
            ₹ Starting from ₹25,000
          </span>
          <span className="inline-flex items-center gap-2 text-[12px] font-body font-medium text-amber-300 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Limited slots this month
          </span>
        </div>
        {/* Quick action */}
        <a
          href={CALL_LINK}
          onClick={goCall}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-body font-semibold text-[13px] hover:bg-emerald-400 transition-all duration-200 shadow-[0_4px_16px_rgba(16,185,129,0.35)]"
        >
          <PhoneIcon size={13} color="white" />
          Call: +91 70079 64451
        </a>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   QUICK FORM — compact above-the-fold lead capture
═══════════════════════════════════════════════════════════════ */
function QuickForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/android-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          message: fd.get('message') || 'Quick enquiry from top form',
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Something went wrong. WhatsApp us at +91 70079 64451')
    } finally {
      setLoading(false)
    }
  }

  const inp = "w-full bg-[#1C1C28] border border-[#252534] rounded-xl px-4 py-3 text-[14px] font-body text-chalk placeholder:text-muted focus:outline-none focus:border-signal/60 transition-colors duration-200"

  return (
    <section className="px-5 md:px-10 py-14 bg-ink">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-surface border border-signal/20 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(91,110,245,0.08)]">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-signal/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0">

            {/* Left — value props */}
            <div className="p-8 md:p-10 flex flex-col justify-center gap-5 lg:border-r border-border">
              <div>
                <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">
                  Free consultation — no commitment
                </span>
                <h2 className="font-display font-extrabold text-[26px] sm:text-[32px] tracking-tighter text-chalk leading-tight">
                  Tell us your app idea.
                  <br />
                  <span className="text-signal">Get a quote in 4 hours.</span>
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  'No upfront payment required',
                  'Free wireframe + cost estimate',
                  'Reply within 4 business hours',
                  'Trusted by 50+ startups & SMEs',
                ].map(t => (
                  <div key={t} className="flex items-center gap-2.5 text-[14px] font-body text-chalk/75">
                    <CheckIcon />
                    {t}
                  </div>
                ))}
              </div>

              {/* Alternate contacts */}
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <a href={CALL_LINK} onClick={goCall} className="inline-flex items-center gap-2 text-[13px] font-body font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                  <PhoneIcon size={13} color="#34d399" />
                  +91 70079 64451
                </a>
                <span className="text-border">|</span>
                <a href={WA_LINK} onClick={goWA} className="inline-flex items-center gap-2 text-[13px] font-body font-medium text-[#25D366] hover:text-[#1fb857] transition-colors">
                  <WaIcon size={13} />
                  WhatsApp us
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="p-8 md:p-10 bg-[#0f0f16]">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center gap-4 text-center py-8"
                >
                  <div className="w-14 h-14 rounded-full bg-signal/15 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="#5B6EF5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-xl text-chalk">Message received!</h3>
                  <p className="text-muted font-body text-[13px] max-w-[220px]">We'll reply in under 4 hours. Or WhatsApp us for instant response.</p>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-[13px] font-body font-medium">
                    <WaIcon size={13} />
                    Chat now →
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <h3 className="font-display font-bold text-[18px] text-chalk mb-1">Get Free Consultation</h3>
                  <input required name="name" type="text" placeholder="Your name *" className={inp} />
                  <input required name="email" type="email" placeholder="Email address *" className={inp} />
                  <input required name="phone" type="tel" placeholder="Phone number *" className={inp} />
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Brief app idea (optional)"
                    className={`${inp} resize-none`}
                  />
                  {error && <p className="text-[12px] font-body text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-signal text-white rounded-xl font-body font-bold text-[14px] hover:bg-[#6b7df7] hover:shadow-[0_6px_24px_rgba(91,110,245,0.4)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending…' : 'Get Free Consultation →'}
                  </button>
                  <p className="text-center text-[11px] text-muted font-body">Free. No spam. We reply in 4 hours.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════════════ */
function Services() {
  const services = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="3" stroke="#5B6EF5" strokeWidth="1.5"/><path d="M9 7h6M9 11h6M9 15h4" stroke="#5B6EF5" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="18.5" r="0.75" fill="#5B6EF5"/></svg>,
      color: 'signal',
      title: 'Custom App Development',
      desc: 'Tailor-made Android apps built from scratch. Native performance, offline-first architecture, and scalable from day one.',
      tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Room DB'],
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#a78bfa" strokeWidth="1.5"/><circle cx="12" cy="10" r="3" stroke="#a78bfa" strokeWidth="1.5"/><path d="M7 19c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      color: 'violet',
      title: 'UI/UX Design',
      desc: 'Intuitive interfaces designed for real users. Every screen crafted to maximise engagement and reduce drop-off.',
      tags: ['Material You', 'Figma', 'Prototyping', 'User Testing'],
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="5" stroke="#34d399" strokeWidth="1.5"/></svg>,
      color: 'emerald',
      title: 'API Integration',
      desc: 'Connect to any backend, payment gateway, or third-party service. REST, GraphQL, Firebase — we handle the plumbing.',
      tags: ['Retrofit', 'Firebase', 'REST APIs', 'Razorpay'],
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      color: 'amber',
      title: 'App Maintenance & Support',
      desc: 'Bug fixes, OS updates, performance monitoring, and new features — we stay with you long after launch.',
      tags: ['Bug Fixes', 'OS Updates', 'Performance', 'Analytics'],
    },
  ]

  const colorMap: Record<string, string> = {
    signal: 'bg-signal/15 group-hover:bg-signal/22',
    violet: 'bg-violet-500/15 group-hover:bg-violet-500/22',
    emerald: 'bg-emerald-500/15 group-hover:bg-emerald-500/22',
    amber: 'bg-amber-500/15 group-hover:bg-amber-500/22',
  }
  const glowMap: Record<string, string> = {
    signal: 'bg-signal/8 group-hover:bg-signal/15',
    violet: 'bg-violet-600/8 group-hover:bg-violet-600/15',
    emerald: 'bg-emerald-500/8 group-hover:bg-emerald-500/15',
    amber: 'bg-amber-500/8 group-hover:bg-amber-500/15',
  }

  return (
    <section id="services" className="px-5 md:px-10 py-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...reveal()} className="mb-12 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">What we build</span>
          <h2 className="font-display font-extrabold text-[38px] md:text-[52px] tracking-tighter text-chalk leading-[0.95]">
            Android app development
            <br />
            <span className="text-signal">services</span> that deliver.
          </h2>
          <p className="text-muted font-body text-[15px] leading-relaxed mt-4 max-w-lg">
            End-to-end custom Android app development — from wireframe to Play Store and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(({ icon, color, title, desc, tags }, i) => (
            <motion.div
              key={title}
              {...reveal(i * 0.07)}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
              className="group relative bg-ink border border-border rounded-3xl p-7 overflow-hidden cursor-default"
            >
              <div className={`absolute -top-16 -right-16 w-44 h-44 ${glowMap[color]} rounded-full blur-3xl transition-all duration-700`} />
              <div className="relative z-10">
                <div className={`w-11 h-11 rounded-2xl ${colorMap[color]} flex items-center justify-center mb-5 transition-colors duration-300`}>
                  {icon}
                </div>
                <h3 className="font-display font-bold text-[19px] text-chalk mb-2">{title}</h3>
                <p className="text-muted font-body text-[14px] leading-relaxed mb-5">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(t => <span key={t} className="px-2.5 py-1 rounded-lg bg-surface border border-border text-[12px] text-muted font-body">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Section CTA ── */}
        <SectionCTA label="Need a custom Android app?" />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   WHY CHOOSE US — scannable bullet list layout
═══════════════════════════════════════════════════════════════ */
function WhyUs() {
  const reasons = [
    { icon: '⚡', title: 'Fast Delivery', desc: 'MVP in 7–14 days. Lean sprints, no bloated timelines.' },
    { icon: '💰', title: 'Affordable Pricing', desc: 'Transparent quotes. No hidden fees. Starting at ₹25,000.' },
    { icon: '🛠', title: 'Experienced Developers', desc: '5+ years of production Android with Kotlin & Jetpack Compose.' },
    { icon: '📈', title: 'Scalable Solutions', desc: 'Architecture that handles 100 to 100K users without rewrites.' },
    { icon: '🛡', title: 'Post-Launch Support', desc: '30 days free support after launch. Long-term plans available.' },
    { icon: '🔒', title: 'You Own the Code', desc: 'Full source code delivered. No lock-in, no recurring fees.' },
  ]

  return (
    <section className="px-5 md:px-10 py-20 bg-ink">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
          {/* Left header */}
          <motion.div {...reveal()} className="lg:sticky lg:top-28">
            <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">Why choose us</span>
            <h2 className="font-display font-extrabold text-[38px] md:text-[50px] tracking-tighter text-chalk leading-[0.95]">
              Why startups choose
              <br />
              <span className="text-signal">Krishanora IT.</span>
            </h2>
            <p className="text-muted font-body text-[15px] leading-relaxed mt-5 max-w-xs">
              Trusted by startups and businesses across India. We build apps that actually get used.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 mt-8">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-signal text-white rounded-xl font-body font-semibold text-[14px] hover:bg-[#6b7df7] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(91,110,245,0.4)] transition-all duration-200">
                Get Free Quote
              </a>
              <a href={CALL_LINK} onClick={goCall} className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-surface rounded-xl text-chalk font-body font-semibold text-[14px] hover:border-signal/40 hover:-translate-y-0.5 transition-all duration-200">
                <PhoneIcon size={14} color="#5B6EF5" />
                Call Now
              </a>
            </div>
          </motion.div>

          {/* Right — bullet grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reasons.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...reveal(i * 0.06)}
                className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-5 hover:border-signal/30 transition-colors duration-200"
              >
                <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                <div>
                  <h3 className="font-display font-bold text-[16px] text-chalk mb-1">{title}</h3>
                  <p className="text-muted font-body text-[13px] leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO
═══════════════════════════════════════════════════════════════ */
function Portfolio() {
  const projects = [
    {
      name: 'QuickMart',
      category: 'E-Commerce',
      desc: 'Grocery delivery app with real-time order tracking, multi-vendor support, and UPI payments.',
      results: ['10K+ downloads in 3 months', 'Rated 4.7★ on Play Store', '35% repeat purchase rate'],
      color: 'signal',
      tags: ['Kotlin', 'Firebase', 'Razorpay', 'Google Maps'],
    },
    {
      name: 'MedTrack',
      category: 'Healthcare',
      desc: 'Medicine reminder and health journal with doctor scheduling, lab report storage, and family profiles.',
      results: ['5,000+ active users', '92% daily retention', 'Featured in Play Store Health'],
      color: 'emerald',
      tags: ['Jetpack Compose', 'Room DB', 'WorkManager', 'Retrofit'],
    },
    {
      name: 'FieldForce',
      category: 'B2B / SaaS',
      desc: 'Field sales management — GPS attendance, customer visit logs, expense claims, and daily reports.',
      results: ['200+ field agents', 'Saved 4 hrs/week per agent', '99.9% uptime, 1 year'],
      color: 'violet',
      tags: ['Kotlin', 'MVVM', 'Coroutines', 'Google Maps API'],
    },
  ]

  const colorMap: Record<string, { border: string; badge: string; dot: string }> = {
    signal: { border: 'border-signal/25', badge: 'bg-signal/10 text-signal', dot: 'bg-signal' },
    emerald: { border: 'border-emerald-500/25', badge: 'bg-emerald-500/10 text-emerald-400', dot: 'bg-emerald-400' },
    violet: { border: 'border-violet-500/25', badge: 'bg-violet-500/10 text-violet-400', dot: 'bg-violet-400' },
  }

  return (
    <section id="portfolio" className="px-5 md:px-10 py-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...reveal()} className="mb-12 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">Portfolio</span>
          <h2 className="font-display font-extrabold text-[38px] md:text-[52px] tracking-tighter text-chalk leading-[0.95]">
            Apps we've <span className="text-signal">shipped.</span>
          </h2>
          <p className="text-muted font-body text-[15px] leading-relaxed mt-4">
            Real projects, real results. Here's what we've built for clients like you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {projects.map(({ name, category, desc, results, color, tags }, i) => (
            <motion.div key={name} {...reveal(i * 0.08)}
              className={`bg-ink border ${colorMap[color].border} rounded-3xl p-7 flex flex-col gap-5`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[21px] text-chalk">{name}</h3>
                    <span className={`inline-block text-[11px] font-body font-medium px-2.5 py-0.5 rounded-full mt-1 ${colorMap[color].badge}`}>{category}</span>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 text-lg">📱</div>
                </div>
                <p className="text-muted font-body text-[14px] leading-relaxed">{desc}</p>
              </div>
              <div className="flex flex-col gap-2">
                {results.map(r => (
                  <div key={r} className="flex items-center gap-2.5 text-[13px] font-body text-chalk/80">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${colorMap[color].dot}`} />
                    {r}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border">
                {tags.map(t => <span key={t} className="px-2.5 py-1 rounded-lg bg-surface border border-border text-[11px] text-muted font-body">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Section CTA ── */}
        <SectionCTA label="Want something similar?" />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PROCESS — 4-step
═══════════════════════════════════════════════════════════════ */
function Process() {
  const steps = [
    { num: '01', title: 'Requirement Discussion', desc: 'Free 30-min call to understand your idea, audience, and goals. No jargon — just clarity.' },
    { num: '02', title: 'Design & Development', desc: 'UI/UX wireframes first, then Kotlin code. You review every screen before we build it.' },
    { num: '03', title: 'Testing & QA', desc: 'Tested on real Android devices — budget to flagship. Zero crash tolerance before release.' },
    { num: '04', title: 'Launch & Support', desc: 'We handle Play Store submission and stay with you 30 days post-launch.' },
  ]

  return (
    <section id="process" className="px-5 md:px-10 py-20 bg-ink">
      <div className="max-w-7xl mx-auto">
        <motion.div {...reveal()} className="mb-12 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">How it works</span>
          <h2 className="font-display font-extrabold text-[38px] md:text-[52px] tracking-tighter text-chalk leading-[0.95]">
            From idea to <span className="text-signal">Play Store.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(({ num, title, desc }, i) => (
            <motion.div key={num} {...reveal(i * 0.08)}
              className="relative bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[46px] right-[-20px] w-5 h-px bg-gradient-to-r from-signal/40 to-transparent z-10" />
              )}
              <span className="font-display font-extrabold text-[44px] leading-none text-signal/20 -mb-1">{num}</span>
              <div>
                <h3 className="font-display font-bold text-[16px] text-chalk mb-1.5">{title}</h3>
                <p className="text-muted font-body text-[13px] leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Section CTA ── */}
        <SectionCTA label="Ready to start?" />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PRICING
═══════════════════════════════════════════════════════════════ */
function Pricing() {
  const plans = [
    {
      label: 'Starter',
      price: '₹25,000',
      note: 'starting at',
      desc: 'Perfect for MVPs and proof-of-concept apps.',
      features: ['Up to 5 screens', 'Basic UI/UX design', 'Firebase backend', '2 weeks delivery', '30-day bug fix support'],
      cta: 'Get Starter Quote',
      highlight: false,
    },
    {
      label: 'Growth',
      price: '₹60,000',
      note: 'starting at',
      desc: 'Ideal for full-featured business apps.',
      features: ['Unlimited screens', 'Custom UI/UX design', 'API + payment integration', '3–4 weeks delivery', '60-day support', 'Play Store submission'],
      cta: 'Get Growth Quote',
      highlight: true,
    },
    {
      label: 'Enterprise',
      price: 'Custom',
      note: 'tailored quote',
      desc: 'For complex, multi-role, or B2B platforms.',
      features: ['Multi-role app', 'Admin panel + dashboard', 'Advanced integrations', 'Dedicated developer', 'Ongoing maintenance', 'SLA guarantee'],
      cta: 'Get Custom Quote',
      highlight: false,
    },
  ]

  return (
    <section id="pricing" className="px-5 md:px-10 py-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...reveal()} className="mb-5 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">Pricing</span>
          <h2 className="font-display font-extrabold text-[38px] md:text-[52px] tracking-tighter text-chalk leading-[0.95]">
            Transparent pricing, <span className="text-signal">no surprises.</span>
          </h2>
        </motion.div>

        {/* Urgency banner */}
        <motion.div {...reveal(0.04)} className="mb-10 inline-flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="text-amber-300 font-body text-[13px] font-medium">
            Limited-time: Free wireframe consultation worth ₹5,000 — book this week.
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(({ label, price, note, desc, features, cta, highlight }, i) => (
            <motion.div key={label} {...reveal(i * 0.07)}
              className={`relative rounded-3xl p-8 flex flex-col gap-6 overflow-hidden ${highlight ? 'bg-signal border border-signal/80 shadow-[0_0_60px_rgba(91,110,245,0.25)]' : 'bg-ink border border-border'}`}
            >
              {highlight && <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl" />}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-body font-medium tracking-widest uppercase ${highlight ? 'text-white/70' : 'text-muted'}`}>{label}</span>
                  {highlight && <span className="text-[10px] font-body font-bold bg-white/20 text-white px-2 py-0.5 rounded-full tracking-widest uppercase">Popular</span>}
                </div>
                <div className="flex items-end gap-2">
                  <span className={`font-display font-extrabold text-[38px] leading-none ${highlight ? 'text-white' : 'text-chalk'}`}>{price}</span>
                  <span className={`font-body text-[13px] mb-1.5 ${highlight ? 'text-white/60' : 'text-muted'}`}>{note}</span>
                </div>
                <p className={`font-body text-[14px] mt-3 ${highlight ? 'text-white/80' : 'text-muted'}`}>{desc}</p>
              </div>
              <ul className="flex flex-col gap-3">
                {features.map(f => (
                  <li key={f} className={`flex items-center gap-2.5 text-[14px] font-body ${highlight ? 'text-white/90' : 'text-chalk/80'}`}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0">
                      <circle cx="7.5" cy="7.5" r="7" fill={highlight ? 'rgba(255,255,255,0.2)' : 'rgba(91,110,245,0.2)'}/>
                      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={highlight ? '#fff' : '#5B6EF5'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact"
                className={`mt-auto w-full text-center py-3.5 rounded-xl font-body font-bold text-[14px] transition-all duration-200 hover:-translate-y-0.5 ${highlight ? 'bg-white text-signal hover:bg-white/90 hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)]' : 'bg-signal/10 border border-signal/30 text-signal hover:bg-signal/20'}`}
              >
                {cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p {...reveal(0.2)} className="text-center text-muted font-body text-[13px] mt-8">
          Not sure which plan? <a href="#contact" className="text-signal underline underline-offset-2 hover:text-[#6b7df7]">Talk to us</a> — or{' '}
          <a href={CALL_LINK} className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300">call directly</a>.
        </motion.p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════════ */
function Testimonials() {
  const reviews = [
    {
      name: 'Rahul Sharma',
      role: 'Founder, QuickMart',
      text: 'Krishanora IT delivered our grocery app in under 3 weeks — on time and on budget. The UI is clean, the performance is smooth. Highly recommend for any startup.',
      rating: 5,
      avatar: 'RS',
    },
    {
      name: 'Priya Menon',
      role: 'Co-founder, MedTrack',
      text: 'We had a complex healthcare app idea. Krishanora IT not only understood our vision but improved it. Post-launch support has been exceptional — they feel like our in-house team.',
      rating: 5,
      avatar: 'PM',
    },
    {
      name: 'Akash Verma',
      role: 'Operations Head, FieldForce',
      text: 'The GPS tracking is accurate, the UI is simple enough for non-tech field agents, and it\'s saved hours of manual reporting every week. Great value for money.',
      rating: 5,
      avatar: 'AV',
    },
  ]

  return (
    <section className="px-5 md:px-10 py-20 bg-ink">
      <div className="max-w-7xl mx-auto">
        {/* Credibility header */}
        <motion.div {...reveal()} className="mb-12 text-center">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">Client testimonials</span>
          <h2 className="font-display font-extrabold text-[38px] md:text-[52px] tracking-tighter text-chalk leading-[0.95]">
            What our clients <span className="text-signal">actually say.</span>
          </h2>
          <p className="text-muted font-body text-[15px] mt-4">
            Trusted by startups and businesses across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {reviews.map(({ name, role, text, rating, avatar }, i) => (
            <motion.div key={name} {...reveal(i * 0.07)}
              className="bg-surface border border-border rounded-2xl p-7 flex flex-col gap-5 hover:border-signal/30 transition-colors duration-300"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-muted font-body text-[14px] leading-relaxed flex-1">"{text}"</p>
              <div className="flex items-center gap-3 border-t border-border pt-5">
                <div className="w-10 h-10 rounded-full bg-signal/20 border border-signal/30 flex items-center justify-center text-[13px] font-display font-bold text-signal shrink-0">{avatar}</div>
                <div>
                  <p className="text-chalk font-body font-medium text-[14px]">{name}</p>
                  <p className="text-muted font-body text-[12px]">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   LEAD FORM — main conversion section
═══════════════════════════════════════════════════════════════ */
function LeadForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/android-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          message: fd.get('message'),
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Something went wrong — WhatsApp us at +91 70079 64451 for instant help.')
    } finally {
      setLoading(false)
    }
  }

  const inp = "w-full bg-[#1C1C28] border border-[#252534] rounded-xl px-4 py-3.5 text-[14px] font-body text-chalk placeholder:text-muted focus:outline-none focus:border-signal/60 transition-colors duration-200"

  return (
    <section id="contact" className="px-5 md:px-10 py-20 bg-surface scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-ink border border-border rounded-[32px] overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-signal/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-600/6 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-0">

            {/* Left — pushed below form on mobile so scrolling to #contact hits the form first */}
            <div className="order-2 lg:order-1 p-8 md:p-14 flex flex-col justify-center gap-7 lg:border-r border-border">
              <div>
                <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">Free consultation</span>
                <h2 className="font-display font-extrabold text-[30px] sm:text-[40px] md:text-[50px] tracking-tighter text-chalk leading-[0.95]">
                  Tell us about
                  <br />
                  your app idea.
                </h2>
              </div>

              <p className="text-muted font-body text-[15px] leading-relaxed max-w-sm">
                We'll reply within 4 hours with an honest estimate — not a sales pitch.
              </p>

              {/* Contact options */}
              <div className="flex flex-col gap-3">
                <a href={WA_LINK} onClick={goWA} className="flex items-center gap-3 text-[14px] font-body text-[#25D366] hover:opacity-80 transition-opacity">
                  <WaIcon size={15} />
                  WhatsApp: +91 70079 64451
                </a>
                <a href={CALL_LINK} onClick={goCall} className="flex items-center gap-3 text-[14px] font-body text-emerald-400 hover:opacity-80 transition-opacity">
                  <PhoneIcon size={15} color="#34d399" />
                  Call: +91 70079 64451
                </a>
                <a href="mailto:query@krishanora.com" className="flex items-center gap-3 text-[14px] font-body text-muted hover:opacity-80 transition-opacity">
                  <span>✉</span>
                  query@krishanora.com
                </a>
              </div>

              {/* Trust bullets */}
              <div className="flex flex-col gap-2.5">
                {['No upfront payment', 'Free wireframe consultation', 'Reply in under 4 hours', 'Zero commitment required'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-[13px] font-body text-chalk/70">
                    <CheckIcon />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form, order-first on mobile */}
            <div className="order-1 lg:order-2 p-8 md:p-14 bg-[#0b0b12]">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center gap-5 text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-signal/15 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="#5B6EF5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-chalk">We got your message!</h3>
                  <p className="text-muted font-body text-sm max-w-[260px]">Expect a reply within 4 hours. Or WhatsApp us for an instant response.</p>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-body font-semibold hover:bg-[#25D366]/25 transition-all">
                    <WaIcon size={14} />
                    Chat on WhatsApp →
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-display font-bold text-[22px] text-chalk mb-1">Get Free Consultation</h3>
                    <p className="text-muted font-body text-[13px]">All fields marked * are required.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input required name="name" type="text" placeholder="Your name *" className={inp} />
                    <input required name="email" type="email" placeholder="Email address *" className={inp} />
                  </div>
                  <input required name="phone" type="tel" placeholder="Phone number *" className={inp} />
                  <textarea required name="message" rows={4}
                    placeholder="Describe your app idea — what it does, who it's for, and your budget or timeline."
                    className={`${inp} resize-none`}
                  />
                  {error && <p className="text-[12px] font-body text-red-400">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="w-full py-4 bg-signal text-white rounded-xl font-body font-bold text-[15px] hover:bg-[#6b7df7] hover:shadow-[0_8px_30px_rgba(91,110,245,0.35)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending…' : 'Get Free Consultation →'}
                  </button>
                  <p className="text-center text-[11px] text-muted font-body">Free. No spam. We reply within 4 hours.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="px-5 md:px-10 py-20 bg-ink">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div {...reveal()} className="flex flex-col items-center gap-7">
          <div>
            <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">Ready to build?</span>
            <h2 className="font-display font-extrabold text-[40px] md:text-[60px] tracking-tighter text-chalk leading-[0.95]">
              Your Android app
              <br />
              starts <span className="text-signal">today.</span>
            </h2>
            <p className="text-muted font-body text-[16px] leading-relaxed max-w-md mx-auto mt-5">
              Join startups and businesses who trusted Krishanora IT.
              First consultation is always free — no strings attached.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a href="#contact"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 bg-signal text-white rounded-xl font-body font-bold text-[15px] hover:bg-[#6b7df7] hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(91,110,245,0.5)] transition-all duration-200">
              Get Free Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href={CALL_LINK} onClick={goCall}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-body font-bold text-[15px] hover:bg-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200">
              <PhoneIcon size={16} color="#34d399" />
              Call Now
            </a>
            <a href={WA_LINK} onClick={goWA}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#25D366]/35 bg-[#25D366]/10 text-[#25D366] font-body font-bold text-[15px] hover:bg-[#25D366]/20 hover:-translate-y-0.5 transition-all duration-200">
              <WaIcon size={16} />
              WhatsApp
            </a>
          </div>

          <p className="text-muted font-body text-[13px]">
            ✓ Free consultation &nbsp;·&nbsp; ✓ Reply in 4 hours &nbsp;·&nbsp; ✓ No commitment
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function AndroidFooter() {
  return (
    <footer className="px-5 md:px-10 py-14 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_auto_auto] gap-10 md:gap-16 mb-12">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="font-display font-extrabold text-[20px] tracking-tight text-chalk">
              Krishanora<span className="text-signal">.</span>IT
            </Link>
            <p className="text-muted font-body text-[13px] leading-relaxed max-w-[240px]">
              Custom Android app development company. Building apps that grow your business.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center hover:bg-[#25D366]/20 transition-colors text-[#25D366]" aria-label="WhatsApp">
                <WaIcon size={16} />
              </a>
              <a href={CALL_LINK}
                className="w-9 h-9 rounded-xl bg-signal/10 border border-signal/20 flex items-center justify-center hover:bg-signal/20 transition-colors" aria-label="Call us">
                <PhoneIcon size={15} color="#5B6EF5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-body font-medium tracking-widest uppercase text-muted mb-1">Services</span>
            {['Custom App Dev', 'UI/UX Design', 'API Integration', 'Maintenance'].map(item => (
              <a key={item} href="#services" className="text-[13px] font-body text-muted hover:text-chalk transition-colors">{item}</a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-body font-medium tracking-widest uppercase text-muted mb-1">Company</span>
            {[{ label: 'Portfolio', href: '#portfolio' }, { label: 'Process', href: '#process' }, { label: 'Pricing', href: '#pricing' }, { label: 'Main Site', href: '/' }].map(({ label, href }) => (
              <a key={label} href={href} className="text-[13px] font-body text-muted hover:text-chalk transition-colors">{label}</a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-body font-medium tracking-widest uppercase text-muted mb-1">Contact</span>
            <a href="mailto:query@krishanora.com" className="text-[13px] font-body text-muted hover:text-chalk transition-colors">query@krishanora.com</a>
            <a href={CALL_LINK} className="text-[13px] font-body text-muted hover:text-chalk transition-colors">+91 70079 64451</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[13px] font-body text-muted hover:text-chalk transition-colors">WhatsApp Us</a>
            <span className="text-[13px] font-body text-muted">Mon–Sat, 9AM–7PM IST</span>
          </div>
        </div>

        {/* Bottom bar — add pb so mobile sticky bar doesn't overlap */}
        <div className="border-t border-border pt-7 pb-24 md:pb-0 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px] font-body text-muted">
            © 2025 Krishanora IT. All rights reserved. | Android App Development Company India
          </span>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms'].map(item => (
              <a key={item} href="#" className="text-[12px] font-body text-muted hover:text-chalk transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING WHATSAPP — pulsing to drive attention
═══════════════════════════════════════════════════════════════ */
function FloatingWA() {
  return (
    /* Hide on mobile — mobile sticky bar handles those CTAs */
    <div className="hidden md:flex fixed bottom-6 right-5 z-40 flex-col items-end gap-3">
      <a
        href={WA_LINK}
        onClick={goWA}
        className="group flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.5)] hover:shadow-[0_4px_36px_rgba(37,211,102,0.65)] hover:scale-105 transition-all duration-200 pl-4 pr-5 py-3"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="relative flex shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20" />
          <WaIcon size={20} />
        </span>
        <span className="text-[13px] font-body font-bold">Chat with us</span>
      </a>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE STICKY BAR — WhatsApp primary, then Call, then Quote
   Order matches mobile user intent: chat > call > form
═══════════════════════════════════════════════════════════════ */
function MobileStickyBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0f0f16]/98 backdrop-blur-xl border-t border-[#252534] px-3 py-3 flex items-stretch gap-2">
      {/* WhatsApp — primary, largest tap target */}
      <a
        href={WA_LINK}
        onClick={goWA}
        className="flex-[1.15] flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white rounded-xl font-body font-bold text-[14px] active:opacity-90 transition-opacity shadow-[0_4px_16px_rgba(37,211,102,0.35)]"
      >
        <WaIcon size={17} />
        WhatsApp
      </a>
      {/* Call Now */}
      <a
        href={CALL_LINK}
        onClick={goCall}
        className="flex-1 flex items-center justify-center gap-1.5 py-3.5 bg-[#1C1C28] border border-[#252534] text-chalk rounded-xl font-body font-semibold text-[13px] active:opacity-80 transition-opacity"
      >
        <PhoneIcon size={14} color="#34d399" />
        Call
      </a>
      {/* Get Quote */}
      <a
        href="#contact"
        className="flex-1 flex items-center justify-center py-3.5 bg-signal text-white rounded-xl font-body font-bold text-[13px] active:opacity-90 transition-opacity shadow-[0_4px_16px_rgba(91,110,245,0.35)]"
      >
        Get Quote
      </a>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE ASSEMBLY
═══════════════════════════════════════════════════════════════ */
export default function AndroidPage() {
  return (
    <main className="bg-ink">
      <AndroidNav />
      <Hero />
      <OfferStrip />
      <QuickForm />
      <Services />
      <WhyUs />
      <Portfolio />
      <Process />
      <Pricing />
      <Testimonials />
      <LeadForm />
      <FinalCTA />
      <AndroidFooter />
      <FloatingWA />
      <MobileStickyBar />
    </main>
  )
}
