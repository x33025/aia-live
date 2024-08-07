/*
  Warnings:

  - You are about to drop the column `last_modified_by_id` on the `ActivityData` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `TimeData` table. All the data in the column will be lost.
  - You are about to drop the column `date_deleted` on the `TimeData` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `TimeData` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActivityData" DROP CONSTRAINT "ActivityData_last_modified_by_id_fkey";

-- DropIndex
DROP INDEX "activity_data_last_modified_by_id_idx";

-- AlterTable
ALTER TABLE "ActivityData" DROP COLUMN "last_modified_by_id",
ADD COLUMN     "updated_by_id" UUID;

-- AlterTable
ALTER TABLE "TimeData" DROP COLUMN "date_created",
DROP COLUMN "date_deleted",
DROP COLUMN "date_updated",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMPTZ,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "activity_data_updated_by_id_idx" ON "ActivityData"("updated_by_id");

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
