import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storageService } from "../../services/storageService";

export const getAllApplications = createAsyncThunk(
  "applications/getAllApplications",
  async () => {
    return storageService.getApplications();
  }
);

export const submitApplication = createAsyncThunk(
  "applications/submitApplication",
  async (applicationData) => {
    const saved = storageService.submitApplication(applicationData);
    return saved;
  }
);

export const withdrawApplication = createAsyncThunk(
  "applications/withdrawApplication",
  async (applicationId) => {
    const remaining = storageService.withdrawApplication(applicationId);
    return remaining;
  }
);

const initialState = {
  applications: storageService.getApplications(),
  status: "idle",
  error: null,
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllApplications.fulfilled, (state, action) => {
        state.status = "success";
        state.applications = action.payload;
      })
      .addCase(getAllApplications.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.applications.unshift(action.payload);
        state.status = "success";
      })
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        state.applications = action.payload;
      });
  },
});

export const selectAllApplications = (state) => state.applications.applications;
export const selectApplicationsByUserEmail = (state, email) =>
  state.applications.applications.filter((app) => app.userEmail === email);
export const getApplicationStatus = (state) => state.applications.status;

export default applicationSlice.reducer;
