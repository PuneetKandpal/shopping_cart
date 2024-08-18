import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type cartState = {
  search: string;
  category: string;
  sort: string;
  minPrice: number;
  maxPrice: number;
  ratings: string;
};

const initialState: cartState = {
  search: "",
  category: "",
  sort: "",
  minPrice: 5,
  maxPrice: 50,
  ratings: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state: cartState, action: PayloadAction<string>) => {
      state.category = action.payload;
    },

    setSortCriteria(state: cartState, action: PayloadAction<string>) {
      state.sort = action.payload;
    },

    setMinPrice(state: cartState, action: PayloadAction<number>) {
      state.minPrice = action.payload;
    },

    setMaxPrice(state: cartState, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
    },

    setSearchCriteria(state: cartState, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    setRatings(state: cartState, action: PayloadAction<string>) {
      state.ratings = action.payload;
    },
  },
});

export const { setCategory,setRatings, setSortCriteria, setMinPrice, setMaxPrice, setSearchCriteria } =
  productSlice.actions;

export default productSlice.reducer;
