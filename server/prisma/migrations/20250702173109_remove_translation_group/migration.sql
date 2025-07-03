/*
  Warnings:

  - You are about to drop the column `translationGroup` on the `Entry` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Entry_translationGroup_lang_slug_key";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "translationGroup";
