"use client";
import React from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import NotificationHelperInstance from "@/lib/helpers/notification.helper";

function Cart() {
  const cartItems = useAppSelector((state) => state.cart.productIdAndQuantity);
  const router = useRouter();

  const cartCount = Object.keys(cartItems).length;

  function handleCartClick() {
    console.log("cartItems --------", cartItems);

    if (cartCount === 0) {
      NotificationHelperInstance.Toast({
        type: "WARNING",
        message: "Your cart is empty. Please add some items to proceed.",
      });
      return;
    }
    
    router.push("/cart");
  }

  return (
    <div
      className="relative z-0 active:scale-95 cursor-pointer transition-all duration-100 "
      onClick={handleCartClick}
    >
      {cartCount > 0 && <Badge cartCount={cartCount} />}
      <FaCartPlus className="w-10 h-10 text-white" />
    </div>
  );
}

export default Cart;

function Badge({ cartCount }: { cartCount: number }) {
  return (
    <span className="z-10 w-6 h-6 flex items-center justify-center absolute rounded-full bg-danger-200 border-danger-800 font-semibold -top-2 -right-2">
      {cartCount}
    </span>
  );
}
