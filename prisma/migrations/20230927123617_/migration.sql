/*
  Warnings:

  - A unique constraint covering the columns `[externalSourceUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "externalSourceUserId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_externalSourceUserId_key" ON "User"("externalSourceUserId");
