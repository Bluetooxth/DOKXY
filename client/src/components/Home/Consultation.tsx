import React from 'react'
import Link from 'next/link'
import { FaCalendarAlt } from 'react-icons/fa'

const Consultation = () => {
  const h = "Book a Consultation with Our Doctors";
  const p = "Get a consultation with our doctors and receive the best medical advice.";

  return (
    <section className="flex justify-center items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-5 w-[95vw] lg:container px-5 consultation rounded-xl">
        <div className="col-span-1 flex flex-col justify-center items-start gap-2 p-5 md:p-10 h-full w-full">
          <h1 className="text-4xl font-medium">
            {h}
          </h1>
          <p className="text-xl">
            {p}
          </p>
          <Link href={''} className="px-5 py-3 rounded-full text-xl font-medium bg-slate-200 bg-opacity-20 hover:bg-opacity-30 flex items-center gap-3 transition duration-300">
            Book an Appointment <FaCalendarAlt className="text-2xl" />
          </Link>
        </div>
        <div className="col-span-1 flex justify-center items-center w-full h-full">
          <img src="/herodoc.png" alt="Doctor" className="object-cover" />
        </div>
      </div>
    </section>
  )
}

export default Consultation