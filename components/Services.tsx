'use client'
import { motion } from 'framer-motion'

const webStack = ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind', 'Vercel', 'Stripe']
const androidStack = ['Kotlin', 'Jetpack Compose', 'Firebase', 'Retrofit', 'Room DB', 'Material You', 'WorkManager', 'Play Store']

const guarantees = [
  { icon: '⚡', stat: '2–4 wks', desc: 'MVP delivery' },
  { icon: '🔒', stat: '100%', desc: 'You own the code' },
  { icon: '🛡', stat: '24 / 7', desc: 'Post-launch support' },
  { icon: '✦', stat: '$0', desc: 'Hidden fees' },
]

function Tag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-lg bg-surface-2 border border-border text-[12px] text-muted font-body">
      {label}
    </span>
  )
}

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.75, ease: [0.23, 1, 0.32, 1] },
})

export default function Services() {
  return (
    <section id="services" className="px-5 md:px-10 py-28">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div {...reveal()} className="mb-16 max-w-2xl">
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
            What we do
          </span>
          <h2 className="font-display font-extrabold text-[42px] md:text-[58px] tracking-tighter text-chalk leading-[0.95]">
            Services built for
            <br />
            modern businesses.
          </h2>
        </motion.div>

        {/* Main service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

          {/* Web Dev */}
          <motion.div
            {...reveal(0.05)}
            whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
            className="group relative bg-surface border border-border rounded-3xl p-8 overflow-hidden cursor-default"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-signal/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-signal/8 rounded-full blur-3xl group-hover:bg-signal/14 transition-all duration-700" />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-signal/15 flex items-center justify-center mb-7">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 5C2 3.9 2.9 3 4 3H16C17.1 3 18 3.9 18 5V15C18 16.1 17.1 17 16 17H4C2.9 17 2 16.1 2 15V5Z" stroke="#5B6EF5" strokeWidth="1.5"/>
                  <path d="M7 8L4 10L7 12" stroke="#5B6EF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 8L16 10L13 12" stroke="#5B6EF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 7L9 13" stroke="#5B6EF5" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              <h3 className="font-display font-bold text-[22px] text-chalk mb-3">
                Web Application Development
              </h3>
              <p className="text-muted font-body text-[15px] leading-relaxed mb-7 max-w-sm">
                Full-stack web products engineered for speed and growth. SaaS platforms,
                marketplaces, dashboards — built to convert and designed to last.
              </p>

              <div className="flex flex-wrap gap-2">
                {webStack.map(t => <Tag key={t} label={t} />)}
              </div>
            </div>
          </motion.div>

          {/* Android Dev */}
          <motion.div
            {...reveal(0.1)}
            whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
            className="group relative bg-surface border border-border rounded-3xl p-8 overflow-hidden cursor-default"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-violet-600/8 rounded-full blur-3xl group-hover:bg-violet-600/14 transition-all duration-700" />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-violet-500/15 flex items-center justify-center mb-7">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="5" y="2" width="10" height="16" rx="2" stroke="#a78bfa" strokeWidth="1.5"/>
                  <circle cx="10" cy="15" r="0.75" fill="#a78bfa"/>
                  <path d="M8 5H12" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              <h3 className="font-display font-bold text-[22px] text-chalk mb-3">
                Android App Development
              </h3>
              <p className="text-muted font-body text-[15px] leading-relaxed mb-7 max-w-sm">
                Native Android experiences built with Jetpack Compose. Beautiful interfaces,
                offline-first architecture, and frictionless Play Store launches.
              </p>

              <div className="flex flex-wrap gap-2">
                {androidStack.map(t => <Tag key={t} label={t} />)}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Guarantee strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {guarantees.map(({ icon, stat, desc }, i) => (
            <motion.div
              key={desc}
              {...reveal(0.15 + i * 0.06)}
              whileHover={{ y: -3, borderColor: 'rgba(91,110,245,0.45)', transition: { duration: 0.2 } }}
              className="bg-surface border border-border rounded-2xl p-5 flex items-center gap-4 transition-colors duration-200"
            >
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <div className="font-display font-bold text-[18px] text-chalk leading-none">{stat}</div>
                <div className="text-muted text-xs font-body mt-1">{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
