'use client'
import { motion } from 'framer-motion'

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}
const ITEM = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] } },
}

const stats = [
  { value: '120+', label: 'Products shipped' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '5 yrs', label: 'In the industry' },
  { value: '12', label: 'Countries served' },
]

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">

      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover z-0"
        src="/IT_service.mp4"
      />

      {/* ── Inward masking gradient ──
           Four layers stacked:
           1. Dark scrim for text contrast
           2. Radial vignette: transparent center → solid edge
           3. Top/bottom edge fade → #09090E
           4. Left/right edge fade → #09090E
      */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: [
            /* dark scrim */
            'linear-gradient(to bottom, rgba(9,9,14,0.45), rgba(9,9,14,0.45))',
            /* radial vignette inward */
            'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 25%, rgba(9,9,14,0.82) 80%)',
            /* top & bottom hard edges */
            'linear-gradient(to bottom, #09090E 0%, transparent 22%, transparent 68%, #09090E 100%)',
            /* left & right hard edges */
            'linear-gradient(to right, #09090E 0%, transparent 18%, transparent 82%, #09090E 100%)',
          ].join(', '),
        }}
      />

      {/* ── Content ── */}
      <motion.div
        variants={CONTAINER}
        initial="hidden"
        animate="show"
        className="relative z-20 flex flex-col items-center text-center gap-7 px-5 md:px-10 py-32 max-w-4xl mx-auto w-full"
      >
        {/* Badge */}
        <motion.div variants={ITEM}>
          <span className="inline-flex items-center gap-2 text-[11px] font-body font-medium tracking-widest uppercase text-signal border border-signal/25 bg-signal/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            Available for new projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={ITEM}
          className="font-display font-extrabold text-[52px] sm:text-[68px] md:text-[80px] xl:text-[96px] leading-[0.92] tracking-tighter text-chalk"
        >
          We build
          <br />
          <em className="not-italic text-signal">digital</em>
          <br />
          products
          <br />
          that scale.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={ITEM}
          className="text-[#c8c5bf] font-body font-light text-lg md:text-xl leading-relaxed max-w-[520px]"
        >
          From pixel-perfect web applications to native Android apps —
          we engineer products that move fast and look exceptional.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={ITEM} className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-signal text-white rounded-xl font-body font-medium text-sm
                       hover:bg-[#6b7df7] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(91,110,245,0.45)] transition-all duration-200"
          >
            Start a project
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#09090E]/60 backdrop-blur-sm border border-[#ffffff18] text-chalk rounded-xl font-body font-medium text-sm
                       hover:border-signal/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            View our work
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={ITEM}
          className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-5 pt-6 mt-2 border-t border-[#ffffff10] w-full max-w-xl"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-display font-bold text-[26px] text-chalk leading-none">{value}</span>
              <span className="text-muted text-[11px] font-body">{label}</span>
              {label === 'Products shipped' && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  {/* Web */}
                  <span title="Web" className="w-5 h-5 rounded-md bg-signal/20 border border-signal/30 flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <rect x="0.5" y="1.5" width="10" height="8" rx="1" stroke="#5B6EF5" strokeWidth="1"/>
                      <path d="M3 4L1 5.5L3 7" stroke="#5B6EF5" strokeWidth="0.8" strokeLinecap="round"/>
                      <path d="M8 4L10 5.5L8 7" stroke="#5B6EF5" strokeWidth="0.8" strokeLinecap="round"/>
                    </svg>
                  </span>
                  {/* React Native */}
                  <span title="React Native" className="w-5 h-5 rounded-md bg-violet-500/20 border border-violet-400/30 flex items-center justify-center">
                    <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                      <rect x="1.5" y="0.5" width="6" height="10" rx="1" stroke="#a78bfa" strokeWidth="1"/>
                      <circle cx="4.5" cy="8.5" r="0.6" fill="#a78bfa"/>
                    </svg>
                  </span>
                  {/* Android */}
                  <span title="Android" className="w-5 h-5 rounded-md bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 7.5V4.5C2 3.12 3.12 2 4.5 2H6.5C7.88 2 9 3.12 9 4.5V7.5" stroke="#34d399" strokeWidth="1" strokeLinecap="round"/>
                      <rect x="1" y="4.5" width="1.2" height="2.5" rx="0.6" fill="#34d399"/>
                      <rect x="8.8" y="4.5" width="1.2" height="2.5" rx="0.6" fill="#34d399"/>
                      <path d="M3.5 1.5L3 0.5M7.5 1.5L8 0.5" stroke="#34d399" strokeWidth="0.8" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
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
