import React, { useMemo } from 'react';
import IForecast from '../../../common/interfaces/IForecast';
import './Weather.scss';
import getDay from 'date-fns/getDay';
import { format } from 'date-fns';

const Weather = (props: IForecast) => {
  const { valid_date, weather, max_temp, min_temp } = props;
  const days = useMemo(
    () => [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    [],
  );
  const dayOfWeek = useMemo(() => getDay(new Date(valid_date)), [valid_date]);
  const date = useMemo(
    () => format(new Date(valid_date), 'EEEE, MMMM do, yyyy'),
    [valid_date],
  );
  return (
    <div
      className="Weather"
      tabIndex={0}
      aria-label={`on ${date},
          the weather is ${weather.description},
          the highest temperature is ${max_temp} degree,
          the lowest temperature is ${min_temp} degree`}
    >
      <h3 className="Weather__Day">{days[dayOfWeek]}</h3>
      <img
        data-testid="WEATHER_ICON"
        className="Weather__Icon"
        src={`https://www.weatherbit.io/static/img/icons/${weather.icon}.png`}
        alt={weather.description}
      />
      <div className="Weather__Temperature">
        <div>
          Max: {max_temp}
          <span>&nbsp;</span>
          <span>&#176;</span>
        </div>
        <div>
          Min: {min_temp}
          <span>&nbsp;</span>
          <span>&#176;</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
