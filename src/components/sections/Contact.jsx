import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown, Clock, Copy, Mail, MapPin, Phone } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import MagneticButton from '../ui/MagneticButton'
import { company } from '../../data/site'
import { services } from '../../data/services'
import { defaultMail, external, mailtoHref, mapsOpenUrl, telHref } from '../../data/contact'
import { scrollToTarget } from '../../hooks/useLenis'

const ease = [0.22, 1, 0.36, 1]
const initial = { name: '', email: '', phone: '', service: '', message: '' }
const MESSAGE_MAX = 1500 // mailto ka kufi gjatësie në disa klientë

/**
 * Opsionale: një endpoint që pranon POST JSON (p.sh. Formspree: https://formspree.io/f/xxxx).
 * Vendoseni te .env si VITE_CONTACT_ENDPOINT=... — pa të, formulari hap aplikacionin
 * e email-it me mesazhin të parambushur drejt adresës së kompanisë.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Ju lutem shkruani emrin.'
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'Email-i nuk është i vlefshëm.'
  if (v.phone.trim() && !/^\+?[\d\s()-]{6,20}$/.test(v.phone.trim())) e.phone = 'Numri i telefonit nuk është i vlefshëm.'
  if (v.message.trim().length < 10) e.message = 'Mesazhi duhet të ketë të paktën 10 karaktere.'
  return e
}

/** Ndërton subjektin dhe tekstin e email-it nga fushat e formularit. */
function composeMail(v) {
  const service = services.find((s) => s.id === v.service)?.title
  const subject = `Kërkesë nga faqja${service ? ` — ${service}` : ''} · ${v.name.trim()}`
  const details = [
    `Emri: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    v.phone.trim() && `Telefoni: ${v.phone.trim()}`,
    service && `Shërbimi: ${service}`,
  ].filter(Boolean)
  const body = `${details.join('\n')}\n\n${v.message.trim()}`
  return { subject, body, service }
}

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mail | error

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const openMailClient = (mail) => {
    window.location.href = mailtoHref(company.email, mail)
    setStatus('mail')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    const mail = composeMail(values)

    // Pa backend → hapet aplikacioni i email-it me gjithçka gati për t'u dërguar
    if (!ENDPOINT) {
      openMailClient(mail)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          service: mail.service ?? '',
          message: values.message.trim(),
          _subject: mail.subject,
          _replyto: values.email.trim(),
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      setValues(initial)
    } catch {
      setStatus('error')
    }
  }

  const contactItems = [
    { icon: Phone, label: 'Telefon', value: company.phone, href: telHref(company.phone), copy: company.phone },
    { icon: Mail, label: 'Email', value: company.email, href: mailtoHref(company.email, defaultMail), copy: company.email },
    { icon: MapPin, label: 'Zyra qendrore', value: company.address, href: mapsOpenUrl(company.mapQuery), external: true },
    { icon: Clock, label: 'Orari', value: company.hours },
  ]

  // Të dhënat zyrtare nga Ekstrakti i QKB-së
  const legal = [
    { label: 'Emri ligjor', value: company.legalName },
    { label: 'Emri tregtar', value: company.name },
    { label: 'Administrator', value: company.administrator },
  ]

  return (
    <section id="kontakt" className="section-pad relative border-t border-accent/10">
      <div className="container-site">
        <SectionTitle index="05" label="Kontakt" title="Le të ndërtojmë diçka së bashku." className="max-w-3xl" />

        <div className="mt-12 grid gap-12 md:mt-20 md:gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-24">
          {/* Informacioni + harta */}
          <div className="min-w-0 lg:col-span-5">
            <ul className="divide-y divide-accent/15 border-y border-accent/15">
              {contactItems.map(({ icon: Icon, label, value, href, copy, external: isExternal }, i) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/15 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-ink">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-[0.2em] text-mist">{label}</span>
                      <span className="mt-1 block break-words text-bone [overflow-wrap:anywhere] transition-colors duration-500 group-hover:text-gold">
                        {value}
                      </span>
                    </span>
                    {isExternal && (
                      <ArrowUpRight
                        size={16}
                        aria-hidden
                        className="ml-auto shrink-0 text-accent transition-transform duration-700 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    )}
                  </>
                )
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
                      <a
                        href={href}
                        {...(isExternal ? external : {})}
                        aria-label={isExternal ? `${value} — hap në Google Maps` : undefined}
                        className="group flex min-h-[72px] min-w-0 flex-1 items-center gap-4 py-4 sm:gap-5 sm:py-5"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group flex min-h-[72px] min-w-0 flex-1 items-center gap-4 py-4 sm:gap-5 sm:py-5">{content}</div>
                    )}
                    {copy && <CopyButton value={copy} label={label} />}
                  </motion.li>
                )
              })}
            </ul>

            {/* Të dhënat e shoqërisë */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease }}
              className="relative mt-8 border border-accent/20 bg-graphite p-5 sm:p-7"
            >
              <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-gold/70" />
              <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-gold/70" />
              <p className="eyebrow">Të dhënat e shoqërisë</p>
              {/* Mobile: etiketa sipër, vlera poshtë. Nga 640px: në një rresht. */}
              <dl className="mt-5 divide-y divide-accent/10 text-sm">
                {legal.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-mist sm:text-xs">{label}</dt>
                    <dd
                      className="break-words text-bone sm:text-right"
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            {/* Harta ndodhet te seksioni "Zyrat" */}
            <a
              href="#zyrat"
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#zyrat')
              }}
              className="group mt-8 flex items-center justify-between border-b border-accent/15 pb-4 text-xs font-medium uppercase tracking-[0.2em] text-bone transition-colors duration-500 hover:text-gold"
            >
              Shiko zyrat në hartë
              <ArrowRight size={16} className="text-accent transition-transform duration-700 ease-expo group-hover:translate-x-1" />
            </a>
          </div>

          {/* Formulari */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="relative min-w-0 lg:col-span-7"
          >
            <div className="relative border border-accent/15 bg-graphite p-5 sm:p-10 lg:p-12">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'sent' || status === 'mail' || status === 'error' ? (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex min-h-[420px] flex-col items-start justify-center sm:min-h-[540px]"
                    role="status"
                  >
                    {status === 'error' ? (
                      <Mail size={48} strokeWidth={1.25} className="text-danger" />
                    ) : (
                      <CheckCircle2 size={48} strokeWidth={1.25} className="text-accent" />
                    )}
                    <h3 className="mt-6 font-display text-2xl font-medium text-bone sm:text-3xl">
                      {status === 'sent' && 'Faleminderit!'}
                      {status === 'mail' && 'Mesazhi është gati.'}
                      {status === 'error' && 'Mesazhi nuk u dërgua.'}
                    </h3>
                    <p className="mt-3 max-w-md text-mist">
                      {status === 'sent' &&
                        "Mesazhi juaj u dërgua me sukses. Një nga inxhinierët tanë do t'ju kontaktojë brenda 24 orëve."}
                      {status === 'mail' &&
                        'U hap aplikacioni juaj i email-it me mesazhin të plotësuar. Shtypni "Dërgo" për ta nisur.'}
                      {status === 'error' &&
                        'Ndodhi një problem me lidhjen. Mund ta dërgoni të njëjtin mesazh nga aplikacioni juaj i email-it.'}
                    </p>
                    {status !== 'sent' && (
                      <p className="mt-4 max-w-md text-sm text-mist">
                        {status === 'mail' && 'Nuk u hap asgjë? Na shkruani direkt në '}
                        {status === 'error' && 'Ose na shkruani direkt në '}
                        <a
                          href={mailtoHref(company.email, composeMail(values))}
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
                    )}
                    <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                      {status === 'error' && (
                        <MagneticButton onClick={() => openMailClient(composeMail(values))} className="w-full sm:w-auto">
                          Dërgo me email <Mail size={15} />
                        </MagneticButton>
                      )}
                      <MagneticButton
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          if (status === 'mail') setValues(initial)
                          setStatus('idle')
                        }}
                      >
                        {status === 'error' ? 'Kthehu te formulari' : 'Dërgo një mesazh tjetër'}
                      </MagneticButton>
                    </div>
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
                    className="grid w-full grid-cols-1 gap-x-8 gap-y-2 sm:min-h-[540px] sm:grid-cols-2"
                  >
                    <Field label="Emri dhe mbiemri *" error={errors.name}>
                      <input className="field" value={values.name} onChange={update('name')} placeholder="p.sh. Arben Hoxha" autoComplete="name" />
                    </Field>
                    <Field label="Email *" error={errors.email}>
                      <input className="field" type="email" inputMode="email" value={values.email} onChange={update('email')} placeholder="emri@kompania.al" autoComplete="email" />
                    </Field>
                    <Field label="Telefoni" error={errors.phone}>
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
                    <Field label="Shërbimi">
                      <span className="relative block">
                        <select
                          className="field cursor-pointer appearance-none truncate bg-graphite pr-8"
                          value={values.service}
                          onChange={update('service')}
                        >
                          <option value="">Zgjidhni shërbimin</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          aria-hidden
                          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-accent"
                        />
                      </span>
                    </Field>
                    <Field label="Mesazhi *" error={errors.message} className="sm:col-span-2">
                      <textarea
                        className="field h-32 resize-none py-3"
                        value={values.message}
                        onChange={update('message')}
                        maxLength={MESSAGE_MAX}
                        placeholder="Na tregoni shkurt për projektin tuaj: lloji, vendndodhja, afati…"
                      />
                    </Field>

                    <div className="flex flex-col items-stretch justify-between gap-5 pt-4 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6">
                      <p className="text-xs leading-relaxed text-mist sm:max-w-xs">
                        Duke dërguar formularin, pranoni që t'ju kontaktojmë në lidhje me kërkesën tuaj.
                      </p>
                      <MagneticButton
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full shrink-0 disabled:opacity-70 sm:w-auto sm:min-w-[220px]"
                      >
                        {status === 'sending' ? 'Duke dërguar…' : (<>Dërgo mesazhin <ArrowRight size={16} /></>)}
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

/** Kopjon tekstin në clipboard — i dobishëm në desktop, ku tel:/mailto: shpesh s'kanë aplikacion. */
function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Rezervë për shfletues të vjetër ose kontekste jo-HTTPS
      const ta = document.createElement('textarea')
      ta.value = value
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={{ scale: 0.96 }}
      aria-label={copied ? `${label} u kopjua` : `Kopjo ${label.toLowerCase()}`}
      title={copied ? 'U kopjua' : 'Kopjo'}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-accent/15 text-mist transition-colors duration-500 hover:border-gold hover:text-gold"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'ok' : 'copy'}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          className={copied ? 'text-gold' : ''}
        >
          {copied ? <Check size={16} strokeWidth={1.75} /> : <Copy size={16} strokeWidth={1.5} />}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? 'U kopjua' : ''}
      </span>
    </motion.button>
  )
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-[0.2em] text-mist">{label}</span>
      {children}
      {/* Hapësirë e rezervuar për gabimin — pa lëvizje layout-i */}
      <span className="block h-6 pt-1.5 text-xs text-danger" aria-live="polite">
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="block"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </label>
  )
}
