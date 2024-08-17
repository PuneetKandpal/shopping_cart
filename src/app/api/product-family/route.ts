import { app } from "@/lib/constants/app.constants";
import ProductFamilyClassInstance from "@/lib/data-access/product-family";
import GeneralHelperInstance from "@/lib/helpers/general.helper";
import { NextResponse } from "next/server";
import { _createResponseProductFamilyList } from "./helper";



export async function GET(request: Request) {
    try {
      let productFamilies = await ProductFamilyClassInstance.getProductFamilies();

      let allProductFamilyCount =
        await ProductFamilyClassInstance.getProductFamiliesCount();
  
      let productFamilyList = await _createResponseProductFamilyList(productFamilies);
      
      console.log("productFamilyList ---", productFamilyList);

      return NextResponse.json(
        GeneralHelperInstance.createResponseJSON(
          true,
          {productFamilies: productFamilyList, totalCount: allProductFamilyCount},
          app.productFamily.getAllSuccess,
        ),
        {
          status: 200,
        },
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        GeneralHelperInstance.createResponseJSON(
          false,
          null,
          app.productFamily.somethingWrong,
        ),
        {
          status: 500,
        },
      );
    }
  }