import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SEEN_KEY = 'krox-intro-seen'

/** Intro luan vetëm herën e parë në një sesion, dhe jo për ata që kanë zgjedhur "reduced motion". */
function shouldPlay() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !sessionStorage.getItem(SEEN_KEY)
  } catch {
    return true
  }
}

/**
 * Video hyrëse me logon KROX, mbi gjithë faqen.
 * Kur mbaron (ose shtypet "Skip"), zbehet për 700ms dhe zbulon faqen poshtë.
 * `onFinish` thirret në fillim të zbehjes, që animacionet e faqes të nisin bashkë me të.
 */
export default function IntroSplash({ onFinish }) {
  const [visible, setVisible] = useState(shouldPlay)
  const videoRef = useRef(null)

  const finish = useCallback(() => {
    setVisible(false)
    onFinish?.()
  }, [onFinish])

  useEffect(() => {
    if (!visible) return

    // Shënohet menjëherë, që një refresh gjatë intros të mos e rinisë
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage i bllokuar — intro thjesht luan sërish */
    }

    // Faqja poshtë nuk lëviz ndërsa luan intro
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    // iOS kërkon që video të jetë "muted" para play(); nëse autoplay bllokohet (p.sh. Low Power Mode), kalohet direkt te faqja
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.play()?.catch(finish)
    }

    const onKey = (e) => e.key === 'Escape' && finish()
    window.addEventListener('keydown', onKey)

    return () => {
      html.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [visible, finish])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex items-center justify-center bg-onyx"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.45, 0, 0.15, 1] }}
          data-lenis-prevent
          aria-label="KROX Design intro"
          role="dialog"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            src="/Video/KROX-Logo.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            onEnded={finish}
            onError={finish}
          />

          <motion.button
            type="button"
            onClick={finish}
            className="absolute bottom-6 right-6 font-sans text-[11px] uppercase tracking-eyebrow text-accent-light/70 transition-colors duration-300 hover:text-accent-light focus-visible:text-accent-light focus-visible:outline-none sm:bottom-10 sm:right-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Skip Intro <span aria-hidden="true">→</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
