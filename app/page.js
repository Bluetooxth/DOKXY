import Footer from '@/components/Footer'
import Banner from '@/components/Home/Banner'
import Consultation from '@/components/Home/Consultation'
import FAQ from '@/components/Home/Faq'
import Hero from '@/components/Home/Hero'
import MeetOurDoc from '@/components/Home/MeetOurDoc'
import MoreAboutService from '@/components/Home/MoreAboutServices'
import Navbar from '@/components/Navbar'
import React from 'react'

const LandingPage = () => {
  return (
    <>
    <Navbar />
    <main className='pb-12 space-y-12'>
      <Hero />
      {/* <Banner /> */}
      <MeetOurDoc />
      <MoreAboutService />
      <Consultation />
      <FAQ />
    </main>
    <Footer />
    </>
  )
}

export default LandingPage