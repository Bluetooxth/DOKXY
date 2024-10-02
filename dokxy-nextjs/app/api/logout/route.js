import { NextResponse } from "next/server";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

export async function POST(req) {
  const response = NextResponse.json({ message: "Logout successful" });

  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
  });

  setNoCacheHeaders(response);

  return response;
}
