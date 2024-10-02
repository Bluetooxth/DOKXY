"use client";
import React, { useState, useEffect } from "react";
import DoctorCard from "../DoctorCard";
import axios from "axios";

const GetDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await axios.get(`/api/doctor/get-doctors?t=${timestamp}`);
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section className="flex justify-center items-start w-full min-h-screen">
      <div className="flex flex-col justify-center items-center lg:container gap-5 text-center px-5 w-[95vw]">
        <div className="flex flex-col justify-start items-start gap-5 w-full">
          <h2 className="text-3xl lg:text-4xl font-medium">Our Doctors</h2>
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
        </div>
      </div>
    </section>
  );
};

export default GetDoctors;