import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import AWS from "aws-sdk";
import { join } from "path";
import { readFile, writeFile } from "fs/promises";
import { s3 } from "@/lib/aws";
import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as unknown as File;
  const homeworkId = data.get("homeworkId") as unknown as number;

  if (!file || !homeworkId) {
    return NextResponse.json({
      success: false,
    });
  }

  const session = await getSession();
  const userId = session?.user?.sub;
  console.log(session?.user);
  if (!userId) {
    return NextResponse.json({
      success: false,
      message: "User is not authenticated",
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  //   const path = join("/", "tmp", file.name);
  //   await writeFile(path, buffer);
  //   const uploadResult = await s3
  //     .upload({
  //       Bucket: "gefest-academy-files", // замените на имя вашего бакета
  //       Key: file.name, // это будет именем файла на S3
  //       Body: buffer, // содержимое файла
  //       ACL: "public-read",
  //     })
  //     .promise();

  //   const submission = await prisma.submission.create({
  //     data: {
  //       homeworkId,
  //       userId,
  //       fileUrl: uploadResult.Location,
  //     },
  //   });

  return NextResponse.json({ success: true });
}
