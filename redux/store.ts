import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSlice from "./slices/user.slice";
import scheduleSlice from "./slices/schedule.slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    schedule: scheduleSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
