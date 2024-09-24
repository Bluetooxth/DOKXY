import { NextResponse } from "next/server";
import User from "@/models/user/userSchema";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function GET(req) {
  try {
    const tokenResponse = await getDataFromToken(req);

    if (tokenResponse.status === 401) {
      return tokenResponse;
    }

    const { email } = tokenResponse?.data || {};

    if (!email) {
      return NextResponse.json(
        { message: "Email not found in token" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}