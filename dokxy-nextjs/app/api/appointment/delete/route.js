import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function POST(req) {

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const appointment = await Appointment.findOneAndDelete({ _id: id });

    if (!appointment) {
      return NextResponse.json({ message: 'Appointment does not exist' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Appointment deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}