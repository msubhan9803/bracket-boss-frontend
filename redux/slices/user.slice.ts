import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  tenantId: string | null;
  roleId: string | null;
}

const initialState: UserState = {
  tenantId: null,
  roleId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTenantId(state, action: PayloadAction<string>) {
      state.tenantId = action.payload;
    },
    setRoleId(state, action: PayloadAction<string>) {
      state.roleId = action.payload;
    },
  },
});

export const { setTenantId, setRoleId } = userSlice.actions;
export default userSlice.reducer;