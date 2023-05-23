import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("accessToken") || "",
    tokenVersion: localStorage.getItem("accessTokenVersion") || 1,
    data: JSON.parse(localStorage.getItem("data")) || {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setTokenVersion: (state, action) => {
      state.tokenVersion = action.payload
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setToken, setTokenVersion, setData } = userSlice.actions;

export const userReducer = userSlice.reducer;
