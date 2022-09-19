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
      if (action.payload.num > 0) {
        state.cart = { ...state.cart, [action.payload.id]: action.payload.num };
        state.cartLength = Object.values(state.cart).length;
      } else {
        let newCart = { ...state.cart };
        delete newCart[action.payload.id];
        state.cart = { ...newCart };
        state.cartLength = Object.values(newCart).length;
      }
    },
    cartLength: (state, action) => {
      return Object.values(state.cart).length;
    },
  },
});

export const { addToCart } = appSlice.actions;
export default appSlice.reducer;
