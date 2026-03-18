import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import AppShowcase from '../components/sections/AppShowcase'
import HowItWorks from '../components/sections/HowItWorks'
import SocialProof from '../components/sections/SocialProof'
import FAQ from '../components/sections/FAQ'
import DownloadCTA from '../components/sections/DownloadCTA'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <AppShowcase />
      <HowItWorks />
      <SocialProof />
      <FAQ />
      <DownloadCTA />
    </>
  )
}
