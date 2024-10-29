import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("id");

  const {
    name,
    username,
    email,
    phoneNumber,
    password,
    specialization,
    yearsOfExperience,
    qualification,
    address,
    maxAppointments,
    startTime,
    endTime,
    profile_url,
  } = await req.json();

  const updateData = {
    name,
    username,
    email,
    phoneNumber,
    specialization,
    yearsOfExperience,
    qualification,
    address,
    maxAppointments,
    startTime,
    endTime,
    profile_url,
  };

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedDoctor = await prisma.doctor.update({
      where: { id: userID },
      data: updateData,
    });

    return NextResponse.json({
      status: 200,
      message: "Doctor updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
