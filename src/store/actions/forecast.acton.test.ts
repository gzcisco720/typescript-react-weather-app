import {
    GET_FORECAST,
    GET_FORECAST_SUCCESS,
    GET_FORECAST_FAILURE,
    getForecast,
    getForecastSuccess,
    getForecastFailure
} from './forecast.action';


describe('forecast action', () => {
    it('should create an action to get forecast', () => {
        expect(getForecast()).toEqual({
            type: GET_FORECAST
        });
    });

    it('should create a success action', () => {
        expect(getForecastSuccess([])).toEqual({
            type: GET_FORECAST_SUCCESS,
            payload: []
        });
    })

    it('should create a failure action', () => {
        const error = {code: 404, message: "not found"};

        expect(getForecastFailure(error)).toEqual({
            type: GET_FORECAST_FAILURE,
            payload: error
        });
    })
});
