import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import papersServiceC from "./papersCService";

const initialState = {
  papers: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllPapers = createAsyncThunk(
  "papersC/getAllC",
  async (cardId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await papersServiceC.getPapers(cardId, token);
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

const papersCSlice = createSlice({
  name: "carsP",
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
      .addCase(getAllPapers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPapers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.papers = action.payload;
      })
      .addCase(getAllPapers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetAll } = papersCSlice.actions;
export default papersCSlice.reducer;
