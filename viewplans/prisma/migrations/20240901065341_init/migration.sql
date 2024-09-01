-- CreateTable
CREATE TABLE `Plans` (
    `planId` INTEGER NOT NULL AUTO_INCREMENT,
    `planname` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`planId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
