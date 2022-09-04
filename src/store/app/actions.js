import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "helpers";

export const getPlaces = createAsyncThunk(
  "app/getPlaces",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    try {
      const response = await client().get("general/get-places", {
        headers: {
          Language: getState().app.language,
        },
      });
      const data = response.data;
      if (data.status === 0) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      const { response } = error;
      return rejectWithValue(response.data.message);
    }
  }
);

export const getTypesOfWallet = createAsyncThunk(
  "app/getTypesOfWallet",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { access_token } = getState().auth;
    if (!access_token && access_token === "" && access_token.length < 15) {
      return rejectWithValue("");
    }
    try {
      const response = await client().get("user/get-type-of-wallet", {
        headers: {
          Language: getState().app.language,
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = response.data;
      if (data.status === 0) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      const { response } = error;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const getCategoryTypes = createAsyncThunk(
  "app/getCategoryTypes",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    try {
      const response = await client().get("agent/get-category-type", {
        headers: {
          Language: getState().app.language,
        },
      });
      const data = response.data;
      if (data.status === 0) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      const { response } = error;
      return rejectWithValue(response.data.message);
    }
  }
);
