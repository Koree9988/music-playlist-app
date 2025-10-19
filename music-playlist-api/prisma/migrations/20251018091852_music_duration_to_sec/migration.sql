/*
  Warnings:

  - You are about to alter the column `duration` on the `music` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "music" ALTER COLUMN "duration" SET DATA TYPE INTEGER;
