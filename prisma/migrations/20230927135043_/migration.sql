/*
  Warnings:

  - Made the column `productionEfficiencyRecordId` on table `ProductionEfficiencyLoss` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reasonsLossEfficiencyId` on table `ProductionEfficiencyLoss` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productionProcessId` on table `ProductionEfficiencyRecord` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductionEfficiencyLoss" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lostTimeInMinutes" INTEGER NOT NULL,
    "reasonsLossEfficiencyId" TEXT NOT NULL,
    "productionEfficiencyRecordId" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    CONSTRAINT "ProductionEfficiencyLoss_productionEfficiencyRecordId_fkey" FOREIGN KEY ("productionEfficiencyRecordId") REFERENCES "ProductionEfficiencyRecord" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductionEfficiencyLoss_reasonsLossEfficiencyId_fkey" FOREIGN KEY ("reasonsLossEfficiencyId") REFERENCES "ReasonsLossEfficiency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductionEfficiencyLoss_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductionEfficiencyLoss" ("id", "lostTimeInMinutes", "machineId", "productionEfficiencyRecordId", "reasonsLossEfficiencyId") SELECT "id", "lostTimeInMinutes", "machineId", "productionEfficiencyRecordId", "reasonsLossEfficiencyId" FROM "ProductionEfficiencyLoss";
DROP TABLE "ProductionEfficiencyLoss";
ALTER TABLE "new_ProductionEfficiencyLoss" RENAME TO "ProductionEfficiencyLoss";
CREATE TABLE "new_ProductionEfficiencyRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "turn" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "productionTimeInMinutes" INTEGER NOT NULL,
    "piecesQuantity" INTEGER NOT NULL,
    "usefulTimeInMunites" REAL NOT NULL,
    "oeeValue" REAL NOT NULL,
    "productionProcessId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ProductionEfficiencyRecord_productionProcessId_fkey" FOREIGN KEY ("productionProcessId") REFERENCES "ProductionProcess" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductionEfficiencyRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductionEfficiencyRecord" ("createdAt", "date", "id", "oeeValue", "piecesQuantity", "productionProcessId", "productionTimeInMinutes", "turn", "usefulTimeInMunites", "userId", "ute") SELECT "createdAt", "date", "id", "oeeValue", "piecesQuantity", "productionProcessId", "productionTimeInMinutes", "turn", "usefulTimeInMunites", "userId", "ute" FROM "ProductionEfficiencyRecord";
DROP TABLE "ProductionEfficiencyRecord";
ALTER TABLE "new_ProductionEfficiencyRecord" RENAME TO "ProductionEfficiencyRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
