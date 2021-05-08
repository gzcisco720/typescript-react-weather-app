import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Current from './Current';

describe('<Meta>', () => {
    let renderResult: RenderResult;

    const props = {
        currentState: {
            loading: false,
            data: {
                "rh": 86,
                "pod": "n",
                "lon": -91.90848,
                "pres": 996.1,
                "timezone": "America/Chicago",
                "ob_time": "2021-01-27 11:45",
                "country_code": "US",
                "clouds": 100,
                "ts": 1611747900,
                "solar_rad": 0,
                "state_code": "AR",
                "city_name": "Melbourne",
                "wind_spd": 4.12,
                "wind_cdir_full": "northwest",
                "wind_cdir": "NW",
                "slp": 1022,
                "vis": 5,
                "h_angle": -90,
                "sunset": "23:29",
                "dni": 0,
                "dewpt": -2.1,
                "snow": 0,
                "uv": 0,
                "precip": 0,
                "wind_dir": 315,
                "sunrise": "13:10",
                "ghi": 0,
                "dhi": 0,
                "aqi": 10,
                "lat": 36.05951,
                "weather": {
                    "icon": "c04n",
                    "code": 804,
                    "description": "Overcast clouds"
                },
                "datetime": "2021-01-27:12",
                "temp": 0,
                "station": "F0807",
                "elev_angle": -14.61,
                "app_temp": -4.3
            },
            error: null,
        }
    }

    it('should render loading text', () => {
        props.currentState.loading = true
        renderResult = render(<Current {...props} />);
        const { getByText } = renderResult;
        expect(getByText("Loading ...")).toBeInTheDocument();
    });

    it('should render current weather infomation', () => {
        props.currentState.loading = false
        renderResult = render(<Current {...props} />);
        const { getByText } = renderResult;
        const data = props.currentState.data;
        expect(getByText(data.app_temp)).toBeInTheDocument();
        expect(getByText(data.weather.description)).toBeInTheDocument();
        expect(getByText(`${data.rh}%`)).toBeInTheDocument();
        expect(getByText(`${data.wind_spd} m/s`)).toBeInTheDocument();
    })
});
