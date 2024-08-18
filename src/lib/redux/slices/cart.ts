import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductType, ProductWithQuantityType } from "../../../../types";




type cartState = {
  productIdAndQuantity: Record<string, ProductWithQuantityType>;
};

const initialState: cartState = {
  productIdAndQuantity: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state: cartState, action: PayloadAction<[string,ProductType]>) => {
      const productId = action.payload[0];
      const productDetails = action.payload[1];
      state.productIdAndQuantity[productId] = {
        ...productDetails,
        quantity: 1
      }
    },
    removeProductFromCart: (
      state: cartState,
      action: PayloadAction<string>
    ) => {
      const productId = action.payload;

      const { [productId]: _, ...tempProductIdAndQuantity } =
        state.productIdAndQuantity;
      state.productIdAndQuantity = tempProductIdAndQuantity;
    },
    incrementProductQuantity: (
      state: cartState,
      action: PayloadAction<[string, number]>
    ) => {
      const productId = action.payload[0];
      const quantity = action.payload[1];
      if (!state.productIdAndQuantity[productId] || quantity <= 0) {
        return;
      }
      state.productIdAndQuantity[productId].quantity += quantity;
    },
    decrementProductQuantity: (
      state: cartState,
      action: PayloadAction<[string, number]>
    ) => {
      const productId = action.payload[0];
      const quantity = action.payload[1];
      if (!state.productIdAndQuantity[productId] || quantity <= 0) {
        return;
      }
      state.productIdAndQuantity[productId].quantity -= quantity;
    },
    setCartItems: (state: cartState, action: PayloadAction<Record<string, ProductWithQuantityType>>) => {
      state.productIdAndQuantity = action.payload;
    },
    emptyCart: (state: cartState) => {
      state.productIdAndQuantity = {};
    }
  },
});

export const {
  addProductToCart,
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart,
  setCartItems,
  emptyCart
} = cartSlice.actions;

export default cartSlice.reducer;
