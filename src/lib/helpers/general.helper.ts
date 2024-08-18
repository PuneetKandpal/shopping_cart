import { DiscountType } from "@prisma/client";

class GeneralHelper {
  static instance: GeneralHelper | null = null;

  public static getInstance() {
    if (!GeneralHelper.instance) {
      GeneralHelper.instance = new GeneralHelper();
    }
    return GeneralHelper.instance;
  }

  createResponseJSON(
    status: boolean,
    data: Record<string, unknown> | null,
    message: string
  ) {
    return {
      status: status,
      message: message,
      data: data,
    };
  }

  async wait(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  getDiscountedPrice(
    price: number,
    discountType: DiscountType,
    discountValue: number,
    quantity: number = 1
  ) {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }

    let discountedPrice = 0;

    switch (discountType) {
      case "PERCENT":
        if (discountValue < 0 || discountValue > 100) {
          throw new Error("Percentage discount must be between 0 and 100");
        }
        discountedPrice = price * (1 - discountValue / 100);
        break;

      case "FLAT":
        if (discountValue < 0) {
          throw new Error("Flat discount cannot be negative");
        }
        discountedPrice = price - discountValue;
        if (discountedPrice < 0) {
          throw new Error("Flat discount cannot exceed the price");
        }
        break;

      default:
        throw new Error("Invalid discount type");
    }

    return discountedPrice * quantity;
  }

  getNetPriceWithTax(
    price: number,
    discountType: DiscountType,
    discountValue: number,
    taxInPercent: number,
    quantity: number = 1
  ) {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }

    let discountedPrice = 0;

    switch (discountType) {
      case "PERCENT":
        if (discountValue < 0 || discountValue > 100) {
          throw new Error("Percentage discount must be between 0 and 100");
        }
        discountedPrice = price * (1 - discountValue / 100);
        break;

      case "FLAT":
        if (discountValue < 0) {
          throw new Error("Flat discount cannot be negative");
        }
        discountedPrice = price - discountValue;
        if (discountedPrice < 0) {
          throw new Error("Flat discount cannot exceed the price");
        }
        break;

      default:
        throw new Error("Invalid discount type");
    }

    return (discountedPrice * quantity * (1 + taxInPercent / 100)).toFixed(2);
  }

  getDiscountValue(
    price: number,
    discountType: DiscountType,
    discountValue: number,
    quantity: number = 1
  ) {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }

    let discountInCurrency = 0;

    switch (discountType) {
      case "PERCENT":
        if (discountValue < 0 || discountValue > 100) {
          throw new Error("Percentage discount must be between 0 and 100");
        }
        discountInCurrency = price * (discountValue / 100);
        break;

      case "FLAT":
        if (discountValue < 0) {
          throw new Error("Flat discount cannot be negative");
        }
        discountInCurrency = discountValue;
        break;

      default:
        throw new Error("Invalid discount type");
    }

    return (discountInCurrency * quantity).toFixed(2);
  }

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

const GeneralHelperInstance = GeneralHelper.getInstance();

export default GeneralHelperInstance;
