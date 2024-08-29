/*
  Warnings:

  - You are about to drop the `message_image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `receiver_user_id` to the `flea_market_chat_room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_user_id` to the `flea_market_chat_room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "message_image" DROP CONSTRAINT "message_image_message_id_fkey";

-- AlterTable
ALTER TABLE "flea_market_chat_room" ADD COLUMN     "deletedByReceiver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedBySender" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receiver_user_id" TEXT NOT NULL,
ADD COLUMN     "sender_user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "message_image";
