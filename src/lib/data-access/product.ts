import prisma from "../services/prisma-client";
import ApplicationError, { ERROR_CODES } from "../error/application.error";

class ProductDA {
  static instance: ProductDA | null = null;

  public static getInstance() {
    if (!ProductDA.instance) {
      ProductDA.instance = new ProductDA();
    }
    return ProductDA.instance;
  }

  async getProducts(
    offset: number,
    limit: number,
    where?: Record<string, string> | null,
    sort?: Record<string, string> | null
  ) {
    try {
      const products = await prisma.product.findMany({
        where: {
          ...where,
          isDeleted: false,
        },
        skip: offset,
        take: limit,

        orderBy: {
          ...sort,
        },
        include: {
          family: true,
        },
      });
      return products;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(ERROR_CODES.FETCH_PRODUCTS_FAILED);
    }
  }

  async getProductsCount(where?: Record<string, string> | null) {
    try {
      const productsCount = await prisma.product.count({
        where: {
          ...where,
          isDeleted: false,
        },
      });
      return productsCount;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(ERROR_CODES.FETCH_PRODUCTS_FAILED);
    }
  }
}

const ProductClassInstance = ProductDA.getInstance();

export default ProductClassInstance;
