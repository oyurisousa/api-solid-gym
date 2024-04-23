/*
  Warnings:

  - Added the required column `latitude` to the `gyns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `gyns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `gyns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gyns" ADD COLUMN     "description" TEXT,
ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
