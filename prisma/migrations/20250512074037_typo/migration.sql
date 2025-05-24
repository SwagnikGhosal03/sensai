/*
  Warnings:

  - You are about to drop the column `improvemetTip` on the `Assesment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assesment" DROP COLUMN "improvemetTip",
ADD COLUMN     "improvementTip" TEXT;
