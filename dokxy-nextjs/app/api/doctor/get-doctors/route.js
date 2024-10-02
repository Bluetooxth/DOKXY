import { NextResponse } from "next/server";
import Doctor from "@/models/doctor/doctorSchema";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function GET(req) {
  try {
    const doctors = await Doctor.find();

    const response = NextResponse.json(doctors, { status: 200 });
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}