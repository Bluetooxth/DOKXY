import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const MoreAboutService = () => {

    const services = [
        {
            name: "Cardiology",
            desc: "Cardiology is a branch of medicine that deals with the disorders of the heart as well as some parts of the circulatory system.",
        },
        {
            name: "Dermatology",
            desc: "Dermatology is the branch of medicine dealing with the skin, nails, hair and its diseases.",
        },
        {
            name: "Gynecology",
            desc: "Gynecology or gynaecology is the medical practice dealing with the health"
        },
        {
            name: "Neurology",
            desc: "Neurology is a branch of medicine dealing with disorders of the nervous system."
        },
        {
            name: "Oncology",
            desc: "Oncology is a branch of medicine that deals with the prevention, diagnosis, and treatment of cancer."
        },
        {
            name: "Orthopedics",
            desc: "Orthopedics is a medical specialty that focuses on the diagnosis, correction, prevention, and treatment of patients with skeletal deformities."
        },
    ]

  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center lg:container w-[95vw] gap-5 text-center px-5">
        <div className="flex flex-col justify-start items-start gap-5 w-full">
          <h2 className="text-3xl lg:text-4xl font-medium">
            Services Available
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-stretch gap-5 w-full">
            {services.map((service, index) => (
                <div key={index} className="flex flex-col justify-start items-center p-5 gap-2 rounded-lg cursor-pointer servicecard">
                    <h3 className="text-2xl font-medium">{service.name}</h3>
                    <p className="text-xl">{service.desc}</p>
                </div>
            ))}
          </div>
          <Link href={'/services'} className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md self-center flex items-center gap-2 btn">
            View All Services <FaArrowRightLong className="text-2xl" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MoreAboutService;