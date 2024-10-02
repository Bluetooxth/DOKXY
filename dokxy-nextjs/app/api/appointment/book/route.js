import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function POST(req) {
  const {
    doctorName,
    doctorEmail,
    patientName,
    patientEmail,
    appointmentDate,
    appointmentTime,
    appointmentType,
    appointmentStatus,
  } = await req.json();

  if (
    !doctorName ||
    !doctorEmail ||
    !patientName ||
    !patientEmail ||
    !appointmentDate ||
    !appointmentTime ||
    !appointmentType ||
    !appointmentStatus
  ) {
    const response = NextResponse.json(
      { message: 'All fields are required' },
      { status: 400 }
    );
    setNoCacheHeaders(response);
    return response;
  }

  try {
    const slug = `${doctorName}-${appointmentDate}-${appointmentTime}`;
    const existingAppointment = await Appointment.findOne({ slug });

    if (existingAppointment) {
      const response = NextResponse.json(
        { message: 'Appointment already booked at this time' },
        { status: 409 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const appointment = new Appointment({
      slug,
      doctorName,
      doctorEmail,
      patientName,
      patientEmail,
      appointmentDate,
      appointmentTime,
      appointmentType,
      appointmentStatus,
    });

    await appointment.save();

    const response = NextResponse.json(
      { message: 'Appointment booked successfully' },
      { status: 201 }
    );
    setNoCacheHeaders(response);
    return response;
  } catch (error) {
    console.error("Error booking appointment:", error);
    const response = NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
    setNoCacheHeaders(response);
    return response;
  }
}