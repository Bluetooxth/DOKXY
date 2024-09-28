"use client"
import Appointment from '@/components/DoctorDashboard/Appointment'
import Settings from '@/components/DoctorDashboard/Settings'
import Sidebar from '@/components/DoctorDashboard/Sidebar'
import React, { useState } from 'react'

const UserDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('appointment');

  return (
    <React.Fragment>
      <main className='flex flex-col lg:flex-row'>
        <Sidebar setActiveComponent={setActiveComponent} />
        <div className="flex-1 p-5">
          {activeComponent === 'appointment' && <Appointment />}
          {activeComponent === 'settings' && <Settings />}
        </div>
      </main>
    </React.Fragment>
  )
}

export default UserDashboard