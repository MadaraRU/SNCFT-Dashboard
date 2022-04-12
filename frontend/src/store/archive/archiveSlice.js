import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import archiveService from "./archiveService";

const initialState = {
  archive: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getallHistory = createAsyncThunk(
  "archive/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await archiveService.getHistory(token);
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

const archiveSlice = createSlice({
  name: "archive",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getallHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallHistory.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.archive = action.payload);
      })
      .addCase(getallHistory.rejected, (state, action) => {
        (state.isLoading = false), (state.isError = true);
        state.message = action.payload;
      });
  },
});

export const { reset } = archiveSlice.actions;
export default archiveSlice.reducer;
