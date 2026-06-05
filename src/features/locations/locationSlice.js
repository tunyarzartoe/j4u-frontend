import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { locations } from "../../dummyData";

const initialState = {
  locations: [],
  status: "idle",
  error: null,
};

export const getAllLocations = createAsyncThunk(
  "locations/getAllLocations",
  async () => {
    return [...locations];
  }
);

export const addNewLocation = createAsyncThunk(
  "locations/addNewLocation",
  async (location) => {
    const nextId = Math.max(0, ...locations.map((item) => item.id)) + 1;
    const newLocation = { ...location, id: nextId };
    locations.push(newLocation);
    return newLocation;
  }
);

export const updateLocation = createAsyncThunk(
  "locations/updateLocation",
  async (location) => {
    const index = locations.findIndex((item) => item.id === location.id);
    const updatedLocation = { ...locations[index], ...location };
    if (index === -1) {
      locations.push(updatedLocation);
    } else {
      locations[index] = updatedLocation;
    }
    return updatedLocation;
  }
);

export const deleteLocation = createAsyncThunk(
  "locations/deleteLocation",
  async (location) => {
    const index = locations.findIndex((item) => item.id === location.id);
    if (index !== -1) {
      locations.splice(index, 1);
    }
    return location;
  }
);

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
        state.status = "success";
      })
      .addCase(getAllLocations.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(addNewLocation.fulfilled, (state, action) => {
        state.locations.push(action.payload);
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          return;
        }
        const filtered = state.locations.filter(
          (location) => location.id !== action.payload.id
        );
        state.locations = [action.payload, ...filtered];
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.locations = state.locations.filter(
          (location) => location.id !== action.payload.id
        );
      });
  },
});

export const getLocationStatus = (state) => state.locations.status;
export const getLocationError = (state) => state.locations.error;
export const selectLocationById = (state, locationId) =>
  state.locations.locations.find((location) => location.id === locationId);
export const selectAllLocations = (state) => state.locations.locations;
export default locationSlice.reducer