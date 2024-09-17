import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="flex justify-center items-center w-full min-h-screen hero">
      <div className="flex flex-col justify-center items-center lg:container gap-5 text-center px-5 w-[95vw]">
        <p className="px-5 py-1 bg-slate-200 bg-opacity-20 text-xl rounded-full font-medium flex items-center gap-2">
          Your Health Is Our Priority <AiOutlineThunderbolt className="text-2xl" />
        </p>
        <h1 className="text-5xl lg:text-7xl font-medium flex flex-col justify-center items-center">
          <span>Your Most Trusted</span>
          <span>Health Partner</span>
        </h1>
        <p className="text-xl font-normal max-w-3xl">
          Book an appointment with our doctors today and get the best health care services
        </p>
        <button className="px-5 py-3 bg-slate-200 bg-opacity-20 hover:bg-opacity-30 text-white font-medium text-xl rounded-lg mt-5 transition duration-300 flex justify-center items-center gap-2">
          Book an Appointment <FaCalendarAlt className="text-2xl" />
        </button>
        <div className="flex flex-wrap justify-center items-stretch gap-5">
          <div className="p-5 rounded-lg bg-slate-200 bg-opacity-20 text-white font-medium text-xl flex flex-col justify-center items-center gap-2 cursor-pointer">
            <IoTimeOutline className="text-3xl" />
            <p>24/7 Availability</p>
          </div>
          <div className="p-5 rounded-lg bg-slate-200 bg-opacity-20 text-white font-medium text-xl flex flex-col justify-center items-center gap-2 cursor-pointer">
            <AiOutlineSchedule className="text-3xl" />
            <p>
              Flexible Scheduling
            </p>
          </div>
          <div className="p-5 rounded-lg bg-slate-200 bg-opacity-20 text-white font-medium text-xl flex flex-col justify-center items-center gap-2 cursor-pointer">
            <FaUserDoctor className="text-3xl" />
            <p>Best Doctors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;