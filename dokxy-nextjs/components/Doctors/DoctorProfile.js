"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const DoctorProfile = () => {
  const { slug } = useParams();
  const [doctor, setDoctor] = React.useState(null);
  const router = useRouter();

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`/api/doctor/get-doctor`, {
        params: { username: slug },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setDoctor(response.data);
      }
    } catch (error) {
      console.error("Error fetching doctor:", error);
      setDoctor(null);
    }
  };

  const handleAppointment = () => {
    if(doctor) {
        const query = new URLSearchParams({
            doctorName: doctor.name,
            doctorEmail: doctor.email,
        }).toString();
        router.push(`/appointment?${query}`);
    }
  }

  React.useEffect(() => {
    fetchDoctor();
  }, [slug]);

  return (
    <section className="flex justify-center items-start w-full min-h-screen">
      <div className="flex flex-col justify-center items-center lg:container gap-5 text-center px-5 w-[95vw]">
        <h2 className="text-4xl font-medium">Doctor Profile</h2>
        <div className="flex justify-start items-start w-full mt-3">
        {doctor ? (
          <div className="flex flex-col justify-start items-start gap-5">
            <img
              src={doctor.imageURL}
              alt={doctor.name}
              className="w-32 h-32 rounded-full"
            />
            <p className="text-xl font-normal">
              <span className="text-xl font-medium">Name: </span>
              {doctor.name}
            </p>
            <p className="text-xl font-normal">
              <span className="text-xl font-medium">Username: </span>
              {doctor.username}
            </p>
            <p className="text-xl font-normal">
              <span className="text-xl font-medium">Email: </span>
              {doctor.email}
            </p>
            <p className="text-xl font-normal">
              <span className="text-xl font-medium">Phone: </span>
              {doctor.phoneNumber}
            </p>
            <p className="text-xl font-normal">
              <span className="text-xl font-medium">Specialization: </span>
              {doctor.specialization}
            </p>
            <p className="text-xl font-normal">
              <span className="text-xl font-medium">Years of Experience: </span>
              {doctor.yearsOfExperience}
            </p>
            <p className="text-xl font-normal">
              <span className="text-xl font-medium"> Address: </span>
              {doctor.address}
            </p>
            <button onClick={handleAppointment} className="px-5 py-2 rounded-lg text-xl font-medium btn">
                Book Appointment
            </button>
          </div>
        ) : (
          <p className="text-xl font-normal">Doctor not found</p>
        )}
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;