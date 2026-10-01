import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storageService } from "../../services/storageService";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  return storageService.getUsers();
});

export const register = createAsyncThunk("users/register", async (user) => {
  const result = storageService.registerUser(user);
  return result.user;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (user) => {
  const users = storageService.getUsers().filter((u) => u.id !== user.id);
  return users;
});

const initialState = {
  users: storageService.getUsers(),
  currentUser: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload?.username) {
          state.users.push(action.payload);
          state.currentUser = action.payload;
          state.status = "created";
        }
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "success";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "success";
      });
  },
});

export const getUser = (state) => state.users.currentUser;
export const getStatus = (state) => state.users.status;
export const selectAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);

export default userSlice.reducer;
