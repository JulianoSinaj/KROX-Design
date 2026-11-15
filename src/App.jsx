import { useEffect, useRef } from 'react'
import { MotionConfig } from 'framer-motion'
import { getLenis, scrollToTarget, useLenis } from './hooks/useLenis'
import { findTarget, usePath } from './hooks/useRoute'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Locations from './components/sections/Locations'
import Faq from './components/sections/Faq'
import Careers from './pages/Careers'

const titles = {
  '/': 'KROX — Ndërtim & Zbatim Projektesh',
  '/karriera': 'Karriera — Punoni me KROX',
}

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
    document.title = titles[path] ?? titles['/']
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

export default function App() {
  useLenis()
  const path = usePath()
  useRouteScroll(path)

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      {/* clip-x: asnjë seksion nuk mund të shtyjë faqen anash në mobile */}
      <div className="clip-x relative w-full">
        {/* key: çdo faqe montohet nga e para, që animacionet e hyrjes të luajnë sërish */}
        <main key={path} className="clip-x relative w-full">
          {path === '/karriera' ? <Careers /> : <Home />}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
