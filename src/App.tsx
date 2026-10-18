import { useState } from 'react'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import SmoothScroll from './components/SmoothScroll'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Services from './sections/Services'
import Stack from './sections/Stack'
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
        {sections
          .filter((s) => !['home', 'about', 'services'].includes(s.id))
          .map((s) => (
            <section key={s.id} id={s.id} />
          ))}
      </main>
      <Footer />
    </>
  )
}
