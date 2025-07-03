import { useState } from 'react'
import './App.css'

// COMPONENT IMPORTS
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projectcard from './components/Projectcard'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Beats from './components/Beats'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projectcard />
      <Contact />
      <Footer />
      <Beats />
    </>
  )
}

export default App
