import { useRef } from 'react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { company, navLinks } from '../../data/site'
import { services } from '../../data/services'
import { defaultMail, external, mailtoHref, mapsOpenUrl, telHref } from '../../data/contact'
import { scrollToTarget } from '../../hooks/useLenis'
import Logo from '../ui/Logo'
import MagneticButton from '../ui/MagneticButton'

const link = 'inline-block py-1 text-bone/80 transition-colors duration-500 ease-silk hover:text-gold'

function Column({ title, children }) {
  return (
    <div>
      <h3 className="eyebrow mb-5 md:mb-6">{title}</h3>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  )
}

export default function Footer() {
  const go = (e, href) => {
    e.preventDefault()
    scrollToTarget(href)
  }

  // Progresi ndërsa footer-i hyn në ekran: 0 kur sapo shfaqet, 1 kur arrihet fundi i faqes
  const footerRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ['start end', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.5 })

  // Watermark-u "ngrihet" si një fletë vizatimi që përkulet drejt shikuesit
  const rotateX = useTransform(progress, [0, 1], reduce ? [0, 0] : [58, 0])
  const y = useTransform(progress, [0, 1], reduce ? ['0%', '0%'] : ['32%', '0%'])
  const strokeOpacity = useTransform(progress, [0, 0.55], reduce ? [1, 1] : [0, 1])
  // Mbushja champagne zbulohet nga poshtë lart — shtresa e dytë mbi skicën me kontur
  const fillInset = useTransform(progress, [0.35, 1], reduce ? [0, 0] : [100, 0])
  const fillClip = useMotionTemplate`inset(${fillInset}% 0% 0% 0%)`

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden border-t border-accent-light/10 bg-ink">
      {/* Shtresa e pasme (z-0): "KROX" si watermark në qendër të gjithë footer-it — absolute, pa ndikim në layout */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center bg-[radial-gradient(60%_55%_at_50%_55%,rgba(212,197,185,0.04),transparent_70%)] [perspective:1400px]"
      >
        <motion.div
          className="relative w-full origin-bottom will-change-transform [transform-style:preserve-3d]"
          style={{ rotateX, y }}
        >
          {/* Kontur i hollë champagne — 14% */}
          <motion.p
            className="footer-wordmark text-transparent [-webkit-text-stroke:1px_rgba(212,197,185,0.14)]"
            style={{ opacity: strokeOpacity }}
          >
            KROX
          </motion.p>
          {/* Mbushje champagne 11% → 3% që ngjitet me scroll-in.
              Kutia zgjerohet 0.2em lart/poshtë (dhe kompensohet me padding) sepse me line-height 0.8
              majat e shkronjave dalin jashtë kutisë dhe bg-clip-text nuk i mbush. */}
          <motion.p
            className="footer-wordmark absolute inset-x-0 -inset-y-[0.2em] bg-gradient-to-t from-accent-light/[0.11] to-accent-light/[0.03] bg-clip-text py-[0.2em] text-transparent"
            style={{ clipPath: fillClip }}
          >
            KROX
          </motion.p>
        </motion.div>
      </div>

      {/* Shtresa e përparme (z-10): kolonat dhe shiriti i fundit lexohen pastër mbi watermark-un */}
      <div className="container-site relative z-10 pt-20 md:pt-24 lg:pt-28">
        {/* Mobile: njëra pas tjetrës · sm: 2 kolona · md: marka sipër + 3 kolona · lg: 4 kolona */}
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-10 md:grid-cols-3 md:gap-y-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,0.8fr)] lg:gap-x-16">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
              Projektim, zbatim punimesh ndërtimi, rikonstruksione, mbikëqyrje dhe kolaudim punimesh.
              Me qendër në {company.city}, që nga {company.founded}.
            </p>
            <ul className="mt-8 space-y-1 text-sm">
              <li>
                <a href={telHref(company.phone)} className={link}>
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={mailtoHref(company.email, defaultMail)} className={`${link} [overflow-wrap:anywhere]`}>
                  {company.email}
                </a>
              </li>
              <li>
                <a href={mapsOpenUrl(company.mapQuery)} {...external} className={`${link} !text-mist hover:!text-gold`}>
                  {company.address}
                </a>
              </li>
            </ul>
          </div>

          <Column title="Navigimi">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => go(e, l.href)} className={link}>
                  {l.label}
                </a>
              </li>
            ))}
          </Column>

          <Column title="Shërbimet">
            {services.map((s) => (
              <li key={s.id} className="py-1 text-bone/80">
                {s.title}
              </li>
            ))}
          </Column>

          <Column title="Na ndiqni">
            {company.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </Column>
        </div>

        {/* Shiriti i fundit: vijë champagne e hollë, të dhënat majtas, "Kthehu lart" djathtas */}
        <div className="mt-20 flex flex-col items-start gap-6 border-t border-accent-light/15 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 md:mt-28 lg:mt-32">
          <p className="flex min-w-0 flex-col gap-2 text-xs leading-relaxed text-mist lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-4">
            <span>
              © {new Date().getFullYear()} {company.legalName}. Të gjitha të drejtat e rezervuara.
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-accent-light/25 lg:block" />
            <span className="tracking-[0.14em] text-accent-light/70">
              Administrator: {company.administrator} · {company.city}
            </span>
          </p>
          <MagneticButton variant="gold" onClick={() => scrollToTarget(0)} className="!h-11 shrink-0 !px-6">
            Kthehu lart <ArrowUp size={14} strokeWidth={1.75} />
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}
