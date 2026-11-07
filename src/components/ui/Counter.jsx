import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useMotionValueEvent, useSpring } from 'framer-motion'

/** Numër që rritet me spring kur del në ekran. Gjerësia fikse shmang lëvizjen e layout-it. */
export default function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 40, damping: 18, mass: 1 })

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  useMotionValueEvent(spring, 'change', (v) => {
    if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
  })

  return (
    <span
      ref={ref}
      className="inline-block tabular-nums"
      style={{ minWidth: `${String(value).length + suffix.length}ch` }}
      aria-label={`${value}${suffix}`}
    >
      0{suffix}
    </span>
  )
}
