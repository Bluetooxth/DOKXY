"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/appointment/get");
      console.log(response.data);
      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <section className="flex justify-start items-start px-7 py-14 w-full overflow-y-scroll">
      <div className="flex flex-col justify-start items-start w-full">
        <h2 className="text-3xl font-medium mb-5">Your Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="flex flex-col justify-start items-start gap-2 p-5 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              <p className="text-xl font-medium">{appointment.doctorName}</p>
              <p className="text-lg font-normal">
                Date: {appointment.appointmentDate}
              </p>
              <p className="text-lg font-normal">
                Time: {appointment.appointmentTime}
              </p>
              <p className="text-lg font-normal">
                Type: {appointment.appointmentType}
              </p>
              <p className="text-lg font-normal">
                Status: {appointment.appointmentStatus}
              </p>
              <button className="mt-3 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-200">
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Appointment;