import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAdminLoggedIn: false,
    adminInfo: null,
  },
  reducers: {
    ADMIN_LOGIN_SUCCESS: (state, action) => {
      state.isAdminLoggedIn = true;
      state.adminInfo = action.payload;
    },
    ADMIN_LOGIN_Fail: (state, action) => {
      state.isAdminLoggedIn = false;
      state.adminInfo = null;
    },
    PROCESS_LOGOUT: (state) => {
      state.isAdminLoggedIn = false;
      state.adminInfo = null;
    },
  },
});

export const { ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_Fail, PROCESS_LOGOUT } = adminSlice.actions;
export default adminSlice.reducer;
