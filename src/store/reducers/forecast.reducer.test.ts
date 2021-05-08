import forecastReducer from './forecast.reducer';
import {
    GET_FORECAST,
    GET_FORECAST_SUCCESS,
    GET_FORECAST_FAILURE,
    IGetForecastSuccessAction,
    IGetForecastFailureAction,
    IGetForecastAction
} from '../actions/forecast.action';


describe('forecast reducer', () => {
    const initalState = {
        loading: false,
        data: [],
        error: null
    };
    it('should return the initial state', () => {
        expect(forecastReducer(undefined, {} as any)).toEqual(initalState)
    })

    it('should handle get forecast', () => {
        const action = {
            type: GET_FORECAST
        }
        expect(forecastReducer(initalState, action as IGetForecastAction))
        .toEqual({
            loading: true,
            data: [],
            error: null
        })
    })

    it('should handle get forecast success', () => {
        const action = {
            type: GET_FORECAST_SUCCESS,
            payload: []
        };
        expect(forecastReducer(initalState, action as IGetForecastSuccessAction))
        .toEqual({
            loading: false,
            data: [],
            error: null
        })
    })

    it('should handle get forecast failure', () => {
        const action = {
            type: GET_FORECAST_FAILURE,
            payload: {}
        };
        expect(forecastReducer(initalState, action as IGetForecastFailureAction))
        .toEqual({
            loading: false,
            data: [],
            error: {}
        })
    })
});
