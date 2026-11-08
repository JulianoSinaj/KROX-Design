import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import MagneticButton from '../ui/MagneticButton'
import { company } from '../../data/site'
import { services } from '../../data/services'
import { scrollToTarget } from '../../hooks/useLenis'

const ease = [0.22, 1, 0.36, 1]
const initial = { name: '', email: '', phone: '', service: '', message: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Ju lutem shkruani emrin.'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Email-i nuk është i vlefshëm.'
  if (v.message.trim().length < 10) e.message = 'Mesazhi duhet të ketë të paktën 10 karaktere.'
  return e
}

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    setStatus('sending')
    // TODO: lidheni me backend-in / shërbimin e email-it (p.sh. Formspree, EmailJS, API e brendshme)
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
    setValues(initial)
  }

  const contactItems = [
    { icon: Phone, label: 'Telefon', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: 'Zyra qendrore', value: company.address },
    { icon: Clock, label: 'Orari', value: company.hours },
  ]

  // Të dhënat zyrtare nga Ekstrakti i QKB-së
  const legal = [
    { label: 'Emri ligjor', value: company.legalName },
    { label: 'Emri tregtar', value: company.name },
    { label: 'NUIS', value: company.nuis },
    { label: 'Administrator', value: company.administrator },
    { label: 'Ortak', value: company.partner },
  ]

  return (
    <section id="kontakt" className="section-pad relative border-t border-accent/10">
      <div className="container-site">
        <SectionTitle index="04" label="Kontakt" title="Le të ndërtojmë diçka së bashku." className="max-w-3xl" />

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Informacioni + harta */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-accent/15 border-y border-accent/15">
              {contactItems.map(({ icon: Icon, label, value, href }, i) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/15 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-ink">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-mist">{label}</span>
                      <span className="mt-1 block text-bone">{value}</span>
                    </span>
                  </>
                )
                return (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                  >
                    {href ? (
                      <a href={href} className="group flex items-center gap-5 py-5">{content}</a>
                    ) : (
                      <div className="group flex items-center gap-5 py-5">{content}</div>
                    )}
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
              className="relative mt-8 border border-accent/20 bg-graphite p-7"
            >
              <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-gold/70" />
              <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-gold/70" />
              <p className="eyebrow">Të dhënat e shoqërisë</p>
              <dl className="mt-5 divide-y divide-accent/10 text-sm">
                {legal.map(({ label, value }) => (
                  <div key={label} className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-xs uppercase tracking-[0.18em] text-mist">{label}</dt>
                    <dd className={`text-right text-bone ${label === 'NUIS' ? 'font-display tracking-[0.12em] text-accent-light' : ''}`}>
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
            className="relative lg:col-span-7"
          >
            <div className="relative border border-accent/15 bg-graphite p-6 sm:p-12">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex min-h-[540px] flex-col items-start justify-center"
                  >
                    <CheckCircle2 size={48} strokeWidth={1.25} className="text-accent" />
                    <h3 className="mt-6 font-display text-3xl font-medium text-bone">Faleminderit!</h3>
                    <p className="mt-3 max-w-md text-mist">
                      Mesazhi juaj u dërgua me sukses. Një nga inxhinierët tanë do t'ju kontaktojë brenda 24 orëve.
                    </p>
                    <MagneticButton variant="outline" className="mt-8" onClick={() => setStatus('idle')}>
                      Dërgo një mesazh tjetër
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
                    className="grid min-h-[540px] gap-x-8 gap-y-2 sm:grid-cols-2"
                  >
                    <Field label="Emri dhe mbiemri *" error={errors.name}>
                      <input className="field" value={values.name} onChange={update('name')} placeholder="p.sh. Arben Hoxha" autoComplete="name" />
                    </Field>
                    <Field label="Email *" error={errors.email}>
                      <input className="field" type="email" value={values.email} onChange={update('email')} placeholder="emri@kompania.al" autoComplete="email" />
                    </Field>
                    <Field label="Telefoni">
                      <input className="field" type="tel" value={values.phone} onChange={update('phone')} placeholder="+355 6X XXX XXXX" autoComplete="tel" />
                    </Field>
                    <Field label="Shërbimi">
                      <select className="field cursor-pointer appearance-none bg-graphite" value={values.service} onChange={update('service')}>
                        <option value="">Zgjidhni shërbimin</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Mesazhi *" error={errors.message} className="sm:col-span-2">
                      <textarea
                        className="field h-32 resize-none py-3"
                        value={values.message}
                        onChange={update('message')}
                        placeholder="Na tregoni shkurt për projektin tuaj: lloji, vendndodhja, afati…"
                      />
                    </Field>

                    <div className="flex flex-col items-start justify-between gap-6 pt-4 sm:col-span-2 sm:flex-row sm:items-center">
                      <p className="max-w-xs text-xs text-mist">
                        Duke dërguar formularin, pranoni që t'ju kontaktojmë në lidhje me kërkesën tuaj.
                      </p>
                      <MagneticButton type="submit" disabled={status === 'sending'} className="min-w-[220px] disabled:opacity-70">
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
