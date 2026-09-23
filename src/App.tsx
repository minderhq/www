import Nav from './components/Nav'
import Hero from './components/Hero'
import OctopusScroll from './components/OctopusScroll'
import CoreCapabilities from './components/CoreCapabilities'
import PlatformOverview from './components/PlatformOverview'
import WhyLocalFirst from './components/WhyLocalFirst'
import Integrations from './components/Integrations'
import Ecosystem from './components/Ecosystem'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-ambient relative min-h-screen bg-bg text-ink">
      <Nav />
      <main className="relative z-[1]">
        <div id="home">
          <Hero />
        </div>
        <CoreCapabilities />
        <OctopusScroll />
        <PlatformOverview />
        <WhyLocalFirst />
        <Integrations />
        <Ecosystem />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
