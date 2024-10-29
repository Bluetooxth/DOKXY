"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(`/api/appointment/delete/?id=${appointmentId}`);
      if (response.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          appointments: prevUser.appointments.filter((app) => app.id !== appointmentId),
        }));
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const formatTimeRange = (start, end) => {
    const startTime = new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const endTime = new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${startTime} - ${endTime}`;
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMinutes = Math.round((endDate - startDate) / 60000);
    return `${durationMinutes} minute${durationMinutes !== 1 ? 's' : ''}`;
  };

  if (!user) return <div>Loading...</div>;

  return (
    <section className="flex flex-col justify-start items-start px-7 py-14 w-full overflow-y-scroll">
      <div className="w-full">
        <h3 className="text-3xl font-medium mb-5">Appointments</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-start items-start w-full gap-6">
          {user.appointments && user.appointments.length > 0 ? (
            user.appointments.map((appointment) => {
              return (
                <div key={appointment.id} className="p-5 rounded-lg w-full card ">
                  <div className="space-y-2">
                    <p>
                      <span className="text-lg md:text-xl font-medium">Subject:</span>{" "}
                      {typeof appointment.subject === 'string' ? appointment.subject : JSON.stringify(appointment.subject)}
                    </p>
                    <p>
                      <span className="text-lg md:text-xl font-medium">Doctor:</span>{" "}
                      {typeof appointment.doctorName === 'string' ? appointment.doctorName : JSON.stringify(appointment.doctorName)}
                    </p>
                    <p>
                      <span className="text-lg md:text-xl font-medium">Date:</span>{" "}
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="text-lg md:text-xl font-medium">Time:</span>{" "}
                      {formatTimeRange(appointment.startTime.start, appointment.startTime.end)}
                    </p>
                    <p>
                      <span className="text-lg md:text-xl font-medium">Duration:</span>{" "}
                      {calculateDuration(appointment.startTime.start, appointment.startTime.end)}
                    </p>
                    <p>
                      <span className="text-lg md:text-xl font-medium">Status:</span>{" "}
                      {typeof appointment.status === 'object' && appointment.status !== null
                        ? JSON.stringify(appointment.status)
                        : appointment.status}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteAppointment(appointment.id)}
                    className="text-red-500 hover:text-red-700 mt-3"
                  >
                    <AiOutlineDelete size={28} />
                  </button>
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

export default UserInfo;
