import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart";
import productSlice  from "./slices/product";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
