import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, username, email, password } = await req.json();

  if (!name || !username || !email || !password) {
    return NextResponse.json({ status: 400, error: "Missing fields" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return NextResponse.json({ status: 400, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "User created successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
