import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, username, email, password, specialization, qualification, yearsOfExperience } = await req.json();

  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !specialization ||
    !qualification ||
    !yearsOfExperience
  ) {
    return NextResponse.json({ status: 400, error: "Missing fields" });
  }

  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        email,
      },
    });

    if (doctor) {
      return NextResponse.json({ status: 400, error: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.doctor.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        specialization,
        qualification,
        yearsOfExperience,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Doctor created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
