import React from 'react';
import { useAppSelector } from '../../store';
import './Forecast.scss';
import Weather from './Weather';

const Forecast = () => {
  const forecastState = useAppSelector((state) => state.forecast);
  const { data, loading } = forecastState;
  const nextFiveDays = data.slice(1, 6);
  return (
    <div className="Forecast">
      <h2 className="Forecast__Header">Forecast for next 5 days</h2>
      {loading ? (
        <div className="spinner-border Forecast__Loading" role="status">
          <span className="sr-only">Loading ...</span>
        </div>
      ) : (
        <div className="Forecast__Weathers" data-testid="forecasts">
          {nextFiveDays.map((forecast, index) => (
            <div key={index} className="Forecast__WeatherWrapper">
              <Weather {...forecast} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
