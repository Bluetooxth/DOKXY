import Doctor from "@/models/doctor/doctorSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function POST(req) {
  try {
    const { name, username, email, password, specialization, yearsOfExperience } = await req.json();

    if (!name || !username || !email || !password || !specialization || !yearsOfExperience) {
      const response = NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      const response = NextResponse.json(
        { message: "Doctor already exists" },
        { status: 400 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({
      name,
      username,
      email,
      password: hashedPassword,
      specialization,
      yearsOfExperience,
    });

    await doctor.save();

    const response = NextResponse.json(
      { message: "Doctor signup successful" },
      { status: 201 }
    );
    setNoCacheHeaders(response);

    return response;
  } catch (error) {
    console.error("Error:", error);
    const response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    setNoCacheHeaders(response);

    return response;
  }
}
