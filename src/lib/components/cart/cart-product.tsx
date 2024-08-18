import { Card, CardBody, Image } from "@nextui-org/react";
import React, { useState } from "react";
import { ProductWithQuantityType } from "../../../../types";
import productFallBack from "../../../../public/assests/product_fallback.png";
import GeneralHelperInstance from "@/lib/helpers/general.helper";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";

import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart,
} from "@/lib/redux/slices/cart";
import AlertBox from "../alert-box";
import { useAppDispatch } from "@/lib/redux/hooks";
import { ProductRatings } from "../ratings";


function CartProduct({ product }: { product: ProductWithQuantityType }) {
  const [openRemoveAlert, setOpenRemoveAlert] = useState(false);
  const dispatch = useAppDispatch();

  const discountType = product.productDiscountType;
  const discountValue = product.productDiscount;
  const currencySymbol = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;

  function handleIncreaseQuantity(productId: string) {
    dispatch(incrementProductQuantity([productId, 1]));
  }

  function handleDecreaseQuantity(productId: string) {
    dispatch(decrementProductQuantity([productId, 1]));
  }

  function handleRemoveItem() {
    setOpenRemoveAlert(!openRemoveAlert);
  }

  return (
    <div>
      <AlertBox
        modalTitle="Alert !!"
        actionName="Ok"
        content={
          <>
            <span className="text-lg">
              Are you sure you want to remove{" "}
              <span className="font-semibold">{product.productName}</span> from
              cart ?
            </span>
          </>
        }
        onAction={() => {
          dispatch(removeProductFromCart(product.productId));
        }}
        isOpen={openRemoveAlert}
        onOpenChange={handleRemoveItem}
      />
      <Card
        className="border-none bg-background/60 dark:bg-default-100/50 w-full"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-10 items-center justify-center">
            <div className="relative col-span-6 md:col-span-5">
              <Image
                alt="Product Image"
                className="object-fill object-center"
                height={300}
                width="100%"
                shadow="md"
                src={product.productImage || productFallBack.src}
              />
            </div>

            <div className="flex p-5 flex-col items-start col-span-6 md:col-span-7 h-full">
              <div className="flex justify-between items-center w-full">
                <span className=" text-base md:text-lg  uppercase font-semibold text-slate-700/80">
                  {product.familyName}
                </span>

                {discountValue > 0 && (
                  <span className="z-10 top-[1%] w-20 md:w-24 left-[6%] m-2 bg-black text-white rounded-full px-2 text-center text-sm md:text-base font-medium ">
                    {discountValue}
                    {discountType == "PERCENT" ? "%" : currencySymbol} OFF
                  </span>
                )}
              </div>
              <span className="font-bold text-3xl md:text-4xl mb-1">
                {product.productName}
              </span>
              <span className="text-base md:text-xl w-[90%] text-gray-700/80 ">
                {product.description}
              </span>

              <div className="py-6 w-full flex items-center justify-between">
                <div className="flex items-end gap-2">
                  <span className=" text-4xl md:text-5xl font-bold text-slate-900">
                    {currencySymbol}
                    {GeneralHelperInstance.getDiscountedPrice(
                      product.productPrice,
                      discountType,
                      discountValue
                    )}
                  </span>
                  {discountValue > 0 && (
                    <span className="text-lg md:text-xl text-slate-900 line-through">
                      {currencySymbol}
                      {product.productPrice}
                    </span>
                  )}
                </div>
                <span>
                  <ProductRatings
                    rating={product.rating}
                    classForStars="h-6 w-6 md:h-8 md:w-8"
                    classForRating="md:text-lg md:w-14"
                  />
                </span>
              </div>
              <div className="flex space-x-2 text-color-fourth text-size-third justify-between items-center mt-auto ml-auto">
                <div className="flex space-x-2 items-center">
                  <span className="cursor-pointer active:scale-95">
                    {product.quantity > 1 ? (
                      <FaMinus
                        onClick={() =>
                          handleDecreaseQuantity(product.productId)
                        }
                        className="md:h-10 md:w-10 h-8 w-8 border-blue-800 text-blue-500 shadow-sm shadow-color-third rounded-full p-1 border-2"
                      />
                    ) : (
                      <MdOutlineDeleteForever
                        onClick={() => handleRemoveItem()}
                        className="md:h-10 md:w-10 h-8 w-8 border-red-600 text-red-600 shadow-sm shadow-red-400 rounded-full p-1 border-2"
                      />
                    )}
                  </span>

                  <input
                    type="text"
                    className="md:w-16 md:h-12 w-10 h-8 text-center text-lg xl:text-xl font-semibold border rounded-sm"
                    value={product.quantity}
                    readOnly
                  />
                  <button
                    onClick={() => handleIncreaseQuantity(product.productId)}
                    className="cursor-pointer  border-blue-800 text-blue-500  h-min w-min rounded-full border-2 shadow-sm shadow-blue-400 p-1 active:scale-95"
                  >
                    <FaPlus className="h-5 w-5 md:h-7 md:w-7" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CartProduct;
