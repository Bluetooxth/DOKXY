import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET(req) {
    try {
        const doctors = await prisma.doctor.findMany({
            select: {
                name: true,
                username: true,
                email: true,
                profile_url: true,
                specialization: true,
                yearsOfExperience: true,
                qualification: true,
                startTime: true,
                endTime: true,
            },
        });

        return NextResponse.json({ status: 200, data: doctors, error: null }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
