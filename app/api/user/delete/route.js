import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function DELETE(req) {
    const tokenData = await getDataFromToken(req);
    
    if (tokenData.status !== 200) {
        return NextResponse.json({ status: 401, error: "Unauthorized" });
    }
    
    const { id } = tokenData.data;
    
    try {
        await prisma.user.delete({
        where: {
            id,
        },
        });
    
        return NextResponse.json({
        status: 200,
        message: "User deleted successfully",
        });
    } catch (error) {
        return NextResponse.json({ status: 500, error: "Internal server error" });
    }
}