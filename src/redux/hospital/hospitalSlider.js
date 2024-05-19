import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

export const fetchALlDataHospital = createAsyncThunk('hospital/fetchALlDataHospital', async () => {
  try {
    const response = await axios.get('/hospital/get-all-hospital');
    console.log('check data hospital in redux', response);

    return response.hospital.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchDataHospitalById = createAsyncThunk('hospital/fetchDataHospitalById', async (hospitalId) => {
  try {
    console.log('check hospital id in redux ', hospitalId);
    const response = await axios.post('/hospital/get-hospital-by-id', { hospitalId: hospitalId });
    return response.hospital.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchDataDocterlByHospitalId = createAsyncThunk(
  'docter/fetchDataDocterlByHospitalId',
  async (hospitalId) => {
    try {
      const response = await axios.post('/hospital/get-docter-by-hospitalId', { hospitalId: hospitalId });
      return response.hospital.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

const hospitalSlice = createSlice({
  name: 'hospital',
  initialState: {
    hospitalData: null,
    hospitalDataById: null,
    docterDataByHospitalId: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get all data hospital
    builder
      .addCase(fetchALlDataHospital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchALlDataHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalData = action.payload;
      })
      .addCase(fetchALlDataHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // get data hospital by id
    builder
      .addCase(fetchDataHospitalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataHospitalById.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalDataById = action.payload;
      })
      .addCase(fetchDataHospitalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // get docter data by hospitalId
    builder
      .addCase(fetchDataDocterlByHospitalId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataDocterlByHospitalId.fulfilled, (state, action) => {
        state.loading = false;
        state.docterDataByHospitalId = action.payload;
      })
      .addCase(fetchDataDocterlByHospitalId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default hospitalSlice.reducer;
