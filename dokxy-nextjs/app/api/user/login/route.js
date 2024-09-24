import { NextResponse } from "next/server";
import User from "@/models/user/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookie from "cookie";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User does not exist" }, { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    if (!token) {
      return NextResponse.json({ message: "Token generation failed" }, { status: 500 });
    }

    const response = NextResponse.json({ message: "Login successful" });
    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
    );

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}