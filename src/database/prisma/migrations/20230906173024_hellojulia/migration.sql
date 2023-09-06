/*
  Warnings:

  - You are about to drop the column `creatorNickname` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `crushNickname` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `guessStatus` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `pronoun` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorDisplayName` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crushDisplayName` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchStatus` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pronouns` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('LIVE', 'DORMANT');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('GUESS', 'MATCH');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_crushId_fkey";

-- DropIndex
DROP INDEX "Room_creatorId_crushId_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "creatorNickname",
DROP COLUMN "crushNickname",
DROP COLUMN "guessStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creatorDisplayName" TEXT NOT NULL,
ADD COLUMN     "crushDisplayName" TEXT NOT NULL,
ADD COLUMN     "matchStatus" "MatchStatus" NOT NULL,
ADD COLUMN     "roomType" "RoomType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pronoun",
DROP COLUMN "type",
ADD COLUMN     "pronouns" TEXT NOT NULL;

-- DropTable
DROP TABLE "Message";

-- DropEnum
DROP TYPE "GuessStatus";

-- DropEnum
DROP TYPE "MessageType";

-- CreateTable
CREATE TABLE "RogueUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "RogueUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RogueUser_email_key" ON "RogueUser"("email");

-- CreateIndex
CREATE INDEX "RogueUser_email_idx" ON "RogueUser"("email");
