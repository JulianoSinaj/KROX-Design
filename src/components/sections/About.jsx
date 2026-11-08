import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Award, Clock, Eye, ShieldCheck } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import Counter from '../ui/Counter'
import { company, placeholder, stats, values } from '../../data/site'

const icons = { Award, Clock, Eye, ShieldCheck }
const ease = [0.22, 1, 0.36, 1]

export default function About() {
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.4 })
  const imgY = useTransform(p, [0, 1], ['-10%', '10%'])
  const badgeY = useTransform(p, [0, 1], [60, -60])

  return (
    <section id="rreth-nesh" className="section-pad relative">
      <div className="container-site">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Imazhi */}
          <div className="relative lg:col-span-5">
            <motion.div
              ref={imgRef}
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease }}
              className="relative aspect-[4/5] overflow-hidden bg-graphite"
            >
              <motion.img
                src={placeholder('about', 1000, 1300)}
                alt="KROX Design në kantier"
                loading="lazy"
                style={{ y: imgY, scale: 1.2 }}
                className="h-full w-full object-cover grayscale will-change-transform"
              />
            </motion.div>

            <motion.div
              style={{ y: badgeY }}
              className="absolute -bottom-8 -right-4 bg-gold p-6 text-ink will-change-transform sm:-right-8 sm:p-8"
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
                <span className="text-bone">KROX Design</span> ({company.legalName}) është shoqëri e
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
            <div className="mt-14 grid grid-cols-3 border-l border-t border-accent/15">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                  className="border-b border-r border-accent/15 p-5 sm:p-6"
                >
                  <p className="font-display text-3xl font-medium text-bone md:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs leading-snug text-mist">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vlerat */}
        <div className="mt-32 grid gap-px overflow-hidden border border-accent/15 bg-accent/15 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = icons[v.icon]
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                className="group relative bg-graphite p-10 transition-colors duration-700 ease-silk hover:bg-steel"
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
