"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Hospital } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { user } = useAuth();

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  const closeNavbar = () => {
    setTimeout(() => {
      setNavbar(false);
    }, 500);
  };

  return (
    <header className="w-full sticky top-0 z-20 navbar">
      <nav className="flex justify-center items-center w-full">
        <div className="lg:container flex flex-col justify-start items-start w-full px-5 py-3">
          <div className="flex justify-between items-center w-full">
            <Link
              href="/"
              className="text-3xl font-medium flex gap-2 items-center"
              aria-label="Dokxy Homepage"
            >
              <span className="flex justify-center items-center gap-2">
                Dokxy
                <Hospital className="text-4xl" />
              </span>
            </Link>
            <div className="hidden lg:flex space-x-10">
              <Link
                href="/services"
                className="text-xl font-medium navitem"
                aria-label="Our Services"
              >
                Services
              </Link>
              <Link
                href="/doctors"
                className="text-xl font-medium navitem"
                aria-label="Our Doctors"
              >
                Doctors
              </Link>
              <Link
                href="/appointment"
                className="text-xl font-medium navitem"
                aria-label="Book an Appointment"
              >
                Appointment
              </Link>
            </div>
            <div className="hidden lg:flex space-x-5">
              {user ? (
                <Link
                  href={`/dashboard`}
                  className="px-7 py-2 text-xl font-medium rounded-xl btn"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={`/login`}
                    className="px-7 py-2 text-xl font-medium rounded-xl loginbtn"
                  >
                    Login
                  </Link>
                  <Link
                    href={`/signup`}
                    className="px-7 py-2 text-xl font-medium rounded-xl btn"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            <button
              className="lg:hidden flex items-center justify-center"
              onClick={toggleNavbar}
              aria-label={navbar ? "Close Menu" : "Open Menu"}
            >
              {navbar ? (
                <RiCloseLine className="text-3xl" />
              ) : (
                <RiMenu3Line className="text-3xl" />
              )}
            </button>
          </div>
          <div
            className={`lg:hidden w-full flex flex-col justify-start items-start mt-3 space-y-5 ${
              navbar ? "flex" : "hidden"
            }`}
          >
            <Link
              href="/services"
              onClick={closeNavbar}
              className="text-xl font-medium px-7 py-2 rounded-lg bg-zinc-700 w-full"
              aria-label="Our Services"
            >
              Services
            </Link>
            <Link
              href="/doctors"
              onClick={closeNavbar}
              className="text-xl font-medium px-7 py-2 rounded-lg bg-zinc-700 w-full"
              aria-label="Our Doctors"
            >
              Doctors
            </Link>
            <Link
              href="/appointment"
              onClick={closeNavbar}
              className="text-xl font-medium px-7 py-2 rounded-lg bg-zinc-700 w-full"
              aria-label="Book an Appointment"
            >
              Appointment
            </Link>
            <div className="flex justify-between items-center w-full gap-5 text-center">
              {user ? (
                <Link
                  href={`/dashboard`}
                  className="px-7 py-2 text-xl font-medium rounded-xl btn w-full"
                  onClick={closeNavbar}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={`/login`}
                    className="px-7 py-2 text-xl font-medium rounded-xl loginbtn w-full"
                    onClick={closeNavbar}
                  >
                    Login
                  </Link>
                  <Link
                    href={`/signup`}
                    className="px-7 py-2 text-xl font-medium rounded-xl btn w-full"
                    onClick={closeNavbar}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;