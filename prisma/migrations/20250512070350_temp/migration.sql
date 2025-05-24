/*
  Warnings:

  - Made the column `improvemetTip` on table `Assesment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Assesment" ALTER COLUMN "improvemetTip" SET NOT NULL;
