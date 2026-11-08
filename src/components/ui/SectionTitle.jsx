import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const eyebrow = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const word = {
  hidden: { y: '105%', rotateX: -20, opacity: 0 },
  show: (i) => ({ y: '0%', rotateX: 0, opacity: 1, transition: { duration: 1.2, ease, delay: 0.1 + i * 0.05 } }),
}

/**
 * Titull seksioni me etiketë numerike dhe shfaqje fjalë-pas-fjale.
 * Vëzhgimi "në ekran" bëhet te mbështjellësi (gjithmonë i dukshëm) dhe jo te fjalët —
 * fjalët fillojnë të fshehura brenda `overflow-hidden`, ndaj shfletuesi nuk do t'i
 * shihte kurrë si të dukshme dhe titulli nuk do të shfaqej.
 */
export default function SectionTitle({ index, label, title, className = '', align = 'left' }) {
  const words = title.split(' ')

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      <motion.p
        variants={eyebrow}
        className={`mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-mist ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="text-gold">{index}</span>
        <span className="h-px w-10 bg-accent/30" />
        {label}
      </motion.p>

      <h2
        aria-label={title}
        className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-bone sm:text-5xl lg:text-6xl"
        style={{ perspective: 800 }}
      >
        {words.map((w, i) => (
          <span key={i} aria-hidden className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span custom={i} variants={word} className="inline-block origin-bottom will-change-transform">
              {w}
            </motion.span>
          </span>
        ))}
      </h2>
    </motion.div>
  )
}
