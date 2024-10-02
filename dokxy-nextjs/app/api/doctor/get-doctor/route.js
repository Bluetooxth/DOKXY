import { NextResponse } from "next/server";
import Doctor from "@/models/doctor/doctorSchema";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    const doctor = await Doctor.findOne({ username });

    if (!doctor) {
      const response = NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const response = NextResponse.json(doctor, { status: 200 });
    setNoCacheHeaders(response);
    return response;
  } catch (error) {
    const response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    setNoCacheHeaders(response);
    return response;
  }
}
