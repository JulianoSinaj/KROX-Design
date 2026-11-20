import { useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { getLenis, scrollToTarget, useLenis } from './hooks/useLenis'
import { findTarget, usePath } from './hooks/useRoute'
import { useLanguage } from './context/LanguageContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import IntroSplash from './components/layout/IntroSplash'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Locations from './components/sections/Locations'
import Faq from './components/sections/Faq'
import Careers from './pages/Careers'

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Locations />
      <Contact />
      <Faq />
    </>
  )
}

/** Pas çdo ndryshimi faqeje: shko te seksioni i "#hash" (nëse ka) ose në krye. */
function useRouteScroll(path) {
  const first = useRef(true)
  useEffect(() => {
    const { hash } = window.location
    const isFirst = first.current
    first.current = false

    if (hash && findTarget(hash)) {
      // Pret një frame që seksionet të kenë marrë lartësinë e tyre
      const id = requestAnimationFrame(() => scrollToTarget(hash))
      return () => cancelAnimationFrame(id)
    }
    // Në ngarkimin e parë lihet shfletuesi të rikthejë pozicionin e scroll-it
    if (!isFirst) {
      getLenis()?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
    }
  }, [path])
}

/** Titulli i skedës dhe përshkrimi meta në gjuhën aktive (efekt më vete: ndërrimi i gjuhës nuk lëviz scroll-in). */
function useDocumentMeta(path) {
  const { t } = useLanguage()
  useEffect(() => {
    document.title = path === '/karriera' ? t.meta.titles.careers : t.meta.titles.home
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [path, t])
}

export default function App() {
  useLenis()
  const path = usePath()
  useRouteScroll(path)
  useDocumentMeta(path)
  // Ndryshon kur mbaron intro: faqja rimontohet që animacionet e hyrjes të luajnë pikërisht kur zbulohet
  const [introDone, setIntroDone] = useState(false)
  const handleIntroFinish = useCallback(() => setIntroDone(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      {/* clip-x: asnjë seksion nuk mund të shtyjë faqen anash në mobile */}
      <div className="clip-x relative w-full">
        {/* key: çdo faqe montohet nga e para, që animacionet e hyrjes të luajnë sërish */}
        <main key={`${path}:${introDone}`} className="clip-x relative w-full">
          {path === '/karriera' ? <Careers /> : <Home />}
        </main>
        <Footer />
      </div>
      {/* E fundit në DOM, që të mbulojë edhe Navbar-in (i cili është gjithashtu z-50) */}
      <IntroSplash onFinish={handleIntroFinish} />
    </MotionConfig>
  )
}
