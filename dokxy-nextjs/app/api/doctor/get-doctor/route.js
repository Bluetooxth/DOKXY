import { NextResponse } from "next/server";
import Doctor from "@/models/doctor/doctorSchema";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    const doctor = await Doctor.findOne({ username });

    if (!doctor) {
      return NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}