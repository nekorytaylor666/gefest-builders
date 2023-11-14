/*
  Warnings:

  - You are about to drop the column `deadlineAt` on the `Homework` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Homework" DROP COLUMN "deadlineAt";

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false;
