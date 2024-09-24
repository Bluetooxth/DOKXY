import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function POST(req) {

  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json({ message: 'Appointment identifier is required' }, { status: 400 });
  }

  try {
    const appointment = await Appointment.findOne({ slug });

    if (!appointment) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
    }

    if (appointment.appointmentStatus === 'completed') {
      return NextResponse.json({ message: 'Appointment is already marked as completed' }, { status: 400 });
    }

    appointment.appointmentStatus = 'completed';
    await appointment.save();

    return NextResponse.json({ message: 'Appointment marked as completed successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}