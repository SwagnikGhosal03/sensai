/*
  Warnings:

  - You are about to drop the `IndustryInsight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_industry_fkey";

-- DropTable
DROP TABLE "IndustryInsight";

-- CreateTable
CREATE TABLE "industryInsight" (
    "id" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "salaryRanges" JSONB[],
    "growthRate" DOUBLE PRECISION NOT NULL,
    "demandLevel" TEXT NOT NULL,
    "topSkills" TEXT[],
    "marketOutlook" TEXT NOT NULL,
    "keytrends" TEXT[],
    "recommendedSkills" TEXT[],
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "industryInsight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "industryInsight_industry_key" ON "industryInsight"("industry");

-- CreateIndex
CREATE INDEX "industryInsight_industry_idx" ON "industryInsight"("industry");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_industry_fkey" FOREIGN KEY ("industry") REFERENCES "industryInsight"("industry") ON DELETE SET NULL ON UPDATE CASCADE;
