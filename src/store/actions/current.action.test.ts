import {
    GET_CURRENT_WEATHER,
    GET_CURRENT_WEATHER_SUCCESS,
    GET_CURRENT_WEATHER_FAILURE,
    getCurrentWeather,
    getCurrentWeatherSuccess,
    getCurrentWeatherFailure
} from './current.action';


describe('current action', () => {
    it('should create an action to get current weather', () => {
        expect(getCurrentWeather()).toEqual({
            type: GET_CURRENT_WEATHER
        });
    });

    it('should create a success action', () => {
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
});
