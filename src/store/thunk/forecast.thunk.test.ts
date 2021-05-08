import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import nock from 'nock';
import {
    ForecastActionTypes,
    getForecast,
    getForecastSuccess
} from '../actions/forecast.action';
import { WHEATHER_BASE_URL } from '../../common/config/constants';
import { IStore } from '../../common/interfaces/IStore';
import fetchForecast from './forecast.thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('current thunk', () => {

    const expectData = {
        "data": [
            {
                "moonrise_ts": 1613072673,
                "wind_cdir": "SSW",
                "rh": 60,
                "pres": 1003.5,
                "high_temp": 20,
                "sunset_ts": 1613121694,
                "ozone": 263.5,
                "moon_phase": 0.00613302,
                "wind_gust_spd": 6.3007812,
                "snow_depth": 0,
                "clouds": 75,
                "ts": 1613048460,
                "sunrise_ts": 1613072773,
                "app_min_temp": 16.5,
                "wind_spd": 4.356274,
                "pop": 0,
                "wind_cdir_full": "south-southwest",
                "slp": 1011.5,
                "moon_phase_lunation": 0.01,
                "valid_date": "2021-02-12",
                "app_max_temp": 18,
                "vis": 24.128,
                "dewpt": 9.7,
                "snow": 0,
                "uv": 1.8432347,
                "weather": {
                    "icon": "c04d",
                    "code": 804,
                    "description": "Overcast clouds"
                },
                "wind_dir": 213,
                "max_dhi": 178,
                "clouds_hi": 10,
                "precip": 0,
                "low_temp": 14.8,
                "max_temp": 20,
                "moonset_ts": 1613123937,
                "datetime": "2021-02-12",
                "temp": 17.6,
                "min_temp": 14.8,
                "clouds_mid": 0,
                "clouds_low": 74
            }
        ],
        "city_name": "Melbourne",
        "lon": "144.96332",
        "timezone": "Australia/Melbourne",
        "lat": "-37.814",
        "country_code": "AU",
        "state_code": "07"
    };
    
    it('creates GET_CURRENT_WEATHER when fetching current weather', () => {
        nock(WHEATHER_BASE_URL)
        .get(`/forecast/daily?city=melbourne&&key=${process.env.REACT_APP_API_KEY}`)
        .reply(200, expectData);
        
        const store = mockStore({ forecast: {} })

        const thunkDispatch = store.dispatch as ThunkDispatch<IStore, {}, ForecastActionTypes>;

        return thunkDispatch(fetchForecast('melbourne')).then(() => {
            expect(store.getActions()).toEqual([
                getForecast(),
                getForecastSuccess(expectData.data)
            ])
        })
        
    })
})
