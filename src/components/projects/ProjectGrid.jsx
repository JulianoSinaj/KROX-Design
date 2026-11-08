import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

/**
 * Rrjet vertikal për mobile (< 768px): 1 kolonë në telefon, 2 kolona nga 640px.
 * Zëvendëson carousel-in horizontal, që në ekrane të vogla tërhiqej me vështirësi
 * dhe ngatërrohej me scroll-in vertikal të faqes.
 */
export default function ProjectGrid({ items, resetKey, onOpen }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.ul
        key={resetKey}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: true, amount: 0.05 }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5"
        style={{ perspective: 1200 }}
      >
        {items.map((p, i) => (
          <li key={p.id} className="min-w-0">
            <ProjectCard project={p} index={i} layout="grid" onOpen={() => onOpen(p)} />
          </li>
        ))}
      </motion.ul>
    </AnimatePresence>
  )
}
