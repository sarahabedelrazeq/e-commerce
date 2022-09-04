import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "helpers";

// Get App info name by logged-in user
export const getAppInfo = createAsyncThunk(
  "general/getAppInfo",
  async (_, thunkAPI) => {
    try {
      const response = await client().get(
        "general/get-all-app-info?place_id=1",
        {
          headers: {
            Language: thunkAPI.getState().app.language,
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
