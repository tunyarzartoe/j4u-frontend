import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storageService } from "../../services/storageService";

export const getAllJobPosts = createAsyncThunk(
  "jobPosts/getAlljobPosts",
  async () => {
    return storageService.getJobs();
  }
);

export const addNewJobPost = createAsyncThunk(
  "jobPosts/addNewJobPost",
  async (data) => {
    const companies = storageService.getCompanies();
    const locations = storageService.getLocations();
    const jobTypes = storageService.getJobTypes();
    const categories = storageService.getCategories();

    const company = companies.find((item) => item.id === data.companyId) || companies[0];
    const location = locations.find((item) => item.id === data.locationId) || locations[0];
    const jobType = jobTypes.find((item) => item.id === data.jobTypeId) || jobTypes[0];
    const category = categories.find((item) => item.id === data.categoryId) || categories[0];

    const postObj = {
      ...data.jobPost,
      company,
      location,
      jobTypes: jobType,
      category,
      publishedOn: data.jobPost.publishedOn || new Date().toISOString().split("T")[0],
    };

    return storageService.saveJob(postObj);
  }
);

export const updateJobPost = createAsyncThunk(
  "jobPosts/updateJobPost",
  async (data) => {
    return storageService.saveJob(data.jobPost);
  }
);

export const deleteJobPost = createAsyncThunk(
  "jobPosts/deleteJobPost",
  async (jobPost) => {
    return storageService.deleteJob(jobPost.id);
  }
);

const initialState = {
  jobPosts: storageService.getJobs(),
  savedJobIds: storageService.getSavedJobIds(),
  status: "idle",
  error: null,
};

const jobSlice = createSlice({
  name: "jobPosts",
  initialState,
  reducers: {
    toggleSaveJob: (state, action) => {
      const jobId = action.payload;
      const updated = storageService.toggleSavedJob(jobId);
      state.savedJobIds = updated;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllJobPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllJobPosts.fulfilled, (state, action) => {
        state.jobPosts = action.payload;
        state.status = "success";
      })
      .addCase(getAllJobPosts.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(addNewJobPost.fulfilled, (state, action) => {
        state.jobPosts.unshift(action.payload);
      })
      .addCase(updateJobPost.fulfilled, (state, action) => {
        if (!action.payload?.id) return;
        const filtered = state.jobPosts.filter((j) => j.id !== action.payload.id);
        state.jobPosts = [action.payload, ...filtered];
      })
      .addCase(deleteJobPost.fulfilled, (state, action) => {
        state.jobPosts = action.payload;
      });
  },
});

export const { toggleSaveJob } = jobSlice.actions;

export const getJobPostStatus = (state) => state.jobPosts.status;
export const getJobPostError = (state) => state.jobPosts.error;
export const selectJobPostById = (state, jobPostId) =>
  state.jobPosts.jobPosts.find((jobPost) => jobPost.id === jobPostId);
export const selectAllJobPosts = (state) => state.jobPosts.jobPosts;
export const selectSavedJobIds = (state) => state.jobPosts.savedJobIds;

export const selectJobByFilter = (state, data) =>
  state.jobPosts.jobPosts.filter((jobPost) => {
    if (!data) return true;
    const matchTitle =
      !data.title ||
      (jobPost.title &&
        jobPost.title.toLowerCase().includes(data.title.toLowerCase().trim()));
    const matchJobType =
      !data.jobTypes || (jobPost.jobTypes && jobPost.jobTypes.type === data.jobTypes);
    const matchLocation =
      !data.location || (jobPost.location && jobPost.location.name === data.location);
    return matchTitle && matchJobType && matchLocation;
  });

export const selectJobByCategory = (state, categoryId) =>
  state.jobPosts.jobPosts.filter((jobPost) => jobPost.category?.id === categoryId);

export const selectJobPostByCompanyId = (state, companyId) =>
  state.jobPosts.jobPosts.filter((jobPost) => jobPost.company?.id === companyId);

export default jobSlice.reducer;
