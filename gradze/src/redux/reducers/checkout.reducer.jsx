import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    data: JSON.parse(sessionStorage.getItem("checkout")) || {},
  },
  reducers: {
    setCheckout: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCheckout } = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;
