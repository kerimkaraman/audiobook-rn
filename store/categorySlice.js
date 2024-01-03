import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    categories: [],
    categoryCount: 0,
  },
  reducers: {
    updateCategories: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (item) => item !== action.payload
      );
    },
    increaseCategoryCount: (state) => {
      if (state.categoryCount <= 3) {
        state.categoryCount = state.categoryCount + 1;
      }
    },
    decreaseCategoryCount: (state) => {
      if (state.categoryCount >= 0)
        state.categoryCount = state.categoryCount - 1;
    },
  },
});

export default categorySlice.reducer;
export const {
  updateCategories,
  increaseCategoryCount,
  decreaseCategoryCount,
  removeCategory,
} = categorySlice.actions;
