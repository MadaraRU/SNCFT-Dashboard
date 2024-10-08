import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  users: [],
  profile: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isErrorDeleted: false,
  isSuccessDeleted: false,
  isLoadingDeleted: false,
};

// Get users
export const getUsers = createAsyncThunk(
  "users/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.getUsers(token);
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
// Deleter user
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.deleteUser(id, token);
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

// Get user profile
export const getUserProfile = createAsyncThunk(
  "users/profile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.getUserProfile(token);
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

// Update user profile
export const updateUserProfile = createAsyncThunk(
  "users/profile/update",
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.updateUserProfile(user, token);
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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    resetProfile: (state) => {
      state.profile = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    resetAll: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoadingDeleted = true;
      })
      // .addCase(deleteUser.fulfilled, (state, action) => {
      //   state.isLoadingDeleted = false;
      //   state.isSuccessDeleted = true;
      //   state.users = state.users.filter(
      //     (user) => user._id !== action.payload.id
      //   );
      // })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoadingDeleted = false;
        state.isSuccessDeleted = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoadingDeleted = false;
        state.isErrorDeleted = true;
        state.message = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetProfile, resetAll } = usersSlice.actions;
export default usersSlice.reducer;
