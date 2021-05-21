import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import IError from '../../common/interfaces/IError';
import IForecast from '../../common/interfaces/IForecast';
import { IForecastState } from '../../common/interfaces/IForecastState';
import IGetForecastResponse from '../../common/interfaces/IGetForecastResponse';
import WeatherbitApp from '../../services/WeatherbitApp';


const initialState: IForecastState = {
  loading: false,
  data: [],
  error: null
}

export const fetchForecastWeather = createAsyncThunk<
  IForecast[], 
  string,
  {
    rejectValue: IError
  }
>(
  'forecast/fetchByCity',
  async (city: string, { rejectWithValue }) => {
    try {
      const res = await WeatherbitApp.get<IGetForecastResponse>('/forecast/daily', {
        params: { city }
      });
      const { data } = res;
      const { data: forecastList } = data
      if(forecastList && forecastList.length > 0 ) {
        return forecastList;
      } else {
        return rejectWithValue({
          code: 404,
          message: "Weather data not found"
        })
      }
    } catch (error) {
      return rejectWithValue({
        code: error.response.status,
        message: error.message
      })
    }
  }
)

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForecastWeather.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(fetchForecastWeather.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchForecastWeather.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      if (action.payload) { 
        state.error = action.payload;
      } else {
        state.error = { code: 500, message: 'unknown error' };
      }
    });
  }
})

export default forecastSlice.reducer;
