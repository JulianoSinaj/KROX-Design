import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Calculator,
  ClipboardCheck,
  DraftingCompass,
  HardHat,
  Layers,
  PencilRuler,
} from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import TiltCard from '../ui/TiltCard'
import { services } from '../../data/services'
import { scrollToTarget } from '../../hooks/useLenis'

const icons = { Calculator, ClipboardCheck, DraftingCompass, HardHat, Layers, PencilRuler }
const ease = [0.22, 1, 0.36, 1]

export default function Services() {
  return (
    <section id="sherbimet" className="section-pad relative overflow-hidden border-y border-accent/10">
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="container-site relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle index="02" label="Shërbimet" title="Një partner për gjithë ciklin e veprës." className="max-w-2xl" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="max-w-sm text-mist"
          >
            Nga studimet gjeologjike dhe projektimi, te zbatimi, mbikëqyrja dhe kolaudimi i punimeve,
            me një ekip të vetëm dhe përgjegjës.
          </motion.p>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 50, rotateX: -12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease, delay: (i % 3) * 0.1 }}
                style={{ transformPerspective: 1000 }}
              >
                <TiltCard className="h-full">
                  <article
                    className="flex h-full flex-col border border-accent/15 bg-graphite p-9 transition-colors duration-700 ease-silk group-hover:border-gold/50"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex items-start justify-between" style={{ transform: 'translateZ(40px)' }}>
                      <span className="flex h-14 w-14 items-center justify-center border border-accent/20 bg-steel text-accent transition-colors duration-700 ease-silk group-hover:border-gold group-hover:text-gold">
                        <Icon size={26} strokeWidth={1.5} />
                      </span>
                      <span className="font-display text-sm text-mist">0{i + 1}</span>
                    </div>

                    <div style={{ transform: 'translateZ(30px)' }}>
                      <h3 className="mt-10 font-display text-2xl font-medium leading-tight text-bone">{s.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-mist">{s.text}</p>
                    </div>

                    <ul className="mt-6 space-y-2 border-t border-accent/15 pt-6" style={{ transform: 'translateZ(20px)' }}>
                      {s.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-3 text-sm text-bone/80">
                          <span className="h-1 w-1 bg-accent" />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#kontakt"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToTarget('#kontakt')
                      }}
                      className="mt-auto flex items-center gap-2 pt-8 text-xs font-medium uppercase tracking-[0.2em] text-bone"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      Kërko ofertë
                      <ArrowUpRight
                        size={16}
                        className="text-accent transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </article>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
