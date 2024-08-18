import { app } from "@/lib/constants/app.constants";
import ProductClassInstance from "@/lib/data-access/product";
import GeneralHelperInstance from "@/lib/helpers/general.helper";
import { NextResponse } from "next/server";
import { _createResponseProductList } from "./helper";

export async function GET(request: Request) {
  try {
    const {
      PAGE,
      LIMIT,
      CATEGORY,
      SORT,
      MIN_PRICE,
      MAX_PRICE,
      SEARCH,
      MIN_RATINGS,
    } = _getRequestParams(request);
    const SKIP = (PAGE - 1) * LIMIT;
    let where = _getFilterCriteria(
      CATEGORY,
      MIN_RATINGS,
      MIN_PRICE,
      MAX_PRICE,
      SEARCH
    );
    let sort = _getSortCriteria(SORT);

    let products = await ProductClassInstance.getProducts(
      SKIP,
      LIMIT,
      where,
      sort
    );
    let allProductsCount = await ProductClassInstance.getProductsCount(where);
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

function _getFilterCriteria(
  CATEGORY: string,
  MIN_RATINGS: number,
  MIN_PRICE: number,
  MAX_PRICE: number,
  SEARCH: string
) {
  let where: Record<string, any> = {
    productPrice: {},
  };

  if (CATEGORY) {
    where.familyId = CATEGORY;
  }
  if (SEARCH) {
    where.productName = {
      contains: SEARCH,
      mode: "insensitive",
    };
  }

  if (MIN_RATINGS) {
    where.rating = {
      gte: MIN_RATINGS,
    };
  }

  if (MIN_PRICE) {
    where.productPrice.gte = MIN_PRICE;
  }

  if (MAX_PRICE) {
    where.productPrice.lte = MAX_PRICE;
  }

  return where;
}

function _getSortCriteria(SORT: string) {
  let sort: Record<string, any> = {};
  if (SORT == app.filterSort.sortCriteria.priceHighToLow.value) {
    sort.productPrice = "desc";
  }
  if (SORT == app.filterSort.sortCriteria.priceLowToHigh.value) {
    sort.productPrice = "asc";
  }
  if (SORT == app.filterSort.sortCriteria.ratingHighToLow.value) {
    sort.rating = "desc";
  }
  if (SORT == app.filterSort.sortCriteria.ratingLowToHigh.value) {
    sort.rating = "asc";
  }
  return sort;
}

function _getRequestParams(request: Request) {
  const PAGE = Number(
    new URL(request.url).searchParams.get("page") ||
      process.env.PAGINATION_DEFAULT_PAGE
  );
  const LIMIT = Number(
    new URL(request.url).searchParams.get("limit") ||
      process.env.PAGINATION_DEFAULT_LIMIT
  );

  const CATEGORY = new URL(request.url).searchParams.get("category") || "";
  const SORT = new URL(request.url).searchParams.get("sort") || "";
  const MIN_PRICE = Number(
    new URL(request.url).searchParams.get("minPrice") || 0
  );
  const MAX_PRICE = Number(
    new URL(request.url).searchParams.get("maxPrice") || 0
  );
  const SEARCH = new URL(request.url).searchParams.get("search") || "";
  const MIN_RATINGS = Number(
    new URL(request.url).searchParams.get("minRatings") || 0
  );

  return {
    PAGE,
    LIMIT,
    CATEGORY,
    SORT,
    MIN_PRICE,
    MAX_PRICE,
    SEARCH,
    MIN_RATINGS,
  };
}
