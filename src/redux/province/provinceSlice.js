import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

export const fetchALlDataProvince = createAsyncThunk('docter/fetchALlDataProvince', async () => {
  try {
    const response = await axios.get('/api/get-all-province');
    return response.provinces.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const provinceSlice = createSlice({
  name: 'province',
  initialState: {
    provinceData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get all data payment
    builder
      .addCase(fetchALlDataProvince.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchALlDataProvince.fulfilled, (state, action) => {
        state.loading = false;
        state.provinceData = action.payload;
      })
      .addCase(fetchALlDataProvince.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default provinceSlice.reducer;
