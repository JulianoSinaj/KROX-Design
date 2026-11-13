import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import FadeImage from '../ui/FadeImage'

const ease = [0.22, 1, 0.36, 1]

const lines = [
  { text: 'Nga ideja te zbatimi', accent: false },
  { text: 'me standardet', accent: false },
  { text: 'më të larta.', accent: true },
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

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-ink sm:h-[100svh] sm:min-h-[680px] lg:min-h-[720px]"
    >
      {/* Foto e kantierit me parallax */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
        <FadeImage
          src="/images/hero-1920.webp"
          srcSet="/images/hero-1000.webp 1000w, /images/hero-1920.webp 1920w"
          sizes="100vw"
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
          className="container-site flex h-full flex-col justify-center pb-14 pt-28 will-change-transform sm:pb-0 sm:pt-20"
        >
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="eyebrow mb-6 flex items-center gap-3 !tracking-[0.22em] sm:mb-10 sm:gap-4 sm:!tracking-eyebrow"
          >
            <span className="h-px w-8 shrink-0 bg-gold sm:w-12" />
            <span className="min-w-0">Projektim · Zbatim · Mbikëqyrje</span>
          </motion.p>

          {/* Mobile → tablet → desktop. Nga lg e tutje mbetet madhësia origjinale fluide (clamp). */}
          <h1
            className="max-w-5xl break-words text-[2.5rem] font-medium leading-[1.04] text-bone min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(4.5rem,7.5vw,7rem)] lg:leading-[1]"
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
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-bone/70 sm:mt-10 sm:text-base md:text-lg"
          >
            KROX projekton, zbaton dhe mbikëqyr punime ndërtimi me cilësi, saktësi dhe siguri
            maksimale në kantier, nga studimi i parë deri te kolaudimi.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
