import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";
import registerReducer from "./auth/register/registerSlice";
import parcReducer from "./parc/parcSlice";
import missionReducer from "./mission/missionSlice";
import missionUReducer from "./userOwnMission/missionUSlice";
import missionPReducer from "./parcOwnMission/missionPSlice";
import carsPReducer from "./parcOwnCars/carsPSlice";
import papersCReducer from "./carOwnPapers/papersCSlice";
import archiveReducer from "./archive/archiveSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    register: registerReducer,
    parc: parcReducer,
    mission: missionReducer,
    missionU: missionUReducer,
    missionP: missionPReducer,
    carsP: carsPReducer,
    papersC: papersCReducer,
    archive: archiveReducer,
  },
});

export default store;
