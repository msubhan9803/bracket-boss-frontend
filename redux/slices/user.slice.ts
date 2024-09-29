import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  clubId: number | null;
  roleId: number | null;
  userId: number | null;
}

const initialState: UserState = {
  clubId: null,
  roleId: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setClubId(state, action: PayloadAction<number>) {
      state.clubId = action.payload;
    },
    setRoleId(state, action: PayloadAction<number>) {
      state.roleId = action.payload;
    },
    setUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
  },
});

export const { setClubId, setRoleId, setUserId } = userSlice.actions;
export default userSlice.reducer;
