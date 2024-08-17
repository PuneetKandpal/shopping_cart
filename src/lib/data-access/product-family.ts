import prisma from "../services/prisma-client";
import ApplicationError, { ERROR_CODES } from "../error/application.error";

class ProductFamilyDA {
  static instance: ProductFamilyDA | null = null;

  public static getInstance() {
    if (!ProductFamilyDA.instance) {
      ProductFamilyDA.instance = new ProductFamilyDA();
    }
    return ProductFamilyDA.instance;
  }

  async getProductFamilies() {
    try {

      const products = await prisma.productFamily.findMany({
        orderBy: {
          familyName: "asc",
        },
      });
      return products;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(ERROR_CODES.FETCH_PRODUCTS_FAMILY_FAILED);
    }
  }

  async getProductFamiliesCount(search?: Record<string, string> | null) {
    try {
      let where = { isDeleted: false };

      if (search) {
        where = {
          isDeleted: false,
          ...search,
        };
      }

      const productsFamilyCount = await prisma.productFamily.count();
      return productsFamilyCount;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(ERROR_CODES.FETCH_PRODUCTS_FAMILY_FAILED);
    }
  }
}

const ProductFamilyClassInstance = ProductFamilyDA.getInstance();

export default ProductFamilyClassInstance;
