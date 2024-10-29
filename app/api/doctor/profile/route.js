import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function GET(req) {
  const tokenData = await getDataFromToken(req);

  if (tokenData.status !== 200) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

  const { id } = tokenData.data;

  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: false,
        role: true,
        phoneNumber: true,
        address: true,
        specialization: true,
        yearsOfExperience: true,
        qualification: true,
        startTime: true,
        endTime: true,
        profile_url: true,
        maxAppointments: true,
        appointments: {
          select: {
            id: true,
            date: true,
            startTime: true,
            duration: true,
            status: true,
            subject: true,
            userName: true,
          },
        },
      },
    });

    return NextResponse.json({ status: 200, data: doctor });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
