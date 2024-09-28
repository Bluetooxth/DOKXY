import { NextResponse } from "next/server";
import Doctor from "@/models/doctor/doctorSchema";
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

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json(doctor, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}