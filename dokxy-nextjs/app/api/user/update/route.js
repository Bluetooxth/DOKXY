import { NextResponse } from "next/server";
import User from "@/models/user/userSchema";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function PATCH(req) {
  try {
    const tokenResponse = await getDataFromToken(req);

    if (tokenResponse.status !== 200) {
      const response = NextResponse.json({ message: tokenResponse.error }, { status: tokenResponse.status });
      setNoCacheHeaders(response);
      return response;
    }

    const { email } = tokenResponse.data || {};

    if (!email) {
      const response = NextResponse.json({ message: 'Email not found in token' }, { status: 400 });
      setNoCacheHeaders(response);
      return response;
    }

    const { name, username, password, phoneNumber, address } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      const response = NextResponse.json({ message: 'User not found' }, { status: 404 });
      setNoCacheHeaders(response);
      return response;
    }

    if (name !== undefined) user.name = name;
    if (username !== undefined) user.username = username;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }

    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (address !== undefined) user.address = address;

    await user.save();

    const response = NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
    setNoCacheHeaders(response);
    return response;
  } catch (error) {
    const response = NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    setNoCacheHeaders(response);
    return response;
  }
}
