import { MotionConfig } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Locations from './components/sections/Locations'

export default function App() {
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      {/* clip-x: asnjë seksion nuk mund të shtyjë faqen anash në mobile */}
      <div className="clip-x relative w-full">
        <main className="clip-x relative w-full">
          <Hero />
          <About />
          <Services />
          <Projects />
          <Locations />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
