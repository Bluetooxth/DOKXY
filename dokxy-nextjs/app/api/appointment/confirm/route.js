import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function PATCH(req) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: 'Appointment identifier is required' }, { status: 400 });
  }

  try {
    const appointment = await Appointment.findOne({ _id: id });

    if (!appointment) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
    }

    if (appointment.appointmentStatus === 'confirmed') {
      return NextResponse.json({ message: 'Appointment is already confirmed' }, { status: 400 });
    }

    appointment.appointmentStatus = 'confirmed';
    await appointment.save();

    return NextResponse.json({ message: 'Appointment confirmed successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}