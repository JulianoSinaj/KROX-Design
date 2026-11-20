import alb from './alb'
import eng from './eng'
import ita from './ita'

export const DEFAULT_LANG = 'alb'

/** Gjuhët e faqes, në rendin e shfaqjes te përzgjedhësi (ALB | ENG | ITA). */
export const languages = [
  { id: 'alb', code: 'ALB', name: 'Shqip', htmlLang: 'sq' },
  { id: 'eng', code: 'ENG', name: 'English', htmlLang: 'en' },
  { id: 'ita', code: 'ITA', name: 'Italiano', htmlLang: 'it' },
]

export const isLanguage = (id) => languages.some((l) => l.id === id)

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

/**
 * Vendos përkthimin mbi shqipen: çdo çelës që mungon te eng.js / ita.js
 * shfaqet në shqip, që faqja të mos ketë kurrë tekste bosh (p.sh. një projekt i ri pa përkthim).
 * Listat (array) dhe funksionet zëvendësohen të plota, nuk bashkohen.
 */
function withFallback(base, override) {
  if (override === undefined) return base
  if (!isPlainObject(base) || !isPlainObject(override)) return override
  const out = { ...base }
  for (const key of Object.keys(override)) out[key] = withFallback(base[key], override[key])
  return out
}

export const dictionaries = {
  alb,
  eng: withFallback(alb, eng),
  ita: withFallback(alb, ita),
}

/**
 * Bashkon të dhënat strukturore (id, ikonë, foto, koordinata…) me tekstet e gjuhës aktive, sipas `id`.
 * p.sh. localize(services, t.services.items) → [{ id, icon, title, text, points }, …]
 */
export const localize = (items, texts = {}) => items.map((item) => ({ ...item, ...texts[item.id] }))
