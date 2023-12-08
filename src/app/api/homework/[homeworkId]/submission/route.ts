import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import AWS from "aws-sdk";
import { join } from "path";
import { readFile, writeFile } from "fs/promises";
import { s3 } from "@/lib/aws";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { homeworkId: string } }
) {
  const data = await request.formData();
  const { homeworkId } = params;
  const submissions = Array.from(data.entries())
    .map(([key, value]) => {
      const [_, index, field] = key.split(".");

      return { index, field, value };
    })
    .reduce((acc: { [key: string]: any }, { index, field, value }) => {
      acc[index] = acc[index] || {};
      acc[index][field] = value;
      return acc;
    }, []);
  const userId = "1";
  if (!userId) {
    return NextResponse.json({
      success: false,
      message: "User is not authenticated",
    });
  }
  const fileUploads = [];

  for (const [index, submission] of Object.entries(submissions)) {
    const file = submission.file as unknown as File;
    const name = submission.name as unknown as string;
    const description = submission.description as unknown as string;

    if (!file || !name) {
      return NextResponse.json({
        success: false,
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      const uploadResult = await s3
        .upload({
          Bucket: "gefest-academy-files", // замените на имя вашего бакета
          Key: file.name, // это будет именем файла на S3
          Body: buffer, // содержимое файла
        })
        .promise();
      fileUploads.push({
        location: uploadResult.Location,
        name,
        description,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const submission = await prisma.submission.create({
    data: {
      homeworkId: Number(homeworkId),
      userId,
      fileUploads: fileUploads,
    },
  });

  return NextResponse.json({ success: true, submission });
}
