import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Ruler, CalendarDays, X } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import MagneticButton from '../ui/MagneticButton'
import { categories, categoryLabel, projects } from '../../data/projects'
import { getLenis, scrollToTarget } from '../../hooks/useLenis'

const ease = [0.22, 1, 0.36, 1]

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const closeModal = useCallback(() => setActive(null), [])

  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projektet" className="section-pad relative">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionTitle index="03" label="Portofoli" title="Projekte që flasin vetë." />

          {/* Filtrat */}
          <LayoutGroup id="filters">
            <div role="tablist" aria-label="Filtro projektet" className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const isActive = filter === c.id
                const count = c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length
                return (
                  <motion.button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(c.id)}
                    whileTap={{ scale: 0.96 }}
                    className={`relative h-11 rounded-full border px-5 text-sm transition-colors duration-300 ${
                      isActive ? 'border-gold text-ink' : 'border-white/15 text-mist hover:text-bone'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-gold"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      {c.label}
                      <span className={`text-[10px] tabular-nums ${isActive ? 'text-ink/70' : 'text-mist/60'}`}>
                        {String(count).padStart(2, '0')}
                      </span>
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Galeria */}
        <motion.div layout className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <MagneticButton variant="outline" href="#kontakt" onClick={(e) => { e.preventDefault(); scrollToTarget('#kontakt') }}>
            Diskutoni projektin tuaj <ArrowUpRight size={16} />
          </MagneticButton>
        </div>
      </div>

      <ProjectModal project={active} onClose={closeModal} />
    </section>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.6 }}
      className="will-change-transform"
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative block aspect-[4/5] w-full overflow-hidden bg-graphite text-left"
        aria-label={`Shiko detajet: ${project.title}`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full scale-100 object-cover grayscale transition-[transform,filter] duration-[1200ms] ease-expo group-hover:scale-110 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-5 top-5 border border-white/20 bg-ink/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-bone backdrop-blur">
          {categoryLabel(project.category)}
        </span>
        <span className="absolute right-5 top-5 flex h-11 w-11 scale-50 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-500 ease-expo group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-2xl font-medium text-bone">{project.title}</h3>
          <div className="mt-3 flex translate-y-2 items-center gap-4 text-xs text-mist opacity-70 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex items-center gap-1.5"><MapPin size={13} /> {project.location}</span>
            <span className="h-3 w-px bg-white/20" />
            <span>{project.year}</span>
          </div>
        </div>
      </button>
    </motion.article>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={onClose} />

          <motion.div
            data-lenis-prevent
            initial={{ y: 60, opacity: 0, rotateX: 8 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            style={{ transformPerspective: 1200 }}
            className="relative grid max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-white/10 bg-graphite md:grid-cols-5"
          >
            <div className="relative aspect-[4/3] md:col-span-3 md:aspect-auto md:min-h-[520px]">
              <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
            </div>

            <div className="flex flex-col p-8 md:col-span-2 md:p-10">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">{categoryLabel(project.category)}</p>
              <h3 className="mt-4 font-display text-3xl font-medium leading-tight text-bone">{project.title}</h3>
              <p className="mt-5 text-sm leading-relaxed text-mist">{project.description}</p>

              <dl className="mt-8 divide-y divide-white/10 border-y border-white/10 text-sm">
                {[
                  { icon: MapPin, label: 'Vendndodhja', value: project.location },
                  { icon: CalendarDays, label: 'Viti', value: project.year },
                  { icon: Ruler, label: 'Sipërfaqja', value: project.area },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3.5">
                    <dt className="flex items-center gap-2 text-mist"><Icon size={14} /> {label}</dt>
                    <dd className="text-bone">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto pt-8">
                <MagneticButton
                  onClick={() => {
                    onClose()
                    setTimeout(() => scrollToTarget('#kontakt'), 350)
                  }}
                  className="w-full"
                >
                  Projekt i ngjashëm? Na shkruani
                </MagneticButton>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={onClose}
              whileTap={{ scale: 0.92 }}
              aria-label="Mbyll"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink/80 text-bone backdrop-blur transition-colors hover:bg-accent hover:text-ink"
            >
              <X size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
