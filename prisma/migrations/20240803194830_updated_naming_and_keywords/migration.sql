/*
  Warnings:

  - Added the required column `activity_data_id` to the `Keyword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keyword" ADD COLUMN     "activity_data_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "keyword_time_data_id_idx" ON "Keyword"("time_data_id");

-- CreateIndex
CREATE INDEX "keyword_activity_data_id_idx" ON "Keyword"("activity_data_id");

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_activity_data_id_fkey" FOREIGN KEY ("activity_data_id") REFERENCES "ActivityData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
