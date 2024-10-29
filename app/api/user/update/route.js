import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ status: 400, error: "User ID is required" });
  }

  const { name, username, email, phoneNumber, password } = await req.json();

  const updateData = {
    name,
    username,
    email,
    phoneNumber,
  };

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({
      status: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
