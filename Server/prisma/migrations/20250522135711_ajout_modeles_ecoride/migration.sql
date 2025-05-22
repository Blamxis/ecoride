-- CreateTable
CREATE TABLE `Vehicule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marque` VARCHAR(191) NOT NULL,
    `modele` VARCHAR(191) NOT NULL,
    `energie` VARCHAR(191) NOT NULL,
    `couleur` VARCHAR(191) NOT NULL,
    `immatriculation` VARCHAR(191) NOT NULL,
    `annee` INTEGER NOT NULL,
    `conducteurId` INTEGER NOT NULL,

    UNIQUE INDEX `Vehicule_immatriculation_key`(`immatriculation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trajet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `villeDepart` VARCHAR(191) NOT NULL,
    `villeArrivee` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `heureDepart` VARCHAR(191) NOT NULL,
    `heureArrivee` VARCHAR(191) NOT NULL,
    `prix` DOUBLE NOT NULL,
    `places` INTEGER NOT NULL,
    `estEcologique` BOOLEAN NOT NULL DEFAULT false,
    `chauffeurId` INTEGER NOT NULL,
    `vehiculeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Covoiturage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `passagerId` INTEGER NOT NULL,
    `trajetId` INTEGER NOT NULL,
    `confirme` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vehicule` ADD CONSTRAINT `Vehicule_conducteurId_fkey` FOREIGN KEY (`conducteurId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trajet` ADD CONSTRAINT `Trajet_chauffeurId_fkey` FOREIGN KEY (`chauffeurId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trajet` ADD CONSTRAINT `Trajet_vehiculeId_fkey` FOREIGN KEY (`vehiculeId`) REFERENCES `Vehicule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Covoiturage` ADD CONSTRAINT `Covoiturage_passagerId_fkey` FOREIGN KEY (`passagerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Covoiturage` ADD CONSTRAINT `Covoiturage_trajetId_fkey` FOREIGN KEY (`trajetId`) REFERENCES `Trajet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
