import { useSyncExternalStore } from 'react'
import { scrollToTarget } from './useLenis'

// Router minimal pa librari: faqja kryesore "/" dhe faqet më vete (p.sh. "/karriera").
// Në Vercel, vercel.json i kthen të gjitha adresat te index.html, që /karriera të hapet edhe direkt.

const listeners = new Set()
const notify = () => listeners.forEach((l) => l())

function subscribe(cb) {
  listeners.add(cb)
  window.addEventListener('popstate', cb)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('popstate', cb)
  }
}

/** "/Karriera/" → "/karriera" */
export const currentPath = () => window.location.pathname.replace(/\/+$/, '').toLowerCase() || '/'

/** Rruga aktuale; komponenti rifreskohet kur ndryshon (navigim ose butoni "Prapa"). */
export const usePath = () => useSyncExternalStore(subscribe, currentPath)

/** Kalon në një faqe tjetër pa ringarkim, p.sh. navigate('/karriera') ose navigate('/#kontakt'). */
export function navigate(to) {
  const url = new URL(to, window.location.origin)
  if (url.pathname + url.hash === window.location.pathname + window.location.hash) return
  window.history.pushState({}, '', url.pathname + url.search + url.hash)
  notify()
}

const findTarget = (hash) => {
  try {
    return document.querySelector(hash)
  } catch {
    return null
  }
}

/**
 * Një pikë e vetme për çdo lidhje të brendshme:
 *  - 0 ose "/"   → kreu i faqes kryesore
 *  - "#seksion"  → scroll nëse seksioni ekziston në këtë faqe, përndryshe hapet "/#seksion"
 *  - "/faqe"     → hapet faqja
 */
export function goTo(href) {
  if (href === 0 || href === '/') {
    if (currentPath() === '/') scrollToTarget(0)
    else navigate('/')
    return
  }
  if (href.startsWith('#')) {
    if (findTarget(href)) scrollToTarget(href)
    else navigate(`/${href}`)
    return
  }
  navigate(href)
}

/** Adresa reale e një lidhjeje (për href, "hap në skedë të re", SEO). */
export const resolveHref = (href, path) => (href.startsWith('#') && path !== '/' ? `/${href}` : href)

export { findTarget }
