import GetDoctors from '@/components/Doctors/Doctors'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const DoctorsPage = () => {
  return (
    <>
    <Navbar />
    <main className='py-12'>
        <GetDoctors />
    </main>
    <Footer />
    </>
  )
}

export default DoctorsPage