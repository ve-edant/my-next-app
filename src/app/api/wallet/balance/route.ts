/* eslint-disable */
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path if needed

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch balance from DB
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId }, // 👈 make sure your User table has clerkId
      select: { balance: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ balance: user.balance });
  } catch (err) {
    console.error("Error fetching wallet balance:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
