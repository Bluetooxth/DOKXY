"use client"
import React, {useState, useEffect} from "react";
import DoctorCard from "../DoctorCard";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import Link from "next/link";

const MeetOurDoc = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/doctor/get-doctors");
      setDoctors(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center lg:container gap-5 text-center px-5 w-[95vw]">
        <div className="flex flex-col justify-start items-start gap-5 w-full">
          <h2 className="text-3xl lg:text-4xl font-medium">Meet Our Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start items-stretch gap-5 w-full">
            {doctors.map((doctor, index) => (
              <DoctorCard
                key={index}
                name={doctor.name}
                username={doctor.username}
                imageURL={doctor.imageURL}
                specialization={doctor.specialization}
                yearsOfExperience={doctor.yearsOfExperience}
              />
            ))}
          </div>
          <Link href={'/doctors'} className="px-5 py-3 rounded-lg text-xl font-medium self-center mt-5 flex justify-center items-center gap-2 btn">
            View All Doctors <FaArrowRightLong className="text-2xl" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetOurDoc;