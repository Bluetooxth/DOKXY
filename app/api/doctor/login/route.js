import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ status: 400, error: "Missing fields" });
  }

  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        email,
      },
    });

    if (!doctor) {
      return NextResponse.json({ status: 400, error: "Doctor not found" });
    }

    const isValid = await bcrypt.compare(password, doctor.password);

    if (!isValid) {
      return NextResponse.json({ status: 400, error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: doctor.id, email: doctor.email, role: doctor.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const response = NextResponse.json({
      status: 200,
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
