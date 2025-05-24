/*
  Warnings:

  - You are about to drop the column `keytrends` on the `industryInsight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "industryInsight" DROP COLUMN "keytrends",
ADD COLUMN     "keyTrends" TEXT[];
