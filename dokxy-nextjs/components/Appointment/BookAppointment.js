"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ToastMessage from "../ToastMessage";
import { useRouter, useSearchParams } from "next/navigation";

const getToastMessage = (status) => {
  const messages = {
    201: "Appointment booked successfully",
    400: "Bad request: All fields are required",
    409: "Conflict: Appointment already booked at this time",
    500: "Internal server error",
  };

  return {
    message: messages[status] || "An error occurred",
    type: status >= 400 ? "error" : "success",
  };
};

const BookAppointment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorNameParam = searchParams.get("doctorName") || "";
  const doctorEmailParam = searchParams.get("doctorEmail") || "";

  const [doctorName, setDoctorName] = useState(doctorNameParam);
  const [doctorEmail, setDoctorEmail] = useState(doctorEmailParam);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentStatus] = useState("scheduled");
  const [toast, setToast] = useState(null);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get("/api/user/profile");
      const { data } = response;
      setPatientName(data.name);
      setPatientEmail(data.email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAppointmentBooking = async (e) => {
    e.preventDefault();
    try {
      if (
        !doctorName ||
        !doctorEmail ||
        !patientName ||
        !patientEmail ||
        !appointmentDate ||
        !appointmentTime ||
        !appointmentType
      ) {
        setToast({ message: "Please fill in all fields", type: "error" });
        return;
      }

      const response = await axios.post(
        `/api/appointment/book`,
        {
          doctorName,
          doctorEmail,
          patientName,
          patientEmail,
          appointmentDate,
          appointmentTime,
          appointmentType,
          appointmentStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const toastMessage = getToastMessage(response.status);
      setToast(toastMessage);

      if (response.status === 201) {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      const status = error.response?.status;
      const toastMessage = getToastMessage(status || 500);
      setToast(toastMessage);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  return (
    <section className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="w-[95vw] lg:container flex flex-col justify-start items-center gap-8 mt-12 mb-12 px-5">
        <h3 className="text-4xl font-medium text-center">Book Appointment</h3>
        <div className="w-full">
          <h4 className="text-3xl font-medium mb-6">
            Fill in appointment details
          </h4>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleAppointmentBooking}
          >
            <label htmlFor="doctorName" className="text-xl font-normal">
              Doctor Name
            </label>
            <input
              type="text"
              placeholder="Doctor Name"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              readOnly
            />

            <label htmlFor="doctorEmail" className="text-xl font-normal">
              Doctor Email
            </label>
            <input
              type="email"
              placeholder="Doctor Email"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={doctorEmail}
              onChange={(e) => setDoctorEmail(e.target.value)}
              readOnly
            />

            <label htmlFor="patientName" className="text-xl font-normal">
              Patient Name
            </label>
            <input
              type="text"
              placeholder="Patient Name"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />

            <label htmlFor="patientEmail" className="text-xl font-normal">
              Patient Email
            </label>
            <input
              type="email"
              placeholder="Patient Email"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
            />

            <label htmlFor="appointmentDate" className="text-xl font-normal">
              Appointment Date
            </label>
            <input
              type="date"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />

            <label htmlFor="appointmentTime" className="text-xl font-normal">
              Appointment Time
            </label>
            <input
              type="time"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />

            <label htmlFor="appointmentType" className="text-xl font-normal">
              Subject
            </label>
            <input
              type="text"
              placeholder="Subject"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
            />

            <button
              type="submit"
              className="text-lg font-medium px-6 py-2 mt-4 rounded-lg self-start btn"
            >
              Book Appointment
            </button>
          </form>
        </div>

        {toast && (
          <ToastMessage
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </section>
  );
};

export default BookAppointment;