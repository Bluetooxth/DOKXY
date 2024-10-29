import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ status: 400, error: "Missing fields" });
  }

  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phoneNumber: true,
        specialization: true,
        yearsOfExperience: true,
        qualification: true,
        address: true,
        startTime: true,
        endTime: true,
        profile_url: true,
      },
    });

    if (!doctor) {
      return NextResponse.json({ status: 404, error: "Doctor not found" });
    }

    return NextResponse.json({
      status: 200,
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
