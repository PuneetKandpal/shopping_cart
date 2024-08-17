import { Image } from "@nextui-org/react";
import React from "react";
import emptyCart from "../../../public/assests/empty-cart.svg";

function CartEmpty() {
  return (
  
      <div className="w-full h-screen mx-auto px-10 py-4 bg-white rounded-lg shadow-lg">
        <div>
          <span className="bg-green-100 font-mono text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            Blank Slate Empty State
          </span>
        </div>
        <div className="flex flex-col justify-center py-12 items-center">
          <div className="flex justify-center items-center">
            <Image
              className="w-[20rem] h-[20rem]"
              src={emptyCart.src}
              alt="image empty states"
             
            />
          </div>
          <h1 className="text-gray-700 font-medium text-2xl text-center mb-3">
            Create a Project and get organized!
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Project are the backbones of time entry categorization in your
            workspace.
          </p>
          <div className="flex flex-col justify-center">
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
              Create New Project
            </button>
            <a href="#" className="underline mt-4 text-sm font-light mx-auto">
              Learn more
            </a>
          </div>
        </div>
      </div>
  );
}

export default CartEmpty;
