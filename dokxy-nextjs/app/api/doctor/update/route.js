import Doctor from "@/models/doctor/doctorSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function PATCH(req) {
  try {
    const tokenResponse = await getDataFromToken(req);

    if (tokenResponse.status !== 200) {
      const response = NextResponse.json(
        { message: tokenResponse.error },
        { status: tokenResponse.status }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const { email } = tokenResponse.data || {};

    if (!email) {
      const response = NextResponse.json(
        { message: "Email not found in token" },
        { status: 400 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const {
      name,
      username,
      password,
      specialization,
      yearsOfExperience,
      phoneNumber,
      address,
      imageUrl,
    } = await req.json();

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      const response = NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    if (name !== undefined) doctor.name = name;
    if (username !== undefined) doctor.username = username;
    if (password) doctor.password = await bcrypt.hash(password, 12);
    if (specialization !== undefined) doctor.specialization = specialization;
    if (yearsOfExperience !== undefined) doctor.yearsOfExperience = yearsOfExperience;
    if (phoneNumber !== undefined) doctor.phoneNumber = phoneNumber;
    if (address !== undefined) doctor.address = address;
    if (imageUrl !== undefined) doctor.imageUrl = imageUrl;

    await doctor.save();

    const response = NextResponse.json({ message: "Doctor updated successfully" }, { status: 200 });
    setNoCacheHeaders(response);

    return response;
  } catch (error) {
    const response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    setNoCacheHeaders(response);

    return response;
  }
}
