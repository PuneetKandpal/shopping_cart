-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENT', 'FLAT');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "paymentStatusType" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "User_Name" TEXT,
    "Email" TEXT,
    "Is_Active" BOOLEAN NOT NULL DEFAULT true,
    "Role" "UserRole" DEFAULT 'User',
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" TEXT NOT NULL,
    "Product_Code" TEXT,
    "Product_Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Product_Image" TEXT,
    "Product_Price" DOUBLE PRECISION,
    "Product_Discount" DOUBLE PRECISION DEFAULT 0.0,
    "Product_Discount_Type" "DiscountType" NOT NULL DEFAULT 'PERCENT',
    "Family_Id" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ProductFamily" (
    "Family_Id" TEXT NOT NULL,
    "Family_Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Family_Image" TEXT,
    "Tax_In_Percent" DOUBLE PRECISION,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ProductFamily_pkey" PRIMARY KEY ("Family_Id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" TEXT NOT NULL,
    "User_Id" INTEGER NOT NULL,
    "Total_Items" INTEGER NOT NULL,
    "Total_Price_After_Discount" DOUBLE PRECISION NOT NULL,
    "Total_Discount_Amount" DOUBLE PRECISION NOT NULL,
    "Total_Tax_Amount" DOUBLE PRECISION NOT NULL,
    "Shipping_Charges" DOUBLE PRECISION NOT NULL,
    "Payment_Status" "paymentStatusType",
    "Transaction_Status" TEXT NOT NULL,
    "Transaction_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "TransactionDetails" (
    "transactionDetailId" TEXT NOT NULL,
    "Product_Id" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Product_Price_Before_Discount" DOUBLE PRECISION NOT NULL,
    "Discount_Amount" DOUBLE PRECISION NOT NULL,
    "Product_Price_After_Discount" DOUBLE PRECISION NOT NULL,
    "Tax_Amount" DOUBLE PRECISION NOT NULL,
    "Transaction_Id" TEXT NOT NULL,

    CONSTRAINT "TransactionDetails_pkey" PRIMARY KEY ("transactionDetailId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_User_Name_key" ON "User"("User_Name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_Product_Code_key" ON "Product"("Product_Code");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFamily_Family_Name_key" ON "ProductFamily"("Family_Name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Family_Id_fkey" FOREIGN KEY ("Family_Id") REFERENCES "ProductFamily"("Family_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDetails" ADD CONSTRAINT "TransactionDetails_Transaction_Id_fkey" FOREIGN KEY ("Transaction_Id") REFERENCES "Transaction"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;
