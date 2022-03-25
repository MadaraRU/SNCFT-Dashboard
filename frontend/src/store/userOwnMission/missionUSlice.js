import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import missionServiceU from "./missionUService";

const initialState = {
  mission: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllMissions = createAsyncThunk(
  "mission/getAll",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await missionServiceU.getMissions(userId, token);
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

const missionSliceU = createSlice({
  name: "mission",
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isSuccess = false;
    //   state.isError = false;
    //   state.isLoading = false;
    //   state.message = "";
    // },
    reset: (state) => initialState,
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

export const { reset } = missionSliceU.actions;
export default missionSliceU.reducer;
