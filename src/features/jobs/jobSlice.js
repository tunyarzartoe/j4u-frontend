import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jobPosts, companies, locations, categories, jobTypes } from "../../dummyData";

const initialState = {
  jobPosts: [],
  status: "idle",
  error: null,
};

const normalizeJobPost = (data) => {
  const company = companies.find((item) => item.id === data.companyId) || companies[0];
  const location = locations.find((item) => item.id === data.locationId) || locations[0];
  const jobType = jobTypes.find((item) => item.id === data.jobTypeId) || jobTypes[0];
  const category = categories.find((item) => item.id === data.categoryId) || categories[0];

  return {
    ...data.jobPost,
    id: data.jobPost.id || Math.max(0, ...jobPosts.map((item) => item.id)) + 1,
    company,
    location,
    jobTypes: jobType,
    category,
    publishedOn: data.jobPost.publishedOn || new Date().toISOString().split("T")[0],
  };
};

export const getAllJobPosts = createAsyncThunk(
  "jobPosts/getAlljobPosts",
  async () => {
    return [...jobPosts];
  }
);

export const addNewJobPost = createAsyncThunk(
  "jobPosts/addNewJobPost",
  async (data) => {
    const newJobPost = normalizeJobPost(data);
    jobPosts.push(newJobPost);
    return newJobPost;
  }
);

export const updateJobPost = createAsyncThunk(
  "jobPosts/updateJobPost",
  async (data) => {
    const existingIndex = jobPosts.findIndex((item) => item.id === data.jobPost.id);
    const updatedJobPost = normalizeJobPost(data);

    if (existingIndex === -1) {
      jobPosts.push(updatedJobPost);
    } else {
      jobPosts[existingIndex] = updatedJobPost;
    }

    return updatedJobPost;
  }
);

export const deleteJobPost = createAsyncThunk(
  "jobPosts/deleteJobPost",
  async (jobPost) => {
    const index = jobPosts.findIndex((item) => item.id === jobPost.id);
    if (index !== -1) {
      jobPosts.splice(index, 1);
    }
    return [...jobPosts];
  }
);

const jobSlice = createSlice({
  name: "jobPosts",
  initialState,
  reducers: {},
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
        state.jobPosts.push(action.payload);
      })
      .addCase(updateJobPost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          return;
        }

        const filtered = state.jobPosts.filter(
          (jobPost) => jobPost.id !== action.payload.id
        );
        state.jobPosts = [action.payload, ...filtered];
      })
      .addCase(deleteJobPost.fulfilled, (state, action) => {
        state.jobPosts = action.payload;
      });
  },
});

export const getJobPostStatus = (state) => state.jobPosts.status;
export const getJobPostError = (state) => state.jobPosts.error;
export const selectJobPostById = (state, jobPostId) =>
  state.jobPosts.jobPosts.find((jobPost) => jobPost.id === jobPostId);
export const selectAllJobPosts = (state) => state.jobPosts.jobPosts;

export const selectJobByFilter = (state, data) =>
  state.jobPosts.jobPosts.filter((jobPost) => {
    if (!data) return true;
    const matchTitle = !data.title || (jobPost.title && jobPost.title.toLowerCase().includes(data.title.toLowerCase().trim()));
    const matchJobType = !data.jobTypes || (jobPost.jobTypes && jobPost.jobTypes.type === data.jobTypes);
    const matchLocation = !data.location || (jobPost.location && jobPost.location.name === data.location);
    return matchTitle && matchJobType && matchLocation;
  });

export const selectJobByCategory = (state, categoryId) =>
  state.jobPosts.jobPosts.filter((jobPost) => jobPost.category.id === categoryId);

export const selectJobPostByCompanyId = (state, companyId) =>
  state.jobPosts.jobPosts.filter((jobPost) => jobPost.company.id === companyId);

export default jobSlice.reducer;
