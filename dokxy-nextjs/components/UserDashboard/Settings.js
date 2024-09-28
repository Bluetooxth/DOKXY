"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ToastMessage from "../ToastMessage";

const getToastMessage = (status) => {
  const messages = {
    200: "User updated successfully",
    400: "Bad request",
    404: "User not found",
    500: "Internal server error",
  };

  return {
    message: messages[status] || "An error occurred",
    type: status >= 400 ? "error" : "success",
  };
};

const Settings = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        const { name, username, phoneNumber, address } = response.data;

        setName(name);
        setUsername(username);
        setPhoneNumber(phoneNumber);
        setAddress(address);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setToast({
          message: "Failed to load user details",
          type: "error",
        });
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        `/api/user/update`,
        { name, username, password, phoneNumber, address },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const toastMessage = getToastMessage(response.status);
      setToast(toastMessage);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const toastMessage = getToastMessage(error.response.status);
        setToast(toastMessage);
      } else {
        setToast({ message: "Internal server error", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-start items-center min-h-screen w-full px-7 py-14">
      <div className="flex flex-col justify-start items-center gap-8 w-full">
        <h3 className="text-4xl font-medium self-start">Your Profile</h3>
        <div className="w-full">
          <form className="flex flex-col gap-4 w-full" onSubmit={handleUpdate}>
            <label htmlFor="name" className="text-xl font-normal">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="username" className="text-xl font-normal">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password" className="text-xl font-normal">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="phoneNumber" className="text-xl font-normal">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <label htmlFor="address" className="text-xl font-normal">
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              type="submit"
              className="text-lg font-medium px-6 py-2 mt-4 rounded-lg self-start btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
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

export default Settings;