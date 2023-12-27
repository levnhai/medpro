import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    phoneNumber: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    phoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { loginUser, logoutUser, phoneNumber } = authSlice.actions;

export default authSlice.reducer;
