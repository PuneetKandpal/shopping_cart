"use client";

import React from "react";
import { useAppSelector } from "../redux/hooks";
import CartProduct from "./cart-product";
import CartDetails from "./cart-details";
import CartEmpty from "./cart-empty";

function CartWrapper() {

    const cartItems = useAppSelector((state) => state.cart.productIdAndQuantity);
    const productIdList = Object.keys(cartItems);

    if(productIdList.length === 0){
      return <CartEmpty />
    }
  
    return (
    <div className="relative grid grid-cols-1 xl:grid-cols-5 gap-2 md:gap-5 ">
      <div className="col-span-3 relative ">
        <CartList />
      </div>
      <div className="col-span-2 pt-10">
        <CartDetails />
      </div>
    </div>
  );
}

function CartList() {
  const cartItems = useAppSelector((state) => state.cart.productIdAndQuantity);
  const productIdList = Object.keys(cartItems);

  return (
    <div className="w-full flex flex-col gap-3 pt-6">
      {productIdList.map((productId) => {
        return <CartProduct product={cartItems[productId]} key={productId} />;
      })}
    </div>
  );
}

export default CartWrapper;
