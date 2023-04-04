import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/user.reducer";
import { checkoutReducer } from "./reducers/checkout.reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    checkout: checkoutReducer,
  },
});

export default store;
