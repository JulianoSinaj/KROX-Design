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

  return (
    <footer className="relative overflow-hidden border-t border-accent/15 bg-ink">
      <div className="container-site pb-10 pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
              Projektim, zbatim punimesh ndërtimi, rikonstruksione, mbikëqyrje dhe kolaudim punimesh.
              Me qendër në {company.city}, që nga {company.founded}.
            </p>
            <ul className="mt-8 space-y-2 text-sm">
              <li>
                <a href={telHref(company.phone)} className="text-bone/80 transition-colors duration-500 hover:text-gold">
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={mailtoHref(company.email, defaultMail)}
                  className="text-bone/80 transition-colors duration-500 hover:text-gold"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={mapsOpenUrl(company.mapQuery)}
                  {...external}
                  className="text-mist transition-colors duration-500 hover:text-gold"
                >
                  {company.address}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-mist">Navigimi</h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => go(e, l.href)} className="text-bone/80 transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-mist">Shërbimet</h3>
            <ul className="space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.id} className="text-bone/80">
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-mist">Na ndiqni</h3>
            <ul className="space-y-3 text-sm">
              {company.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-bone/80 transition-colors hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fjala e madhe e markës */}
        <p
          aria-hidden
          className="pointer-events-none mt-20 select-none whitespace-nowrap font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-[0.8] tracking-tighter text-white/[0.04]"
        >
          KROX DESIGN
        </p>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-accent/15 pt-8 text-xs text-mist sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {company.legalName} · {company.name}. Të gjitha të drejtat e rezervuara.
            </p>
            <p className="tracking-[0.12em] text-accent/70">
              NUIS {company.nuis} · Administrator: {company.administrator}
            </p>
          </div>
          <MagneticButton variant="outline" onClick={() => scrollToTarget(0)} className="!h-11 !px-5">
            Kthehu lart <ArrowUp size={14} />
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}
