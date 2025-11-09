import Navbar from './nav'
import Hero from './hero'
import Features from './features'
import Footer from './footer'
import Testmonials from './testmonials'

function landingpage() {
  return (
    <>
      <Navbar />
      <Hero />
        <Features />
        <Testmonials/>
        <Footer />
        
    </>
  )
}

export default landingpage