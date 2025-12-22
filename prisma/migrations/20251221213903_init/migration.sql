/*
  Warnings:

  - You are about to drop the `tuputa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tuputa";

-- CreateTable
CREATE TABLE "todomodel" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "todomodel_pkey" PRIMARY KEY ("id")
);
