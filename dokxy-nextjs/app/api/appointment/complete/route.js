import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function POST(req) {
  const { slug } = await req.json();

  if (!slug) {
    const response = NextResponse.json(
      { message: 'Appointment identifier is required' },
      { status: 400 }
    );
    setNoCacheHeaders(response);
    return response;
  }

  try {
    const appointment = await Appointment.findOne({ slug });

    if (!appointment) {
      const response = NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    if (appointment.appointmentStatus === 'completed') {
      const response = NextResponse.json(
        { message: 'Appointment is already marked as completed' },
        { status: 400 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    appointment.appointmentStatus = 'completed';
    await appointment.save();

    const response = NextResponse.json(
      { message: 'Appointment marked as completed successfully' },
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
