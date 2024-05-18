-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "code_from" TEXT NOT NULL,
    "code_to" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);
