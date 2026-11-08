import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import MagneticButton from '../ui/MagneticButton'
import {
  formatCoords,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  mapsOpenUrl,
  officeStatus,
  offices,
  telHref,
} from '../../data/offices'

const ease = [0.22, 1, 0.36, 1]

const list = { show: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

/** Ora aktuale, rifreskohet çdo minutë (për statusin Hapur/Mbyllur). */
function useNow(interval = 60_000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), interval)
    return () => clearInterval(id)
  }, [interval])
  return now
}

export default function Locations() {
  const [activeId, setActiveId] = useState(offices[0].id)
  const now = useNow()
  const statuses = useMemo(() => Object.fromEntries(offices.map((o) => [o.id, officeStatus(o, now)])), [now])
  const active = offices.find((o) => o.id === activeId) ?? offices[0]
  const count = offices.length === 1 ? '1 zyrë' : `${offices.length} zyra`

  return (
    <section id="zyrat" className="section-pad relative border-t border-accent/10">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle index="05" label="Zyrat" title="Ku të na gjeni." />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="max-w-sm text-mist"
          >
            Na vizitoni në zyrë për një takim mbi projektin tuaj, ose na kontaktoni drejtpërdrejt.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Lista e zyrave */}
          <div className="flex flex-col lg:col-span-5">
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={list}
              className="space-y-4"
            >
              {offices.map((o, i) => (
                <OfficeCard
                  key={o.id}
                  office={o}
                  index={i}
                  active={o.id === active.id}
                  status={statuses[o.id]}
                  onSelect={() => setActiveId(o.id)}
                />
              ))}
            </motion.ul>

            <div className="mt-8 flex flex-wrap gap-4 lg:mt-auto lg:pt-8">
              <MagneticButton href={mapsDirectionsUrl(active)} target="_blank" rel="noopener noreferrer">
                <Navigation size={15} /> Udhëzime
              </MagneticButton>
              <MagneticButton variant="outline" href={telHref(active.phone)}>
                <Phone size={15} /> Telefono
              </MagneticButton>
            </div>
          </div>

          {/* Harta */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease, delay: 0.1 }}
            className="relative min-h-[380px] overflow-hidden border border-accent/20 bg-onyx shadow-card lg:col-span-7 lg:min-h-[560px]"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease }}
              >
                <iframe
                  title={`Harta — ${active.name}`}
                  src={mapsEmbedUrl(active)}
                  className="h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </AnimatePresence>

            {/* Tonalitet champagne mbi hartë */}
            <div className="pointer-events-none absolute inset-0 bg-accent/15 mix-blend-color" />

            {/* Qoshe gold */}
            {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((pos) => (
              <span key={pos} className={`pointer-events-none absolute h-6 w-6 border-gold/70 ${pos}`} />
            ))}

            {/* Etiketa e zyrës aktive */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease }}
                className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-3 border border-accent/25 bg-ink/80 px-4 py-2.5 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent-light">{active.name}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Shiriti i poshtëm */}
        <div className="hairline mt-14" />
        <div className="mt-6 flex flex-col gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-mist sm:flex-row sm:items-center sm:justify-between">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="tabular-nums"
            >
              {formatCoords(active.coords)} — {active.city}, {active.country}
            </motion.p>
          </AnimatePresence>
          <p className="flex items-center gap-2">
            <MapPin size={12} className="text-gold" /> {count} · një standard cilësie
          </p>
        </div>
      </div>
    </section>
  )
}

function StatusChip({ open }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${
        open ? 'border-gold/40 text-gold' : 'border-accent/20 text-mist'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${open ? 'bg-gold' : 'bg-mist/60'}`} />
      {open ? 'Hapur' : 'Mbyllur'}
    </span>
  )
}

function OfficeCard({ office, index, active, status, onSelect }) {
  const panelId = `zyra-${office.id}`

  return (
    <motion.li
      variants={item}
      className={`relative overflow-hidden border bg-graphite transition-[border-color] duration-700 ease-silk ${
        active ? 'border-accent/35' : 'border-accent/15 hover:border-accent/35'
      }`}
    >
      {/* Shirit gold për zyrën aktive */}
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-[3px] origin-top bg-gold transition-transform duration-700 ease-expo ${
          active ? 'scale-y-100' : 'scale-y-0'
        }`}
      />

      <button
        type="button"
        onClick={onSelect}
        aria-expanded={active}
        aria-controls={panelId}
        className="group flex w-full items-start gap-5 p-7 text-left sm:gap-7 sm:p-8"
      >
        <span
          className={`font-display text-4xl font-medium leading-none tabular-nums transition-colors duration-700 sm:text-5xl ${
            active ? 'text-accent/45' : 'text-accent/15 group-hover:text-accent/30'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-3">
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-accent/40" />
              {office.label}
            </span>
            {status && <StatusChip open={status.open} />}
          </span>
          <span className="mt-4 block font-display text-2xl font-medium leading-tight text-bone sm:text-3xl">
            {office.name}
          </span>
          <span className="mt-3 flex items-center gap-2 text-sm text-mist">
            <MapPin size={14} className="shrink-0 text-accent" /> {office.address}
          </span>
        </span>

        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-accent transition-transform duration-700 ease-expo ${
            active ? 'rotate-0' : '-rotate-90 group-hover:rotate-0'
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            className="overflow-hidden"
          >
            <div className="mx-7 space-y-4 border-t border-accent/15 py-7 text-sm sm:mx-8">
              {status && (
                <p className="flex items-center gap-3 text-bone/90">
                  <Clock size={15} className="shrink-0 text-accent" />
                  Sot ({status.dayName}):
                  <span className={status.open ? 'text-accent-light' : 'text-mist'}>{status.today}</span>
                </p>
              )}
              <a
                href={telHref(office.phone)}
                className="flex items-center gap-3 text-bone/90 transition-colors duration-500 hover:text-gold"
              >
                <Phone size={15} className="shrink-0 text-accent" /> {office.phone}
              </a>
              <a
                href={`mailto:${office.email}`}
                className="flex items-center gap-3 text-bone/90 transition-colors duration-500 hover:text-gold"
              >
                <Mail size={15} className="shrink-0 text-accent" /> {office.email}
              </a>
              <div className="pt-3">
                <MagneticButton
                  variant="outline"
                  href={mapsOpenUrl(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!h-12 !px-7"
                >
                  Hap në Google Maps <ArrowUpRight size={15} />
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
