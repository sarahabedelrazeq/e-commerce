import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "ar",
  cart: {},
  cartLength: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = { ...state.cart, [action.payload.id]: action.payload.num };
      state.cartLength = Object.values(state.cart).length;
    },
    cartLength: (state, action) => {
      return Object.values(state.cart).length;
    },
  },
});

export const { addToCart } = appSlice.actions;
export default appSlice.reducer;
