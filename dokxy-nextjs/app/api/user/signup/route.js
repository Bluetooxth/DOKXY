import { NextResponse } from "next/server";
import User from "@/models/user/userSchema";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function POST(req) {
  try {
    const { name, username, email, password } = await req.json();

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json(
      { message: "User signup successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}