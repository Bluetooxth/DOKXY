"use client"; 
import Link from "next/link";
import React, { useState } from "react";
import { RiLogoutBoxRLine, RiMenu3Line } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navigation = ({ setActiveComponent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/logout");
            if (response.status === 200) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="flex justify-start items-start sticky top-0 lg:h-screen">
            <nav className="lg:flex hidden justify-start items-start p-5 lg:w-[300px] h-full sidebar">
                <div className="flex flex-col justify-start items-start gap-4 w-full">
                    <Link href={"/user-dashboard"} className="self-center">
                        <span className="text-3xl font-medium flex items-center gap-2">
                            <p>Dashboard</p>
                        </span>
                    </Link>

                    <button
                        className="flex items-center gap-2 w-full rounded-lg px-5 py-1 md:py-2 text-lg md:text-xl font-medium"
                        onClick={() => setActiveComponent("appointments")}
                    >
                        <SlCalender />
                        <p>Appointments</p>
                    </button>

                    <button
                        className="flex items-center gap-2 w-full rounded-lg px-5 py-1 md:py-2 text-lg md:text-xl font-medium"
                        onClick={() => setActiveComponent("settings")}
                    >
                        <CiSettings />
                        <p>Settings</p>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full rounded-lg px-5 py-1 md:py-2 text-lg md:text-xl font-medium text-white bg-red-500 bg-opacity-85 hover:bg-opacity-95"
                    >
                        <RiLogoutBoxRLine />
                        <p>Logout</p>
                    </button>
                </div>
            </nav>

            <nav className="lg:hidden flex flex-col justify-start items-start w-full px-5 py-3 sidebar">
                <div className="flex justify-between items-center w-full">
                    <button onClick={toggleMenu} className="text-3xl">
                        <RiMenu3Line />
                    </button>
                </div>
                {isOpen && (
                    <div className="flex flex-col justify-start items-center gap-4 w-full mt-3">
                        <button
                            className="flex items-center gap-2 text-lg md:text-xl font-medium"
                            onClick={() => {
                                setActiveComponent("appointments");
                                toggleMenu();
                            }}
                        >
                            <SlCalender />
                            <p>Appointments</p>
                        </button>

                        <button
                            className="flex items-center gap-2 text-lg md:text-xl font-medium"
                            onClick={() => {
                                setActiveComponent("settings");
                                toggleMenu();
                            }}
                        >
                            <CiSettings />
                            <p>Settings</p>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 self-center rounded-lg px-5 py-1 md:py-2 text-lg md:text-xl font-medium bg-red-500 bg-opacity-85 hover:bg-opacity-95"
                        >
                            <RiLogoutBoxRLine />
                            <p>Logout</p>
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navigation;
