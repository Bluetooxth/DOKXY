import Doctor from "../../models/doctor/doctorSchema";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cookie from 'cookie';

dotenv.config();

export async function handleDoctorLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(400).json({ message: "Doctor does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, doctor.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: doctor._id, name: doctor.name, email: doctor.email, role: doctor.role },
      process.env.JWT_SECRET || "",
      { expiresIn: "1d" }
    );

    const setCookieHeader = cookie.serialize("token", token, {
      maxAge: 24 * 60 * 60,
      httpOnly: true,
      path: "/",
    });

    res.setHeader("Set-Cookie", setCookieHeader);

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}