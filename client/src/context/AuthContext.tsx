"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";

interface AuthContextType {
  user: any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getCookie("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await axios.get("/api/get-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          deleteCookie("token");
        }
        setUser(null);
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