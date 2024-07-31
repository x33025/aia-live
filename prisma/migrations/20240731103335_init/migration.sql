-- CreateTable
CREATE TABLE "Article" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "quick_look" VARCHAR(255) NOT NULL DEFAULT '',
    "description" VARCHAR(255) NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "word_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleMetadata" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "target_word_count" INTEGER NOT NULL DEFAULT 0,
    "semrush_score" REAL NOT NULL DEFAULT 0.0,
    "author_id" UUID,
    "category_id" UUID,
    "status_id" UUID,
    "main_keyword_id" UUID,
    "article_id" UUID NOT NULL,
    "time_data_id" UUID NOT NULL,
    "activity_data_id" UUID NOT NULL,
    "website_id" UUID,

    CONSTRAINT "ArticleMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "keyword" VARCHAR(255) NOT NULL DEFAULT '',
    "evergreen" BOOLEAN NOT NULL DEFAULT false,
    "volume" INTEGER NOT NULL DEFAULT 0,
    "keyword_density" INTEGER NOT NULL DEFAULT 0,
    "country_id" UUID,
    "time_data_id" UUID NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL DEFAULT '',
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "last_name" VARCHAR(255) NOT NULL DEFAULT '',
    "author_name" VARCHAR(255) NOT NULL DEFAULT '',
    "role_id" UUID,
    "last_active_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeData" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,
    "date_deleted" TIMESTAMP(3),

    CONSTRAINT "TimeData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityData" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "last_modified_by_id" UUID NOT NULL,
    "created_by_id" UUID NOT NULL,
    "deleted_by_id" UUID,

    CONSTRAINT "ActivityData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "url" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleKeywords" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE INDEX "article_id_idx" ON "Article"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleMetadata_article_id_key" ON "ArticleMetadata"("article_id");

-- CreateIndex
CREATE INDEX "article_metadata_author_id_idx" ON "ArticleMetadata"("author_id");

-- CreateIndex
CREATE INDEX "article_metadata_category_id_idx" ON "ArticleMetadata"("category_id");

-- CreateIndex
CREATE INDEX "article_metadata_status_id_idx" ON "ArticleMetadata"("status_id");

-- CreateIndex
CREATE INDEX "article_metadata_main_keyword_id_idx" ON "ArticleMetadata"("main_keyword_id");

-- CreateIndex
CREATE INDEX "article_metadata_time_data_id_idx" ON "ArticleMetadata"("time_data_id");

-- CreateIndex
CREATE INDEX "article_metadata_activity_data_id_idx" ON "ArticleMetadata"("activity_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_keyword_key" ON "Keyword"("keyword");

-- CreateIndex
CREATE INDEX "keyword_id_idx" ON "Keyword"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "user_role_id_idx" ON "User"("role_id");

-- CreateIndex
CREATE INDEX "time_data_id_idx" ON "TimeData"("id");

-- CreateIndex
CREATE INDEX "activity_data_last_modified_by_id_idx" ON "ActivityData"("last_modified_by_id");

-- CreateIndex
CREATE INDEX "activity_data_created_by_id_idx" ON "ActivityData"("created_by_id");

-- CreateIndex
CREATE INDEX "activity_data_deleted_by_id_idx" ON "ActivityData"("deleted_by_id");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Website_name_key" ON "Website"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleKeywords_AB_unique" ON "_ArticleKeywords"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleKeywords_B_index" ON "_ArticleKeywords"("B");

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_main_keyword_id_fkey" FOREIGN KEY ("main_keyword_id") REFERENCES "Keyword"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_time_data_id_fkey" FOREIGN KEY ("time_data_id") REFERENCES "TimeData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_activity_data_id_fkey" FOREIGN KEY ("activity_data_id") REFERENCES "ActivityData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_time_data_id_fkey" FOREIGN KEY ("time_data_id") REFERENCES "TimeData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_last_modified_by_id_fkey" FOREIGN KEY ("last_modified_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_deleted_by_id_fkey" FOREIGN KEY ("deleted_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleKeywords" ADD CONSTRAINT "_ArticleKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "ArticleMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleKeywords" ADD CONSTRAINT "_ArticleKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
