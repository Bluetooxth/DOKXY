import localFont from "next/font/local";
import "./globals.css";
import "./styles.css";
import { AuthProvider } from "@/context/AuthContext";

const font = localFont({
  src: "./fonts/InstrumentSans.ttf",
  weight: "400 500",
});

export const metadata = {
  title: "Dokxy || Patient facilation service",
  description:
    "Dokxy is a platform that allows you to book appointments with doctors and other healthcare professionals.",
  keywords:
    "healthcare, appointments, doctors, medical, health, wellness, dokxy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}