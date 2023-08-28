/*
  Warnings:

  - You are about to alter the column `oeeValue` on the `ProductionEfficiencyRecord` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductionEfficiencyRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "turn" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "productionTimeInMinutes" INTEGER NOT NULL,
    "piecesQuantity" INTEGER NOT NULL,
    "oeeValue" REAL NOT NULL,
    "productionProcessId" TEXT,
    CONSTRAINT "ProductionEfficiencyRecord_productionProcessId_fkey" FOREIGN KEY ("productionProcessId") REFERENCES "ProductionProcess" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductionEfficiencyRecord" ("createdAt", "date", "id", "oeeValue", "piecesQuantity", "productionProcessId", "productionTimeInMinutes", "turn", "ute") SELECT "createdAt", "date", "id", "oeeValue", "piecesQuantity", "productionProcessId", "productionTimeInMinutes", "turn", "ute" FROM "ProductionEfficiencyRecord";
DROP TABLE "ProductionEfficiencyRecord";
ALTER TABLE "new_ProductionEfficiencyRecord" RENAME TO "ProductionEfficiencyRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
