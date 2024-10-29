"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const getErrorMessage = (status) => {
  const messages = {
    200: "Update successful",
    400: "Bad request",
    401: "Unauthorized",
    500: "Internal server error",
  };
  return messages[status] || "An error occurred";
};

const UpdateUserProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userID, setUserID] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        const fetchedData = response.data.data;
        setUserID(fetchedData.id);
        setFormData({
          name: fetchedData.name || "",
          email: fetchedData.email || "",
          username: fetchedData.username || "",
          password: "",
          phoneNumber: fetchedData.phoneNumber || "",
        });
      } catch (error) {
        setError(getErrorMessage(error.response?.status || 500));
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!userID) {
      setError("User ID is required to update the profile.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.put(
        `/api/user/update?id=${userID}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        router.push("/user-dashboard");
      } else {
        setError(getErrorMessage(response.status));
      }
    } catch (error) {
      const status = error.response?.status || 500;
      setError(getErrorMessage(status));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="lg:container w-[95vw] flex flex-col justify-start items-center gap-8 mt-12 mb-12 px-5">
        <h3 className="text-4xl font-medium text-center">Update Profile</h3>
        <div className="w-full">
          <form className="flex flex-col gap-4 w-full" onSubmit={handleUpdate}>
            <div>
              <label htmlFor="name" className="text-xl font-normal capitalize">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xl font-normal capitalize">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username" className="text-xl font-normal capitalize">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xl font-normal capitalize">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="text-xl font-normal capitalize">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md self-start btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateUserProfile;
