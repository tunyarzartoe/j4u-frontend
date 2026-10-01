import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storageService } from "../../services/storageService";

export const getAllCompanies = createAsyncThunk(
  "companies/getAllCompanies",
  async () => {
    return storageService.getCompanies();
  }
);

export const addNewCompany = createAsyncThunk(
  "companies/addCompany",
  async (company) => {
    const locations = storageService.getLocations();
    const location =
      locations.find((item) => item.id === company.location?.id) || locations[0];
    const newCompany = {
      ...company,
      location,
      logo:
        company.logo ||
        "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&q=80",
    };
    return storageService.saveCompany(newCompany);
  }
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (company) => {
    return storageService.saveCompany(company);
  }
);

export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (company) => {
    return company;
  }
);

const initialState = {
  companies: storageService.getCompanies(),
  status: "idle",
  error: null,
};

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.status = "success";
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(addNewCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        if (!action.payload?.id) return;
        const filtered = state.companies.filter((c) => c.id !== action.payload.id);
        state.companies = [action.payload, ...filtered];
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter((c) => c.id !== action.payload.id);
      });
  },
});

export const getCompanyStatus = (state) => state.companies.status;
export const getCompanyError = (state) => state.companies.error;
export const selectCompanyById = (state, companyId) =>
  state.companies.companies.find((company) => company.id === companyId);
export const selectAllCompanies = (state) => state.companies.companies;

export default companySlice.reducer;