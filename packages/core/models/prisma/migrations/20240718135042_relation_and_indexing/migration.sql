-- CreateIndex
CREATE INDEX "flea_market_chat_room_sender_user_id_idx" ON "flea_market_chat_room"("sender_user_id");

-- CreateIndex
CREATE INDEX "flea_market_chat_room_receiver_user_id_idx" ON "flea_market_chat_room"("receiver_user_id");

-- AddForeignKey
ALTER TABLE "flea_market_chat_room" ADD CONSTRAINT "flea_market_chat_room_sender_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_chat_room" ADD CONSTRAINT "flea_market_chat_room_receiver_user_id_fkey" FOREIGN KEY ("receiver_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
