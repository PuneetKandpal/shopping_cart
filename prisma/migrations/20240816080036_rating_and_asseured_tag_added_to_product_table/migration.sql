-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Rating" DOUBLE PRECISION,
ADD COLUMN     "Show_Assured_Tag" BOOLEAN NOT NULL DEFAULT false;
