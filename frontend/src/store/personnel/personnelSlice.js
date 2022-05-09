import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import personnelService from "./personnelService";

const initialState = {
  personnel: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const getPeronnels = createAsyncThunk(
  "personnel/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await personnelService.getPersonnel(token);
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

const personnelSlice = createSlice({
  name: "personnel",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPeronnels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPeronnels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.personnel = action.payload;
      })
      .addCase(getPeronnels.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.message = action.payload);
      });
  },
});

export const { reset } = personnelSlice.actions;

export default personnelSlice.reducer;
