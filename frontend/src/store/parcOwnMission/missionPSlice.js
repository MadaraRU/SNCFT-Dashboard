import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import missionServiceP from "./missionPService";

const initialState = {
  mission: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllMissions = createAsyncThunk(
  "missionP/getAllP",
  async (parcId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await missionServiceP.getMissions(parcId, token);
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
// export const setMissions = createAsyncThunk(
//   "mission/add",
//   async (mission, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await missionService.addMission(mission, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
// export const updateToFini = createAsyncThunk(
//   "mission/updateToFini",
//   async (missionId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await missionService.updateMissionToFini(missionId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

const missionSliceP = createSlice({
  name: "missionP",
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
      .addCase(getAllMissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mission = action.payload;
      })
      .addCase(getAllMissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    //   .addCase(setMissions.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(setMissions.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.mission.push(action.payload);
    //   })
    //   .addCase(setMissions.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //   });
    // .addCase(updateToFini.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(updateToFini.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.mission = action.payload;
    // })
    // .addCase(updateToFini.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

export const { reset, resetAll } = missionSliceP.actions;
export default missionSliceP.reducer;
