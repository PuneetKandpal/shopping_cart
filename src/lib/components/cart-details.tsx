"use client";

import React, { useState } from "react";
import { ProductWithQuantityType } from "../../../types";
import { useAppSelector } from "../redux/hooks";
import GeneralHelperInstance from "../helpers/general.helper";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { cn } from "../utils";
import { RxCross2 } from "react-icons/rx";

export default function CartDetails() {
  const [showProductDetails, setShowProductDetails] = useState(false);

  return (
    <Card className="w-full p-5">
      <CardHeader>
        <span className="text-3xl xl:text-4xl font-bold">Cart Details</span>
      </CardHeader>
      <CardBody className="pl-5 xl:pl-16">
        <RenderCartTotals />
        <button
          onClick={() => setShowProductDetails(!showProductDetails)}
          className="flex items-center gap-2  col-span-2 my-5 text-lg font-semibold underline underline-offset-1 text-blue-500 mr-auto"
        >
          <IoIosArrowDroprightCircle
            className={cn("text-blue-500 transition-all duration-250", {
              "rotate-90 text-blue-700": showProductDetails,
            })}
          />
          Show Details
        </button>
      </CardBody>

      {showProductDetails && (
        <CardFooter className="w-full pl-6 xl:pl-20">
          <RenderProductDetails />
        </CardFooter>
      )}
    </Card>
  );
}

function RenderProductDetails() {
  const cartItems = useAppSelector((state) => state.cart.productIdAndQuantity);
  const productIdList = Object.keys(cartItems);
  const currencySymbol = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;

  return (
    <div className="flex flex-col gap-[0.1rem] w-full">
      <div
        key={"123"}
        className="grid grid-cols-8 bg-gray-100 p-2 mb-2 rounded-md shadow-sm shadow-gray-400"
      >
        <span className="text-sm xl:text-lg col-span-2 xl:col-span-3">
          Product Name
        </span>
        <span className="text-sm xl:text-lg xl:col-span-1 col-span-2 flex items-center">
          Quantity
        </span>
        <span className="text-sm xl:text-lg col-span-2">Total Price</span>
        <span className="text-sm xl:text-lg col-span-2">Discounted Price</span>
      </div>
      {productIdList.map((productId) => {
        const product = cartItems[productId];
        return (
          <div key={productId} className="grid grid-cols-8 pl-2 xl:pl-4">
            <span className="text-sm xl:text-lg col-span-2 xl:col-span-3">
              {product.productName}
            </span>
            <span className="text-sm xl:text-lg xl:col-span-1 col-span-2 flex items-center">
              (
              <span>
                <RxCross2 className="w-3 h-3 ml-[0.2rem] mr-[0.1rem]" />{" "}
              </span>
              <span className="p-1">{product.quantity}</span>)
            </span>
            <span className="text-sm xl:text-lg col-span-2">
              <span className="p-1 font-semibold">{currencySymbol}</span>
              {(product.productPrice * product.quantity).toFixed(1)}
            </span>
            <span className="text-sm xl:text-lg col-span-2">
              <span className="p-1 font-semibold">{currencySymbol}</span>
              {GeneralHelperInstance.getDiscountedPrice(
                product.productPrice,
                product.productDiscountType,
                product.productDiscount,
                product.quantity
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function RenderCartTotals() {
  const cartItems = useAppSelector((state) => state.cart.productIdAndQuantity);
  const currencySymbol = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;
  const {
    totalPriceBeforeDiscount,
    totalPriceAfterDiscount,
    totalDiscountValue,
    totalItems,
  } = _getTotalPricesAndQuantity(cartItems);

  const deliveryCharges =
    totalItems == 0 ? 0 : Number(process.env.NEXT_PUBLIC_DELIVERY_CHARGES);
  const netPayableAmount = Number(totalPriceAfterDiscount) + deliveryCharges;

  return (
    <>
      <div className="grid grid-cols-5">
        <span className="text-xl xl:text-2xl  col-span-3">Total Items : </span>
        <span className="text-2xl xl:text-3xl col-span-2 pl-14">
          ({totalItems})
        </span>
      </div>
      <div className="grid grid-cols-5 mb-1">
        <span className="text-xl xl:text-2xl col-span-3">Total Price : </span>
        <span className="text-2xl xl:text-3xl col-span-2">
          <span className="p-2 font-semibold">{currencySymbol}</span>
          {totalPriceBeforeDiscount}
        </span>
      </div>
      <div className="grid grid-cols-5">
        <span className="text-xl xl:text-2xl col-span-3">
          Total Discount :{" "}
        </span>
        <span className="text-2xl xl:text-3xl col-span-2">
          <span className="p-2 font-semibold">{currencySymbol}</span>
          {totalDiscountValue}
        </span>
      </div>
      <div className="grid grid-cols-5 mb-1">
        <span className="text-xl xl:text-2xl col-span-3">
          Price After Discount :{" "}
        </span>
        <span className="text-2xl xl:text-3xl col-span-2">
          <span className="p-2 font-semibold">{currencySymbol}</span>
          {totalPriceAfterDiscount}
        </span>
      </div>

      <div className="grid grid-cols-5">
        <span className="text-xl xl:text-2xl col-span-3">
          Delivery Charges :{" "}
        </span>
        <span className="text-2xl xl:text-3xl col-span-2">
          <span className="p-2 font-semibold">{currencySymbol}</span>
          {deliveryCharges.toFixed(2)}
        </span>
      </div>

      <Divider className="my-5" />
      <div className="grid grid-cols-5">
        <span className="text-xl xl:text-2xl col-span-3 text-green-700">
          Net payable amount :{" "}
        </span>
        <span className="text-2xl xl:text-3xl col-span-2">
          <span className="p-2 font-semibold">{currencySymbol}</span>
          {netPayableAmount.toFixed(2)}
        </span>
      </div>
    </>
  );
}

function _getTotalPricesAndQuantity(
  cartItems: Record<string, ProductWithQuantityType>
) {
  let totalPriceBeforeDiscount = 0;
  let totalDiscountValue = 0;
  let totalPriceAfterDiscount = 0;
  let totalItems = 0;
  const productIdList = Object.keys(cartItems);

  productIdList.forEach((productId) => {
    const product = cartItems[productId];

    totalPriceBeforeDiscount += product.productPrice * product.quantity;

    const discountedPrice = GeneralHelperInstance.getDiscountedPrice(
      product.productPrice,
      product.productDiscountType,
      product.productDiscount,
      product.quantity
    );
    totalPriceAfterDiscount += Number(discountedPrice);

    const discountValue = GeneralHelperInstance.getDiscountValue(
      product.productPrice,
      product.productDiscountType,
      product.productDiscount,
      product.quantity
    );

    totalDiscountValue += Number(discountValue);

    totalItems += product.quantity;
  });

  return {
    totalPriceBeforeDiscount: totalPriceBeforeDiscount.toFixed(2),
    totalPriceAfterDiscount: totalPriceAfterDiscount.toFixed(2),
    totalDiscountValue: totalDiscountValue.toFixed(2),
    totalItems: totalItems,
  };
}
