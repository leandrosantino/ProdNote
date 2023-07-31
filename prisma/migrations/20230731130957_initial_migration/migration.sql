-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "technicalDescription" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "partNumber" TEXT NOT NULL,
    "sapCode" TEXT NOT NULL,
    "projectNumber" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "productionGroupId" TEXT,
    CONSTRAINT "Product_productionGroupId_fkey" FOREIGN KEY ("productionGroupId") REFERENCES "ProductionGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "productionGroupId" TEXT,
    CONSTRAINT "Machine_productionGroupId_fkey" FOREIGN KEY ("productionGroupId") REFERENCES "ProductionGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductionGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PlanningReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "index" INTEGER NOT NULL,
    "weeklyDemand" INTEGER NOT NULL,
    "dailyDemand" INTEGER NOT NULL,
    "initialStock" REAL NOT NULL,
    "currentStock" REAL NOT NULL,
    "coverage" REAL NOT NULL,
    "minLot" REAL NOT NULL,
    "productionGroupId" TEXT NOT NULL,
    "planningId" TEXT,
    CONSTRAINT "PlanningReport_planningId_fkey" FOREIGN KEY ("planningId") REFERENCES "Planning" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PlanningReport_productionGroupId_fkey" FOREIGN KEY ("productionGroupId") REFERENCES "ProductionGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Planning" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startsAt" DATETIME NOT NULL,
    "endsAt" DATETIME NOT NULL,
    "lowRunner" INTEGER NOT NULL,
    "HighRunner" INTEGER NOT NULL,
    "productiveDays" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "SystemPermission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MachineToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MachineToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Machine" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MachineToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PlanningToProductionGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PlanningToProductionGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Planning" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PlanningToProductionGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionGroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SystemPermissionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SystemPermissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "SystemPermission" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SystemPermissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MachineToProduct_AB_unique" ON "_MachineToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_MachineToProduct_B_index" ON "_MachineToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlanningToProductionGroup_AB_unique" ON "_PlanningToProductionGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_PlanningToProductionGroup_B_index" ON "_PlanningToProductionGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SystemPermissionToUser_AB_unique" ON "_SystemPermissionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SystemPermissionToUser_B_index" ON "_SystemPermissionToUser"("B");
