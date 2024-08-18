"use client";

import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import React from "react";
import { queryKey } from "../constants/query.constants";
import * as apiClient from "../api-client";
import { ProductType } from "../../../types";
import ProductCard from "./product";
import BlurFade from "@/lib/components/magicui/blur-fade";
import { Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ProductCardShimmer from "./shimmer/product.shimmer";

type ProductListResponse = any;

type QueryFnProps = {
  pageParam?: number;
};

function ProductList() {
  const { category, sort, minPrice, maxPrice, search, ratings } =
    useAppSelector((state) => state.product);

  const LIMIT = 5;

  const {
    data: productData,
    isLoading: isLoadingProducts,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  }: UseInfiniteQueryResult<ProductListResponse, Error> = useInfiniteQuery({
    queryKey: [
      queryKey.products.getAll,
      category,
      sort,
      minPrice,
      maxPrice,
      search,
      ratings,
    ],
    queryFn: ({ pageParam = 1 }: QueryFnProps) =>
      apiClient.getProducts(
        pageParam,
        LIMIT,
        category,
        sort,
        minPrice,
        maxPrice,
        search,
        ratings
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.data?.products?.length) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  if (isLoadingProducts) {
    return (
      <main className="grid grid-cols-12 gap-5 md:gap-10 p-4">
        {new Array(5).fill(0).map((_, index) => (
          <div
            key={index}
            className="col-span-12 sm:col-span-6 lg:col-span-4 flex justify-center items-center"
          >
            <ProductCardShimmer />
          </div>
        ))}
      </main>
    );
  }

  if (isError) {
    return <div>Error loading products. Please try again later.</div>;
  }

  if (!productData || productData.pages.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <main className="grid grid-cols-12 gap-5 md:gap-10 p-4">
      {productData.pages.map((group: any, pageIndex: number) =>
        group.data.products.map((product: ProductType, index: number) => (
          <BlurFade
            className="col-span-12 sm:col-span-6 lg:col-span-4 flex justify-center items-center"
            key={product.productId}
            delay={0.25 + pageIndex * 0.1 + index * 0.05}
            inView
          >
            <ProductCard product={product} />
          </BlurFade>
        ))
      )}

      <div className="col-span-12 flex justify-center items-center">
        <Button
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          isDisabled={!hasNextPage || isFetchingNextPage}
          variant="bordered"
          color="primary"
          className="text-base"
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </div>
    </main>
  );
}

export default ProductList;
