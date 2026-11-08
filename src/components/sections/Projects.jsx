import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import MagneticButton from '../ui/MagneticButton'
import ProjectCarousel from '../projects/ProjectCarousel'
import ProjectCard from '../projects/ProjectCard'
import ProjectModal from '../projects/ProjectModal'
import { categories, projects } from '../../data/projects'
import { scrollToTarget } from '../../hooks/useLenis'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const ease = [0.22, 1, 0.36, 1]

/* Shigjetë navigimi — e njëjtë me atë të seksionit Shërbimet */
function NavArrow({ dir, disabled, onClick }) {
  const Icon = dir === 'prev' ? ArrowLeft : ArrowRight
  return (
    <motion.button
      type="button"
      aria-label={dir === 'prev' ? 'Projekti i mëparshëm' : 'Projekti tjetër'}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.92 }}
      className="flex h-11 w-11 items-center justify-center border border-gold/40 bg-[#1A1D21] text-gold transition-opacity duration-500 disabled:opacity-30"
    >
      <Icon size={18} strokeWidth={1.5} />
    </motion.button>
  )
}

/* Mobile: shirit horizontal me snap + shigjeta. Rimontohet (key) me çdo filtër → kthehet në fillim. */
function MobileCarousel({ items, onOpen }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // Karta më afër qendrës = aktive (merr ngjyrë, si hover-i në desktop)
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
    <div className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] tabular-nums text-mist">
          <span className="text-gold">{String(active + 1).padStart(2, '0')}</span>
          <span className="mx-2 text-gold/30">/</span>
          {String(items.length).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          <NavArrow dir="prev" disabled={active === 0} onClick={() => goTo(active - 1)} />
          <NavArrow dir="next" disabled={active >= items.length - 1} onClick={() => goTo(active + 1)} />
        </div>
      </div>

      <motion.ul
        ref={trackRef}
        onScroll={onScroll}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="-mx-5 sm:-mx-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[10vw] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ perspective: 1200, WebkitOverflowScrolling: 'touch' }}
      >
        {items.map((p, i) => (
          <li key={p.id} className="snap-center">
            <ProjectCard project={p} index={i} highlight={i === active} onOpen={() => onOpen(p)} />
          </li>
        ))}
      </motion.ul>

      {/* Progres i hollë ari */}
      <div className="mt-6 h-px w-full bg-gold/15">
        <motion.div
          className="h-px origin-left bg-gold"
          animate={{ scaleX: items.length ? (active + 1) / items.length : 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 26 }}
          style={{ willChange: 'transform' }}
        />
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const closeModal = useCallback(() => setActive(null), [])
  // Tablet + desktop: carousel horizontal. Mobile: rrjet vertikal.
  const isCarousel = useMediaQuery('(min-width: 768px)')

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )
  const selectFilter = (id) => setFilter(id)

  return (
    <>
      {/* overflow-hidden: shiriti del jashtë kontejnerit deri në skajin e ekranit, pa scroll horizontal të faqes */}
      <section id="projektet" className="section-pad relative overflow-hidden">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:gap-12 lg:flex-row lg:items-end">
            <SectionTitle index="03" label="Portofoli" title="Projekte që flasin vetë." />

            {/* Mobile: dropdown */}
            <MobileFilter value={filter} onChange={selectFilter} />

            {/* Tablet + desktop: butonat tradicionalë */}
            <LayoutGroup id="filters">
              <div
                role="tablist"
                aria-label="Filtro projektet"
                className="hidden md:flex md:flex-wrap md:gap-3"
              >
                {categories.map((c) => {
                  const isActive = filter === c.id
                  const count =
                    c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length
                  return (
                    <motion.button
                      key={c.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => selectFilter(c.id)}
                      whileTap={{ scale: 0.96 }}
                      className={`relative h-11 min-w-0 rounded-full border px-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-500 ease-silk sm:px-6 sm:text-[12px] sm:tracking-[0.16em] ${
                        isActive
                          ? 'border-gold text-ink'
                          : 'border-accent/20 text-mist hover:border-accent/50 hover:text-accent-light'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="filter-pill"
                          className="absolute inset-0 rounded-full bg-gold"
                          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                        />
                      )}
                      <span className="relative flex items-center justify-center gap-2">
                        <span className="truncate">{c.label}</span>
                        <span className={`text-[10px] tabular-nums ${isActive ? 'text-ink/60' : 'text-mist/60'}`}>
                          {String(count).padStart(2, '0')}
                        </span>
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </LayoutGroup>
          </div>

          <div className="hairline mt-10 md:mt-16" />

          {isCarousel ? (
            /* Carousel horizontal, shfaqet butë kur hyn në ekran */
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.3, ease }}
            >
              <ProjectCarousel items={visible} resetKey={filter} onOpen={setActive} />
            </motion.div>
          ) : (
            <MobileCarousel key={filter} items={visible} onOpen={setActive} />
          )}

          <div className="mt-12 flex justify-center md:mt-20">
            <MagneticButton
              variant="outline"
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#kontakt')
              }}
              className="w-full sm:w-auto"
            >
              Diskutoni projektin tuaj <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </section>

      <ProjectModal project={active} onClose={closeModal} />
    </>
  )
}

const countFor = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.category === id).length)

/* Dropdown i filtrave — vetëm në mobile (fshihet nga md: e lart) */
function MobileFilter({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current = categories.find((c) => c.id === value) ?? categories[0]

  // Mbyll me klik jashtë ose me Escape
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative z-30 w-full md:hidden">
      <motion.button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Filtro projektet"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.96 }}
        className={`flex h-14 w-full items-center justify-between border bg-[#1A1D21] px-5 text-[12px] font-medium uppercase tracking-[0.18em] text-gold transition-colors duration-500 ease-silk ${
          open ? 'border-gold' : 'border-gold/40'
        }`}
      >
        <span className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.24em] text-mist/70">Filtro</span>
          <span className="h-3 w-px bg-gold/30" />
          <span>{current.label}</span>
          <span className="text-[10px] tabular-nums text-gold/60">
            {String(countFor(current.id)).padStart(2, '0')}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}>
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Kategoritë"
            initial={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease }}
            style={{ willChange: 'transform, clip-path' }}
            className="absolute left-0 right-0 top-full mt-2 border border-gold/40 bg-[#1A1D21] py-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            {categories.map((c, i) => {
              const isActive = c.id === value
              return (
                <motion.li
                  key={c.id}
                  role="option"
                  aria-selected={isActive}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onChange(c.id)
                      setOpen(false)
                    }}
                    className={`flex h-12 w-full items-center justify-between px-5 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                      isActive ? 'bg-gold/10 text-gold' : 'text-gold/70 hover:bg-gold/5 hover:text-gold'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-gold' : 'bg-gold/20'}`} />
                      {c.label}
                    </span>
                    <span className="text-[10px] tabular-nums text-gold/50">
                      {String(countFor(c.id)).padStart(2, '0')}
                    </span>
                  </button>
                </motion.li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
