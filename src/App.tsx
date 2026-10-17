import Footer from './components/Footer'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import SmoothScroll from './components/SmoothScroll'
import { sections } from './lib/sections'

export default function App() {
  return (
    <>
      <Preloader onDone={() => {}} />
      <SmoothScroll />
      <Nav sections={sections} />
      <main>
        {sections.map((s) => (
          <section key={s.id} id={s.id} />
        ))}
      </main>
      <Footer />
    </>
  )
}
