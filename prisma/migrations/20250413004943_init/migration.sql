-- CreateEnum
CREATE TYPE "DEPARTMENT" AS ENUM ('ADMINISTRATION', 'SALES', 'MARKETING', 'MANAGEMENT', 'UNASSIGN');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('SUPERADMIN', 'ADMIN', 'DIRECTOR', 'OWNER', 'MANAGER', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'USER',
    "department" "DEPARTMENT" NOT NULL DEFAULT 'UNASSIGN',
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "taxNo" TEXT NOT NULL,
    "icNo" TEXT NOT NULL,
    "epfNo" TEXT NOT NULL,
    "socsoNo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_icNo_key" ON "User"("icNo");
