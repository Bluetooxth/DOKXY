"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import ToastMessage from "../ToastMessage";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/appointment/get");
      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (appointmentId) => {
    try {
      const response = await axios.delete(`/api/appointment/delete?id=${appointmentId}`);
      setAppointments(
        appointments.filter((appointment) => appointment._id !== appointmentId)
      );
      setToast({
        message: "Appointment deleted successfully",
        type: "success",
      });
    } catch (error) {
      setToast({ message: "Failed to delete appointment", type: "error" });
      console.log(error);
    }
  };

  const handleConfirm = async (appointmentId) => {
    try {
      const response = await axios.patch(
        "/api/appointment/confirm",
        { id: appointmentId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToast({
        message: "Appointment confirmed successfully",
        type: "success",
      });
    } catch (error) {
      setToast({ message: "Failed to confirm appointment", type: "error" });
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
              <p className="text-xl font-medium flex items-center gap-2">
                <span>Patient:</span>
                <span>{appointment.patientName}</span>
              </p>
              <p className="text-xl font-medium flex items-center gap-2">
                <span>Date:</span>
                <span>{formatDate(appointment.appointmentDate)}</span>
              </p>
              <p className="text-xl font-medium flex items-center gap-2">
                <span>Time:</span>
                <span>{appointment.appointmentTime}</span>
              </p>
              <p className="text-xl font-medium flex items-center gap-2">
                <span>Subject:</span>
                <span>{appointment.appointmentType}</span>
              </p>
              <p className="text-xl font-medium flex items-center gap-2">
                <span>Status:</span>
                <span>{appointment.appointmentStatus}</span>
              </p>
              <button
                className="mt-3 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-200 self-end"
                onClick={() => handleDelete(appointment._id)}
              >
                <AiOutlineDelete className="text-2xl" />
              </button>
              <button
                onClick={() => handleConfirm(appointment._id)}
                className="mt-3 p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition duration-200 self-end"
              >
                <GiConfirmed className="text-2xl" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
};

export default Appointment;