import React from "react";
import DoctorCard from "../DoctorCard";
import { FaArrowRightLong } from "react-icons/fa6";

const MeetOurDoc = () => {
  const doctors = [
    {
      name: "Dr. John Doe",
      image:
        "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg?t=st=1726222748~exp=1726226348~hmac=43e4b2ed4ffabce503bd7cf272ece9d174096a8ed2bc549625b5e9207455b772&w=826",
      speciality: "Cardiologist",
      experience: "10 years",
    },
    {
      name: "Dr. John Doe",
      image:
        "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg?t=st=1726222748~exp=1726226348~hmac=43e4b2ed4ffabce503bd7cf272ece9d174096a8ed2bc549625b5e9207455b772&w=826",
      speciality: "Cardiologist",
      experience: "10 years",
    },
    {
      name: "Dr. John Doe",
      image:
        "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg?t=st=1726222748~exp=1726226348~hmac=43e4b2ed4ffabce503bd7cf272ece9d174096a8ed2bc549625b5e9207455b772&w=826",
      speciality: "Cardiologist",
      experience: "10 years",
    },
    {
      name: "Dr. John Doe",
      image:
        "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg?t=st=1726222748~exp=1726226348~hmac=43e4b2ed4ffabce503bd7cf272ece9d174096a8ed2bc549625b5e9207455b772&w=826",
      speciality: "Cardiologist",
      experience: "10 years",
    },
    {
      name: "Dr. John Doe",
      image:
        "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg?t=st=1726222748~exp=1726226348~hmac=43e4b2ed4ffabce503bd7cf272ece9d174096a8ed2bc549625b5e9207455b772&w=826",
      speciality: "Cardiologist",
      experience: "10 years",
    },
    {
      name: "Dr. John Doe",
      image:
        "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg?t=st=1726222748~exp=1726226348~hmac=43e4b2ed4ffabce503bd7cf272ece9d174096a8ed2bc549625b5e9207455b772&w=826",
      speciality: "Cardiologist",
      experience: "10 years",
    },
  ];

  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center lg:container gap-5 text-center px-5 w-[95vw]">
        <div className="flex flex-col justify-start items-start gap-5 w-full">
          <h2 className="text-3xl lg:text-4xl font-medium">
            Meet Our Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-stretch gap-5 w-full">
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