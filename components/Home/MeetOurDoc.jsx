"use client";
import React, { useState, useEffect } from "react";
import DoctorCard from "../DoctorCard";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import Link from "next/link";

const MeetOurDoc = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/doctor/find");
      setDoctors(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch doctors.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center lg:container w-[95vw] gap-5 px-5">
        <div className="flex flex-col justify-start items-start gap-5 w-full">
          <h2 className="text-3xl lg:text-4xl font-medium">Meet Our Doctors</h2>
          {error && <div className="text-red-500">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-start items-stretch gap-5 w-full">
              {Array.isArray(doctors) &&
                doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.username}
                    name={doctor.name}
                    username={doctor.username}
                    profile_url={doctor.profile_url}
                    specialization={doctor.specialization}
                    yearsOfExperience={doctor.yearsOfExperience}
                  />
                ))}
            </div>
          <Link
            href={"/doctors"}
            className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md self-center flex items-center gap-2 btn"
          >
            View All Doctors <FaArrowRightLong className="text-2xl" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetOurDoc;
