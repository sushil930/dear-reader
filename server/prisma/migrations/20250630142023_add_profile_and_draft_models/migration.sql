/*
  Warnings:

  - The `date` column on the `Entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `readTime` column on the `Entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "views" INTEGER DEFAULT 0,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "mood" DROP NOT NULL,
DROP COLUMN "readTime",
ADD COLUMN     "readTime" INTEGER DEFAULT 0,
ALTER COLUMN "excerpt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allowComments" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "autoSave" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "commentNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "commentsCount" INTEGER DEFAULT 0,
ADD COLUMN     "defaultMood" TEXT,
ADD COLUMN     "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "engagements" INTEGER DEFAULT 0,
ADD COLUMN     "likeNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "publicProfile" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showReadingTime" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "totalReadingTime" INTEGER DEFAULT 0,
ADD COLUMN     "viewsThisMonth" INTEGER DEFAULT 0,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "weeklyDigest" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "writingStreak" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "Draft" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mood" TEXT,
    "excerpt" TEXT,
    "tags" TEXT[],
    "lastModified" TIMESTAMP(3) NOT NULL,
    "wordCount" INTEGER DEFAULT 0,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Draft_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
