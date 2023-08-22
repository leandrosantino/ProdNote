/*
  Warnings:

  - You are about to drop the `Planning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlanningReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductionGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlanningToProductionGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_PlanningToProductionGroup_B_index";

-- DropIndex
DROP INDEX "_PlanningToProductionGroup_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Planning";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PlanningReport";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductionGroup";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PlanningToProductionGroup";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProductionRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "ProductionRecord_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductionRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductionProcess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ReasonsLossEfficiency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductionEfficiencyLoss" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productionEfficiencyRecordId" TEXT,
    "reasonsLossEfficiencyId" TEXT,
    CONSTRAINT "ProductionEfficiencyLoss_productionEfficiencyRecordId_fkey" FOREIGN KEY ("productionEfficiencyRecordId") REFERENCES "ProductionEfficiencyRecord" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProductionEfficiencyLoss_reasonsLossEfficiencyId_fkey" FOREIGN KEY ("reasonsLossEfficiencyId") REFERENCES "ReasonsLossEfficiency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductionEfficiencyRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "turn" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "piecesQuantity" INTEGER NOT NULL,
    "productionProcessId" TEXT,
    CONSTRAINT "ProductionEfficiencyRecord_productionProcessId_fkey" FOREIGN KEY ("productionProcessId") REFERENCES "ProductionProcess" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "technicalDescription" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "partNumber" TEXT NOT NULL,
    "sapCode" TEXT NOT NULL,
    "projectNumber" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "productionGroupId" TEXT
);
INSERT INTO "new_Product" ("amount", "classification", "description", "id", "partNumber", "productionGroupId", "projectNumber", "sapCode", "technicalDescription", "ute") SELECT "amount", "classification", "description", "id", "partNumber", "productionGroupId", "projectNumber", "sapCode", "technicalDescription", "ute" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Machine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "productionGroupId" TEXT,
    "productionProcessId" TEXT,
    CONSTRAINT "Machine_productionProcessId_fkey" FOREIGN KEY ("productionProcessId") REFERENCES "ProductionProcess" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Machine" ("capacity", "id", "productionGroupId", "slug", "ute") SELECT "capacity", "id", "productionGroupId", "slug", "ute" FROM "Machine";
DROP TABLE "Machine";
ALTER TABLE "new_Machine" RENAME TO "Machine";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
