import React, { useMemo } from 'react';
import './Current.scss';
import Meta from './Meta';
import VerticalDivider from '../VerticalDivider';
import { useAppSelector } from '../../store';
import { format } from 'date-fns';

const Current = () => {
  const currentState = useAppSelector((state) => state.current);
  const { data, loading } = currentState;
  const date = useMemo(() => format(new Date(), 'EEEE, MMMM do, yyyy'), []);
  const srCountryCode = useMemo(
    () => data?.country_code.split('').join(' '),
    [data?.country_code],
  );
  return (
    <div className="Current">
      <div className="Current__Content--left">
        {loading ? (
          <div className="Current__Loading">Loading ...</div>
        ) : (
          <div
            className="Current__CurrentTemperature"
            tabIndex={0}
            aria-label={`
              temperature in ${data?.city_name} ${srCountryCode}, now is ${data?.app_temp} degree,
              weather is ${data?.weather.description}
            `}
          >
            <span>{data ? data.app_temp : '00.0'}</span>
            <span>&nbsp;</span>
            <span>&#176;</span>
          </div>
        )}
        <div className="Current__WeatherDesc">
          {data ? data.weather.description : ''}
        </div>
        <div className="Current__Metas">
          <Meta title="HUMIDITY" value={`${data ? data.rh : 0}%`} />
          <VerticalDivider width="2px" color="rgba(255, 255, 255, 0.7)" />
          <Meta title="WIND" value={`${data ? data.wind_spd : 0} m/s`} />
        </div>
      </div>
      <div
        className="Current__Content--right"
        tabIndex={0}
        aria-label={`
          current city is ${data?.city_name}, ${srCountryCode}, current date is ${date}
        `}
      >
        <h1 className="Current__City">
          {data
            ? `${data.city_name}, ${data.country_code}`
            : 'Data Not Available'}
        </h1>
        <h1 className="Current__Date">{date}</h1>
      </div>
    </div>
  );
};

export default Current;
