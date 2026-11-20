import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const ease = [0.22, 1, 0.36, 1]
const glide = { type: 'spring', stiffness: 380, damping: 32 }

/**
 * Përzgjedhësi i gjuhës — ALB | ENG | ITA. Gjuha aktive dallohet me gold.
 *   variant="bar"      → kodet në një rresht + vijë gold që rrëshqet (desktop i gjerë, xl+)
 *   variant="dropdown" → kompakt: kodi aktiv + listë rënëse (desktop i ngushtë, lg–xl, ku linqet zënë vend)
 *   variant="menu"     → tre butona të mëdhenj për prekje, brenda menusë mobile
 * Zgjedhja ruhet te localStorage nga LanguageProvider.
 */
export default function LanguageSwitcher({ variant = 'bar', className = '' }) {
  if (variant === 'menu') return <MenuSwitcher className={className} />
  if (variant === 'dropdown') return <DropdownSwitcher className={className} />
  return <BarSwitcher className={className} />
}

function BarSwitcher({ className }) {
  const { lang, setLang, languages, t } = useLanguage()
  // layoutId unik për çdo instancë, që treguesi të mos "fluturojë" mes përzgjedhësve të ndryshëm
  const uid = useId()

  return (
    <div role="group" aria-label={t.nav.language} className={`flex items-center ${className}`}>
      {languages.map((l, i) => {
        const active = l.id === lang
        return (
          <Fragment key={l.id}>
            {i > 0 && <span aria-hidden className="h-3 w-px bg-accent/25" />}
            <button
              type="button"
              lang={l.htmlLang}
              aria-pressed={active}
              aria-label={`${l.code} — ${l.name}`}
              title={l.name}
              onClick={() => setLang(l.id)}
              className={`flex h-11 items-center px-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ease-silk ${
                active ? 'text-gold' : 'text-mist hover:text-accent-light'
              }`}
            >
              <span className="relative">
                {l.code}
                {active && (
                  <motion.span
                    layoutId={`${uid}-line`}
                    aria-hidden
                    // right: kompenson hapësirën e letter-spacing pas shkronjës së fundit
                    className="absolute -bottom-1.5 left-0 right-[0.18em] h-px bg-gold"
                    transition={glide}
                  />
                )}
              </span>
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}

function DropdownSwitcher({ className }) {
  const { lang, setLang, languages, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const listId = useId()
  const current = languages.find((l) => l.id === lang)

  // Mbyll me klik jashtë ose me Escape
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t.nav.language}: ${current.name} (${current.code})`}
        onClick={() => setOpen((o) => !o)}
        className="group flex h-11 items-center gap-1.5 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gold"
      >
        <span className="relative">
          {current.code}
          <span aria-hidden className="absolute -bottom-1.5 left-0 right-[0.18em] h-px bg-gold" />
        </span>
        <ChevronDown
          size={13}
          aria-hidden
          className={`text-accent transition-transform duration-500 ease-expo group-hover:text-gold ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="group"
            aria-label={t.nav.language}
            initial={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease }}
            className="absolute right-0 top-full mt-3 min-w-[184px] border border-gold/30 bg-[#1A1D21] py-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            {languages.map((l) => {
              const active = l.id === lang
              return (
                <li key={l.id}>
                  <button
                    type="button"
                    lang={l.htmlLang}
                    aria-pressed={active}
                    onClick={() => {
                      setLang(l.id)
                      setOpen(false)
                    }}
                    className={`flex h-11 w-full items-center justify-between gap-6 px-4 transition-colors duration-300 ${
                      active ? 'bg-gold/10 text-gold' : 'text-mist hover:bg-gold/5 hover:text-bone'
                    }`}
                  >
                    <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em]">
                      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-gold' : 'bg-gold/20'}`} />
                      {l.code}
                    </span>
                    <span className={`text-xs ${active ? 'text-gold/80' : 'text-mist/70'}`}>{l.name}</span>
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function MenuSwitcher({ className }) {
  const { lang, setLang, languages, t } = useLanguage()
  const uid = useId()

  return (
    <div role="group" aria-label={t.nav.language} className={`grid grid-cols-3 border border-accent/20 ${className}`}>
      {languages.map((l, i) => {
        const active = l.id === lang
        return (
          <button
            key={l.id}
            type="button"
            lang={l.htmlLang}
            aria-pressed={active}
            onClick={() => setLang(l.id)}
            className={`relative flex h-16 flex-col items-center justify-center gap-1 transition-colors duration-500 ease-silk ${
              i > 0 ? 'border-l border-accent/20' : ''
            } ${active ? 'text-gold' : 'text-mist hover:text-bone'}`}
          >
            {active && (
              <motion.span
                layoutId={`${uid}-cell`}
                aria-hidden
                className="absolute -inset-px border border-gold bg-gold/[0.08]"
                transition={glide}
              />
            )}
            <span className="relative text-[13px] font-medium uppercase tracking-[0.2em]">{l.code}</span>
            <span className={`relative text-[11px] transition-colors duration-500 ${active ? 'text-gold/70' : 'text-mist/60'}`}>
              {l.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
