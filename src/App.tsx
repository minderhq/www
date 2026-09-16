import Nav from './components/Nav'
import Hero from './components/Hero'
import OctopusScroll from './components/OctopusScroll'
import CoreCapabilities from './components/CoreCapabilities'
import PlatformOverview from './components/PlatformOverview'
import WhyLocalFirst from './components/WhyLocalFirst'
import Ecosystem from './components/Ecosystem'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import CursorSpotlight from './components/CursorSpotlight'

export default function App() {
  return (
    <div className="bg-ambient relative min-h-screen bg-bg text-ink">
      <Nav />
      <main className="relative z-[1]">
        <div id="home">
          <Hero />
        </div>
        <CursorSpotlight>
          <CoreCapabilities />
        </CursorSpotlight>
        <OctopusScroll />
        <CursorSpotlight>
          <PlatformOverview />
          <WhyLocalFirst />
          <Ecosystem />
          <FinalCTA />
        </CursorSpotlight>
      </main>
      <CursorSpotlight>
        <Footer />
      </CursorSpotlight>
    </div>
  )
}
