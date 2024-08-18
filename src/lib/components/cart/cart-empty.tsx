import { Image } from "@nextui-org/react";
import React from "react";
import emptyCart from "../../../../public/assests/empty_cart.png";
import { useRouter } from "next/navigation";

function CartEmpty() {

    const router = useRouter();

  return (
    <div className="w-full h-full mx-auto px-10 py-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col justify-center py-12 items-center">
        <div className="flex justify-center items-center mb-5 lg:mb-10">
          <Image
            className="w-[15rem] h-[15rem] lg:w-[25rem] lg:h-[25rem]"
            src={emptyCart.src}
            alt="image empty states"
          />
        </div>
        <h1 className="text-gray-700 font-medium text-2xl lg:text-4xl text-center mb-3">
          It seems your cart is empty
        </h1>
        <p className="text-gray-500 text-center text-lg lg:text-xl mb-6">
          Either login to review your cart or go back to home to add products
        </p>
        <div className="flex flex-col justify-center">
          <button 
          onClick={() => router.push("/")}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6  mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Go to home
          </button>
          <a href="#" className="underline mt-4 text-lg  font-light mx-auto">
            login
          </a>
        </div>
      </div>
    </div>
  );
}

export default CartEmpty;
