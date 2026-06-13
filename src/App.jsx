import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <div
      className="text-neutral-100 min-h-screen font-sans scroll-smooth"
      style={{
        background:
          'linear-gradient(to bottom, #0d1b3d 0%, #2d1f4a 16%, #5b2950 32%, #a83d3d 48%, #e07842 60%, #f5b169 70%, #2a1f2e 84%, #0c0a14 100%)'
      }}
    >
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <Analytics />
    </div>
  )
}