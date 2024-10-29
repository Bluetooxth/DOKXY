"use client";
import React, { useState, useEffect } from "react";
import DoctorCard from "../DoctorCard";
import axios from "axios";

const GetDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/doctor/find", {});
      setDoctors(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section className="flex justify-center items-start w-full min-h-screen">
      <div className="flex flex-col justify-center items-center lg:container w-[95vw] gap-5 px-5">
        <div className="flex flex-col justify-start items-start gap-5 w-full">
          <h2 className="text-3xl lg:text-4xl font-medium">Our Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-start items-stretch gap-5 w-full">
            {Array.isArray(doctors) &&
              doctors.map((doctor, index) => (
                <DoctorCard
                  key={index}
                  name={doctor.name}
                  username={doctor.username}
                  profile_url={doctor.profile_url}
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
