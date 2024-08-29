-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "link" TEXT,
ALTER COLUMN "is_read" SET DEFAULT false;

-- CreateIndex
CREATE INDEX "notification_user_id_idx" ON "notification"("user_id");
