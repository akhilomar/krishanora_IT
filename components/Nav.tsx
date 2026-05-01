'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const links = ['Services', 'Work', 'Process', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-5 md:px-10 pt-5"
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled ? 'bg-[#111118]/85 backdrop-blur-2xl border border-[#252534]' : ''
        }`}
      >
        {/* Logo */}
        <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight text-chalk">
          Krishanora<span className="text-signal">.</span>IT
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] font-body font-medium text-muted hover:text-chalk transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-signal text-white text-[13px] font-body font-medium
                     hover:bg-[#6b7df7] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(91,110,245,0.35)] hover:-translate-y-px"
        >
          Start a project
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
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
          className="md:hidden mt-2 mx-auto max-w-7xl bg-[#111118]/95 backdrop-blur-2xl border border-[#252534] rounded-2xl p-5 flex flex-col gap-4"
        >
          {links.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-body font-medium text-muted hover:text-chalk py-1"
            >
              {item}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center px-5 py-3 rounded-xl bg-signal text-white text-sm font-body font-medium"
          >
            Start a project
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
