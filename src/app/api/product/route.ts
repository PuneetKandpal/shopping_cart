import { app } from "@/lib/constants/app.constants";
import ProductClassInstance from "@/lib/data-access/product";
import GeneralHelperInstance from "@/lib/helpers/general.helper";
import { NextResponse } from "next/server";
import { _createResponseProductList } from "./helper";

export async function GET(request: Request) {
  try {
    const PAGE = Number(
      new URL(request.url).searchParams.get("page") ||
        process.env.PAGINATION_DEFAULT_PAGE
    );
    const LIMIT = Number(
      new URL(request.url).searchParams.get("limit") ||
        process.env.PAGINATION_DEFAULT_LIMIT
    );

    const SEARCH = null;
    const SKIP = (PAGE - 1) * LIMIT;

    let products = await ProductClassInstance.getProducts(SKIP, LIMIT, SEARCH);

    let allProductsCount = await ProductClassInstance.getProductsCount(SEARCH);

    let productList = await _createResponseProductList(products);

    return NextResponse.json(
      GeneralHelperInstance.createResponseJSON(
        true,
        { products: productList, totalCount: allProductsCount },
        app.product.getAllSuccess
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      GeneralHelperInstance.createResponseJSON(
        false,
        null,
        app.product.somethingWrong
      ),
      {
        status: 500,
      }
    );
  }
}
