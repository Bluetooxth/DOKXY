import React from "react";
import Link from "next/link";
import { Hospital } from "lucide-react";

const Footer = () => {
  const socialMedia = [
    {
      name: "Facebook",
      url: "https://facebook.com",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
    },
  ];

  const linkedPages = [
    {
      name: "About Us",
      url: "/about",
    },
    {
      name: "Services",
      url: "/services",
    },
    {
      name: "Doctors",
      url: "/doctors",
    },
    {
      name: "Login",
      url: "/login",
    },
  ];

  const contactUs = {
    address: "Dokxy Solutions Pvt. Ltd",
    email: "info@dokxy.com",
    phone: "+1-234-567-890",
  };

  return (
    <footer className="flex flex-col justify-center items-center w-full footer">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7 py-10 lg:container w-[95vw]">

        <div className="flex flex-col justify-start h-full">
          <h2 className="text-2xl md:text-3xl font-medium flex items-center mb-2">
            Dokxy <Hospital className="ml-2" />
          </h2>
          <p className="text-xl">
          Dokxy connects patients with doctors for easy appointments
          </p>
        </div>

        <div className="flex flex-col justify-start h-full">
          <h2 className="text-2xl font-medium mb-2">Quick Links</h2>
          <ul className="flex flex-col gap-2 items-start mt-2">
            {linkedPages.map((page, index) => (
              <Link key={index} href={page.url} className="text-xl footeritem">
                {page.name}
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-start h-full">
          <h2 className="text-2xl font-medium mb-2">Follow Us</h2>
          <ul className="flex flex-col gap-2 items-start mt-2">
            {socialMedia.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                className="text-xl footeritem"
              >
                {social.name}
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-start h-full">
          <h2 className="text-2xl font-medium mb-2">Get in Touch</h2>
          <ul className="flex flex-col gap-2 items-start mt-2">
            <li className="text-xl footeritem">{contactUs.address}</li>
            <li className="text-xl footeritem">{contactUs.email}</li>
            <li className="text-xl footeritem">{contactUs.phone}</li>
          </ul>
        </div>
      </div>
      <span className="w-full h-[1px] br mt-3 bg-slate-500" />
      <p className="text-md my-3">All rights reserved @Dokxy</p>
    </footer>
  );
};

export default Footer;