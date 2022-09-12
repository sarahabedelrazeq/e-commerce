import { createAsyncThunk } from "@reduxjs/toolkit";

export const getWorkflow = createAsyncThunk(
  "app/getWorkflow",
  async (name, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    let url = `https://www.ragic.com/signals/workflow2/8?limit=0,10&where=1002256,eq,${name}&where=1002252,eq,قيد العمل`;
    url = encodeURIComponent(url);
    try {
      const response = await fetch(`/api/make-request?url=${url}`).then((response) =>
        response.json()
      );
      const data = response.data;
      return { data, name };
    } catch (error) {
      const { response } = error;
      return { data: {}, name };
    }
  }
);
