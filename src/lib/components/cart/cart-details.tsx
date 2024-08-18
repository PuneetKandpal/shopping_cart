"use client";

import React, { useState } from "react";
import { ProductWithQuantityType } from "../../../../types";

import GeneralHelperInstance from "@/lib/helpers/general.helper";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  divider,
  Divider,
} from "@nextui-org/react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { cn } from "@/lib/utils";
import { MdShoppingCartCheckout } from "react-icons/md";
import NotificationHelperInstance from "@/lib/helpers/notification.helper";
import { emptyCart } from "@/lib/redux/slices/cart";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import AlertBox from "../alert-box";
import { MdDeleteForever } from "react-icons/md";

export default function CartDetails() {
  const dispatch = useAppDispatch();
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);

  async function handleCheckout() {
    setIsLoading(true);
    await GeneralHelperInstance.wait(2000); // 2 seconds

    NotificationHelperInstance.Toast({
      type: "SUCCESS",
      message:
        "Your order has been successfully placed. Thank you for your purchase!",
    });
    dispatch(emptyCart());
    setIsLoading(false);
  }

  return (
    <Card className="w-full p-5">
      <AlertBox
        actionName="Yes"
        content={
          <div className="flex flex-col gap-2">
            <span>
              This will clear your cart and you will not be able to checkout
            </span>
            <span>Do you wish to proceed ?</span>
          </div>
        }
        modalTitle="Clear Cart"
        isOpen={showClearCartModal}
        onOpenChange={() => {
          setShowClearCartModal(!showClearCartModal);
        }}
        onAction={() => {
          dispatch(emptyCart());
        }}
      />
      <CardHeader>
        <span className="text-3xl xl:text-4xl font-bold">Cart Details</span>
      </CardHeader>
      <CardBody className="pl-5 xl:pl-16">
        <RenderCartTotals />

        <Button
          onClick={handleCheckout}
          variant="solid"
          className="w-full xl:w-4/5 mt-4 mb-1 text-lg lg:text-xl"
          startContent={<MdShoppingCartCheckout className="w-5 h-5" />}
          color="primary"
          isLoading={isLoading}
        >
          Checkout
        </Button>
        <Button
          color="danger"
          variant="ghost"
          onClick={() => setShowClearCartModal(true)}
          startContent={<MdDeleteForever className="w-5 h-5" />}
          className="w-full xl:w-4/5 mt-2 mb-1 text-lg lg:text-xl"
        >
          Clear Cart
        </Button>
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
        <span className="text-sm xl:text-lg col-span-2 xl:ml-2">
          Product Name
        </span>
        <span className="text-sm xl:text-lg col-span-2 text-center">
          <span className="text-center">Price</span>{" "}
          <span className="text-center">with discount</span>
        </span>
        <span className="text-sm xl:text-lg col-span-2 text-center">
          <span className="text-center">Tax </span>
          <span className="text-center">( in %)</span>
        </span>
        <span className="text-sm xl:text-lg col-span-2 text-center">
          Price <span>with tax</span>
        </span>
      </div>
      {productIdList.map((productId) => {
        const product = cartItems[productId];
        return (
          <div key={productId} className="grid grid-cols-8 pl-1 xl:pl-4">
            <span className="text-xs xl:text-lg col-span-2">
              {product.productName}
            </span>
            <span className="text-sm xl:text-lg col-span-2 text-center">
              <span className="p-1 font-semibold">{currencySymbol}</span>
              {GeneralHelperInstance.getDiscountedPrice(
                product.productPrice,
                product.productDiscountType,
                product.productDiscount,
                product.quantity
              )}
            </span>
            <span className="text-sm xl:text-lg col-span-2 text-center">
              <span className="p-1">{product.taxInPercent}%</span>
            </span>
            <span className="text-sm xl:text-lg col-span-2 text-center">
              <span className="p-1 font-semibold">{currencySymbol}</span>
              {GeneralHelperInstance.getNetPriceWithTax(
                product.productPrice,
                product.productDiscountType,
                product.productDiscount,
                product.taxInPercent,
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
    totalPriceWithTax,
    totalItems,
  } = _getTotalPricesAndQuantity(cartItems);

  const deliveryCharges =
    totalItems == 0 ? 0 : Number(process.env.NEXT_PUBLIC_DELIVERY_CHARGES);
  const totalTaxAmount = totalPriceWithTax - totalPriceAfterDiscount;
  const netPayableAmount =
    totalPriceAfterDiscount + deliveryCharges + totalTaxAmount;

  return (
    <>
      <div className="grid grid-cols-5 items-center">
        <span className="text-lg xl:text-2xl  col-span-3">Total Items : </span>
        <span className="text-xl xl:text-3xl col-span-2 ml-auto lg:ml-0 pl-14 ml-auto lg:ml-0">
          ({totalItems})
        </span>
      </div>
      <div className="grid grid-cols-5 items-center mb-1">
        <span className="text-lg xl:text-2xl col-span-3 text-nowrap">
          Total Price :{" "}
        </span>
        <span className="text-xl xl:text-3xl col-span-2 ml-auto lg:ml-0">
          <span className="p-2 font-semibold">{currencySymbol}</span>
          {totalPriceBeforeDiscount.toFixed(2)}
        </span>
      </div>
      <div className="grid grid-cols-5 items-center">
        <span className="text-lg xl:text-2xl col-span-3 text-nowrap">
          Total Discount :{" "}
        </span>
        <span className="text-xl xl:text-3xl col-span-2 ml-auto lg:ml-0">
          <span className="p-2 font-semibold">{currencySymbol}</span>
          {totalDiscountValue.toFixed(2)}
        </span>
      </div>
      <div className="grid grid-cols-5 items-center mb-1">
        <span className="text-lg xl:text-2xl col-span-3 text-nowrap">
          Price After Discount :{" "}
        </span>
        <span className="text-xl xl:text-3xl col-span-2 ml-auto lg:ml-0">
          <span className="p-2 font-semibold">{currencySymbol}</span>
          {totalPriceAfterDiscount.toFixed(2)}
        </span>
      </div>
      <div className="grid grid-cols-5 items-center">
        <span className="text-lg xl:text-2xl col-span-3 text-nowrap">
          Tax amount :{" "}
        </span>
        <span className="text-xl xl:text-3xl col-span-2 ml-auto lg:ml-0">
          <span className="p-2 font-semibold">{currencySymbol}</span>
          {totalTaxAmount.toFixed(2)}
        </span>
      </div>
      <div className="grid grid-cols-5 items-center">
        <span className="text-lg xl:text-2xl col-span-3 text-nowrap">
          Delivery Charges :{" "}
        </span>
        <span className="text-xl xl:text-3xl col-span-2 ml-auto lg:ml-0">
          <span className="p-2 font-semibold">{currencySymbol}</span>
          {deliveryCharges.toFixed(2)}
        </span>
      </div>

      <Divider className="my-5 w-full xl:w-5/6" />

      <div className="grid grid-cols-5 items-center">
        <span className="text-lg xl:text-2xl col-span-3 text-nowrap text-green-700">
          Net payable amount :{" "}
        </span>
        <span className="text-xl xl:text-3xl col-span-2 ml-auto lg:ml-0">
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
  let totalPriceWithTax = 0;
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

    const priceWithTax = GeneralHelperInstance.getNetPriceWithTax(
      product.productPrice,
      product.productDiscountType,
      product.productDiscount,
      product.taxInPercent,
      product.quantity
    );
    totalPriceWithTax += Number(priceWithTax);

    totalItems += product.quantity;
  });

  return {
    totalPriceBeforeDiscount,
    totalPriceAfterDiscount,
    totalDiscountValue,
    totalPriceWithTax,
    totalItems,
  };
}
