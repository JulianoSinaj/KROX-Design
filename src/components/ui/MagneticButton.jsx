import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const spring = { stiffness: 220, damping: 18, mass: 0.4 }

const variants = {
  primary: { base: 'bg-gold text-ink', fill: 'bg-accent-light', hoverText: 'text-ink' },
  outline: { base: 'border border-white/20 text-bone', fill: 'bg-accent', hoverText: 'text-ink' },
  dark: { base: 'bg-ink text-bone', fill: 'bg-accent', hoverText: 'text-ink' },
}

/**
 * Buton "magnetik": ndjek kursorin brenda kufijve të vet përmes një spring-u,
 * mbushet nga poshtë lart dhe teksti rrotullohet vertikalisht në hover.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  strength = 0.3,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const v = variants[variant]
  const Comp = href ? motion.a : motion.button

  return (
    <Comp
      ref={ref}
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex h-14 select-none items-center justify-center overflow-hidden rounded-full px-8 text-[13px] font-medium uppercase tracking-[0.16em] will-change-transform ${v.base} ${className}`}
      {...rest}
    >
      {/* Mbushja e maskuar */}
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-full rounded-full ${v.fill} transition-transform duration-500 ease-expo group-hover:translate-y-0`}
      />
      {/* Teksti që rrotullohet */}
      <span className="relative block h-6 overflow-hidden">
        <span className="flex flex-col transition-transform duration-500 ease-expo group-hover:-translate-y-1/2">
          <span className="flex h-6 items-center gap-3">{children}</span>
          <span aria-hidden className={`flex h-6 items-center gap-3 ${v.hoverText}`}>
            {children}
          </span>
        </span>
      </span>
    </Comp>
  )
}
