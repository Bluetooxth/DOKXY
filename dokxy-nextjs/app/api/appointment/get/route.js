import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function POST(req) {
  const tokenData = getDataFromToken(req);
  const { email } = tokenData;

  if (!email) {
    return NextResponse.json(
      { message: "Email not found in token" },
      { status: 400 }
    );
  }

  try {
    const appointments = await Appointment.find({ email });
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}