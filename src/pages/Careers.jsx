import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  GraduationCap,
  Handshake,
  Mail,
  MapPin,
  Paperclip,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import MagneticButton from '../components/ui/MagneticButton'
import CopyButton from '../components/ui/CopyButton'
import Field from '../components/ui/Field'
import { company } from '../data/site'
import { benefits, roles, spontaneous, steps, applyHref } from '../data/careers'
import { external, mailtoHref, mapsOpenUrl, telHref } from '../data/contact'
import { goTo } from '../hooks/useRoute'

const icons = { ShieldCheck, Handshake, GraduationCap, Building2 }
const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease, delay },
})

const toApply = (e) => {
  e.preventDefault()
  goTo('#apliko')
}

export default function Careers() {
  return (
    <>
      <CareersHero />
      <Benefits />
      <Roles />
      <Process />
      <Apply />
    </>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

function CareersHero() {
  const quick = [
    { icon: Phone, label: 'Telefon', value: company.phone, href: telHref(company.phone) },
    { icon: Mail, label: 'Email për CV', value: company.email, href: applyHref() },
    { icon: Clock, label: 'Orari', value: company.hours },
  ]

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
              Karriera · {company.legalName}
            </motion.p>

            <h1 className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight text-bone min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
              {['Ndërtoni të ardhmen', 'tuaj me'].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
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
                  ekipin KROX.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.7 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
            >
              Kërkojmë inxhinierë, arkitektë, specialistë kantieri dhe punëtorë të kualifikuar që e duan punën e mirë.
              Na telefononi ose na dërgoni CV-në — çdo aplikim lexohet nga ekipi ynë.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.85 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <MagneticButton href="#apliko" onClick={toApply} className="w-full sm:w-auto">
                Apliko tani <ArrowRight size={16} />
              </MagneticButton>
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
              alt="Ekipi i KROX në kantier, mbi armaturën e një solete betonarmeje"
              decoding="async"
              className="h-full w-full object-cover brightness-[0.78] contrast-[1.08] grayscale transition-[filter,transform] duration-1200 ease-silk group-hover:scale-[1.03] group-hover:brightness-100 group-hover:grayscale-0"
            />
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-accent/35 mix-blend-color transition-opacity duration-1200 ease-silk group-hover:opacity-0" />
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/30" />
            <span aria-hidden className="pointer-events-none absolute inset-4 border border-accent/15" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="eyebrow">Aplikime të hapura</p>
              <p className="mt-3 font-display text-2xl font-medium leading-tight text-bone">
                Gjatë gjithë vitit, për zyrë dhe kantier.
              </p>
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
          {quick.map(({ icon: Icon, label, value, href }, i) => {
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
              <li key={label} className="min-w-0">
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
  return (
    <section className="section-pad relative">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle index="01" label="Pse KROX" title="Një vend pune ku siguria dhe cilësia vijnë të parat." className="max-w-3xl" />
          <motion.p {...fadeUp(0.2)} className="max-w-sm text-mist">
            Çdo vepër që ndërtojmë mban emrin e njerëzve që e realizojnë. Prandaj investojmë tek ata.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-accent/15 bg-accent/15 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = icons[b.icon]
            return (
              <motion.div
                key={b.title}
                {...fadeUp(i * 0.08)}
                className="group relative bg-graphite p-7 transition-colors duration-700 ease-silk hover:bg-steel sm:p-10"
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-x-100" />
                <Icon className="text-accent" size={28} strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-lg font-medium text-bone">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{b.text}</p>
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
  return (
    <section className="section-pad relative border-t border-accent/10">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle index="02" label="Profilet" title="Kë kërkojmë." />
          <motion.p {...fadeUp(0.2)} className="max-w-sm text-mist">
            Zgjidhni profilin që ju përshtatet — butoni "Apliko" hap email-in me subjektin të plotësuar.
          </motion.p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-6">
          {roles.map((r, i) => (
            <motion.li key={r.id} {...fadeUp((i % 3) * 0.08)} className="min-w-0">
              <a
                href={applyHref(r.title)}
                className="card card-hover group relative flex h-full flex-col p-6 hover:bg-steel sm:p-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="eyebrow flex items-center gap-3">
                    <span className="h-px w-6 bg-accent/40" />
                    {r.team}
                  </span>
                  <span className="font-display text-sm tabular-nums text-accent/40">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <h3 className="mt-6 font-display text-xl font-medium leading-snug text-bone sm:text-2xl">{r.title}</h3>
                <p className="mb-8 mt-3 text-sm leading-relaxed text-mist">{r.text}</p>
                <span className="mt-auto flex items-center justify-between border-t border-accent/15 pt-5 text-xs font-medium uppercase tracking-[0.2em] text-accent-light transition-colors duration-500 group-hover:text-gold">
                  Apliko
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
            <p className="eyebrow">{spontaneous}</p>
            <p className="mt-3 max-w-xl font-display text-xl font-medium leading-snug text-bone sm:text-2xl">
              Nuk e gjeni profilin tuaj? Na dërgoni CV-në — e mbajmë për pozicionet e ardhshme.
            </p>
          </div>
          <MagneticButton href={applyHref(spontaneous)} className="w-full shrink-0 md:w-auto">
            <Mail size={15} /> Dërgo CV-në
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────────────────── Procesi ───────────────────────── */

function Process() {
  return (
    <section className="section-pad relative border-t border-accent/10">
      <div className="container-site">
        <SectionTitle index="03" label="Procesi" title="Nga aplikimi te kantieri, në katër hapa." className="max-w-3xl" />

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <motion.li key={s.title} {...fadeUp(i * 0.1)} className="relative min-w-0">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 font-display text-sm font-medium tabular-nums text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Vija lidhëse midis hapave (vetëm në desktop) */}
                {i < steps.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent lg:block" />}
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-bone">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist [overflow-wrap:anywhere]">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────────────────── Aplikimi ───────────────────────── */

const initial = { name: '', phone: '', email: '', position: '', experience: '', message: '' }
const experienceOptions = ['Pa përvojë / praktikant', '1 – 3 vite', '3 – 5 vite', 'Mbi 5 vite']

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Ju lutem shkruani emrin.'
  if (!/^\+?[\d\s()-]{6,20}$/.test(v.phone.trim())) e.phone = 'Shkruani një numër telefoni të vlefshëm.'
  if (v.email.trim() && !/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'Email-i nuk është i vlefshëm.'
  return e
}

function composeApplication(v) {
  const position = v.position || spontaneous
  const lines = [
    `Emri dhe mbiemri: ${v.name.trim()}`,
    `Telefoni: ${v.phone.trim()}`,
    v.email.trim() && `Email: ${v.email.trim()}`,
    `Pozicioni: ${position}`,
    v.experience && `Përvoja: ${v.experience}`,
  ].filter(Boolean)
  const body = `Përshëndetje KROX,\n\n${lines.join('\n')}\n\n${v.message.trim() ? `${v.message.trim()}\n\n` : ''}Bashkëngjit CV-në time.\n\nFaleminderit,\n${v.name.trim()}\n`
  return { subject: `Aplikim pune — ${position} · ${v.name.trim()}`, body }
}

function Apply() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    window.location.href = mailtoHref(company.email, composeApplication(values))
    setSent(true)
  }

  const items = [
    { icon: Phone, label: 'Telefononi', value: company.phone, href: telHref(company.phone), copy: company.phone },
    { icon: Mail, label: 'Dërgoni CV-në', value: company.email, href: applyHref(), copy: company.email },
    { icon: Clock, label: 'Orari', value: company.hours },
    { icon: MapPin, label: 'Zyra', value: company.address, href: mapsOpenUrl(company.mapQuery), external: true },
  ]

  return (
    <section id="apliko" className="section-pad relative border-t border-accent/10">
      <div className="container-site">
        <SectionTitle index="04" label="Apliko" title="Bëhuni pjesë e ekipit." className="max-w-3xl" />

        <div className="mt-12 grid gap-12 md:mt-20 md:gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-24">
          {/* Kontakti */}
          <div className="min-w-0 lg:col-span-5">
            <motion.p {...fadeUp(0.1)} className="max-w-md leading-relaxed text-mist">
              Mënyra më e shpejtë është një telefonatë. Nëse preferoni email-in, dërgoni CV-në dhe një përshkrim të
              shkurtër të përvojës suaj — ju kontaktojmë nëse profili përputhet me nevojat tona.
            </motion.p>

            <ul className="mt-10 divide-y divide-accent/15 border-y border-accent/15">
              {items.map(({ icon: Icon, label, value, href, copy, external: isExternal }, i) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/15 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-ink">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-[0.2em] text-mist">{label}</span>
                      <span className="mt-1 block text-bone [overflow-wrap:anywhere] transition-colors duration-500 group-hover:text-gold">
                        {value}
                      </span>
                    </span>
                    {isExternal && <ArrowUpRight size={16} aria-hidden className="ml-auto shrink-0 text-accent" />}
                  </>
                )
                const cls = 'group flex min-h-[72px] min-w-0 flex-1 items-center gap-4 py-4 sm:gap-5 sm:py-5'
                return (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    {href ? (
                      <a href={href} {...(isExternal ? external : {})} className={cls}>
                        {content}
                      </a>
                    ) : (
                      <div className={cls}>{content}</div>
                    )}
                    {copy && <CopyButton value={copy} label={label === 'Telefononi' ? 'Telefonin' : 'Email-in'} />}
                  </motion.li>
                )
              })}
            </ul>

            <motion.p {...fadeUp(0.2)} className="mt-8 flex items-start gap-3 text-sm leading-relaxed text-mist">
              <Paperclip size={16} className="mt-0.5 shrink-0 text-gold" />
              Bashkëngjitni CV-në në PDF dhe, nëse keni, certifikata, licenca profesionale ose foto nga punimet e
              mëparshme.
            </motion.p>
          </div>

          {/* Formulari */}
          <motion.div {...fadeUp(0.1)} className="relative min-w-0 lg:col-span-7">
            <div className="relative border border-accent/15 bg-graphite p-5 sm:p-10 lg:p-12">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex min-h-[420px] flex-col items-start justify-center sm:min-h-[520px]"
                    role="status"
                  >
                    <CheckCircle2 size={48} strokeWidth={1.25} className="text-accent" />
                    <h3 className="mt-6 font-display text-2xl font-medium text-bone sm:text-3xl">Aplikimi është gati.</h3>
                    <p className="mt-3 max-w-md text-mist">
                      U hap aplikacioni juaj i email-it me të dhënat e plotësuara.{' '}
                      <span className="text-bone">Bashkëngjitni CV-në</span> dhe shtypni "Dërgo".
                    </p>
                    <p className="mt-4 max-w-md text-sm text-mist">
                      Nuk u hap asgjë? Dërgojeni CV-në direkt në{' '}
                      <a
                        href={mailtoHref(company.email, composeApplication(values))}
                        className="break-all text-accent-light underline decoration-accent/40 underline-offset-4 transition-colors duration-500 hover:text-gold"
                      >
                        {company.email}
                      </a>{' '}
                      ose na telefononi në{' '}
                      <a
                        href={telHref(company.phone)}
                        className="whitespace-nowrap text-accent-light underline decoration-accent/40 underline-offset-4 transition-colors duration-500 hover:text-gold"
                      >
                        {company.phone}
                      </a>
                      .
                    </p>
                    <MagneticButton
                      variant="outline"
                      className="mt-8 w-full sm:w-auto"
                      onClick={() => {
                        setValues(initial)
                        setSent(false)
                      }}
                    >
                      Plotëso një aplikim tjetër
                    </MagneticButton>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid w-full grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2"
                  >
                    <Field label="Emri dhe mbiemri *" error={errors.name}>
                      <input className="field" value={values.name} onChange={update('name')} placeholder="p.sh. Arben Hoxha" autoComplete="name" />
                    </Field>
                    <Field label="Telefoni *" error={errors.phone}>
                      <input
                        className="field"
                        type="tel"
                        inputMode="tel"
                        value={values.phone}
                        onChange={update('phone')}
                        placeholder="+355 6X XXX XXXX"
                        autoComplete="tel"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        className="field"
                        type="email"
                        inputMode="email"
                        value={values.email}
                        onChange={update('email')}
                        placeholder="emri@email.com"
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Pozicioni">
                      <Select value={values.position} onChange={update('position')} placeholder="Zgjidhni pozicionin">
                        {roles.map((r) => (
                          <option key={r.id} value={r.title}>
                            {r.title}
                          </option>
                        ))}
                        <option value={spontaneous}>{spontaneous}</option>
                      </Select>
                    </Field>
                    <Field label="Përvoja" className="sm:col-span-2">
                      <Select value={values.experience} onChange={update('experience')} placeholder="Vitet e përvojës">
                        {experienceOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Rreth jush" className="sm:col-span-2">
                      <textarea
                        className="field h-28 resize-none py-3"
                        value={values.message}
                        onChange={update('message')}
                        maxLength={1200}
                        placeholder="Përvoja, kualifikimet, ku keni punuar më parë, kur mund të filloni…"
                      />
                    </Field>

                    <div className="flex flex-col items-stretch justify-between gap-5 pt-4 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6">
                      <p className="text-xs leading-relaxed text-mist sm:max-w-xs">
                        Formulari hap aplikacionin tuaj të email-it — mos harroni të bashkëngjitni CV-në.
                      </p>
                      <MagneticButton type="submit" className="w-full shrink-0 sm:w-auto sm:min-w-[220px]">
                        Dërgo aplikimin <ArrowRight size={16} />
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Select({ value, onChange, placeholder, children }) {
  return (
    <span className="relative block">
      <select className="field cursor-pointer appearance-none truncate bg-graphite pr-8" value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {children}
      </select>
      <ChevronDown size={16} aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-accent" />
    </span>
  )
}
