import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(req) {
  const token = req.cookies.get("token")?.value || "";

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}