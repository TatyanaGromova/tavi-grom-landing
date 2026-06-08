import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Projects from './components/Projects'
import CaseStudy from './components/CaseStudy'
import Process from './components/Process'
import Audience from './components/Audience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Privacy from './pages/Privacy'
import Consent from './pages/Consent'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <CaseStudy />
      <Process />
      <Audience />
      <Contact />
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <ScrollToTop />
      {isHome && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/consent" element={<Consent />} />
        </Routes>
      </main>
      {isHome && <Footer />}
    </>
  )
}
