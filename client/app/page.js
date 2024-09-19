import Banner from '@/components/Home/Banner'
import Consultation from '@/components/Home/Consultation'
import Hero from '@/components/Home/Hero'
import MeetOurDoc from '@/components/Home/MeetOurDoc'
import MoreAboutService from '@/components/Home/MoreAboutServices'
import React from 'react'
import FAQ from '@/components/Home/Faq'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const HomePage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className='space-y-16 pb-16'>
      <Hero />
      <Banner />
      <MeetOurDoc />
      <MoreAboutService />
      <Consultation />
      <FAQ />
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default HomePage