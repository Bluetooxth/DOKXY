import BookAppointment from "@/components/Appointment/BookAppointment";
import React, { Suspense } from "react";

const BookAppointmentPage = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <main className="py-14">
          <BookAppointment />
        </main>
      </Suspense>
    </React.Fragment>
  );
};

export default BookAppointmentPage;