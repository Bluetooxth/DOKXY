import Doctor from "@/models/doctor/doctorSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    const response = NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
    setNoCacheHeaders(response);
    return response;
  }

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      const response = NextResponse.json(
        { message: "Doctor does not exist" },
        { status: 401 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const isPasswordMatch = await bcrypt.compare(password, doctor.password);

    if (!isPasswordMatch) {
      const response = NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const token = jwt.sign(
      {
        id: doctor._id,
        name: doctor.name,
        username: doctor.username,
        email: doctor.email,
        role: doctor.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    if (!token) {
      const response = NextResponse.json(
        { message: "Token generation failed" },
        { status: 500 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      maxAge: 24 * 60 * 60,
      path: "/",
      sameSite: "strict",
    });

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
