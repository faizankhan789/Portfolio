import { useState } from 'react'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import SmoothScroll from './components/SmoothScroll'
import Hero from './sections/Hero'
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
        {sections
          .filter((s) => s.id !== 'home')
          .map((s) => (
            <section key={s.id} id={s.id} />
          ))}
      </main>
      <Footer />
    </>
  )
}
