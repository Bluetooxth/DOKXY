"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ToastMessage from "../ToastMessage";

interface Toast {
  message: string;
  type: string;
}

const DoctorLoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toast, setToast] = useState<Toast | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setToast({ message: "Please fill in all fields", type: "error" });
        return;
      }

      const response = await axios.post(
        "/api/doctor-login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        setToast({ message: response.data.message, type: "success" });
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data && axiosError.response.status === 400) {
        setToast({ message: (axiosError.response.data as any).message, type: "error" });
      } else {
        setToast({ message: "Internal server error", type: "error" });
      }
    }
  };

  return (
    <section className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="w-[95vw] lg:container flex flex-col justify-start items-center gap-8 mt-12 mb-12 px-5">
        <h3 className="text-4xl font-medium text-center">Doctor Login</h3>
        <div className="w-full">
          <h4 className="text-3xl font-medium mb-6">
            Please login to your account
          </h4>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
            <label htmlFor="email" className="text-xl font-normal">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="text-lg font-normal px-4 py-2 w-full rounded-lg bg-transparent outline-none input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <p>
              {`Don't have an account? `}
              <Link
                href="/doctor-signup"
                className="refer hover:underline font-medium"
              >
                Register
              </Link>
            </p>
            <p>
              {`If you are a patient then `}
              <Link
                href="/login"
                className="refer hover:underline font-medium"
              >
                Login as Patient
              </Link>
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
          <ToastMessage message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </section>
  );
};

export default DoctorLoginForm;
