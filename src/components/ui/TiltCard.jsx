import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'

const spring = { stiffness: 160, damping: 18, mass: 0.5 }

/**
 * Kartë 3D që anohet sipas pozicionit të kursorit (perspective + preserve-3d),
 * me një dritë portokalli që ndjek miun.
 */
export default function TiltCard({ children, className = '', max = 8 }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spx = useSpring(px, spring)
  const spy = useSpring(py, spring)

  const rotateX = useTransform(spy, [0, 1], [max, -max])
  const rotateY = useTransform(spx, [0, 1], [-max, max])
  const gx = useTransform(spx, (v) => `${v * 100}%`)
  const gy = useTransform(spy, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(212,197,185,0.10), transparent 60%)`

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative h-full will-change-transform"
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  )
}
