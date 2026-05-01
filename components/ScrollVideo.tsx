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

// Cover-fit an ImageBitmap onto the canvas
function drawBitmapCover(
  ctx: CanvasRenderingContext2D,
  bmp: ImageBitmap,
  cw: number,
  ch: number,
) {
  const scale = Math.max(cw / bmp.width, ch / bmp.height)
  const dx = (cw - bmp.width * scale) / 2
  const dy = (ch - bmp.height * scale) / 2
  ctx.drawImage(bmp, dx, dy, bmp.width * scale, bmp.height * scale)
}

// Cover-fit HTMLVideoElement (used for the first-frame seed before extraction)
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

// Extract `count` evenly-spaced frames from the video into ImageBitmap[]
async function extractFrames(video: HTMLVideoElement, count: number): Promise<ImageBitmap[]> {
  const duration = video.duration
  // Extract at half the native resolution to keep memory reasonable
  const capW = Math.min(video.videoWidth,  1280)
  const capH = Math.round(capW * video.videoHeight / video.videoWidth)

  // Use OffscreenCanvas when available (avoids main-thread layout)
  const useOffscreen = typeof OffscreenCanvas !== 'undefined'
  const buffer = useOffscreen
    ? new OffscreenCanvas(capW, capH)
    : Object.assign(document.createElement('canvas'), { width: capW, height: capH })
  const bCtx = buffer.getContext('2d') as CanvasRenderingContext2D

  const frames: ImageBitmap[] = []

  for (let i = 0; i < count; i++) {
    const t = duration * (i / Math.max(count - 1, 1))
    await new Promise<void>((resolve) => {
      const onSeeked = async () => {
        bCtx.drawImage(video, 0, 0, capW, capH)
        frames.push(await createImageBitmap(buffer as OffscreenCanvas))
        resolve()
      }
      video.addEventListener('seeked', onSeeked, { once: true })
      video.currentTime = t
    })
  }

  return frames
}

export default function ScrollVideo() {
  const wrapperRef   = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const progressRef  = useRef<HTMLDivElement>(null)
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null)
  const framesRef    = useRef<ImageBitmap[]>([])
  const activeIdxRef = useRef(0)

  const [activeIdx, setActiveIdx] = useState(0)
  const [loadPct, setLoadPct]     = useState(0)   // 0–100 extraction progress
  const [ready, setReady]         = useState(false)

  // ── Canvas context ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    ctxRef.current = canvas.getContext('2d')
  }, [])

  // ── Canvas size sync ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const sync = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // Redraw current frame at new size
      const frames = framesRef.current
      const ctx    = ctxRef.current
      if (ctx && frames.length > 0) {
        drawBitmapCover(ctx, frames[0], canvas.width, canvas.height)
      }
    }
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  // ── Frame extraction ──────────────────────────────────────────────────────
  // Pre-decodes every frame into GPU-ready ImageBitmaps. After this, scrolling
  // is a plain array lookup — zero async work, zero jank.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const run = async () => {
      // Wait for metadata (duration + dimensions)
      if (video.readyState < 1) {
        await new Promise<void>((res) =>
          video.addEventListener('loadedmetadata', () => res(), { once: true }),
        )
      }

      const TARGET_FRAMES = Math.min(90, Math.ceil(video.duration * 24))
      const frames: ImageBitmap[] = []

      for (let i = 0; i < TARGET_FRAMES; i++) {
        const t = video.duration * (i / Math.max(TARGET_FRAMES - 1, 1))
        await new Promise<void>((resolve) => {
          const onSeeked = async () => {
            const capW = Math.min(video.videoWidth,  1280)
            const capH = Math.round(capW * video.videoHeight / video.videoWidth)
            const useOffscreen = typeof OffscreenCanvas !== 'undefined'
            const buf = useOffscreen
              ? new OffscreenCanvas(capW, capH)
              : Object.assign(document.createElement('canvas'), { width: capW, height: capH })
            const bCtx = buf.getContext('2d') as CanvasRenderingContext2D
            bCtx.drawImage(video, 0, 0, capW, capH)
            frames.push(await createImageBitmap(buf as OffscreenCanvas))
            resolve()
          }
          video.addEventListener('seeked', onSeeked, { once: true })
          video.currentTime = t
        })

        // Update loading progress bar
        setLoadPct(Math.round(((i + 1) / TARGET_FRAMES) * 100))
      }

      framesRef.current = frames

      // Draw first frame before revealing
      const canvas = canvasRef.current
      const ctx    = ctxRef.current
      if (canvas && ctx && frames[0]) {
        drawBitmapCover(ctx, frames[0], canvas.width, canvas.height)
      }

      setReady(true)
    }

    run()
  }, [])

  // ── Scroll handler ─────────────────────────────────────────────────────────
  // Pure array lookup — no video seeking at all during scroll.
  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect      = wrapper.getBoundingClientRect()
      const scrollable = wrapper.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, -rect.top / scrollable))

      // Progress bar: direct DOM — zero React overhead
      if (progressRef.current) progressRef.current.style.width = `${p * 100}%`

      // Section change: React setState only at the 3 boundaries
      const idx = Math.min(SECTIONS.length - 1, Math.floor(p * SECTIONS.length))
      if (idx !== activeIdxRef.current) {
        activeIdxRef.current = idx
        setActiveIdx(idx)
      }

      // Frame draw: instant array lookup
      const frames = framesRef.current
      const canvas = canvasRef.current
      const ctx    = ctxRef.current
      if (frames.length > 0 && canvas && ctx) {
        const fi = Math.min(frames.length - 1, Math.round(p * (frames.length - 1)))
        drawBitmapCover(ctx, frames[fi], canvas.width, canvas.height)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={wrapperRef} style={{ height: '300vh' }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">

        {/* Hidden video — only used during extraction */}
        <video
          ref={videoRef}
          src="/exploding_view.mp4"
          muted
          playsInline
          preload="auto"
          className="sr-only"
        />

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: 'transform' }}
        />

        {/* ── Loading screen ── */}
        {!ready && (
          <div className="absolute inset-0 z-30 bg-ink flex flex-col items-center justify-center gap-5">
            <div className="w-40 h-px bg-[#ffffff10]">
              <div
                className="h-full bg-signal transition-all duration-150"
                style={{ width: `${loadPct}%` }}
              />
            </div>
            <span className="text-[11px] font-body tracking-widest uppercase text-muted">
              Loading frames {loadPct}%
            </span>
          </div>
        )}

        {/* ── Gradient overlays ── */}

        {/* Dark scrim */}
        <div className="absolute inset-0 pointer-events-none bg-[#09090E]/40" />

        {/* Top & bottom — thick solid wipe, no seams */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #09090E 0%, #09090E 6%, rgba(9,9,14,0.88) 20%, transparent 34%, transparent 66%, rgba(9,9,14,0.88) 80%, #09090E 94%, #09090E 100%)',
          }}
        />

        {/* Left & right */}
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
              {/* Frosted glass card */}
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

          {/* Progress bar — direct DOM ref */}
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
