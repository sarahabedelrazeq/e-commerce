import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LANGUAGE } from "constants";
import { getCategoryTypes, getPlaces, getTypesOfWallet } from "./actions";

const initialState = {
  language: DEFAULT_LANGUAGE,
  loading: {
    places: false,
    categoryTypes: false,
    walletTypes: false,
  },
  places: [],
  categoryTypes: [],
  walletTypes: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    switchLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: {
    [getPlaces.pending]: (state, action) => {
      state.loading.places = true;
    },
    [getTypesOfWallet.pending]: (state, action) => {
      state.loading.walletTypes = true;
    },
    [getCategoryTypes.pending]: (state, action) => {
      state.loading.categoryTypes = true;
    },
    [getPlaces.fulfilled]: (state, action) => {
      state.places = action.payload.data;
      state.loading.places = false;
    },
    [getTypesOfWallet.fulfilled]: (state, action) => {
      state.walletTypes = action.payload.data;
      state.loading.walletTypes = false;
    },
    [getCategoryTypes.fulfilled]: (state, action) => {
      state.categoryTypes = action.payload.data;
      state.loading.categoryTypes = false;
    },
  },
});

export { getPlaces, getTypesOfWallet, getCategoryTypes };
export const { switchLanguage } = appSlice.actions;
export default appSlice.reducer;
