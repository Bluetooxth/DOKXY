import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Services from '@/components/Services/Services'
import React from 'react'

const ServicesPage = () => {
  return (
    <>
    <Navbar />
    <main className='py-12'>
        <Services />
    </main>
    <Footer />
    </>
  )
}

export default ServicesPage