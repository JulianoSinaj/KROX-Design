import { useCallback, useMemo, useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import MagneticButton from '../ui/MagneticButton'
import ProjectCarousel from '../projects/ProjectCarousel'
import ProjectModal from '../projects/ProjectModal'
import { categories, projects } from '../../data/projects'
import { scrollToTarget } from '../../hooks/useLenis'

const ease = [0.22, 1, 0.36, 1]

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const closeModal = useCallback(() => setActive(null), [])

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <>
      {/* overflow-hidden: shiriti del jashtë kontejnerit deri në skajin e ekranit, pa scroll horizontal të faqes */}
      <section id="projektet" className="section-pad relative overflow-hidden">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <SectionTitle index="03" label="Portofoli" title="Projekte që flasin vetë." />

            {/* Filtrat */}
            <LayoutGroup id="filters">
              <div role="tablist" aria-label="Filtro projektet" className="flex flex-wrap gap-3">
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
                      onClick={() => setFilter(c.id)}
                      whileTap={{ scale: 0.96 }}
                      className={`relative h-11 rounded-full border px-6 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ease-silk ${
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
                      <span className="relative flex items-center gap-2">
                        {c.label}
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

          <div className="hairline mt-16" />

          {/* Carousel horizontal — shfaqet butë kur hyn në ekran */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.3, ease }}
          >
            <ProjectCarousel items={visible} resetKey={filter} onOpen={setActive} />
          </motion.div>

          <div className="mt-20 flex justify-center">
            <MagneticButton
              variant="outline"
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#kontakt')
              }}
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
