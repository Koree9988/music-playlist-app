/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `album` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "album_title_key" ON "album"("title");
