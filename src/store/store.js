import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "../features/jobs/jobSlice";
import categorySlice from "../features/categories/categorySlice";
import locationSlice from "../features/locations/locationSlice";
import jobTypeSlice from "../features/jobTypes/jobTypeSlice";
import companySlice from "../features/companies/companySlice";
import authSlice from "../features/auth/authSlice";
import userSlice from "../features/user/userSlice";
import applicationSlice from "../features/application/applicationSlice";

export const store = configureStore({
  reducer: {
    jobPosts: jobSlice,
    categories: categorySlice,
    locations: locationSlice,
    jobTypes: jobTypeSlice,
    companies: companySlice,
    auths: authSlice,
    users: userSlice,
    applications: applicationSlice,
  },
});