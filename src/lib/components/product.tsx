import {
  Button,
  Card,
  CardBody,
  CardHeader,
  cn,
  Image,
} from "@nextui-org/react";
import React from "react";
import { ProductType } from "../../../types";
import { DiscountType } from "@prisma/client";
import { ProductRatings } from "./ratings";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addProductToCart, removeProductFromCart } from "../redux/slices/cart";
import { BsCartPlusFill, BsFillCartDashFill } from "react-icons/bs";
import productFallBack from "../../../public/assests/product_fallback.png";
import GeneralHelperInstance from "../helpers/general.helper";

function ProductCard({ product }: { product: ProductType }) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.productIdAndQuantity);

  const discountType = product.productDiscountType;
  const discountValue = product.productDiscount;
  const currencySymbol = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;

  function handleCart(product: ProductType) {
    // Add product to cart
    if (cart[product.productId]) {
      dispatch(removeProductFromCart(product.productId));
      return;
    }
    dispatch(addProductToCart([product.productId, product]));
  }

  return (
    <div
      className={cn(
        "group z-0 flex gap-16 w-[22rem] lg:w-[26rem] transition-all duration-300  rounded-lg",
        {
          "opacity-70 ring": cart[product.productId],
          "hover:scale-[102%] z-10 hover:shadow-md ": !cart[product.productId],
        }
      )}
    >
      <Card className="py-4 shadow-slate-400/60 rounded-md shadow-md ">
        <div className="relative flex overflow-hidden w-full pb-2 z-0 justify-center">
          <Image
            alt="Card background"
            className=" object-center object-fill transition-all duration-300 w-[300px] md:w-[380px] h-[300px] md:h-[380px] group-hover:scale-[105%] rounded-xl max-w-full"
            src={product.productImage || productFallBack.src}
          />
          {discountValue > 0 && (
            <span className="absolute z-10 top-[1%] left-[6%] m-2 bg-black text-white rounded-full px-2 text-center text-sm md:text-base font-medium ">
              {discountValue}
              {discountType == "PERCENT" ? "%" : currencySymbol} OFF
            </span>
          )}
        </div>
        <CardHeader className="pb-0 pt-2 px-4 flex-col w-full items-start">
          <span className="text-sm  uppercase font-semibold text-slate-700/80">
            {product.familyName}
          </span>
          <span className="font-bold text-2xl mb-1">{product.productName}</span>
          <span className="line-clamp-2 text-base w-[90%] text-gray-700/80 ">
            {product.description}
          </span>

          <div className="pt-2 pb-4 w-full flex items-center justify-between">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {currencySymbol}
                {GeneralHelperInstance.getDiscountedPrice(
                  product.productPrice,
                  discountType,
                  discountValue
                )}
              </span>
              {discountValue > 0 && (
                <span className="text-lg text-slate-900 line-through">
                  {currencySymbol}
                  {product.productPrice}
                </span>
              )}
            </div>
            <span>
              <ProductRatings rating={product.rating} />
            </span>
          </div>
          <Button
            onClick={() => handleCart(product)}
            className="flex w-full items-center justify-center rounded-md bg-slate-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {!cart[product.productId] ? (
              <BsCartPlusFill className="mr-2 h-6 w-6 text-color-fourth" />
            ) : (
              <BsFillCartDashFill className="mr-2 h-6 w-6 text-color-fourth" />
            )}
            <span className="text-color-fourth">
              {cart[product.productId] ? "Remove from cart" : "Add to cart"}
            </span>
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
}

export default ProductCard;


