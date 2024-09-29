"use client";
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        console.log("Fetched token from cookies:", token);

        const fetchUser = async () => {
            try {
                if (token) {
                    setUser("User logged in");
                    console.log("User logged in");
                } else {
                    setUser(null);
                    console.log("User not logged in");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const authContextValue = useMemo(() => ({ user }), [user]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};