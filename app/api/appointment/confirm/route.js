import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ status: 400, error: "Missing fields" });
  }

  try {
    const appointment = await prisma.appointment.update({
      where: { id: id },
      data: { status: "confirmed" },
    });
    return NextResponse.json({ status: 200, data: appointment });
  } catch (error) {
    console.error("Error confirming appointment:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
