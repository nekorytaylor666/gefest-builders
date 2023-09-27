/*
  Warnings:

  - You are about to drop the `CourseProgress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `LessonProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseProgress" DROP CONSTRAINT "CourseProgress_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseProgress" DROP CONSTRAINT "CourseProgress_userId_fkey";

-- AlterTable
ALTER TABLE "LessonProgress" ADD COLUMN     "courseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CourseProgress";

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
