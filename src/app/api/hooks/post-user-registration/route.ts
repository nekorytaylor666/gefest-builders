import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { email, fullName, phoneNumber, picture, metadata, externalUserId } =
//     req.body;

//   try {
//     const user = await prisma.user.create({
//       data: {
//         email: email,
//         fullName: fullName,
//         phoneNumber: phoneNumber,
//         // Add other fields as necessary
//       },
//     });

//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(500).json({ error: "Unable to create user" });
//   }
// }

export async function POST(request: Request) {
  const body = await request.json();
  const { email, fullName, phoneNumber, picture, metadata, externalUserId } =
    body as any;
  console.log(body);

  const user = await db.user.create({
    data: {
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      externalSourceUserId: externalUserId,
      externalMetadata: metadata,
      // Add other fields as necessary
    },
  });
  return NextResponse.json({ ...user });
}
