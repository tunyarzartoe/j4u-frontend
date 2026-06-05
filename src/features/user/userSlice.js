import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { users, authUsers } from "../../dummyData";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  return [...users];
});

export const register = createAsyncThunk("users/register", async (user) => {
  const nextId = Math.max(0, ...users.map((item) => item.id)) + 1;
  const newUser = {
    id: nextId,
    username: user.username,
    fullname: user.fullname || `${user.firstname} ${user.lastname}`,
    phone: user.phone,
    address: user.address || "",
    role: "ROLE_USER",
    password: user.password,
  };
  users.push(newUser);
  authUsers.push({
    username: user.username,
    password: user.password,
    user: newUser,
    roleList: ["ROLE_USER"],
    token: `user-token-${nextId}`,
  });
  return newUser;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (user) => {
  const index = users.findIndex((item) => item.id === user.id);
  if (index !== -1) {
    users.splice(index, 1);
  }
  return [...users];
});

const initialState = {
  users: {},
  status: "idle",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload?.username) {
          state.users = action.payload;
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

export const getUser = (state) => state.users.users;
export const getStatus = (state) => state.users.status;

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);

export const selectAllUsers = (state) => state.users.users;

export default userSlice.reducer


