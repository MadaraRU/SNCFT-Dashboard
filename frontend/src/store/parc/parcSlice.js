import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import parcService from "./parcService";

const initialState = {
  parc: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getParcs = createAsyncThunk("parc/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await parcService.getParc(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const parcSlice = createSlice({
  name: "parc",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParcs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getParcs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parc = action.payload;
      })
      .addCase(getParcs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = parcSlice.actions;
export default parcSlice.reducer;
