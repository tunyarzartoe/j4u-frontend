import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jobTypes } from "../../dummyData";

const initialState = {
  jobTypes: [],
  status: "idle",
  error: null,
};

export const getAlljobTypes = createAsyncThunk(
  "jobTypes/getAlljobTypes",
  async () => {
    return [...jobTypes];
  }
);

export const addNewJobType = createAsyncThunk(
  "jobTypes/addNewJobType",
  async (jobType) => {
    const nextId = Math.max(0, ...jobTypes.map((item) => item.id)) + 1;
    const newJobType = { ...jobType, id: nextId };
    jobTypes.push(newJobType);
    return newJobType;
  }
);

export const updateJobtype = createAsyncThunk(
  "jobTypes/updateJobtype",
  async (jobType) => {
    const index = jobTypes.findIndex((item) => item.id === jobType.id);
    const updatedJobType = { ...jobTypes[index], ...jobType };
    if (index === -1) {
      jobTypes.push(updatedJobType);
    } else {
      jobTypes[index] = updatedJobType;
    }
    return updatedJobType;
  }
);

export const deleteJobType = createAsyncThunk(
  "jobTypes/deleteJobTYpe",
  async (jobType) => {
    const index = jobTypes.findIndex((item) => item.id === jobType.id);
    if (index !== -1) {
      jobTypes.splice(index, 1);
    }
    return jobType;
  }
);

const jobTypeslice = createSlice({
  name: "jobTypes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAlljobTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAlljobTypes.fulfilled, (state, action) => {
        state.jobTypes = action.payload;
        state.status = "success";
      })
      .addCase(getAlljobTypes.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(addNewJobType.fulfilled, (state, action) => {
        state.jobTypes.push(action.payload);
      })
      .addCase(updateJobtype.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          return;
        }
        const filtered = state.jobTypes.filter(
          (jobType) => jobType.id !== action.payload.id
        );
        state.jobTypes = [action.payload, ...filtered];
      })
      .addCase(deleteJobType.fulfilled, (state, action) => {
        state.jobTypes = state.jobTypes.filter(
          (jobType) => jobType.id !== action.payload.id
        );
      });
  },
});

export const getjobTypestatus = (state) => state.jobTypes.status;
export const getJobTypeError = (state) => state.jobTypes.error;
export const selectJobTypeById = (state, jobTypeId) =>
  state.jobTypes.jobTypes.find((jobType) => jobType.id === jobTypeId);
export const selectAllJobTypes = (state) => state.jobTypes.jobTypes;
export default jobTypeslice.reducer