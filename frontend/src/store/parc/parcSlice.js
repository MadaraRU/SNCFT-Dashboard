import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import parcService from "./parcService";

const initialState = {
  parc: [],
  cars: [],
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

export const setParc = createAsyncThunk(
  "parc/addParc",
  async (parc, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await parcService.addParc(parc, token);
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

export const updateParc = createAsyncThunk(
  "parc/updateParc",
  async ({ parc, parcId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await parcService.updateParc(parcId, parc, token);
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

export const removeParc = createAsyncThunk(
  "parc/deleteParc",
  async (parcId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await parcService.deleteParc(parcId, token);
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

export const getAllCars = createAsyncThunk(
  "parc/getAll/getCars",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await parcService.getCars(id, token);
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

const parcSlice = createSlice({
  name: "parc",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
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
      })
      .addCase(setParc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setParc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parc.push(action.payload);
      })
      .addCase(setParc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateParc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateParc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parc = action.payload;
      })
      .addCase(updateParc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeParc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeParc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parc.filter((p) => p._id !== action.payload.id);
      })
      .addCase(removeParc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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
      });
  },
});

export const { reset } = parcSlice.actions;
export default parcSlice.reducer;
