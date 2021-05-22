import React from 'react';
import './App.scss';
import Current from '../Current';
import Forecast from '../Forecast';
import { useHandleSearchChange } from './hooks';

const App = () => {
  const { searchCity, handleSearchChange } = useHandleSearchChange();
  return (
    <div className="App">
      <div className="App__Search">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="searchCity"
            data-testid="searchCity"
            value={searchCity}
            onChange={handleSearchChange}
            placeholder="search, for example 'Melbourne,AU'"
          />
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
  );
};

export default App;
