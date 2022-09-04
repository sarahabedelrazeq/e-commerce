import { createSlice } from "@reduxjs/toolkit";
import {
  getFavorites,
  addFavorites,
  deleteFavorites,
  getNumberOfNotifications,
  convertLoyaltyPoints,
  getNotifications,
  getCartItems,
  addCartItem,
  deleteCartItem,
} from "./actions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    favorites: {
      data: [],
      fullData: [],
      loading: false,
      error: "",
    },
    cart: {
      data: [],
      fullData: [],
      loading: false,
      error: "",
    },
    notifications: {
      data: [],
      loading: false,
      error: "",
      per_page: null,
      total: null,
    },
    numberOfNotifications: {
      data: [],
      loading: false,
      error: "",
      number: 0,
    },
  },
  reducers: {
    
    addNotification: (state, action) => {
      state.numberOfNotifications.number =
        state.numberOfNotifications.number + 1;
    },
  },
  extraReducers: {
    [getFavorites.pending]: (state) => {
      state.favorites.loading = true;
      state.favorites.error = "";
    },
    [getFavorites.fulfilled]: (state, action) => {
      state.favorites.loading = false;
      state.favorites.data = [];
      state.favorites.fullData = action.payload.data;
      
      action.payload.data.forEach((element) => {
        state.favorites.data = [...state.favorites.data, element.id];
      });
    },
    [getFavorites.rejected]: (state, action) => {
      state.favorites.loading = false;
      state.favorites.error = action.payload;
    },
    [addFavorites.fulfilled]: (state, action) => {
      state.favorites.loading = false;
      state.favorites.data.push(action.payload.id);
      state.favorites.fullData.push(action.payload);
    },
    [deleteFavorites.fulfilled]: (state, action) => {
      state.favorites.loading = false;
      state.favorites.data = state.favorites.data.filter(
        (value) => {
          return value !== action.payload.id;
        }
      );
      state.favorites.fullData = state.favorites.fullData.filter(
        (value) => {
          return value.id !== action.payload.id;
        }
      );
    },
    [deleteFavorites.rejected]: (state, action) => {
      state.favorites.loading = false;
      state.favorites.error = action;
    },



    [getCartItems.pending]: (state) => {
      state.cart.loading = true;
      state.cart.error = "";
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.cart.loading = false;
      state.cart.data = [];
      state.cart.fullData = action.payload.data;
      
      action.payload.data.forEach((element) => {
        state.cart.data = [...state.cart.data, element.id];
      });
    },
    [getCartItems.rejected]: (state, action) => {
      state.cart.loading = false;
      state.cart.error = action.payload;
    },
    [addCartItem.fulfilled]: (state, action) => {
      state.cart.loading = false;
    },
    [deleteCartItem.fulfilled]: (state, action) => {
      state.cart.loading = false;
      state.cart.data = state.cart.data.filter(
        (value) => {
          return value !== action.payload.id;
        }
      );
      state.cart.fullData = state.cart.fullData.filter(
        (value) => {
          return value.id !== action.payload.id;
        }
      );
    },
    [deleteCartItem.rejected]: (state, action) => {
      state.cart.loading = false;
      state.cart.error = action;
    },



    // Get User notifications
    [getNotifications.pending]: (state) => {
      state.notifications.loading = true;
      state.notifications.error = "";
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.notifications.loading = false;
      state.notifications.data = action.payload.data;
      state.notifications.per_page = action.payload.meta.per_page;
      state.notifications.total = action.payload.meta.total;
    },
    [getNotifications.rejected]: (state, action) => {
      state.notifications.loading = false;
      state.notifications.error = action.payload;
    },
    
    // Get User Number of notifications
    [getNumberOfNotifications.pending]: (state) => {
      state.numberOfNotifications.loading = true;
      state.numberOfNotifications.error = "";
    },
    [getNumberOfNotifications.fulfilled]: (state, action) => {
      state.numberOfNotifications.loading = false;
      state.numberOfNotifications.data = action.payload.data;
      state.numberOfNotifications.number =
        action.payload.data.notification_count;
    },
    [getNumberOfNotifications.rejected]: (state, action) => {
      state.numberOfNotifications.loading = false;
      state.numberOfNotifications.error = action.payload;
    },

    [convertLoyaltyPoints.fulfilled]: (state, action) => {
      state.loyaltyPoints.loading = false;
      state.loyaltyPoints.error = action.payload;
    },
  },
});

export const { addToCart, addToFavorite, addNotification } = userSlice.actions;
export { getFavorites, addFavorites, deleteFavorites, convertLoyaltyPoints, getCartItems, deleteCartItem,addCartItem };
export default userSlice.reducer;
