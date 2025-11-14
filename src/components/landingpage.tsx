import Navbar from './nav'
import Hero from './landingpage/hero'
import Features from './landingpage/features'
import Footer from './footer'
import Testmonials from './landingpage/testmonials'



const landingpage = () => {
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