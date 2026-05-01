import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ScrollVideo from '@/components/ScrollVideo'
import Services from '@/components/Services'
import Work from '@/components/Work'
import Process from '@/components/Process'
import TechStack from '@/components/TechStack'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-ink">
      <Nav />
      <Hero />
      <ScrollVideo />
      <Services />
      <Work />
      <Process />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  )
}
