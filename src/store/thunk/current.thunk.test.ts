import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import nock from 'nock';
import {
    CurrentWeatherActionTypes,
    getCurrentWeather,
    getCurrentWeatherSuccess,
} from '../actions/current.action';
import { WHEATHER_BASE_URL } from '../../common/config/constants';
import fetchCurrentWeather from './current.thunk';
import { IStore } from '../../common/interfaces/IStore';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('current thunk', () => {

    const expectData = {
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
    };
    it('creates GET_CURRENT_WEATHER when fetching current weather', () => {
        nock(WHEATHER_BASE_URL)
        .get(`/current?city=melbourne&&key=${process.env.REACT_APP_API_KEY}`)
        .reply(200, { data: [expectData], count: 1});
        
        const store = mockStore({ current: {} })

        const thunkDispatch = store.dispatch as ThunkDispatch<IStore, {}, CurrentWeatherActionTypes>;

        return thunkDispatch(fetchCurrentWeather('melbourne')).then(() => {
            expect(store.getActions()).toEqual([
                getCurrentWeather(),
                getCurrentWeatherSuccess(expectData)
            ])
        })
        
    })
})
