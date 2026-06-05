import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { companies, locations } from "../../dummyData";

const initialState = {
  companies: [],
  status: "idle",
  error: null,
};

export const getAllCompanies = createAsyncThunk(
  "companies/getAllCompanies",
  async () => {
    return [...companies];
  }
);

export const addNewCompany = createAsyncThunk(
  "companies/addCompany",
  async (company) => {
    const nextId = Math.max(0, ...companies.map((item) => item.id)) + 1;
    const location =
      locations.find((item) => item.id === company.location?.id) || locations[0];
    const newCompany = {
      ...company,
      id: nextId,
      location,
      logo:
        company.logo ||
        `https://via.placeholder.com/80x80.png?text=Company+${nextId}`,
    };
    companies.push(newCompany);
    return newCompany;
  }
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (company) => {
    const index = companies.findIndex((item) => item.id === company.id);
    const location =
      locations.find((item) => item.id === company.location?.id) || locations[0];
    const updatedCompany = {
      ...companies[index],
      ...company,
      location,
    };
    if (index === -1) {
      companies.push(updatedCompany);
    } else {
      companies[index] = updatedCompany;
    }
    return updatedCompany;
  }
);

export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (company) => {
    const index = companies.findIndex((item) => item.id === company.id);
    if (index !== -1) {
      companies.splice(index, 1);
    }
    return company;
  }
);

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
        if (!action.payload?.id) {
          return;
        }
        const filtered = state.companies.filter(
          (company) => company.id !== action.payload.id
        );
        state.companies = [action.payload, ...filtered];
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter(
          (company) => company.id !== action.payload.id
        );
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export const getCompanyStatus = (state) => state.companies.status;
export const getCompanyError = (state) => state.companies.error;
export const selectCompanyById = (state, companyId) =>
  state.companies.companies.find((company) => company.id === companyId);

export const selectCompanyByLocationId = (state, locationId) =>
  state.companies.companies.find((company) => company.location.id === locationId);

export const selectAllCompanies = (state) => state.companies.companies;

export default companySlice.reducer;