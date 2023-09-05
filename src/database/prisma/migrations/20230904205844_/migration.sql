/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `UserRoom` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[creatorId,crushId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `messageType` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `creatorNickname` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crushId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crushNickname` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `pronoun` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'GIF');

-- CreateEnum
CREATE TYPE "GuessStatus" AS ENUM ('NOT_GUESSED', 'CORRECT_GUESS', 'WRONG_GUESS');

-- DropForeignKey
ALTER TABLE "UserRoom" DROP CONSTRAINT "UserRoom_roomId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoom" DROP CONSTRAINT "UserRoom_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "timestamp",
ADD COLUMN     "timeSent" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "messageType",
ADD COLUMN     "messageType" "MessageType" NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "creatorNickname" TEXT NOT NULL,
ADD COLUMN     "crushId" TEXT NOT NULL,
ADD COLUMN     "crushNickname" TEXT NOT NULL,
ADD COLUMN     "guessStatus" "GuessStatus" NOT NULL DEFAULT 'NOT_GUESSED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "pronoun" SET NOT NULL;

-- DropTable
DROP TABLE "UserRoom";

-- CreateIndex
CREATE UNIQUE INDEX "Room_creatorId_crushId_key" ON "Room"("creatorId", "crushId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_crushId_fkey" FOREIGN KEY ("crushId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
