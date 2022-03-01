import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";
import registerReducer from "./auth/register/registerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    register: registerReducer,
  },
});

export default store;
