import { getImageURL } from "@/lib/helpers/cloud.helper";
import { ProductFamilyType } from "../../../../types";

export async function _createResponseProductFamilyList(productFamilies: any) {

    if (!productFamilies || productFamilies.length == 0) return [];

    let productFamilyList: ProductFamilyType[] = [];
  
    for await (const family of productFamilies) {
      let _product = {
        familyId: family.familyId,
        familyName: family.familyName,
        familyDescription: family.description,
        familyImage:  await getImageURL(family.familyImage ?? ""),
        taxInPercent: family.taxInPercent,
      };
      productFamilyList.push(_product);
    }
    return productFamilyList;


}