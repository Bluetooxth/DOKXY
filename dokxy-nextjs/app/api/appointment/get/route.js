import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function GET(req) {
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

    const { email, role } = tokenResponse.data;

    if (!email) {
      const response = NextResponse.json(
        { message: "Email not found in token" },
        { status: 400 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    if (!role) {
      const response = NextResponse.json(
        { message: "Role not found in token" },
        { status: 400 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    let appointments;
    if (role !== "doctor") {
      appointments = await Appointment.find({ patientEmail: email }).sort({ createdAt: -1 });
    } else {
      appointments = await Appointment.find({ doctorEmail: email }).sort({ createdAt: -1 });
    }

    const response = NextResponse.json(appointments, { status: 200 });
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
