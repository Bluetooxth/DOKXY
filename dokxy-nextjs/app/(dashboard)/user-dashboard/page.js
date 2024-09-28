import Appointment from '@/components/UserDashboard/Appointment'
import Sidebar from '@/components/UserDashboard/Sidebar'
import React from 'react'

const UserDashboard = () => {
  return (
    <React.Fragment>
        <main className='flex flex-col lg:flex-row'>
        <Sidebar className=''/>
        <Appointment className=''/>
        </main>
    </React.Fragment>
  )
}

export default UserDashboard