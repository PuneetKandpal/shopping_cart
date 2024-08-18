"use client";

import React from "react";
import ProductList from "./product-list";
import FilterSortComponent from "./filter-sort-component";

function Home() {
  return (
    <div className=" grid grid-cols-12 p-4">
      <div className="col-span-12 md:col-span-3 ">
          <FilterSortComponent />
      </div>
      <div className="col-span-12 md:col-span-9 ">
        <ProductList />
      </div>
    </div>
  );
}

export default Home;
