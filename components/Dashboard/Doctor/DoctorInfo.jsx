"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const DoctorInfo = () => {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get("/api/doctor/profile");
        setDoctor(response.data.data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setError("Failed to fetch doctor data.");
      }
    };
    fetchDoctor();
  }, []);

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(`/api/appointment/delete/?id=${appointmentId}`);
      if (response.status === 200) {
        setDoctor((prevDoctor) => ({
          ...prevDoctor,
          appointments: prevDoctor.appointments.filter((app) => app.id !== appointmentId),
        }));
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      setError("Failed to delete appointment.");
    }
  };

  const confirmAppointment = async (appointmentId) => {
    try {
      const response = await axios.put(`/api/appointment/confirm/?id=${appointmentId}`);
      if (response.status === 200) {
        setDoctor((prevDoctor) => ({
          ...prevDoctor,
          appointments: prevDoctor.appointments.map((app) =>
            app.id === appointmentId ? { ...app, status: "confirmed" } : app
          ),
        }));
      }
    } catch (error) {
      console.error("Error confirming appointment:", error);
      setError("Failed to confirm appointment.");
    }
  };

  const completedAppointment = async (appointmentId) => {
    try {
      const response = await axios.put(`/api/appointment/completed/?id=${appointmentId}`);
      if (response.status === 200) {
        setDoctor((prevDoctor) => ({
          ...prevDoctor,
          appointments: prevDoctor.appointments.map((app) =>
            app.id === appointmentId ? { ...app, status: "completed" } : app
          ),
        }));
      }
    } catch (error) {
      console.error("Error completing appointment:", error);
      setError("Failed to complete appointment.");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!doctor) return <div>Loading...</div>;

  return (
    <section className="flex flex-col justify-start items-start px-7 py-14 w-full overflow-y-scroll">
      <div className="w-full">
        <h3 className="text-3xl font-medium mb-5">Appointments</h3>
        <div className="flex flex-col justify-start items-start w-full gap-6">
          {doctor.appointments && doctor.appointments.length > 0 ? (
            doctor.appointments.map((appointment) => {
              const startTime = new Date(appointment.startTime.start);
              const endTime = new Date(appointment.startTime.end);
              const durationMinutes = Math.round((endTime - startTime) / 60000); // Calculate duration in minutes

              return (
                <div key={appointment.id} className="p-5 rounded-lg w-full card shadow-md">
                  <div className="space-y-2">
                    <p>
                      <span className="text-lg md:text-xl font-medium">Subject:</span>{" "}
                      {appointment.subject}
                    </p>
                    <p>
                      <span className="text-lg md:text-xl font-medium">Patient:</span>{" "}
                      {appointment.userName}
                    </p>
                    <p>
                      <span className="text-lg md:text-xl font-medium">Date:</span>{" "}
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="text-lg md:text-xl font-medium">Time:</span>{" "}
                      {`${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`}
                    </p>
                    <p>
                      <span className="text-lg md:text-xl font-medium">Duration:</span>{" "}
                      {durationMinutes} minutes
                    </p>
                    <p>
                      <span className="text-lg md:text-xl font-medium">Status:</span>{" "}
                      {appointment.status}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <button
                      onClick={() => deleteAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-700 mt-3"
                    >
                      <AiOutlineDelete size={28} />
                    </button>
                    <button
                      onClick={() => confirmAppointment(appointment.id)}
                      className="text-green-500 hover:text-green-700 mt-3"
                    >
                      <GiConfirmed size={28} />
                    </button>
                    <button
                      onClick={() => completedAppointment(appointment.id)}
                      className="text-sky-800 hover:text-sky-900 mt-3"
                    >
                      <IoCheckmarkDoneCircle size={28} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-lg">No appointments available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DoctorInfo;
