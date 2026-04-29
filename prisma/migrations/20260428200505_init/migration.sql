-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "levelName" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "pct" INTEGER NOT NULL,
    "skills" TEXT NOT NULL,
    "weaknesses" TEXT NOT NULL,
    "strengths" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TestResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentLesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "unitIndex" INTEGER NOT NULL,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudentLesson_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TestResult_studentId_key" ON "TestResult"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentLesson_studentId_moduleId_unitIndex_key" ON "StudentLesson"("studentId", "moduleId", "unitIndex");
