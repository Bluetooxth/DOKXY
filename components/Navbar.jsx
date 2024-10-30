"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Hospital } from "lucide-react";
import { useAuth } from "@/hooks/auth";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { isAuthenticated, role } = useAuth();

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
        <div className="lg:container w-[95vw] gap-5 text-center px-5 flex flex-col justify-start items-start py-3">
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
                className="text-lg lg:text-xl font-medium navitem"
                aria-label="Our Services"
              >
                Services
              </Link>
              <Link
                href="/doctors"
                className="text-lg lg:text-xl font-medium navitem"
                aria-label="Our Doctors"
              >
                Doctors
              </Link>
            </div>
            <div className="hidden lg:flex space-x-5">
              {isAuthenticated ? (
                <Link
                  href={`/${
                    role === "patient" ? "user-dashboard" : `${role}-dashboard`
                  }`} // Adjusted for patient role
                  className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md btn"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={`/login`}
                    className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md loginbtn"
                  >
                    Login
                  </Link>
                  <Link
                    href={`/signup`}
                    className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md btn"
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
            className={`lg:hidden w-full flex flex-col justify-start items-center mt-3 space-y-5 ${
              navbar ? "flex" : "hidden"
            }`}
          >
            <Link
              href="/services"
              onClick={closeNavbar}
              className="text-lg lg:text-xl font-medium navitem"
              aria-label="Our Services"
            >
              Services
            </Link>
            <Link
              href="/doctors"
              onClick={closeNavbar}
              className="text-lg lg:text-xl font-medium navitem"
              aria-label="Our Doctors"
            >
              Doctors
            </Link>
            <div className="flex justify-between items-center w-full gap-5 text-center">
              {isAuthenticated ? (
                <Link
                  href={`/${
                    role === "patient" ? "user-dashboard" : `${role}-dashboard`
                  }`} // Adjusted for patient role
                  className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md btn w-full"
                  onClick={closeNavbar}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={`/login`}
                    className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md loginbtn w-full"
                    onClick={closeNavbar}
                  >
                    Login
                  </Link>
                  <Link
                    href={`/signup`}
                    className="px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md btn w-full"
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
