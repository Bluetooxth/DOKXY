import { NextResponse } from "next/server";
import User from "@/models/user/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    const response = NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
    setNoCacheHeaders(response);
    return response;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const response = NextResponse.json(
        { message: "User does not exist" },
        { status: 401 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      const response = NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    if (!token) {
      const response = NextResponse.json(
        { message: "Token generation failed" },
        { status: 500 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const response = NextResponse.json({ message: "Login successful" });

    response.cookies.set("token", token, {
      maxAge: 24 * 60 * 60,
      path: "/",
      sameSite: "strict",
    });

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
