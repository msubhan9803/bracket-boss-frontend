import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSlice from "./slices/user.slice";
import scheduleSlice from "./slices/schedule.slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["clubId", "roleId", "userId"],
};

const schedulePersistConfig = {
  key: "schedule",
  storage: storage,
  whitelist: ["*"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userSlice),
  schedule: persistReducer(schedulePersistConfig, scheduleSlice),
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["user", "schedule"],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;