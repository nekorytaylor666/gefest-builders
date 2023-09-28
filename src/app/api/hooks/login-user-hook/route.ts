import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, fullName, phoneNumber, picture, metadata, externalUserId } =
    body as any;
  console.log(body);

  const existingUser = await db.user.findFirst({ where: { email } });
  if (existingUser) {
    const user = await db.user.update({
      where: { email: email },
      data: { externalMetadata: metadata },
    });
    return NextResponse.json({ user, message: "user updated" });
  }
  if (!existingUser) {
    const user = await db.user.create({
      data: {
        email: email,
        fullName: fullName,
        phoneNumber: phoneNumber,
        externalSourceUserId: externalUserId,
        externalMetadata: metadata,
      },
    });
    return NextResponse.json({ user, message: "user created" });
  }
  return NextResponse.json({ message: "error" });
}
