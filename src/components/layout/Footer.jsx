import { useRef } from 'react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { company, navLinks } from '../../data/site'
import { services } from '../../data/services'
import { defaultMail, external, mailtoHref, mapsOpenUrl, telHref } from '../../data/contact'
import { scrollToTarget } from '../../hooks/useLenis'
import Logo from '../ui/Logo'
import MagneticButton from '../ui/MagneticButton'

export default function Footer() {
  const go = (e, href) => {
    e.preventDefault()
    scrollToTarget(href)
  }

  const footerRef = useRef(null)
  const reduce = useReducedMotion()
  // Progresi ndërsa footer-i hyn në ekran: 0 kur sapo shfaqet, 1 kur fundi i tij arrin fundin e ekranit
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ['start end', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.5 })

  // Fjala "ngrihet" nga plani si një fletë vizatimi që përkulet drejt shikuesit
  const rotateX = useTransform(progress, [0, 1], reduce ? [0, 0] : [62, 0])
  const y = useTransform(progress, [0, 1], reduce ? ['0%', '0%'] : ['28%', '0%'])
  const strokeOpacity = useTransform(progress, [0, 0.6], reduce ? [1, 1] : [0, 1])
  // Mbushja champagne zbulohet nga poshtë lart — shtresa e dytë mbi skicën me kontur
  const fillInset = useTransform(progress, [0.35, 1], reduce ? [0, 0] : [100, 0])
  const fillClip = useMotionTemplate`inset(${fillInset}% 0% 0% 0%)`

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden border-t border-accent/15 bg-ink">
      {/* Sfondi: "KROX" si skicë arkitekturore — absolute, z-0, pa ndikim në layout */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none [perspective:1400px]"
      >
        <motion.div
          className="relative origin-bottom will-change-transform [transform-style:preserve-3d]"
          style={{ rotateX, y }}
        >
          {/* Kontur i hollë champagne */}
          <motion.p
            className="footer-wordmark text-transparent [-webkit-text-stroke:1px_rgba(212,197,185,0.28)]"
            style={{ opacity: strokeOpacity }}
          >
            KROX
          </motion.p>
          {/* Mbushje shumë e lehtë që ngjitet me scroll-in */}
          <motion.p
            className="footer-wordmark absolute inset-0 bg-gradient-to-t from-accent-light/[0.07] to-accent-light/[0.015] bg-clip-text text-transparent"
            style={{ clipPath: fillClip }}
          >
            KROX
          </motion.p>
        </motion.div>
      </div>

      <div className="container-site relative z-10 pb-8 pt-16 md:pb-10 md:pt-20">
        {/* Mobile: marka sipër, Navigimi + Na ndiqni në dy kolona, Shërbimet poshtë. Nga md: 12 kolona. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-12">
          <div className="col-span-2 md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
              Projektim, zbatim punimesh ndërtimi, rikonstruksione, mbikëqyrje dhe kolaudim punimesh.
              Me qendër në {company.city}, që nga {company.founded}.
            </p>
            <ul className="mt-6 space-y-1 text-sm md:mt-8">
              <li>
                <a href={telHref(company.phone)} className="inline-block py-1 text-bone/80 transition-colors duration-500 hover:text-gold">
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={mailtoHref(company.email, defaultMail)}
                  className="inline-block break-all py-1 text-bone/80 transition-colors duration-500 hover:text-gold"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={mapsOpenUrl(company.mapQuery)}
                  {...external}
                  className="inline-block py-1 text-mist transition-colors duration-500 hover:text-gold"
                >
                  {company.address}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-mist md:mb-5">Navigimi</h3>
            <ul className="space-y-1 text-sm md:space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => go(e, l.href)} className="inline-block py-1 text-bone/80 transition-colors hover:text-accent md:py-0">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 max-md:order-last md:col-span-3">
            <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-mist md:mb-5">Shërbimet</h3>
            <ul className="space-y-2 text-sm md:space-y-3">
              {services.map((s) => (
                <li key={s.id} className="text-bone/80">
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-mist md:mb-5">Na ndiqni</h3>
            <ul className="space-y-1 text-sm md:space-y-3">
              {company.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="inline-block py-1 text-bone/80 transition-colors hover:text-accent md:py-0">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hapësirë e lirë ku fjala e sfondit duket e pastër, mes kolonave dhe shiritit të poshtëm */}
        <div aria-hidden className="h-[22vw] md:h-[16vw]" />

        <div className="mt-8 flex flex-col items-stretch justify-between gap-6 border-t border-accent/15 pt-8 text-xs text-mist sm:flex-row sm:items-center md:mt-10">
          <div className="space-y-3 sm:space-y-1">
            <p className="leading-relaxed">
              © {new Date().getFullYear()} {company.legalName} · {company.name}. Të gjitha të drejtat e rezervuara.
            </p>
            {/* Të dhënat zyrtare: një për rresht në mobile, në një rresht nga 640px */}
            <p className="flex flex-col gap-1 tracking-[0.12em] text-accent/70 sm:flex-row sm:flex-wrap sm:gap-x-2">
              <span>Administrator: {company.administrator}</span>
              <span aria-hidden className="hidden sm:inline">·</span>
              <span>{company.city}</span>
            </p>
          </div>
          <MagneticButton variant="outline" onClick={() => scrollToTarget(0)} className="!h-11 shrink-0 !px-5 self-start sm:self-auto">
            Kthehu lart <ArrowUp size={14} />
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}
