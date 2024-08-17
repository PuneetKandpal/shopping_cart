import { DiscountType } from "@prisma/client";

export type ProductType = {
  productId: string;
  productCode: string;
  productName: string;
  description: string;
  productImage: string;
  productPrice: number;
  productDiscount: number;
  productDiscountType: DiscountType;
  rating: number | null;
  showAssuredTag: boolean;
  familyId: string;
  familyName: string;
  familyDescription: string;
  familyImage: string;
  taxInPercent: number;
};


export type ProductFamilyType = {
  familyId: string;
  familyName: string;
  familyDescription: string;
  familyImage: string;
  taxInPercent: number;
};

export type ProductWithQuantityType = ProductType & {
  quantity: number;
}

