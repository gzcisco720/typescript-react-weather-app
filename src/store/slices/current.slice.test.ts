import WeatherbitApp from '../../services/WeatherbitApp';
import { mockCurrent } from '../../mocks/current';
import reducer, { fetchCurrentWeather } from './current.slice';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../../services/WeatherbitApp.ts');
const mockedWeatherbitApp = WeatherbitApp as jest.Mocked<typeof axios>;
describe('current weather slice', () => {
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  const mockResponse = {
    data: {
      data: [mockCurrent],
    },
  };
  const mockStore = configureStore({
    reducer: {
      current: reducer,
    },
  });
  it('fetch current success', async () => {
    mockedWeatherbitApp.get.mockResolvedValue(mockResponse);
    await mockStore.dispatch(fetchCurrentWeather('Melbourne, AU'));
    expect(mockedWeatherbitApp.get).toBeCalledWith('/current', {
      params: { city: 'Melbourne, AU' },
    });
    const state = mockStore.getState();
    expect(state.current).toEqual({
      data: mockCurrent,
      error: null,
      loading: false,
    });
  });
  it('fetch current failed with 404', async () => {
    mockedWeatherbitApp.get.mockResolvedValue({ data: [] });
    await mockStore.dispatch(fetchCurrentWeather('Melbourne, AU'));
    expect(mockedWeatherbitApp.get).toBeCalledWith('/current', {
      params: { city: 'Melbourne, AU' },
    });
    const state = mockStore.getState();
    expect(state.current).toEqual({
      data: null,
      error: {
        code: 404,
        message: 'Weather data not found',
      },
      loading: false,
    });
  });
  it('fetch current failed with other errors', async () => {
    mockedWeatherbitApp.get.mockRejectedValue({
      response: {
        status: 500,
      },
      message: 'unknown error',
    });
    await mockStore.dispatch(fetchCurrentWeather('Melbourne, AU'));
    expect(mockedWeatherbitApp.get).toBeCalledWith('/current', {
      params: { city: 'Melbourne, AU' },
    });
    const state = mockStore.getState();
    expect(state.current).toEqual({
      data: null,
      error: {
        code: 500,
        message: 'unknown error',
      },
      loading: false,
    });
  });
  it('set loading true when start fetching current', () => {
    const action = { type: fetchCurrentWeather.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: true,
      data: null,
      error: null,
    });
  });
  it('set data when fetching current successfully', () => {
    const action = {
      type: fetchCurrentWeather.fulfilled.type,
      payload: mockCurrent,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      data: mockCurrent,
      error: null,
    });
  });
  it('set known error when fetching current failed', () => {
    const action = {
      type: fetchCurrentWeather.rejected.type,
      payload: {
        code: 404,
        message: 'not found',
      },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      data: null,
      error: {
        code: 404,
        message: 'not found',
      },
    });
  });
  it('set unknown error when fetching current failed', () => {
    const action = {
      type: fetchCurrentWeather.rejected.type,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      data: null,
      error: {
        code: 500,
        message: 'unknown error',
      },
    });
  });
});
