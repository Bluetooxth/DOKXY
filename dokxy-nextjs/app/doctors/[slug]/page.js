import DoctorProfile from '@/components/Doctors/DoctorProfile'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const DoctorProilePage = () => {
  return (
    <React.Fragment>
        <Navbar />
        <main className='py-14'>
            <DoctorProfile />
        </main>
        <Footer />
    </React.Fragment>
  )
}

export default DoctorProilePage