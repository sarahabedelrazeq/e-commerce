import { createSlice } from "@reduxjs/toolkit";
import { checkLogin, checkOtp, getOtp, loginAgent, loginWithOtp, userRegister } from "./actions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: "",
    user: null,
    loading: false,
    errors: {
      login: null,
      register: null,
      forgetPassword: null,
    },
    forgetPasswordMessage: null, 
    isLoggedIn: false,
    auth_checked: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.access_token = "";
    },
    setUserBalance: (state, action) => {
      state.user.balance = state.user?.agent?.balance - action.payload;
    },
  },
  extraReducers: {
    [loginAgent.pending]: (state) => {
      state.loading = true;
    },
    [loginAgent.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
      state.access_token = action.payload.data.access_token;
      state.errors.login = null;
      state.loading = false;
    },
    [loginAgent.rejected]: (state, action) => {
      state.access_token = "";
      state.loading = false;
      state.errors.login = action.payload;
    },
    [userRegister.pending]: (state) => {
      state.loading = true;
    },
    [userRegister.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
      state.access_token = action.payload.data.access_token;
      state.errors.register = null;
      state.loading = false;
    },
    [userRegister.rejected]: (state, action) => {
      state.access_token = "";
      state.loading = false;
      state.errors.register = action.payload;
    },
    [loginWithOtp.pending]: (state) => {
      state.loading = true;
    },
    [loginWithOtp.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
      state.access_token = action.payload.data.access_token;
      state.errors.login = null;
      state.errors.register = null;
      state.loading = false;
    },
    [loginWithOtp.rejected]: (state, action) => {
      state.access_token = "";
      state.loading = false;
      state.errors.login = action.payload;
      state.errors.register = action.payload;
    },

    
    [checkOtp.pending]: (state) => {
      state.loading = true;
      state.forgetPasswordMessage = null;

    },
    [checkOtp.fulfilled]: (state, action) => {
      state.errors.forgetPassword = null;
      state.loading = false;
    },
    [checkOtp.rejected]: (state, action) => {
      state.loading = false;
      state.errors.forgetPassword = action.payload;
    },

    
    [getOtp.pending]: (state) => {
      state.loading = true;
    },
    [getOtp.fulfilled]: (state, action) => {
      state.errors.forgetPassword = null;
      state.forgetPasswordMessage = action.payload?.message;
      state.loading = false;
    },
    [getOtp.rejected]: (state, action) => {
      state.loading = false;
      state.errors.forgetPassword = action.payload;
    },


    [checkLogin.pending]: (state) => {
      state.loading = true;
    },
    [checkLogin.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.auth_checked = true;
      state.loading = false;
    },
    [checkLogin.rejected]: (state) => {
      state.auth_checked = true;
      state.loading = false;
    },
  },
});

export { loginAgent, checkLogin, loginWithOtp, userRegister, getOtp, checkOtp };
export const { logout, setUserBalance } = authSlice.actions;
export default authSlice.reducer;
