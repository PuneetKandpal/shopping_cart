import { fail } from "assert";

export const app = {
  ToastType: {
    success: "SUCCESS",
    error: "ERROR",
    warning: "WARNING",
    custom: "CUSTOM",
  } as const,

  responseMessage: {
    success: "SUCCESS",
    failed: "FAILED",
  },

  product: {
    getAllSuccess: "SUCCESS",
    somethingWrong: "Something went wrong",
  },
  productFamily: {
    getAllSuccess: "SUCCESS",
    somethingWrong: "Something went wrong",
  },

  filterSort: {
    ratings: [4 , 3, 2, 1],
    sortCriteria: {
      priceLowToHigh: {
        label: "Price: Low to High",
        value: "price-low-to-high",
      },
      priceHighToLow: {
        label: "Price: High to Low",
        value: "price-high-to-low",
      },
      ratingLowToHigh: {
        label: "Ratings: Low to High",
        value: "rating-low-to-high",
      },
      ratingHighToLow: {
        label: "Ratings: High to Low",
        value: "rating-high-to-low",
      },
    },
  },
};
