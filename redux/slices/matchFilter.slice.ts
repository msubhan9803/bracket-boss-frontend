import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterMatchesInputDto } from "@/graphql/generated/graphql";
import { SliceNamesEnum } from "../types";

interface MatchFilterState {
  filter: FilterMatchesInputDto;
}

export const matchFilerInitialState: MatchFilterState = {
  filter: {
    tournamentId: 0,
    levels: [],
    pools: [],
    rounds: [],
    status: null,
    courts: [],
    date: null,
    startTime: "",
    endTime: "",
    teams: [],
  },
};

const matchFilterSlice = createSlice({
  name: SliceNamesEnum.matchFilter,
  initialState: matchFilerInitialState,
  reducers: {
    setMatchFilter: (state, action: PayloadAction<FilterMatchesInputDto>) => {
      state.filter = action.payload;
    },
  },
});

export const { setMatchFilter } = matchFilterSlice.actions;
export default matchFilterSlice.reducer;
