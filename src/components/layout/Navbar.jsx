import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { company, navLinks } from '../../data/site'
import { getLenis, scrollToTarget } from '../../hooks/useLenis'
import Logo from '../ui/Logo'
import MagneticButton from '../ui/MagneticButton'

const ease = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 500)
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
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 will-change-transform ${
          scrolled || open ? 'border-white/10 bg-ink/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="container-site flex h-[72px] items-center justify-between">
          <a href="#top" onClick={(e) => go(e, 0)} aria-label={`${company.name} — kreu`}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.slice(0, 3).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className="group relative block overflow-hidden text-sm text-mist transition-colors duration-300 hover:text-bone"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-expo group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <MagneticButton href="#kontakt" onClick={(e) => go(e, '#kontakt')} className="!h-11 !px-6">
              Na kontaktoni
            </MagneticButton>
          </div>

          {/* Butoni i menusë mobile */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Mbyll menunë' : 'Hap menunë'}
            aria-expanded={open}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 md:hidden"
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
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-graphite px-4 pb-10 pt-28 sm:px-6 md:hidden"
          >
            <ul className="space-y-2">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.06 }}
                    className="flex items-baseline gap-4 py-2 font-display text-5xl font-medium text-bone"
                  >
                    <span className="text-xs text-accent">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.45 } }}
              exit={{ opacity: 0 }}
              className="space-y-1 text-sm text-mist"
            >
              <p>{company.phone}</p>
              <p>{company.email}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
