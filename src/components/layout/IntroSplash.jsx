import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const SEEN_KEY = 'krox-intro-seen'
const VIDEO_SRC = '/Video/KROX-Logo.mp4'
// Sa pritet "canplaythrough" para se video të niset gjithsesi (lidhje të ngadalta)
const START_FALLBACK_MS = 1500

const ONYX = '20, 21, 23' // #141517 — sfondi i ekranit

/** Zbeh dy skajet përballë drejt sfondit; `size` = sa % e videos merr zbehja në secilin skaj. */
function feather(direction, size) {
  const stops = [
    [0, 1],
    [0.3, 0.6],
    [0.65, 0.2],
    [1, 0],
  ]
  const near = stops.map(([pos, alpha]) => `rgba(${ONYX}, ${alpha}) ${pos * size}%`)
  const far = stops.map(([pos, alpha]) => `rgba(${ONYX}, ${alpha}) ${100 - pos * size}%`).reverse()
  return `linear-gradient(${direction}, ${[...near, ...far].join(', ')})`
}

// Skajet e videos treten te sfondi: në buzë mbulimi është i plotë, kështu që drejtkëndëshi i videos nuk duket.
// Zbehja poshtë mbaron para rreshtit të sloganit, që teksti të mos preket.
const EDGE_FEATHER = [
  `radial-gradient(ellipse closest-side, rgba(${ONYX}, 0) 75%, rgba(${ONYX}, 0.6) 100%)`,
  feather('to right', 14),
  feather('to bottom', 11),
].join(', ')

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
 * Kur mbaron (ose shtypet "Skip"), zbehet për 700ms dhe çmontohet plotësisht.
 * `onFinish` thirret në fillim të zbehjes, që animacionet e faqes të nisin bashkë me të.
 */
export default function IntroSplash({ onFinish }) {
  const [visible, setVisible] = useState(shouldPlay)

  const finish = useCallback(() => {
    setVisible(false)
    onFinish?.()
  }, [onFinish])

  return <AnimatePresence>{visible && <Splash key="intro" onFinish={finish} />}</AnimatePresence>
}

function Splash({ onFinish }) {
  const { t } = useLanguage()
  // false gjatë zbehjes në dalje
  const isPresent = useIsPresent()
  const videoRef = useRef(null)
  const startedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [ratio, setRatio] = useState(16 / 9)

  // Ngarkon videon. Kur komponenti çmontohet, burimi hiqet që shfletuesi të lirojë menjëherë dekoderin dhe memorien.
  useEffect(() => {
    const video = videoRef.current
    // Shënohet menjëherë, që një refresh gjatë intros të mos e rinisë
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage i bllokuar — intro thjesht luan sërish */
    }
    video.src = VIDEO_SRC
    return () => {
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [])

  const start = useCallback(() => {
    const video = videoRef.current
    if (!isPresent || startedRef.current || !video) return
    startedRef.current = true
    // iOS kërkon "muted" para play(); nëse autoplay bllokohet (p.sh. Low Power Mode), kalohet direkt te faqja
    video.muted = true
    video.play()?.catch(onFinish)
  }, [isPresent, onFinish])

  useEffect(() => {
    if (!isPresent) return

    // Faqja poshtë nuk lëviz ndërsa luan intro
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    const fallback = setTimeout(start, START_FALLBACK_MS)
    const onKey = (e) => e.key === 'Escape' && onFinish()
    window.addEventListener('keydown', onKey)

    return () => {
      html.style.overflow = prevOverflow
      clearTimeout(fallback)
      window.removeEventListener('keydown', onKey)
    }
  }, [isPresent, start, onFinish])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-onyx"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.45, 0, 0.15, 1] }}
      data-lenis-prevent
      aria-label="KROX Design intro"
      role="dialog"
    >
      {/* Korniza ka saktësisht përmasat e videos (pa shirita bosh), që zbehja e skajeve të bjerë mbi skajet e saj.
          Sa më e madhe që nxë në ekran, deri në max-w-4xl; klasa me "vh" është rezervë për shfletuesit pa "dvh". */}
      <div
        className="relative w-[min(100vw,calc(100vh*var(--ratio)))] max-w-4xl"
        style={{
          '--ratio': ratio,
          aspectRatio: ratio,
          width: 'min(100vw, calc(100dvh * var(--ratio)))',
        }}
      >
        {/* Pa autoPlay: video niset vetëm kur është ngarkuar mjaftueshëm, dhe shfaqet vetëm kur po luan vërtet */}
        <video
          ref={videoRef}
          className={`h-full w-full transform-gpu object-contain transition-opacity duration-500 will-change-transform ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedMetadata={(e) => {
            const { videoWidth, videoHeight } = e.currentTarget
            if (videoWidth && videoHeight) setRatio(videoWidth / videoHeight)
          }}
          onCanPlayThrough={start}
          onPlaying={() => setPlaying(true)}
          onEnded={onFinish}
          onError={onFinish}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px"
          style={{ background: EDGE_FEATHER }}
        />
      </div>

      <motion.button
        type="button"
        onClick={onFinish}
        className="absolute bottom-6 right-6 font-sans text-[11px] uppercase tracking-eyebrow text-accent-light/70 transition-colors duration-300 hover:text-accent-light focus-visible:text-accent-light focus-visible:outline-none sm:bottom-10 sm:right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {t.intro.skip} <span aria-hidden="true">→</span>
      </motion.button>
    </motion.div>
  )
}
