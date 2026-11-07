import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

export const getLenis = () => lenisInstance

/** Scroll i butë drejt një seksioni (p.sh. '#projektet') ose në krye (0). */
export function scrollToTarget(target) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: target === 0 ? 0 : -72, duration: 1.4 })
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisInstance = lenis

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
