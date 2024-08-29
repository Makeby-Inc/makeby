/*
  Warnings:

  - A unique constraint covering the columns `[sender_user_id,receiver_user_id,flea_market_product_id]` on the table `flea_market_chat_room` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "message" ALTER COLUMN "text" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "flea_market_chat_room_sender_user_id_receiver_user_id_flea__key" ON "flea_market_chat_room"("sender_user_id", "receiver_user_id", "flea_market_product_id");
