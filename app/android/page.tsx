'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/* ─── constants ─────────────────────────────────────────────── */
const WA_LINK = 'https://wa.me/917007964451?text=Hi%2C%20I%27m%20interested%20in%20Android%20App%20Development%20services'
const CALL_LINK = 'tel:+917007964451'

/* ─── animation helpers ─────────────────────────────────────── */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.75, ease: [0.23, 1, 0.32, 1] },
})

/* ─── sub-components ────────────────────────────────────────── */

function AndroidNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-5 md:px-10 pt-5"
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${scrolled ? 'bg-[#111118]/85 backdrop-blur-2xl border border-[#252534]' : ''}`}>
        <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight text-chalk">
          Krishanora<span className="text-signal">.</span>IT
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="text-[13px] font-body font-medium text-muted hover:text-chalk transition-colors duration-200">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-[13px] font-body font-medium hover:bg-[#25D366]/25 transition-all duration-200"
          >
            {/* WhatsApp icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-signal text-white text-[13px] font-body font-medium hover:bg-[#6b7df7] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(91,110,245,0.35)] hover:-translate-y-px"
          >
            Get Free Quote
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5" aria-label="Toggle menu">
          <span className={`block w-5 h-px bg-chalk transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`block w-5 h-px bg-chalk transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-chalk transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 mx-auto max-w-7xl bg-[#111118]/95 backdrop-blur-2xl border border-[#252534] rounded-2xl p-5 flex flex-col gap-4"
        >
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)} className="text-sm font-body font-medium text-muted hover:text-chalk py-1">
              {label}
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}
            className="text-center px-5 py-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-body font-medium">
            Chat on WhatsApp
          </a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="text-center px-5 py-3 rounded-xl bg-signal text-white text-sm font-body font-medium">
            Get Free Quote
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}

/* ─── HERO ─────────────────────────────────────────────────── */
function Hero() {
  const CONTAINER = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
  }
  const ITEM = {
    hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] } },
  }

  const trust = ['50+ Apps Delivered', 'Play Store Ready', 'Kotlin & Jetpack Compose', 'Rated 4.9★']

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-ink">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-signal/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-emerald-500/6 rounded-full blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <motion.div
        variants={CONTAINER}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center gap-7 px-5 md:px-10 py-32 max-w-5xl mx-auto w-full"
      >
        {/* Badge */}
        <motion.div variants={ITEM}>
          <span className="inline-flex items-center gap-2 text-[11px] font-body font-medium tracking-widest uppercase text-signal border border-signal/25 bg-signal/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            Android App Development Company
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={ITEM}
          className="font-display font-extrabold text-[48px] sm:text-[64px] md:text-[80px] xl:text-[96px] leading-[0.92] tracking-tighter text-chalk"
        >
          Build Your
          <br />
          <em className="not-italic text-signal">Android App</em>
          <br />
          in 7–14 Days
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={ITEM}
          className="text-[#c8c5bf] font-body font-light text-lg md:text-xl leading-relaxed max-w-[560px]"
        >
          Custom Android apps for startups, small businesses, and entrepreneurs.
          From idea to Play Store — fast, affordable, and built to last.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={ITEM} className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-4 bg-signal text-white rounded-xl font-body font-semibold text-sm hover:bg-[#6b7df7] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(91,110,245,0.45)] transition-all duration-200"
          >
            Get Free Quote
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] font-body font-semibold text-sm hover:bg-[#25D366]/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div variants={ITEM} className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {trust.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 text-[12px] font-body text-muted bg-surface border border-border px-3 py-1.5 rounded-lg">
              <span className="w-1 h-1 rounded-full bg-signal" />
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted font-body tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-7 bg-gradient-to-b from-muted/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}

/* ─── SERVICES ──────────────────────────────────────────────── */
function Services() {
  const services = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="2" width="14" height="20" rx="3" stroke="#5B6EF5" strokeWidth="1.5"/>
          <path d="M9 7h6M9 11h6M9 15h4" stroke="#5B6EF5" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="18.5" r="0.75" fill="#5B6EF5"/>
        </svg>
      ),
      color: 'signal',
      title: 'Custom App Development',
      desc: 'Tailor-made Android apps built from scratch to match your exact business needs. Native performance, offline-first, and scalable from day one.',
      tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Room DB'],
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#a78bfa" strokeWidth="1.5"/>
          <circle cx="12" cy="10" r="3" stroke="#a78bfa" strokeWidth="1.5"/>
          <path d="M7 19c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      color: 'violet',
      title: 'UI/UX Design',
      desc: 'Beautiful, intuitive interfaces designed for real users. Every screen crafted to maximise engagement and reduce drop-off.',
      tags: ['Material You', 'Figma', 'Prototyping', 'User Testing'],
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="5" stroke="#34d399" strokeWidth="1.5"/>
          <path d="M8.5 8.5l2 2M13.5 13.5l2 2M15.5 8.5l-2 2M8.5 15.5l2-2" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
      color: 'emerald',
      title: 'API Integration',
      desc: 'Connect your app to any backend, payment gateway, or third-party service. REST, GraphQL, Firebase — we handle the plumbing.',
      tags: ['Retrofit', 'Firebase', 'REST APIs', 'Stripe/Razorpay'],
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: 'amber',
      title: 'App Maintenance & Support',
      desc: 'We don\'t disappear after launch. Bug fixes, Android version updates, performance monitoring, and feature additions — ongoing.',
      tags: ['Bug Fixes', 'OS Updates', 'Performance', 'Analytics'],
    },
  ]

  const colorMap: Record<string, string> = {
    signal: 'bg-signal/15 group-hover:bg-signal/20',
    violet: 'bg-violet-500/15 group-hover:bg-violet-500/20',
    emerald: 'bg-emerald-500/15 group-hover:bg-emerald-500/20',
    amber: 'bg-amber-500/15 group-hover:bg-amber-500/20',
  }
  const glowMap: Record<string, string> = {
    signal: 'bg-signal/8 group-hover:bg-signal/14',
    violet: 'bg-violet-600/8 group-hover:bg-violet-600/14',
    emerald: 'bg-emerald-500/8 group-hover:bg-emerald-500/14',
    amber: 'bg-amber-500/8 group-hover:bg-amber-500/14',
  }

  return (
    <section id="services" className="px-5 md:px-10 py-28 bg-ink">
      <div className="max-w-7xl mx-auto">
        <motion.div {...reveal()} className="mb-16 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
            What we build
          </span>
          {/* H2 for SEO */}
          <h2 className="font-display font-extrabold text-[40px] md:text-[56px] tracking-tighter text-chalk leading-[0.95]">
            Android app development
            <br />
            <span className="text-signal">services</span> that deliver.
          </h2>
          <p className="text-muted font-body text-[15px] leading-relaxed mt-5 max-w-lg">
            End-to-end custom Android app development — from wireframe to Play Store and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(({ icon, color, title, desc, tags }, i) => (
            <motion.div
              key={title}
              {...reveal(i * 0.07)}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
              className="group relative bg-surface border border-border rounded-3xl p-8 overflow-hidden cursor-default"
            >
              <div className={`absolute -top-16 -right-16 w-48 h-48 ${glowMap[color]} rounded-full blur-3xl transition-all duration-700`} />
              <div className="relative z-10">
                <div className={`w-11 h-11 rounded-2xl ${colorMap[color]} flex items-center justify-center mb-6 transition-colors duration-300`}>
                  {icon}
                </div>
                <h3 className="font-display font-bold text-[20px] text-chalk mb-3">{title}</h3>
                <p className="text-muted font-body text-[15px] leading-relaxed mb-6">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(t => (
                    <span key={t} className="px-3 py-1 rounded-lg bg-surface-2 border border-border text-[12px] text-muted font-body">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── WHY CHOOSE US ─────────────────────────────────────────── */
function WhyUs() {
  const reasons = [
    { icon: '⚡', title: 'Fast Delivery', desc: '7–14 days for an MVP. We run lean sprints — no bloated timelines.' },
    { icon: '💰', title: 'Affordable Pricing', desc: 'Transparent quotes with no hidden costs. Starting at ₹25,000.' },
    { icon: '🛠', title: 'Experienced Developers', desc: '5+ years building production Android apps with modern Kotlin & Compose.' },
    { icon: '📈', title: 'Scalable Solutions', desc: 'Architecture designed to grow with your user base — from 100 to 100K users.' },
    { icon: '🛡', title: 'Post-Launch Support', desc: '30 days free support after launch. Long-term plans available.' },
    { icon: '🔒', title: 'You Own the Code', desc: 'Full source code ownership. No lock-in, no monthly fees, yours forever.' },
  ]

  return (
    <section className="px-5 md:px-10 py-28 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...reveal()} className="mb-14 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
            Why choose us
          </span>
          <h2 className="font-display font-extrabold text-[40px] md:text-[54px] tracking-tighter text-chalk leading-[0.95]">
            Why startups choose
            <br />
            Krishanora IT.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              {...reveal(i * 0.06)}
              whileHover={{ y: -4, borderColor: 'rgba(91,110,245,0.4)', transition: { duration: 0.2 } }}
              className="group bg-ink border border-border rounded-2xl p-7 flex flex-col gap-4 transition-colors duration-200"
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <h3 className="font-display font-bold text-[17px] text-chalk mb-2">{title}</h3>
                <p className="text-muted font-body text-[14px] leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── PORTFOLIO ─────────────────────────────────────────────── */
function Portfolio() {
  const projects = [
    {
      name: 'QuickMart',
      category: 'E-Commerce',
      desc: 'A full-featured grocery delivery app with real-time order tracking, multi-vendor support, and integrated UPI payments.',
      results: ['10K+ downloads in 3 months', 'Rated 4.7★ on Play Store', '35% repeat purchase rate'],
      color: 'signal',
      tags: ['Kotlin', 'Firebase', 'Razorpay', 'Google Maps'],
    },
    {
      name: 'MedTrack',
      category: 'Healthcare',
      desc: 'Medicine reminder and health journal app with doctor consultation scheduling, lab report storage, and family health profiles.',
      results: ['5,000+ active users', '92% daily retention', 'Featured in Play Store Health'],
      color: 'emerald',
      tags: ['Jetpack Compose', 'Room DB', 'WorkManager', 'Retrofit'],
    },
    {
      name: 'FieldForce',
      category: 'B2B / SaaS',
      desc: 'Field sales management app for SMEs — GPS attendance, customer visit logs, expense claims, and daily report automation.',
      results: ['Used by 200+ field agents', 'Saved 4 hrs/week per agent', '99.9% uptime over 1 year'],
      color: 'violet',
      tags: ['Kotlin', 'MVVM', 'Coroutines', 'Google Maps API'],
    },
  ]

  const colorMap: Record<string, { border: string; badge: string; dot: string }> = {
    signal: { border: 'border-signal/30', badge: 'bg-signal/10 text-signal', dot: 'bg-signal' },
    emerald: { border: 'border-emerald-500/30', badge: 'bg-emerald-500/10 text-emerald-400', dot: 'bg-emerald-400' },
    violet: { border: 'border-violet-500/30', badge: 'bg-violet-500/10 text-violet-400', dot: 'bg-violet-400' },
  }

  return (
    <section id="portfolio" className="px-5 md:px-10 py-28 bg-ink">
      <div className="max-w-7xl mx-auto">
        <motion.div {...reveal()} className="mb-16 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
            Portfolio
          </span>
          <h2 className="font-display font-extrabold text-[40px] md:text-[54px] tracking-tighter text-chalk leading-[0.95]">
            Apps we've
            <br />
            <span className="text-signal">shipped.</span>
          </h2>
          <p className="text-muted font-body text-[15px] leading-relaxed mt-5">
            Real projects, real results. Here's what we've built for clients like you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {projects.map(({ name, category, desc, results, color, tags }, i) => (
            <motion.div
              key={name}
              {...reveal(i * 0.08)}
              className={`group relative bg-surface border ${colorMap[color].border} rounded-3xl p-7 flex flex-col gap-5 overflow-hidden`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[22px] text-chalk">{name}</h3>
                    <span className={`inline-block text-[11px] font-body font-medium px-2.5 py-0.5 rounded-full mt-1 ${colorMap[color].badge}`}>
                      {category}
                    </span>
                  </div>
                  {/* App icon placeholder */}
                  <div className={`w-12 h-12 rounded-2xl bg-surface-2 border border-border flex items-center justify-center shrink-0`}>
                    <span className="text-xl">📱</span>
                  </div>
                </div>
                <p className="text-muted font-body text-[14px] leading-relaxed">{desc}</p>
              </div>

              {/* Results */}
              <div className="flex flex-col gap-2">
                {results.map((r) => (
                  <div key={r} className="flex items-center gap-2.5 text-[13px] font-body text-chalk/80">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${colorMap[color].dot}`} />
                    {r}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border">
                {tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-[11px] text-muted font-body">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── PROCESS ───────────────────────────────────────────────── */
function Process() {
  const steps = [
    {
      num: '01',
      title: 'Requirement Discussion',
      desc: 'We start with a free 30-min call to understand your app idea, target audience, and business goals. No jargon, just clarity.',
    },
    {
      num: '02',
      title: 'Design & Development',
      desc: 'UI/UX wireframes first, then production-grade Kotlin code. You review every screen before we build it.',
    },
    {
      num: '03',
      title: 'Testing & QA',
      desc: 'Rigorous testing across real Android devices — from budget phones to flagship. Zero crash tolerance before release.',
    },
    {
      num: '04',
      title: 'Launch & Support',
      desc: 'We handle the Play Store submission and stay with you for 30 days post-launch. Long-term support plans available.',
    },
  ]

  return (
    <section id="process" className="px-5 md:px-10 py-28 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...reveal()} className="mb-16 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
            How it works
          </span>
          <h2 className="font-display font-extrabold text-[40px] md:text-[54px] tracking-tighter text-chalk leading-[0.95]">
            From idea to
            <br />
            <span className="text-signal">Play Store.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              {...reveal(i * 0.08)}
              className="relative bg-ink border border-border rounded-2xl p-7 flex flex-col gap-4"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[52px] right-[-26px] w-[26px] h-px bg-gradient-to-r from-border to-transparent z-10" />
              )}

              <span className="font-display font-extrabold text-[48px] leading-none text-signal/20">{num}</span>
              <div>
                <h3 className="font-display font-bold text-[17px] text-chalk mb-2">{title}</h3>
                <p className="text-muted font-body text-[14px] leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── PRICING ───────────────────────────────────────────────── */
function Pricing() {
  const plans = [
    {
      label: 'Starter',
      price: '₹25,000',
      note: 'starting at',
      desc: 'Perfect for MVPs and proof-of-concept apps.',
      features: ['Up to 5 screens', 'Basic UI/UX design', 'Firebase backend', '2 weeks delivery', '30-day bug fix support'],
      cta: 'Get Quote',
      highlight: false,
    },
    {
      label: 'Growth',
      price: '₹60,000',
      note: 'starting at',
      desc: 'Ideal for full-featured business apps.',
      features: ['Unlimited screens', 'Custom UI/UX design', 'API + payment integration', '3–4 weeks delivery', '60-day support', 'Play Store submission'],
      cta: 'Most Popular',
      highlight: true,
    },
    {
      label: 'Enterprise',
      price: 'Custom',
      note: 'tailored quote',
      desc: 'For complex, multi-role, or B2B platforms.',
      features: ['Multi-role app', 'Admin panel + dashboard', 'Advanced integrations', 'Dedicated developer', 'Ongoing maintenance', 'SLA guarantee'],
      cta: 'Contact Us',
      highlight: false,
    },
  ]

  return (
    <section id="pricing" className="px-5 md:px-10 py-28 bg-ink">
      <div className="max-w-7xl mx-auto">
        <motion.div {...reveal()} className="mb-6 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
            Pricing
          </span>
          <h2 className="font-display font-extrabold text-[40px] md:text-[54px] tracking-tighter text-chalk leading-[0.95]">
            Transparent pricing,
            <br />
            <span className="text-signal">no surprises.</span>
          </h2>
        </motion.div>

        {/* Urgency banner */}
        <motion.div {...reveal(0.05)} className="mb-12 inline-flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 font-body text-[13px] font-medium">
            Limited-time offer: Free consultation + wireframe worth ₹5,000 — book this week.
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(({ label, price, note, desc, features, cta, highlight }, i) => (
            <motion.div
              key={label}
              {...reveal(i * 0.07)}
              className={`relative rounded-3xl p-8 flex flex-col gap-6 overflow-hidden ${
                highlight
                  ? 'bg-signal border border-signal/80 shadow-[0_0_60px_rgba(91,110,245,0.25)]'
                  : 'bg-surface border border-border'
              }`}
            >
              {highlight && (
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              )}
              <div>
                <span className={`text-[11px] font-body font-medium tracking-widest uppercase ${highlight ? 'text-white/70' : 'text-muted'}`}>
                  {label}
                </span>
                <div className="flex items-end gap-2 mt-3">
                  <span className={`font-display font-extrabold text-[40px] leading-none ${highlight ? 'text-white' : 'text-chalk'}`}>{price}</span>
                  <span className={`font-body text-[13px] mb-1.5 ${highlight ? 'text-white/60' : 'text-muted'}`}>{note}</span>
                </div>
                <p className={`font-body text-[14px] mt-3 ${highlight ? 'text-white/80' : 'text-muted'}`}>{desc}</p>
              </div>

              <ul className="flex flex-col gap-3">
                {features.map((f) => (
                  <li key={f} className={`flex items-center gap-2.5 text-[14px] font-body ${highlight ? 'text-white/90' : 'text-chalk/80'}`}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0">
                      <circle cx="7.5" cy="7.5" r="7" fill={highlight ? 'rgba(255,255,255,0.2)' : 'rgba(91,110,245,0.2)'}/>
                      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={highlight ? '#fff' : '#5B6EF5'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-auto w-full text-center py-3.5 rounded-xl font-body font-semibold text-[14px] transition-all duration-200 ${
                  highlight
                    ? 'bg-white text-signal hover:bg-white/90'
                    : 'bg-signal/10 border border-signal/30 text-signal hover:bg-signal/20'
                }`}
              >
                {highlight ? '⭐ ' : ''}{cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p {...reveal(0.2)} className="text-center text-muted font-body text-[13px] mt-8">
          Not sure which plan fits? <a href="#contact" className="text-signal underline underline-offset-2 hover:text-[#6b7df7]">Talk to us for a custom quote.</a>
        </motion.p>
      </div>
    </section>
  )
}

/* ─── TESTIMONIALS ──────────────────────────────────────────── */
function Testimonials() {
  const reviews = [
    {
      name: 'Rahul Sharma',
      role: 'Founder, QuickMart',
      text: 'Krishanora IT delivered our grocery app in under 3 weeks — on time and on budget. The UI is clean, the performance is smooth, and they were responsive throughout. Highly recommend for any startup needing a solid Android app.',
      rating: 5,
      avatar: 'RS',
    },
    {
      name: 'Priya Menon',
      role: 'Co-founder, MedTrack',
      text: 'We had a complex healthcare app idea and weren\'t sure any team would get it right. Krishanora IT not only understood our vision but improved it. The post-launch support has been exceptional — they feel like an extension of our team.',
      rating: 5,
      avatar: 'PM',
    },
    {
      name: 'Akash Verma',
      role: 'Operations Head, FieldForce',
      text: 'The team built our field sales app exactly as we needed. The GPS tracking is accurate, the UI is simple enough for non-tech users, and it\'s saved us hours of manual reporting every week. Great value for money.',
      rating: 5,
      avatar: 'AV',
    },
  ]

  return (
    <section className="px-5 md:px-10 py-28 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...reveal()} className="mb-16 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
            Client testimonials
          </span>
          <h2 className="font-display font-extrabold text-[40px] md:text-[54px] tracking-tighter text-chalk leading-[0.95]">
            What our clients
            <br />
            <span className="text-signal">actually say.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {reviews.map(({ name, role, text, rating, avatar }, i) => (
            <motion.div
              key={name}
              {...reveal(i * 0.07)}
              className="group bg-ink border border-border rounded-2xl p-7 flex flex-col gap-5 hover:border-signal/30 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-muted font-body text-[14px] leading-relaxed flex-1">"{text}"</p>

              <div className="flex items-center gap-3 border-t border-border pt-5">
                <div className="w-10 h-10 rounded-full bg-signal/20 border border-signal/30 flex items-center justify-center text-[13px] font-display font-bold text-signal shrink-0">
                  {avatar}
                </div>
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

/* ─── LEAD FORM ─────────────────────────────────────────────── */
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
      if (!res.ok) throw new Error('send_failed')
      setSent(true)
    } catch {
      setError('Something went wrong — please WhatsApp us directly at +91 70079 64451')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-surface-2 border border-border rounded-xl px-4 py-3.5 text-[14px] font-body text-chalk placeholder:text-muted focus:outline-none focus:border-signal/60 transition-colors duration-200"

  return (
    <section id="contact" className="px-5 md:px-10 py-28 bg-ink">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-surface border border-border rounded-[32px] overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-signal/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-600/6 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 p-8 md:p-14">

            {/* Left */}
            <div className="flex flex-col gap-7">
              <div>
                <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
                  Free consultation
                </span>
                <h2 className="font-display font-extrabold text-[32px] sm:text-[42px] md:text-[52px] tracking-tighter text-chalk leading-[0.95]">
                  Tell us about
                  <br />
                  your app idea.
                </h2>
              </div>

              <p className="text-muted font-body text-[15px] leading-relaxed max-w-sm">
                We'll reply within 4 hours with an honest assessment — not a sales pitch.
                No commitment needed.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                {[
                  { icon: '💬', label: 'WhatsApp: +91 70079 64451', href: WA_LINK },
                  { icon: '📞', label: 'Call: +91 70079 64451', href: CALL_LINK },
                  { icon: '✉', label: 'query@krishanora.com', href: 'mailto:query@krishanora.com' },
                  { icon: '🕐', label: 'Mon–Sat, 9 AM – 7 PM IST', href: null },
                ].map(({ icon, label, href }) => (
                  <div key={label} className="flex items-center gap-3 text-[14px] font-body text-muted">
                    <span>{icon}</span>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="hover:text-chalk transition-colors duration-200">{label}</a>
                    ) : (
                      <span>{label}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Trust */}
              <div className="flex flex-col gap-2 pt-4">
                {['No upfront payment', 'Free wireframe consultation', 'Reply in under 4 hours'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-[13px] font-body text-chalk/70">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="7" fill="rgba(91,110,245,0.2)"/>
                      <path d="M4 7l2 2 4-4" stroke="#5B6EF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center gap-5 text-center py-16"
                >
                  <div className="w-16 h-16 rounded-full bg-signal/15 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="#5B6EF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-chalk">We got your message!</h3>
                  <p className="text-muted font-body text-sm max-w-xs">
                    Expect a reply within 4 hours. Or WhatsApp us now for an instant response.
                  </p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-body font-medium hover:bg-[#25D366]/25 transition-all duration-200"
                  >
                    Chat on WhatsApp →
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required name="name" type="text" placeholder="Your name" className={inputClass} />
                    <input required name="email" type="email" placeholder="Email address" className={inputClass} />
                  </div>
                  <input name="phone" type="tel" placeholder="Phone number (optional)" className={inputClass} />
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Describe your app idea — what it does, who it's for, and your timeline or budget."
                    className={`${inputClass} resize-none`}
                  />

                  {error && <p className="text-[12px] font-body text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-signal text-white rounded-xl font-body font-semibold text-[15px] hover:bg-[#6b7df7] hover:shadow-[0_8px_30px_rgba(91,110,245,0.35)] hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending…' : 'Get Free Consultation →'}
                  </button>

                  <p className="text-center text-[11px] text-muted font-body">
                    Free. No spam. We reply within 4 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FINAL CTA ─────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="px-5 md:px-10 py-28 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div {...reveal()} className="flex flex-col items-center gap-8">
          <div>
            <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
              Ready to build?
            </span>
            <h2 className="font-display font-extrabold text-[44px] md:text-[64px] tracking-tighter text-chalk leading-[0.95]">
              Your Android app
              <br />
              starts <span className="text-signal">today.</span>
            </h2>
            <p className="text-muted font-body text-[16px] leading-relaxed max-w-md mx-auto mt-6">
              Join startups and businesses who trusted Krishanora IT to build their Android apps.
              First consultation is always free.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-signal text-white rounded-xl font-body font-semibold text-[15px] hover:bg-[#6b7df7] hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(91,110,245,0.5)] transition-all duration-200"
            >
              Get Free Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] font-body font-semibold text-[15px] hover:bg-[#25D366]/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
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

/* ─── ANDROID FOOTER ────────────────────────────────────────── */
function AndroidFooter() {
  return (
    <footer className="px-5 md:px-10 py-16 bg-ink border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_auto_auto] gap-10 md:gap-16 mb-14">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="font-display font-extrabold text-[20px] tracking-tight text-chalk">
              Krishanora<span className="text-signal">.</span>IT
            </Link>
            <p className="text-muted font-body text-[13px] leading-relaxed max-w-[240px]">
              Custom Android app development company. Building apps that grow your business.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center hover:bg-[#25D366]/20 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href={CALL_LINK}
                className="w-9 h-9 rounded-xl bg-signal/10 border border-signal/20 flex items-center justify-center hover:bg-signal/20 transition-colors duration-200"
                aria-label="Call us"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B6EF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.01 2 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-body font-medium tracking-widest uppercase text-muted mb-1">Services</span>
            {['Custom App Dev', 'UI/UX Design', 'API Integration', 'Maintenance'].map(item => (
              <a key={item} href="#services" className="text-[13px] font-body text-muted hover:text-chalk transition-colors duration-200">{item}</a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-body font-medium tracking-widest uppercase text-muted mb-1">Company</span>
            {[
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Process', href: '#process' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Main Site', href: '/' },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="text-[13px] font-body text-muted hover:text-chalk transition-colors duration-200">{label}</a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-body font-medium tracking-widest uppercase text-muted mb-1">Contact</span>
            <a href="mailto:query@krishanora.com" className="text-[13px] font-body text-muted hover:text-chalk transition-colors duration-200">query@krishanora.com</a>
            <a href={CALL_LINK} className="text-[13px] font-body text-muted hover:text-chalk transition-colors duration-200">+91 70079 64451</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[13px] font-body text-muted hover:text-chalk transition-colors duration-200">WhatsApp Us</a>
            <span className="text-[13px] font-body text-muted">Mon–Sat, 9AM–7PM IST</span>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px] font-body text-muted">
            © 2025 Krishanora IT. All rights reserved. | Android App Development Company India
          </span>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms'].map(item => (
              <a key={item} href="#" className="text-[12px] font-body text-muted hover:text-chalk transition-colors duration-200">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── FLOATING BUTTONS ──────────────────────────────────────── */
function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3">
      {/* Call — mobile only */}
      <a
        href={CALL_LINK}
        className="md:hidden w-12 h-12 rounded-full bg-signal shadow-[0_4px_20px_rgba(91,110,245,0.5)] flex items-center justify-center hover:scale-105 transition-transform duration-200"
        aria-label="Call us"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.01 2 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
      </a>

      {/* WhatsApp — always visible */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_4px_32px_rgba(37,211,102,0.6)] hover:scale-105 transition-all duration-200 pl-4 pr-5 py-3"
        aria-label="Chat on WhatsApp"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-[13px] font-body font-semibold">Chat with us</span>
      </a>
    </div>
  )
}

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function AndroidPage() {
  return (
    <main className="bg-ink">
      <AndroidNav />
      <Hero />
      <Services />
      <WhyUs />
      <Portfolio />
      <Process />
      <Pricing />
      <Testimonials />
      <LeadForm />
      <FinalCTA />
      <AndroidFooter />
      <FloatingButtons />
    </main>
  )
}
