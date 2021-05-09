import React from 'react';
import './styles.scss';
import Meta from './Meta';
import VerticalDivider from '../VerticalDivider';
import { useStore } from '../../store';

const Current = () => {
    const { current } = useStore();
    const { data } = current;
    const { loading } = current;
    return (
        <div className="Current">
            <div className="Current__Content--left">
                {
                    loading ? (
                        <div className="Current__Loading">
                            Loading ...
                        </div>
                    ) : (
                        <div className="Current__CurrentTemperature">
                            <span>{data ? data.app_temp: "00.0"}</span>
                            <span>&nbsp;</span>
                            <span>&#176;</span>
                        </div>
                    )
                }
                <div className="Current__WeatherDesc">
                    {data ? data.weather.description: ""}
                </div>
                <div className="Current__Metas">
                    <Meta title="HUMIDITY" value={`${data ? data.rh : 0}%`} />
                    <VerticalDivider width="2px" color="rgba(255, 255, 255, 0.7)" />
                    <Meta title="WIND" value={`${data ? data.wind_spd: 0} m/s`} />
                </div>
            </div>
            <div className="Current__Content--right">
                <h1 className="Current__City">{
                    data ? `${data.city_name}, ${data.country_code}` :  "Data Not Available"
                }</h1>
            </div>
        </div>
    )
}

export default Current;
