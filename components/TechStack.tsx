'use client'
import { motion } from 'framer-motion'

const categories = [
  {
    label: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'Fastify', 'GraphQL', 'REST APIs', 'WebSockets'],
  },
  {
    label: 'Database',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma ORM', 'Supabase'],
  },
  {
    label: 'Android',
    items: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Room DB', 'Hilt DI', 'Coroutines'],
  },
  {
    label: 'Infrastructure',
    items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Cloudflare', 'Firebase'],
  },
  {
    label: 'Payments & Comms',
    items: ['Stripe', 'Razorpay', 'Twilio SMS', 'SendGrid', 'PhonePe', 'FCM Push'],
  },
]

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-surface-2 border border-border text-[13px] text-muted font-body
                     hover:border-signal/40 hover:text-chalk transition-all duration-200 cursor-default whitespace-nowrap">
      {label}
    </span>
  )
}

export default function TechStack() {
  return (
    <section className="px-5 md:px-10 py-28 border-t border-border">
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
              Our toolkit
            </span>
            <h2 className="font-display font-extrabold text-[42px] md:text-[58px] tracking-tighter text-chalk leading-[0.95]">
              Modern stack,
              <br />
              proven choices.
            </h2>
          </div>
          <p className="text-muted font-body text-[15px] max-w-xs leading-relaxed">
            We choose tools that are battle-tested in production, not just trendy on Twitter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.07, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="bg-surface border border-border rounded-2xl p-6"
            >
              <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-4 block">
                {cat.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.items.map(item => <Pill key={item} label={item} />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
