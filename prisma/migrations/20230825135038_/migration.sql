/*
  Warnings:

  - Added the required column `cycleTimeInSeconds` to the `ProductionProcess` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductionProcess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "cycleTimeInSeconds" INTEGER NOT NULL
);
INSERT INTO "new_ProductionProcess" ("description", "id") SELECT "description", "id" FROM "ProductionProcess";
DROP TABLE "ProductionProcess";
ALTER TABLE "new_ProductionProcess" RENAME TO "ProductionProcess";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
