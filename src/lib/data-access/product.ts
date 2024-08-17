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
    search?: Record<string, string> | null
  ) {
    try {
      let where = { isDeleted: false };

      if (search) {
        where = {
          isDeleted: false,
          ...search,
        };
      }

      const products = await prisma.product.findMany({
        where: {},
        skip: offset,
        take: limit,
        orderBy: {
          familyId: "asc",
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

  async getProductsCount(search?: Record<string, string> | null) {
    try {
      let where = { isDeleted: false };

      if (search) {
        where = {
          isDeleted: false,
          ...search,
        };
      }

      const productsCount = await prisma.product.count({
        where,
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
