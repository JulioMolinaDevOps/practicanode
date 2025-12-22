-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
