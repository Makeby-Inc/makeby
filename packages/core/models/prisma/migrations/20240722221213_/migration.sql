/*
  Warnings:

  - Added the required column `deposit_amount` to the `maker_withdrawal_record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "maker_withdrawal_record" ADD COLUMN     "deposit_amount" INTEGER NOT NULL;
