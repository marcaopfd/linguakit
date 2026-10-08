-- CreateTable
CREATE TABLE "ReviewItem" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "unitIndex" INTEGER NOT NULL,
    "itemKey" TEXT NOT NULL,
    "exerciseType" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "expected" TEXT NOT NULL,
    "box" INTEGER NOT NULL DEFAULT 1,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "lastReviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReviewItem_studentId_dueAt_idx" ON "ReviewItem"("studentId", "dueAt");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewItem_studentId_moduleId_unitIndex_itemKey_key" ON "ReviewItem"("studentId", "moduleId", "unitIndex", "itemKey");

-- AddForeignKey
ALTER TABLE "ReviewItem" ADD CONSTRAINT "ReviewItem_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
