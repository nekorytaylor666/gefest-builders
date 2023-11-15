-- CreateTable
CREATE TABLE "UserAssistantThread" (
    "id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAssistantThread_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAssistantThread_userId_key" ON "UserAssistantThread"("userId");

-- AddForeignKey
ALTER TABLE "UserAssistantThread" ADD CONSTRAINT "UserAssistantThread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
