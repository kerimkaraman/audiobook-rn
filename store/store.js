import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    user: userSlice,
  },
});
