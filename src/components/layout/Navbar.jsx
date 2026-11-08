import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { company, navLinks } from '../../data/site'
import { getLenis, scrollToTarget } from '../../hooks/useLenis'
import { defaultMail, external, mailtoHref, mapsOpenUrl, telHref } from '../../data/contact'
import Logo from '../ui/Logo'
import MagneticButton from '../ui/MagneticButton'

const ease = [0.22, 1, 0.36, 1]

/** Gjen seksionin që është aktualisht në mes të ekranit. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.querySelector(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

const sectionIds = navLinks.map((l) => l.href)

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    const delta = y - prev
    setScrolled(y > 40)
    // Prag i vogël që navbar-i të mos "dridhet" me lëvizje të vogla scroll-i
    if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 600)
  })

  // Bllokon scroll-in kur menuja mobile është e hapur
  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(href)
  }

  return (
    <>
      <motion.header
        initial={{ y: '-100%' }}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.8, ease }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-700 ease-silk will-change-transform ${
          scrolled || open ? 'border-accent/15 bg-ink/75 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="container-site flex h-20 items-center justify-between">
          <a href="#top" onClick={(e) => go(e, 0)} aria-label={`${company.name} — kreu`}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-12 md:flex">
            {navLinks.filter((l) => l.href !== '#kontakt').map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative flex items-center gap-2 py-2 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${
                      isActive ? 'text-accent-light' : 'text-mist hover:text-bone'
                    }`}
                  >
                    {/* Pika gold për seksionin aktiv */}
                    <span
                      className={`h-1 w-1 rounded-full bg-gold transition-[opacity,transform] duration-500 ease-expo ${
                        isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                    />
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-gradient-to-r from-gold to-accent transition-transform duration-700 ease-expo group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="hidden md:block">
            <MagneticButton variant="outline" href="#kontakt" onClick={(e) => go(e, '#kontakt')} className="!h-11 !px-7">
              Na kontaktoni
            </MagneticButton>
          </div>

          {/* Butoni i menusë mobile */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Mbyll menunë' : 'Hap menunë'}
            aria-expanded={open}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 transition-colors duration-500 hover:border-gold md:hidden"
          >
            <span
              className={`absolute h-px w-5 bg-bone transition-transform duration-500 ease-expo ${
                open ? 'rotate-45' : '-translate-y-[4px]'
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-bone transition-transform duration-500 ease-expo ${
                open ? '-rotate-45' : 'translate-y-[4px]'
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Menuja mobile në ekran të plotë */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-12 pt-32 sm:px-8 md:hidden"
          >
            <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-60" />
            <ul className="relative space-y-3">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden border-b border-accent/15">
                  <motion.a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.07 }}
                    className="flex items-baseline gap-5 py-4 font-display text-4xl font-medium text-bone"
                  >
                    <span className="text-xs text-gold">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="relative space-y-1 text-sm text-mist"
            >
              <p className="eyebrow mb-3">Kontakt</p>
              <a href={telHref(company.phone)} className="block py-1 transition-colors duration-500 hover:text-gold">
                {company.phone}
              </a>
              <a
                href={mailtoHref(company.email, defaultMail)}
                className="block py-1 transition-colors duration-500 hover:text-gold"
              >
                {company.email}
              </a>
              <a
                href={mapsOpenUrl(company.mapQuery)}
                {...external}
                className="block py-1 transition-colors duration-500 hover:text-gold"
              >
                {company.address}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
