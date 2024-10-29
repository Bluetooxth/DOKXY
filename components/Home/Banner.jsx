import React from 'react'

const Banner = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center lg:container w-[95vw] gap-5 text-center px-5">
        <div className='flex justify-center items-center gap-2 rounded-lg p-10 lg:p-16 w-full banner'
        >
            <p className='flex flex-col justify-center items-center w-full text-4xl md:text-7xl font-medium text-slate-200'>
                <span>Your Health is</span>
                <span>Our First Priority</span>
            </p>
        </div>
        </div>
    </section>
  )
}

export default Banner