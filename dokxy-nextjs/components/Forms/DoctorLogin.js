"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ToastMessage from "../ToastMessage";

const getToastMessage = (status) => {
  const messages = {
    200: "Doctor login successful",
    400: "Bad request",
    401: "Unauthorized",
    500: "Internal server error",
  };

  return {
    message: messages[status] || "An error occurred",
    type: status >= 400 ? "error" : "success",
  };
};

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setToast({ message: "Please fill in all fields", type: "error" });
        return;
      }
  
      const response = await axios.post(
        `/api/doctor/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const toastMessage = getToastMessage(response.status);
      setToast(toastMessage);
  
      if (response.status === 200) {
          router.push("/doctor-dashboard");
      }
    } catch (error) {
      const status = error.response?.status;
      const toastMessage = getToastMessage(status || 500);
      setToast(toastMessage);
    }
  };  

  return (
    <section className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="w-[95vw] lg:container flex flex-col justify-start items-center gap-8 mt-12 mb-12 px-5">
        <h3 className="text-4xl font-medium text-center">Doctor Login</h3>
        <div className="w-full">
          <h4 className="text-3xl font-medium mb-6">Login to your doctor account</h4>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
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
            <p>
              {`Don't have a doctor account? `}
              <Link href="/doctor-signup" className="refer hover:underline font-medium">Sign up</Link>
            </p>
            <p>
              {`If you are a user, `}
              <Link href="/login" className="refer hover:underline font-medium">Login</Link>
            </p>
            <button
              type="submit"
              className="text-lg font-medium px-6 py-2 mt-4 rounded-lg self-start btn"
            >
              Login
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

export default DoctorLogin;