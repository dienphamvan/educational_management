-- CreateTable
CREATE TABLE `assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'GRADED', 'LATE') NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `teacherId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assignment` ADD CONSTRAINT `assignment_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment` ADD CONSTRAINT `assignment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
