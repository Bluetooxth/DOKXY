import { NextResponse } from "next/server";
import User from "@/models/user/userSchema";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function GET(req) {
  try {
    const tokenResponse = await getDataFromToken(req);

    if (tokenResponse.status !== 200) {
      const response = NextResponse.json({ message: tokenResponse.error }, { status: tokenResponse.status });
      setNoCacheHeaders(response);
      return response;
    }

    const { email } = tokenResponse.data;

    if (!email) {
      const response = NextResponse.json({ message: "Email not found in token" }, { status: 400 });
      setNoCacheHeaders(response);
      return response;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const response = NextResponse.json({ message: "User not found" }, { status: 404 });
      setNoCacheHeaders(response);
      return response;
    }

    const response = NextResponse.json(user, { status: 200 });
    setNoCacheHeaders(response);
    return response;
  } catch (error) {
    const response = NextResponse.json({ message: "Internal server error" }, { status: 500 });
    setNoCacheHeaders(response);
    return response;
  }
}
