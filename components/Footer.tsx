const links = {
  Company: ['About', 'Work', 'Process', 'Contact'],
  Services: ['Web Applications', 'Android Apps', 'UI/UX Design', 'Consultation'],
  Connect: ['hello@krishanora.it', 'LinkedIn', 'GitHub', 'Twitter / X'],
}

export default function Footer() {
  return (
    <footer className="px-5 md:px-10 py-16 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[1fr_repeat(3,_auto)] gap-10 md:gap-16 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <span className="font-display font-extrabold text-[20px] tracking-tight text-chalk">
              Krishanora<span className="text-signal">.</span>IT
            </span>
            <p className="text-muted font-body text-[13px] leading-relaxed max-w-[240px]">
              Web & mobile development studio crafting products that perform.
              Building products that perform.
            </p>
            <span className="inline-flex items-center gap-2 text-[12px] font-body text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
              Available for new projects
            </span>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading} className="flex flex-col gap-3">
              <span className="text-[11px] font-body font-medium tracking-widest uppercase text-muted mb-1">
                {heading}
              </span>
              {items.map(item => (
                <a
                  key={item}
                  href="#"
                  className="text-[13px] font-body text-muted hover:text-chalk transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px] font-body text-muted">
            © 2024 Krishanora IT. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Sitemap'].map(item => (
              <a key={item} href="#" className="text-[12px] font-body text-muted hover:text-chalk transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
