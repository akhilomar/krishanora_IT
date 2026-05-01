'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const projectTypes = ['Web Application', 'React Native App', 'Both', 'Consultation']
const budgets = ['Under ₹1L', '₹1L – ₹3L', '₹3L – ₹7L', '₹7L+']

export default function Contact() {
  const [type, setType]       = useState('')
  const [budget, setBudget]   = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    fd.get('name'),
          email:   fd.get('email'),
          type:    type || 'Not specified',
          budget:  budget || 'Not specified',
          message: fd.get('message'),
        }),
      })
      if (!res.ok) throw new Error('send_failed')
      setSent(true)
    } catch {
      setError('Something went wrong — please email us directly at query@krishanora.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="px-5 md:px-10 py-28">
      <div className="max-w-7xl mx-auto">

        <div className="relative bg-surface border border-border rounded-[32px] overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-signal/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-600/6 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 p-8 md:p-14">

            {/* Left */}
            <div className="flex flex-col gap-7">
              <div>
                <span className="text-[11px] font-body font-medium tracking-widest uppercase text-signal mb-5 block">
                  Get in touch
                </span>
                <h2 className="font-display font-extrabold text-[42px] md:text-[58px] tracking-tighter text-chalk leading-[0.95]">
                  Let's build
                  <br />
                  something
                  <br />
                  worth using.
                </h2>
              </div>

              <p className="text-muted font-body text-[15px] leading-relaxed max-w-sm">
                Tell us what you're building. We'll respond within 24 hours with honest
                thoughts — not a generic sales pitch.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                {[
                  { icon: '✉', label: 'query@krishanora.com' },
                  { icon: '🕐', label: 'Mon–Sat, 9 AM – 7 PM IST' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-[14px] font-body text-muted">
                    <span>{icon}</span>
                    <span>{label}</span>
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
                  className="h-full flex flex-col items-center justify-center gap-4 text-center py-16"
                >
                  <div className="w-14 h-14 rounded-full bg-signal/15 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="#5B6EF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-chalk">Message received.</h3>
                  <p className="text-muted font-body text-sm max-w-xs">
                    We'll review your project and get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="col-span-2 sm:col-span-1 bg-surface-2 border border-border rounded-xl px-4 py-3 text-[14px] font-body text-chalk placeholder:text-muted
                                 focus:outline-none focus:border-signal/60 transition-colors duration-200"
                    />
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="Email address"
                      className="col-span-2 sm:col-span-1 bg-surface-2 border border-border rounded-xl px-4 py-3 text-[14px] font-body text-chalk placeholder:text-muted
                                 focus:outline-none focus:border-signal/60 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <p className="text-[11px] font-body text-muted mb-2 tracking-wide uppercase">Project type</p>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setType(t)}
                          className={`px-3.5 py-1.5 rounded-xl text-[12px] font-body border transition-all duration-200 ${
                            type === t
                              ? 'bg-signal/15 border-signal/50 text-chalk'
                              : 'bg-surface-2 border-border text-muted hover:border-signal/30'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-body text-muted mb-2 tracking-wide uppercase">Budget range</p>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`px-3.5 py-1.5 rounded-xl text-[12px] font-body border transition-all duration-200 ${
                            budget === b
                              ? 'bg-signal/15 border-signal/50 text-chalk'
                              : 'bg-surface-2 border-border text-muted hover:border-signal/30'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project — what you're building, for whom, and your timeline."
                    className="bg-surface-2 border border-border rounded-xl px-4 py-3 text-[14px] font-body text-chalk placeholder:text-muted resize-none
                               focus:outline-none focus:border-signal/60 transition-colors duration-200"
                  />

                  {error && (
                    <p className="text-[12px] font-body text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-signal text-white rounded-xl font-body font-medium text-[14px]
                               hover:bg-[#6b7df7] hover:shadow-[0_8px_30px_rgba(91,110,245,0.35)] hover:-translate-y-0.5
                               transition-all duration-200 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending…' : 'Send message →'}
                  </button>

                  <p className="text-center text-[11px] text-muted font-body">
                    No commitment. We respond within 24 hours.
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
