"use client"; 
import React, { useState } from "react";
import DoctorInfo from "@/components/Dashboard/Doctor/DoctorInfo"; 
import Navigation from "@/components/Dashboard/Doctor/Navigation"; 
import UpdateDoctorProfile from "@/components/Dashboard/Doctor/Settings"; 

const DoctorDashboard = () => {
    const [activeComponent, setActiveComponent] = useState("appointments");

    return (
        <div className="flex flex-col lg:flex-row w-full h-full">
            <Navigation setActiveComponent={setActiveComponent} />
            <div className="flex-1">
                {activeComponent === "appointments" && <DoctorInfo />}
                {activeComponent === "settings" && <UpdateDoctorProfile />}
            </div>
        </div>
    );
}

export default DoctorDashboard;
