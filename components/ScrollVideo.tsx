'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  {
    tag: 'Web Development',
    heading: ['Full-stack apps', 'built to convert.'],
    body: 'We architect web products on modern infrastructure — React frontends, scalable APIs, and databases that grow with your business. Fast, beautiful, and production-ready from day one.',
  },
  {
    tag: 'React Native Development',
    heading: ['Cross-platform apps', 'users keep coming back to.'],
    body: 'React Native with Expo — one codebase, iOS and Android. Native feel, shared logic, and fast iteration from first screen to app store submission.',
  },
  {
    tag: 'Scale & Infrastructure',
    heading: ['Built to handle', 'any level of scale.'],
    body: 'CI/CD pipelines, edge caching, autoscaling infrastructure. We engineer systems that handle growth without friction — so you stay focused on the product, not the platform.',
  },
]

// Extraction config — fewer frames + lower res = much faster startup
const FRAME_COUNT = 50
const EXTRACT_WIDTH = 640        // extract at half-HD; CSS scales it up

function drawBitmapCover(
  ctx: CanvasRenderingContext2D,
  bmp: ImageBitmap,
  cw: number,
  ch: number,
) {
  const scale = Math.max(cw / bmp.width, ch / bmp.height)
  const dx = (cw - bmp.width  * scale) / 2
  const dy = (ch - bmp.height * scale) / 2
  ctx.drawImage(bmp, dx, dy, bmp.width * scale, bmp.height * scale)
}

function drawVideoCover(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  cw: number,
  ch: number,
) {
  const vw = video.videoWidth
  const vh = video.videoHeight
  if (!vw || !vh) return
  const scale = Math.max(cw / vw, ch / vh)
  ctx.drawImage(video, (cw - vw * scale) / 2, (ch - vh * scale) / 2, vw * scale, vh * scale)
}

