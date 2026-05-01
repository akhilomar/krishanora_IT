'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Project = {
  title: string
  desc: string
  tags: string[]
  type: 'web' | 'react-native'
  thumbnail: string
  overlayFrom: string
}

const projects: Project[] = [
  {
    title: 'LendFlow — Lending SaaS',
    desc: 'End-to-end loan management platform with real-time dashboards, borrower portals, and automated EMI tracking.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    type: 'web',
    thumbnail: '/lendflow.png',
    overlayFrom: 'rgba(91,110,245,0.18)',
  },
  {
    title: 'TradeKart — Mobile App',
    desc: 'B2B procurement app for wholesale traders with offline-first catalog and OTP checkout.',
    tags: ['React Native', 'Expo', 'Firebase'],
    type: 'react-native',
    thumbnail: '/tradekart.png',
    overlayFrom: 'rgba(167,139,250,0.18)',
  },
  {
    title: 'HealthDesk — Patient Portal',
    desc: 'Clinic management web app covering appointments, records, billing, and telemedicine.',
    tags: ['React', 'Node.js', 'Twilio'],
    type: 'web',
    thumbnail: '/healthdesk.png',
    overlayFrom: 'rgba(52,211,153,0.15)',
  },
  {
    title: 'Fieldmate — Field Service App',
    desc: 'Mobile app for on-site technicians — job assignments, geo-tracking, digital sign-off.',
    tags: ['React Native', 'Maps SDK', 'SQLite'],
    type: 'react-native',
    thumbnail: '/fieldmate.png',
    overlayFrom: 'rgba(251,146,60,0.15)',
  },
]

function TypeBadge({ type }: { type: Project['type'] }) {
  const isNative = type === 'react-native'
  return (
    <div className={`absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-body font-medium backdrop-blur-sm
      ${isNative
        ? 'bg-violet-500/15 border-violet-400/30 text-violet-300'
        : 'bg-signal/15 border-signal/30 text-signal'
      }`}
    >
      {isNative ? (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <rect x="2.5" y="0.5" width="5" height="9" rx="1" stroke="currentColor" strokeWidth="1"/>
          <circle cx="5" cy="7.5" r="0.6" fill="currentColor"/>
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <rect x="0.5" y="1.5" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="1"/>
          <path d="M3 3.5L1 5L3 6.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M7 3.5L9 5L7 6.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
        </svg>
      )}
      {isNative ? 'React Native' : 'Web App'}
    </div>
  )
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
      className="group relative bg-surface border border-border rounded-3xl overflow-hidden cursor-default"
    >
      {/* Thumbnail */}
      <div className="relative h-52 md:h-60 overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />

        {/* Theme-matched gradient overlay:
            accent tint at top → site background at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              ${project.overlayFrom} 0%,
              rgba(9,9,14,0.25) 40%,
              rgba(9,9,14,0.72) 75%,
              rgba(9,9,14,0.96) 100%)`,
          }}
        />

        <TypeBadge type={project.type} />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-bold text-[18px] text-chalk mb-2">{project.title}</h3>
        <p className="text-muted font-body text-[13px] leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-[11px] text-muted font-body">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  return (
    <section id="work" className="px-5 md:px-10 py-28">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
              Selected work
            </span>
            <h2 className="font-display font-extrabold text-[42px] md:text-[58px] tracking-tighter text-chalk leading-[0.95]">
              Products we've
              <br />
              shipped.
            </h2>
          </div>
          <p className="text-muted font-body text-[15px] max-w-xs leading-relaxed md:text-right">
            Across industries, form factors, and market segments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.08} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-muted hover:text-chalk transition-colors duration-200"
          >
            Have a project in mind? Let's talk
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
