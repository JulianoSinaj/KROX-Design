import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/** Titull seksioni me etiketë numerike dhe shfaqje fjalë-pas-fjale. */
export default function SectionTitle({ index, label, title, className = '', align = 'left' }) {
  const words = title.split(' ')

  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
        className={`mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-mist ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-white/20" />
        {label}
      </motion.p>

      <h2
        className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-bone sm:text-5xl lg:text-6xl"
        style={{ perspective: 800 }}
      >
        {words.map((word, i) => (
          <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block origin-bottom will-change-transform"
              initial={{ y: '110%', rotateX: -50 }}
              whileInView={{ y: '0%', rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease, delay: i * 0.06 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  )
}
