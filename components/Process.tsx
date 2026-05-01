'use client'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    body: 'We spend time understanding your product, users, and constraints. No generic forms — a real conversation that shapes everything that follows.',
    duration: '1–2 days',
  },
  {
    num: '02',
    title: 'Scoping & Proposal',
    body: "Clear scope, realistic timeline, fixed price. You'll get a detailed breakdown before a single line of code is written.",
    duration: '2–3 days',
  },
  {
    num: '03',
    title: 'Design & Architecture',
    body: 'UI/UX design in Figma, database schema, API contracts. We align on every interface before building so revisions happen on canvas, not in prod.',
    duration: '1–2 weeks',
  },
  {
    num: '04',
    title: 'Sprint Development',
    body: 'Two-week sprints with weekly demos. You see live progress — no black-box delivery. Feedback is applied continuously, not batched at the end.',
    duration: '2–8 weeks',
  },
  {
    num: '05',
    title: 'QA & Hardening',
    body: 'Cross-device testing, performance profiling, security review. We ship things that hold up — not just things that look good in a demo.',
    duration: '1 week',
  },
  {
    num: '06',
    title: 'Launch & Handoff',
    body: 'Deployment, documentation, team training. You own everything — source code, infrastructure, CI/CD pipelines. Post-launch support included.',
    duration: 'Ongoing',
  },
]

export default function Process() {
  return (
    <section id="process" className="px-5 md:px-10 py-28">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 max-w-xl"
        >
          <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
            How we work
          </span>
          <h2 className="font-display font-extrabold text-[42px] md:text-[58px] tracking-tighter text-chalk leading-[0.95]">
            No surprises.
            <br />
            Just delivery.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
              className="group relative bg-surface border border-border rounded-3xl p-7 overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-signal/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-6">
                <span className="font-display font-extrabold text-[42px] leading-none text-[#252534] group-hover:text-signal/40 transition-colors duration-300">
                  {step.num}
                </span>
                <span className="text-[11px] font-body text-muted border border-border rounded-lg px-2.5 py-1">
                  {step.duration}
                </span>
              </div>

              <h3 className="font-display font-bold text-[18px] text-chalk mb-3">{step.title}</h3>
              <p className="text-muted font-body text-[13px] leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
