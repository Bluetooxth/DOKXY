"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const getErrorMessage = (status) => {
  const messages = {
    200: "Appointment booked successfully!",
    400: "Bad request",
    404: "Doctor not found",
    500: "Internal server error",
  };
  return messages[status] || "An error occurred";
};

const DoctorProfile = () => {
  const { username } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    doctorID: "",
    date: "",
    startTime: "",
    duration: 15,
    subject: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`/api/doctor/get?username=${username}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setDoctor(response.data.data);
        setFormData((prev) => ({
          ...prev,
          doctorID: response.data.data.id,
        }));
      }
    } catch (error) {
      console.error("Error fetching doctor:", error);
      setDoctor(null);
      setError(
        error.response
          ? getErrorMessage(error.response.status)
          : "Internal server error"
      );
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    console.log("Form Data:", formData);

    try {
      const response = await axios.post("/api/appointment/book", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setSuccessMessage(getErrorMessage(200));
        setFormData({
          doctorID: "",
          date: "",
          startTime: "",
          duration: 15,
          subject: "",
        });
      } else {
        setError(getErrorMessage(response.status));
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError(
        error.response
          ? getErrorMessage(error.response.status)
          : "Internal server error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [username]);

  return (
    <section className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="lg:container w-[95vw] flex flex-col justify-start items-start gap-8 px-5">
        <div className="w-full">
          {doctor ? (
            <>
              <div className="flex flex-col gap-4">
                <img
                  src={doctor.profile_url}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-xl self-start"
                />
                <h4 className="text-3xl font-medium">{doctor.name}</h4>
                <p className="text-lg lg:text-xl font-normal">
                  <span className="text-lg md:text-xl font-medium">
                    Specialization:
                  </span>{" "}
                  {doctor.specialization}
                </p>
                <p className="text-lg lg:text-xl font-normal">
                  <span className="text-lg md:text-xl font-medium">
                    Experience:
                  </span>{" "}
                  {doctor.yearsOfExperience} years
                </p>
                <p className="text-lg lg:text-xl font-normal">
                  <span className="text-lg md:text-xl font-medium">
                    Qualification:
                  </span>{" "}
                  {doctor.qualification}
                </p>
                <p className="text-lg lg:text-xl font-normal">
                  <span className="text-lg md:text-xl font-medium">Email:</span>{" "}
                  {doctor.email}
                </p>
                <p className="text-lg lg:text-xl font-normal">
                  <span className="text-lg md:text-xl font-medium">Phone:</span>{" "}
                  {doctor.phoneNumber}
                </p>
                <p className="text-lg lg:text-xl font-normal">
                  <span className="text-lg md:text-xl font-medium">
                    Address:
                  </span>{" "}
                  {doctor.address}
                </p>
                <p className="text-lg lg:text-xl font-normal">
                  <span className="text-lg md:text-xl font-medium">
                    Timing:
                  </span>{" "}
                  {doctor.startTime} - {doctor.endTime}
                </p>
              </div>

              <form
                className="flex flex-col gap-4 w-full mt-4"
                onSubmit={handleAppointmentSubmit}
              >
                <h4 className="text-2xl font-medium">Book an Appointment</h4>

                <div className="flex flex-col justify-start items-start w-full gap-2">
                  <label htmlFor="date" className="text-xl font-normal">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none border border-gray-300"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col justify-start items-start w-full gap-2">
                  <label htmlFor="startTime" className="text-xl font-normal">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none border border-gray-300"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col justify-start items-start w-full gap-2">
                  <label htmlFor="duration" className="text-xl font-normal">
                    Duration (minutes)
                  </label>
                  <select
                    className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none border border-gray-300"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: Number(e.target.value),
                      })
                    }
                    required
                  >
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={20}>20 minutes</option>
                    <option value={30}>30 minutes</option>
                  </select>
                </div>

                <div className="flex flex-col justify-start items-start w-full gap-2">
                  <label htmlFor="subject" className="text-xl font-normal">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none border border-gray-300"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                  />
                </div>

                {error && <p className="text-red-600 font-medium">{error}</p>}
                {successMessage && (
                  <p className="text-green-600 font-medium">{successMessage}</p>
                )}

                <button
                  type="submit"
                  className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md self-start btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Book Appointment"}
                </button>
              </form>
            </>
          ) : (
            <p className="text-xl font-normal text-center">
              {error || "Loading..."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
