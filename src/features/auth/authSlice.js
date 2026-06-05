import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authUsers } from "../../dummyData";

export const login = createAsyncThunk("auths/login", async (loginRequest) => {
  const foundUser = authUsers.find(
    (item) =>
      item.username === loginRequest.username &&
      item.password === loginRequest.password
  );

  if (foundUser) {
    return {
      user: foundUser.user,
      roleList: foundUser.roleList,
      success: true,
      token: foundUser.token,
    };
  }

  return { success: false };
});

const initialState = {
  user: {},
  roles: [],
  success: false,
  token: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.roles = [];
      state.success = false;
      state.token = "";
      localStorage.clear();
    },
    setToken: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
      } else {
        state.token = "";
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload?.token) {
        state.user = action.payload.user;
        state.roles = action.payload.roleList;
        state.success = action.payload.success;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      } else {
        state.success = false;
      }
    });
  },
});

export const getUser = (state) => state.auths.user;
export const getRoles = (state) => state.auths.roles;
export const getSuccess = (state) => state.auths.success;
export const getToken = (state) => state.auths.token;

export const isAuth = (state) => String(state.auths.token).length !== 0;

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer