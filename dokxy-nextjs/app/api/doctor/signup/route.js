import Doctor from "@/models/doctor/doctorSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function POST(req) {
  const { name, email, password, specialization, yearsOfExperience } =
    await req.json();

  if (!name || !email || !password || !specialization || !yearsOfExperience) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return NextResponse.json(
        { message: "Doctor already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
      yearsOfExperience,
    });

    await doctor.save();

    return NextResponse.json(
      { message: "Doctor signup successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}