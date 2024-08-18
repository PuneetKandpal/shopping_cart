"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CartProduct from "./cart-product";
import CartDetails from "./cart-details";
import CartEmpty from "./cart-empty";
import LocalStorageHelperInstance from "../../helpers/local-storage.helper";
import { setCartItems } from "../../redux/slices/cart";
import { queryKey } from "../../constants/query.constants";
import { ProductWithQuantityType } from "../../../../types";

function CartWrapper() {
  const cartItems = useAppSelector((state) => state.cart.productIdAndQuantity);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCartItems = LocalStorageHelperInstance.getItem(
      queryKey.localStorage.cartItems
    );

    const parsedStoredCartItems = JSON.parse(storedCartItems || "{}");
    console.log("parsedStoredCartItems -------", parsedStoredCartItems);

    if (Object.keys(parsedStoredCartItems).length > 0) {
      dispatch(setCartItems(parsedStoredCartItems));
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    LocalStorageHelperInstance.setItem(
      queryKey.localStorage.cartItems,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  if (Object.keys(cartItems).length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="relative grid grid-cols-1 xl:grid-cols-5 gap-2 md:gap-5">
      <div className="col-span-2 xl:pt-10 order-1 xl:order-2">
        <CartDetails />
      </div>
      <div className="col-span-3 relative order-2 xl:order-1">
        <CartList cartItems={cartItems} />
      </div>
    </div>
  );
}

function CartList({
  cartItems,
}: {
  cartItems: Record<string, ProductWithQuantityType>;
}) {
  const productIdList = Object.keys(cartItems);

  return (
    <div className="w-full flex flex-col gap-3 pt-6">
      {productIdList.map((productId) => (
        <CartProduct product={cartItems[productId]} key={productId} />
      ))}
    </div>
  );
}

export default CartWrapper;
