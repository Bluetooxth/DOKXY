import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import dbConnect from "@/config/dbConnect";

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
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const slug = `${doctorName}-${appointmentDate}-${appointmentTime}`;

    const existingAppointment = await Appointment.findOne({ slug });

    if (existingAppointment) {
      return NextResponse.json({ message: 'Appointment already booked at this time' }, { status: 409 });
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

    return NextResponse.json({ message: 'Appointment booked successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}