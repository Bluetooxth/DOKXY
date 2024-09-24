import { NextResponse } from "next/server";
import User from "@/models/user/userSchema";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function PATCH(req) {
    try {
      const tokenResponse = await getDataFromToken(req);
  
      if (tokenResponse.status === 401) {
        return tokenResponse;
      }
  
      const { email } = tokenResponse.data || {};
  
      if (!email) {
        return NextResponse.json({ message: 'Email not found in token' }, { status: 400 });
      }
  
      const { name, password, phoneNumber, address } = await req.json();
  
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
  
      if (name !== undefined) {
        user.name = name;
      }
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
      }
  
      if (phoneNumber !== undefined) {
        user.phoneNumber = phoneNumber;
      }
  
      if (address !== undefined) {
        user.address = address;
      }
  
      await user.save();
  
      return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }