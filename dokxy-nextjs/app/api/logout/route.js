import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json({ message: "Logout successful" });

  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
  });

  return response;
}