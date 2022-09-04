import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "helpers";

export const getFavorites = createAsyncThunk(
  "user/getFavorites",
  async (_, thunkAPI) => {
    try {
      const { access_token } = thunkAPI.getState().auth;
      const response = await client().get("agent/get-favorite-items", {
        headers: {
          Language: thunkAPI.getState().app.language,
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = response.data;

      if (data.status === 0) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const addFavorites = createAsyncThunk(
  "user/addFavorites",
  async (item, thunkAPI) => {
    try {
      const { access_token } = thunkAPI.getState().auth;
      const response = await client().post(
        "agent/add-favorite-item",
        { item_id: item.id },
        {
          headers: {
            Language: thunkAPI.getState().app.language,
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = response.data;

      if (data.status === 0) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return item;
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const deleteFavorites = createAsyncThunk(
  "user/deleteFavorites",
  async (item, thunkAPI) => {
    try {
      const { access_token } = thunkAPI.getState().auth;
      const response = await client().post(
        "agent/delete-item-from-favorite",
        { item_id: item.id },
        {
          headers: {
            Language: thunkAPI.getState().app.language,
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = response.data;

      if (data.status === 0) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return item;
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

// Get User Notifications info
export const getNotifications = createAsyncThunk(
  "user/getNotification",
  async (page, thunkAPI) => {
    try {
      const { access_token } = thunkAPI.getState().auth;
      const response = await client().get(`user/get-notification${page?`?page=${page}`: ""}`, {
        headers: {
          Language: thunkAPI.getState().app.language,
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = response.data;

      if (data.getState === 0) {
        return thunkAPI.rejectWithValue(data.message);
      }
      thunkAPI.dispatch(getNumberOfNotifications());
      return data;
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

// Get User Number Of Notifications info name by logged-in user
export const getNumberOfNotifications = createAsyncThunk(
  "user/getNumberOfNotifications",
  async (_, thunkAPI) => {
    try {
      const { access_token } = thunkAPI.getState().auth;
      const response = await client().get("user/get-number-of-notifications", {
        headers: {
          Language: thunkAPI.getState().app.language,
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = response.data;

      if (data.getState === 0) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

// Convert loyalty points
export const convertLoyaltyPoints = createAsyncThunk(
  "user/convertLoyaltyPoints",
  async ({ pointsToConvert }, thunkAPI) => {
    try {
      const { access_token } = thunkAPI.getState().auth;
      const response = await client().post(
        "user/add-balance-transfer",
        {
          loyalty_points: pointsToConvert,
        },
        {
          headers: {
            Language: thunkAPI.getState().app.language,
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = response.data;

      if (data.getState === 0) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "user/getCartItems",
  async (_, thunkAPI) => {
    try {
      const { access_token } = thunkAPI.getState().auth;
      const response = await client().get("user/get-cart-items", {
        headers: {
          Language: thunkAPI.getState().app.language,
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = response.data;

      if (data.status === 0) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "user/addCartItem",
  async (item, thunkAPI) => {
    try {
      const { access_token } = thunkAPI.getState().auth;
      const response = await client().post(
        "user/add-cart-item",
        item,
        {
          headers: {
            Language: thunkAPI.getState().app.language,
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = response.data;

      if (data.status === 0) {
        return thunkAPI.rejectWithValue(data.message);
      }
      thunkAPI.dispatch(getCartItems())
      return {...item, id: item.item_id};
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "user/deleteCartItem",
  async (item, thunkAPI) => {
    try {
      const { access_token } = thunkAPI.getState().auth;
      const response = await client().post(
        "user/delete-item-from-cart",
        { cart_id: item.id },
        {
          headers: {
            Language: thunkAPI.getState().app.language,
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = response.data;

      if (data.status === 0) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return item;
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);