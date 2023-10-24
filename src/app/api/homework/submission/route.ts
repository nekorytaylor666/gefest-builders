import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import AWS from "aws-sdk";
import { join } from "path";
import { readFile, writeFile } from "fs/promises";
import { s3 } from "@/lib/aws";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json({
      success: false,
    });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("/", "tmp", file.name);
  await writeFile(path, buffer);
  const uploadResult = await s3
    .upload({
      Bucket: "gefest-academy-files", // замените на имя вашего бакета
      Key: file.name, // это будет именем файла на S3
      Body: buffer, // содержимое файла
      ACL: "public-read",
    })
    .promise();
  return NextResponse.json({ success: true, path: uploadResult.Location });
}
