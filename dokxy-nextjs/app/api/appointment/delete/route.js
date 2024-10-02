import { NextResponse } from "next/server";
import Appointment from "@/models/appointment/appointmentSchema";
import dbConnect from "@/config/dbConnect";
import setNoCacheHeaders from "@/helpers/noCacheHeader";

dbConnect();

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    const response = NextResponse.json(
      { message: 'ID is required' },
      { status: 400 }
    );
    setNoCacheHeaders(response);
    return response;
  }

  try {
    const appointment = await Appointment.findOneAndDelete({ _id: id });
    if (!appointment) {
      const response = NextResponse.json(
        { message: 'Appointment does not exist' },
        { status: 404 }
      );
      setNoCacheHeaders(response);
      return response;
    }

    const response = NextResponse.json(
      { message: 'Appointment deleted successfully' },
      { status: 200 }
    );
    setNoCacheHeaders(response);

    return response;
  } catch (error) {
    const response = NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
    setNoCacheHeaders(response);

    return response;
  }
}
