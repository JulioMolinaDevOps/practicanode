/*
  Warnings:

  - You are about to drop the `todomodel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "todomodel";

-- CreateTable
CREATE TABLE "tuputa" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tuputa_pkey" PRIMARY KEY ("id")
);
