import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Spring më i butë = lëvizje më e qetë, pa dridhje
const spring = { stiffness: 150, damping: 20, mass: 0.5 }

const variants = {
  // CTA kryesore: gold i plotë → në hover errësohet dhe mbetet vetëm korniza + teksti gold
  primary: {
    base: 'border border-gold bg-gold text-ink hover:shadow-gold',
    fill: 'bg-ink',
    hoverText: 'text-gold',
  },
  // Dytësor: kornizë champagne e hollë → në hover korniza bëhet gold me shkëlqim të lehtë
  outline: {
    base: 'border border-accent/35 text-bone hover:border-gold hover:shadow-gold',
    fill: 'bg-gold/[0.08]',
    hoverText: 'text-gold',
  },
  // Kornizë gold e hollë → në hover korniza ndizet plotësisht, mbushja ngrihet dhe teksti kalon në gold
  gold: {
    base: 'border border-gold/40 text-bone hover:border-gold hover:shadow-gold',
    fill: 'bg-gold/[0.08]',
    hoverText: 'text-gold',
  },
  dark: {
    base: 'border border-accent/15 bg-graphite text-bone hover:border-gold',
    fill: 'bg-gold/[0.08]',
    hoverText: 'text-gold',
  },
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
  strength = 0.25,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const handleMove = (e) => {
    // Vetëm me mi/trackpad. Në prekje, iOS dërgon një "mousemove" sintetik dhe butoni mbetej i zhvendosur.
    if (e.pointerType !== 'mouse') return
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
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex h-14 max-w-full select-none items-center justify-center overflow-hidden rounded-full px-6 text-[12px] font-medium uppercase tracking-[0.16em] sm:px-9 sm:tracking-[0.2em] transition-[border-color,box-shadow] duration-700 ease-silk will-change-transform ${v.base} ${className}`}
      {...rest}
    >
      {/* Mbushja e maskuar */}
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-full rounded-full ${v.fill} transition-transform duration-700 ease-expo group-hover:translate-y-0`}
      />
      {/* Teksti që rrotullohet */}
      <span className="relative block h-6 overflow-hidden">
        <span className="flex flex-col transition-transform duration-700 ease-expo group-hover:-translate-y-1/2">
          <span className="flex h-6 items-center gap-3">{children}</span>
          <span aria-hidden className={`flex h-6 items-center gap-3 ${v.hoverText}`}>
            {children}
          </span>
        </span>
      </span>
    </Comp>
  )
}
