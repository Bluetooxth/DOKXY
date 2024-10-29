"use client"
import React, { useState } from "react"
import UserInfo from "@/components/Dashboard/User/UserInfo"
import Navigation from "@/components/Dashboard/User/Navigation"
import UpdateUserProfile from "@/components/Dashboard/User/Settings"

const UserDashboard = () => {
    const [activeComponent, setActiveComponent] = useState("appointments")

    return (
        <div className="flex flex-col lg:flex-row w-full h-full">
            <Navigation setActiveComponent={setActiveComponent} />
            <div className="flex-1">
                {activeComponent === "appointments" && <UserInfo />}
                {activeComponent === "settings" && <UpdateUserProfile />}
            </div>
        </div>
    )
}

export default UserDashboard