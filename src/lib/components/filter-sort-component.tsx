// FilterSortComponent.js
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { queryKey } from "../constants/query.constants";
import * as apiClient from "../api-client";
import { Select, SelectItem } from "@nextui-org/react";
import { ProductFamilyType } from "../../../types";

const FilterSortComponent = () => {
  const {
    data: productFamilyData,
    isLoading: isLoadingProductFamily,
    isError,
  } = useQuery({
    queryKey: [queryKey.productFamily.getAll],
    queryFn: () => apiClient.getProductFamilies(),
  });

  console.log("productFamilyData ---------", productFamilyData);

  if (isLoadingProductFamily) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const { status, message, data } = productFamilyData;
  const { productFamilies } = data;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Filter & Sort</h2>

      {/* Example filter: Category */}
      <div className="mb-4">
        <Select label="Category" className="w-full">
          {productFamilies.map((family: ProductFamilyType) => (
            <SelectItem key={family.familyId}>{family.familyName}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Example filter: Price */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Price Range</label>
        <input type="range" className="w-full" min="0" max="1000" step="50" />
      </div>

      {/* Example sort: Sort By */}
      <div className="mb-4">
        <Select label="Sort By" className="w-full">
          <SelectItem key={"price-low-to-high"}>Price: Low to High</SelectItem>
          <SelectItem key={"price-high-to-low"}>Price: High to Low</SelectItem>
          <SelectItem key={"rating-low-to-high"}>
            Ratings: Low to High
          </SelectItem>
          <SelectItem key={"rating-high-to-low"}>
            Ratings: High to Low
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default FilterSortComponent;
