/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import './styles.scss';
import Current from '../Current';
import Forecast from '../Forecast';
import { debounce } from 'lodash';
import { fetchCurrentWeather }  from '../../store/actions/current.action'
import { fetchForecast }  from '../../store/actions/forecast.action'
import { useDispatch } from '../../store';
const App = () => {
  const [searchCity, setSearchCity] = useState('');

  const dispatch = useDispatch();
  const getCurrent = useMemo(() => fetchCurrentWeather(dispatch), [dispatch]);
  const getForecast = useMemo(() => fetchForecast(dispatch), [dispatch]);

  useEffect(() => {
    getCurrent('Melbourne,AU')
    getForecast('Melbourne,AU')
  }, [getCurrent, getForecast])

  const search = useCallback(debounce((serachText: string) => {
    let cityName = serachText ? serachText : "Melbourne,AU";
    getCurrent(cityName);
    getForecast(cityName);
  }, 1000), []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cityName = event.currentTarget.value;
    setSearchCity(cityName);
    search(cityName)
  }
  
  return (
    <div className="App">
      <div className="App__Search">
        <div className="form-group">
          <input type="text" 
            className="form-control" 
            id="searchCity"
            value={searchCity}
            onChange={handleSearchChange}
            placeholder="search, for example 'Melbourne,AU'" />
        </div>
      </div>
      <div className="App__WeatherWrapper">
        <div className="App__WeatherCurrent">
          <Current />
        </div>
        <div className="App__WeatherForecast">
          <Forecast />
        </div>
      </div>
    </div>
  )
}

export default App;
