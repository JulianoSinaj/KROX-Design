import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import FadeImage from '../ui/FadeImage'
import { company, placeholder, stats, yearsActive } from '../../data/site'
import { scrollToTarget } from '../../hooks/useLenis'

const ease = [0.22, 1, 0.36, 1]

const lines = [
  { text: 'Nga ideja te zbatimi', accent: false },
  { text: 'me standardet', accent: false },
  { text: 'më të larta.', accent: true },
]

// Merren nga data/site.js — një burim i vetëm për numrat
const facts = [
  { value: `${yearsActive}+`, label: 'Vite eksperiencë' },
  ...[stats[1], stats[3]].map((s) => ({ value: `${s.value}${s.suffix}`, label: s.label })),
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Spring i butë mbi progresin e scroll-it — parallax pa kërcime
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 })

  const bgY = useTransform(progress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(progress, [0, 1], [1.06, 1.16])
  const contentY = useTransform(progress, [0, 1], [0, -110])
  const contentRotate = useTransform(progress, [0, 1], [0, 5])
  const contentOpacity = useTransform(progress, [0, 0.7], [1, 0])

  const go = (e, href) => {
    e.preventDefault()
    scrollToTarget(href)
  }

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[720px] overflow-hidden bg-ink">
      {/* Foto e kantierit me parallax */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
        <FadeImage
          src={placeholder('hero', 2200, 1400)}
          alt=""
          fetchpriority="high"
          className="h-full w-full object-cover grayscale-[0.6] sepia-[0.15]"
        />
      </motion.div>

      {/* Overlay i errët me shtresa — titulli i bardhë dhe detajet gold dalin qartë */}
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(212,175,55,0.08),transparent_60%)]" />
      <div className="bg-blueprint absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

      {/* Kornizë e hollë champagne — detaj arkitekturor */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.6 }}
        className="pointer-events-none absolute inset-5 hidden border border-accent/10 lg:block"
      >
        {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((pos) => (
          <span key={pos} className={`absolute h-6 w-6 border-gold/70 ${pos}`} />
        ))}
      </motion.div>

      {/* Përmbajtja */}
      <div className="relative h-full" style={{ perspective: 1200 }}>
        <motion.div
          style={{ y: contentY, rotateX: contentRotate, opacity: contentOpacity, transformOrigin: 'center top' }}
          className="container-site flex h-full flex-col justify-center pt-20 will-change-transform"
        >
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="eyebrow mb-10 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold" />
            Ndërtim · Zbatim · Menaxhim
          </motion.p>

          <h1
            className="max-w-5xl text-[clamp(2.75rem,7.5vw,7rem)] font-medium leading-[1] text-bone"
            style={{ perspective: 900 }}
          >
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`origin-bottom will-change-transform ${
                    line.accent ? 'text-gold-gradient inline-block pr-[0.04em]' : 'block'
                  }`}
                  initial={{ y: '105%', rotateX: -25, opacity: 0 }}
                  animate={{ y: '0%', rotateX: 0, opacity: 1 }}
                  transition={{ duration: 1.4, ease, delay: 0.45 + i * 0.14 }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 1.05 }}
            className="mt-10 max-w-xl text-base leading-relaxed text-bone/70 md:text-lg"
          >
            KROX Design realizon ndërtime civile dhe industriale me cilësi, saktësi dhe siguri
            maksimale në kantier, nga projekti deri në dorëzimin e çelësave.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 1.2 }}
            className="mt-12 flex flex-wrap gap-4"
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
        transition={{ duration: 1.4, delay: 1.5 }}
        className="absolute inset-x-0 bottom-0"
      >
        <div className="container-site flex items-end justify-between pb-10">
          <button
            type="button"
            onClick={() => scrollToTarget('#rreth-nesh')}
            className="flex items-center gap-4 text-[11px] uppercase tracking-eyebrow text-mist transition-colors duration-500 hover:text-accent"
            aria-label="Shko te seksioni Rreth nesh"
          >
            <span className="relative block h-14 w-px overflow-hidden bg-accent/20">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-gold"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
              />
            </span>
            Scroll
          </button>

          <dl className="hidden gap-12 md:flex">
            {facts.map((f) => (
              <div key={f.label} className="border-l border-accent/20 pl-5">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-mist">{f.label}</dt>
                <dd className="mt-1 font-display text-2xl font-medium text-accent-light">{f.value}</dd>
              </div>
            ))}
          </dl>

          <p className="text-[11px] uppercase tracking-eyebrow text-mist md:hidden">
            Që nga {company.founded}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
