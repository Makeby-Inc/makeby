/*
  Warnings:

  - You are about to drop the column `product_order_id` on the `maker_calculation_record` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order_confirmation_record` table. All the data in the column will be lost.
  - You are about to drop the column `product_order_id` on the `order_confirmation_record` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_order_item_id]` on the table `order_confirmation_record` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_order_item_id` to the `order_confirmation_record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "maker_calculation_record" DROP CONSTRAINT "maker_calculation_record_product_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_confirmation_record" DROP CONSTRAINT "order_confirmation_record_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order_confirmation_record" DROP CONSTRAINT "order_confirmation_record_product_order_id_fkey";

-- DropIndex
DROP INDEX "maker_calculation_record_product_order_id_key";

-- DropIndex
DROP INDEX "order_confirmation_record_product_id_key";

-- DropIndex
DROP INDEX "order_confirmation_record_product_order_id_key";

-- AlterTable
ALTER TABLE "maker_calculation_record" DROP COLUMN "product_order_id";

-- AlterTable
ALTER TABLE "order_confirmation_record" DROP COLUMN "product_id",
DROP COLUMN "product_order_id",
ADD COLUMN     "product_order_item_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_confirmation_record_product_order_item_id_key" ON "order_confirmation_record"("product_order_item_id");

-- AddForeignKey
ALTER TABLE "order_confirmation_record" ADD CONSTRAINT "order_confirmation_record_product_order_item_id_fkey" FOREIGN KEY ("product_order_item_id") REFERENCES "product_order_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
