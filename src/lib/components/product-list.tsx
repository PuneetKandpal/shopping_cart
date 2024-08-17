"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { queryKey } from "../constants/query.constants";
import * as apiClient from "../api-client";
import { ProductType } from "../../../types";
import ProductCard from "./product";
import BlurFade from "@/components/magicui/blur-fade";




function ProductList() {
  const {
    data: productData,
    isLoading: isLoadingProducts,
    isError,
  } = useQuery({
    queryKey: [queryKey.products.getAll],
    queryFn: () => apiClient.getProducts(1, 10),
  });

  console.log("productData --->", productData);

  if (isLoadingProducts) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const { status, message, data } = productData;

  if (!status) {
    return <div>Error: {message}</div>;
  }

  const { products, totalCount } = data;

  return (
    <main className="grid grid-cols-12 gap-10 p-4">
      {products.map((product: ProductType, index: number) => (
        <BlurFade
          className="col-span-12 sm:col-span-6 lg:col-span-4  flex justify-center items-center"
          key={product.productId}
          delay={0.25 + index * 0.05}
          inView
        >
          <ProductCard product={product} />
        </BlurFade>
      ))}
    </main>
  );
}

export default ProductList;
