import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import ProjectCard from './ProjectCard'

// Spring i vetëm për çdo lëvizje të shiritit (shigjeta, tastierë, trackpad, reset)
const glide = { type: 'spring', stiffness: 110, damping: 24, mass: 0.7 }
const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/**
 * Carousel horizontal:
 * - tërheqje me mi / gisht (drag) me inerci dhe "snap" te karta më e afërt
 * - shigjeta majtas/djathtas, tastet ← →, scroll horizontal me trackpad
 * - kartat anohen lehtë në 3D sipas shpejtësisë së tërheqjes
 */
export default function ProjectCarousel({ items, resetKey, onOpen }) {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const maxRef = useRef(0) // sa mund të lëvizë shiriti majtas (px)
  const stepRef = useRef(1) // gjerësia e një karte + hapësira
  const targetRef = useRef(0)
  const draggedRef = useRef(false)

  const [max, setMax] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: true })
  const [current, setCurrent] = useState(0)

  const glideTo = useCallback(
    (value) => {
      targetRef.current = clamp(value, -maxRef.current, 0)
      animate(x, targetRef.current, glide)
    },
    [x],
  )

  const syncState = useCallback((v) => {
    const start = v > -2
    const end = v < -maxRef.current + 2
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
    const idx = Math.round(-v / stepRef.current)
    setCurrent((prev) => (prev === idx ? prev : idx))
  }, [])

  // Matja e shiritit (rimatet kur ndryshon madhësia e ekranit ose filtri)
  useLayoutEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current
      const track = trackRef.current
      if (!viewport || !track) return
      const card = track.querySelector('[data-card]')
      const gap = parseFloat(getComputedStyle(track.firstElementChild ?? track).columnGap) || 0
      stepRef.current = card ? card.offsetWidth + gap : viewport.offsetWidth
      maxRef.current = Math.max(0, track.scrollWidth - viewport.offsetWidth)
      setMax(maxRef.current)
      if (x.get() < -maxRef.current) glideTo(-maxRef.current)
      syncState(x.get())
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(viewportRef.current)
    ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [glideTo, syncState, x])

  // Kthehu në fillim kur ndryshon filtri
  useEffect(() => {
    glideTo(0)
  }, [resetKey, glideTo])

  useMotionValueEvent(x, 'change', syncState)

  // Progresi (0 → 1) me spring
  const progress = useTransform(x, (v) => (maxRef.current ? clamp(-v / maxRef.current, 0, 1) : 0))
  const progressSmooth = useSpring(progress, { stiffness: 160, damping: 30 })
  const barScale = useTransform(progressSmooth, (p) => 0.12 + p * 0.88)

  // Anim 3D sipas shpejtësisë së tërheqjes
  const velocity = useVelocity(x)
  const tilt = useSpring(useTransform(velocity, [-2500, 0, 2500], [7, 0, -7], { clamp: true }), {
    stiffness: 180,
    damping: 28,
  })

  const step = (dir) => {
    const s = stepRef.current
    const pos = -x.get() / s
    const nextIndex = dir > 0 ? Math.floor(pos + 0.01) + 1 : Math.ceil(pos - 0.01) - 1
    glideTo(-nextIndex * s)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    }
  }

  // Scroll horizontal me trackpad (vetëm kur lëvizja është kryesisht horizontale).
  // Listener jo-pasiv që të bllokojë gjestin "back" të shfletuesit.
  useEffect(() => {
    const el = viewportRef.current
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || maxRef.current === 0) return
      e.preventDefault()
      if (!x.isAnimating()) targetRef.current = x.get()
      glideTo(targetRef.current - e.deltaX * 1.4)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [glideTo, x])

  // Kur një kartë merr fokus me Tab, sillet brenda pamjes
  const ensureVisible = (el) => {
    const viewportW = viewportRef.current.offsetWidth
    const left = el.offsetLeft
    const right = left + el.offsetWidth
    const offset = -x.get()
    if (left < offset) glideTo(-left)
    else if (right > offset + viewportW) glideTo(-(right - viewportW))
  }

  // Kursori "Tërhiq" që ndjek miun
  const cx = useMotionValue(0)
  const cy = useMotionValue(0)
  const cursorX = useSpring(cx, { stiffness: 300, damping: 30, mass: 0.5 })
  const cursorY = useSpring(cy, { stiffness: 300, damping: 30, mass: 0.5 })
  const [cursorOn, setCursorOn] = useState(false)
  const [grabbing, setGrabbing] = useState(false)

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = viewportRef.current.getBoundingClientRect()
    cx.set(e.clientX - r.left)
    cy.set(e.clientY - r.top)
    if (!cursorOn) setCursorOn(true)
  }

  const total = items.length
  const shown = edges.end ? total : Math.min(current + 1, total)
  const scrollable = max > 0

  return (
    <div>
      {/* Zona e shiritit — del jashtë kontejnerit në të djathtë (full-bleed) */}
      <div
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projektet — përdorni shigjetat ← → ose tërhiqni"
        onKeyDown={onKeyDown}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setCursorOn(false)}
        className={`relative rounded-sm focus-visible:ring-offset-8 ${
          scrollable ? (grabbing ? 'cursor-grabbing' : 'cursor-grab') + ' md:cursor-none' : ''
        }`}
        style={{ perspective: 1400 }}
      >
        <motion.div
          ref={trackRef}
          drag={scrollable ? 'x' : false}
          style={{ x }}
          dragConstraints={{ left: -max, right: 0 }}
          dragElastic={0.08}
          dragTransition={{
            power: 0.3,
            timeConstant: 320,
            bounceStiffness: 220,
            bounceDamping: 32,
            // Ndalon te karta më e afërt pas inercisë
            modifyTarget: (v) => clamp(Math.round(v / stepRef.current) * stepRef.current, -maxRef.current, 0),
          }}
          onPointerDownCapture={() => (draggedRef.current = false)}
          onDragStart={() => {
            draggedRef.current = true
            setGrabbing(true)
          }}
          onDragEnd={() => setGrabbing(false)}
          className="relative w-max touch-pan-y will-change-transform"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={resetKey}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}
              className="flex gap-6 lg:gap-8"
            >
              {items.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  tilt={tilt}
                  onFocus={(e) => ensureVisible(e.currentTarget.parentElement)}
                  onOpen={() => {
                    // Mos e hap kartën nëse përdoruesi sapo e tërhoqi shiritin
                    if (!draggedRef.current) onOpen(p)
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Kursori "Tërhiq" */}
        {scrollable && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
            style={{ x: cursorX, y: cursorY }}
          >
            <motion.div
              animate={{ scale: cursorOn ? (grabbing ? 0.8 : 1) : 0, opacity: cursorOn ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="-ml-11 -mt-11 flex h-[88px] w-[88px] items-center justify-center gap-1.5 rounded-full border border-gold/60 bg-ink/60 text-[10px] font-medium uppercase tracking-[0.2em] text-gold backdrop-blur-md"
            >
              <ArrowLeft size={11} />
              Tërhiq
              <ArrowRight size={11} />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Kontrollet: numëruesi, progresi, shigjetat */}
      <div className="mt-14 flex items-center gap-8">
        <p className="font-display text-sm tabular-nums text-mist">
          <span className="text-bone">{String(shown).padStart(2, '0')}</span>
          <span className="mx-2 text-accent/50">/</span>
          {String(total).padStart(2, '0')}
        </p>

        <div className="relative h-px flex-1 overflow-hidden bg-accent/20">
          <motion.div
            className="absolute inset-0 origin-left bg-gradient-to-r from-gold to-accent-light"
            style={{ scaleX: barScale }}
          />
        </div>

        <div className="flex gap-3">
          <MagneticButton
            variant="outline"
            onClick={() => step(-1)}
            disabled={!scrollable || edges.start}
            aria-label="Projekti i mëparshëm"
            className="!h-14 !w-14 !px-0 disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft size={18} />
          </MagneticButton>
          <MagneticButton
            variant="outline"
            onClick={() => step(1)}
            disabled={!scrollable || edges.end}
            aria-label="Projekti tjetër"
            className="!h-14 !w-14 !px-0 disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight size={18} />
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}
