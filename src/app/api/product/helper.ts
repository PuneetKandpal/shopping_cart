import { getImageURL } from "@/lib/helpers/cloud.helper";
import { ProductType } from "../../../../types";


export async function _createResponseProductList(products: any[]) {



  if (!products || products.length == 0) return [];

  let productList: ProductType[] = [];

  for await (const product of products) {

    let _product = {
      productId: product?.productId,
      productCode: product?.productCode,
      productName: product?.productName,
      description: product?.description,
      productImage: product.productImage  ? await getImageURL(product.productImage ) : "",
      productPrice: product?.productPrice,
      productDiscount: product?.productDiscount,
      productDiscountType: product?.productDiscountType,
      rating: product?.rating,
      showAssuredTag: product?.showAssuredTag,
      familyId: product?.familyId,
      familyName: product?.family.familyName,
      familyDescription: product?.family?.description,
      familyImage:  product?.family?.familyImage ? await getImageURL(product?.family?.familyImage ) : "", 
      taxInPercent: product?.family.taxInPercent,
    };
    productList.push(_product);
  }

  return productList;
}
