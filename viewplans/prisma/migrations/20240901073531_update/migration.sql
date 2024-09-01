/*
  Warnings:

  - You are about to drop the `plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `plans`;

-- CreateTable
CREATE TABLE `Plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `planName` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `locationId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
