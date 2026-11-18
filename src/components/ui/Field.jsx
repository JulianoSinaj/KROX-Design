import { AnimatePresence, motion } from 'framer-motion'

/** Fushë formulari me etiketë dhe mesazh gabimi (pa lëvizje layout-i). */
export default function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-[0.2em] text-mist">{label}</span>
      {children}
      {/* Hapësirë e rezervuar për gabimin — pa lëvizje layout-i */}
      <span className="block h-6 pt-1.5 text-xs text-danger" aria-live="polite">
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="block"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </label>
  )
}
