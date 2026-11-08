import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Award, Clock, Eye, ShieldCheck } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import Counter from '../ui/Counter'
import { company, stats, values } from '../../data/site'

const icons = { Award, Clock, Eye, ShieldCheck }
const ease = [0.22, 1, 0.36, 1]

// Foto: Unsplash (licencë falas, edhe për përdorim komercial) — images.unsplash.com/photo-1504307651254-35680f356dfd
// Kur të keni foto nga kantieret e KROX, zëvendësoni dy skedarët te /public/images me të njëjtin emër (raport 4:5).
const aboutImg = {
  src: '/images/about-kantier-1400.webp',
  srcSet: '/images/about-kantier-800.webp 800w, /images/about-kantier-1400.webp 1400w',
}

export default function About() {
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.4 })
  const imgY = useTransform(p, [0, 1], ['-10%', '10%'])
  const badgeY = useTransform(p, [0, 1], [60, -60])

  return (
    <section id="rreth-nesh" className="section-pad relative">
      <div className="container-site">
        <div className="grid items-center gap-14 md:gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          {/* Imazhi */}
          <div className="group relative lg:col-span-5">
            <motion.div
              ref={imgRef}
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease }}
              className="relative aspect-[4/5] overflow-hidden bg-graphite"
            >
              {/* Zoom-i i hover-it është te një element më vete, që të mos përplaset me transform-in e parallax-it */}
              <div className="h-full w-full transition-transform duration-1600 ease-expo will-change-transform group-hover:scale-[1.04]">
                <motion.img
                  src={aboutImg.src}
                  srcSet={aboutImg.srcSet}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  width={1400}
                  height={1750}
                  alt="Punëtorë në kantier mbi një soletë betonarmeje, mes armaturës së hekurit"
                  loading="lazy"
                  decoding="async"
                  style={{ y: imgY, scale: 1.2 }}
                  className="h-full w-full object-cover brightness-[0.78] contrast-[1.08] grayscale transition-[filter] duration-1200 ease-silk will-change-transform group-hover:brightness-100 group-hover:contrast-100 group-hover:grayscale-0"
                />
              </div>

              {/* Tonalitet champagne mbi bardh e zi — zhduket në hover dhe lë ngjyrat reale */}
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-accent/40 mix-blend-color transition-opacity duration-1200 ease-silk group-hover:opacity-0" />
              {/* Overlay grafit: errëson foton që të shkrihet me sfondin */}
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-ink/35 transition-opacity duration-1200 ease-silk group-hover:opacity-0" />
              {/* Gradient poshtë: bazë e errët ku ulet kutia gold */}
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30 transition-opacity duration-1200 ease-silk group-hover:opacity-60" />
              {/* Kornizë e hollë, si te kartat e projekteve */}
              <span aria-hidden className="pointer-events-none absolute inset-3 border border-accent/15 transition-colors duration-1000 ease-silk group-hover:border-gold/30 sm:inset-4" />
            </motion.div>

            <motion.div
              style={{ y: badgeY }}
              className="absolute -bottom-8 -right-4 bg-gold p-6 text-ink shadow-card will-change-transform sm:-right-8 sm:p-8"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-ink/70">Themeluar</p>
              <p className="mt-2 font-display text-5xl font-bold leading-none">
                <Counter value={company.founded} />
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em]">{company.address}</p>
            </motion.div>
          </div>

          {/* Teksti */}
          <div className="lg:col-span-7">
            <SectionTitle index="01" label="Rreth nesh" title="Nga projekti te kolaudimi, me përgjegjësi dhe saktësi." />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="mt-10 grid gap-6 text-base leading-relaxed text-mist md:grid-cols-2"
            >
              <p>
                <span className="text-bone">KROX</span> ({company.legalName}) është shoqëri e
                themeluar në {company.founded} me qendër në {company.city}. Ne mbulojmë gjithë ciklin e
                një vepre: studimet gjeologo-inxhinierike dhe urbanistike, projektimin arkitektonik dhe
                strukturor, zbatimin e punimeve dhe rikonstruksionet.
              </p>
              <p>
                Mbikëqyrja dhe kolaudimi i punimeve janë pjesë e shërbimit tonë, ndaj cilësia dhe
                siguria në kantier kontrollohen në çdo fazë. Klienti ka një partner të vetëm dhe
                përgjegjës nga ideja deri te dorëzimi.
              </p>
            </motion.div>

            {/* Statistikat */}
            <div className="mt-10 grid grid-cols-3 border-l border-t border-accent/15 md:mt-14">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                  className="min-w-0 border-b border-r border-accent/15 p-3 min-[400px]:p-4 sm:p-6"
                >
                  <p className="font-display text-2xl font-medium text-bone min-[400px]:text-3xl md:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs leading-snug text-mist">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vlerat */}
        <div className="mt-20 grid gap-px overflow-hidden md:mt-32 border border-accent/15 bg-accent/15 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = icons[v.icon]
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                className="group relative bg-graphite p-7 transition-colors sm:p-10 duration-700 ease-silk hover:bg-steel"
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-x-100" />
                <Icon className="text-accent" size={28} strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-lg font-medium text-bone">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{v.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
