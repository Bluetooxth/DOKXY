"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ToastMessage from "../ToastMessage";

const getToastMessage = (status) => {
  const messages = {
    200: "Login successful",
    400: "Bad request",
    401: "Unauthorized",
    500: "Internal server error",
  };

  return {
    message: messages[status] || "An error occurred",
    type: status >= 400 ? "error" : "success",
  };
};

const UserLogin = () => {
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
        `/api/user/login`,
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
        setEmail("");
        setPassword("");
        setTimeout(() => {
          router.push("/user-dashboard");
        }, 500);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const toastMessage = getToastMessage(error.response.status);
        setToast(toastMessage);
      } else {
        setToast({ message: "Internal server error", type: "error" });
      }
    }
  };

  return (
    <section className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="w-[95vw] lg:container flex flex-col justify-start items-center gap-8 mt-12 mb-12 px-5">
        <h3 className="text-4xl font-medium text-center">Login</h3>
        <div className="w-full">
          <h4 className="text-3xl font-medium mb-6">Please login to your account</h4>
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
              {`Don't have an account? `}
              <Link href="/signup" className="refer hover:underline font-medium">Register</Link>
            </p>
            <p>
              {`If you are a doctor then `}
              <Link href="/doctor-login" className="refer hover:underline font-medium">Login as Doctor</Link>
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

export default UserLogin;