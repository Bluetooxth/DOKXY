import GetDoctors from '@/components/Doctors/Doctors'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const DoctorsPage = () => {
  return (
    <React.Fragment>
        <Navbar />
        <main className='py-14'>
            <GetDoctors />
        </main>
        <Footer />
    </React.Fragment>
  )
}

export default DoctorsPage