import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, MapPin, Ruler, X } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import FadeImage from '../ui/FadeImage'
import { categoryLabel } from '../../data/projects'
import { getLenis, scrollToTarget } from '../../hooks/useLenis'

const ease = [0.22, 1, 0.36, 1]

export default function ProjectModal({ project, onClose }) {
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
          transition={{ duration: 0.5, ease }}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <div className="absolute inset-0 bg-ink/90 backdrop-blur-md" onClick={onClose} />

          <motion.div
            data-lenis-prevent
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease }}
            className="relative grid max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-accent/20 bg-onyx md:grid-cols-5"
          >
            <div className="relative aspect-[4/3] bg-ink md:col-span-3 md:aspect-auto md:min-h-[560px]">
              <FadeImage
                src={project.image}
                alt={project.title}
                wrapperClassName="absolute inset-0"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col p-8 md:col-span-2 md:p-12">
              <p className="eyebrow">
                {categoryLabel(project.category)} · {project.type}
              </p>
              <h3 className="mt-5 text-3xl font-medium leading-tight text-bone">{project.title}</h3>
              <p className="mt-6 text-sm leading-relaxed text-mist">{project.description}</p>

              <dl className="mt-10 divide-y divide-accent/15 border-y border-accent/15 text-sm">
                {[
                  { icon: MapPin, label: 'Vendndodhja', value: project.location },
                  { icon: CalendarDays, label: 'Viti', value: project.year },
                  { icon: Ruler, label: 'Sipërfaqja', value: project.area },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between py-4">
                    <dt className="flex items-center gap-2 text-mist">
                      <Icon size={14} className="text-accent" /> {label}
                    </dt>
                    <dd className="text-bone">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto pt-10">
                <MagneticButton
                  onClick={() => {
                    onClose()
                    setTimeout(() => scrollToTarget('#kontakt'), 400)
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
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-ink/70 text-bone backdrop-blur transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <X size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
