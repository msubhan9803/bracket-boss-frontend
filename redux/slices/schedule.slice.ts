import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceNamesEnum } from "../types";

interface ScheduleState {
  scheduleOfTorunamentInput: {
    tournamentId: number | null;
    userIds: number[];
  };
}

const initialState: ScheduleState = {
  scheduleOfTorunamentInput: {
    tournamentId: null,
    userIds: [],
  },
};

const scheduleSlice = createSlice({
  name: SliceNamesEnum.schedule,
  initialState,
  reducers: {
    setScheduleOfTorunamentInput(
      state,
      action: PayloadAction<{
        tournamentId: number | null;
        userIds: number[];
      }>
    ) {
      state.scheduleOfTorunamentInput.tournamentId =
        action.payload.tournamentId;
      state.scheduleOfTorunamentInput.userIds = action.payload.userIds;
    },
  },
});

export const { setScheduleOfTorunamentInput } = scheduleSlice.actions;
export default scheduleSlice.reducer;
