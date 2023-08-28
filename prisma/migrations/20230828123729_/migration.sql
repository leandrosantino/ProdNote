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
    "amount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "productionProcessId" TEXT,
    CONSTRAINT "Machine_productionProcessId_fkey" FOREIGN KEY ("productionProcessId") REFERENCES "ProductionProcess" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    "description" TEXT NOT NULL,
    "cycleTimeInSeconds" INTEGER NOT NULL,
    "projectNumber" TEXT NOT NULL,
    "technology" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "ProductionProcess_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "lostTimeInMinutes" INTEGER NOT NULL,
    "reasonsLossEfficiencyId" TEXT,
    "productionEfficiencyRecordId" TEXT,
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
    "productionTimeInMinutes" INTEGER NOT NULL,
    "piecesQuantity" INTEGER NOT NULL,
    "oeeValue" INTEGER NOT NULL,
    "productionProcessId" TEXT,
    CONSTRAINT "ProductionEfficiencyRecord_productionProcessId_fkey" FOREIGN KEY ("productionProcessId") REFERENCES "ProductionProcess" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MachineToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MachineToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Machine" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MachineToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SystemPermissionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SystemPermissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "SystemPermission" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SystemPermissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Machine_slug_key" ON "Machine"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_MachineToProduct_AB_unique" ON "_MachineToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_MachineToProduct_B_index" ON "_MachineToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SystemPermissionToUser_AB_unique" ON "_SystemPermissionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SystemPermissionToUser_B_index" ON "_SystemPermissionToUser"("B");
