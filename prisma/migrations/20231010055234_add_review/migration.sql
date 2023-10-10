-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('TEACHER', 'AI');

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "submissionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ReviewType" NOT NULL,
    "comment" TEXT,
    "mark" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
