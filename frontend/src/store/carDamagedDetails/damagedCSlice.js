import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import damagedCService from "./damagedCService";

const initialState = {
  damaged: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllDamagedCarDetails = createAsyncThunk(
  "damagedC/getAllC",
  async (cardId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await damagedCService.getCarDamagedDetails(cardId, token);
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

const damagedCSlice = createSlice({
  name: "carsD",
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
      .addCase(getAllDamagedCarDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDamagedCarDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.damaged = action.payload;
      })
      .addCase(getAllDamagedCarDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetAll } = damagedCSlice.actions;
export default damagedCSlice.reducer;
