import { NextResponse } from "next/server";
import Doctor from "@/models/doctor/doctorSchema";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function GET(req) {

  try {
    const doctors = await Doctor.find().select("name username email specialization yearsOfExperience phoneNumber address imageURL role");
    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}