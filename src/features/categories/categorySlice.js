import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categories } from "../../dummyData";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    return [...categories];
  }
);

export const addNewCategory = createAsyncThunk(
  "categories/addCategory",
  async (category) => {
    const nextId = Math.max(0, ...categories.map((item) => item.id)) + 1;
    const newCategory = { ...category, id: nextId };
    categories.push(newCategory);
    return newCategory;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category) => {
    const index = categories.findIndex((item) => item.id === category.id);
    const updatedCategory = { ...categories[index], ...category };
    if (index === -1) {
      categories.push(updatedCategory);
    } else {
      categories[index] = updatedCategory;
    }
    return updatedCategory;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (category) => {
    const index = categories.findIndex((item) => item.id === category.id);
    if (index !== -1) {
      categories.splice(index, 1);
    }
    return category;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "success";
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          return;
        }
        const filtered = state.categories.filter(
          (category) => category.id !== action.payload.id
        );
        state.categories = [action.payload, ...filtered];
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.id
        );
      });
  },
});

export const getCategoryStatus = (state) => state.categories.status;
export const getCategoryError = (state) => state.categories.error;
export const selectCategoryById = (state, categoryId) =>
  state.categories.categories.find((category) => category.id === categoryId);
export const selectAllCategories = (state) => state.categories.categories;
export default categorySlice.reducer