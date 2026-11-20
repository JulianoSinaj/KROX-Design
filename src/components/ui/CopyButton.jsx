import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const ease = [0.22, 1, 0.36, 1]

/** Kopjon tekstin në clipboard — i dobishëm në desktop, ku tel:/mailto: shpesh s'kanë aplikacion. */
export default function CopyButton({ value, label }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Rezervë për shfletues të vjetër ose kontekste jo-HTTPS
      const ta = document.createElement('textarea')
      ta.value = value
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={{ scale: 0.96 }}
      aria-label={copied ? t.common.copiedLabel(label) : t.common.copyLabel(label)}
      title={copied ? t.common.copied : t.common.copy}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-accent/15 text-mist transition-colors duration-500 hover:border-gold hover:text-gold"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'ok' : 'copy'}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          className={copied ? 'text-gold' : ''}
        >
          {copied ? <Check size={16} strokeWidth={1.75} /> : <Copy size={16} strokeWidth={1.5} />}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? t.common.copied : ''}
      </span>
    </motion.button>
  )
}
