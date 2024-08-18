import CartWrapper from "@/lib/components/cart/cart-list";
import TitleBar from "@/lib/components/titlebar";
import React from "react";

function Cart() {
  return (
    <section className="w-full px-6 py-3">
      <div className="flex">
        <TitleBar title="Cart" />
      </div>

      <div className="mt-5">
        <CartWrapper />
      </div>
    </section>
  );
}

export default Cart;
