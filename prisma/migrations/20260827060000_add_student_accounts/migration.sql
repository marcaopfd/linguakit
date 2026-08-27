-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "password" TEXT,
ADD COLUMN     "course" TEXT,
ADD COLUMN     "newsletter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "newsletterAt" TIMESTAMP(3);

-- Backfill: students created by the placement test carry their course on
-- TestResult. Copy it over so the new Student.course is authoritative for
-- everyone and the app does not have to keep falling back.
UPDATE "Student" s
SET "course" = t."course"
FROM "TestResult" t
WHERE t."studentId" = s."id" AND s."course" IS NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
