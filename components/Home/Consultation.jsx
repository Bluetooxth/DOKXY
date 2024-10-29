import React from 'react'
import Link from 'next/link'
import { FaCalendarAlt } from 'react-icons/fa'

const Consultation = () => {
  const h = "Book a Consultation with Our Doctors";
  const p = "Get a consultation with our doctors and receive the best medical advice.";

  return (
    <section className="flex justify-center items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center lg:container w-[95vw] gap-5 text-center px-5 consultation rounded-lg">
        <div className="col-span-1 flex flex-col justify-center items-start gap-2 p-5 md:p-10 h-full w-full">
          <h1 className="text-3xl md:text-4xl font-medium">
            {h}
          </h1>
          <p className="text-xl">
            {p}
          </p>
          <Link href={'/doctors'} className="md:py-3 py-1 px-8 rounded-md text-lg md:text-xl font-medium bg-slate-200 hover:bg-slate-300 text-zinc-800 flex items-center gap-3 transition duration-300 mt-2">
            Book an Appointment <FaCalendarAlt className="text-2xl" />
          </Link>
        </div>
        <div className="col-span-1 flex justify-center items-center w-full h-full">
          <img src="/female-doc.png" alt="Doctor" className="object-cover max-w-[400px]" />
        </div>
      </div>
    </section>
  )
}

export default Consultation