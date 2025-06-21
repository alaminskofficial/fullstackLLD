import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getWeatherDataByCity,
  getWeatherDataByLatLong,
  getWeatherWithForecast
} from '../../utils/weatherApi';

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city) => {
    const res = await getWeatherDataByCity(city);
    return res;
  }
);

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchByCoords',
  async ({ latitude, longitude }) => {
    const res = await getWeatherDataByLatLong(latitude, longitude);
    return res;
  }
);

export const fetchWeatherWithForecast = createAsyncThunk(
    'weather/fetchWithForecast',
    async (payload) => await getWeatherWithForecast(payload.lat, payload.lonOrCity)
  );

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    forcasts:null,
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeatherWithForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forcasts = action.payload;
      });
  }
});

export default weatherSlice.reducer;
