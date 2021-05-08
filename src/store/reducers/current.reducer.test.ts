import currentReducer from './current.reducer';
import {
    IGetCurrentWeatherAction,
    GET_CURRENT_WEATHER,
    GET_CURRENT_WEATHER_SUCCESS,
    GET_CURRENT_WEATHER_FAILURE,
    IGetCurrentWeatherSuccessAction,
    IGetCurrentWeatherFailureAction,
} from '../actions/current.action';


describe('current reducer', () => {
    const initalState = {
        loading: false,
        data: null,
        error: null
    };
    it('should return the initial state', () => {
        expect(currentReducer(undefined, {} as any)).toEqual(initalState)
    })

    it('should handle get current weather', () => {
        const action = {
            type: GET_CURRENT_WEATHER
        }
        expect(currentReducer(initalState, action as IGetCurrentWeatherAction))
        .toEqual({
            loading: true,
            data: null,
            error: null
        })
    })

    it('should handle get current weather success', () => {
        const action = {
            type: GET_CURRENT_WEATHER_SUCCESS,
            payload: {}
        };
        expect(currentReducer(initalState, action as IGetCurrentWeatherSuccessAction))
        .toEqual({
            loading: false,
            data: {},
            error: null
        })
    })

    it('should handle get current weather failure', () => {
        const action = {
            type: GET_CURRENT_WEATHER_FAILURE,
            payload: {}
        };
        expect(currentReducer(initalState, action as IGetCurrentWeatherFailureAction))
        .toEqual({
            loading: false,
            data: null,
            error: {}
        })
    })
});
