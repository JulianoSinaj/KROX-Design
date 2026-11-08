import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  ClipboardCheck,
  DraftingCompass,
  HardHat,
  Layers,
  PencilRuler,
} from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import TiltCard from '../ui/TiltCard'
import { services } from '../../data/services'
import { scrollToTarget } from '../../hooks/useLenis'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const icons = { Calculator, ClipboardCheck, DraftingCompass, HardHat, Layers, PencilRuler }
const ease = [0.22, 1, 0.36, 1]

/**
 * Pamja e kartës — e njëjtë në desktop dhe mobile.
 * `depth` → shtresat translateZ për efektin 3D të TiltCard (vetëm desktop).
 * Në mobile karta është e sheshtë: pa preserve-3d brenda shiritit me scroll (iOS e deformon).
 * `group-data-[active=true]` → karta në qendër të karuselit merr gjendjen e hover-it.
 */
function ServiceCard({ s, i, depth = false }) {
  const Icon = icons[s.icon]
  const z = (px) => (depth ? { transform: `translateZ(${px}px)` } : undefined)

  return (
    <article
      className="flex h-full w-full flex-col border border-gold/20 bg-[#1A1D21] p-6 transition-colors duration-700 ease-silk group-hover:border-gold/60 group-data-[active=true]:border-gold/60 sm:p-9"
      style={depth ? { transformStyle: 'preserve-3d' } : undefined}
    >
      <div className="flex items-start justify-between" style={z(40)}>
        <span className="flex h-14 w-14 items-center justify-center border border-gold/25 bg-steel text-accent transition-colors duration-700 ease-silk group-hover:border-gold group-hover:text-gold group-data-[active=true]:border-gold group-data-[active=true]:text-gold">
          <Icon size={26} strokeWidth={1.5} />
        </span>
        <span className="font-display text-sm text-mist">0{i + 1}</span>
      </div>

      <div style={z(30)}>
        <h3 className="mt-8 font-display text-xl font-medium leading-tight text-bone sm:mt-10 sm:text-2xl">{s.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-mist">{s.text}</p>
      </div>

      <ul className="mt-6 space-y-2 border-t border-gold/15 pt-6" style={z(20)}>
        {s.points.map((pt) => (
          <li key={pt} className="flex items-center gap-3 text-sm text-bone/80">
            <span className="h-1 w-1 bg-gold" />
            {pt}
          </li>
        ))}
      </ul>

      <a
        href="#kontakt"
        onClick={(e) => {
          e.preventDefault()
          scrollToTarget('#kontakt')
        }}
        className="mt-auto flex items-center gap-2 pt-8 text-xs font-medium uppercase tracking-[0.2em] text-bone"
        style={z(20)}
      >
        Kërko ofertë
        <ArrowUpRight
          size={16}
          className="text-gold transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </article>
  )
}

function NavArrow({ dir, disabled, onClick }) {
  const Icon = dir === 'prev' ? ArrowLeft : ArrowRight
  return (
    <motion.button
      type="button"
      aria-label={dir === 'prev' ? 'Shërbimi i mëparshëm' : 'Shërbimi tjetër'}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.92 }}
      className="flex h-11 w-11 items-center justify-center border border-gold/40 bg-[#1A1D21] text-gold transition-opacity duration-500 disabled:opacity-30"
    >
      <Icon size={18} strokeWidth={1.5} />
    </motion.button>
  )
}

/* Desktop / tablet (md+): rrjeti origjinal me TiltCard dhe hyrje 3D — i pandryshuar */
function ServicesGrid() {
  return (
    <div className="mt-20 grid grid-cols-2 gap-6 lg:grid-cols-3 lg:gap-8">
      {services.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 50, rotateX: -12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease, delay: (i % 3) * 0.1 }}
          style={{ transformPerspective: 1000 }}
        >
          <TiltCard className="h-full">
            <ServiceCard s={s} i={i} depth />
          </TiltCard>
        </motion.div>
      ))}
    </div>
  )
}

/*
 * Mobile: karusel horizontal me snap + shigjeta — si te Portofoli.
 * Kartat nuk kanë animacion individual (asnjë lëvizje lart-poshtë gjatë swipe);
 * vetëm i gjithë blloku hyn një herë kur shfaqet në ekran.
 */
function ServicesCarousel() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // Karta më afër qendrës = aktive
  const onScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let min = Infinity
    Array.from(el.children).forEach((child, i) => {
      const d = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center)
      if (d < min) {
        min = d
        best = i
      }
    })
    setActive(best)
  }, [])

  const goTo = (i) => {
    const el = trackRef.current
    const child = el?.children[i]
    if (!child) return
    el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2, behavior: 'smooth' })
  }

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 20, mass: 0.8 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] tabular-nums text-mist">
          <span className="text-gold">{String(active + 1).padStart(2, '0')}</span>
          <span className="mx-2 text-gold/30">/</span>
          {String(services.length).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          <NavArrow dir="prev" disabled={active === 0} onClick={() => goTo(active - 1)} />
          <NavArrow dir="next" disabled={active >= services.length - 1} onClick={() => goTo(active + 1)} />
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[10vw] pb-2 [scrollbar-width:none] sm:-mx-8 [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {services.map((s, i) => (
          <li key={s.id} data-active={i === active} className="group flex w-[80vw] shrink-0 snap-center">
            <ServiceCard s={s} i={i} />
          </li>
        ))}
      </ul>

      {/* Progres i hollë ari */}
      <div className="mt-6 h-px w-full bg-gold/15">
        <motion.div
          className="h-px origin-left bg-gold"
          initial={false}
          animate={{ scaleX: (active + 1) / services.length }}
          transition={{ type: 'spring', stiffness: 160, damping: 26 }}
          style={{ willChange: 'transform' }}
        />
      </div>
    </motion.div>
  )
}

export default function Services() {
  const isGrid = useMediaQuery('(min-width: 768px)')

  return (
    <section id="sherbimet" className="section-pad relative overflow-hidden border-y border-accent/10">
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="container-site relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle index="02" label="Shërbimet" title="Një partner për gjithë ciklin e veprës." className="max-w-2xl" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="max-w-sm text-mist"
          >
            Nga studimet gjeologjike dhe projektimi, te zbatimi, mbikëqyrja dhe kolaudimi i punimeve,
            me një ekip të vetëm dhe përgjegjës.
          </motion.p>
        </div>

        {isGrid ? <ServicesGrid /> : <ServicesCarousel />}
      </div>
    </section>
  )
}
