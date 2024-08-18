// FilterSortComponent.js
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { queryKey } from "../constants/query.constants";
import * as apiClient from "../api-client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";
import { ProductFamilyType } from "../../../types";
import { IoMdSearch } from "react-icons/io";
import { app } from "../constants/app.constants";
import { useAppDispatch } from "../redux/hooks";
import {
  setCategory,
  setMaxPrice,
  setMinPrice,
  setRatings,
  setSearchCriteria,
  setSortCriteria,
} from "../redux/slices/product";
import { ProductRatings } from "./ratings";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { cn } from "../utils";
import FilterShimmer from "./shimmer/filter.shimmer";

const sortingCriteria = app.filterSort.sortCriteria;
const sortingCriteriaList = Object.keys(sortingCriteria) as Array<
  keyof typeof sortingCriteria
>;
const ratings = app.filterSort.ratings;

const FilterSortComponent = () => {
  const [filter, setFilter] = useState({
    category: "",
    ratings: "",
    minPrice: 5,
    maxPrice: 50,
  });
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [isFilterOrSortApplied, setIsFilterOrSortApplied] = useState(false);

  const dispatch = useAppDispatch();

  function handleApply() {
    console.log("filter", filter);
    console.log("sort", sort);
    console.log("search", search);
    setIsFilterOrSortApplied(true);
    dispatch(setCategory(filter.category));
    dispatch(setSortCriteria(sort));
    dispatch(setSearchCriteria(search));
    dispatch(setMinPrice(filter.minPrice));
    dispatch(setMaxPrice(filter.maxPrice));
    dispatch(setRatings(filter.ratings));
  }

  function handleReset() {
    setFilter({
      category: "",
      minPrice: 5,
      maxPrice: 50,
      ratings: "",
    });
    setSort("");
    setSearch("");
    setIsFilterOrSortApplied(false);

    dispatch(setCategory(""));
    dispatch(setSortCriteria(""));
    dispatch(setSearchCriteria(""));
    dispatch(setMinPrice(5));
    dispatch(setMaxPrice(50));
    dispatch(setRatings(""));
  }

  // fetch All product categories
  const {
    data: productFamilyData,
    isLoading: isLoadingProductFamily,
    isError,
  } = useQuery({
    queryKey: [queryKey.productFamily.getAll],
    queryFn: () => apiClient.getProductFamilies(),
  });

  if (isLoadingProductFamily) {
    return (
      <div>
        <FilterShimmer />
      </div>
    );
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const { data } = productFamilyData;
  const { productFamilies } = data;

  function handleClear() {
    setSearch("");
  }

  return (
    <Accordion defaultExpandedKeys={["1"]}>
      <AccordionItem
        key="1"
        indicator={
          <IoIosArrowDropleftCircle
            className={cn("text-gray-600 h-7 w-7", {
              " border-3 border-primary rounded-full": isFilterOrSortApplied,
            })}
          />
        }
        className=""
        title={
          <span className="text-2xl lg:text-3xl font-semibold flex items-start gap-2">
            Filter & Sort{" "}
          </span>
        }
      >
        <Card className="bg-white p-5 rounded shadow-md">
          <CardBody className="mb-4">
            <div className="mb-6">
              <Input
                className="w-full"
                label={
                  <label className="block text-lg text-gray-600 font-medium">
                    Search Products
                  </label>
                }
                placeholder="Product name"
                startContent={<IoMdSearch className="w-7 h-7" />}
                size="lg"
                labelPlacement="outside"
                isClearable
                onClear={handleClear}
                value={search}
                onValueChange={(value) => setSearch(value)}
              />
            </div>

            <div className="mb-6">
              <Select
                label={
                  <label className="block text-lg text-gray-600 font-medium">
                    Category
                  </label>
                }
                size="lg"
                labelPlacement="outside"
                className="w-full"
                placeholder="Select Category"
                selectedKeys={[filter.category]}
                onSelectionChange={(value) => {
                  setFilter({ ...filter, category: value.currentKey || "" });
                }}
              >
                {productFamilies.map((family: ProductFamilyType) => (
                  <SelectItem key={family.familyId} value={family.familyId}>
                    {family.familyName}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="mb-6">
              <Slider
                label={
                  <label className="block text-lg text-gray-600 font-medium">
                    Price Range
                  </label>
                }
                step={1}
                minValue={0}
                maxValue={100}
                value={[filter.minPrice, filter.maxPrice]}
                onChange={(value) => {
                  const [min, max] = value as number[];
                  setFilter({ ...filter, minPrice: min, maxPrice: max });
                }}
                formatOptions={{ style: "currency", currency: "USD" }}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <Select
                label={
                  <label className="block text-lg text-gray-600 font-medium">
                    Sort by
                  </label>
                }
                size="lg"
                labelPlacement="outside"
                className="w-full"
                placeholder="Select sort criteria"
                selectedKeys={[sort]}
                onSelectionChange={(value) => {
                  setSort(value.currentKey || "");
                }}
              >
                {sortingCriteriaList.map((criteriaKey) => (
                  <SelectItem
                    key={sortingCriteria[criteriaKey].value}
                    value={criteriaKey}
                  >
                    {sortingCriteria[criteriaKey].label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="mb-4">
              <RadioGroup
                value={filter.ratings}
                onValueChange={(value) => {
                  setFilter({ ...filter, ratings: value });
                }}
                label={
                  <label className="block mb-1 text-lg text-gray-600 font-medium">
                    Ratings
                  </label>
                }
              >
                {ratings.map((rating) => (
                  <Radio
                    className="xl:ml-5"
                    size="lg"
                    key={rating}
                    value={rating.toString()}
                  >
                    <div className="flex items-center gap-2">
                      <ProductRatings
                        rating={rating}
                        classForRating="hidden"
                        classForStars="h-6 w-6 lg:mx-1"
                      />
                      <span className="text-lg pt-1 text-gray-700 font-normal">
                        {rating} or more
                      </span>
                    </div>
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </CardBody>

          <CardFooter className="mb-4 flex justify-end gap-5">
            <Button
              variant="bordered"
              color="danger"
              className="text-base"
              onClick={handleReset}
            >
              <span>Clear</span>
            </Button>
            <Button
              variant="solid"
              color="primary"
              className="text-base"
              onClick={handleApply}
            >
              <span>Apply</span>
            </Button>
          </CardFooter>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterSortComponent;
