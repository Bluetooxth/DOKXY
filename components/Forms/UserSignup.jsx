"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const getErrorMessage = (status) => {
  const messages = {
    200: "Signup successful",
    400: "Bad request",
    409: "Conflict: User already exists",
    500: "Internal server error",
  };
  return messages[status] || "An error occurred";
};

const UserSignup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!name || !username || !email || !password) {
        setError("Please fill in all fields");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        `/api/user/signup`,
        { name, username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        router.push("/login");
      } else {
        setError(getErrorMessage(response.status));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(getErrorMessage(error.response.status));
      } else {
        setError("Internal server error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="lg:container w-[95vw] flex flex-col justify-start items-center gap-8 mt-12 mb-12 px-5">
        <h3 className="text-4xl font-medium text-center">Sign Up</h3>
        <div className="w-full">
          <h4 className="text-3xl font-medium mb-6">Create a new account</h4>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSignup}>
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
              {`Already have an account? `}
              <Link href="/login" className="refer hover:underline font-medium">
                Login
              </Link>
            </p>
            <p>
              {`If you are a doctor, `}
              <Link
                href="/doctor-signup"
                className="refer hover:underline font-medium"
              >
                Register as Doctor
              </Link>
            </p>

            {error && <p className="text-red-600 font-medium">{error}</p>}

            <button
              type="submit"
              className={`px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md self-start btn ${
                isSubmitting ? "opacity-50" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserSignup;