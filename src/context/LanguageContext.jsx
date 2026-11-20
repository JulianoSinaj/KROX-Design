import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANG, dictionaries, isLanguage, languages } from '../locales'

const STORAGE_KEY = 'krox-lang'

/** Gjuha e ruajtur nga vizita e mëparshme; përndryshe shqipja. */
function readStoredLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return isLanguage(saved) ? saved : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG // storage i bllokuar (p.sh. modalitet privat) — mbetet gjuha bazë
  }
}

const LanguageContext = createContext(null)

/**
 * Ofron gjuhën aktive për gjithë faqen:
 *   const { t, lang, setLang, languages } = useLanguage()
 *   t.hero.lead · t.nav.links.about · t.locations.count(2)
 */
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLanguage)

  const setLang = useCallback((next) => {
    if (!isLanguage(next)) return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage i bllokuar — gjuha ndryshon vetëm për këtë vizitë */
    }
  }, [])

  // Nëse gjuha ndryshohet në një skedë tjetër të faqes, ndiqet edhe këtu
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && isLanguage(e.newValue)) setLangState(e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // <html lang> — për lexuesit e ekranit, përkthyesin e shfletuesit dhe motorët e kërkimit
  useEffect(() => {
    document.documentElement.lang = languages.find((l) => l.id === lang).htmlLang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang], languages }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage() duhet thirrur brenda <LanguageProvider>.')
  return ctx
}
