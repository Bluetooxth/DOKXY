import User from "../../models/user/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cookie from "cookie";

dotenv.config();

export async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET || "",
      { expiresIn: "1d" }
    );

    if (!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        path: "/",
      })
    );

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}