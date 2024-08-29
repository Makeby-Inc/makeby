/*
  Warnings:

  - You are about to drop the column `is_read` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "is_read",
ADD COLUMN     "is_receiver_read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_sender_read" BOOLEAN NOT NULL DEFAULT false;
