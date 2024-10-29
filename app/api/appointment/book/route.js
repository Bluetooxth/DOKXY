import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function POST(req) {
  const tokenData = await getDataFromToken(req);

  if (tokenData.status !== 200) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

  const userID = tokenData.data.id;
  const { doctorID, date, startTime, duration, subject } = await req.json();

  if (!doctorID || !date || !startTime || !duration || !subject) {
    return NextResponse.json({ status: 400, error: "Missing fields" });
  }

  const startDateTime = new Date(`${date}T${startTime}:00Z`);
  const endDateTime = new Date(startDateTime.getTime() + duration * 60000);
  const appointmentDate = startDateTime.toISOString().split("T")[0];

  try {
    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: { name: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ status: 404, error: "User not found" });
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorID },
      select: { maxAppointments: true, email: true, name: true },
    });

    if (!doctor) {
      return NextResponse.json({ status: 404, error: "Doctor not found" });
    }

    const dailyAppointmentCount = await prisma.appointment.count({
      where: {
        doctorID,
        date: {
          gte: new Date(appointmentDate + "T00:00:00Z"),
          lt: new Date(appointmentDate + "T23:59:59Z"),
        },
      },
    });

    if (dailyAppointmentCount >= doctor.maxAppointments) {
      return NextResponse.json({
        status: 400,
        error: "Maximum appointments for this doctor on this day have been reached",
      });
    }

    const overlappingAppointments = await prisma.appointment.count({
      where: {
        doctorID,
        date: {
          gte: startDateTime,
          lt: endDateTime,
        },
      },
    });

    if (overlappingAppointments > 0) {
      return NextResponse.json({
        status: 400,
        error: "Requested time slot is already booked",
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        userID,
        doctorID,
        userName: user.name,
        userEmail: user.email,
        doctorName: doctor.name,
        doctorEmail: doctor.email,
        startTime: { start: startDateTime, end: endDateTime },
        date: startDateTime,
        duration: { start: startDateTime, end: endDateTime },
        status: "pending",
        subject,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
