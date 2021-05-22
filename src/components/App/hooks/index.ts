import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { fetchCurrentWeather } from '../../../store/slices/current.slice';
import { fetchForecastWeather } from '../../../store/slices/forecast.slice';

export const useHandleSearchChange = () => {
  const [searchCity, setSearchCity] = useState('');
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce((serachText: string) => {
      let searchCity = serachText ? serachText : 'Melbourne,AU';
      dispatch(fetchCurrentWeather(searchCity));
      dispatch(fetchForecastWeather(searchCity));
    }, 1000),
    [],
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchCity = event.currentTarget.value;
    setSearchCity(searchCity);
    search(searchCity);
  };
  useEffect(() => {
    dispatch(fetchCurrentWeather('Melbourne,AU'));
    dispatch(fetchForecastWeather('Melbourne,AU'));
  }, [dispatch]);
  return { searchCity, handleSearchChange };
};