export default function ScrollVideo() {
  const wrapperRef   = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)   // extraction source
  const liveRef      = useRef<HTMLVideoElement>(null)   // live preview while extracting
  const progressRef  = useRef<HTMLDivElement>(null)
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null)
  const framesRef    = useRef<ImageBitmap[]>([])
  const activeIdxRef = useRef(0)
  const rafRef       = useRef(0)                        // live preview rAF id

  // 'live'    → video plays visibly, extraction running in background
  // 'ready'   → all frames loaded, canvas scrubbing active
  const [mode, setMode]         = useState<'live' | 'ready'>('live')
  const [activeIdx, setActiveIdx] = useState(0)

  // ── Canvas context ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    ctxRef.current = canvas.getContext('2d')
  }, [])

  // ── Canvas size sync ─────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const sync = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const frames = framesRef.current
      const ctx    = ctxRef.current
      if (ctx && frames.length > 0) drawBitmapCover(ctx, frames[0], canvas.width, canvas.height)
    }
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  // ── Live preview loop ────────────────────────────────────────────────────
  // Mirrors the live video onto the canvas every frame while extraction runs.
  // This gives immediate visual — the user sees animation the instant the
  // section is in view, with zero wait.
  useEffect(() => {
    const live   = liveRef.current
    const canvas = canvasRef.current
    const ctx    = ctxRef.current
    if (!live || !canvas || !ctx) return

    const tick = () => {
      if (mode === 'live') {
        drawVideoCover(ctx, live, canvas.width, canvas.height)
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    if (mode === 'live') {
      live.play().catch(() => {})
      rafRef.current = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      live.pause()
    }
  }, [mode])

  // ── Background frame extraction ──────────────────────────────────────────
  // Runs silently while the live video plays. Uses a separate hidden <video>
  // element so seeking doesn't interrupt the visible preview.
  // Reduced to 50 frames at 640px → typically completes in 5–10 seconds.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const run = async () => {
      if (video.readyState < 1) {
        await new Promise<void>((res) =>
          video.addEventListener('loadedmetadata', () => res(), { once: true }),
        )
      }

      const capW = Math.min(video.videoWidth, EXTRACT_WIDTH)
      const capH = Math.round(capW * video.videoHeight / video.videoWidth)
      const useOffscreen = typeof OffscreenCanvas !== 'undefined'
      const buf = useOffscreen
        ? new OffscreenCanvas(capW, capH)
        : Object.assign(document.createElement('canvas'), { width: capW, height: capH })
      const bCtx = buf.getContext('2d') as CanvasRenderingContext2D

      const frames: ImageBitmap[] = []

      for (let i = 0; i < FRAME_COUNT; i++) {
        const t = video.duration * (i / Math.max(FRAME_COUNT - 1, 1))
        await new Promise<void>((resolve) => {
          video.addEventListener('seeked', async () => {
            bCtx.drawImage(video, 0, 0, capW, capH)
            frames.push(await createImageBitmap(buf as OffscreenCanvas))
            resolve()
          }, { once: true })
          video.currentTime = t
        })
      }

      framesRef.current = frames

      // Stop live loop, switch canvas to scrubbing mode
      cancelAnimationFrame(rafRef.current)
      const live = liveRef.current
      if (live) live.pause()
      setMode('ready')
    }

    run()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Scroll handler ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect  = wrapper.getBoundingClientRect()
      const viewH = window.innerHeight
      const wrapH = wrapper.offsetHeight

      // ── pVideo: full visible range ───────────────────────────────────────
      // Starts the moment the section enters the viewport from below.
      // Drives the video/canvas so animation begins immediately — no dead wait.
      const pVideo = Math.min(1, Math.max(0, (viewH - rect.top) / wrapH))

      // ── pSection: sticky period only ────────────────────────────────────
      // Only starts counting once the panel has fully stuck at the top.
      // This prevents section 0 from transitioning during the approach scroll.
      const stickyRange = wrapH - viewH           // 150vh at 250vh height
      const pSection = Math.min(1, Math.max(0, -rect.top / stickyRange))

      // Progress bar tracks pSection (shows sticky-period progress)
      if (progressRef.current) progressRef.current.style.width = `${pSection * 100}%`

      // Section text only changes during sticky — never during approach
      const idx = Math.min(SECTIONS.length - 1, Math.floor(pSection * SECTIONS.length))
      if (idx !== activeIdxRef.current) {
        activeIdxRef.current = idx
        setActiveIdx(idx)
      }

      // Live video: use pVideo so it plays from the first moment section is visible
      const live = liveRef.current
      if (mode === 'live' && live && Number.isFinite(live.duration)) {
        live.currentTime = pVideo * live.duration
      }

      // Frames: also use pVideo for consistent visual with live mode
      if (mode === 'ready') {
        const frames = framesRef.current
        const canvas = canvasRef.current
        const ctx    = ctxRef.current
        if (frames.length > 0 && canvas && ctx) {
          const fi = Math.min(frames.length - 1, Math.round(pVideo * (frames.length - 1)))
          drawBitmapCover(ctx, frames[fi], canvas.width, canvas.height)
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [mode])

  return (
    <div ref={wrapperRef} style={{ height: '250vh' }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">

        {/* Extraction video — hidden, used only for frame seeking */}
        <video
          ref={videoRef}
          src="/exploding_view.mp4"
          muted
          playsInline
          preload="auto"
          className="sr-only"
        />

        {/* Live preview video — visible via canvas mirror while extracting */}
        <video
          ref={liveRef}
          src="/exploding_view.mp4"
          muted
          playsInline
          loop
          preload="auto"
          className="sr-only"
        />

        {/* Canvas — shows live mirror in 'live' mode, bitmap frames in 'ready' mode */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: 'transform' }}
        />

        {/* ── Gradient overlays ── */}
        <div className="absolute inset-0 pointer-events-none bg-[#09090E]/40" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #09090E 0%, #09090E 6%, rgba(9,9,14,0.88) 20%, transparent 34%, transparent 66%, rgba(9,9,14,0.88) 80%, #09090E 94%, #09090E 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, #09090E 0%, transparent 22%, transparent 78%, #09090E 100%)',
          }}
        />

        {/* ── Text + frosted glass card ── */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto w-full">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -24, filter: 'blur(5px)' }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-lg"
            >
              <div className="rounded-2xl px-8 py-8 backdrop-blur-xl bg-[#09090E]/65 border border-[#ffffff0d] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                <span className="inline-flex items-center gap-2 text-[11px] font-body font-medium tracking-widest uppercase text-signal border border-signal/30 bg-signal/10 px-4 py-1.5 rounded-full mb-7 block w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                  {SECTIONS[activeIdx].tag}
                </span>

                <h2 className="font-display font-extrabold tracking-tighter text-chalk leading-[0.92] mb-5 text-[36px] sm:text-[46px] md:text-[56px]">
                  {SECTIONS[activeIdx].heading[0]}
                  <br />
                  <span className="text-chalk/65">{SECTIONS[activeIdx].heading[1]}</span>
                </h2>

                <p className="text-[#c0bbb4] font-body font-light text-[15px] md:text-[17px] leading-relaxed">
                  {SECTIONS[activeIdx].body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Section dots */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            {SECTIONS.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: i === activeIdx ? 28 : 6,
                  backgroundColor: i === activeIdx ? '#5B6EF5' : 'rgba(255,255,255,0.15)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="w-1.5 rounded-full"
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-px bg-[#ffffff10]">
            <div ref={progressRef} className="h-full bg-signal" style={{ width: '0%' }} />
          </div>

          {/* Counter */}
          <div className="absolute bottom-10 right-6 md:right-12 flex items-baseline gap-1">
            <span className="font-display font-bold text-[15px] text-chalk">
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            <span className="text-muted font-body text-[12px]">
              / {String(SECTIONS.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
