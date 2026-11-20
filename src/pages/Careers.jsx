import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Building2,
  Clock,
  GraduationCap,
  Handshake,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import MagneticButton from '../components/ui/MagneticButton'
import { company } from '../data/site'
import { benefits, roles, applyHref } from '../data/careers'
import { telHref } from '../data/contact'
import { useLanguage } from '../context/LanguageContext'
import { localize } from '../locales'

const icons = { ShieldCheck, Handshake, GraduationCap, Building2 }
const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease, delay },
})

export default function Careers() {
  return (
    <>
      <CareersHero />
      <Benefits />
      <Roles />
      <Process />
    </>
  )
}
/* ───────────────────────── Hero ───────────────────────── */

function CareersHero() {
  const { t } = useLanguage()
  const c = t.careers
  const quick = [
    { id: 'phone', icon: Phone, label: c.quick.phone, value: company.phone, href: telHref(company.phone) },
    { id: 'email', icon: Mail, label: c.quick.email, value: company.email, href: applyHref(t) },
    { id: 'hours', icon: Clock, label: c.quick.hours, value: t.common.hours },
  ]
  // Rreshti i fundit i titullit merr gradientin gold
  const lead = c.title.slice(0, -1)
  const accent = c.title[c.title.length - 1]

  return (
    <section className="relative overflow-hidden border-b border-accent/10 pt-28 sm:pt-36 lg:pt-44">
      <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="container-site relative">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          <div className="min-w-0 lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease, delay: 0.2 }}
              className="eyebrow mb-6 flex items-center gap-4 sm:mb-10"
            >
              <span className="h-px w-10 shrink-0 bg-gold sm:w-12" />
              {c.eyebrow} · {company.legalName}
            </motion.p>

            <h1 className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight text-bone min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
              {lead.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, ease, delay: 0.3 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="text-gold-gradient block"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease, delay: 0.5 }}
                >
                  {accent}
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.7 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
            >
              {c.lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.85 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <MagneticButton variant="outline" href={telHref(company.phone)} className="w-full sm:w-auto">
                <Phone size={15} /> {company.phone}
              </MagneticButton>
            </motion.div>
          </div>

          {/* Imazhi */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.4 }}
            className="group relative hidden aspect-[4/5] max-h-[560px] w-full overflow-hidden bg-graphite lg:col-span-5 lg:block"
          >
            <img
              src="/images/about-kantier-1400.webp"
              srcSet="/images/about-kantier-800.webp 800w, /images/about-kantier-1400.webp 1400w"
              sizes="40vw"
              width={1400}
              height={1750}
              alt={c.imageAlt}
              decoding="async"
              className="h-full w-full object-cover brightness-[0.78] contrast-[1.08] grayscale transition-[filter,transform] duration-1200 ease-silk group-hover:scale-[1.03] group-hover:brightness-100 group-hover:grayscale-0"
            />
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-accent/35 mix-blend-color transition-opacity duration-1200 ease-silk group-hover:opacity-0" />
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/30" />
            <span aria-hidden className="pointer-events-none absolute inset-4 border border-accent/15" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="eyebrow">{c.openLabel}</p>
              <p className="mt-3 font-display text-2xl font-medium leading-tight text-bone">{c.openText}</p>
            </div>
          </motion.div>
        </div>

        {/* Shiriti i kontaktit të shpejtë */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1 }}
          className="mt-16 grid border-t border-accent/15 sm:grid-cols-3 lg:mt-24"
        >
          {quick.map(({ id, icon: Icon, label, value, href }, i) => {
            const body = (
              <>
                <Icon size={18} strokeWidth={1.5} className="shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-mist">{label}</span>
                  <span className="mt-1 block text-bone [overflow-wrap:anywhere] transition-colors duration-500 group-hover:text-gold">
                    {value}
                  </span>
                </span>
              </>
            )
            const cls = `group flex items-center gap-4 py-6 sm:py-8 ${i > 0 ? 'border-t border-accent/15 sm:border-l sm:border-t-0 sm:pl-6 lg:pl-10' : ''}`
            return (
              <li key={id} className="min-w-0">
                {href ? (
                  <a href={href} className={cls}>
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}

/* ───────────────────────── Përfitimet ───────────────────────── */

function Benefits() {
  const { t } = useLanguage()
  const b = t.careers.benefits
  const items = localize(benefits, b.items)

  return (
    <section className="section-pad relative">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle index="01" label={b.label} title={b.title} className="max-w-3xl" />
          <motion.p {...fadeUp(0.2)} className="max-w-sm text-mist">
            {b.intro}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-accent/15 bg-accent/15 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <motion.div
                key={item.id}
                {...fadeUp(i * 0.08)}
                className="group relative bg-graphite p-7 transition-colors duration-700 ease-silk hover:bg-steel sm:p-10"
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-x-100" />
                <Icon className="text-accent" size={28} strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-lg font-medium text-bone">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{item.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Profilet ───────────────────────── */

function Roles() {
  const { t } = useLanguage()
  const r = t.careers.roles
  const s = t.careers.spontaneous
  const items = localize(roles, r.items)

  return (
    <section className="section-pad relative border-t border-accent/10">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle index="02" label={r.label} title={r.title} />
          <motion.p {...fadeUp(0.2)} className="max-w-sm text-mist">
            {r.intro}
          </motion.p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-6">
          {items.map((role, i) => (
            <motion.li key={role.id} {...fadeUp((i % 3) * 0.08)} className="min-w-0">
              <a
                href={applyHref(t, role.title)}
                className="card card-hover group relative flex h-full flex-col p-6 hover:bg-steel sm:p-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="eyebrow flex items-center gap-3">
                    <span className="h-px w-6 bg-accent/40" />
                    {role.team}
                  </span>
                  <span className="font-display text-sm tabular-nums text-accent/40">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <h3 className="mt-6 font-display text-xl font-medium leading-snug text-bone sm:text-2xl">{role.title}</h3>
                <p className="mb-8 mt-3 text-sm leading-relaxed text-mist">{role.text}</p>
                <span className="mt-auto flex items-center justify-between border-t border-accent/15 pt-5 text-xs font-medium uppercase tracking-[0.2em] text-accent-light transition-colors duration-500 group-hover:text-gold">
                  {r.apply}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-700 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Aplikim spontan */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative mt-6 flex flex-col gap-6 border border-gold/30 bg-graphite p-6 sm:p-8 md:flex-row md:items-center md:justify-between lg:mt-8 lg:p-10"
        >
          <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-gold" />
          <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-gold" />
          <div className="min-w-0">
            <p className="eyebrow">{s.label}</p>
            <p className="mt-3 max-w-xl font-display text-xl font-medium leading-snug text-bone sm:text-2xl">{s.text}</p>
          </div>
          <MagneticButton href={applyHref(t)} className="w-full shrink-0 md:w-auto">
            <Mail size={15} /> {s.cta}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────────────────── Procesi ───────────────────────── */

function Process() {
  const { t } = useLanguage()
  const p = t.careers.process

  return (
    <section className="section-pad relative border-t border-accent/10">
      <div className="container-site">
        <SectionTitle index="03" label={p.label} title={p.title} className="max-w-3xl" />

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-8">
          {p.steps.map((step, i) => (
            <motion.li key={i} {...fadeUp(i * 0.1)} className="relative min-w-0">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 font-display text-sm font-medium tabular-nums text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Vija lidhëse midis hapave (vetëm në desktop) */}
                {i < p.steps.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent lg:block" />}
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-bone">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist [overflow-wrap:anywhere]">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
