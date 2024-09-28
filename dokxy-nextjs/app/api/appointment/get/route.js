import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function GET(req) {
  try {
    const tokenResponse = await getDataFromToken(req);

    if (tokenResponse.status !== 200) {
      return NextResponse.json({ message: tokenResponse.error }, { status: tokenResponse.status });
    }

    const { email } = tokenResponse.data;

    if (!email) {
      return NextResponse.json({ message: "Email not found in token" }, { status: 400 });
    }

    const appointments = await Appointment.find({ email });
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}