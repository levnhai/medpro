import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

export const fetchTopDoctors = createAsyncThunk('auth/authSlice', async (limit, thunkAPI) => {
  try {
    const response = await axios.get(`/api/get-top-docter?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    phoneNumber: null,
    topDoctors: [],
    loading: false,
    error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.topDoctors = action.payload;
      })
      .addCase(fetchTopDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { loginUser, logoutUser, phoneNumber } = authSlice.actions;

export default authSlice.reducer;
