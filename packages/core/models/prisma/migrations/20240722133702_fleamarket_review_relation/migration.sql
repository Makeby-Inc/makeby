/*
  Warnings:

  - A unique constraint covering the columns `[flea_market_product_id]` on the table `flea_market_product_review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "flea_market_product_review_flea_market_product_id_key" ON "flea_market_product_review"("flea_market_product_id");
