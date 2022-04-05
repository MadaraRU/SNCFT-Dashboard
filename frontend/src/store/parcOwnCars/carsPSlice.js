import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import carsServiceP from "./carsPService";

const initialState = {
  cars: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllCars = createAsyncThunk(
  "cars/getAllP",
  async (parcId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carsServiceP.getCars(parcId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/delete",
  async (carId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carsServiceP.deleteCar(carId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const carsPSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
    resetAll: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload;
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars.filter((c) => c._id !== action.payload.id);
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetAll } = carsPSlice.actions;
export default carsPSlice.reducer;
