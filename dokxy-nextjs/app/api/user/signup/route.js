import { NextResponse } from "next/server";
import User from "@/models/user/userSchema";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function POST(req) {
  try {
    const { name, username, email, password } = await req.json();

    if (!name || !username || !email || !password) {
      const response = NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const response = NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const response = NextResponse.json(
      { message: "User signup successful" },
      { status: 201 }
    );
    setNoCacheHeaders(response);
    return response;
  } catch (error) {
    const response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    setNoCacheHeaders(response);
    return response;
  }
}
