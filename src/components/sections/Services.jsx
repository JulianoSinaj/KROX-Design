import { useCallback, useEffect, useRef, useState } from 'react'
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

const icons = { Calculator, ClipboardCheck, DraftingCompass, HardHat, Layers, PencilRuler }
const ease = [0.22, 1, 0.36, 1]

function ServiceCard({ s, i }) {
  const Icon = icons[s.icon]
  return (
    <TiltCard className="h-full">
      <article
        className="flex h-full flex-col border border-gold/20 bg-[#1A1D21] p-6 transition-colors duration-700 ease-silk group-hover:border-gold/60 sm:p-9"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex items-start justify-between" style={{ transform: 'translateZ(40px)' }}>
          <span className="flex h-14 w-14 items-center justify-center border border-gold/25 bg-steel text-accent transition-colors duration-700 ease-silk group-hover:border-gold group-hover:text-gold">
            <Icon size={26} strokeWidth={1.5} />
          </span>
          <span className="font-display text-sm text-mist">0{i + 1}</span>
        </div>

        <div style={{ transform: 'translateZ(30px)' }}>
          <h3 className="mt-8 font-display text-xl font-medium leading-tight text-bone sm:mt-10 sm:text-2xl">{s.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-mist">{s.text}</p>
        </div>

        <ul className="mt-6 space-y-2 border-t border-gold/15 pt-6" style={{ transform: 'translateZ(20px)' }}>
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
          style={{ transform: 'translateZ(20px)' }}
        >
          Kërko ofertë
          <ArrowUpRight
            size={16}
            className="text-gold transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </article>
    </TiltCard>
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

export default function Services() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // Gjen kartën më afër qendrës së shiritit (mobile)
  const onScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    Array.from(el.children).forEach((child, idx) => {
      const d = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center)
      if (d < bestDist) {
        bestDist = d
        best = idx
      }
    })
    setActive(best)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const goTo = (idx) => {
    const el = trackRef.current
    const child = el?.children[idx]
    if (!child) return
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }

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

        {/* Mobile: carousel horizontal me snap · md+: grid */}
        <div
          ref={trackRef}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-20 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-8"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 50, rotateX: -12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease, delay: (i % 3) * 0.1 }}
              style={{ transformPerspective: 1000 }}
              className="w-[85%] shrink-0 snap-center md:w-auto"
            >
              <ServiceCard s={s} i={i} />
            </motion.div>
          ))}
        </div>

        {/* Kontrollet e navigimit — vetëm mobile */}
        <div className="mt-8 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            {services.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Shko te shërbimi ${i + 1}`}
                onClick={() => goTo(i)}
                className="relative h-[2px] w-6 overflow-hidden bg-gold/20"
              >
                <motion.span
                  className="absolute inset-0 origin-left bg-gold"
                  initial={false}
                  animate={{ scaleX: active === i ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <NavArrow dir="prev" disabled={active === 0} onClick={() => goTo(active - 1)} />
            <NavArrow dir="next" disabled={active === services.length - 1} onClick={() => goTo(active + 1)} />
          </div>
        </div>
      </div>
    </section>
  )
}
