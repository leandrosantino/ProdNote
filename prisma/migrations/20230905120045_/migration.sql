/*
  Warnings:

  - Added the required column `classification` to the `ProductionProcess` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductionProcess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "cycleTimeInSeconds" INTEGER NOT NULL,
    "projectNumber" TEXT NOT NULL,
    "technology" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "cavitiesNumber" INTEGER NOT NULL,
    "classification" TEXT NOT NULL,
    CONSTRAINT "ProductionProcess_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductionProcess" ("cavitiesNumber", "cycleTimeInSeconds", "description", "id", "productId", "projectNumber", "technology", "ute") SELECT "cavitiesNumber", "cycleTimeInSeconds", "description", "id", "productId", "projectNumber", "technology", "ute" FROM "ProductionProcess";
DROP TABLE "ProductionProcess";
ALTER TABLE "new_ProductionProcess" RENAME TO "ProductionProcess";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
