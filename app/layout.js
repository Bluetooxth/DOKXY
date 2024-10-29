import "./globals.css";
import "./styles.css";

export const metadata = {
  title: "Dokxy - Patient facilitation service",
  description:
    "Dokxy is a platform that allows you to book appointments with doctors and other healthcare professionals.",
  keywords:
    "healthcare, appointments, doctors, medical, health, wellness, dokxy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}