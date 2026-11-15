import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Mail, Phone, Plus } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import MagneticButton from '../ui/MagneticButton'
import { faqs } from '../../data/faq'
import { company } from '../../data/site'
import { defaultMail, mailtoHref, telHref } from '../../data/contact'
import { goTo } from '../../hooks/useRoute'

const ease = [0.22, 1, 0.36, 1]

export default function Faq() {
  // Një pyetje e hapur në një kohë; e para hapur si fillim
  const [open, setOpen] = useState(0)

  return (
    <section id="pyetje" className="section-pad relative border-t border-accent/10">
      <div className="container-site">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-24">
          {/* Titulli + kontakti i shpejtë */}
          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionTitle index="06" label="Pyetje të shpeshta" title="Përgjigje të qarta, përpara se të nisim." />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="mt-8 max-w-md text-mist"
              >
                Nuk e gjeni përgjigjen që kërkoni? Na telefononi ose na shkruani — ju përgjigjemi brenda orarit të
                punës, {company.hours}.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.3 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
              >
                <MagneticButton href={telHref(company.phone)} className="w-full sm:w-auto">
                  <Phone size={15} /> Telefononi
                </MagneticButton>
                <MagneticButton variant="outline" href={mailtoHref(company.email, defaultMail)} className="w-full sm:w-auto">
                  <Mail size={15} /> Na shkruani
                </MagneticButton>
              </motion.div>
            </div>
          </div>

          {/* Lista e pyetjeve */}
          <motion.ul
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="min-w-0 divide-y divide-accent/15 border-y border-accent/15 lg:col-span-7"
          >
            {faqs.map((item, i) => (
              <FaqItem key={item.q} item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

function FaqItem({ item, index, open, onToggle }) {
  const id = `pyetja-${index + 1}`

  return (
    <li className="relative">
      {/* Shirit gold për pyetjen e hapur */}
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-[3px] origin-top bg-gold transition-transform duration-700 ease-expo ${
          open ? 'scale-y-100' : 'scale-y-0'
        }`}
      />
      <h3 className="font-sans tracking-normal">
        <button
          type="button"
          id={`${id}-btn`}
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-start gap-4 py-6 pl-5 pr-1 text-left sm:gap-6 sm:py-8 sm:pl-8"
        >
          <span
            className={`w-5 shrink-0 pt-1 text-xs font-medium tabular-nums transition-colors duration-500 ${
              open ? 'text-gold' : 'text-accent/50 group-hover:text-accent'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`min-w-0 flex-1 font-display text-lg font-medium leading-snug transition-colors duration-500 sm:text-xl ${
              open ? 'text-bone' : 'text-bone/85 group-hover:text-bone'
            }`}
          >
            {item.q}
          </span>
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[border-color,color,transform] duration-700 ease-expo ${
              open ? 'rotate-45 border-gold text-gold' : 'border-accent/25 text-accent group-hover:border-gold'
            }`}
          >
            <Plus size={16} strokeWidth={1.5} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={`${id}-btn`}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-14 pr-4 sm:pb-9 sm:pl-[4.75rem] sm:pr-16">
              <p className="max-w-2xl leading-relaxed text-mist">{item.a}</p>
              {item.link && (
                <a
                  href={item.link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    goTo(item.link.href)
                  }}
                  className="group/link mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-light transition-colors duration-500 hover:text-gold"
                >
                  {item.link.label}
                  <ArrowRight size={14} className="transition-transform duration-700 ease-expo group-hover/link:translate-x-1" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
