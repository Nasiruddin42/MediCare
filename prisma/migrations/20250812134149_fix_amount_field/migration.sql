/*
  Warnings:

  - You are about to drop the column `amout` on the `CreditTransaction` table. All the data in the column will be lost.
  - Added the required column `amount` to the `CreditTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CreditTransaction" DROP COLUMN "amout",
ADD COLUMN     "amount" INTEGER NOT NULL;
