import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import { company, placeholder } from '../../data/site'
import { scrollToTarget } from '../../hooks/useLenis'

const ease = [0.22, 1, 0.36, 1]

const lines = [
  { text: 'Nga ideja te zbatimi', accent: false },
  { text: 'me standardet', accent: false },
  { text: 'më të larta.', accent: true },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  const bgY = useTransform(progress, [0, 1], ['0%', '22%'])
  const bgScale = useTransform(progress, [0, 1], [1.08, 1.22])
  const contentY = useTransform(progress, [0, 1], [0, -140])
  const contentRotate = useTransform(progress, [0, 1], [0, 8])
  const contentOpacity = useTransform(progress, [0, 0.75], [1, 0])

  const go = (e, href) => {
    e.preventDefault()
    scrollToTarget(href)
  }

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[680px] overflow-hidden">
      {/* Sfondi me parallax */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
        <img
          src={placeholder('hero', 2200, 1400)}
          alt=""
          className="h-full w-full object-cover grayscale"
          fetchpriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
      <div className="bg-blueprint absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      {/* Përmbajtja */}
      <div className="relative h-full" style={{ perspective: 1200 }}>
        <motion.div
          style={{ y: contentY, rotateX: contentRotate, opacity: contentOpacity, transformOrigin: 'center top' }}
          className="container-site flex h-full flex-col justify-center pt-[72px] will-change-transform"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-mist"
          >
            <span className="h-px w-10 bg-accent" />
            Ndërtim · Zbatim · Menaxhim
          </motion.p>

          <h1
            className="max-w-5xl font-display text-[clamp(2.75rem,8vw,7.25rem)] font-medium leading-[0.98] tracking-tight"
            style={{ perspective: 900 }}
          >
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`origin-bottom will-change-transform ${
                    line.accent ? 'text-gold-gradient inline-block pr-[0.04em]' : 'block text-bone'
                  }`}
                  initial={{ y: '110%', rotateX: -60 }}
                  animate={{ y: '0%', rotateX: 0 }}
                  transition={{ duration: 1.1, ease, delay: 0.35 + i * 0.12 }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-mist md:text-lg"
          >
            KROX Design realizon ndërtime civile dhe industriale me cilësi, saktësi dhe siguri
            maksimale në kantier, nga projekti deri në dorëzimin e çelësave.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.05 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton href="#projektet" onClick={(e) => go(e, '#projektet')}>
              Shiko projektet <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#kontakt" variant="outline" onClick={(e) => go(e, '#kontakt')}>
              Na kontaktoni
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Shiriti i poshtëm */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute inset-x-0 bottom-0"
      >
        <div className="container-site flex items-end justify-between pb-8 text-xs uppercase tracking-[0.25em] text-mist">
          <button
            type="button"
            onClick={() => scrollToTarget('#rreth-nesh')}
            className="flex items-center gap-4"
            aria-label="Shko te seksioni Rreth nesh"
          >
            <span className="relative block h-12 w-px overflow-hidden bg-white/15">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-gold"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
              />
            </span>
            Scroll
          </button>
          <p className="hidden sm:block">Tiranë, Shqipëri · Që nga {company.founded}</p>
        </div>
      </motion.div>
    </section>
  )
}
