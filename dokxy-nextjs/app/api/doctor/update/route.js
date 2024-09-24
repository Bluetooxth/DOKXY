import Doctor from "@/models/doctor/doctorSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect();

export async function PATCH(req) {
  try {
    const tokenResponse = await getDataFromToken(req);

    if (tokenResponse.status === 401) {
      return tokenResponse;
    }

    const { email } = tokenResponse.data || {};

    if (!email) {
      return NextResponse.json(
        { message: "Email not found in token" },
        { status: 400 }
      );
    }

    const {
      name,
      password,
      specialization,
      yearsOfExperience,
      phoneNumber,
      address,
      imageUrl,
    } = await req.json();

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
    }

    if (name !== undefined) {
      doctor.name = name;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      doctor.password = hashedPassword;
    }

    if (specialization !== undefined) {
      doctor.specialization = specialization;
    }

    if (yearsOfExperience !== undefined) {
      doctor.yearsOfExperience = yearsOfExperience;
    }

    if (phoneNumber !== undefined) {
      doctor.phoneNumber = phoneNumber;
    }

    if (address !== undefined) {
      doctor.address = address;
    }

    if (imageUrl !== undefined) {
      doctor.imageUrl = imageUrl;
    }

    await doctor.save();

    return NextResponse.json(
      { message: "Doctor updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}