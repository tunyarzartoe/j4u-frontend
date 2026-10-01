import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storageService } from "../../services/storageService";

export const login = createAsyncThunk("auths/login", async (loginRequest) => {
  const authUsers = storageService.getAuthUsers();
  const foundUser = authUsers.find(
    (item) =>
      item.username?.toLowerCase() === loginRequest.username?.toLowerCase() &&
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

const getInitialAuth = () => {
  try {
    const token = localStorage.getItem("j4u_token");
    const user = JSON.parse(localStorage.getItem("j4u_current_user") || "{}");
    const roles = JSON.parse(localStorage.getItem("j4u_roles") || "[]");
    return {
      user,
      roles,
      token: token || "",
      success: Boolean(token),
    };
  } catch (e) {
    return {
      user: {},
      roles: [],
      success: false,
      token: "",
    };
  }
};

const initialState = getInitialAuth();

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.roles = [];
      state.success = false;
      state.token = "";
      localStorage.removeItem("j4u_token");
      localStorage.removeItem("j4u_current_user");
      localStorage.removeItem("j4u_roles");
      localStorage.removeItem("token");
    },
    setToken: (state) => {
      const token = localStorage.getItem("j4u_token") || localStorage.getItem("token");
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
        localStorage.setItem("j4u_token", action.payload.token);
        localStorage.setItem("j4u_current_user", JSON.stringify(action.payload.user));
        localStorage.setItem("j4u_roles", JSON.stringify(action.payload.roleList));
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
export default authSlice.reducer;