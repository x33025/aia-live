-- CreateTable
CREATE TABLE "ArticleMetadata" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "word_count" INTEGER NOT NULL DEFAULT 0,
    "goal_word_count" INTEGER NOT NULL DEFAULT 0,
    "semrush_score" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "author_id" TEXT NOT NULL,
    "category_id" TEXT,
    "status_id" TEXT NOT NULL,
    "main_keyword_id" TEXT,
    "get_info_id" TEXT NOT NULL,
    "website_id" TEXT,

    CONSTRAINT "ArticleMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "article_metadata_id" TEXT NOT NULL,
    "quick_look" TEXT,
    "description" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "evergreen" BOOLEAN NOT NULL DEFAULT false,
    "volume" INTEGER NOT NULL DEFAULT 0,
    "keyword_density" INTEGER NOT NULL DEFAULT 0,
    "country_id" TEXT,
    "get_info_id" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "role_id" TEXT,
    "last_active_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GetInfo" (
    "id" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,
    "date_deleted" TIMESTAMP(3),
    "last_modified_by_id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,

    CONSTRAINT "GetInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleKeywords" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "author_id" ON "ArticleMetadata"("author_id");

-- CreateIndex
CREATE INDEX "category_id" ON "ArticleMetadata"("category_id");

-- CreateIndex
CREATE INDEX "status_id" ON "ArticleMetadata"("status_id");

-- CreateIndex
CREATE INDEX "main_keyword_id" ON "ArticleMetadata"("main_keyword_id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_article_metadata_id_key" ON "Article"("article_metadata_id");

-- CreateIndex
CREATE INDEX "article_id" ON "Article"("id");

-- CreateIndex
CREATE INDEX "keyword_id" ON "Keyword"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "role_id" ON "User"("role_id");

-- CreateIndex
CREATE INDEX "last_modified_by_id" ON "GetInfo"("last_modified_by_id");

-- CreateIndex
CREATE INDEX "created_by_id" ON "GetInfo"("created_by_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleKeywords_AB_unique" ON "_ArticleKeywords"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleKeywords_B_index" ON "_ArticleKeywords"("B");

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_main_keyword_id_fkey" FOREIGN KEY ("main_keyword_id") REFERENCES "Keyword"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_get_info_id_fkey" FOREIGN KEY ("get_info_id") REFERENCES "GetInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleMetadata" ADD CONSTRAINT "ArticleMetadata_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_article_metadata_id_fkey" FOREIGN KEY ("article_metadata_id") REFERENCES "ArticleMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_get_info_id_fkey" FOREIGN KEY ("get_info_id") REFERENCES "GetInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GetInfo" ADD CONSTRAINT "GetInfo_last_modified_by_id_fkey" FOREIGN KEY ("last_modified_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GetInfo" ADD CONSTRAINT "GetInfo_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleKeywords" ADD CONSTRAINT "_ArticleKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "ArticleMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleKeywords" ADD CONSTRAINT "_ArticleKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
