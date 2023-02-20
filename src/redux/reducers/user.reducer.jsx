import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || "",
    data: JSON.parse(localStorage.getItem("data")) || {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setToken, setData } = userSlice.actions;

export const userReducer = userSlice.reducer;
