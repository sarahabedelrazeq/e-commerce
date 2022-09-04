import { createSlice } from "@reduxjs/toolkit";
import { getAppInfo } from "./actions";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    value: {
      loading: false,
      error: "",
      data: [],
    },
    loading: {
      appInfo: false,
    },
    appInfos: [],
  },
  reducers: {},
  extraReducers: {
    [getAppInfo.fulfilled]: (state, action) => {
      state.appInfos = action.payload.data;
    },
  },
});

export const { logout } = generalSlice.actions;
export { getAppInfo };
export default generalSlice.reducer;
