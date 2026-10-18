import { useState } from 'react'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import SmoothScroll from './components/SmoothScroll'
import Contact from './sections/Contact'
import Credentials from './sections/Credentials'
import Experience from './sections/Experience'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Services from './sections/Services'
import Stack from './sections/Stack'
import Work from './sections/Work'
import { sections } from './lib/sections'

export default function App() {
  const [ready, setReady] = useState(false)
  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <SmoothScroll />
      <Nav sections={sections} />
      <main>
        <Hero ready={ready} />
        <Intro />
        <Stack />
        <Services />
        <Work />
        <Experience />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
