import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "helpers";

export const loginAgent = createAsyncThunk(
  "auth/loginAgent",
  async ({ credentials }, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { identifier, password } = credentials;
    const dataToSubmit = {
      phone: identifier,
      password: password,
      device_id: "c0e5681c2dddf1897ca",
    };

    try {
      const response = await client().post("auth/sign-in", dataToSubmit, {
        headers: {
          Language: getState().app.language,
        },
      });
      const data = response.data;

      if (data.status === -1 || data.status === 0) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      const { response } = error;
      return rejectWithValue(response.data);
    }
  }
);

export const loginWithOtp = createAsyncThunk(
  "auth/loginWithOtp",
  async ({ credentials }, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { identifier, login_otp } = credentials;
    const dataToSubmit = {
      phone: identifier,
      login_otp: login_otp,
      device_id: "c0e5681c2dddf1897ca",
    };

    try {
      const response = await client().post(
        "auth/sign-in-with-otp",
        dataToSubmit,
        {
          headers: {
            Language: getState().app.language,
          },
        }
      );
      const data = response.data;

      if (!data.status === 1) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      const { response } = error;
      return rejectWithValue(response.data);
    }
  }
);

export const checkLogin = createAsyncThunk(
  "auth/checkLogin",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { access_token } = getState().auth;
    if (!access_token && access_token === "" && access_token.length < 15) {
      return rejectWithValue("");
    }
    try {
      const response = await client().get("user/get-user-info", {
        headers: {
          Language: getState().app.language,
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = response.data;
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (data, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const dataToSubmit = {
      ...data,
      place_id: data?.sub_place_id? data?.sub_place_id: data?.place_id? data?.place_id: 1,
      language_id: 1,
      device_id: "c0e5681c2dddf1897ca",
    };

    try {
      const response = await client().post("auth/register-user", dataToSubmit, {
        headers: {
          Language: getState().app.language,
        },
      });
      const data = response.data;

      if (data.status === -1 || data.status === 0) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      const { response } = error;
      return rejectWithValue(response.data);
    }
  }
);

export const getOtp = createAsyncThunk(
  "auth/getOtp",
  async ({ credentials }, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { identifier } = credentials;
    const dataToSubmit = {
      phone: identifier,
      device_id: "c0e5681c2dddf1897ca",
    };

    try {
      const response = await client().post(
        "auth/reset-password/get-otp",
        dataToSubmit,
        {
          headers: {
            Language: getState().app.language,
          },
        }
      );
      const data = response.data;

      if (!data.status === 1) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      const { response } = error;
      return rejectWithValue(response.data);
    }
  }
);

export const checkOtp = createAsyncThunk(
  "auth/checkOtp",
  async ({ credentials }, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { identifier, login_otp } = credentials;
    const dataToSubmit = {
      phone: identifier,
      otp: login_otp,
      device_id: "c0e5681c2dddf1897ca",
    };

    try {
      const response = await client().post(
        "auth/reset-password/check-otp",
        dataToSubmit,
        {
          headers: {
            Language: getState().app.language,
          },
        }
      );
      const data = response.data;

      if (!data.status === 1) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      const { response } = error;
      return rejectWithValue(response.data);
    }
  }
);
