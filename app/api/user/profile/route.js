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
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: false,
        role: true,
        phoneNumber: true,
        appointments: {
          select: {
            id: true,
            date: true,
            startTime: true,
            duration: true,
            status: true,
            subject: true,
            doctorName: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ status: 404, error: "User not found" });
    }

    return NextResponse.json({ status: 200, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
