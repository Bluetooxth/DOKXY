import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function PATCH(req) {
  const { id } = await req.json();

  if (!id) {
    const response = NextResponse.json(
      { message: 'Appointment identifier is required' },
      { status: 400 }
    );
    setNoCacheHeaders(response);
    return response;
  }

  try {
    const appointment = await Appointment.findOne({ _id: id });

    if (!appointment) {
      const response = NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    if (appointment.appointmentStatus === 'confirmed') {
      const response = NextResponse.json(
        { message: 'Appointment is already confirmed' },
        { status: 400 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    appointment.appointmentStatus = 'confirmed';
    await appointment.save();

    const response = NextResponse.json(
      { message: 'Appointment confirmed successfully' },
      { status: 200 }
    );
    setNoCacheHeaders(response);

    return response;
  } catch (error) {
    const response = NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
    setNoCacheHeaders(response);

    return response;
  }
}
