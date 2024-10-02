import { NextResponse } from "next/server";
import Doctor from "@/models/doctor/doctorSchema";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function GET(req) {
  try {
    const doctors = await Doctor.find();
    const response = NextResponse.json(doctors, { status: 200 });
    setNoCacheHeaders(response);
    return response;
  } catch (error) {
    const response = NextResponse.json({ message: "Internal server error" }, { status: 500 });
    setNoCacheHeaders(response);
    return response;
  }
}
