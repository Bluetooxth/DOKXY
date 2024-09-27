import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services/Services";
import React from "react";

const ServicesPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="py-16">
        <Services />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default ServicesPage;