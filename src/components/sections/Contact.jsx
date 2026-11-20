import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, Clock, Mail, MapPin, Phone } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import MagneticButton from '../ui/MagneticButton'
import CopyButton from '../ui/CopyButton'
import Field from '../ui/Field'
import { company } from '../../data/site'
import { services } from '../../data/services'
import { external, mailtoHref, mapsOpenUrl, telHref } from '../../data/contact'
import { scrollToTarget } from '../../hooks/useLenis'
import { useLanguage } from '../../context/LanguageContext'

const ease = [0.22, 1, 0.36, 1]
const initial = { name: '', email: '', phone: '', service: '', message: '' }
const MESSAGE_MAX = 1500 // mailto ka kufi gjatësie në disa klientë

/**
 * Opsionale: një endpoint që pranon POST JSON (p.sh. Formspree: https://formspree.io/f/xxxx).
 * Vendoseni te .env si VITE_CONTACT_ENDPOINT=... — pa të, formulari hap aplikacionin
 * e email-it me mesazhin të parambushur drejt adresës së kompanisë.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

/** Kthen fushat me gabim ({ email: true, … }); mesazhi shfaqet në gjuhën aktive (t.contact.errors). */
function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = true
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = true
  if (v.phone.trim() && !/^\+?[\d\s()-]{6,20}$/.test(v.phone.trim())) e.phone = true
  if (v.message.trim().length < 10) e.message = true
  return e
}

/** Ndërton subjektin dhe tekstin e email-it nga fushat e formularit, në gjuhën aktive. */
function composeMail(v, t) {
  const m = t.mail.request
  const service = t.services.items[v.service]?.title
  const subject = m.subject(v.name.trim(), service)
  const details = [
    `${m.name}: ${v.name.trim()}`,
    `${m.email}: ${v.email.trim()}`,
    v.phone.trim() && `${m.phone}: ${v.phone.trim()}`,
    service && `${m.service}: ${service}`,
  ].filter(Boolean)
  const body = `${details.join('\n')}\n\n${v.message.trim()}`
  return { subject, body, service }
}

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mail | error

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }
  const errorFor = (key) => (errors[key] ? c.errors[key] : undefined)

  const openMailClient = (mail) => {
    window.location.href = mailtoHref(company.email, mail)
    setStatus('mail')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    const mail = composeMail(values, t)

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
    { id: 'phone', icon: Phone, label: c.items.phone, value: company.phone, href: telHref(company.phone), copy: company.phone },
    { id: 'email', icon: Mail, label: c.items.email, value: company.email, href: mailtoHref(company.email, t.mail.default), copy: company.email },
    { id: 'office', icon: MapPin, label: c.items.office, value: t.common.address, href: mapsOpenUrl(company.mapQuery), external: true },
    { id: 'hours', icon: Clock, label: c.items.hours, value: t.common.hours },
  ]

  // Të dhënat zyrtare nga Ekstrakti i QKB-së — vlerat nuk përkthehen, vetëm etiketat
  const legal = [
    { id: 'legalName', label: c.legal.legalName, value: company.legalName },
    { id: 'tradeName', label: c.legal.tradeName, value: company.name },
    { id: 'administrator', label: c.legal.administrator, value: company.administrator },
  ]

  return (
    <section id="kontakt" className="section-pad relative border-t border-accent/10">
      <div className="container-site">
        <SectionTitle index="05" label={c.label} title={c.title} className="max-w-3xl" />

        <div className="mt-12 grid gap-12 md:mt-20 md:gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-24">
          {/* Informacioni + harta */}
          <div className="min-w-0 lg:col-span-5">
            <ul className="divide-y divide-accent/15 border-y border-accent/15">
              {contactItems.map(({ id, icon: Icon, label, value, href, copy, external: isExternal }, i) => {
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
                    key={id}
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
                        aria-label={isExternal ? c.openInMaps(value) : undefined}
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
              <p className="eyebrow">{c.companyDetails}</p>
              {/* Mobile: etiketa sipër, vlera poshtë. Nga 640px: në një rresht. */}
              <dl className="mt-5 divide-y divide-accent/10 text-sm">
                {legal.map(({ id, label, value }) => (
                  <div
                    key={id}
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
              {c.viewMap}
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
                      {status === 'sent' && c.status.sentTitle}
                      {status === 'mail' && c.status.mailTitle}
                      {status === 'error' && c.status.errorTitle}
                    </h3>
                    <p className="mt-3 max-w-md text-mist">
                      {status === 'sent' && c.status.sentText}
                      {status === 'mail' && c.status.mailText}
                      {status === 'error' && c.status.errorText}
                    </p>
                    {status !== 'sent' && (
                      <p className="mt-4 max-w-md text-sm text-mist">
                        {status === 'mail' && c.status.mailFallback}
                        {status === 'error' && c.status.errorFallback}
                        <a
                          href={mailtoHref(company.email, composeMail(values, t))}
                          className="break-all text-accent-light underline decoration-accent/40 underline-offset-4 transition-colors duration-500 hover:text-gold"
                        >
                          {company.email}
                        </a>{' '}
                        {c.status.orCall}{' '}
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
                        <MagneticButton onClick={() => openMailClient(composeMail(values, t))} className="w-full sm:w-auto">
                          {c.status.sendByEmail} <Mail size={15} />
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
                        {status === 'error' ? c.status.backToForm : c.status.sendAnother}
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
                    <Field label={c.form.name} error={errorFor('name')}>
                      <input className="field" value={values.name} onChange={update('name')} placeholder={c.form.namePlaceholder} autoComplete="name" />
                    </Field>
                    <Field label={c.form.email} error={errorFor('email')}>
                      <input className="field" type="email" inputMode="email" value={values.email} onChange={update('email')} placeholder={c.form.emailPlaceholder} autoComplete="email" />
                    </Field>
                    <Field label={c.form.phone} error={errorFor('phone')}>
                      <input
                        className="field"
                        type="tel"
                        inputMode="tel"
                        value={values.phone}
                        onChange={update('phone')}
                        placeholder={c.form.phonePlaceholder}
                        autoComplete="tel"
                      />
                    </Field>
                    <Field label={c.form.service}>
                      <span className="relative block">
                        <select
                          className="field cursor-pointer appearance-none truncate bg-graphite pr-8"
                          value={values.service}
                          onChange={update('service')}
                        >
                          <option value="">{c.form.servicePlaceholder}</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.id}>{t.services.items[s.id]?.title}</option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          aria-hidden
                          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-accent"
                        />
                      </span>
                    </Field>
                    <Field label={c.form.message} error={errorFor('message')} className="sm:col-span-2">
                      <textarea
                        className="field h-32 resize-none py-3"
                        value={values.message}
                        onChange={update('message')}
                        maxLength={MESSAGE_MAX}
                        placeholder={c.form.messagePlaceholder}
                      />
                    </Field>

                    <div className="flex flex-col items-stretch justify-between gap-5 pt-4 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6">
                      <p className="text-xs leading-relaxed text-mist sm:max-w-xs">{c.form.consent}</p>
                      <MagneticButton
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full shrink-0 disabled:opacity-70 sm:w-auto sm:min-w-[220px]"
                      >
                        {status === 'sending' ? c.form.sending : (<>{c.form.submit} <ArrowRight size={16} /></>)}
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
