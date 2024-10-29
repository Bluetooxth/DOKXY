import DoctorProfile from '@/components/Doctors/DoctorProfile'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const DoctorsPage = () => {
  return (
    <>
    <Navbar />
    <main className='py-12'>
        <DoctorProfile />
    </main>
    <Footer />
    </>
  )
}

export default DoctorsPage