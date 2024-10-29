import React from "react";
import { LuHeartHandshake } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex justify-center items-center w-full min-h-screen hero">
      <div className="flex flex-col justify-center items-center lg:container w-[95vw] gap-5 text-center px-5 py-14 md:py-0 lg:py-0">
        <p className="px-8 py-1 text-sky-900 bg-sky-300 bg-opacity-15 text-lg md:text-xl rounded-full font-medium flex items-center gap-2">
          Your Health Is Our Priority <LuHeartHandshake className="text-2xl" />
        </p>
        <h1 className="text-6xl md:text-7xl font-semibold flex flex-col justify-center items-center">
          <span>Your Most Trusted</span>
          <span>Health Partner</span>
        </h1>
        <p className="text-xl font-normal text-sky-800 max-w-3xl">
          Book an appointment with our doctors today and get the best health care services
        </p>
        <Link href={'/doctors'} className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md self-center flex items-center gap-2 btn">
          Book an Appointment <FaCalendarAlt className="text-2xl" />
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-stretch gap-5 lg:w-[70%] w-full">
          <div className="p-5 rounded-md text-sky-900 bg-sky-300 bg-opacity-15 font-medium text-xl flex flex-col justify-center items-center gap-2 cursor-pointer w-full">
            <IoTimeOutline className="text-5xl" />
            <p>24/7 Availability</p>
          </div>
          <div className="p-5 rounded-md text-sky-900 bg-sky-300 bg-opacity-15 font-medium text-xl flex flex-col justify-center items-center gap-2 cursor-pointer w-full">
            <AiOutlineSchedule className="text-5xl" />
            <p>Flexible Scheduling</p>
          </div>
          <div className="p-5 rounded-md text-sky-900 bg-sky-300 bg-opacity-15 font-medium text-xl flex flex-col justify-center items-center gap-2 cursor-pointer w-full">
            <FaUserDoctor className="text-5xl" />
            <p>Best Doctors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;