import * as currentAction from './current.action';
import WeatherbitApp from '../../utils/WeatherbitApp';
import axios from 'axios';

jest.mock('axios', () => {
    return {
        create: jest.fn(() => ({
        get: jest.fn(),
        interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() }
        }
        }))
    }
})

describe('current action', () => {
    const {
        GET_CURRENT_WEATHER,
        GET_CURRENT_WEATHER_SUCCESS,
        GET_CURRENT_WEATHER_FAILURE,
        getCurrentWeather,
        getCurrentWeatherSuccess,
        getCurrentWeatherFailure,
        fetchCurrentWeather
    }  = currentAction;
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
    
    it('should create an action to get current weather', () => {
        expect(getCurrentWeather()).toEqual({
            type: GET_CURRENT_WEATHER
        });
    });

    it('should create a success action', () => {
        expect(getCurrentWeatherSuccess(expectData)).toEqual({
            type: GET_CURRENT_WEATHER_SUCCESS,
            payload: expectData
        });
    })

    it('should create a failure action', () => {
        const error = {code: 404, message: "not found"};

        expect(getCurrentWeatherFailure(error)).toEqual({
            type: GET_CURRENT_WEATHER_FAILURE,
            payload: error
        });
    })

    it('should dispatch GET_CURRENT_WEATHER_SUCCESS', async() => {
        (WeatherbitApp as jest.Mocked<typeof axios>).get.mockResolvedValue({ data: { data: [ expectData ] } } )
        const mockDispatch = jest.fn((fn) => fn);
        const fetch = fetchCurrentWeather(mockDispatch);
        await fetch('Melbourne AU');
        expect(mockDispatch.mock.calls.length).toBe(2);
        expect(mockDispatch).toBeCalledWith({ type: 'GET_CURRENT_WEATHER' });
        expect(mockDispatch).toBeCalledWith({ type: 'GET_CURRENT_WEATHER_SUCCESS', payload: expectData });
    })
});
