import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cookie from "cookie";

dotenv.config();

export async function handleUserLogin(c: any) {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ message: "All fields are required" }, 400);
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return c.json({ message: "User does not exist" }, 400);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return c.json({ message: "Invalid credentials" }, 400);
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET || "",
      { expiresIn: "1d" }
    );

    const setCookieHeader = cookie.serialize("token", token, {
      maxAge: 24 * 60 * 60,
      httpOnly: true,
      path: "/",
    });

    c.header("Set-Cookie", setCookieHeader);

    return c.json({ message: "Login successful" }, 200);
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
}