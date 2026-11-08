import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import FadeImage from '../ui/FadeImage'
import { categoryLabel } from '../../data/projects'

export const cardVariants = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 90, damping: 20, mass: 0.8 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

// Në rrjetin vertikal (mobile) kartat ngrihen nga poshtë, pa lëvizje anësore
export const gridCardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -8 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 90, damping: 20, mass: 0.8 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Kartë luksoze e projektit: sfond onyx (#141517), kornizë e hollë champagne,
 * foto bardh e zi → ngjyrë e plotë + zoom i butë në hover.
 * `tilt` është një motion value (rrotullim 3D sipas shpejtësisë së tërheqjes).
 * `layout="grid"` → kartë me gjerësi 100% për rrjetin vertikal në mobile.
 */
export default function ProjectCard({ project, index, tilt, onOpen, onFocus, layout = 'carousel', highlight = false }) {
  const isGrid = layout === 'grid'
  return (
    <motion.div
      data-card
      variants={isGrid ? gridCardVariants : cardVariants}
      style={isGrid ? { transformPerspective: 1200 } : { rotateY: tilt, transformPerspective: 1400 }}
      className={
        isGrid
          ? 'w-full min-w-0 will-change-transform'
          : 'w-[80vw] shrink-0 will-change-transform sm:w-[400px] lg:w-[440px]'
      }
    >
      <button
        type="button"
        onClick={onOpen}
        onFocus={onFocus}
        data-highlight={highlight}
        draggable={false}
        aria-label={`Shiko detajet: ${project.title}`}
        className="group block w-full select-none border border-accent/20 bg-onyx p-3 text-left transition-[border-color,box-shadow] duration-700 ease-silk hover:border-gold/60 hover:shadow-card"
      >
        {/* Foto */}
        <div className="relative aspect-[4/5] overflow-hidden bg-ink">
          <FadeImage
            src={project.image}
            alt={project.title}
            loading="lazy"
            draggable={false}
            className="pointer-events-none h-full w-full scale-100 object-cover brightness-[0.78] grayscale transition-[transform,filter] duration-1600 ease-expo will-change-transform group-hover:scale-[1.06] group-hover:brightness-100 group-hover:grayscale-0 group-data-[highlight=true]:brightness-100 group-data-[highlight=true]:grayscale-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent transition-opacity duration-1000 ease-silk group-hover:opacity-50" />

          {/* Kornizë e brendshme gold që shfaqet në hover */}
          <span className="pointer-events-none absolute inset-3 border border-gold/0 transition-colors duration-1000 ease-silk group-hover:border-gold/30 group-data-[highlight=true]:border-gold/30" />

          <span className="absolute left-4 top-4 border sm:left-5 sm:top-5 border-accent/30 bg-onyx/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-accent-light backdrop-blur-md">
            {categoryLabel(project.category)}
          </span>
          <span className="absolute right-4 top-4 font-display sm:right-5 sm:top-5 text-sm tabular-nums text-bone/70">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Informacioni */}
        <div className="flex items-end justify-between gap-4 px-2 pb-2 pt-6 sm:gap-6 sm:px-3 sm:pb-3 sm:pt-7">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.24em] text-accent sm:tracking-eyebrow">
              {project.type}
            </p>
            <h3 className="mt-3 truncate text-xl font-medium text-bone sm:text-2xl">{project.title}</h3>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mist">
              <span>{project.location}</span>
              <span className="h-3 w-px bg-accent/30" />
              <span className="tabular-nums">{project.year}</span>
              <span className="h-3 w-px bg-accent/30" />
              <span className="tabular-nums">{project.area}</span>
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-accent/30 text-accent transition-[background-color,border-color,color,transform] duration-700 ease-expo group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </button>
    </motion.div>
  )
}
