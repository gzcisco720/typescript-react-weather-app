import { act, renderHook } from "@testing-library/react-hooks";
import { ChangeEvent } from "react";
import { useHandleSearchChange } from "."
import * as currentSlice from "../../../store/slices/current.slice";
import * as forecastSlice from "../../../store/slices/forecast.slice";

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));

describe('App hooks', () => {
  const mockfetchCurrent = jest.spyOn(currentSlice,'fetchCurrentWeather')
  const mockfetchForecast = jest.spyOn(forecastSlice, 'fetchForecastWeather')
  it('should fire useEffect', () => {
    renderHook(() => useHandleSearchChange());
    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockfetchCurrent).toBeCalledWith('Melbourne,AU')
    expect(mockfetchForecast).toBeCalledWith('Melbourne,AU')
  })
  it('should fire call with new city string', async() => {
    const {result} = renderHook(() => useHandleSearchChange());
    const mockEvent = {currentTarget: {value: '123'}};
    act(() => {
      result.current.handleSearchChange((mockEvent as ChangeEvent<HTMLInputElement>))
    })
    await new Promise((r) => setTimeout(r, 1000));
    expect(mockDispatch).toBeCalledTimes(4);
    expect(mockfetchCurrent).toBeCalledWith('123')
    expect(mockfetchForecast).toBeCalledWith('123')
  })
  it('should fire call with empty city string', async() => {
    const {result} = renderHook(() => useHandleSearchChange());
    const mockEvent = {currentTarget: {value: ''}};
    act(() => {
      result.current.handleSearchChange((mockEvent as ChangeEvent<HTMLInputElement>))
    })
    await new Promise((r) => setTimeout(r, 1000));
    expect(mockDispatch).toBeCalledTimes(4);
    expect(mockfetchCurrent).toBeCalledWith('Melbourne,AU')
    expect(mockfetchForecast).toBeCalledWith('Melbourne,AU')
  })
})
