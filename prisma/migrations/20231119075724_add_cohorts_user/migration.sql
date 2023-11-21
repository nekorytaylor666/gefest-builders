-- CreateTable
CREATE TABLE "Cohort" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cohort_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCohort" (
    "userId" TEXT NOT NULL,
    "cohortId" INTEGER NOT NULL,

    CONSTRAINT "UserCohort_pkey" PRIMARY KEY ("userId","cohortId")
);

-- AddForeignKey
ALTER TABLE "UserCohort" ADD CONSTRAINT "UserCohort_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCohort" ADD CONSTRAINT "UserCohort_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
