"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { getCookie, deleteCookie } from "cookies-next";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getCookie("token");
      if (!token) {
        setUser(null);
        return;
      }
      else{
        setUser(true)
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    deleteCookie("token");
    setUser(null);
  };

  const authContextValue = useMemo(() => ({ user, logout }), [user]);

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