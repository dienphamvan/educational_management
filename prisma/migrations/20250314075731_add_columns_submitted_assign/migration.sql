-- AlterTable
ALTER TABLE `assignment` ADD COLUMN `feedback` VARCHAR(191) NULL,
    ADD COLUMN `grade` VARCHAR(191) NULL,
    ADD COLUMN `submittedDate` DATETIME(3) NULL;
