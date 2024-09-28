"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RiLogoutBoxRLine, RiMenu3Line } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { MdOutlineDashboard } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Sidebar = ({ setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <header className="flex justify-start items-start lg:h-screen">
      <nav className="lg:flex hidden justify-start items-start p-5 lg:w-[300px] h-full sidebar">
        <div className="flex flex-col justify-start items-start gap-4 w-full">
          <Link href={"/user-dashboard"} className="self-center">
            <span className="text-3xl font-medium flex items-center gap-2">
              <MdOutlineDashboard />
              <p>Dashboard</p>
            </span>
          </Link>
          <button
            className="flex items-center gap-2 w-full rounded-lg px-7 py-2 text-xl font-medium bg-zinc-700"
            onClick={() => setActiveComponent('appointment')}
          >
            <SlCalender />
            <p>Appointments</p>
          </button>
          <button
            className="flex items-center gap-2 w-full rounded-lg px-7 py-2 text-xl font-medium bg-zinc-700"
            onClick={() => setActiveComponent('settings')}
          >
            <CiSettings />
            <p>Settings</p>
          </button>
          <button className="flex items-center gap-2 w-full rounded-lg px-7 py-2 text-xl font-medium text-white bg-red-500 bg-opacity-85 hover:bg-opacity-95">
            <RiLogoutBoxRLine />
            <p>Logout</p>
          </button>
        </div>
      </nav>

      <nav className="lg:hidden flex flex-col justify-start items-start w-full px-5 py-3 sidebar">
        <div className="flex justify-between items-center w-full">
          <Link href={"/user-dashboard"}>
            <span className="text-3xl font-medium flex items-center gap-2">
              <MdOutlineDashboard />
              <p>Dashboard</p>
            </span>
          </Link>
          <button onClick={toggleMenu} className="text-3xl">
            <RiMenu3Line />
          </button>
        </div>
        {isOpen && (
          <div className="flex flex-col justify-start items-start gap-4 w-full mt-3">
            <button
              className="flex items-center gap-2 w-full rounded-lg px-7 py-2 text-xl font-medium bg-zinc-700"
              onClick={() => {
                setActiveComponent('appointment');
                toggleMenu();
              }}
            >
              <SlCalender />
              <p>Appointments</p>
            </button>
            <button
              className="flex items-center gap-2 w-full rounded-lg px-7 py-2 text-xl font-medium bg-zinc-700"
              onClick={() => {
                setActiveComponent('settings');
                toggleMenu();
              }}
            >
              <CiSettings />
              <p>Settings</p>
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 w-full rounded-lg px-7 py-2 text-xl font-medium bg-red-500 bg-opacity-85 hover:bg-opacity-95">
              <RiLogoutBoxRLine />
              <p>Logout</p>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Sidebar;