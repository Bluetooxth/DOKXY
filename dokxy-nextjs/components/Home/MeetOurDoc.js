import React from "react";
import DoctorCard from "../DoctorCard";
import { FaArrowRightLong } from "react-icons/fa6";

const MeetOurDoc = () => {
  const doctors = [
    {
      name: "Dr. Jane Smith",
      image:
        "https://img.freepik.com/free-photo/young-doctor-posing-standing-white-wall_114579-90442.jpg?t=st=1726715978~exp=1726719578~hmac=d0fead0368988c785322b5daf6b27b1cdd21db31f7bd2149afbde6e2302fce3e&w=1380",
      speciality: "Cardiologist",
      experience: "12 years",
    },
    {
      name: "Dr. Emily Johnson",
      image:
        "https://img.freepik.com/free-photo/front-view-smiley-covid-recovery-center-female-doctor_23-2148847903.jpg?t=st=1726715909~exp=1726719509~hmac=660cb4a9a3538d1c467efd4458ea597f26235d52e077a08188ade886c04821b2&w=826",
      speciality: "Neurologist",
      experience: "8 years",
    },
    {
      name: "Dr. Sarah Wilson",
      image:
        "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?t=st=1726715675~exp=1726719275~hmac=c2dd32e390cc9731f95622d21d96503e0b5189c85495a42d16c88ce9650e1904&w=1380",
      speciality: "Pediatrician",
      experience: "15 years",
    },
    {
      name: "Dr. Alice Brown",
      image:
        "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg?t=st=1726222748~exp=1726226348~hmac=43e4b2ed4ffabce503bd7cf272ece9d174096a8ed2bc549625b5e9207455b772&w=826",
      speciality: "Dermatologist",
      experience: "7 years",
    },
    {
      name: "Dr. Olivia Davis",
      image:
        "https://img.freepik.com/free-photo/woman-working-as-doctor_23-2148827819.jpg?t=st=1726715836~exp=1726719436~hmac=7025a2058e8926455ca77103ef0b5817c3d664e2193285b12c3780d2c4cc51e0&w=740",
      speciality: "Endocrinologist",
      experience: "9 years",
    },
    {
      name: "Dr. Mia Taylor",
      image:
        "https://img.freepik.com/free-photo/doctor-woman-smiling-gesturing-thumbs-up_23-2148075688.jpg?t=st=1726715791~exp=1726719391~hmac=5de1bd78c01d72fd1603e019bc51221cbcfd356ee566cc3259cb68d931b575aa&w=1380",
      speciality: "Orthopedic Surgeon",
      experience: "11 years",
    },
  ];

  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center lg:container gap-5 text-center px-5 w-[95vw]">
        <div className="flex flex-col justify-start items-start gap-5 w-full">
          <h2 className="text-3xl lg:text-4xl font-medium">Meet Our Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-start items-stretch gap-5 w-full">
            {doctors.map((doctor, index) => (
              <DoctorCard
                key={index}
                name={doctor.name}
                image={doctor.image}
                speciality={doctor.speciality}
                experience={doctor.experience}
              />
            ))}
          </div>
          <button className="px-5 py-3 rounded-lg text-xl font-medium self-center mt-5 flex justify-center items-center gap-2 btn">
            View All Doctors <FaArrowRightLong className="text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MeetOurDoc;