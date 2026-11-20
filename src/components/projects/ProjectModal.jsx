import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, MapPin, X } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import FadeImage from '../ui/FadeImage'
import { getLenis, scrollToTarget } from '../../hooks/useLenis'
import { useLanguage } from '../../context/LanguageContext'

const ease = [0.22, 1, 0.36, 1]

export default function ProjectModal({ project, onClose }) {
  const { t } = useLanguage()
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

  // Foto e plotë pa prerje; kthehet te foto e kartës nëse mungon
  const photo = project?.full ?? { src: project?.image, width: 4, height: 5 }

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 lg:p-8"
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
            style={{ '--r': photo.width / photo.height }}
            className="project-modal relative border border-accent/20 bg-onyx shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
          >
            {/* Foto e plotë — korniza ka formatin e saj, ndaj s'ka shirita as prerje */}
            <div className="project-modal__media relative w-full shrink-0 overflow-hidden bg-ink">
              <FadeImage
                key={photo.src}
                src={photo.src}
                alt={project.title}
                width={photo.width}
                height={photo.height}
                decoding="async"
                wrapperClassName="absolute inset-0"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Detajet — poshtë fotos në ekrane të vogla, panel anësor nga lg */}
            <div className="project-modal__panel">
              <div className="project-modal__panel-inner flex flex-col p-6 sm:p-8 lg:px-8 lg:py-10">
                <p className="eyebrow pr-12">
                  {t.projects.categories[project.category] ?? project.category} · {project.type}
                </p>
                <h3 className="mt-4 text-2xl font-medium leading-tight text-bone sm:text-3xl">{project.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-mist">{project.description}</p>

                <dl className="mt-8 divide-y divide-accent/15 border-y border-accent/15 text-sm">
                  {[
                    { id: 'location', icon: MapPin, label: t.projects.location, value: project.location },
                    { id: 'year', icon: CalendarDays, label: t.projects.year, value: project.year },
                  ].map(({ id, icon: Icon, label, value }) => (
                    <div key={id} className="flex items-center justify-between gap-4 py-4">
                      <dt className="flex items-center gap-2 text-mist">
                        <Icon size={14} className="text-accent" /> {label}
                      </dt>
                      <dd className="text-right text-bone">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto pt-8">
                  <MagneticButton
                    onClick={() => {
                      onClose()
                      setTimeout(() => scrollToTarget('#kontakt'), 400)
                    }}
                    className="w-full whitespace-nowrap !px-4 !text-[11px] !tracking-[0.12em]"
                  >
                    {t.projects.similar}
                  </MagneticButton>
                </div>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={onClose}
              whileTap={{ scale: 0.92 }}
              aria-label={t.projects.close}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-ink/70 text-bone backdrop-blur transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <X size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
