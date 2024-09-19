"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ToastMessage from "../ToastMessage";

const getToastMessage = (status) => {
  const messages = {
    201: "Doctor signup successful",
    400: "Bad request",
    409: "Doctor already exists",
    500: "Internal server error",
  };

  return {
    message: messages[status] || "An error occurred",
    type: status >= 400 ? "error" : "success",
  };
};

const DoctorSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password || !specialization || !yearsOfExperience) {
        setToast({ message: "Please fill in all fields", type: "error" });
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/doctor/signup`,
        { name, email, password, specialization, yearsOfExperience },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const toastMessage = getToastMessage(response.status);
      setToast(toastMessage);

      if (response.status === 201) {
        setTimeout(() => {
          router.push("/doctor-login");
        }, 2000);
      }
    } catch (error) {
      setToast({ message: "Internal server error", type: "error" });
    }
  };

  return (
    <section className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="w-[95vw] lg:container flex flex-col justify-start items-center gap-8 mt-12 mb-12 px-5">
        <h3 className="text-4xl font-medium text-center">Doctor Sign Up</h3>
        <div className="w-full">
          <h4 className="text-3xl font-medium mb-6">Create a new doctor account</h4>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSignup}>
            <label htmlFor="name" className="text-xl font-normal">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email" className="text-xl font-normal">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="text-xl font-normal">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="specialization" className="text-xl font-normal">Specialization</label>
            <input
              type="text"
              placeholder="Specialization"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />

            <label htmlFor="yearsOfExperience" className="text-xl font-normal">Years of Experience</label>
            <input
              type="number"
              placeholder="Years of Experience"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
            />

            <p>
              {`Already have a doctor account? `}
              <Link href="/doctor-login" className="refer hover:underline font-medium">Login</Link>
            </p>
            <p>
              {`If you are a user, `}
              <Link href="/user-signup" className="refer hover:underline font-medium">Sign up</Link>
            </p>
            <button
              type="submit"
              className="text-lg font-medium px-6 py-2 mt-4 rounded-lg self-start btn"
            >
              Sign Up
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

export default DoctorSignup;