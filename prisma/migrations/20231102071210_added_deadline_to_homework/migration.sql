/*
  Warnings:

  - Added the required column `deadlineAt` to the `Homework` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Homework" ADD COLUMN     "deadlineAt" TIMESTAMP(3) NOT NULL;
