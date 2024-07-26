-- AlterTable
ALTER TABLE "ArticleMetadata" ADD COLUMN     "website_id" TEXT;

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;
