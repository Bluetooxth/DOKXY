import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./styles.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const font = localFont({
  src: "./fonts/InstrumentSans.ttf",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Dokxy || Patient facilation service",
  description:
    "Dokxy is a platform that allows you to book appointments with doctors and other healthcare professionals.",
  keywords:
    "healthcare, appointments, doctors, medical, health, wellness, dokxy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}