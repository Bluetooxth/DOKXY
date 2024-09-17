import React from 'react'
import Hero from '@/components/Home/Hero'
import Banner from '@/components/Home/Banner'
import MeetOurDoc from '@/components/Home/MeetOurDoc'
import MoreAboutService from '@/components/Home/MoreAboutService'
import Consultation from '@/components/Home/Consultation'
import FAQ from '@/components/Home/Faq'

const HomePage = () => {
  return (
    <React.Fragment>
      <main className='space-y-16 pb-16'>
        <Hero />
        <Banner />
        <MeetOurDoc />
        <MoreAboutService />
        <Consultation />
        <FAQ />
      </main>
    </React.Fragment>
  )
}

export default HomePage