import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Weather from './Weather';

describe('<Meta>', () => {
    let renderResult: RenderResult;

    const props =  {
        "moonrise_ts": 1612001662,
        "wind_cdir": "SW",
        "rh": 69,
        "pres": 1003.0625,
        "high_temp": 21.8,
        "sunset_ts": 1611999259,
        "ozone": 264.33334,
        "moon_phase": 0.945262,
        "wind_gust_spd": 7.8984375,
        "snow_depth": 0,
        "clouds": 93,
        "ts": 1611925260,
        "sunrise_ts": 1611948696,
        "app_min_temp": 16.6,
        "wind_spd": 3.762676,
        "pop": 60,
        "wind_cdir_full": "southwest",
        "slp": 1011.4375,
        "moon_phase_lunation": 0.57,
        "valid_date": "2021-01-30",
        "app_max_temp": 21.4,
        "vis": 22.897333,
        "dewpt": 12.8,
        "snow": 0,
        "uv": 3.390544,
        "weather": {
            "icon": "c04d",
            "code": 804,
            "description": "Overcast clouds"
        },
        "wind_dir": 232,
        "max_dhi": 178,
        "clouds_hi": 0,
        "precip": 4.9375,
        "low_temp": 15.6,
        "max_temp": 22.1,
        "moonset_ts": 1611956552,
        "datetime": "2021-01-30",
        "temp": 18.8,
        "min_temp": 16.2,
        "clouds_mid": 15,
        "clouds_low": 93
    };

    it('should render loading text', () => {
        renderResult = render(<Weather {...props} />);
        const { getByText, getByAltText } = renderResult;
        expect(getByText(`Max: ${props.max_temp}`)).toBeInTheDocument();
        expect(getByText(`Min: ${props.min_temp}`)).toBeInTheDocument();
        expect(getByAltText(props.weather.description).getAttribute('src'))
            .toBe('https://www.weatherbit.io/static/img/icons/c04d.png');
    });
});
